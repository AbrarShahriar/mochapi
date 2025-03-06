"use client";

import { Copy, Eye, MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRef, useState } from "react";
import { deleteProject } from "@/lib/actions/project-actions";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { Input } from "../ui/input";

interface Props {
  apiKey: string;
  projectId: string;
}

export default function ProjectAction({ apiKey, projectId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const copyRef = useRef<HTMLInputElement>(null);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteProject(projectId);
    if (result.success) {
      toast({
        variant: "success",
        title: "Success :)",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failure :(",
        description: result.message,
      });
    }
    setLoading(false);
    setOpen(false);
  };

  const handleCopy = async () => {
    await copyToClipboard(apiKey, copyRef);

    toast({
      variant: "default",
      title: "Copied!",
      description: "API Key has been copied.",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="self-center w-8 h-8 p-0 hover:bg-zinc-700 hover:text-white"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-2"
              href={`/dashboard/projects/${projectId}`}
            >
              <Eye /> View Project
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleCopy}>
            <Input ref={copyRef} value={apiKey} className="hidden" />
                  <Copy /> Copy API Key
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-400"
          >
            <Trash /> Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Delete Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to permenantly delete this project? Deleting
              this project will also delete the endpoints and all the associated
              data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <div className="flex items-center justify-between w-full">
              <DialogClose asChild>
                <Button className="bg-sky-600 hover:bg-sky-500" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={loading}
                className="bg-red-700  hover:bg-red-600"
                onClick={handleDelete}
                type="button"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
