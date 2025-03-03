"use client";

import { functionMap, functionCategories } from "@/lib/available-functions";
import { capitalize } from "@/lib/utils";
import { Search, Filter, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerWithoutIcon,
} from "../ui/select";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  initialSearchValue: string;
  initialCategory: string;
}

export default function BuiltinFunctionFilters({
  initialSearchValue,
  initialCategory,
}: Props) {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    ({ search, category }: { search: string; category: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleReset = () => {
    setSearchValue("");
    setSelectedCategory("all");
    updateSearchParams({ search: "", category: "all" });
  };

  const handleFilterChange = (key: "search" | "category", value: string) => {
    if (key === "search") {
      setSearchValue(value);
    } else if (key === "category") {
      setSelectedCategory(value);
    }
  };

  const handleApply = () => {
    updateSearchParams({ search: searchValue, category: selectedCategory });
  };

  return (
    <div className="mb-8 grid grid-cols-3 items-center gap-8">
      <div className="border rounded-md border-zinc-800 px-4 flex items-center justify-between gap-2">
        <Search className="size-4" />
        <Input
          className="bg-transparent "
          placeholder={`Search ${functionMap.length} functions...`}
          value={searchValue}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 col-start-3">
        <Select onValueChange={(val) => handleFilterChange("category", val)}>
          <SelectTriggerWithoutIcon className="w-fit ml-auto bg-zinc-900/50 border border-zinc-800">
            <div className="relative">
              {selectedCategory && selectedCategory !== "all" && (
                <span className="absolute -top-3.5 -right-3.5  size-2 rounded-full bg-sky-500"></span>
              )}
              <Filter className="size-4" />
            </div>
          </SelectTriggerWithoutIcon>
          <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
            <SelectItem value="all">All</SelectItem>
            {functionCategories.map((category, i) => (
              <SelectItem value={category} key={i}>
                {capitalize(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleReset}
          className="bg-zinc-900/50 border border-zinc-800"
          size="icon"
          variant={"ghost"}
        >
          <RotateCcw />
        </Button>
        <Button
          onClick={handleApply}
          className="bg-zinc-900/50 border border-zinc-800"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
