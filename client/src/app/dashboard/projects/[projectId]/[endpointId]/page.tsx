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
import { updateEndpoint } from "@/lib/actions/project-actions";
import { API_BACKEND_URL } from "@/lib/constants";
import Loader from "@/components/layout/Loader";
import CodeCopy from "@/components/layout/CodeCopy";

export default function RoutePage({
  params,
}: {
  params: { endpointId: string };
}) {
  const [routeData, setRouteData] = useState<Endpoint | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [numOfRows, setNumOfRows] = useState(1);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(false);

  const { toast } = useToast();

  const workerRef = useRef<Worker>();

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

  if (loading) {
    return <Loader />;
  }

  if (!routeData) {
    return <p>No Endpoint found</p>;
  }

  const handleCopy = async () => {
    await copyToClipboard(
      `${API_BACKEND_URL}/api/v1/${routeData.project.name
        .split(" ")
        .join("-")}/${routeData.name.split(" ").join("-")}`
    );
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
      <div className="grid grid-cols-4 mb-8 gap-4">
        <div className="col-span-2 border border-zinc-700 rounded-md">
          <div className="flex items-center">
            <pre className="text-white/70 overflow-x-scroll p-4">
              {`${API_BACKEND_URL}/api/v1/${routeData.project.name}/${routeData.name}`}
            </pre>
            <Button
              onClick={handleCopy}
              className="bg-transparent mx-2"
              size={"sm"}
            >
              <Copy />
            </Button>
          </div>
        </div>
        <div className="col-span-1 border border-zinc-700 rounded-md grid place-content-center">
          <div className="flex items-center justify-center ">
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

        <div className="col-span-1 justify-self-end flex items-center gap-4">
          {isPublic ? (
            <Globe className="text-green-500" size={20} />
          ) : (
            <Lock className="text-red-500" size={20} />
          )}
          <Switch checked={isPublic} onCheckedChange={handleSwitchChange} />
        </div>
      </div>

      <CodeCopy
        className="my-8 pb-4"
        height="25vh"
        apiKey={routeData.project.apiKey}
        url={`${API_BACKEND_URL}/api/v1/${routeData.project.name}/${routeData.name}`}
      />

      {/* Schema */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-2 text-zinc-100">Schema</h3>
        <EditableSchema
          worker={workerRef.current as Worker}
          routeData={routeData}
          setRouteData={setRouteData}
        />
      </div>

      {/* Generated Data */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-zinc-100">
            Generated Data
          </h3>
        </div>
        <GeneratedDataViewer
          worker={workerRef.current as Worker}
          numOfRows={routeData.numOfRows}
          schema={routeData.schema}
          generatedData={routeData.generatedData}
          setDataUpdated={setDataUpdated}
          setRouteData={setRouteData}
        />
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

        <Button className="border border-red-500 text-red-500 bg-transparent ml-auto">
          <Trash /> Delete Route
        </Button>
      </div>
    </main>
  );
}
