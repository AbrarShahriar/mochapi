"use client";

import { Editor } from "@monaco-editor/react";
import { Button } from "../ui/button";
import { Copy, Sparkles } from "lucide-react";

interface Props {
  generatedData: Record<string, never>;
}

export default function GeneratedDataViewer({ generatedData }: Props) {
  return (
    <section className="border border-zinc-700 rounded-md  shadow">
      <div className="w-full flex items-center justify-end bg-[#1e1e1e] rounded-t-md">
        <div className="mr-auto  text-sm text-blue-400 border-r-2 border-r-zinc-800 px-4 ">
          <pre>data.json</pre>
        </div>
        <Button className="rounded-none hover:bg-zinc-800 bg-transparent">
          <Sparkles /> Generate
        </Button>
        <Button className="rounded-none hover:bg-zinc-800 bg-transparent">
          <Copy />
          Copy Code
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
          wordWrap: "on",
          readOnly: true,
        }}
        defaultValue={JSON.stringify(generatedData)}
      />
    </section>
  );
}
