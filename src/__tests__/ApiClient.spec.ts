import ApiClient, { entities } from '../ApiClient';
import * as DTOS from '../dtos';

import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from '../clients';

test('API clients should expose all the available clients', () => {
  const client = new ApiClient('apiKey');

  expect(client.trafficTypes).toBeInstanceOf(TrafficTypeClient);
  expect(client.environments).toBeInstanceOf(EnvironmentClient);
  expect(client.attributes).toBeInstanceOf(AttributeClient);
  expect(client.identities).toBeInstanceOf(IdentityClient);
});

test('API clients should support the definiton of a configuration object', () => {
  const apiClient = new ApiClient('apiKey', {
    endpoint: 'end',
    debugEnabled: true,
    connectionTimeout: 2000
  });

  expect(apiClient).toBeInstanceOf(ApiClient);
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
