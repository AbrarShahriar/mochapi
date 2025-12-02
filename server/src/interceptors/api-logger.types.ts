export interface ResponseObj {
  message: string | null;
  statusCode: number;
  size: number;
}

export interface RequestObj {
  host: string;
  path: string;
}

export interface LogEntry {
  projectId: string;
  projectName: string;
  endpointName: string;
  method: string;
  request: RequestObj;
  response: ResponseObj;
  duration: number;
  ip: string;
  userAgent: string;
}
