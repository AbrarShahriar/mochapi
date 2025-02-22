import { faker } from "@faker-js/faker";

export const functionMap: Record<string, (() => void) | string> = {
  "faker:name": faker.person.fullName,
  "faker:gender": faker.person.sex,
  "faker:job": faker.person.jobTitle,
  "faker:bio": faker.person.bio,
  "faker:zodiacSign": faker.person.zodiacSign,
};

export type FunctionSignatures = keyof typeof functionMap;
