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

export default class ApiConfig implements IApiConfig {
  private _defaults: IApiConfig = {
    endpoint: 'https://api.split.io/v1',
    connectionTimeout: 15000,
    debugEnabled: false
  };
  readonly endpoint: string;
  readonly connectionTimeout: number;
  readonly debugEnabled: boolean;
  readonly apiVersion: string = apiVersion;
  readonly apiSpecVersion: string = specVersion;

  constructor(config: IApiConfig = {}) {
    const {
      endpoint, connectionTimeout, debugEnabled
    } = config;

    this.endpoint = endpoint || this._defaults.endpoint;
    this.connectionTimeout = connectionTimeout || this._defaults.connectionTimeout;
    this.debugEnabled = debugEnabled || this._defaults.debugEnabled;

    if (this.debugEnabled) {
      debug.enable('split-api:*');
    } else {      
      debug.disable();
    }
  }
}

