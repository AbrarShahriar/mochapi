"use client";

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
import { useState } from "react";

interface Props {
  functionsLoading: boolean;
  initialValue: string;
  functions: { value: string; label: string }[];
  onSelect: (newValue: string) => void;
}

export function SelectWithSearch({
  initialValue,
  onSelect,
  functionsLoading,
  functions,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleLabel = () => {
    if (functionsLoading) {
      return "Loading functions...";
    }

    if (value) {
      const foundLabel = functions.find((el) => el.value === value)?.label;
      if (!foundLabel) {
        return "Custom function...";
      }
      return foundLabel;
    }

    return "Select Function...";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] max-w-[200px] justify-between"
        >
          {handleLabel()}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder="Search function..." />
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
