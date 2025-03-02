"use server";

import { revalidatePath } from "next/cache";
import { BackendResponse, Endpoint } from "../type";
import { authFetch, requireSession } from "./helper";

export async function createEndpoint(formData: FormData, projectId: string) {
  await requireSession();

  const endpointName = formData.get("endpoint-name")?.toString();
  if (!endpointName || endpointName == "")
    return { success: false, message: "Write an endpoint name." };

  if (endpointName.indexOf(" ") >= 0) {
    return {
      success: false,
      message: "Endpoint name cannot have white spaces.",
    };
  }

  try {
    const res = await authFetch<BackendResponse<Endpoint>>(
      `/endpoints/create`,
      {
        method: "POST",
        body: JSON.stringify({
          name: endpointName,
          projectId,
        }),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${projectId}`);
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function updateEndpoint(body: Endpoint, endpointId: string) {
  await requireSession();
  try {
    const res = await authFetch<BackendResponse<unknown>>(`/endpoints/update`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    revalidatePath(`/dashboard`);
    revalidatePath(`/dashboard/projects`);
    revalidatePath(`/dashboard/projects/${body.project.id}`);
    revalidatePath(`/dashboard/projects/${body.project.id}/${endpointId}`);
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
