"use client";

import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-purple-800 font-semibold"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
}
