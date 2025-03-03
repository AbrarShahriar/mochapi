import BuiltinFunctionFilters from "@/components/layout/BuiltinFunctionFilters";
import BuiltInFunctionList from "@/components/layout/BuiltInFunctionList";
import Loader from "@/components/layout/Loader";
import { Suspense } from "react";

export default function BuiltinFunctionPage({
  searchParams,
}: {
  searchParams: { search: string; category: string };
}) {
  return (
    <main className="w-[80%] m-auto mb-24 mt-32">
      <h1 className="text-3xl font-semibold">Built-in Functions</h1>

      <p className="mb-8 text-white/70">Explore our built-in functions.</p>

      {/* Filter */}
      <BuiltinFunctionFilters
        initialSearchValue={searchParams.search}
        initialCategory={searchParams.category}
      />

      <Suspense
        key={`${searchParams.search}&${searchParams.category}`}
        fallback={<Loader />}
      >
        <BuiltInFunctionList
          searchValue={searchParams.search || ""}
          selectedTag={searchParams.category || "all"}
        />
      </Suspense>
    </main>
  );
}
