// "use client";

import Chart_Bar from "@/components/layout/Chart_Bar";
import Chart_FunctionPerf from "@/components/layout/Chart_FunctionPerf";
import Chart_Pie from "@/components/layout/Chart_Pie";
import DashboardCard from "@/components/layout/DashboardCard";
import { calculateByte, formatByteSize } from "@/lib/utils";
import { Braces, Database, Layers } from "lucide-react";

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
  projects: [
    {
      id: "fsijfaififiashfish",
      name: "Test API",
      apiKey: "Apveg-ggdFSg-89ssggs-jdkhsdghj-henfsks",
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
      status: "active",
      routes: [
        {
          id: "ihsdgs8",
          name: "users",
          numOfRows: 2,
          isPublic: false,
          createdAt: new Date("2025-1-24"),
          updatedAt: new Date("2025-2-8"),
          schema: JSON.stringify([
            { key: "firstname", value: "faker:name" },
            { key: "lastname", value: "faker:name" },
            { key: "age", value: "faker:age" },
            { key: "createdAt", value: "faker:date" },
          ]),
          generatedData: JSON.stringify([
            {
              firstname: "abrar",
              lastname: "shahriar",
              age: 22,
              createdAt: new Date(),
            },
            {
              firstname: "tahia",
              lastname: "azam",
              age: 21,
              createdAt: new Date("2025-2-2"),
            },
          ]),
        },
        {
          id: "ihsadfadadgs8",
          name: "posts",
          numOfRows: 3,
          isPublic: false,
          createdAt: new Date("2025-1-20"),
          updatedAt: new Date("2025-2-6"),
          schema: JSON.stringify([
            { key: "username", value: "faker:name" },
            { key: "post", value: "faker:lorem" },
            { key: "createdAt", value: "faker:date" },
          ]),
          generatedData: JSON.stringify([
            {
              username: "abrarshariar",
              post: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
              createdAt: new Date(),
            },
            {
              username: "tahiaazam",
              post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
              createdAt: new Date("2024-10-2"),
            },
            {
              username: "abrarshariar",
              post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              createdAt: new Date("2025-2-8"),
            },
          ]),
        },
      ],
    },
    {
      id: "iahduhfa8dyu",
      name: "Mock API",
      apiKey: "7efwfaf-ggdFSg-jdkhsdghj-henfsks",
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
      status: "paused",
      routes: [
        {
          id: "ihsdgs8",
          name: "users",
          numOfRows: 2,
          isPublic: false,
          createdAt: new Date("2025-1-24"),
          updatedAt: new Date("2025-2-8"),
          schema: JSON.stringify([
            { key: "firstname", value: "faker:name" },
            { key: "lastname", value: "faker:name" },
            { key: "age", value: "faker:age" },
            { key: "createdAt", value: "faker:date" },
          ]),
          generatedData: JSON.stringify([
            {
              firstname: "abrar",
              lastname: "shahriar",
              age: 22,
              createdAt: new Date(),
            },
            {
              firstname: "tahia",
              lastname: "azam",
              age: 21,
              createdAt: new Date("2025-2-2"),
            },
          ]),
        },
        {
          id: "ihsadfadadgs8",
          name: "posts",
          numOfRows: 3,
          isPublic: false,
          createdAt: new Date("2025-1-20"),
          updatedAt: new Date("2025-2-6"),
          schema: JSON.stringify([
            { key: "username", value: "faker:name" },
            { key: "post", value: "faker:lorem" },
            { key: "createdAt", value: "faker:date" },
          ]),
          generatedData: JSON.stringify([
            {
              username: "abrarshariar",
              post: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
              createdAt: new Date(),
            },
            {
              username: "tahiaazam",
              post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
              createdAt: new Date("2024-10-2"),
            },
            {
              username: "abrarshariar",
              post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              createdAt: new Date("2025-2-8"),
            },
          ]),
        },
      ],
    },
  ],
};

export default async function Dashboard() {
  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Overview</h1>
      <p className="mb-8 text-white/70">
        An overview of your entire workspace.
      </p>

      <div className="grid grid-cols-3 items-center gap-6 mb-8">
        <DashboardCard
          Icon={Layers}
          title={<span>Total Projects</span>}
          value={userData.projects.length}
          subtitle={
            userData.projects.length == 3
              ? "You have reached the maximum project limit."
              : `You can create ${
                  3 - userData.projects.length
                } more project(s).`
          }
        />
        <DashboardCard
          Icon={Braces}
          title={<span>Total Functions</span>}
          value={userData.functions.length}
          subtitle="You can deploy unlimited functions."
        />
        <DashboardCard
          Icon={Database}
          title={<span>Total Routes</span>}
          value={userData.projects.reduce(
            (project, p) => project + p.routes.length,
            0
          )}
          subtitle="Endpoints of each project."
        />
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Route Distribution */}
        <Chart_Bar
          data={userData.projects.map((project) => ({
            name: project.name,
            routes: project.routes.length,
          }))}
          title="Route Distribution"
          desc="Number of routes per project"
        />
        {/* Disk Usage */}
        <Chart_Pie
          data={userData.projects.map((project) => ({
            name: project.name,
            size: calculateByte(JSON.stringify(project)),
          }))}
          title="Estimated Disk Usage"
          desc={`Total: ${formatByteSize(
            userData.projects.reduce(
              (acc, project) => acc + calculateByte(JSON.stringify(project)),
              0
            )
          )}`}
        />
      </div>

      <Chart_FunctionPerf
        data={userData.functions}
        title="Function Performance Analysis"
        desc="Comparing execution times across 1000 iterations."
      />
    </main>
  );
}
