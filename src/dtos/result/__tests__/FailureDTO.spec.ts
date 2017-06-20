import FailureDTO from '../FailureDTO';

test('should be a class (function)', () => {
  expect(typeof FailureDTO).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const fakeObj = { a: 1 };
  const failureDTO = new FailureDTO(fakeObj, 500, 'We had an error.');

  expect(failureDTO.object).toBe(fakeObj);
  expect(failureDTO.status).toBe(500);
  expect(failureDTO.message).toBe('We had an error.');
});