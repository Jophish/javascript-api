import TrafficType from '../TrafficType';

test('should be a class (function)', () => {
  expect(typeof TrafficType).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const tt = new TrafficType('id', 'name');

  expect(tt.id).toBe('id');
  expect(tt.name).toBe('name');  
});