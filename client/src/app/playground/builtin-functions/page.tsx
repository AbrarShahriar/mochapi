"use client";

import BuiltInFunctionList from "@/components/layout/BuiltInFunctionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerWithoutIcon,
} from "@/components/ui/select";
import { functionCategories, functionMap } from "@/lib/available-functions";
import { capitalize } from "@/lib/utils";
import { Filter, RotateCcw, Search } from "lucide-react";
import { useState } from "react";

export default function BuiltinFunctionPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  return (
    <main className="w-[80%] m-auto my-24">
      <h1 className="text-3xl font-semibold">Built-in Functions</h1>

      <p className="mb-8 text-white/70">Explore our built-in functions.</p>

      <div className="mb-8 grid grid-cols-3 items-center gap-8">
        <div className="border rounded-md border-zinc-800 px-4 flex items-center justify-between gap-2">
          <Search className="size-4" />
          <Input
            className="bg-transparent "
            placeholder={`Search ${functionMap.length} functions...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 col-start-3">
          <Select onValueChange={setSelectedTag}>
            <SelectTriggerWithoutIcon className="w-fit ml-auto bg-zinc-900/50 border border-zinc-800">
              <Filter className="size-4" />
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
            onClick={() => {
              setSelectedTag("all");
              setSearchValue("");
            }}
            className="bg-zinc-900/50 border border-zinc-800"
            size="icon"
            variant={"ghost"}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <BuiltInFunctionList
        searchValue={searchValue}
        selectedTag={selectedTag}
      />
    </main>
  );
}
