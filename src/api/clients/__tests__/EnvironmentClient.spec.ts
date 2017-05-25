import EnvironmentClient from '../EnvironmentClient';
import { Environment } from '../../dtos';

test('should be a class (function)', () => {
  expect(typeof EnvironmentClient).toBe('function');
});

test('instances should expose an API', () => {
  const environment = new EnvironmentClient();

  expect(environment.list).toBeDefined();
});

test('it should be able to list the environments', async () => {
  const environment = new EnvironmentClient();

  await expect(environment.list()).toBe('a');
});