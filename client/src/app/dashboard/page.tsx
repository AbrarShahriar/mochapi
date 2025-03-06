import Chart_Bar from "@/components/layout/Chart_Bar";
import Chart_FunctionPerf from "@/components/layout/Chart_FunctionPerf";
import Chart_Pie from "@/components/layout/Chart_Pie";
import DashboardCard from "@/components/layout/DashboardCard";
import { calculateByte, formatByteSize } from "@/lib/utils";
import { Braces, Database, Layers } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProjects } from "@/lib/data-access/project-access";
import { getFunctions } from "@/lib/data-access/functions";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const projectsRes = await getProjects();
  const functionsRes = await getFunctions();

  if (!projectsRes.success || !functionsRes.success) {
    return <p>Something went wrong!</p>;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Overview</h1>
      <p className="mb-8 text-white/70">
        An overview of your entire workspace.
      </p>

      <div className="grid grid-cols-3 gap-6 mb-8 max-md:grid-cols-1">
        {projectsRes.payload && (
          <DashboardCard
            Icon={Layers}
            title={<span>Total Projects</span>}
            value={projectsRes.payload?.length}
            subtitle={
              projectsRes.payload.length == 3
                ? "You have reached the maximum project limit."
                : `You can create ${
                    3 - projectsRes.payload.length
                  } more project(s).`
            }
          />
        )}
        {functionsRes.payload && (
          <DashboardCard
            Icon={Braces}
            title={<span>Total Functions</span>}
            value={functionsRes.payload?.length}
            subtitle="You can deploy unlimited functions."
          />
        )}
        {projectsRes.payload && (
          <DashboardCard
            Icon={Database}
            title={<span>Total Routes</span>}
            value={projectsRes.payload.reduce(
              (project, p) => project + p.endpoints.length,
              0
            )}
            subtitle="Endpoints of each project."
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8 max-md:grid-cols-1">
        {/* Route Distribution */}
        {projectsRes.payload && (
          <Chart_Bar
            data={projectsRes.payload.map((project) => ({
              name: project.name,
              routes: project.endpoints.length,
            }))}
            title="Route Distribution"
            desc="Number of routes per project"
          />
        )}
        {/* Disk Usage */}
        {projectsRes.payload && (
          <Chart_Pie
            data={projectsRes.payload.map((project) => ({
              name: project.name,
              size: calculateByte(JSON.stringify(project)),
            }))}
            title="Estimated Disk Usage"
            desc={`Total: ${formatByteSize(
              projectsRes.payload.reduce(
                (acc, project) => acc + calculateByte(JSON.stringify(project)),
                0
              )
            )}`}
          />
        )}
      </div>

      {functionsRes.payload && (
        <Chart_FunctionPerf
          data={functionsRes.payload}
          title="Function Performance Analysis"
          desc="Comparing execution times across 1000 iterations."
        />
      )}
    </main>
  );
}
