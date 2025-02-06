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
    });
    console.log(user);
    redirect("/dashboard");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials" : response.statusText,
    };
  }
}
