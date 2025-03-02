"use server";
import { authFetch } from "../actions/helper";
import { BackendResponse, AnalyticsData } from "../type";

export const getLogs = async (
  projectId: string | null,
  projectName: string | null,
  endpointName: string | null
) => {
  if (!projectId || !projectName || !endpointName)
    return { success: false, payload: [], message: "Invalid search params" };

  try {
    return await authFetch<BackendResponse<AnalyticsData[]>>(
      `/monitoring/logs?projectId=${projectId}&projectName=${projectName}&endpointName=${endpointName}`
    );
  } catch (error) {
    return { success: false, payload: [], message: (error as Error).message };
  }
};
