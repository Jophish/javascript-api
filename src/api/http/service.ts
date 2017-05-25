import * as superagent from 'superagent';

require('superagent-cache')(superagent);

// Auth => "Bearer apiToken"


export const get = (path: string) => {
  // debugger;
  // superagent.get('https://httpbin.org/get', (err, res) => {
  //   debugger;
  // });
  return 'get';
};

export const del = (path: string) => {
  return 'delete';
};

export const post = (body: Object, path: string) => {
  return 'post';
};

export const put = (body: Object, path: string) => {
  return 'put';
};