"use client";

import { Editor } from "@monaco-editor/react";
import { Button } from "../ui/button";
import { Copy, Sparkles } from "lucide-react";
import { Endpoint, SchemaField } from "@/lib/type";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { copyToClipboard } from "@/lib/utils";

interface Props {
  generatedData: Record<string, unknown>[];
  numOfRows: number;
  schema: SchemaField[];
  setDataUpdated: (val: boolean) => void;
  setRouteData: Dispatch<SetStateAction<Endpoint | null>>;
  worker: Worker;
}

export default function GeneratedDataViewer({
  generatedData,
  numOfRows,
  schema,
  setDataUpdated,
  setRouteData,
  worker,
}: Props) {
  const [editorValue, setEditorValue] =
    useState<Record<string, unknown>[]>(generatedData);

  const copyRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    worker.onmessage = (
      event: MessageEvent<{
        payload: Record<string, unknown>[];
        type: "SUCCESS" | "ERROR";
      }>
    ) => {
      if (event.data.type === "SUCCESS") {
        setEditorValue(event.data.payload);
        setDataUpdated(true);
        setRouteData((prev) => {
          return prev && { ...prev, generatedData: event.data.payload };
        });
      } else {
        toast({
          variant: "destructive",
          title: "Data generation failed :(",
          description:
            "Likely due to invalid functions. If the issue persists, contact us.",
        });
      }
    };
  }, []);

  const handleGenerateClick = () => {
    worker.postMessage({
      type: "GENERATE_DATA",
      payload: { numOfRows, schema },
    });
  };

  const handleCopy = async () => {
    await copyToClipboard(copyRef.current?.value || "", copyRef);
    toast({
      variant: "default",
      title: "Copied",
      description: "Generated Data copied",
    });
  };

  return (
    <section className="border border-zinc-700 rounded-md  shadow">
      <div className="w-full flex items-center justify-end bg-[#1e1e1e] rounded-t-md">
        <div className="mr-auto  text-sm text-blue-400 border-r-2 border-r-zinc-800 px-4 ">
          <pre>data.json</pre>
        </div>
        <Button
          onClick={handleGenerateClick}
          className="rounded-none hover:bg-zinc-800 bg-transparent"
        >
          <Sparkles /> Generate
        </Button>
        <Button
          onClick={handleCopy}
          className="rounded-none hover:bg-zinc-800 bg-transparent"
        >
          <Copy />
          Copy Data
          <Input
            ref={copyRef}
            className="hidden"
            value={JSON.stringify(editorValue, null, 2)}
          />
        </Button>
      </div>

      <Editor
        className="p-0"
        height={"60vh"}
        defaultLanguage="json"
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          wordWrap: "bounded",
          readOnly: true,
        }}
        value={JSON.stringify(editorValue, null, 3)}
      />
    </section>
  );
}
