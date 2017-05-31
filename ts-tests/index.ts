import { getClient, SplitAPI } from '@splitsoftware/splitio-api';

let client: SplitAPI.ApiClient = getClient('some-key');
let config: SplitAPI.IIdentifyConfig = {
  connectionTimeout: 20,
  debugEnabled: true,
  endpoint: 'http://google.com'
};
client = getClient('some-key', config);
const identifyClient: SplitAPI.IdentifyClient = client.Identify;

const {
  connectionTimeout,
  debugEnabled,
  endpoint,
  apiVersion,
  apiSpecVersion
} = client.Identify.config;

const TTClient: SplitAPI.TrafficTypeClient = identifyClient.TrafficType;
const EnvClient: SplitAPI.EnvironmentClient = identifyClient.Environment;
const AttrClient: SplitAPI.AttributeClient = identifyClient.Attribute;
const IdClient: SplitAPI.IdentityClient = identifyClient.Identity;

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