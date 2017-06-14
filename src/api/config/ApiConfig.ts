import * as debug from 'debug';

const {
  version: apiVersion,
  specVersion
} = require('../../../package.json');

export interface IApiConfig {
  endpoint?: string,
  connectionTimeout?: number,
  debugEnabled?: boolean
}

const defaults: IApiConfig = {
  endpoint: 'https://api.split.io/v1',
  connectionTimeout: 15000,
  debugEnabled: false
};

export default class ApiConfig implements IApiConfig {
  readonly endpoint: string;
  readonly connectionTimeout: number;
  readonly debugEnabled: boolean;
  readonly apiVersion: string = apiVersion;
  readonly apiSpecVersion: string = specVersion;

  constructor(config?: IApiConfig) {
    if (config == null || Array.isArray(config)) config = {};

    const {
      endpoint, connectionTimeout, debugEnabled
    } = config;

    this.endpoint = endpoint || defaults.endpoint;
    this.connectionTimeout = connectionTimeout || defaults.connectionTimeout;
    this.debugEnabled = debugEnabled || defaults.debugEnabled;

    if (this.debugEnabled) {
      debug.enable('split-api:*');
    } else {
      debug.disable();
    }
  }
}

