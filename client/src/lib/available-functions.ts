"use client";

import { faker } from "@faker-js/faker";

export type BuiltInFunctionType = {
  funcName: string;
  funcDesc: string;
  func: () => unknown;
  callSignature: string;
  tags: string[];
};

export const functionCategories = ["person", "food", "animal", "book"];

export const functionMap: BuiltInFunctionType[] = [
  // Person
  {
    funcName: "First Name",
    funcDesc: "Generates a random first name.",
    func: faker.person.firstName,
    callSignature: "faker:person:firstName",
    tags: ["person"],
  },
  {
    funcName: "Last Name",
    funcDesc: "Generates a random last name.",
    func: faker.person.lastName,
    callSignature: "faker:person:lastName",
    tags: ["person"],
  },
  {
    funcName: "Middle Name",
    funcDesc: "Generates a random middle name.",
    func: faker.person.middleName,
    callSignature: "faker:person:middleName",
    tags: ["person"],
  },
  {
    funcName: "Full Name",
    funcDesc: "Generates a random full name.",
    func: faker.person.fullName,
    callSignature: "faker:person:fullName",
    tags: ["person"],
  },
  {
    funcName: "Job Title",
    funcDesc: "Generates a random job title.",
    func: faker.person.jobTitle,
    callSignature: "faker:person:jobTitle",
    tags: ["person"],
  },
  {
    funcName: "Job Descriptor",
    funcDesc: "Generates a random job descriptor.",
    func: faker.person.jobDescriptor,
    callSignature: "faker:person:jobDescriptor",
    tags: ["person"],
  },
  {
    funcName: "Job Area",
    funcDesc: "Generates a random job area.",
    func: faker.person.jobArea,
    callSignature: "faker:person:jobArea",
    tags: ["person"],
  },
  {
    funcName: "Job Type",
    funcDesc: "Generates a random job type.",
    func: faker.person.jobType,
    callSignature: "faker:person:jobType",
    tags: ["person"],
  },
  {
    funcName: "Prefix",
    funcDesc: "Generates a random prefix (e.g., Mr., Ms.).",
    func: faker.person.prefix,
    callSignature: "faker:person:prefix",
    tags: ["person"],
  },
  {
    funcName: "Suffix",
    funcDesc: "Generates a random suffix (e.g., Jr., PhD).",
    func: faker.person.suffix,
    callSignature: "faker:person:suffix",
    tags: ["person"],
  },
  {
    funcName: "Biography",
    funcDesc: "Generates a random short biography.",
    func: faker.person.bio,
    callSignature: "faker:person:bio",
    tags: ["person"],
  },
  {
    funcName: "Gender",
    funcDesc: "Generates a random gender.",
    func: faker.person.gender,
    callSignature: "faker:person:gender",
    tags: ["person"],
  },
  {
    funcName: "Zodiac Sign",
    funcDesc: "Generates a random zodiac sign.",
    func: faker.person.zodiacSign,
    callSignature: "faker:person:zodiacSign",
    tags: ["person"],
  },
  // Food
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
  // Animal
  {
    funcName: "Pet Name",
    funcDesc: "Generates a random pet name.",
    func: faker.animal.petName,
    callSignature: "faker:animal:petName",
    tags: ["animal"],
  },

  {
    funcName: "Animal Type",
    funcDesc: "Gives a random animal type.",
    func: faker.animal.type,
    callSignature: "faker:animal:type",
    tags: ["animal"],
  },
  {
    funcName: "Bird Name",
    funcDesc: "Generates a random bird name.",
    func: faker.animal.bird,
    callSignature: "faker:animal:bird",
    tags: ["animal"],
  },
  {
    funcName: "Cat Name",
    funcDesc: "Generates a random cat name.",
    func: faker.animal.cat,
    callSignature: "faker:animal:cat",
    tags: ["animal"],
  },
  {
    funcName: "Cetacean Name",
    funcDesc: "Generates a random cetacean name.",
    func: faker.animal.cetacean,
    callSignature: "faker:animal:cetacean",
    tags: ["animal"],
  },
  {
    funcName: "Cow Name",
    funcDesc: "Generates a random cow name.",
    func: faker.animal.cow,
    callSignature: "faker:animal:cow",
    tags: ["animal"],
  },
  {
    funcName: "Crocodilia Name",
    funcDesc: "Generates a random crocodilia name.",
    func: faker.animal.crocodilia,
    callSignature: "faker:animal:crocodilia",
    tags: ["animal"],
  },
  {
    funcName: "Dog Name",
    funcDesc: "Generates a random dog name.",
    func: faker.animal.dog,
    callSignature: "faker:animal:dog",
    tags: ["animal"],
  },
  {
    funcName: "Fish Name",
    funcDesc: "Generates a random fish name.",
    func: faker.animal.fish,
    callSignature: "faker:animal:fish",
    tags: ["animal"],
  },
  {
    funcName: "Horse Name",
    funcDesc: "Generates a random horse name.",
    func: faker.animal.horse,
    callSignature: "faker:animal:horse",
    tags: ["animal"],
  },
  {
    funcName: "Insect Name",
    funcDesc: "Generates a random insect name.",
    func: faker.animal.insect,
    callSignature: "faker:animal:insect",
    tags: ["animal"],
  },
  {
    funcName: "Lion Name",
    funcDesc: "Generates a random lion name.",
    func: faker.animal.lion,
    callSignature: "faker:animal:lion",
    tags: ["animal"],
  },
  {
    funcName: "Rabbit Name",
    funcDesc: "Generates a random rabbit name.",
    func: faker.animal.rabbit,
    callSignature: "faker:animal:rabbit",
    tags: ["animal"],
  },
  {
    funcName: "Rodent Name",
    funcDesc: "Generates a random rodent name.",
    func: faker.animal.rodent,
    callSignature: "faker:animal:rodent",
    tags: ["animal"],
  },
  {
    funcName: "Snake Name",
    funcDesc: "Generates a random snake name.",
    func: faker.animal.snake,
    callSignature: "faker:animal:snake",
    tags: ["animal"],
  },
  // Book
  {
    funcName: "Author Name",
    funcDesc: "Generates a random book author's name.",
    func: faker.book.author,
    callSignature: "faker:book:author",
    tags: ["book"],
  },
  {
    funcName: "Book Format",
    funcDesc: "Generates a random book format.",
    func: faker.book.format,
    callSignature: "faker:book:format",
    tags: ["book"],
  },
  {
    funcName: "Book Genre",
    funcDesc: "Generates a random book genre.",
    func: faker.book.genre,
    callSignature: "faker:book:genre",
    tags: ["book"],
  },
  {
    funcName: "Book Publisher",
    funcDesc: "Generates a random publisher.",
    func: faker.book.publisher,
    callSignature: "faker:book:publisher",
    tags: ["book"],
  },
  {
    funcName: "Book Series",
    funcDesc: "Generates a random series.",
    func: faker.book.series,
    callSignature: "faker:book:series",
    tags: ["book"],
  },
  {
    funcName: "Book Title",
    funcDesc: "Generates a random book title.",
    func: faker.book.title,
    callSignature: "faker:book:title",
    tags: ["book"],
  },
];
