"use server";
import { auth } from "@clerk/nextjs/server";
import { BACKEND_URL } from "../constants";
import { redirect } from "next/navigation";

export async function authFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) throw new Error("Invalid token.");

  const res = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function requireSession() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
}
