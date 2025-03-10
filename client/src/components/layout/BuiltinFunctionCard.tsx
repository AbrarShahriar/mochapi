"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ChevronRight, CirclePlay } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface Props {
  funcName: string;
  funcDesc: string;
  func: () => unknown;
}

export default function BuiltinFunctionCard({
  funcDesc,
  funcName,
  func,
}: Props) {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    setOutput(func() as string);
  }, []);

  return (
    <Card className="bg-zinc-900 border-zinc-700/50">
      <CardHeader>
        <CardTitle>{funcName}</CardTitle>
        <CardDescription>{funcDesc}</CardDescription>
      </CardHeader>
      <CardContent className="mb-4">
        <Button
          className="w-full bg-zinc-800 hover:bg-zinc-700/50"
          onClick={() => {
            setOutput(func() as string);
          }}
        >
          <CirclePlay />
          Run
        </Button>
      </CardContent>

      <CardFooter className="bg-zinc-700/25 py-2 *outline *outline-white font-mono ">
        <div className="flex items-start gap-2 w-full">
          <p className="flex items-center gap-1 text-muted-foreground">
            <ChevronRight className="size-5" /> Output:
          </p>
          <Textarea
            rows={2}
            className="min-h-5 w-full overflow-y-scroll p-1 px-2 resize-none border-0"
            readOnly
            value={output}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
