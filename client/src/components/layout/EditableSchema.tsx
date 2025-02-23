"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { SelectWithSearch } from "./SelectWithSearch";
import {
  BackendResponse,
  Endpoint,
  FunctionType,
  SchemaField,
} from "@/lib/type";
import { authFetch } from "@/lib/actions/helper";

const defaultFunctions = [
  {
    value: "faker:name",
    label: "Name",
  },
  {
    value: "faker:bio",
    label: "Bio",
  },
  {
    value: "faker:gender",
    label: "Gender",
  },
  {
    value: "faker:job",
    label: "Job",
  },
  {
    value: "faker:zodiacSign",
    label: "Zodiac Sign",
  },
];

interface EditableSchemaProps {
  worker: Worker;
  routeData: Endpoint;
  setRouteData: Dispatch<SetStateAction<Endpoint | null>>;
}

export function EditableSchema({
  worker,
  routeData,
  setRouteData,
}: EditableSchemaProps) {
  const [functions, setFunctions] = useState(defaultFunctions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFunctions = async () => {
      const functionsRes = await authFetch<BackendResponse<FunctionType[]>>(
        "/functions/all"
      );

      if (!functionsRes.success || !functionsRes.payload) {
      } else {
        const result = functionsRes.payload;
        const newFn: { value: string; label: string }[] = [];

        result.forEach((fetchedFn) => {
          worker.postMessage({
            type: "ADD_FUNCTION",
            payload: {
              functionToAdd: {
                functionBody: fetchedFn.functionBody,
                callSignature: fetchedFn.callSignature,
              },
            },
          });
          newFn.push({
            label: fetchedFn.name,
            value: fetchedFn.callSignature,
          });
        });

        setFunctions((prev) => {
          let fnsToAdd = prev;
          newFn.forEach((fn) => {
            if (!prev.find((prevFns) => prevFns.value === fn.value)) {
              fnsToAdd = [...prev, fn];
            }
          });
          return fnsToAdd;
        });
        setLoading(false);
      }
    };

    getFunctions();
  }, []);

  const updateSchema = (newSchema: SchemaField[]) => {
    setRouteData((prev) => prev && { ...prev, schema: newSchema });
  };

  const addField = () => {
    updateSchema([
      ...routeData.schema,
      { fieldName: "", functionSignature: "" },
    ]);
  };

  const removeField = (index: number) => {
    const newSchema = routeData.schema.filter((_, i) => i !== index);
    updateSchema(newSchema);
  };

  const updateField = (index: number, key: string, value: string) => {
    const newSchema = routeData.schema.map((field, i) => {
      if (i === index) {
        return { ...field, [key]: value };
      }
      return field;
    });
    updateSchema(newSchema);
  };

  return (
    <div className="flex flex-col gap-2 ">
      {routeData.schema.map((field, index) => (
        <div key={index} className="flex items-center gap-4">
          <Input
            required
            placeholder="Field name"
            value={field.fieldName}
            onChange={(e) => updateField(index, "fieldName", e.target.value)}
            className="bg-zinc-900/50 border border-zinc-800 focus-within:border-zinc-700 transition-colors"
          />

          <SelectWithSearch
            functionsLoading={loading}
            functions={functions}
            initialValue={field.functionSignature}
            onSelect={(value) => updateField(index, "functionSignature", value)}
          />
          <Button
            onClick={() => removeField(index)}
            className="text-red-400 hover:text-red-300 bg-transparent hover:bg-transparent"
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        onClick={addField}
        variant="outline"
        className="w-full mt-2 bg-zinc-900 text-zinc-100"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Field
      </Button>
    </div>
  );
}
