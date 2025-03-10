import { faker } from "@faker-js/faker";

export const bookFn = [
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
