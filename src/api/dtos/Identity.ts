export interface IIdentity {
  key: string;
  environmentId: string;
  trafficTypeId: string;
  organizationId?: string;
  values?: {
    [key: string]: string
  };
}

export default class Identity implements IIdentity {
  constructor(
    readonly key: string,
    readonly environmentId: string,
    readonly trafficTypeId: string,
    readonly organizationId?: string,
    readonly values?: {
      [key: string]: string
    }
  ) {};
}