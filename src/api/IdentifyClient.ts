import IdentifyConfig, { IIdentifyConfig } from './config/IdentifyConfig';
import gateway from './http/gateway';

import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from './clients';

export default class IdentifyClient {
  // params
  readonly apiKey: string;
  readonly config: IIdentifyConfig;
  // Client instances
  readonly TrafficType: TrafficTypeClient;
  readonly Environment: EnvironmentClient;
  readonly Attribute: AttributeClient;
  readonly Identity: IdentityClient;

  constructor(apiKey: string, config?: IIdentifyConfig) {
    this.apiKey = apiKey;

    this.config = new IdentifyConfig(config);
    gateway.adminKey = apiKey;
    gateway.settings = this.config;

    this.TrafficType = new TrafficTypeClient();
    this.Attribute = new AttributeClient();    
    this.Environment = new EnvironmentClient();
    this.Identity = new IdentityClient();
  }

}
