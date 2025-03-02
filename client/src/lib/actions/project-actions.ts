"use server";

import { revalidatePath } from "next/cache";
import { authFetch, requireSession } from "./helper";
import { BackendResponse, Project } from "../type";

export async function createProject(formData: FormData) {
  await requireSession();

  const projectName = formData.get("project-name")?.toString();
  if (!projectName || projectName == "")
    return { success: false, message: "Write a project name." };

  if (projectName.indexOf(" ") >= 0) {
    return {
      success: false,
      message: "Project name cannot have white spaces.",
    };
  }

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
  await requireSession();

  try {
    const res = await authFetch<BackendResponse<null>>(
      `/projects/delete/${projectId}`,
      {
        method: "DELETE",
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
