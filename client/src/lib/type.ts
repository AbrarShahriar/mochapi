export type ChartDataType = {
  [key: string]: string | number;
};

export type UserPayload = {
  res: {
    id: number;
    email: string;
  };
};

export type Project = {
  id: string;
  name: string;
  numOfRows: number;
  apiKey: string;
  status: "active" | "paused";
  createdAt: string;
  updatedAt: string;
  schema: string;
  generatedData: string;
  endpoints: Endpoint[];
  region: string;
};

export type SchemaField = {
  fieldName: string;
  functionSignature: string;
};

export type Endpoint = {
  id: string;
  userEmail: string;
  name: string;
  schema: SchemaField[];
  generatedData: Record<string, unknown>[];
  isPublic: boolean;
  numOfRows: number;
  createdAt: string;
  updatedAt: string;
  project: Project;
};

export type FunctionType = {
  id: string;
  name: string;
  description: string;
  callSignature: string;
  functionBody: string;
  createdAt: string;
  updatedAt: string;
};

export type BackendResponse<T> = {
  success: boolean;
  message?: string;
  payload?: T;
};

// export type AnalyticsData = {
//   timestamp: string;
//   projectId: string;
//   projectName: string;
//   endpointName: string;
//   method: "GET" | "POST";
//   request: { path: string; host: string };
//   response: { message: null | string; statusCode: number; size: number };
//   duration: number;
//   ip: string;
//   userAgent: string;
// };

export type AnalyticsData = {
  projectId: string;
  projectName: string;
  endpointName: string;
  method: string;
  request: {
    host: string;
    path: string;
  };
  response: {
    message: string | null;
    statusCode: number;
    size: number;
  };
  duration: number;
  ip: string;
  userAgent: string;
  createdAt: string;
};

export type FunctionForSelectType = {
  label: string;
  value: string;
  category: string;
};
