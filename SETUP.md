# Split JavaScript API - Setting it up
_You can also refer to the [official SDK documentation](http://docs.split.io/docs/sdk-overview)._

This library is written in [TypeScript](https://www.typescriptlang.org/) and provides within:
  - Declaration files for **TS users**, to take advantage of custom types.
  - For people who wants an **ES6 & ES modules** build, there is one in `/es` flagged as `module` on package.json
  - For people using an **ES5 environment, with CommonJS modules,** your build is in `/lib`. 

***NOTE: If you don't know which build you need, just stick with the ES5 + CommonJS which is defaulted.***

## Basic setup
How to set up the API on the different environments. 
We wrote the library in TS and provide build for ES modules and CommonJS modules, so you can make your choice. Either way,
keep in mind that you will need to take care of the necessary transpiling if running a build that is not the CommonJS one.

### If you are working with normal JavaScript, using CommonJS

```JavaScript
var SplitAPI = require('@splitsoftware/splitio-api');

// Get the client, settings object is optional.
var apiClient = SplitAPI.client('api-key', {
  connectionTimeout: 15000,
  debugEnabled: true
});

// Classes for the entities are provided under entities object.
var attr = new SplitAPI.entities.Attribute('attributeId');

apiClient.attributes.create(attr).then(function (res) {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});

// Or you can use objects that comply with the expected interfaces
var attrObject = {
  id: 'attributeObjId'
};

apiClient.attributes.create(attrObject).then(function (res) {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});
```

### If you are working with ES6, using ES modules
As there is still no standard for delivering the two builds, we included the `module` key of our package.json ([following this proposal](https://github.com/rollup/rollup/wiki/pkg.module))
pointing to the files under `/es` folder, which is the build with ES modules. 

* If you are using a tool like [Rollup](https://rollupjs.org/) or [Webpack](https://webpack.js.org/), which looks on package.json for the       `module` key, you should be fine.
* If you can't point to the `module` key of package.json, you can import `/es/` folder directly  
  `import { client, entities } from '@splitsoftware/splitio-api/es'`

```JavaScript
import { client, entities } from '@splitsoftware/splitio-api';
// or if you want to import our build with ES modules directly
import { client, entities } from '@splitsoftware/splitio-api/es';

// Get the client, settings object is optional.
const apiClient = client('api-key', {
  connectionTimeout: 15000,
  debugEnabled: true
});

// Classes for the entities are provided under entities object.
const attr = new entities.Attribute('attributeId');

apiClient.attributes.create(attr).then(res => {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});

// Or you can use objects that comply with the expected interfaces
const attrObject: SplitAPI.IAttribute = {
  id: 'attributeObjId'
};

apiClient.attributes.create(attrObject).then(res => {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});
```

### If you are working with TypeScript:
Get the package as always, but enjoy custom typing! The namespace SplitAPI contains
the custom types.

If by any chance, you need the TS source code, just import the `/src` folder index (Keep in mind this is a .ts file):  
`import { client, entities } from '@splitsoftware/splitio-api/src'`

```TypeScript
import { client, entities, SplitAPI } from '@splitsoftware/splitio-api';
// or if you want to import our TS source code
import { client, entities } from '@splitsoftware/splitio-api/src';

// Get the client, settings object is optional.
const apiClient: SplitAPI.ApiClient = client('api-key', {
  connectionTimeout: 15000,
  debugEnabled: true
});

// Classes for the entities are provided under entities object.
const attr: SplitAPI.IAttribute = new entities.Attribute('attributeId');

apiClient.attributes.create(attr).then(res => {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});

// Or you can use objects that comply with the expected interfaces
const attrObject: SplitAPI.IAttribute = {
  id: 'attributeObjId'
};

apiClient.attributes.create(attrObject).then(res => {
  console.log('Attribute created: ' + JSON.stringify(res.body));
});
```

### A note on the different builds