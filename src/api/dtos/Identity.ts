export interface IIdentity {
  key: string;
  organizationId?: string;
  environmentId?: string;
  trafficTypeId?: string;
  values: {
    [key: string]: string
  };
}

export default class Identity implements IIdentity {
  constructor(
    readonly key: string,
    readonly values: {
      [key: string]: string
    },
    readonly environmentId?: string,
    readonly trafficTypeId?: string,
    readonly organizationId?: string
  ) {};
}