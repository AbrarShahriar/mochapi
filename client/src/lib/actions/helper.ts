"use server";
import "server-only";
import { auth } from "@clerk/nextjs/server";
import { BACKEND_URL } from "../constants";
import { redirect } from "next/navigation";
import { generateSignature } from "../utils";

interface IOption extends RequestInit {
  body?: string;
}

export async function authFetch<T>(url: string, options?: IOption): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) throw new Error("Invalid token.");

  const dataToSign = options?.body ? options.body : url;
  const signature = generateSignature(dataToSign);

  const res = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options?.headers,
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Signature": signature,
    },
  });

  const data = await res.json();
  return data;
}

export async function requireSession() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
}
