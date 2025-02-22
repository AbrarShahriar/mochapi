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
import { useState, useEffect, useRef } from "react";

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

interface Props {
  worker: Worker;
  initialValue: string;
  onSelect: (newValue: string) => void;
}

const fetchUserFunctions = async (workerRef: Worker) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const fetchedFunctions = [
    {
      name: "Generate Number",
      description: "Generate random addresses based on location.",
      callSignature: "abrarshahriarcee55e:generateName",
      functionBody: `const arr = ["abrar", "biday", "chhaya"];
return arr[Math.floor(Math.random() * 3)]`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
    {
      name: "Generate Month",
      description: "Generate random Month.",
      callSignature: "abrarshahriarcee55e:generateMonth",
      functionBody: `const arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
return arr[Math.floor(Math.random() * 6)]`,
      createdAt: new Date("2024-8-10"),
      updatedAt: new Date("2025-2-4"),
    },
  ];

  const result = fetchedFunctions.map((el) => {
    workerRef.postMessage({
      type: "ADD_FUNCTION",
      payload: {
        functionToAdd: {
          functionBody: el.functionBody,
          callSignature: el.callSignature,
        },
      },
    });
    workerRef.postMessage({
      type: "GENERATE_DATA",
    });
    return {
      value: el.callSignature,
      label: el.name,
    };
  });

  return result;
};

export function SelectWithSearch({ initialValue, onSelect, worker }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  const hasLoadedRef = useRef(false);

  const [functions, setFunctions] =
    useState<{ value: string; label: string }[]>(defaultFunctions);

  useEffect(() => {
    if (open && !hasLoadedRef.current) {
      const loadMoreOptions = async () => {
        setIsLoading(true);
        try {
          const newOptions = await fetchUserFunctions(worker);
          setFunctions((prev) => [...prev, ...newOptions]);
          hasLoadedRef.current = true;
        } catch (error) {
          console.error("Failed to fetch options:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadMoreOptions();
    }
  }, [open]);

  const handleLabel = () => {
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
              {isLoading && (
                <CommandItem disabled>Loading more options...</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
