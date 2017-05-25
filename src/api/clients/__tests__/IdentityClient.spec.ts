import IdentityClient from '../IdentityClient';

test('should be a class (function)', () => {
  expect(typeof IdentityClient).toBe('function');
});

test('instances should expose an API', () => {
  const identity = new IdentityClient();

  expect(identity.save).toBeDefined();
  expect(identity.update).toBeDefined();
  expect(identity.delete).toBeDefined();
});