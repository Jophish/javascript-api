import Gateway from '../gateway';

let superagentMock;
let gatewayInst;
const fakeAdminKey = 'fake-key';
const fakeSettings = {
  endpoint: 'https://mock.split.io'
};
const fakeDto = {
  fake: true
};

const testHeaders = headers => {
  expect(headers.Authorization).toBe('Bearer ' + fakeAdminKey);

  expect(headers).toHaveProperty('SplitSDKVersion');
  expect(headers).toHaveProperty('SplitSDKSpecVersion');
  expect(headers).toHaveProperty('SplitSDKMachineIP');
  expect(headers).toHaveProperty('SplitSDKMachineName');
};

beforeAll(() => {
  const superagent = require('superagent');
  const superagentMockConfig = require('../__mocks__/superagent-mock-config');
  // We mock superagent
  superagentMock = require('superagent-mock')(superagent, superagentMockConfig);

  try {
    gatewayInst = new Gateway(fakeAdminKey, fakeSettings);
  } catch (error) {
   // noop 
  }
});

test('Gateway class should be able to be instantiated with or without config', () => {
  const gw1 = new Gateway(fakeAdminKey);
  const gw2 = new Gateway(fakeAdminKey, {});
  const gw3 = new Gateway(fakeAdminKey, fakeSettings);
  
  expect(gw1).toBeInstanceOf(Gateway);
  expect(gw2).toBeInstanceOf(Gateway);
  expect(gw3).toBeInstanceOf(Gateway);
});

test('Should have the correct API for HTTP methods', () => {
  expect(typeof gatewayInst.get).toBe('function');
  expect(typeof gatewayInst.del).toBe('function');
  expect(typeof gatewayInst.post).toBe('function');
  expect(typeof gatewayInst.put).toBe('function');
  expect(typeof gatewayInst.patch).toBe('function');
});

test('Get method should call http library of choice for a GET request to corresponding URL, with corresponding headers and data', () => {
  return gatewayInst.get('/getData').then((res: any) => {
    const {
      method, parameters, headers, endpoint
    } = res;
    expect(method).toBe('GET');
    expect(parameters).toBeUndefined(); // We are not sending parameters in a GET
    expect(endpoint).toBe('/getData'); // Should match the provided path

    testHeaders(headers);
  });
});

test('Del method should call http library of choice for a DELETE request to corresponding URL, with corresponding headers and data', () => {
  return gatewayInst.del('/delData').then((res: any) => {
    const {
      method, parameters, headers, endpoint
    } = res;
    expect(method).toBe('DELETE');
    expect(parameters).toBeUndefined(); // We are not sending parameters in a DELETE
    expect(endpoint).toBe('/delData'); // Should match the provided path

    testHeaders(headers);
  });
});

test('Post method should call http library of choice for a POST request to corresponding URL, with corresponding headers and data', () => {
  return gatewayInst.post(fakeDto, '/postData').then((res: any) => {
    const {
      method, parameters, headers, endpoint
    } = res;
    expect(method).toBe('POST');
    expect(parameters).toMatchObject(fakeDto); // Should match provided information
    expect(endpoint).toBe('/postData'); // Should match the provided path

    testHeaders(headers);
  });
});

test('Put method should call http library of choice for a PUT request to corresponding URL, with corresponding headers and data', () => {
  return gatewayInst.put(fakeDto, '/putData').then((res: any) => {
    const {
      method, parameters, headers, endpoint
    } = res;
    expect(method).toBe('PUT');
    expect(parameters).toMatchObject(fakeDto); // Should match provided information
    expect(endpoint).toBe('/putData'); // Should match the provided path

    testHeaders(headers);
  });
});

test('Patch method should call http library of choice for a PATCH request to corresponding URL, with corresponding headers and data', () => {
  return gatewayInst.patch(fakeDto, '/patchData').then((res: any) => {
    const {
      method, parameters, headers, endpoint
    } = res;
    expect(method).toBe('PATCH');
    expect(parameters).toMatchObject(fakeDto); // Should match provided information
    expect(endpoint).toBe('/patchData'); // Should match the provided path

    testHeaders(headers);
  });
});

test('If the request fails, returned promise should reject and bring the error', () => {
  // Fixture will throw an error if we call for /forceFailure, does not depend on the method
  return gatewayInst.get('/forceFailure').then(res => {
    // This should not run, so if it runs we need a failure.
    expect(true).toBeFalsy();
  }, err => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Forced failure');
  });
});

test('rejectedReq method should reject a promise with given error', () => {
  const error = new Error('test');
  return gatewayInst.rejectedReq(error)
                .then(res => expect(res).toBe('this should never happen'))
                .catch(err => {
                  expect(err).toBeInstanceOf(Error);
                  expect(err).toMatchObject(error);
                });
});

test('rejectedReq method should reject a promise with an error with given message', () => {
  return gatewayInst.rejectedReq('test_error_msg')
                .then(res => expect(res).toBe('this should never happen'))
                .catch(err => {
                  expect(err).toBeInstanceOf(Error);
                  expect(err.message).toBe('test_error_msg');
                });
});

afterAll(() => {
  // Remove custom mock
  superagentMock.unset();
});

