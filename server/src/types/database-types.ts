export enum ProjectStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
}

export interface EndpointSchema {
  fieldName: string;
  functionSignature: string;
}
