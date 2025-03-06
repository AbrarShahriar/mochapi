"use client";
import { BuiltInFunctionType, functionMap } from "@/lib/available-functions";
import BuiltinFunctionCard from "./BuiltinFunctionCard";

interface Props {
  searchValue: string;
  selectedTag: string;
}

export default function BuiltInFunctionList({
  searchValue,
  selectedTag,
}: Props) {
  const filteredFunctions = (
    searchValue: string,
    selectedTag: string
  ): BuiltInFunctionType[] => {
    let filtered = functionMap;

    if (selectedTag !== "all") {
      filtered = functionMap.filter((el) => el.tags.includes(selectedTag));
    }

    if (searchValue) {
      filtered = filtered.filter((el) =>
        el.funcName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filtered;
  };
  return (
    <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
      {filteredFunctions(searchValue, selectedTag)?.map((func, i) => (
        <BuiltinFunctionCard {...func} key={i} />
      ))}
    </div>
  );
}
