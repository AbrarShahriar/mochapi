import ProjectAction from "@/components/layout/ProjectAction";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/actions/helper";
import { Project } from "@/lib/type";
import { calculateUptime, formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const projects = await authFetch<Project[]>(`/projects/all`);

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mb-8 text-white/70">
        Manage your projects and quickly take necessary actions.
      </p>
      {projects.length == 0 ? (
        <p>No projects created yet.</p>
      ) : (
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
                  {formatDate(project.createdAt)}
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
                {project.status == "paused" ? (
                  <span className="text-sm text-white/70">Project at halt</span>
                ) : (
                  <span className="text-sm text-white/70">
                    Uptime: {calculateUptime(project.updatedAt, new Date())}
                  </span>
                )}
              </div>
              {/* Created At */}
              <div className="flex flex-col items-start gap-2">
                <span>Routes:</span>
                <span className="text-sm  bg-blue-600 px-4 rounded-md">
                  {project.endpoints.length}/3
                </span>
              </div>

              {/* Action */}
              <ProjectAction projectId={project.id} apiKey={project.apiKey} />
            </div>
          ))}
        </div>
      )}
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
