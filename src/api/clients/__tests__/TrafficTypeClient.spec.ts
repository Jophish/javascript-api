import TrafficTypeClient from '../TrafficTypeClient';

test('should be a class (function)', () => {
  expect(typeof TrafficTypeClient).toBe('function');
});

test('instances should expose an API', () => {
  const trafficType = new TrafficTypeClient();

  expect(trafficType.list).toBeDefined();
});