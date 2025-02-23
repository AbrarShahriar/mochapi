"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "./helper";
import { BackendResponse, Endpoint, Project } from "../type";

export async function createProject(formData: FormData) {
  const projectName = formData.get("project-name");
  if (!projectName || projectName == "")
    return { success: false, message: "Write a project name." };

  try {
    const res = await authFetch<BackendResponse<Project>>(`/projects/create`, {
      method: "POST",
      body: JSON.stringify({
        name: projectName,
      }),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteProject(projectId: string) {
  const res = await authFetch<BackendResponse<null>>(
    `/projects/delete/${projectId}`,
    {
      method: "DELETE",
    }
  );

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  return res;
}

export async function createEndpoint(formData: FormData, projectId: string) {
  const endpointName = formData.get("endpoint-name");
  if (!endpointName || endpointName == "")
    return { success: false, message: "Write an endpoint name." };

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
