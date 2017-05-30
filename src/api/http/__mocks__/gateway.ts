// This is a mock implementation for the "gateway service".
// If a method is added add in the MOCKS object, under the specific method key.
const MOCKS = {
  GET: {
    '/environments': require('./jsons/environments.get'),
    '/trafficTypes': require('./jsons/trafficTypes.get'),
    '/trafficTypes/user/schema': require('./jsons/attrsByTT.user.get'),
    '/trafficTypes/machine/schema': require('./jsons/attrsByTT.machine.get')    
  },
  POST: {
    '/trafficTypes/userTT/environments/STG/identities/NicoZelaya/patch': require('./jsons/identityUpdate.user.stg.nicozelaya.post'),
    '/trafficTypes/userTT/environments/STG/identities': require('./jsons/identitiesSave.user.stg.post'),
    '/trafficTypes/machineTT/environments/STG/identities': require('./jsons/identitiesSave.machine.stg.post')     
  },
  PUT: {
    '/trafficTypes/userTT/schema': 'Attribute for userTT created',       // Once the service works, copy the structure of the response in a JSON,
    '/trafficTypes/machineTT/schema': 'Attribute for machineTT created', // Once the service works, copy the structure of the response in a JSON    
    '/trafficTypes/userTT/environments/STG/identities/NicoZelaya': require('./jsons/identitySave.user.stg.nicozelaya.put')
  },
  DELETE: { // Apparently the deletes return boolean values
    '/trafficTypes/userTT/schema/lname': true,
    '/trafficTypes/machineTT/schema/ip': true,
    '/trafficTypes/userTT/environments/STG/identities/NicoZelaya': true
  }
};

class MockGateway {

  get(path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res(MOCKS.GET[path]);
      });
    });
  }

  del(path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res(MOCKS.DELETE[path]);
      });
    });
  }

  post(data: Object, path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res({
          response: MOCKS.POST[path],
          data
        });
      });
    });
  }

  put(data: Object, path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res({
          response: MOCKS.PUT[path],
          data
        });
      });
    });
  }
}

const mockedGateway = new MockGateway();

export default mockedGateway;