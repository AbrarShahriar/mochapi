import "server-only";
import { authFetch } from "../actions/helper";
import { BackendResponse, FunctionType } from "../type";

export const getFunctions = async () => {
  try {
    return await authFetch<BackendResponse<FunctionType[]>>(`/functions/all`);
  } catch (error) {
    return { success: false, payload: [], message: (error as Error).message };
  }
};

export const getFunction = async (functionId: string) => {
  try {
    return await authFetch<BackendResponse<FunctionType>>(
      `/functions/one/${functionId}`
    );
  } catch (error) {
    return { success: false, payload: null, message: (error as Error).message };
  }
};
