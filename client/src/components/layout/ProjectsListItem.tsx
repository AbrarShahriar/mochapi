import { Project } from "@/lib/type";
import { calculateUptime, formatDate } from "@/lib/utils";
import ProjectAction from "./ProjectAction";
import PulseRing from "./PulseRing";
import { Dispatch, SetStateAction } from "react";
import { TableCell, TableRow } from "../ui/table";

interface Props {
  project: Project;
  setCallEffect: Dispatch<SetStateAction<number>>;
}

export default function ProjectsListItem({ project, setCallEffect }: Props) {
  return (
    <TableRow className="hover:bg-zinc-900/40">
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.region}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(project.createdAt, "PPp")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <PulseRing
            variant={project.status == "active" ? "success" : "warning"}
          />
          <span className="text-sm">
            {project.status[0].toUpperCase()}
            {project.status.substring(1, project.status.length)}
          </span>
        </div>
      </TableCell>
      <TableCell>{calculateUptime(project.updatedAt, new Date())}</TableCell>
      <TableCell>
        <span className="text-lg">{project.endpoints.length}</span>
        <span className="text-xs">/3</span>
      </TableCell>
      <TableCell className="text-right">
        <ProjectAction
          setCallEffect={setCallEffect}
          projectId={project.id}
          apiKey={project.apiKey}
        />
      </TableCell>
    </TableRow>
  );
}
