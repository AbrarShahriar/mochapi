import CreateProject from "@/components/layout/CreateProject";
import ProjectsListItem from "@/components/layout/ProjectsListItem";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/lib/data-access/project-access";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const projectsRes = await getProjects();

  if (!projectsRes || !projectsRes.payload) {
    return <p>Something went wrong</p>;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <p className="mb-8 text-white/70">
        Manage your projects and quickly take necessary actions.
      </p>
      {projectsRes.payload.length == 0 ? (
        <p>No projects created yet.</p>
      ) : (
        <div className="rounded-md mb-4 bg-zinc-900/50 border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Routes</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsRes.payload.map((project, i) => (
                <ProjectsListItem key={i} project={project} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {projectsRes.payload.length < 3 && <CreateProject />}
    </main>
  );
}
