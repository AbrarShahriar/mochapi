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
  endpoints: never[];
};
