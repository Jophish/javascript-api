import { Agent } from 'https';
import { hostname as getMachineName } from 'os';

import * as SA from 'superagent';
import { address as getIpAddress } from 'ip';
import * as debug from 'debug';

import { IApiConfig } from '../config/ApiConfig';
// Remove once superagent types at DefinitelyTyped get updated
interface SuperAgentRequest extends Request, SA.SuperAgentRequest {
  agent(agent: Agent): this;
  agent(): this;

  method: string;
  url: string;
  cookies: string;
}

// Wrap SA with cache plugin
require('superagent-cache')(SA);

// request headers metadata
const machineIp = getIpAddress();
const machineName = getMachineName();
const {
  version: apiVersion,
  specVersion
} = require('../../../package.json');

// module variables
const MAX_SOCKETS = 20;
const log = debug.default('split-api:gateway');

class Gateway {
  private _authToken: string;
  private _settings: IApiConfig = {};
  private _agent: Agent;

  constructor() {
    this._agent = new Agent({
      maxSockets: MAX_SOCKETS
    });
  };

  set adminKey(key: string) {
    this._authToken = 'Bearer ' + key;
  }

  set settings(config: IApiConfig) {
    Object.assign(this._settings, config);
  }

  get(path: string): Promise<SA.Response> {
    const req = SA.get(this.resolveUrl(path));

    return this.executeRequest(<SuperAgentRequest>req);
  }

  del(path: string): Promise<SA.Response> {
    const req = SA.delete(this.resolveUrl(path));

    return this.executeRequest(<SuperAgentRequest>req);
  }

  post(data: Object, path: string): Promise<SA.Response> {
    const req = SA.post(this.resolveUrl(path))
      .send(data);

    return this.executeRequest(<SuperAgentRequest>req);
  }

  put(data: Object, path: string): Promise<SA.Response> {
    const req = SA.put(this.resolveUrl(path))
      .send(data);

    return this.executeRequest(<SuperAgentRequest>req);
  }

  patch(data: Object, path: string): Promise<SA.Response> {
    const req = SA.patch(this.resolveUrl(path))
      .send(data);

    return this.executeRequest(<SuperAgentRequest>req);
  }

  private executeRequest(req: SuperAgentRequest): Promise<SA.Response> {
    req.agent(this._agent)
      .set('Authorization', this._authToken)
      .set('SplitSDKVersion', apiVersion)
      .set('SplitSDKSpecVersion', specVersion)
      .set('SplitSDKMachineIP', machineIp)
      .set('SplitSDKMachineName', machineName)
      .timeout(this._settings.connectionTimeout);

    return req
      .then((res) => {
        log('Received json: ' + JSON.stringify(res.body));
        return res;
      })
      .catch((err) => {
        log(`Error Executing Request: method=${req.method} path=${req.url} status=${err.status}`);
        throw new Error(err);
      });
  }

  private resolveUrl(path: string): string {
    return this._settings.endpoint + path;
  }

}

const gateway = new Gateway();

export interface Response extends SA.Response {};
export interface Request extends SA.Request {};

export default gateway;