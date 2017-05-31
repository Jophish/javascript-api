import TrafficType from '../TrafficType';

test('should be a class (function)', () => {
  expect(typeof TrafficType).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const tt = new TrafficType('id', 'name', 'attr_1');

  expect(tt.id).toBe('id');
  expect(tt.name).toBe('name');
  expect(tt.displayAttributeId).toBe('attr_1');
});