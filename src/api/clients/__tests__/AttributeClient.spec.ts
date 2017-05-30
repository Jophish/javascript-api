jest.mock('../../http/gateway');

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

test('it should be able to list the attributes given a traffic type id, returning a promise', () => {
  const attribute = new AttributeClient();
  const listPromise = attribute.list('user');
  const listPromise2 = attribute.list('machine');  

  expect(listPromise.then).toBeDefined();
  expect(typeof listPromise.then).toBe('function');  

  listPromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
  listPromise2.then((res) => {
    expect(res).toMatchSnapshot();
  });

  return Promise.all([listPromise, listPromise2]);
});

test('it should be able to create an attribute, returning a promise', () => {
  const attribute = new AttributeClient();
  const createPromise = attribute.create({
    id: 'test1',
    trafficTypeId: 'userTT',
    displayName: 'Test 1'
  });
  const createPromise2 = attribute.create({
    id: 'test2',
    trafficTypeId: 'machineTT',
    displayName: 'Test 2'
  });  

  expect(createPromise.then).toBeDefined();
  expect(typeof createPromise.then).toBe('function');  

  createPromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
  createPromise2.then((res) => {
    expect(res).toMatchSnapshot();
  });

  return Promise.all([createPromise, createPromise2]);
});

test('it should be able to delete an attribute, returning a promise', () => {
  const attribute = new AttributeClient();
  const deletePromise = attribute.delete({
    id: 'lname',
    trafficTypeId: 'userTT',
    displayName: 'Test 1'
  });
  const deletePromise2 = attribute.delete({
    id: 'ip',
    trafficTypeId: 'machineTT',
    displayName: 'Test 2'
  }); 

  expect(deletePromise.then).toBeDefined();
  expect(typeof deletePromise.then).toBe('function');  

  deletePromise.then((res) => {
    expect(res).toMatchSnapshot();
  });
  deletePromise2.then((res) => {
    expect(res).toMatchSnapshot();
  });

  return Promise.all([deletePromise, deletePromise2]);
});
