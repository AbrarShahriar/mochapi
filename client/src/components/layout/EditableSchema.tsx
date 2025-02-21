"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { SelectWithSearch } from "./SelectWithSearch";
import { SchemaField } from "@/lib/type";

interface EditableSchemaProps {
  schema: SchemaField[];
  onSchemaChange: (newSchema: SchemaField[]) => void;
}

export function EditableSchema({
  schema,
  onSchemaChange,
}: EditableSchemaProps) {
  const updateSchema = (newSchema: SchemaField[]) => {
    onSchemaChange(newSchema);
  };

  const addField = () => {
    updateSchema([...schema, { fieldName: "", functionSignature: "" }]);
  };

  const removeField = (index: number) => {
    const newSchema = schema.filter((_, i) => i !== index);
    updateSchema(newSchema);
  };

  const updateField = (index: number, key: string, value: string) => {
    const newSchema = schema.map((field, i) => {
      if (i === index) {
        return { ...field, [key]: value };
      }
      return field;
    });
    updateSchema(newSchema);
  };

  return (
    <div className="flex flex-col gap-2 ">
      {schema.map((field, index) => (
        <div key={index} className="flex items-center gap-4">
          <Input
            required
            placeholder="Field name"
            value={field.fieldName}
            onChange={(e) => updateField(index, "fieldName", e.target.value)}
            className="bg-zinc-900/50 border border-zinc-800 focus-within:border-zinc-700 transition-colors"
          />

          <SelectWithSearch
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
