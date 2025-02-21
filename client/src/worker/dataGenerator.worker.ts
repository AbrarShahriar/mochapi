import {
  functionMap,
  FunctionSignatures,
} from "@/lib/generators/available-functions";
import { SchemaField } from "@/lib/type";

type WorkerMessage = {
  type: "GENERATE_DATA";
  payload: {
    numOfRows: number;
    schema: SchemaField[];
  };
};

function generateData(numOfRows: number, schema: SchemaField[]) {
  const results = [];

  for (let i = 0; i < Math.min(numOfRows, 1000); i++) {
    const obj: Record<string, unknown> = {};
    for (let j = 0; j < schema.length; j++) {
      if (schema[j].functionSignature) {
        obj[schema[j].fieldName] =
          functionMap[schema[j].functionSignature as FunctionSignatures]();
      }
    }
    results.push(obj);
  }

  return results;
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  try {
    const { numOfRows, schema } = event.data.payload;

    // Validate count to prevent DoS
    if (numOfRows < 1 || numOfRows > 1000) {
      throw new Error("Count must be between 1 and 1000");
    }

    // Generate data
    const data = generateData(numOfRows, schema);

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
};

// Clean up resources when worker is terminated
self.addEventListener("unload", () => {
  // Perform any necessary cleanup
});
