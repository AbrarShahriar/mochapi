import { faker } from "@faker-js/faker";

export const foodsFn = [
  {
    funcName: "Dish Name",
    funcDesc: "Generates a random dish name.",
    func: faker.food.dish,
    callSignature: "faker:food:dish",
    tags: ["food"],
  },
  {
    funcName: "Ingredient",
    funcDesc: "Generates a random food ingredient.",
    func: faker.food.ingredient,
    callSignature: "faker:food:ingredient",
    tags: ["food"],
  },
  {
    funcName: "Fruit",
    funcDesc: "Generates a random fruit name.",
    func: faker.food.fruit,
    callSignature: "faker:food:fruit",
    tags: ["food"],
  },
  {
    funcName: "Vegetable",
    funcDesc: "Generates a random vegetable name.",
    func: faker.food.vegetable,
    callSignature: "faker:food:vegetable",
    tags: ["food"],
  },
  {
    funcName: "Spice",
    funcDesc: "Generates a random spice name.",
    func: faker.food.spice,
    tags: ["food"],
    callSignature: "faker:food:spice",
  },
  {
    funcName: "Meat Type",
    funcDesc: "Generates a random type of meat.",
    func: faker.food.meat,
    callSignature: "faker:food:meat",
    tags: ["food"],
  },
];
