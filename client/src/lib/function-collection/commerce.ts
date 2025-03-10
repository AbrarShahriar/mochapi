import { faker } from "@faker-js/faker";

export const commerceFn = [
  {
    funcName: "Department",
    funcDesc: "Generates a random commerce department.",
    func: faker.commerce.department,
    callSignature: "faker:commerce:department",
    tags: ["commerce"],
  },
  {
    funcName: "Product Name",
    funcDesc: "Generates a random product name.",
    func: faker.commerce.productName,
    callSignature: "faker:commerce:productName",
    tags: ["commerce"],
  },
  {
    funcName: "Product Adjective",
    funcDesc: "Generates a random product adjective.",
    func: faker.commerce.productAdjective,
    callSignature: "faker:commerce:productAdjective",
    tags: ["commerce"],
  },
  {
    funcName: "Product Description",
    funcDesc: "Generates a random product description.",
    func: faker.commerce.productDescription,
    callSignature: "faker:commerce:productDescription",
    tags: ["commerce"],
  },
  {
    funcName: "Product Material",
    funcDesc: "Generates a random product material.",
    func: faker.commerce.productMaterial,
    callSignature: "faker:commerce:productMaterial",
    tags: ["commerce"],
  },
  {
    funcName: "Product",
    funcDesc: "Generates a random product.",
    func: faker.commerce.product,
    callSignature: "faker:commerce:product",
    tags: ["commerce"],
  },
  {
    funcName: "Price",
    funcDesc: "Generates a random product price.",
    func: faker.commerce.price,
    callSignature: "faker:commerce:price",
    tags: ["commerce"],
  },
  {
    funcName: "ISBN",
    funcDesc: "Generates a random ISBN number.",
    func: faker.commerce.isbn,
    callSignature: "faker:commerce:isbn",
    tags: ["commerce"],
  },
];
