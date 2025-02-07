"use client";

import { Copy, Eye, MoreHorizontal, Share2, Trash } from "lucide-react";
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

interface Props {
  apiKey: string;
  projectId: string;
}

export default function ProjectAction({ apiKey, projectId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 self-center hover:bg-zinc-700 hover:text-white"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
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
        <DropdownMenuItem>
          <Share2 /> Share Project
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(apiKey)}>
          <Copy /> Copy API Key
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400">
          <Trash /> Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
