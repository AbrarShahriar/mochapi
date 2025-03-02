"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SubmitButton from "../ui/submitButton";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { createProject } from "@/lib/actions/project-actions";

export default function CreateProject() {
  const { toast } = useToast();

  async function onSubmit(formData: FormData) {
    const result = await createProject(formData);

    if (result.success) {
      toast({
        variant: "success",
        title: "Success :)",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failure :(",
        description: result.message,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-md py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold  ml-auto">
        <Plus size={16} />
        Create Project
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Fill up the necessary information and create your project. Wait a
            few moment, it takes some time to setup your API.
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
  );
}
