function buildResponseObject(method, data) {
  const resp = {
    body: { // Mimick superagent response object
      method
    }
  };
  Object.assign(resp.body, data);
  return resp;
} 

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'https://mock.split.io(/.*)',
    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      context.delay = 200; // Delaying response 200ms

      if (match[1] === '/forceFailure') {
        throw new Error('Forced failure');
      }

      if(!headers['Authorization']) {
        throw new Error(401); // Unauthorized
      }

      if (!(headers['SplitSDKMachineIP'] && headers['SplitSDKMachineName'] && headers['SplitSDKSpecVersion'] && headers['SplitSDKVersion'])) {
        throw new Error(400); // Missing headers with metadata
      }
      
      // If the headers are all present, and we should throw no error, return info for the tests
      return {
        parameters: params,
        headers: headers,
        endpoint: match[1]
      };
    },
    // Http methods. "data" parameter is the return value of the fixtures
    get: function (match, data) {
      return buildResponseObject('GET', data);
    },
    delete: function (match, data) {
      return buildResponseObject('DELETE', data);
    },
    post: function (match, data) {
      return buildResponseObject('POST', data);
    },
    put: function (match, data) {
      return buildResponseObject('PUT', data);
    },
    patch: function (match, data) {
      return buildResponseObject('PATCH', data);      
    }
  }
];