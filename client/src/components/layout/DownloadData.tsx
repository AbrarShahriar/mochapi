"use client";

import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toCSV, toJson, toMDTable } from "@/lib/dataConversion";

interface Props {
  data: Record<string, unknown>[];
  project: { projectName: string; endpointName: string };
}

interface FileType {
  label: string;
  format: "json" | "csv" | "md";
  handler: (data: Record<string, unknown>[]) => string;
  Icon: React.ElementType;
  mimetype: string;
}

export default function DownloadData({ data, project }: Props) {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const fileTypeHandler: FileType[] = [
    {
      label: "JSON",
      format: "json",
      handler: (data) => toJson(data),
      Icon: FileJson,
      mimetype: "application/json",
    },
    {
      label: "CSV",
      format: "csv",
      handler: (data) => toCSV(data),
      Icon: FileSpreadsheet,
      mimetype: "text/csv",
    },
    {
      label: "Markdown Table",
      format: "md",
      handler: (data) => toMDTable(data),
      Icon: FileText,
      mimetype: "text/markdown",
    },
  ];

  async function handleDownload(fileType: FileType) {
    setDownloadLoading(true);

    try {
      const filename = `${project.projectName}-${
        project.endpointName
      }-${new Date().toISOString()}.${fileType.format}`;
      const text = fileType.handler(data);

      const blob = new Blob([text], {
        type: `${fileType.mimetype};charset=utf-8`,
      });

      const link = document.createElement("a");

      link.setAttribute("download", filename);

      link.setAttribute("href", URL.createObjectURL(blob));

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={downloadLoading}
          className="bg-transparent border border-green-600/50 hover:border-green-600/90"
        >
          <Download /> {downloadLoading ? "Downloading..." : "Download"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-zinc-900" align="start">
        <DropdownMenuGroup>
          {fileTypeHandler.map((fileType, i) => (
            <DropdownMenuItem key={i} onClick={() => handleDownload(fileType)}>
              <fileType.Icon /> {fileType.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
