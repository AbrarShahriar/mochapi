"use client";

import UpdateFunctionForm from "@/components/layout/functions/UpdateFunctionForm";
import Loader from "@/components/layout/Loader";
import { authFetch } from "@/lib/actions/helper";
import { BackendResponse, FunctionType } from "@/lib/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FunctionPage({
  params,
}: {
  params: { functionId: string };
}) {
  // AUTH CHECK

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

        setFunctionContent(result);
      }

      setLoading(false);
    };
    getFunction();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!functionContent) {
    return <p>No Project Found.</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Update Function</h1>
      <p className="text-white/60 max-w-[50%] mb-8">
        Update the function, deploy and wait a few moment as we deploy it.
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
