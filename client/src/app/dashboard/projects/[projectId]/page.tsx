import DashboardCard from "@/components/layout/DashboardCard";
import { RoutesListItem } from "@/components/layout/RoutesListItem";
import {
  calculateResourceAllocation,
  calculateUptime,
  formatDate,
} from "@/lib/utils";
import { Activity, HardDrive, Network } from "lucide-react";
import CreateEndpoint from "@/components/layout/CreateEndpoint";
import { getProject } from "@/lib/data-access/project-access";
import ProjectApiKey from "@/components/layout/ProjectApiKey";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const projectRes = await getProject(params.projectId);

  if (!projectRes || !projectRes.payload) {
    return <p>Something went wrong</p>;
  }

  const project = projectRes.payload;

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <p className="mb-8 text-white/70">
        Manage your project, endpoints, schemas and generated data.
      </p>

      <div>
        {/* Overview */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Route Count */}
          <DashboardCard
            title={<span>Routes</span>}
            Icon={Network}
            value={project.endpoints.length}
            subtitle={
              project.endpoints.length == 3
                ? "You have reached the maximum route limit."
                : `You can create ${3 - project.endpoints.length} more route.`
            }
          />

          {/* Uptime */}
          <DashboardCard
            title={
              <div className="flex items-center gap-1">
                <span>Uptime</span>

                {project.status == "active" ? (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Paused
                  </span>
                )}
              </div>
            }
            Icon={Activity}
            value={
              project.status == "active"
                ? calculateUptime(project.updatedAt)
                : "Project halted"
            }
            subtitle={`Created at ${formatDate(project.createdAt)}`}
          />

          {/* Resources */}
          <DashboardCard
            title={<span>Resource Allocation</span>}
            Icon={HardDrive}
            value={calculateResourceAllocation(project.endpoints)}
            subtitle={`Total resources allocated for your data`}
          />
        </div>

        {/* API key */}
        <ProjectApiKey apiKey={project.apiKey} name={project.name} />

        {/* Routes */}
        <h1 className="text-xl font-semibold mb-2">Routes</h1>
        <div className="flex flex-col gap-4 mb-4">
          {project.endpoints.length == 0 ? (
            <p>No Endpoints.</p>
          ) : (
            project.endpoints.map(
              (endpoint, i) =>
                endpoint && (
                  <RoutesListItem
                    key={i}
                    projectId={project.id}
                    endpointId={endpoint.id}
                    endpointName={endpoint.name}
                    numOfRows={endpoint.numOfRows}
                    isPublic={endpoint.isPublic}
                    projectName={project.name}
                    createdAt={endpoint.createdAt}
                    updatedAt={endpoint.updatedAt}
                  />
                )
            )
          )}
          {project.endpoints.length < 3 && (
            <CreateEndpoint projectId={params.projectId} />
          )}
        </div>
      </div>
    </main>
  );
}
