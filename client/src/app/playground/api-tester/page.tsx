"use client";

import CodeCopy from "@/components/layout/CodeCopy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ApiTesterPage() {
  const [fetchedData, setFetchedData] = useState<unknown[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [linkState, setLinkState] = useState(
    "http://localhost:3001/v1/api/test/testroute"
  );
  const [apiKey, setApiKey] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJhYzg1Zjk2Zi1lYzUyLTQ4NGUtYWMxNi1iZjYwYTkyMDVkNjkiLCJpYXQiOjE3NDA2NjQwNTB9.2WgrMVkj0iw5a73VVacgaOmxaVxPP90PJ5sYfAFQ7Sc"
  );

  const { toast } = useToast();

  const handleFetch = async () => {
    if (linkState == "" || !linkState) {
      return toast({
        variant: "destructive",
        title: "Failure :(",
        description: "Please write the URL of the endpoint.",
      });
    }

    if (apiKey == "" || !apiKey) {
      return toast({
        variant: "destructive",
        title: "Failure :(",
        description: "Please write the API key of the project.",
      });
    }

    setFetchLoading(true);

    const res = await fetch(linkState, {
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setFetchedData(data);
    }

    setFetchLoading(false);
  };

  return (
    <main className="w-[90%] m-auto mb-24 mt-32">
      <h1 className="text-3xl font-semibold">API Tester</h1>
      <p className="mb-8 text-white/70">
        Test your APIs or other user&apos;s APIs.
      </p>

      <div className="grid grid-cols-2 w-full gap-4 max-md:grid-cols-1 ">
        <div className="flex flex-col gap-4 bg-zinc-900/25 p-4 rounded-md ">
          <div>
            <Label htmlFor="url">Endpoint URL:</Label>
            <Input
              className="bg-zinc-900/50 border border-zinc-700 py-6"
              id="url"
              disabled={fetchLoading}
              placeholder="Write your endpoint url..."
              value={linkState}
              onChange={(e) => setLinkState(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="apikey">API Key:</Label>
            <Input
              className="bg-zinc-900/50 border border-zinc-700 py-6"
              id="apikey"
              disabled={fetchLoading}
              placeholder="Write project API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div>
            <Button
              className="flex items-center gap-2"
              disabled={fetchLoading}
              onClick={handleFetch}
            >
              {fetchLoading && <Loader2 className="size-5 animate-spin" />}
              {fetchLoading ? "Sending..." : "Send"}
            </Button>
          </div>
          <CodeCopy apiKey={apiKey} url={linkState} />
        </div>
        <div className="max-md:p-4">
          <section className="rounded-md shadow h-full overflow-hidden">
            <div className="mr-auto bg-[#1e1e1e] text-sm text-blue-400 border-r-2 border-r-zinc-800 px-4 py-2 ">
              <pre>data.json</pre>
            </div>

            <Editor
              className="p-0 h-screen max-md:h-[50vh]"
              defaultLanguage="json"
              theme="vs-dark"
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                wordWrap: "bounded",
                readOnly: true,
              }}
              value={JSON.stringify(fetchedData, null, 3)}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
