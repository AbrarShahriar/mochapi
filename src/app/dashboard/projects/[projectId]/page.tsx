"use client";

import DashboardProjectCard from "@/components/layout/DashboardProjectCard";
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
      id: "adgadgadga",
      name: "users",
      numOfRows: 2,
      isPublic: true,
      createdAt: new Date("2025-2-2"),
      updatedAt: new Date("2025-2-8"),
      schema: JSON.stringify({
        firstName: "faker:name",
        lastName: "faker:name",
        age: "faker:age",
      }),
      generatedData: JSON.stringify([
        {
          firstName: "Abrar",
          lastName: "Shahriar",
          age: 22,
        },
        {
          firstName: "Tahia",
          lastName: "Azam",
          age: 21,
        },
      ]),
    },
    {
      id: "ihsdgs8",
      name: "posts",
      numOfRows: 3,
      isPublic: false,
      createdAt: new Date("2025-1-20"),
      updatedAt: new Date("2025-2-6"),
      schema: JSON.stringify({
        username: "faker:username",
        post: "faker:post",
        createdAt: "faker:date",
      }),
      generatedData: JSON.stringify([
        {
          username: "abrarshariar",
          post: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio pariatur, optio itaque laboriosam, non accusantium enim corporis voluptatibus suscipit quisquam magnam! Vel facere nihil distinctio ducimus, molestiae deserunt harum impedit.",
          createdAt: new Date(),
        },
        {
          username: "tahiaazam",
          post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsum consequuntur tempora quo numquam molestiae esse libero quod suscipit doloremque voluptatibus, blanditiis inventore, asperiores rerum culpa optio excepturi nesciunt consectetur eveniet ab perferendis, ipsa illo! Ut a rem ipsa quasi nisi, in voluptatem suscipit velit voluptates, quia neque amet! Sequi ad fuga officiis laborum dolorem a ipsa quas vitae, nemo repellendus, nostrum culpa hic perferendis sapiente animi voluptatem? Eligendi incidunt excepturi esse ad qui reiciendis reprehenderit debitis voluptatem at blanditiis maxime cum enim delectus itaque nesciunt ipsum quasi aut, dolore iusto officiis veritatis voluptate. Dolorum voluptatem explicabo quo vero quod?",
          createdAt: new Date("2024-10-2"),
        },
        {
          username: "abrarshariar",
          post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate dolor explicabo tempora dolorem molestiae, excepturi ex quae vero fugiat exercitationem non nulla ad aperiam quia, aut vitae magni illum temporibus hic aspernatur aliquam magnam! Blanditiis eum et veritatis expedita ipsum non, rem minima, quo aut unde dolores temporibus sed dolore.",
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
          <DashboardProjectCard
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
          <DashboardProjectCard
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
          <DashboardProjectCard
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
