"use server";

import { currentUser, auth } from "@clerk/nextjs/server";
import { BACKEND_URL } from "../constants";

export async function authFetch(url: string, options?: RequestInit) {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in.");

  const { getToken } = await auth();
  const token = await getToken();
  if (!token) throw new Error("Invalid token.");

  const res = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
