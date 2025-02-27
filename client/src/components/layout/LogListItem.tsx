import { parseISO, format } from "date-fns";
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { AnalyticsData } from "@/lib/type";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";
import { formatByteSize, simplifyUserAgent } from "@/lib/utils";

interface Props {
  log: AnalyticsData;
}

export default function LogListItem({ log }: Props) {
  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <span className="text-emerald-600">{statusCode}</span>;
    } else if (statusCode >= 300 && statusCode < 400) {
      return <span className=" text-blue-600">{statusCode}</span>;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <span className="text-amber-600">{statusCode}</span>;
    } else {
      return (
        <Badge className="bg-rose-600 hover:bg-rose-700 text-white">
          {statusCode}
        </Badge>
      );
    }
  };

  return (
    <TableRow className="font-mono [&_td]:px-4 [&_td]:py-2 odd:bg-zinc-900/50">
      <TableCell>
        <p>
          <span className="text-muted-foreground">
            {format(parseISO(log.timestamp), "MMM dd").toUpperCase()}
          </span>{" "}
          <span>{format(parseISO(log.timestamp), "HH:mmaaa")}</span>
        </p>
      </TableCell>
      <TableCell>
        <p className="truncate max-w-[250px]">
          <span>{log.method}</span> {getStatusBadge(log.response.statusCode)}
        </p>
      </TableCell>
      <TableCell>{log.request.host || "N/A"}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
          <span>{log.duration}ms</span>
        </div>
      </TableCell>
      <TableCell>{formatByteSize(log.response.size, 1)}</TableCell>
      <TableCell>{simplifyUserAgent(log.userAgent)}</TableCell>
    </TableRow>
  );
}
