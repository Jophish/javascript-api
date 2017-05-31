import ApiClient, { IApiConfig, entities as dtoEntities } from './api/ApiClient';

let clientsCache = {};

export function client(adminKey: string, config?: IApiConfig) {
  const instanceKey = `adminKey_${ config ? JSON.stringify(config) : ''}`;
  let apiClient = clientsCache[instanceKey];

  if (!apiClient) {
    apiClient = clientsCache[instanceKey] = new ApiClient(adminKey, config);
  }

  return apiClient;
}

export const entities = dtoEntities;
