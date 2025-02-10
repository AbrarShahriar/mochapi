"use client";

import DashboardCard from "@/components/layout/DashboardCard";
import { RoutesListItem } from "@/components/layout/RoutesListItem";
import { Button } from "@/components/ui/button";
import { calculateResourceAllocation } from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  Copy,
  Eye,
  EyeClosed,
  HardDrive,
  Network,
  Plus,
} from "lucide-react";
import { useState } from "react";

const dummyProject = {
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
};

export default function Page({ params }: { params: { projectId: string } }) {
  const [project] = useState(dummyProject);
  const [showApiKey, setShowApiKey] = useState(false);
  console.log(params.projectId);

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <p className="mb-8 text-white/70">
        Manage your project, routes, schemas and generated data.
      </p>

      <div>
        {/* Overview */}
        <div className="grid grid-cols-3 items-center gap-6 mb-6">
          {/* Route Count */}
          <DashboardCard
            title={<span>Routes</span>}
            Icon={Network}
            value={project.routes.length}
            subtitle={
              project.routes.length == 3
                ? "You have reached the maximum route limit."
                : `You can create ${3 - project.routes.length} more route.`
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
            value={`${new Date().getHours() - project.updatedAt.getHours()}h`}
            subtitle={`Created at ${project.createdAt.toDateString()}`}
          />

          {/* Resources */}
          <DashboardCard
            title={<span>Resource Allocation</span>}
            Icon={HardDrive}
            value={calculateResourceAllocation(project.routes)}
            subtitle={`Total resources allocated for your data`}
          />
        </div>

        {/* API key */}
        <div className="mb-12">
          <p className="text-s font-semibold mb-1">API Key: </p>
          <div className="bg-zinc-900/50 flex items-center rounded-md border border-zinc-700 mb-1">
            <div className="p-4 ">
              <pre>
                {showApiKey
                  ? project.apiKey
                  : Array(project.apiKey.length).fill("*").join("")}
              </pre>
            </div>
            <div className="ml-auto border-l border-zinc-700">
              <Button className="rounded-none bg-transparent hover:bg-transparent">
                <Copy />
              </Button>
              <Button
                className="rounded-none bg-transparent hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeClosed /> : <Eye />}{" "}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <AlertCircle className="size-4 text-muted-foreground" /> Never share
            your API key with other users.
          </p>
        </div>

        {/* Routes */}
        <h1 className="text-xl font-semibold mb-2">Routes</h1>
        <div className="flex flex-col gap-4 mb-4">
          {project.routes.map((route, i) => (
            <RoutesListItem
              key={i}
              routeId={route.id}
              name={route.name}
              url={`/abrarshahriar/${project.id}/${route.id}`}
              numOfRows={route.numOfRows}
              initialIsPublic={route.isPublic}
              projectId={project.id}
              createdAt={route.createdAt}
              updatedAt={route.updatedAt}
            />
          ))}
          <Button className="bg-green-600 hover:bg-green-500 font-bold ml-auto">
            <Plus /> Add Route
          </Button>
        </div>
      </div>
    </main>
  );
}
