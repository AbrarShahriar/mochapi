"use client";
import functions from "./function-collection";

export type BuiltInFunctionType = {
  funcName: string;
  funcDesc: string;
  func: () => unknown;
  callSignature: string;
  tags: string[];
};

export const functionCategories = [
  "person",
  "food",
  "book",
  "animal",
  "commerce",
  "company",
  "date",
  "finance",
  "image",
  "location",
  "internet",
  "custom",
];

export const functionMap: BuiltInFunctionType[] = functions;
