export interface IIdentity {
  key: string;
  environmentId: string;
  trafficTypeId: string;
  values?: {
    [key: string]: string
  };
  organizationId?: string;
  timestamp?: number;
}

export default class Identity implements IIdentity {
  readonly key: string;
  readonly environmentId: string;
  readonly trafficTypeId: string;
  readonly organizationId: string;
  readonly timestamp: number;
  readonly values: {
    [key: string]: string
  };

  constructor(identityData: IIdentity) {
    if (!this.isIdentityLike(identityData)) {
      throw new Error('You need to pass an object with at least key, environmentId and trafficTypeId to instantiate an Identity.');
    }
    const {
      key, environmentId, trafficTypeId, organizationId, timestamp, values
    } = identityData;

    this.key = key;
    this.environmentId = environmentId;
    this.trafficTypeId = trafficTypeId;
    this.organizationId = organizationId;
    this.timestamp = timestamp;
    this.values = values || {};
  };

  private isIdentityLike(identityData: any): boolean {
    return (typeof identityData === 'object' 
            && typeof identityData.key === 'string'
            && typeof identityData.environmentId === 'string'
            && typeof identityData.trafficTypeId === 'string');
  }
}