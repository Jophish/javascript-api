import { client, entities, SplitAPI } from '@splitsoftware/splitio-api';

/******* API Client & Config classes *******/

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

let num: number = connectionTimeout;
let bool: boolean = debugEnabled;
let str: string = endpoint;
str = apiVersion;
str = apiSpecVersion;

/******* Client classes *******/

const TTClient: SplitAPI.TrafficTypeClient = apiClient.trafficTypes;
const EnvClient: SplitAPI.EnvironmentClient = apiClient.environments;
const AttrClient: SplitAPI.AttributeClient = apiClient.attributes;
const IdClient: SplitAPI.IdentityClient = apiClient.identities;

/******* Entity classes *******/

const myAttr: entities.Attribute = new entities.Attribute({ trafficTypeId: 'ttId', id: 'id' });
const myAttr2: entities.Attribute = new entities.Attribute({
  id: 'id2', 
  organizationId: 'orgId', 
  trafficTypeId: 'ttId', 
  displayName: 'dispName', 
  dataType: 'STRING', 
  description: 'desc', 
  isSearchable: false
});

const myTT: entities.TrafficType = new entities.TrafficType({id: 'id',  name: 'name'});
const myTT2: entities.TrafficType = new entities.TrafficType({id: 'id', name: 'name', displayAttributeId: 'dispAttrId'});

// Only one possible combination
const myEnv: entities.Environment = new entities.Environment({id: 'id',  name: 'name'}); 

const myIdentity = new entities.Identity({
  key: 'key',
  trafficTypeId: 'ttId',
  environmentId: 'envId'
});
const myIdentity2: entities.Identity = new entities.Identity({
  key: 'key', 
  values: {val1: 'val1'},
  environmentId: 'envId', 
  trafficTypeId: 'ttId', 
  organizationId: 'orgId',
  timestamp: 124124
});

/******* DTO Interfaces *******/
const trafficType: SplitAPI.ITrafficType = {
  id: 'id',
  name: 'user',
  displayAttributeId: 'dispAttrId'
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
  description: 'something',
  isSearchable: true
};

const identity: SplitAPI.IIdentity = {
  key: 'asd',
  organizationId: 'orgId',
  environmentId: 'envId',
  trafficTypeId: 'ttId',
  values: {
    name: 'john',
    lname: 'bonachon'
  },
  timestamp: 124124
};

/******* Client methods *******/
const trafficTypesPromise = TTClient.list().then((res) => {
  const TT: entities.TrafficType = res[0];
  return TT;
});

const environmentsPromise = EnvClient.list().then((res) => {
  const env: entities.Environment = res[0];
});

const createAttribute = AttrClient.create(attribute).then((res) => {
  const attr: entities.Attribute = res;
});
const deleteAttribute = AttrClient.delete(attribute).then((res) => {
  const deleted: boolean = res;
});
const attributesOfttId = AttrClient.list('ttId').then((res) => {
  const attr: entities.Attribute = res[0];
});

const newIdentity = IdClient.save(identity).then((res) => {
  const ident: entities.Identity = res;
});
const newIdentities = IdClient.saveBulk([identity]).then((res) => {
  const ident: entities.Identity = res.objects[0]; 
  const failed: SplitAPI.FailureDTO<entities.Identity> = res.failed[0];  
});
const updatedIdentity = IdClient.update(identity).then((res) => {
  const ident: entities.Identity = res;
});
const deletedIdentity = IdClient.delete(identity).then((res) => {
  const deleted: boolean = res;
});

/******* Response custom types *******/
const apiResponse: SplitAPI.ApiResponse<boolean> = new Promise<boolean>((res, rej) => {
  res(true);
});

const apiResponseList: SplitAPI.ApiResponseList<boolean> = new Promise<boolean[]>((res, rej) => {
  res([true]);
});

const apiResponseBulk: SplitAPI.ApiResponseBulk<boolean> = new Promise<SplitAPI.ResultDTO<boolean>>((res, rej) => {
  const failed: SplitAPI.FailureDTO<boolean> = {
    object: false,
    status: 244,
    message: 'a message'
  };
  const resp: SplitAPI.ResultDTO<boolean> = {
    objects: [true, true, false],
    failed: [failed],
    metadata: {
      meta: 'data'
    }
  };
  res(resp);
});

const apiResponseBulk2: SplitAPI.ApiResponseBulk<entities.Identity> = new Promise<SplitAPI.ResultDTO<entities.Identity>>((res, rej) => {
  const failed: SplitAPI.FailureDTO<entities.Identity> = {
    object: <entities.Identity>{},
    status: 244,
    message: 'a message'
  };
  const resp: SplitAPI.ResultDTO<entities.Identity> = {
    objects: [<entities.Identity>{}],
    failed: [failed],
    metadata: {
      meta: 'data'
    }
  };
  res(resp);
});
