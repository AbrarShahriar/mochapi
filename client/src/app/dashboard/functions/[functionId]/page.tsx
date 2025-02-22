"use client";

import UpdateFunctionForm from "@/components/layout/functions/UpdateFunctionForm";
import { authFetch } from "@/lib/actions/helper";
import { BackendResponse, FunctionType } from "@/lib/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FunctionPage({
  params,
}: {
  params: { functionId: string };
}) {
  const [functionContent, setFunctionContent] = useState<FunctionType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFunction = async () => {
      const res = await authFetch<BackendResponse<FunctionType>>(
        `/functions/one/${params.functionId}`
      );

      if (res.success) {
        const result = res.payload as FunctionType;
        console.log(result);

        setFunctionContent(result);
      }

      setLoading(false);
    };
    getFunction();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!functionContent) {
    return <p>No Project Found.</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Write Your Function</h1>
      <p className="text-white/60 max-w-[50%] mb-8">
        Fill up the necessary information and start writing your function. Wait
        a few moment, it takes some time to deploy your function.
      </p>

      <UpdateFunctionForm
        functionContent={functionContent}
        functionId={params.functionId}
        setFunctionContent={
          setFunctionContent as Dispatch<SetStateAction<FunctionType>>
        }
      />
    </section>
  );
}
