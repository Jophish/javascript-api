import Attribute from '../Attribute';

test('should be a class (function)', () => {
  expect(typeof Attribute).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const attribute = new Attribute('ttId', 'id', 'SplitTesting', 'name', 'dt', 'desc', true);

  expect(attribute.id).toBe('id');
  expect(attribute.trafficTypeId).toBe('ttId');
  expect(attribute.displayName).toBe('name');
  expect(attribute.dataType).toBe('dt');
  expect(attribute.description).toBe('desc');
  expect(attribute.isSearchable).toBe(true);
});