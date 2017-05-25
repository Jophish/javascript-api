import IdentifyConfig, { IIdentifyConfig } from './config/IdentifyConfig';
import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from './clients';

export default class IdentifyClient {
  // Received
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

    this.TrafficType = new TrafficTypeClient();
    this.Environment = new EnvironmentClient();
    this.Attribute = new AttributeClient();
    this.Identity = new IdentityClient();
  }

}
