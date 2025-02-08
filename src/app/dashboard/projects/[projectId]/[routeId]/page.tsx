"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Globe, Lock } from "lucide-react";
import { EditableSchema } from "@/components/layout/EditableSchema";
import { capitalize } from "@/lib/utils";
import GeneratedDataViewer from "@/components/layout/GeneratedDataViewer";
import { Switch } from "@/components/ui/switch";

const initialMockApiData = {
  id: "ihsdgs8",
  name: "posts",
  numOfRows: 3,
  isPublic: false,
  createdAt: new Date("2025-1-20"),
  updatedAt: new Date("2025-2-6"),
  schema: JSON.stringify([
    { key: "username", value: "faker:username" },
    { key: "post", value: "faker:post" },
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
  };

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">{capitalize(routeData.name)} </h1>
      <p className="mb-8 text-white/70">
        Manage {routeData.name} route, schema and generated data.
      </p>

      <h3 className="text-lg font-semibold text-zinc-100">Endpoint</h3>
      <div className="grid grid-cols-4 mb-8 gap-4">
        <div className="col-span-3 border border-zinc-700 rounded-md">
          <div className="flex items-center">
            <pre className="text-white/70 overflow-x-scroll p-4">
              {`https://api.mochapi.com/v1?projectId=aabeaetaet&routeId=${routeData.id}&apiKey=adagdgae-sfa-dafdg-adg`}
            </pre>
            <Button className="bg-transparent mx-2" size={"sm"}>
              <Copy />
            </Button>
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
      </div>

      {/* Generated Data */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-zinc-100">
            Generated Data
          </h3>
        </div>
        <GeneratedDataViewer generatedData={routeData.generatedData} />
      </div>
    </main>
  );
}
