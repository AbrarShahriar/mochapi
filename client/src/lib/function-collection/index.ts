import { animalFn } from "./animal";
import { bookFn } from "./book";
import { commerceFn } from "./commerce";
import { companyFn } from "./company";
import { dateFn } from "./date";
import { financeFn } from "./finance";
import { foodsFn } from "./food";
import { imageFn } from "./image";
import { internetFn } from "./internet";
import { locationFn } from "./location";
import { personFn } from "./person";

const functions = [
  ...personFn,
  ...bookFn,
  ...commerceFn,
  ...companyFn,
  ...financeFn,
  ...dateFn,
  ...imageFn,
  ...locationFn,
  ...internetFn,
  ...foodsFn,
  ...animalFn,
];
export default functions;
