"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Globe, Lock, RefreshCcw, Save, Trash } from "lucide-react";
import { EditableSchema } from "@/components/layout/EditableSchema";
import { capitalize } from "@/lib/utils";
import GeneratedDataViewer from "@/components/layout/GeneratedDataViewer";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const initialMockApiData = {
  id: "ihsdgs8",
  name: "posts",
  numOfRows: 3,
  isPublic: false,
  createdAt: new Date("2025-1-20"),
  updatedAt: new Date("2025-2-6"),
  schema: JSON.stringify([
    { key: "username", value: "faker:name" },
    { key: "post", value: "faker:lorem" },
    { key: "createdAt", value: "faker:date" },
  ]),
  generatedData: JSON.stringify([
    {
      username: "abrarshariar",
      post: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      createdAt: new Date(),
    },
    {
      username: "tahiaazam",
      post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      createdAt: new Date("2024-10-2"),
    },
    {
      username: "abrarshariar",
      post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      createdAt: new Date("2025-2-8"),
    },
  ]),
};

export default function RoutePage() {
  const [routeData, setRouteData] = useState(initialMockApiData);
  const [isPublic, setIsPublic] = useState(routeData.isPublic);
  const [numOfRows, setNumOfRows] = useState(routeData.numOfRows);
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
    // Here you would typically update the server state
  };

  const handleSchemaChange = (newSchema: string) => {
    setRouteData((prevData) => ({
      ...prevData,
      schema: newSchema,
      updatedAt: new Date(),
    }));
    setDataUpdated(true);
  };

  // const show = () => console.log(JSON.parse(routeData.schema));
  const handleNumOfRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.value == "") {
        setNumOfRows(0);
      } else {
        setNumOfRows(parseInt(event.target.value));
      }
      setDataUpdated(true);
    } catch (error: unknown) {
      if (typeof error === "object") {
        alert("something went wrong");
        setNumOfRows(routeData.numOfRows);
      }
    }
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
              {`https://api.mochapi.com/v1?projectId=aabeaetaet&routeId=${routeData.id}&apiKey=adagdgae-sfa-dafdg-adg`}
            </pre>
            <Button className="bg-transparent mx-2" size={"sm"}>
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

      {/* Schema */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-2 text-zinc-100">Schema</h3>
        <EditableSchema
          schema={routeData.schema}
          onSchemaChange={handleSchemaChange}
        />
        {/* <Button onClick={show}>Show</Button> */}
      </div>

      {/* Generated Data */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-zinc-100">
            Generated Data
          </h3>
        </div>
        <GeneratedDataViewer generatedData={routeData.generatedData} />
      </div>

      {/* Save or Reset */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={() => setDataUpdated(false)}
          disabled={!dataUpdated}
          className="bg-green-600 hover:bg-green-600/90"
        >
          <Save /> Save
        </Button>
        <Button
          onClick={() => setDataUpdated(false)}
          disabled={!dataUpdated}
          className="bg-blue-600 hover:bg-blue-600/90"
        >
          <RefreshCcw /> Reset
        </Button>
        <Button className="border border-red-500 text-red-500 bg-transparent ml-auto">
          <Trash /> Delete Route
        </Button>
      </div>
    </main>
  );
}
