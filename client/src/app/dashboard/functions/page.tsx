import FunctionCard from "@/components/layout/FunctionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Braces, Search } from "lucide-react";
import Link from "next/link";

const functions = [
  {
    name: "Generate Name",
    description:
      "Generate random names based on real first name and last name.",
    callSignature: "abrarshahriarcee55e:generateName",
    functionBody: `const arr = ["abrar", "biday", "chhaya"];
return arr[Math.floor(Math.random() * 3)]`,
    createdAt: new Date("2024-8-10"),
    updatedAt: new Date("2025-2-4"),
  },
  {
    name: "Generate Random Number Array",
    description: "Generate an array of random numbers",
    callSignature: "abrarshahriar:generateName",
    functionBody: `return Array.from({ length: 3 }, () => ({
  value: Math.floor(Math.random() * 100),
  probability: Math.random()
}));`,
    createdAt: new Date("2024-8-10"),
    updatedAt: new Date("2025-2-4"),
  },
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
    name: "Generate Random Number Array",
    description: "Generate an array of random numbers",
    callSignature: "abrarshahriar:generateName",
    functionBody: `return Array.from({ length: 3 }, () => ({
  value: Math.floor(Math.random() * 100),
  probability: Math.random()
}));`,
    createdAt: new Date("2024-8-10"),
    updatedAt: new Date("2025-2-4"),
  },
  {
    name: "Generate Name",
    description:
      "Generate random names based on real first name and last name.",
    callSignature: "abrarshahriarcee55e:generateName",
    functionBody: `const arr = ["abrar", "biday", "chhaya"];
return arr[Math.floor(Math.random() * 3)]`,
    createdAt: new Date("2024-8-10"),
    updatedAt: new Date("2025-2-4"),
  },
  {
    name: "Generate Random Number Array",
    description: "Generate an array of random numbers",
    callSignature: "abrarshahriar:generateName",
    functionBody: `return Array.from({ length: 3 }, () => ({
  value: Math.floor(Math.random() * 100),
  probability: Math.random()
}));`,
    createdAt: new Date("2024-8-10"),
    updatedAt: new Date("2025-2-4"),
  },
];

export default function page() {
  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Functions</h1>
      <p className="mb-8 text-white/70">
        Browser your functions, edit them, deploy them and see the magic happen!
      </p>
      <div className="flex items-center justify-between mb-16">
        <Link href={"/dashboard/functions/new-function"}>
          <Button className="bg-green-600 hover:bg-green-600/90 font-semibold">
            <Braces /> Write a function
          </Button>
        </Link>
        <div className="flex items-center justify-between rounded-md border border-zinc-700 px-2  max-w-[40%] bg-zinc-800 focus-within:border-zinc-500 transition-colors">
          <Search className="size-5 text-white/50" />
          <Input placeholder="Search function..." />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-wrap items-stretch">
        {functions.map((func, i) => (
          <FunctionCard key={i} {...func} />
        ))}
      </div>
    </main>
  );
}
