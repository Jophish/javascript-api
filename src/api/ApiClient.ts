import ApiConfig, { IApiConfig } from './config/ApiConfig';
import Gateway from './http/gateway';

import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from './clients';
import * as DTOS from './dtos';

export default class ApiClient {
  private gateway: Gateway;

  readonly config: IApiConfig;
  readonly trafficTypes: TrafficTypeClient;
  readonly environments: EnvironmentClient;
  readonly attributes: AttributeClient;
  readonly identities: IdentityClient;

  constructor(private apiKey: string, config?: IApiConfig) {
    this.config = new ApiConfig(config);
    this.gateway = new Gateway(apiKey, config);
    this.trafficTypes = new TrafficTypeClient(this.gateway);
    this.attributes = new AttributeClient(this.gateway);
    this.environments = new EnvironmentClient(this.gateway);
    this.identities = new IdentityClient(this.gateway);
  }
}

export interface IApiConfig extends IApiConfig {}

export const entities = DTOS;

