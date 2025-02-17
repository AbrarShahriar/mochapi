export const safeContext = () => {
  const api = {
    generate: (length: number, fn: () => any) => {
      if (length > 1000) throw new Error("Array length exceeds maximum");
      return Array.from({ length }, fn);
    },
    random: (min: number, max: number) => {
      min = Number(min);
      max = Number(max);
      if (isNaN(min) || isNaN(max)) throw new Error("Invalid numbers");
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sum: (arr: number[]) => {
      if (!Array.isArray(arr)) throw new Error("Input must be an array");
      return arr.reduce((a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error("Array elements must be numbers");
        }
        return a + b;
      }, 0);
    },
    average: (arr: number[]) => {
      if (!Array.isArray(arr)) throw new Error("Input must be an array");
      return api.sum(arr) / arr.length;
    },
    map: (arr: any[], fn: (item: any) => any) => {
      if (!Array.isArray(arr)) throw new Error("Input must be an array");
      return arr.map(fn);
    },
    filter: (arr: any[], fn: (item: any) => boolean) => {
      if (!Array.isArray(arr)) throw new Error("Input must be an array");
      return arr.filter(fn);
    },
  };

  return Object.freeze(api);
};

export const validator = (code: string) => {
  const forbiddenPatterns = [
    "window.",
    "document.",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "XMLHttpRequest",
    "eval(",
    "new Function(",
    "WebSocket",
    "Worker(",
    "iframe",
    "alert(",
    "prompt(",
    "confirm(",
    "__proto__",
    "prototype.",
    "constructor.",
    "process.",
    "require(",
    "import ",
    "export ",
    "<script",
  ];

  // Escape special characters in forbidden patterns
  const escapeRegex = (str: string) =>
    str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  const containsForbiddenPattern = forbiddenPatterns.some((pattern) => {
    const regex = new RegExp(escapeRegex(pattern), "i"); // Case-insensitive match
    return regex.test(code);
  });

  if (containsForbiddenPattern) {
    throw new Error("Code contains forbidden patterns");
  }
};

export const injectFunctionBody = (functionBody: string) => `"use strict";
          
          // Prevent access to globals
          const window = undefined;
          const document = undefined;
          const global = undefined;
          const process = undefined;
          const require = undefined;
          
          try {
            ${functionBody}
          } catch (e) {
            throw new Error('Execution error: ' + e.message);
          }`;
