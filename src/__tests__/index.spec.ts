import {
  client,
  entities
} from '../';

import * as DTOS from '../api/dtos';
import ApiClient from '../api/ApiClient';

test('should be a module containing client function and entities proxy', () => {
  expect(typeof client).toBe('function');
  expect(typeof entities).toBe('object');  
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

test('client function should receive either a key or a key and an object with configurations and return an api client', () => {
  const apiClient = client('admin-key');
  const apiClientWSettings = client('admin-key', {
    endpoint: 'end',
    debugEnabled: true,
    connectionTimeout: 2000
  });  
  
  expect(apiClient).toBeInstanceOf(ApiClient);
  expect(apiClientWSettings).toBeInstanceOf(ApiClient);
});