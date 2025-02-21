"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const functions = [
  {
    value: "faker:name",
    label: "faker:name",
  },
  {
    value: "faker:age",
    label: "faker:age",
  },
  {
    value: "faker:lorem",
    label: "faker:lorem",
  },
  {
    value: "faker:date",
    label: "faker:date",
  },
];

interface Props {
  initialValue: string;
  onSelect: (newValue: string) => void;
}

export function SelectWithSearch({ initialValue, onSelect }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] max-w-[200px] justify-between"
        >
          {value
            ? functions.find((func) => func.value === value)?.label
            : "Select Function..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No function found.</CommandEmpty>
            <CommandGroup>
              {functions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(newValue) => {
                    setValue(newValue === value ? "" : newValue);
                    onSelect(newValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
