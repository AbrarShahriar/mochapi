"use client";

import ProjectsListItem from "@/components/layout/ProjectsListItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { useToast } from "@/hooks/use-toast";
import { authFetch } from "@/lib/actions/helper";
import { createProject } from "@/lib/actions/project-actions";
import { BackendResponse, Project } from "@/lib/type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [callEffect, setCallEffect] = useState(0);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const getProjects = async () => {
      const res = await authFetch<BackendResponse<Project[]>>(`/projects/all`);

      if (res.success) {
        const result = res.payload as Project[];
        setProjects(result);
      }

      setLoading(false);
    };

    getProjects();
  }, [callEffect]);

  async function onSubmit(formData: FormData) {
    const result = await createProject(formData);

    if (result.success) {
      toast({
        variant: "success",
        title: "Success :)",
        description: result.message,
      });
      setCallEffect((prev) => prev + 1);
    } else {
      toast({
        variant: "destructive",
        title: "Failure :(",
        description: result.message,
      });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <p className="mb-8 text-white/70">
        Manage your projects and quickly take necessary actions.
      </p>
      {projects.length == 0 ? (
        <p>No projects created yet.</p>
      ) : (
        <div className="flex flex-col items-center rounded-md bg-zinc-900 [&_div:last-child]:border-0 border border-zinc-700 shadow-sm mb-4">
          {projects.map((project, i) => (
            <ProjectsListItem key={i} {...project} />
          ))}
        </div>
      )}

      {projects.length < 3 && (
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 rounded-md py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold  ml-auto">
            <Plus size={16} />
            Create Project
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800">
            <DialogHeader>
              <DialogTitle>Create a new project</DialogTitle>
              <DialogDescription>
                Fill up the necessary information and create your project. Wait
                a few moment, it takes some time to setup your API.
              </DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2 w-full">
                <Label htmlFor="project-name" className="sr-only">
                  Name
                </Label>
                <Input
                  className="border border-zinc-600"
                  placeholder="Project Name..."
                  name="project-name"
                  id="project-name"
                />
              </div>
              <SubmitButton className="px-3 bg-green-600 hover:bg-green-500 w-full">
                Create
              </SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
