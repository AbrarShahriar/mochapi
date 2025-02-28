"use client";

import { Editor } from "@monaco-editor/react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

interface Props {
  apiKey: string;
  url: string;
}

type Snippet = {
  tabValue: string;
  tabLabel: string;
  language: string;
  code: (apiKey: string, url: string) => string;
};

const snippets: Snippet[] = [
  {
    tabValue: "curl",
    tabLabel: "cURL",
    language: "powershell",
    code: (apiKey, url) => `curl "${url}" -H "Authorization: Bearer ${apiKey}"`,
  },
  {
    tabValue: "js",
    tabLabel: "JavaScript",
    language: "javascript",
    code: (apiKey, url) => `fetch("${url}", {
    method: "GET",
    headers: { "Authorization": "Bearer ${apiKey}" }
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);`,
  },
  {
    tabValue: "py",
    tabLabel: "Python",
    language: "python",
    code: (apiKey, url) => `import urllib.request

req = urllib.request.Request("${url}", headers={"Authorization": "Bearer ${apiKey}"})
with urllib.request.urlopen(req) as res:
    print(res.read().decode())
`,
  },
  {
    tabValue: "php",
    tabLabel: "PHP",
    language: "php",
    code: (apiKey, url) => `<?php 
    $opts = ["http" => ["header" => "Authorization: Bearer ${apiKey}"]];
    $context = stream_context_create($opts);
    echo file_get_contents("${url}", false, $context);
?>`,
  },
];

export default function CodeCopy({ apiKey, url }: Props) {
  const [activeTab, setActiveTab] = useState("curl");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(
          model,
          (snippets.find((el) => el.tabValue == activeTab) as Snippet).language
        );
        editorRef.current.setValue(
          (snippets.find((el) => el.tabValue == activeTab) as Snippet).code(
            apiKey,
            url
          )
        );
      }
    }
  }, [activeTab]);

  return (
    <Tabs
      defaultValue="curl"
      className="bg-zinc-900 rounded-md"
      onValueChange={setActiveTab}
    >
      <TabsList className="bg-zinc-800/50 rounded-b-none w-full justify-start">
        {snippets.map((snippet, i) => (
          <TabsTrigger key={i} value={snippet.tabValue}>
            {snippet.tabLabel}
          </TabsTrigger>
        ))}
      </TabsList>
      <Editor
        className="p-0"
        height={"50vh"}
        defaultLanguage={snippets[0].language}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          fontSize: 16,
          lineNumbers: "off",
          minimap: { enabled: false },
          wordWrap: "bounded",
          readOnly: true,
        }}
        defaultValue={snippets[0].code(apiKey, url)}
      />
    </Tabs>
  );
}
