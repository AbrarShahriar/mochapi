import ProjectAction from "@/components/layout/ProjectAction";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const projects = [
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
];

export default function page() {
  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mb-8 text-white/70">
        Manage your projects and quickly take necessary actions.
      </p>
      <div className="flex flex-col items-center rounded-md bg-zinc-900 [&_div:last-child]:border-0 border border-zinc-700 shadow-sm">
        {projects.map((project, i) => (
          <div
            key={i}
            className="flex items-start justify-between border-b border-zinc-700 w-full p-6"
          >
            {/* Name & Created At */}
            <div className="flex flex-col items-start gap-2">
              <span className="font-semibold">{project.name}</span>
              <span className="text-sm text-white/70">
                {project.updatedAt.toDateString()}
              </span>
            </div>
            {/* Uptime */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`aspect-square size-[8px] rounded-full ${
                    project.status == "active"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                ></div>{" "}
                <span className="text-sm">
                  {project.status[0].toUpperCase()}
                  {project.status.substring(1, project.status.length)}
                </span>
              </div>
              <span className="text-sm text-white/70">
                Uptime:{" "}
                {(new Date().getMilliseconds() -
                  project.updatedAt.getMilliseconds()) /
                  1000}{" "}
                hour(s)
              </span>
            </div>
            {/* Created At */}
            <div className="flex flex-col items-start gap-2">
              <span>Routes:</span>
              <span className="text-sm  bg-blue-600 px-4 rounded-md">
                {project.routes.length}/3
              </span>
            </div>

            {/* Action */}
            <ProjectAction projectId={project.id} apiKey={project.apiKey} />
          </div>
        ))}
      </div>
      {projects.length < 3 && (
        <Link href={"/dashboard/projects/new-project"}>
          <Button className="bg-green-600/90 font-semibold flex items-center justify-center mt-6 ml-auto hover:bg-green-600">
            <Plus strokeWidth={3} size={20} />
            Create Project
          </Button>
        </Link>
      )}
    </main>
  );
}
