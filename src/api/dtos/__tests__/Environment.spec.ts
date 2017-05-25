import Environment from '../Environment';

test('should be a class (function)', () => {
  expect(typeof Environment).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const environment = new Environment('id', 'name');

  expect(environment.id).toBe('id');
  expect(environment.name).toBe('name');  
});