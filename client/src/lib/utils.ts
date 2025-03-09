import { clsx, type ClassValue } from "clsx";
import { format, intervalToDuration, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Endpoint } from "./type";
import { LOCALSTORAGE_FUNCTION_DRAFT_KEY } from "./constants";
import { UAParser } from "ua-parser-js";
import { RefObject } from "react";
import * as crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateByte(str: string) {
  return str.length * 2;
}
export function formatByteSize(bytes: number, precision: number = 3) {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(precision) + " KiB";
  else if (bytes < 1073741824)
    return (bytes / 1048576).toFixed(precision) + " MiB";
  else return (bytes / 1073741824).toFixed(precision) + " GiB";
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

export async function copyToClipboard(
  text: string,
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement>
) {
  if (window && window.navigator && window.navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    ref.current?.select();
    ref.current?.setSelectionRange(0, 999);
  } else {
    throw new Error("Please copy manually");
  }
}

export function saveFunctionToDraft(fnBody: string) {
  localStorage.setItem(LOCALSTORAGE_FUNCTION_DRAFT_KEY, fnBody);
}

export function loadFunctionFromDraft(): string | null {
  return localStorage.getItem(LOCALSTORAGE_FUNCTION_DRAFT_KEY);
}

export function simplifyUserAgent(
  userAgent: string,
  maxLength: number = 50
): string {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();

  const apiClients = [
    "Thunder Client",
    "PostmanRuntime",
    "curl",
    "Wget",
    "HTTPie",
  ];
  for (const client of apiClients) {
    if (userAgent.includes(client)) {
      return client;
    }
  }

  // Build a simplified user agent string
  let simplifiedUA =
    `${browser.name || "Unknown Browser"} - ` + `${os.name || "Unknown OS"}`;

  // Trim excessive spaces
  simplifiedUA = simplifiedUA.replace(/\s+/g, " ").trim();

  // Truncate if needed
  return simplifiedUA.length > maxLength
    ? simplifiedUA.slice(0, maxLength) + "..."
    : simplifiedUA;
}

export function generateSignature(data: string): string {
  console.log("ENV", process.env.SIGNATURE_KEY);

  return crypto
    .createHmac("sha256", process.env.SIGNATURE_KEY as string)
    .update(data)
    .digest("hex");
}
