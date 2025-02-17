"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
import { createSession } from "./session";

export async function signupAction(
  state: FormState,
  formdata: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409 ? "User Already Exists" : response.statusText,
    };
  }
}

export async function signinAction(
  state: FormState,
  formdata: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const user = await response.json();

    // TODO: create session
    await createSession({
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
    redirect("/dashboard");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials" : response.statusText,
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token.");
    }

    const { accessToken, refreshToken } = await res.json();

    // Update session
    const updatedRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });

    if (!updatedRes.ok) throw new Error("Failed to update tokens");

    return accessToken;
  } catch (error) {
    console.error("Refreshs token failed: ", error);
    return null;
  }
};
