export interface IIdentity {
  key: string;
  environmentId: string;
  trafficTypeId: string;
  values: {
    [key: string]: string
  }
}

export default class Identity implements IIdentity {
  readonly key: string;
  readonly environmentId: string;
  readonly trafficTypeId: string;
  readonly values: {[key: string]: string};

  constructor(key: string, environmentId: string, trafficTypeId: string, values?: {[key: string]: string}) {
    this.key = key;
    this.environmentId = environmentId;
    this.trafficTypeId = trafficTypeId;
    this.values = values;
  };
}