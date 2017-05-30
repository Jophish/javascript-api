jest.mock('../../http/gateway');

import TrafficTypeClient from '../TrafficTypeClient';

test('should be a class (function)', () => {
  expect(typeof TrafficTypeClient).toBe('function');
});

test('instances should expose an API', () => {
  const trafficType = new TrafficTypeClient();

  expect(trafficType.list).toBeDefined();
});

test('it should be able return a promise resolving to list the environments', () => {
  const trafficType = new TrafficTypeClient();
  const listPromise = trafficType.list();

  expect(listPromise.then).toBeDefined();
  expect(typeof listPromise.then).toBe('function');  

  return listPromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
});