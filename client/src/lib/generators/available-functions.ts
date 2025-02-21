import { faker } from "@faker-js/faker";

export const functionMap = {
  Name: faker.person.fullName,
  Gender: faker.person.sex,
  Job: faker.person.jobTitle,
  Bio: faker.person.bio,
  "Zodiac Sign": faker.person.zodiacSign,
};

export type FunctionSignatures = keyof typeof functionMap;
