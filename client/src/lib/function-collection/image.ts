import { faker } from "@faker-js/faker";

export const imageFn = [
  {
    funcName: "Avatar",
    funcDesc: "Generates a random avatar image URL.",
    func: faker.image.avatar,
    callSignature: "faker:image:avatar",
    tags: ["image"],
  },
  {
    funcName: "Person Portrait",
    funcDesc:
      "Generates a random square portrait of a person. These are static images of fictional people created by an AI, Stable Diffusion 3",
    func: faker.image.personPortrait,
    callSignature: "faker:image:personPortrait",
    tags: ["image"],
  },
  {
    funcName: "Image URL",
    funcDesc: "Generates a random image URL.",
    func: faker.image.url,
    callSignature: "faker:image:url",
    tags: ["image"],
  },
];
