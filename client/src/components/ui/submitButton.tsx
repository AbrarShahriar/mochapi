"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  children,
  className,
  disabled,
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("bg-green-600 hover:bg-green-500 font-bold", className)}
      type="submit"
      aria-disabled={pending}
      disabled={pending || disabled}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
}
