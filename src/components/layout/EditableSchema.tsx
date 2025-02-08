"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

const fakerFunctions = [
  "faker:username",
  "faker:name",
  "faker:email",
  "faker:phone",
  "faker:address",
  "faker:company",
  "faker:lorem",
  "faker:date",
  "faker:number",
  "faker:internet",
  "faker:image",
  "faker:post",
];

interface SchemaField {
  key: string;
  value: string;
}

interface EditableSchemaProps {
  schema: string;
  onSchemaChange: (newSchema: string) => void;
}

export function EditableSchema({
  schema,
  onSchemaChange,
}: EditableSchemaProps) {
  const parsedSchema: SchemaField[] = React.useMemo(
    () => JSON.parse(schema),
    [schema]
  );

  const updateSchema = (newSchema: SchemaField[]) => {
    onSchemaChange(JSON.stringify(newSchema));
  };

  const addField = () => {
    updateSchema([...parsedSchema, { key: "", value: "" }]);
  };

  const removeField = (index: number) => {
    const newSchema = parsedSchema.filter((_, i) => i !== index);
    updateSchema(newSchema);
  };

  const updateField = (index: number, key: string, value: string) => {
    const newSchema = parsedSchema.map((field, i) => {
      if (i === index) {
        return { ...field, [key]: value };
      }
      return field;
    });
    updateSchema(newSchema);
  };

  return (
    <div className="flex flex-col gap-2 ">
      {parsedSchema.map((field, index) => (
        <div key={index} className="flex items-center gap-4">
          <Input
            placeholder="Field name"
            value={field.key}
            onChange={(e) => updateField(index, "key", e.target.value)}
            className="bg-zinc-900/50 border border-zinc-800 focus-within:border-zinc-700 transition-colors"
          />
          <Select
            value={field.value}
            onValueChange={(value) => updateField(index, "value", value)}
          >
            <SelectTrigger className="w-[200px] bg-zinc-900/50 border border-zinc-800 focus-within:border-zinc-700 transition-colors">
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {fakerFunctions.map((func) => (
                <SelectItem key={func} value={func}>
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => removeField(index)}
            className="text-red-400 hover:text-red-300 bg-transparent hover:bg-transparent"
          >
            <Trash className="size-4" />
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
