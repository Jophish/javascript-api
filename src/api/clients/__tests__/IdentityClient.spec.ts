jest.mock('../../http/gateway');

import Gateway from '../../http/gateway';
import IdentityClient from '../IdentityClient';

const NicoZelayaIdent = {
  'environmentId': 'STG',
  'key': 'NicoZelaya',
  'trafficTypeId': 'userTT',
  'values': {
    'username': 'NicoZelaya',
    'email': 'nico@gmail.com',
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

function createClient() {
  return new IdentityClient(new Gateway('testing'));
}

test('should be a class (function)', () => {
  expect(typeof IdentityClient).toBe('function');
});

test('instances should expose an API', () => {
  const identity = createClient();

  expect(identity.save).toBeDefined();
  expect(identity.saveBulk).toBeDefined();
  expect(identity.update).toBeDefined();
  expect(identity.delete).toBeDefined();
});

test('it should return a rejected promise if you try to create an identity without providing one', () => {
  const identity: any = createClient();

  identity.save()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.save({})
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.save({ key: 'id', environmentId: 'envId' })
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
});

test('it should be able to create an identity, returning a promise', () => {
  const identity = createClient();
  const createPromise = <Promise<any>> identity.save(NicoZelayaIdent);

  expect(createPromise.then).toBeDefined();
  expect(typeof createPromise.then).toBe('function');

  return createPromise.then((res: any) => {
    expect(res).toMatchSnapshot();
  });
});

test('it should be able to save a collection of identities, returning a promise resolving to the results', () => {
  const identity: any = createClient();
  const choculaUser = Object.assign({}, choculaIdent, {
    trafficTypeId: 'userTT'
  });
  const wrongFormatUser = {
    key: 'incorrect_identity',
    trafficTypeId: 'ttId'
  };
  const createBulkPromise = identity.saveBulk([
    NicoZelayaIdent, choculaIdent, choculaUser, {}, undefined, wrongFormatUser
  ]);

  expect(createBulkPromise.then).toBeDefined();
  expect(typeof createBulkPromise.then).toBe('function');

  return createBulkPromise.then((res: any) => {
    // We should have two "groups" (combinations of TT & Env)
    expect(res.length).toBe(5);
    const emptyObj = res[0];
    const undef = res[1];
    const wrongFormat = res[2];
    const nico = res[3];
    const chocula = res[4];

    // It should sent the data of the received identities
    expect(nico).toMatchSnapshot();
    expect(chocula).toMatchObject([choculaIdent]);
    expect(emptyObj.data).toMatchObject({});
    expect(emptyObj.err.message).toContain('an object with at least key, environmentId and trafficTypeId');
    expect(undef.data).toBeUndefined();
    expect(undef.err.message).toContain('an object with at least key, environmentId and trafficTypeId');
    expect(wrongFormat.data).toMatchObject(wrongFormatUser);
    expect(wrongFormat.err.message).toContain('an object with at least key, environmentId and trafficTypeId');
  });
});

test('it should return a rejected promise if you try to update an identity without providing one', () => {
  const identity: any = createClient();

  identity.update()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.update({})
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.update({ key: 'id', environmentId: 'envId' })
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
});

test('it should be able to update an identity, returning a promise', () => {
  const identity = createClient();
  const nicoUpdate = Object.assign({}, NicoZelayaIdent);
  nicoUpdate.values.email = 'nicolas.zelaya@gmail.com';
  const updatePromise = <Promise<any>> identity.update(nicoUpdate);

  expect(updatePromise.then).toBeDefined();
  expect(typeof updatePromise.then).toBe('function');

  return updatePromise.then((res: any) => {
    expect(res).toMatchObject(nicoUpdate);
  });
});

test('it should return a rejected promise if you try to delete an identity without providing one', () => {
  const identity: any = createClient();

  identity.delete()
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.delete({})
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
  identity.delete({ key: 'id', environmentId: 'envId' })
           .then(res => expect(res).toBe('this should never happen'))
           .catch(err => expect(err.message).toContain('an object with at least key, environmentId and trafficTypeId'));
});

test('it should be able to delete an identity, returning a promise', () => {
  const identity = createClient();

  const deletePromise = <Promise<any>> identity.delete(NicoZelayaIdent);

  expect(deletePromise.then).toBeDefined();
  expect(typeof deletePromise.then).toBe('function');

  return deletePromise.then((res) => {
    expect(res).toBe(true);
  });
});
