"use client";

import DashboardCard from "@/components/layout/DashboardCard";
import { RoutesListItem } from "@/components/layout/RoutesListItem";
import { Button } from "@/components/ui/button";
import {
  calculateResourceAllocation,
  calculateUptime,
  copyToClipboard,
  formatDate,
} from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  Copy,
  Eye,
  HardDrive,
  Network,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BackendResponse, Project } from "@/lib/type";
import { authFetch } from "@/lib/actions/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submitButton";
import { createEndpoint } from "@/lib/actions/project-actions";
import { useToast } from "@/hooks/use-toast";

export default function Page({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [callEffect, setCallEffect] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getProject = async () => {
      const res = await authFetch<BackendResponse<Project>>(
        `/projects/one/${params.projectId}`
      );

      if (res.success) {
        const result = res.payload as Project;
        console.log(result);

        setProject(result);
      }

      setLoading(false);
    };
    getProject();
  }, [callEffect, params.projectId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>No Project Found.</p>;
  }

  const onSubmit = async (formData: FormData) => {
    const result = await createEndpoint(formData, params.projectId);

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
  };

  const handleCopy = async () => {
    await copyToClipboard(project.apiKey);
    toast({
      variant: "default",
      title: "Copied",
      description: "API Key copied.",
    });
  };

  return (
    <>
      <main className="w-full h-full">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <p className="mb-8 text-white/70">
          Manage your project, endpoints, schemas and generated data.
        </p>

        <div>
          {/* Overview */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Route Count */}
            <DashboardCard
              title={<span>Routes</span>}
              Icon={Network}
              value={project.endpoints.length}
              subtitle={
                project.endpoints.length == 3
                  ? "You have reached the maximum route limit."
                  : `You can create ${3 - project.endpoints.length} more route.`
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
              value={
                project.status == "active"
                  ? calculateUptime(project.updatedAt)
                  : "Project halted"
              }
              subtitle={`Created at ${formatDate(project.createdAt)}`}
            />

            {/* Resources */}
            <DashboardCard
              title={<span>Resource Allocation</span>}
              Icon={HardDrive}
              value={calculateResourceAllocation(project.endpoints)}
              subtitle={`Total resources allocated for your data`}
            />
          </div>

          {/* API key */}
          <div className="mb-12">
            <p className="text-s font-semibold mb-1">API Key: </p>
            <div className="bg-zinc-900/50 flex items-center rounded-md border border-zinc-700 mb-1">
              <div className="p-4">
                <pre>{Array(32).fill("*").join("")}</pre>
              </div>
              <div className="ml-auto border-l border-zinc-700">
                <Button
                  onClick={handleCopy}
                  className="rounded-none bg-transparent hover:bg-transparent"
                >
                  <Copy />
                </Button>
                <Button
                  className="rounded-none bg-transparent hover:bg-transparent"
                  onClick={() => setShowApiKey(true)}
                >
                  <Eye />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertCircle className="size-4 text-muted-foreground" /> Never
              share your API key with other users.
            </p>
          </div>

          {/* Routes */}
          <h1 className="text-xl font-semibold mb-2">Routes</h1>
          <div className="flex flex-col gap-4 mb-4">
            {project.endpoints.length == 0 ? (
              <p>No Endpoints.</p>
            ) : (
              project.endpoints.map(
                (endpoint, i) =>
                  endpoint && (
                    <RoutesListItem
                      key={i}
                      routeId={endpoint.id}
                      endpointName={endpoint.name}
                      numOfRows={endpoint.numOfRows}
                      isPublic={endpoint.isPublic}
                      projectName={project.name}
                      createdAt={endpoint.createdAt}
                      updatedAt={endpoint.updatedAt}
                    />
                  )
              )
            )}
            {project.endpoints.length < 3 && (
              <Dialog>
                <DialogTrigger className="flex items-center gap-2 rounded-md py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold  ml-auto">
                  <Plus size={16} /> Add Endpoint
                </DialogTrigger>
                <DialogContent className="bg-zinc-950 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle>Create An Endpoint</DialogTitle>
                    <DialogDescription>
                      Write the name of the endpoint.
                    </DialogDescription>
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
            )}
          </div>
        </div>
      </main>
      <Dialog open={showApiKey} onOpenChange={setShowApiKey}>
        <DialogContent className="bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle>API Key for {project.name}</DialogTitle>
            <DialogDescription>
              Avoid sharing your API key publicly.
            </DialogDescription>
          </DialogHeader>
          <p className="break-all p-3 text-white/85 text-sm bg-zinc-900 border border-zinc-800 tracking-wider rounded-md">
            {project.apiKey}
          </p>
          <Button onClick={handleCopy}>
            <Copy />
            Copy
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
