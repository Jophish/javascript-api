import ApiClient from '../ApiClient';
import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from '../clients';

test('should be a class (function)', () => {
  expect(typeof ApiClient).toBe('function');
});

test('instances should expose an API', () => {
  const client = new ApiClient('apiKey');

  expect(client.trafficTypes).toBeDefined();
  expect(client.environments).toBeDefined();
  expect(client.attributes).toBeDefined();
  expect(client.identities).toBeDefined();
});

test('API clients should be of the correct types', () => {
  const client = new ApiClient('apiKey');

  expect(client.trafficTypes).toBeInstanceOf(TrafficTypeClient);
  expect(client.environments).toBeInstanceOf(EnvironmentClient);
  expect(client.attributes).toBeInstanceOf(AttributeClient);
  expect(client.identities).toBeInstanceOf(IdentityClient);
});