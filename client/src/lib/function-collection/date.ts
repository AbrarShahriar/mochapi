import { faker } from "@faker-js/faker";

export const dateFn = [
  // Date
  {
    funcName: "Past Date",
    funcDesc: "Generates a random date in the past.",
    func: faker.date.past,
    callSignature: "faker:date:past",
    tags: ["date"],
  },
  {
    funcName: "Future Date",
    funcDesc: "Generates a random date in the future.",
    func: faker.date.future,
    callSignature: "faker:date:future",
    tags: ["date"],
  },
  {
    funcName: "Recent Date",
    funcDesc: "Generates a random date in the recent past.",
    func: faker.date.recent,
    callSignature: "faker:date:recent",
    tags: ["date"],
  },
  {
    funcName: "Soon Date",
    funcDesc: "Generates a random date in the near future.",
    func: faker.date.soon,
    callSignature: "faker:date:soon",
    tags: ["date"],
  },
  {
    funcName: "Birthdate",
    funcDesc: "Generates a random birthdate within a given age range.",
    func: faker.date.birthdate,
    callSignature: "faker:date:birthdate",
    tags: ["date"],
  },
  {
    funcName: "Anytime Date",
    funcDesc: "Generates a random date in the past, present, or future.",
    func: faker.date.anytime,
    callSignature: "faker:date:anytime",
    tags: ["date"],
  },
  {
    funcName: "Week Day",
    funcDesc: "Generates a random day of the week.",
    func: faker.date.weekday,
    callSignature: "faker:date:weekday",
    tags: ["date"],
  },
];
