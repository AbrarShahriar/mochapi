import { faker } from "@faker-js/faker";

export type BuiltInFunctionType = {
  funcName: string;
  funcDesc: string;
  func: () => unknown;
  tags: string[];
};

export const functionCategories = ["person", "food"];

export const functionMap: BuiltInFunctionType[] = [
  // Food
  {
    funcName: "Dish Name",
    funcDesc: "Generates a random dish name.",
    func: faker.food.dish,
    tags: ["food"],
  },
  {
    funcName: "Ingredient",
    funcDesc: "Generates a random food ingredient.",
    func: faker.food.ingredient,
    tags: ["food"],
  },
  {
    funcName: "Fruit",
    funcDesc: "Generates a random fruit name.",
    func: faker.food.fruit,
    tags: ["food"],
  },
  {
    funcName: "Vegetable",
    funcDesc: "Generates a random vegetable name.",
    func: faker.food.vegetable,
    tags: ["food"],
  },
  {
    funcName: "Spice",
    funcDesc: "Generates a random spice name.",
    func: faker.food.spice,
    tags: ["food"],
  },
  {
    funcName: "Meat Type",
    funcDesc: "Generates a random type of meat.",
    func: faker.food.meat,
    tags: ["food"],
  },
  // Person
  {
    funcName: "First Name",
    funcDesc: "Generates a random first name.",
    func: faker.person.firstName,
    tags: ["person"],
  },
  {
    funcName: "Last Name",
    funcDesc: "Generates a random last name.",
    func: faker.person.lastName,
    tags: ["person"],
  },
  {
    funcName: "Middle Name",
    funcDesc: "Generates a random middle name.",
    func: faker.person.lastName,
    tags: ["person"],
  },
  {
    funcName: "Full Name",
    funcDesc: "Generates a random full name.",
    func: faker.person.fullName,
    tags: ["person"],
  },
  {
    funcName: "Job Title",
    funcDesc: "Generates a random job title.",
    func: faker.person.jobTitle,
    tags: ["person"],
  },
  {
    funcName: "Job Descriptor",
    funcDesc: "Generates a random job descriptor.",
    func: faker.person.jobDescriptor,
    tags: ["person"],
  },
  {
    funcName: "Job Area",
    funcDesc: "Generates a random job area.",
    func: faker.person.jobArea,
    tags: ["person"],
  },
  {
    funcName: "Job Type",
    funcDesc: "Generates a random job type.",
    func: faker.person.jobType,
    tags: ["person"],
  },
  {
    funcName: "Prefix",
    funcDesc: "Generates a random prefix (e.g., Mr., Ms.).",
    func: faker.person.prefix,
    tags: ["person"],
  },
  {
    funcName: "Suffix",
    funcDesc: "Generates a random suffix (e.g., Jr., PhD).",
    func: faker.person.suffix,
    tags: ["person"],
  },
  {
    funcName: "Biography",
    funcDesc: "Generates a random short biography.",
    func: faker.person.bio,
    tags: ["person"],
  },
  {
    funcName: "Gender",
    funcDesc: "Generates a random gender.",
    func: faker.person.gender,
    tags: ["person"],
  },
  {
    funcName: "Zodiac Sign",
    funcDesc: "Generates a random zodiac sign.",
    func: faker.person.zodiacSign,
    tags: ["person"],
  },
];
