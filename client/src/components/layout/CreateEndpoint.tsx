"use client";

import { useToast } from "@/hooks/use-toast";
import { createEndpoint } from "@/lib/actions/endpoint-actions";
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

export default function CreateEndpoint({ projectId }: { projectId: string }) {
  const { toast } = useToast();

  const onSubmit = async (formData: FormData) => {
    const result = await createEndpoint(formData, projectId);

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
  };
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-md py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold  ml-auto">
        <Plus size={16} /> Add Endpoint
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Create An Endpoint</DialogTitle>
          <DialogDescription>Write the name of the endpoint.</DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 w-full">
            <Label htmlFor="endpoint-name" className="sr-only">
              Name
            </Label>
            <Input
              className="w-full"
              id="endpoint-name"
              placeholder="Name of the endpoint..."
              name="endpoint-name"
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
