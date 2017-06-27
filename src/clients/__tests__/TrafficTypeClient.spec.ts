jest.mock('../../http/gateway');

import Gateway from '../../http/gateway';
import TrafficTypeClient from '../TrafficTypeClient';

function createClient() {
  return new TrafficTypeClient(new Gateway('testing'));
}

test('should be a class (function)', () => {
  expect(typeof TrafficTypeClient).toBe('function');
});

test('instances should expose an API', () => {
  const trafficType = createClient();

  expect(trafficType.list).toBeDefined();
});

test('it should be able return a promise resolving to list the environments', () => {
  const trafficType = createClient();
  const listPromise = trafficType.list();

  expect(listPromise.then).toBeDefined();
  expect(typeof listPromise.then).toBe('function');

  return listPromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
});
