"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Globe, Lock, Save, Trash } from "lucide-react";
import { EditableSchema } from "@/components/layout/EditableSchema";
import { capitalize, copyToClipboard } from "@/lib/utils";
import GeneratedDataViewer from "@/components/layout/GeneratedDataViewer";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { BackendResponse, Endpoint } from "@/lib/type";
import { authFetch } from "@/lib/actions/helper";
import { useToast } from "@/hooks/use-toast";
import { API_BACKEND_URL } from "@/lib/constants";
import Loader from "@/components/layout/Loader";
import CodeCopy from "@/components/layout/CodeCopy";
import { deleteEndpoint, updateEndpoint } from "@/lib/actions/endpoint-actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import GeneratedDataTable from "@/components/layout/GeneratedDataTable";

export default function RoutePage({
  params,
}: {
  params: { endpointId: string };
}) {
  // AUTH CHECK //

  const [routeData, setRouteData] = useState<Endpoint | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [numOfRows, setNumOfRows] = useState(1);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { toast } = useToast();

  const workerRef = useRef<Worker>();
  const copyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../../../../worker/dataGenerator.worker.ts", import.meta.url)
    );

    const getProject = async () => {
      const res = await authFetch<BackendResponse<Endpoint>>(
        `/endpoints/one/${params.endpointId}`
      );

      if (res.success) {
        const result = res.payload as Endpoint;

        setRouteData(result);
        setIsPublic(result.isPublic);
        setNumOfRows(result.numOfRows);
      }

      setLoading(false);
    };

    getProject();

    return () => {
      workerRef.current?.terminate();
    };
  }, [params.endpointId]);

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
    if (routeData) {
      setRouteData({
        ...routeData,
        isPublic: checked,
      });
    }
    setDataUpdated(true);
  };

  const handleNumOfRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.value == "") {
        setNumOfRows(1);
        if (routeData) {
          setRouteData({
            ...routeData,
            numOfRows: 1,
          });
        }
      } else {
        const newRows = parseInt(event.target.value);
        setNumOfRows(newRows);
        if (routeData) {
          setRouteData((prev) => {
            return (
              prev && {
                ...prev,
                numOfRows: newRows,
              }
            );
          });
        }
      }

      setDataUpdated(true);
    } catch (error: unknown) {
      if (typeof error === "object") {
        toast({
          variant: "destructive",
          title: "Failure :(",
          description: "Something went wrong.",
        });
        setNumOfRows((prev) => prev);
      }
    }
  };

  const handleSave = async () => {
    setSavedLoading(true);
    const res = await updateEndpoint(routeData as Endpoint, params.endpointId);

    if (res.success) {
      toast({
        variant: "success",
        title: "Success :)",
        description: res.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failure :(",
        description: res.message,
      });
    }

    setDataUpdated(false);
    setSavedLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    await deleteEndpoint(params.endpointId, routeData?.project.id as string);

    setDeleteLoading(false);
    setOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!routeData) {
    return <p>No Endpoint found</p>;
  }

  const handleCopy = async () => {
    await copyToClipboard(copyRef.current?.value || "", copyRef);
    toast({
      variant: "default",
      title: "Copied",
      description: "Endpoint URL copied",
    });
  };

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">{capitalize(routeData.name)} </h1>
      <p className="mb-8 text-white/70">
        Manage {routeData.name} route, schema and generated data.
      </p>

      <h3 className="text-lg font-semibold text-zinc-100">Endpoint</h3>
      <div className="grid grid-cols-4 gap-4 mb-8 max-md:w-max">
        <div className="col-span-2 border rounded-md border-zinc-700">
          <div className="flex items-center h-full">
            <Input
              ref={copyRef}
              id="copy"
              className="h-full p-4 overflow-x-scroll font-mono text-white/70 bg-transparent"
              value={`${API_BACKEND_URL}/v1/api/${routeData.project.name}/${routeData.name}`}
              readOnly
            />

            <Button
              onClick={handleCopy}
              className="mx-2 bg-transparent"
              size={"sm"}
            >
              <Copy />
            </Button>
          </div>
        </div>
        <div className="grid col-span-1 border rounded-md border-zinc-700 place-content-center">
          <div className="flex items-center justify-center p-2">
            <span className="mr-4 text-muted-foreground">
              Rows to generate:{" "}
            </span>
            <Input
              onChange={handleNumOfRowsChange}
              value={numOfRows}
              placeholder="Number of rows..."
              className="w-[64px] h-full bg-zinc-900 border border-zinc-900 focus-within:border-zinc-700 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center col-span-1 gap-4 justify-self-end">
          {isPublic ? (
            <Globe className="text-green-500" size={20} />
          ) : (
            <Lock className="text-red-500" size={20} />
          )}
          <Switch checked={isPublic} onCheckedChange={handleSwitchChange} />
        </div>
      </div>

      <CodeCopy
        className="pb-4 my-8"
        height="25vh"
        apiKey={routeData.project.apiKey}
        url={`${API_BACKEND_URL}/v1/api/${routeData.project.name}/${routeData.name}`}
      />

      {/* Schema */}
      <div className="mb-12">
        <h3 className="mb-2 text-lg font-semibold text-zinc-100">Schema</h3>
        <EditableSchema
          worker={workerRef.current as Worker}
          routeData={routeData}
          setRouteData={setRouteData}
        />
      </div>

      {/* Generated Data */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-zinc-100">
            Generated Data
          </h3>
        </div>
        <Tabs defaultValue="json">
          <TabsList className="grid w-full grid-cols-2 p-0 rounded-b-none">
            <TabsTrigger className="rounded-bl-none" value="json">
              JSON
            </TabsTrigger>
            <TabsTrigger className="rounded-br-none" value="table">
              Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="json">
            <GeneratedDataViewer
              worker={workerRef.current as Worker}
              numOfRows={routeData.numOfRows}
              schema={routeData.schema}
              generatedData={routeData.generatedData}
              setDataUpdated={setDataUpdated}
              setRouteData={setRouteData}
            />
          </TabsContent>
          <TabsContent value="table">
            <GeneratedDataTable
              schema={routeData.schema}
              generatedData={routeData.generatedData}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Save or Reset */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handleSave}
          disabled={!dataUpdated || savedLoading}
          className="bg-green-600 hover:bg-green-600/90"
        >
          <Save /> {savedLoading ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="ml-auto text-red-500 bg-transparent border border-red-500"
        >
          <Trash /> Delete Endpoint
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Endpoint?</DialogTitle>
              <DialogDescription>
                Are you sure you want to permenantly delete this endpoint?
                Deleting this endpoint will also delete the data.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <div className="flex items-center justify-between w-full">
                <DialogClose asChild>
                  <Button className="bg-sky-600 hover:bg-sky-500" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={deleteLoading}
                  className="bg-red-700  hover:bg-red-600"
                  onClick={handleDelete}
                  type="button"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
