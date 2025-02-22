import Chart_Bar from "@/components/layout/Chart_Bar";
import Chart_FunctionPerf from "@/components/layout/Chart_FunctionPerf";
import Chart_Pie from "@/components/layout/Chart_Pie";
import DashboardCard from "@/components/layout/DashboardCard";
import { calculateByte, formatByteSize } from "@/lib/utils";
import { Braces, Database, Layers } from "lucide-react";
import { authFetch } from "@/lib/actions/helper";
import { BackendResponse, Project } from "@/lib/type";

const userData = {
  functions: [
    {
      name: "Generate Name",
      description:
        "Generate random names based on real first name and last name.",
      callSignature: "abrarshahriarcee55e:generateName",
      functionBody: `const arr = ["abrar", "biday", "chhaya"];
return arr[Math.floor(Math.random() * 3)]`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
    {
      name: "Generate Age",
      description: "Generate random age based on real age.",
      callSignature: "abrarshahriarcee55e:generateName",
      functionBody: `const arr = [18,20,21,24,25];
return arr[Math.floor(Math.random() * 5)]`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
    {
      name: "Generate Random Number Array",
      description: "Generate an array of random numbers",
      callSignature: "abrarshahriar:generateName",
      functionBody: `return Array.from({ length: 3 }, () => ({
value: Math.floor(Math.random() * 100),
probability: Math.random()
}));`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
    {
      name: "Generate Number",
      description: "Generate random addresses based on location.",
      callSignature: "abrarshahriarcee55e:generateName",
      functionBody: `const arr = ["abrar", "biday", "chhaya"];
return arr[Math.floor(Math.random() * 3)]`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
  ],
};

export default async function Dashboard() {
  const projectsRes = await authFetch<BackendResponse<Project[]>>(
    `/projects/all`
  );

  if (!projectsRes.success) {
    return <p>Something went wrong!</p>;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Overview</h1>
      <p className="mb-8 text-white/70">
        An overview of your entire workspace.
      </p>

      <div className="grid grid-cols-3 gap-6 mb-8">
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
        <DashboardCard
          Icon={Braces}
          title={<span>Total Functions</span>}
          value={userData.functions.length}
          subtitle="You can deploy unlimited functions."
        />
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

      <div className="grid grid-cols-2 gap-8 mb-8">
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

      <Chart_FunctionPerf
        data={userData.functions}
        title="Function Performance Analysis"
        desc="Comparing execution times across 1000 iterations."
      />
    </main>
  );
}
