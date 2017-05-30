jest.mock('../../http/gateway');

import IdentityClient from '../IdentityClient';

const NicoZelayaIdent = {
  'environmentId': 'STG',
  'key': 'NicoZelaya',
  'trafficTypeId': 'userTT',
  'values': {
    'username': 'NicoZelaya',
    'email': 'nico@split.io',
    'dob': '02/08/1989'
  }
};
const choculaIdent = {
  'environmentId': 'STG',
  'key': 'Chocula666',
  'trafficTypeId': 'machineTT',
  'values': {
    'username': 'Chocula666',
    'email': 'countchocula@vampires.ts',
    'dob': '24/07/1710'
  }
}

test('should be a class (function)', () => {
  expect(typeof IdentityClient).toBe('function');
});

test('instances should expose an API', () => {
  const identity = new IdentityClient();

  expect(identity.save).toBeDefined();
  expect(identity.saveBulk).toBeDefined();  
  expect(identity.update).toBeDefined();
  expect(identity.delete).toBeDefined();
});

test('it should be able to create an identity, returning a promise', () => {
  const identity = new IdentityClient();
  const createPromise = identity.save(NicoZelayaIdent);

  expect(createPromise.then).toBeDefined();
  expect(typeof createPromise.then).toBe('function');  

  return createPromise.then((res: any) => {
    expect(res.data).toMatchObject(NicoZelayaIdent);
    expect(res.response).toMatchSnapshot();
  });
});

test('it should be able to save a collection of identities, returning a promise', () => {
  const identity = new IdentityClient();
  const createBulkPromise = identity.saveBulk([
    NicoZelayaIdent, choculaIdent
  ]);

  expect(createBulkPromise.then).toBeDefined();
  expect(typeof createBulkPromise.then).toBe('function');  

  return createBulkPromise.then((res: any) => {
    // We should have two "groups" (combinations of TT & Env)
    expect(res.length).toBe(2);
    const nico = res[0];
    const chocula = res[1];

    // It should sent the data of the received identities
    expect(nico.data).toMatchObject([NicoZelayaIdent]);
    expect(chocula.data).toMatchObject([choculaIdent]);

    // And receive a response
    expect(nico.response.objects.length).toBe(1);
    expect(nico.response.failed.length).toBe(0);
    expect(nico.response.metadata).toBeDefined();
    expect(chocula.response.objects.length).toBe(1);
    expect(chocula.response.failed.length).toBe(0);
    expect(chocula.response.metadata).toBeDefined();

    // with those identities full data.
    expect(nico.response.objects[0]).toMatchObject(NicoZelayaIdent);
    expect(chocula.response.objects[0]).toMatchObject(choculaIdent);    
  });
});

test('it should be able to update an identity, returning a promise', () => {
  const identity = new IdentityClient();
  const nicoUpdate = Object.assign({
    email: 'nicolas.zelaya@split.io'
  }, NicoZelayaIdent);
  const updatePromise = identity.update(nicoUpdate);

  expect(updatePromise.then).toBeDefined();
  expect(typeof updatePromise.then).toBe('function');  

  return updatePromise.then((res: any) => {
    expect(res.data).toMatchObject(nicoUpdate);
    expect(res.response).toMatchSnapshot();
  });
});

test('it should be able to delete an identity, returning a promise', () => {
  const identity = new IdentityClient();
  const deletePromise = identity.delete(NicoZelayaIdent);

  expect(deletePromise.then).toBeDefined();
  expect(typeof deletePromise.then).toBe('function');

  return deletePromise.then((res) => {
    expect(res).toBe(true);
  });
});