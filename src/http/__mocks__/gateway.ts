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
    '/trafficTypes/userTT/environments/STG/identities': require('./jsons/identitiesSave.user.stg.post'),
    '/trafficTypes/machineTT/environments/STG/identities': require('./jsons/identitiesSave.machine.stg.post')
  },
  PUT: {
    '/trafficTypes/userTT/schema': require('./jsons/attrsCreate.user.put'),
    '/trafficTypes/machineTT/schema': require('./jsons/attrsCreate.machine.put'),
    '/trafficTypes/userTT/environments/STG/identities/NicoZelaya': require('./jsons/identitySave.user.stg.nicozelaya.put')
  },
  PATCH: {
    '/trafficTypes/userTT/environments/STG/identities/NicoZelaya': require('./jsons/identityUpdate.user.stg.nicozelaya.patch'),
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
        res(Object.assign({}, MOCKS.POST[path]));
      });
    });
  }

  put(data: Object, path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res(Object.assign({}, MOCKS.PUT[path]));
      });
    });
  }

  patch(data: Object, path: string) {
    return new Promise((res, rej) => {
      process.nextTick(() => {
        res(Object.assign({}, MOCKS.PATCH[path]));
      });
    });
  }

  rejectedReq(msg: string): Promise<string> {
    return new Promise((res, rej) => {
      rej(msg);
    });
  }
}

export default MockGateway;
