import Chart_Analytics from "@/components/layout/Chart_Analytics";
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
import { getLogs } from "@/lib/data-access/observability-access";
import { currentUser } from "@clerk/nextjs/server";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
    projectName: string;
    endpointName: string;
  };
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const projectId = searchParams.projectId;
  const projectName = searchParams.projectName;
  const endpointName = searchParams.endpointName;

  const logsRes = await getLogs(projectId, projectName, endpointName);

  console.log("solo", logsRes.payload && logsRes.payload);

  if (!logsRes || !logsRes.payload) {
    return <p>Something went wrong</p>;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Usage & Logs</h1>

      <p className="mb-8 text-white/70">
        Daily logs of &quot;/{projectName}/{endpointName}&quot;
      </p>
      <Chart_Analytics logs={logsRes.payload} className="mb-8" />

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
              placeholder={`${logsRes.payload.length} total logs found...`}
            />
          </div>
          <div className="rounded-md border border-zinc-800">
            {logsRes.payload.length !== 0 ? (
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
                  {logsRes.payload.map((log, index) => (
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
