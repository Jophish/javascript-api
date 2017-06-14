import { client, entities } from '../ApiClient';
import * as DTOS from '../dtos';

import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from '../clients';

test('API clients should expose all the available clients', () => {
  const apiClient = new client('apiKey');

  expect(apiClient.trafficTypes).toBeInstanceOf(TrafficTypeClient);
  expect(apiClient.environments).toBeInstanceOf(EnvironmentClient);
  expect(apiClient.attributes).toBeInstanceOf(AttributeClient);
  expect(apiClient.identities).toBeInstanceOf(IdentityClient);
});

test('API clients should support the definiton of a configuration object', () => {
  const apiClient = new client('apiKey', {
    endpoint: 'end',
    debugEnabled: true,
    connectionTimeout: 2000
  });

  expect(apiClient).toBeInstanceOf(client);
});

test('entities should expose the DTO constructors', () => {
  // Structure
  expect(entities).toMatchObject(DTOS);
  // Callable members
  expect(typeof entities.Attribute).toBe('function');
  expect(typeof entities.TrafficType).toBe('function');
  expect(typeof entities.Environment).toBe('function');
  expect(typeof entities.Identity).toBe('function');
  // members
  expect(entities.Attribute).toBe(DTOS.Attribute);
  expect(entities.TrafficType).toBe(DTOS.TrafficType);
  expect(entities.Environment).toBe(DTOS.Environment);
  expect(entities.Identity).toBe(DTOS.Identity);
});
