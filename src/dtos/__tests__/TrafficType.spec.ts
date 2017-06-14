import TrafficType from '../TrafficType';

test('should be a class (function)', () => {
  expect(typeof TrafficType).toBe('function');
});

test('should throw if we try to instantiate an TrafficType without minimum values', () => {
  const createTT = (data) => {
    return new TrafficType(data);
  };

  expect(createTT.bind(null, undefined)).toThrow();
  expect(createTT.bind(null, 'id', 'name', 'dispAttrId')).toThrow();
  expect(createTT.bind(null, {
    id: 'id'
  })).toThrow();
  expect(createTT.bind(null, {
    name: 'name'
  })).toThrow();
  expect(createTT.bind(null, {
    name: 'name',
    dispAttrId: '12'
  })).toThrow();
  expect(createTT.bind(null, {})).toThrow();

  expect(createTT.bind(null, {
    id: 'id',
    name: 'name'
  })).not.toThrow();
});

test('instances should parse and expose properties received on creation', () => {
  const tt = new TrafficType({
    id: 'id', 
    name: 'name', 
    displayAttributeId: 'attr_1'
  });

  expect(tt.id).toBe('id');
  expect(tt.name).toBe('name');
  expect(tt.displayAttributeId).toBe('attr_1');
});