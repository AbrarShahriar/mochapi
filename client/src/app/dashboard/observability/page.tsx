import Chart_Activity from "@/components/layout/Chart_Activity";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/data-access/project-access";
import { currentUser } from "@clerk/nextjs/server";
import { Logs, MoveRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type EndpointPayload = {
  projectId: string;
  projectName: string;
  endpointName: string;
  entries: number;
};

export default async function ObservabilityPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const projectsRes = await getProjects();

  const endpointNames: EndpointPayload[] = [];
  if (projectsRes.payload) {
    projectsRes.payload.forEach((project) => {
      project.endpoints.forEach((endpoint) => {
        endpointNames.push({
          projectId: project.id,
          projectName: project.name,
          endpointName: endpoint.name,
          entries: endpoint.numOfRows,
        });
      });
    });
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Observability</h1>

      <p className="mb-8 text-white/70">
        Look at all the request logs related to each of your project.
      </p>

      <div className="flex flex-col gap-2">
        {endpointNames.length !== 0 ? (
          endpointNames.map((el, i) => (
            <div
              key={i}
              className="shadow border border-zinc-800 p-4 rounded-md bg-zinc-900 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 text-center">
                <p className="text-sm text-white/50">
                  {user?.emailAddresses[0].emailAddress.split("@")[0]}
                </p>
                <MoveRight strokeWidth={1} className="text-muted-foreground" />
                <p className="w-[80px] truncate text-ellipsis">
                  {el.projectName}
                </p>
                <MoveRight strokeWidth={1} className="text-muted-foreground" />
                <p>{el.endpointName}</p>
                <p className="text-muted-foreground text-sm">
                  ({el.entries} entries)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Chart_Activity lineColor="stroke-zinc-500" />
                <Link
                  href={`/dashboard/observability/requests?projectId=${el.projectId}&projectName=${el.projectName}&endpointName=${el.endpointName}`}
                >
                  <Button size={"icon"} className="hover:bg-zinc-800">
                    <Logs />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No projects or endpoints found</p>
        )}
      </div>
    </main>
  );
}
