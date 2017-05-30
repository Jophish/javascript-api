import * as debug from 'debug';

export interface IIdentifyConfig {
  endpoint?: string,
  connectionTimeout?: number,
  debugEnabled?: boolean
}

export default class IdentifyConfig implements IIdentifyConfig {
  private _defaults: IIdentifyConfig = {
    endpoint: 'https://api.split.io/v1',
    connectionTimeout: 15000,
    debugEnabled: false
  };
  readonly endpoint: string;
  readonly connectionTimeout: number;
  readonly debugEnabled: boolean;

  constructor(config: IIdentifyConfig = {}) {
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

