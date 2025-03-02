import "server-only";
import { authFetch } from "../actions/helper";
import { BackendResponse, Project } from "../type";

export const getProjects = async () => {
  try {
    return await authFetch<BackendResponse<Project[]>>(`/projects/all`);
  } catch (error) {
    return { success: false, payload: [], message: (error as Error).message };
  }
};

export const getProject = async (projectId: string) => {
  try {
    return await authFetch<BackendResponse<Project>>(
      `/projects/one/${projectId}`
    );
  } catch (error) {
    return { success: false, payload: null, message: (error as Error).message };
  }
};
