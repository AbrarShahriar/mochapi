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
    const logs = await authFetch<BackendResponse<AnalyticsData[]>>(
      `/analytics/logs?projectId=${projectId}&projectName=${projectName}&endpointName=${endpointName}`
    );
    return logs;
  } catch (error) {
    return { success: false, payload: [], message: (error as Error).message };
  }
};
