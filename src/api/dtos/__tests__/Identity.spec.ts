import Identity from '../Identity';

test('should be a class (function)', () => {
  expect(typeof Identity).toBe('function');
});

test('should throw if we try to instantiate an TrafficType without minimum values', () => {
  const createIdent = (data) => {
    return new Identity(data);
  };

  expect(createIdent.bind(null, undefined)).toThrow();
  expect(createIdent.bind(null, 'key', 'envId', 'ttId', {})).toThrow();
  expect(createIdent.bind(null, {
    key: 'id'
  })).toThrow();
  expect(createIdent.bind(null, {
    environmentId: 'env'
  })).toThrow();
  expect(createIdent.bind(null, {
    environmentId: 'env',
    key: '12',
    values: {}
  })).toThrow();
  expect(createIdent.bind(null, {})).toThrow();

  expect(createIdent.bind(null, {
    environmentId: 'env',
    key: '12',
    trafficTypeId: 'ttId',
    values: {}
  })).not.toThrow();

  expect(createIdent.bind(null, {
    environmentId: 'env',
    key: '12',
    trafficTypeId: 'ttId'
  })).not.toThrow();
});

test('instances should parse and expose properties received on creation', () => {
  const values = {
    val1: 'asd'
  };
  const identity = new Identity({
    key: 'key', 
    environmentId: 'envId', 
    trafficTypeId: 'ttId', 
    organizationId: 'SplitTesting',
    timestamp: 124124124124,
    values
  });

  expect(identity.key).toBe('key');
  expect(identity.organizationId).toBe('SplitTesting');  
  expect(identity.environmentId).toBe('envId'); 
  expect(identity.trafficTypeId).toBe('ttId');
  expect(identity.timestamp).toBe(124124124124);  
  expect(identity.values).toBe(values);
});