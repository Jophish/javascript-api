import AttributeClient from '../AttributeClient';

test('should be a class (function)', () => {
  expect(typeof AttributeClient).toBe('function');
});

test('instances should expose an API', () => {
  const attribute = new AttributeClient();

  expect(attribute.list).toBeDefined();
  expect(attribute.create).toBeDefined();
  expect(attribute.delete).toBeDefined();
});