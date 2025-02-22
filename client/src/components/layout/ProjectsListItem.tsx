import { Project } from "@/lib/type";
import { calculateUptime, formatDate } from "@/lib/utils";
import ProjectAction from "./ProjectAction";
import PulseRing from "./PulseRing";

export default function ProjectsListItem(project: Project) {
  return (
    <div className=" grid grid-cols-8  *:w-full gap-4  border-b border-zinc-700 w-full p-6">
      {/* Name & Created At */}
      <div className="flex flex-col items-start gap-2 col-span-2">
        <span className="font-semibold">{project.name}</span>
        <span className="text-sm text-white/70">
          {formatDate(project.createdAt)}
        </span>
      </div>
      {/* Uptime */}
      <div className="flex flex-col items-start gap-2 col-span-2">
        <div className="flex items-center gap-2">
          {/* <div
            className={`aspect-square size-[8px] rounded-full ${
              project.status == "active" ? "bg-green-400" : "bg-yellow-400"
            }`}
          ></div>{" "} */}
          <PulseRing
            variant={project.status == "active" ? "success" : "warning"}
          />
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
      <div className="flex flex-col items-start gap-2 col-span-2">
        <span>Routes:</span>
        <span className="text-sm  bg-blue-600 px-4 rounded-md">
          {project.endpoints.length}/3
        </span>
      </div>

      {/* Action */}
      <div className=" col-span-1 col-start-8 flex items-center justify-end">
        <ProjectAction projectId={project.id} apiKey={project.apiKey} />
      </div>
    </div>
  );
}
