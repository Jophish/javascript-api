# Split JavaScript API - Examples

This examples are written with es5 syntax and CommonJS. If you are interested on another build, check our [Detailed-README](Detailed-README.md).

## How to initialize the client

```JavaScript
var SplitAPI = require('@splitsoftware/splitio-api');

// You can instantiate your client with the new keyword, as it is a class
var ApiClient = new SplitAPI.client('your_admin_key', {
  // Your settings
});

// Or you can just call the function.
var ApiClient = SplitAPI.client('your_admin_key', {
  // Your settings
});
```

**In order to show just what you need on every example, all the following code snippets are considered to start with these lines:**
```JavaScript
var SplitAPI = require('@splitsoftware/splitio-api');

var ApiClient = new SplitAPI.client('your_admin_key', {
  // Your settings
});
```

## How to work with your Environments
Environment-like objects follow the interface below:
```TypeScript
interface IEnvironment {
  id: string;
  name: string;
}
```

We provide an Environment class under `SplitAPI.entities.Environment`. _Remember that classes are instantiated using the new keyword._

* An example of Environment instantiation:
```JavaScript
var myEnv = new SplitAPI.entities.Environment({
  id: 'env_id',
  name: 'env_name'
});
```

* Listing your Environments is an easy task:

```JavaScript
var environmentsList;

ApiClient.environments.list().then(function(res) {
  // A collection of Environment instances
});
```

## How to work with your Traffic Types
TrafficType-like objects follow the interface below:
```TypeScript
interface ITrafficType {
  id: string;
  name: string;
  displayAttributeId?: string;
}
```

We provide a TrafficType class under `SplitAPI.entities.TrafficType`. _Remember that classes are instantiated using the new keyword._

* An example of TrafficType instantiation:
```JavaScript
var myTT = new SplitAPI.entities.TrafficType({
  id: 'tt_id',
  name: 'tt_name'
});
```

* Listing your Traffic Types is an easy task:

```JavaScript
ApiClient.trafficTypes.list().then(function(res) {
  // A collection of Traffic Type instances.
});
```

## How to work with your Attributes
Attribute-like objects follow the interface below:
```TypeScript
interface IAttribute {
  trafficTypeId: string;
  id: string;
  organizationId?: string;
  displayName?: string;
  dataType?: string;
  description?: string;
  isSearchable?: boolean;
}
```

We provide an Attribute class under `SplitAPI.entities.Attribute`. _Remember that classes are instantiated using the new keyword._

* An example of attribute instantiation, which will be reused on the other attribute examples:
```JavaScript
var myAttribute = new SplitAPI.entities.Attribute({
  trafficTypeId: 'a_traffic_type_id',
  id: 'attr_id'
});
```

* You can create your Attributes:
```JavaScript
ApiClient.attributes.create(myAttribute).then(function(res) {
  // The response would be an Attribute instance, with the data as it's on the BE.
});
```

* You can delete your Attributes:
```JavaScript
ApiClient.attributes.delete(myAttribute).then(function(res) {
  // The response would be a boolean flag
});
```

* You can also list your Attributes by Traffic Type:
```JavaScript
ApiClient.attributes.list('a_traffic_type_id').then(function(res) {
  // The response would be list of Attribute instances, representing the attributes that belong to the specified Traffic Type
})
```

## How to work with your Identities
Identity-like objects follow the interface below:
```TypeScript
interface IIdentity {
  key: string;
  environmentId: string;
  trafficTypeId: string;
  organizationId?: string;
  timestamp?: number;
  values?: {
    [key: string]: string
  };
}
```

We provide an Identity class under `SplitAPI.entities.Identity`. _Remember that classes are instantiated using the new keyword._

* An example of identity instantiation, which will be reused on the other identity examples:
```JavaScript
var myIdentity = new SplitAPI.entities.Identity({
  key: 'a_key',
  environmentId: 'env_id',
  trafficTypeId: 'tt_id',
  values: {
    'email': 'mail@gmail.com'
  }
});
```

* You can save your Identities:
```JavaScript
ApiClient.identities.save(myIdentity).then(function(res) {
  // The response would be an Identity instance, with the data as it's on the BE.
});
```

* You can save a collection of your Identities:
```JavaScript
var myIdentities = [myIdentity, anotherIdentity];

ApiClient.identities.saveBulk(myIdentities).then(function(res) {
  // The response will be an object with three properties:
  //  {
  //    objects: // An array of instances for the identities that have been properly saved
  //    metadata: // An object containing metadata of the operation
  //    failed: // A collection of failed results [1].
  //  }
  //
  //  [1] The failed result objects have the following form:
  //  {
  //    object: // The object/instance that couldn't be saved
  //    status: // The status code
  //    message: // The reason for the failure
  //  }
});
```

* You can update your Identities:
```JavaScript
ApiClient.identities.update(myIdentity).then(function(res) {
  // The response would be an Identity instance, with the data as it's on the BE.
});
```

* You can delete your Identities:
```JavaScript
ApiClient.identities.delete(myIdentity).then(function(res) {
  // The response would be a boolean flag, indicating the result of the operation
});
```

## A note about using the exposed classes

We recommend that you use our exposed entity classes to instantiate your objects, but we don't force you to do that. You can just use plain objects.

If you use the class:
* you will receive an error if the specified parameters do not comply with the expected interface, which may save you from catching
the error in the response of the API call.
* Also, you will receive instances from all the services of the API, so you would have your own variables and the received values on the same form.
* If you write your object, it's only one more step to create an instance.

In case you don't want to be creating instances with our exposed classes, you can use plain objects as long as those comply with the 
expected interfaces. **Just keep in mind that if they don't, you will get an error when trying to interact with the API.**

A short example of each:
```JavaScript
// An Environment-like object:
var environment = {
  id: 'env_id',
  name: 'env_name'
};

// A TrafficType-like object:
var trafficType = {
  id: 'tt_id',
  name: 'tt_name'
};

// An Attribute-like object:
var attribute = {
  trafficTypeId: 'tt_id',
  displayName: 'my_attribute',
  description: 'My attribute description'
}

// An Identity-like object:
var identity = {
  key: 'identitiy_key',
  environmentId: 'env_id',
  trafficTypeId: 'tt_id',
  values: {
    'email': 'mail@gmail.com'
  }
};
```