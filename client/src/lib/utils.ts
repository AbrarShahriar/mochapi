import { clsx, type ClassValue } from "clsx";
import { format, intervalToDuration, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Endpoint } from "./type";

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

export function calculateResourceAllocation(endpoints: Endpoint[]) {
  let totalBytes = 0;
  endpoints.forEach(
    (endpoint) =>
      (totalBytes += calculateByte(JSON.stringify(endpoint.generatedData)))
  );
  return formatByteSize(totalBytes);
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1, str.length);
}

export function formatDate(date: string, formatter: string = "PP") {
  return format(parseISO(date), formatter);
}

export function calculateUptime(start: string, end: Date = new Date()) {
  const duration = intervalToDuration({
    start: parseISO(start),
    end,
  });
  return duration.minutes
    ? `${duration.hours ? duration.hours + "h" : ""} ${duration.minutes}m`
    : "0s";
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}
