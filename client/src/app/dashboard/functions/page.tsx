import FunctionCard from "@/components/layout/FunctionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authFetch } from "@/lib/actions/helper";
import { BackendResponse, FunctionType } from "@/lib/type";
import { Braces, Search } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const functionsRes = await authFetch<BackendResponse<FunctionType[]>>(
    `/functions/all`
  );
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
        {functionsRes.payload?.length === 0 && (
          <p>No functions deployed yet.</p>
        )}
        {functionsRes.payload &&
          functionsRes.payload.map((func, i) => (
            <FunctionCard key={i} {...func} />
          ))}
      </div>
    </main>
  );
}
