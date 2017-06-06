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

test('it should return a rejected promise if you try to list attributes without providing a traffic type id', () => {
  const attribute: any = new AttributeClient();
  
  attribute.list()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('You need to provide a Traffic Type ID'));
});

test('it should be able to list the attributes given a traffic type id, returning a promise', () => {
  const attribute = new AttributeClient();
  const listPromise = <Promise<any>> attribute.list('user');
  const listPromise2 = <Promise<any>> attribute.list('machine');  

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

test('it should return a rejected promise if you try to create an attribute without providing one', () => {
  const attribute: any = new AttributeClient();
  
  attribute.create()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
  attribute.create({})
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
  attribute.create({ id: 'id' })
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
});

test('it should be able to create an attribute, returning a promise', () => {
  const attribute = new AttributeClient();
  const createPromise = <Promise<any>> attribute.create({
    id: 'test1',
    organizationId: 'SplitTesting',
    trafficTypeId: 'userTT',
    displayName: 'Test 1'
  });
  const createPromise2 = <Promise<any>> attribute.create({
    id: 'test2',
    organizationId: 'SplitTesting',
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

test('it should return a rejected promise if you try to delete an attribute without providing one', () => {
  const attribute: any = new AttributeClient();
  
  attribute.delete()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
  attribute.delete({})
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
  attribute.delete({ id: 'id' })
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least trafficTypeId'));
});

test('it should be able to delete an attribute, returning a promise', () => {
  const attribute = new AttributeClient();
  const deletePromise = <Promise<any>> attribute.delete({
    id: 'lname',
    organizationId: 'SplitTesting',
    trafficTypeId: 'userTT',
    displayName: 'Last name',
    dataType: 'STRING'
  });
  const deletePromise2 = <Promise<any>> attribute.delete({
    description: 'IP address of the machine running the API',
    displayName: 'Machine IP',
    trafficTypeId: 'machineTT',
    id: 'ip',
    organizationId: 'SplitTesting',
    dataType: 'STRING'
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
