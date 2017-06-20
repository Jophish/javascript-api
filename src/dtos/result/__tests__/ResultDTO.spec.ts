import ResultDTO from '../ResultDTO';

test('should be a class (function)', () => {
  expect(typeof ResultDTO).toBe('function');
});

test('instances should parse and expose properties received on creation', () => {
  const fakeMetadata = { a: 'data' };
  const fakeObjArr = [{ 1: true }, { 2: false}];
  const fakeFailDTOArrs = [{
    object: {},
    status: 500,
    message: 'test'
  }];
  const resultDTO = new ResultDTO(fakeObjArr, fakeFailDTOArrs, fakeMetadata);

  expect(resultDTO.metadata).toBe(fakeMetadata);
  expect(resultDTO.failed).toBe(fakeFailDTOArrs);
  expect(resultDTO.objects).toBe(fakeObjArr);
});