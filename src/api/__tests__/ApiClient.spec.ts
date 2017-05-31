import ApiClient from '../ApiClient';
import { TrafficTypeClient, EnvironmentClient, AttributeClient, IdentityClient } from '../clients';

test('should be a class (function)', () => {
  expect(typeof ApiClient).toBe('function');
});

test('instances should expose an API', () => {
  const client = new ApiClient('apiKey');

  expect(client.TrafficType).toBeDefined();
  expect(client.Environment).toBeDefined();
  expect(client.Attribute).toBeDefined();
  expect(client.Identity).toBeDefined();
});

test('API clients should be of the correct types', () => {
  const client = new ApiClient('apiKey');

  expect(client.TrafficType).toBeInstanceOf(TrafficTypeClient);
  expect(client.Environment).toBeInstanceOf(EnvironmentClient);
  expect(client.Attribute).toBeInstanceOf(AttributeClient);
  expect(client.Identity).toBeInstanceOf(IdentityClient);
});