import Attribute from '../Attribute';

test('should be a class (function)', () => {
  expect(typeof Attribute).toBe('function');
});

test('should throw if we try to instantiate an Attribute without minimum values', () => {
  const createAttr = (data) => {
    return new Attribute(data);
  };

  expect(createAttr.bind(null, undefined)).toThrow();
  expect(createAttr.bind(null, 'id', 'name')).toThrow();
  expect(createAttr.bind(null, {
    id: 'id'
  })).toThrow();

  expect(createAttr.bind(null, {
    trafficTypeId: 'ttId'
  })).not.toThrow();
});

test('instances should parse and expose properties received on creation', () => {
  const attribute = new Attribute({
    trafficTypeId: 'ttId',
    id: 'id',
    organizationId: 'SplitTesting', 
    displayName: 'name', 
    dataType: 'dt',
    description: 'desc',
    isSearchable: true
  });

  expect(attribute.id).toBe('id');
  expect(attribute.trafficTypeId).toBe('ttId');
  expect(attribute.displayName).toBe('name');
  expect(attribute.dataType).toBe('dt');
  expect(attribute.description).toBe('desc');
  expect(attribute.isSearchable).toBe(true);
});