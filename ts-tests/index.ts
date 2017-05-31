import { client, entities, SplitAPI } from '@splitsoftware/splitio-api';

let apiClient: SplitAPI.ApiClient = client('some-key');
let config: SplitAPI.IApiConfig = {
  connectionTimeout: 20,
  debugEnabled: true,
  endpoint: 'http://google.com'
};
apiClient = client('some-key', config);

const {
  connectionTimeout,
  debugEnabled,
  endpoint,
  apiVersion,
  apiSpecVersion
} = apiClient.config;

const TTClient: SplitAPI.TrafficTypeClient = apiClient.TrafficType;
const EnvClient: SplitAPI.EnvironmentClient = apiClient.Environment;
const AttrClient: SplitAPI.AttributeClient = apiClient.Attribute;
const IdClient: SplitAPI.IdentityClient = apiClient.Identity;

const myAttr: SplitAPI.IAttribute = new entities.Attribute('id');
const myAttr2: SplitAPI.IAttribute = new entities.Attribute('id2', 'orgId', 'ttId', 'dispName', 'STRING', 'desc', false);

const myTT: SplitAPI.ITrafficType = new entities.TrafficType('id', 'name');
const myTT2: SplitAPI.ITrafficType = new entities.TrafficType('id', 'name', 'dispAttrId');

// All params are required
const myEnv: entities.Environment = new entities.Environment('id', 'name'); 

const myIdentity: entities.Identity = new entities.Identity('key', {val1: 'val1'});
const myIdentity2: entities.Identity = new entities.Identity('key', {val1: 'val1'}, 'envId', 'ttId', 'orgId');

const trafficType: SplitAPI.ITrafficType = {
  id: 'id',
  name: 'user'
};

const environment: SplitAPI.IEnvironment = {
  id: 'id',
  name: 'stg'
};

const attribute: SplitAPI.IAttribute = {
  id: 'id',
  organizationId: 'orgId',
  trafficTypeId: 'ttId',
  displayName: 'dn',
  dataType: 'string',
  description: 'something'
};

const identity: SplitAPI.IIdentity = {
  key: 'asd',
  organizationId: 'orgId',
  environmentId: 'envId',
  trafficTypeId: 'ttId',
  values: {
    name: 'john',
    lname: 'bonachon'
  }
};

const trafficTypes = TTClient.list().then((res: any) => {
  const data = res.body;
});
const environments = EnvClient.list().then((res: any) => {
  const data = res.body;
});

const createAttribute = AttrClient.create(attribute).then((res: any) => {
  const data = res.body;
});
const deleteAttribute = AttrClient.delete(attribute).then((res: any) => {
  const data = res.body;
});
const attributesOfttId = AttrClient.list('ttId').then((res: any) => {
  const data = res.body;
});

const newIdentity = IdClient.save(identity).then((res: any) => {
  const data = res.body;
});
const newIdentities = IdClient.saveBulk([identity]).then((res: any) => {
  const data = res.body;
});
const updatedIdentity = IdClient.update(identity).then((res: any) => {
  const data = res.body;
});
const deletedIdentity = IdClient.delete(identity).then((res: any) => {
  const data = res.body;
});