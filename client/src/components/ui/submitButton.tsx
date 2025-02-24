"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  children,
  className,
  disabled,
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("bg-green-600 hover:bg-green-500 font-semibold", className)}
      type="submit"
      aria-disabled={pending}
      disabled={pending || disabled}
    >
      {pending && <LoaderCircle className="size-5 animate-spin" />}
      {pending ? "Submitting..." : children}
    </Button>
  );
}
