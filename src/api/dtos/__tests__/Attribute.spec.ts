import Attribute from '../Attribute';

test('should be a class (function)', () => {
  expect(typeof Attribute).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const attrData = {
    id: 'id',
    trafficTypeId: 'ttId',
    name: 'name',
    dataType: 'dt',
    description: 'desc'
  };
  const attribute = new Attribute(attrData);

  expect(attribute.id).toBe(attrData.id);
  expect(attribute.trafficTypeId).toBe(attrData.trafficTypeId);
  expect(attribute.name).toBe(attrData.name);
  expect(attribute.dataType).toBe(attrData.dataType);
  expect(attribute.description).toBe(attrData.description);
});