"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "./helper";

export async function createProject(formData: FormData) {
  const projectName = formData.get("project-name");
  if (!projectName || projectName == "")
    return { success: false, message: "Write a project name." };

  try {
    const res = await authFetch(`/projects/create`, {
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
