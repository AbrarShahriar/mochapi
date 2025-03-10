import { faker } from "@faker-js/faker";

export const companyFn = [
  {
    funcName: "Company Name",
    funcDesc: "Generates a random company name.",
    func: faker.company.name,
    callSignature: "faker:company:name",
    tags: ["company"],
  },
];
