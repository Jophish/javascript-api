import IdentifyClient, { IIdentifyConfig } from './api/IdentifyClient';

let clientsCache = {};

export function getClient (adminKey: string, config?: IIdentifyConfig) {
  let identifyClient = clientsCache[adminKey];

  if (!identifyClient) {
    clientsCache[adminKey] = new IdentifyClient(adminKey, config);
    identifyClient = clientsCache[adminKey];
  }

  return {
    Identify: identifyClient
  };
}
