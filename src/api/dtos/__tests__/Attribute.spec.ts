import Attribute from '../Attribute';

test('should be a class (function)', () => {
  expect(typeof Attribute).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const attribute = new Attribute('id', 'SplitTesting', 'ttId', 'name', 'dt', 'desc');

  expect(attribute.id).toBe('id');
  expect(attribute.trafficTypeId).toBe('ttId');
  expect(attribute.displayName).toBe('name');
  expect(attribute.dataType).toBe('dt');
  expect(attribute.description).toBe('desc');
});