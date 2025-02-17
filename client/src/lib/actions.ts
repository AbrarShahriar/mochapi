"use server";

import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";
// import { getSession } from "./session";

export const getProfile = async () => {
  // const session = await getSession();
  // const res = await fetch(`${BACKEND_URL}/auth/profile`, {
  //   headers: {
  //     authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });

  const res = await authFetch(`${BACKEND_URL}/auth/profile`);
  const data = await res.json();

  return data;
};
