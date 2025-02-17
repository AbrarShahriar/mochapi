"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Copy, PlayCircle, Save } from "lucide-react";
import {
  injectFunctionBody,
  safeContext,
  validator,
} from "@/lib/code-executor/executor";
import { useSidebar } from "../ui/sidebar";

const editorDefaultState = `/*
* Write your function from here.
* The "Call Signature" is the function name.
* Write the function body below.
*/

const names = ["Abrar", "Shahriar", "Kabir"];
const randomIndex = Math.floor(Math.random() * names.length);
return names[randomIndex];`;

interface ExecutionResult {
  data: string;
  executionTime: number;
}

export default function FunctionEditor() {
  const [functionBody, setFunctionBody] = useState(editorDefaultState);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const { open } = useSidebar();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  useEffect(() => {
    console.log(open);

    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current?.layout();
      }, 100);
    }
  }, [open]);

  const handleEditorChange = (value: string) => {
    setFunctionBody(value);
  };

  const createSafeAPI = useCallback(safeContext, []);
  const validateCode = useCallback(validator, []);

  const executeFunction = useCallback(async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setError("");
    setOutput(null);

    const startTime = performance.now();

    try {
      validateCode(functionBody);
      const api = createSafeAPI();

      const safeFunction = new Function(
        ...Object.keys(api),
        injectFunctionBody(functionBody)
      );

      const result = await Promise.race([
        Promise.resolve(safeFunction(...Object.values(api))),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Execution timeout")), 1000)
        ),
      ]);

      const executionTime = performance.now() - startTime;

      setOutput({
        data: result,
        executionTime,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsExecuting(false);
    }
  }, [functionBody, isExecuting, validateCode, createSafeAPI]);

  return (
    <div
      id="function-body"
      className="border border-zinc-700 rounded-md  shadow w-full"
    >
      <div className="w-full flex items-center justify-end bg-[#1e1e1e] rounded-t-md">
        <div className="mr-auto  text-sm text-blue-400 border-r-2 border-r-zinc-800 px-4 ">
          <pre>main.js</pre>
        </div>
        <Button
          onClick={executeFunction}
          className="rounded-none hover:bg-zinc-800 bg-transparent"
        >
          <PlayCircle /> Run
        </Button>
        <Button className="rounded-none hover:bg-zinc-800 bg-transparent">
          <Save /> Save Draft
        </Button>
        <Button className="rounded-none hover:bg-zinc-800 bg-transparent">
          <Copy />
          Copy Code
        </Button>
      </div>
      <Editor
        height={"50vh"}
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
        defaultValue={editorDefaultState}
        onChange={(value) => handleEditorChange(value || "")}
        onMount={handleEditorDidMount}
      />

      <div className="p-4 border border-zinc-600 rounded bg-zinc-800">
        <h3 className="font-medium mb-2">Output</h3>
        <pre className={`whitespace-pre-wrap ${error && "text-red-500"}`}>
          {output && JSON.stringify(output.data, null, 2)}
          {error && `${error}`}
        </pre>
        {output && (
          <p className="text-sm text-gray-500 mt-2">
            Execution time: {output.executionTime.toFixed(5)}ms
          </p>
        )}
      </div>
    </div>
  );
}
