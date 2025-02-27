"use client";

import Chart_Analytics from "@/components/layout/Chart_Analytics";
import Loader from "@/components/layout/Loader";
import LogListItem from "@/components/layout/LogListItem";
import NoData from "@/components/layout/NoData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { authFetch } from "@/lib/actions/helper";
import { AnalyticsData, BackendResponse } from "@/lib/type";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const endpointName = searchParams.get("endpointName");

  const [logs, setLogs] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getLogs = async () => {
      const res = await authFetch<BackendResponse<AnalyticsData[]>>(
        `/monitoring/logs?projectId=${projectId}&projectName=${projectName}&endpointName=${endpointName}`
      );

      if (res.success && res.payload) {
        setLogs(
          res.payload.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        );
      }

      setLoading(false);
    };

    getLogs();
  }, [endpointName, projectId, projectName]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Usage & Logs</h1>

      <p className="mb-8 text-white/70">
        Daily logs of &quot;/{projectName}/{endpointName}&quot;
      </p>
      <Chart_Analytics logs={logs} className="mb-8" />

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-zinc-100">Log Entries</CardTitle>
              <CardDescription className="text-zinc-400">
                Detailed log information for your application
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-md border-zinc-800  px-4 m-4 mt-0 flex items-center justify-between gap-2">
            <Search className="size-4" />
            <Input
              className="bg-transparent "
              placeholder={`${logs.length} total logs found...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="rounded-md border border-zinc-800">
            {logs && logs.length !== 0 ? (
              <Table className="text-zinc-200">
                <TableHeader className="border-red-900">
                  <TableRow className="border-zinc-950">
                    <TableHead className="text-zinc-400">Timestamp</TableHead>
                    <TableHead className="text-zinc-400">Status</TableHead>
                    <TableHead className="text-zinc-400">Host</TableHead>
                    <TableHead className="text-zinc-400">Duration</TableHead>
                    <TableHead className="text-zinc-400">Size</TableHead>
                    <TableHead className="text-zinc-400">User Agent</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {logs.map((log, index) => (
                    <LogListItem log={log} key={index} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <NoData subtitle="No results found for this endpoint" />
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
