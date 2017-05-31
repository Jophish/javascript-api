import ApiConfig, { IApiConfig } from './config/ApiConfig';
import gateway from './http/gateway';

import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from './clients';
import * as DTOS from './dtos';

export default class ApiClient {
  // params
  readonly config: IApiConfig;
  // Client instances
  readonly trafficTypes: TrafficTypeClient;
  readonly environments: EnvironmentClient;
  readonly attributes: AttributeClient;
  readonly identities: IdentityClient;

  constructor(private apiKey: string, config?: IApiConfig) {
    this.config = new ApiConfig(config);

    gateway.adminKey = apiKey;
    gateway.settings = this.config;

    this.trafficTypes = new TrafficTypeClient();
    this.attributes = new AttributeClient();    
    this.environments = new EnvironmentClient();
    this.identities = new IdentityClient();
  } 
}

export interface IApiConfig extends IApiConfig {}

export const entities = DTOS;

