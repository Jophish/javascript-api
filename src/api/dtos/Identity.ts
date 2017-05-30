export interface IIdentity {
  key: string;
  organizationId?: string;  
  environmentId: string;
  trafficTypeId: string;
  values: {
    [key: string]: string
  }
}

export default class Identity implements IIdentity {
  readonly values: {[key: string]: string};

  constructor(
    readonly key: string, 
    readonly environmentId: string, 
    readonly trafficTypeId: string, 
    values?: {[key: string]: string}
  ) {
    this.values = values; // If no preprocessing is added, declare and initialize together
  };
}