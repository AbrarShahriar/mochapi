"use server";

import { revalidatePath } from "next/cache";
import { BackendResponse, Endpoint, FunctionType } from "../type";
import { authFetch, requireSession } from "./helper";

export async function createFunction(formData: FormData, functionBody: string) {
  await requireSession();

  const functionName = formData.get("function-name");
  if (!functionName || functionName == "")
    return { success: false, message: "Write the name of the function." };

  try {
    const res = await authFetch<BackendResponse<Endpoint>>(
      `/functions/create`,
      {
        method: "POST",
        body: JSON.stringify({
          name: functionName,
          description: formData.get("description"),
          callSignature: formData.get("call-signature"),
          functionBody,
        }),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/functions");
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function updateFunction(body: FunctionType, functionId: string) {
  await requireSession();

  const functionName = body.name;
  if (!functionName || functionName == "")
    return { success: false, message: "Write the name of the function." };

  try {
    const res = await authFetch<BackendResponse<Endpoint>>(
      `/functions/update`,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...body,
          id: functionId,
        }),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/functions");
    revalidatePath(`/dashboard/functions/${functionId}`);
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
