// Declaration file for Node Split Software API SDK v1.0.0
// Project: https://github.com/splitio/javascript-api
// Definitions by: Nico Zelaya <https://github.com/NicoZelaya/>

import * as superagent from 'superagent';
// We import these directly from source, taking advantage of having the src code 
// on the same package.
import TrafficTypeDTO, { ITrafficType as ITrafficTypeFromDto } from '../src/api/dtos/TrafficType';
import AttributeDTO, { IAttribute as IAttributeFromDto } from '../src/api/dtos/Attribute';
import EnvironmentDTO, { IEnvironment as IEnvironmentFromDto } from '../src/api/dtos/Environment';
import IdentityDTO, { IIdentity as IIdentityFromDto } from '../src/api/dtos/Identity';

declare function client(adminKey: string, config?: SplitAPI.IApiConfig): SplitAPI.ApiClient;

declare namespace entities {
  class TrafficType extends TrafficTypeDTO {}
  class Attribute extends AttributeDTO {}
  class Environment extends EnvironmentDTO {}
  class Identity extends IdentityDTO {}
}

declare namespace SplitAPI {

  interface IApiConfig {
    endpoint?: string;
    connectionTimeout?: number;
    debugEnabled?: boolean;
  }

  class ApiConfig implements IApiConfig {
    readonly endpoint: string;
    readonly connectionTimeout: number;
    readonly debugEnabled: boolean;
    readonly apiVersion: string;
    readonly apiSpecVersion: string;
  }

  class ApiClient {
    readonly config: ApiConfig
    readonly TrafficType: TrafficTypeClient
    readonly Attribute: AttributeClient
    readonly Environment: EnvironmentClient
    readonly Identity: IdentityClient
  }

  class TrafficTypeClient {
    list(): Promise<superagent.Response>
  }

  class AttributeClient {
    list(trafficTypeId: string): Promise<superagent.Response>
    create(attr: IAttribute): Promise<superagent.Response>
    delete(attr: IAttribute): Promise<superagent.Response>
  }

  class EnvironmentClient {
    list(): Promise<superagent.Response>
  }

  class IdentityClient {
    save(identity: IIdentity): Promise<superagent.Response>
    saveBulk(identities: Array<IIdentity>): Promise<superagent.Response>
    update(identity: IIdentity): Promise<superagent.Response>
    delete(identity: IIdentity): Promise<superagent.Response>
  }

  interface IAttribute extends IAttributeFromDto {}
  interface ITrafficType extends ITrafficTypeFromDto {}  
  interface IEnvironment extends IEnvironmentFromDto {}  
  interface IIdentity extends IIdentityFromDto {}  
}

