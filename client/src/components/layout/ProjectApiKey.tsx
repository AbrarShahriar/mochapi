"use client";

import { Copy, Eye, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Props {
  name: string;
  apiKey: string;
}

export default function ProjectApiKey({ apiKey, name }: Props) {
  const { toast } = useToast();
  const handleCopy = async () => {
    await copyToClipboard(apiKey);
    toast({
      variant: "default",
      title: "Copied :)",
      description: "API Key copied. Do not share with strangers!",
    });
  };

  return (
    <div className="mb-12">
      <p className="text-s font-semibold mb-1">API Key: </p>
      <div className="bg-zinc-900/50 flex items-center rounded-md border border-zinc-700 mb-1">
        <div className="p-4">
          <pre>{Array(32).fill("*").join("")}</pre>
        </div>
        <div className="ml-auto border-l border-zinc-700">
          <Button
            onClick={handleCopy}
            className="rounded-none bg-transparent hover:bg-transparent"
          >
            <Copy />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-none bg-transparent hover:bg-transparent">
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800">
              <DialogHeader>
                <DialogTitle>API Key for {name}</DialogTitle>
                <DialogDescription>
                  Avoid sharing your API key publicly.
                </DialogDescription>
              </DialogHeader>
              <p className="break-all p-3 text-white/85 text-sm bg-zinc-900 border border-zinc-800 tracking-wider rounded-md">
                {apiKey}
              </p>
              <Button onClick={handleCopy}>
                <Copy />
                Copy
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        <AlertCircle className="size-4 text-muted-foreground" /> Never share
        your API key with other users.
      </p>
    </div>
  );
}
