import {
  injectFunctionBody,
  safeContext,
  validator,
} from "@/lib/code-executor/executor";
import { SchemaField } from "@/lib/type";
import { faker } from "@faker-js/faker";

export const defaultCallSignatures: Record<string, () => unknown> = {
  "faker:name": faker.person.fullName,
  "faker:gender": faker.person.sex,
  "faker:job": faker.person.jobTitle,
  "faker:bio": faker.person.bio,
  "faker:zodiacSign": faker.person.zodiacSign,
};

const customCallSignatures: Record<string, () => unknown> = {};

const defaultFunctions = Object.keys(defaultCallSignatures);

type WorkerMessage = {
  type: "GENERATE_DATA" | "ADD_FUNCTION";
  payload: {
    numOfRows?: number;
    schema?: SchemaField[];
    functionToAdd?: { callSignature: string; functionBody: string };
  };
};

const api = safeContext();

function generateData(
  numOfRows: number,
  schema: SchemaField[],
  customCallSignatures: Record<string, () => unknown>
) {
  const results = [];

  for (let i = 0; i < Math.min(numOfRows, 1000); i++) {
    const obj: Record<string, unknown> = {};
    for (let j = 0; j < schema.length; j++) {
      if (defaultFunctions.includes(schema[j].functionSignature)) {
        obj[schema[j].fieldName] = (
          defaultCallSignatures[schema[j].functionSignature] as () => void
        )();
      } else {
        obj[schema[j].fieldName] =
          customCallSignatures[schema[j].functionSignature]();
      }
    }
    results.push(obj);
  }

  return results;
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const {
    type,
    payload: { numOfRows, schema, functionToAdd },
  } = event.data;

  switch (type) {
    case "GENERATE_DATA":
      if (numOfRows && schema) {
        try {
          // Validate count to prevent DoS
          if (numOfRows < 1 || numOfRows > 1000) {
            throw new Error("Count must be between 1 and 1000");
          }

          // Generate data
          const data = generateData(numOfRows, schema, customCallSignatures);

          // Send back results
          self.postMessage({
            type: "SUCCESS",
            payload: data,
          });
        } catch (error) {
          self.postMessage({
            type: "ERROR",
            payload: (error as Error).message,
          });
        }
      }
      break;

    case "ADD_FUNCTION":
      if (functionToAdd) {
        validator(functionToAdd.functionBody);
        const safeFunction = new Function(
          ...Object.keys(api),
          injectFunctionBody(functionToAdd.functionBody)
        );
        customCallSignatures[functionToAdd.callSignature] =
          safeFunction as () => unknown;
      }
      break;

    default:
      break;
  }
};

// Clean up resources when worker is terminated
self.addEventListener("unload", () => {});
