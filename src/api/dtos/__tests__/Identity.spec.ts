import Identity from '../Identity';

test('should be a class (function)', () => {
  expect(typeof Identity).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const values = {
    val1: 'asd'
  };
  const identity = new Identity('key', values, 'envId', 'ttId', 'SplitTesting');

  expect(identity.key).toBe('key');
  expect(identity.organizationId).toBe('SplitTesting');  
  expect(identity.environmentId).toBe('envId'); 
  expect(identity.trafficTypeId).toBe('ttId');
  expect(identity.values).toBe(values);
});