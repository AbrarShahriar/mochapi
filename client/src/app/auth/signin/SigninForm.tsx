"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signinAction } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";

export default function SigninForm() {
  const [state, action] = useFormState(signinAction, undefined);
  return (
    <form action={action} className="flex flex-col w-[100%] gap-4">
      <div>
        <Label htmlFor="email" />
        <Input placeholder="Email" id="email" type="email" name="email" />
        {state?.error?.email && (
          <p className="text-red-600 text-sm mt-2 mb-4">{state.error.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password" />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
        />
        {state?.error?.password && (
          <ul className="text-red-600  mb-4 mt-2  text-sm">
            <li>Password must be:</li>
            {state.error.password.map((error) => (
              <li className="list-disc ml-4" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <SubmitButton>Login</SubmitButton>
      {state?.message && <p>{state.message}</p>}

      <p className="text-center text-sm -mt-1">
        {"Don't"} have an account?{" "}
        <Link className="text-blue-500" href="/auth/signup">
          Create an Account
        </Link>
      </p>
    </form>
  );
}
