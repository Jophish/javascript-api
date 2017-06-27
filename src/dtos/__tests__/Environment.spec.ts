import Environment from '../Environment';

test('should be a class (function)', () => {
  expect(typeof Environment).toBe('function');
});

test('should throw if we try to instantiate an Environment without minimum values', () => {
  const createEnv = (data) => {
    return new Environment(data);
  };

  expect(createEnv.bind(null, undefined)).toThrow();
  expect(createEnv.bind(null, 'ttId', 'id')).toThrow();
  expect(createEnv.bind(null, {
    id: 'id'
  })).toThrow();
  expect(createEnv.bind(null, {
    name: 'name'
  })).toThrow();
  expect(createEnv.bind(null, {})).toThrow();

  expect(createEnv.bind(null, {
    id: 'id',
    name: 'name'
  })).not.toThrow();
});

test('instances should parse and expose properties received on creation', () => {
  const environment = new Environment({
    id: 'id', 
    name: 'name'
  });

  expect(environment.id).toBe('id');
  expect(environment.name).toBe('name');  
});