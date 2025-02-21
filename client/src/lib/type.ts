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
};

export type SchemaField = {
  fieldName: string;
  functionSignature: string;
};

export type Endpoint = {
  id: string;
  projectId: string;
  userEmail: string;
  name: string;
  schema: SchemaField[];
  generatedData: Record<string, never>;
  isPublic: boolean;
  numOfRows: number;
  createdAt: string;
  updatedAt: string;
};

export type BackendResponse<T> = {
  success: boolean;
  message?: string;
  payload?: T;
};
