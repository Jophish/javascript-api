jest.mock('../../http/gateway');

import Gateway from '../../http/gateway';
import EnvironmentClient from '../EnvironmentClient';

function createClient() {
  return new EnvironmentClient(new Gateway('testing'));
}

test('should be a class (function)', () => {
  expect(typeof EnvironmentClient).toBe('function');
});

test('instances should expose an API', () => {
  const environment = createClient();

  expect(environment.list).toBeDefined();
});

test('it should be able return a promise resolving to list the environments', () => {
  const environment = createClient();
  const listPromise = environment.list();

  expect(listPromise.then).toBeDefined();
  expect(typeof listPromise.then).toBe('function');

  return listPromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
});
