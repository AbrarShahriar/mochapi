import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateByte(str: string) {
  return str.length * 2;
}
export function formatByteSize(bytes: number) {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
  else return (bytes / 1073741824).toFixed(3) + " GiB";
}

export function calculateResourceAllocation(
  routes: { generatedData: string }[]
) {
  let totalBytes = 0;
  routes.forEach((route) => (totalBytes += calculateByte(route.generatedData)));
  return formatByteSize(totalBytes);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1, str.length);
}
