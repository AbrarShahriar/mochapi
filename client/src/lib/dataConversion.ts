export function toJson(data: Record<string, unknown>[]): string {
  try {
    return JSON.stringify(data, null, 5);
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function toCSV(data: Record<string, unknown>[]): string {
  try {
    let res = "";

    // Headers
    const keys = Object.keys(data[0]);
    keys.forEach((key, i) => (res += `${key}${i != keys.length - 1 && ","}`));
    res += "\n";

    // Data
    for (let i = 0; i < data.length; i++) {
      keys.forEach(
        (key, j) => (res += `${data[i][key]}${j != keys.length - 1 && ","}`)
      );
      res += "\n";
    }

    return res;
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function toMDTable(data: Record<string, unknown>[]) {
  try {
    let res = "|";

    // Headers
    const keys = Object.keys(data[0]);
    keys.forEach((key) => (res += ` ${key} |`));
    res += "\n";

    // Separators
    res += "|";
    keys.forEach(() => (res += " ----- |"));
    res += "\n";

    // Data
    for (let i = 0; i < data.length; i++) {
      res += "|";
      keys.forEach((key) => (res += ` ${data[i][key]} |`));
      res += "\n";
    }

    return res;
  } catch (error) {
    console.error(error);
    return "";
  }
}
