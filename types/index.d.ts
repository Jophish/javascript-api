// Declaration file for Node Split Software API SDK v1.0.0
// Project: https://github.com/splitio/javascript-api
// Definitions by: Nico Zelaya <https://github.com/NicoZelaya/>

/***** Exposed methods *****/
/**
 * Returns an API Client with given key and configuration.
 * @function client
 * @param {string} adminKey - Your admin API key.
 * @param {IApiConfig} config - The configuration for the API client.
 * @returns {ApiClient}
 */
export function client(adminKey: string, config?: SplitAPI.IApiConfig): SplitAPI.ApiClient;

/**
 * Exposed entities classes to be used for instantiation of your 
 * own entities.
 * @namespace entities
 */
export namespace entities {
  /**
   * Attribute class.
   * @class
   * @implements {IAttribute}
   */
  class Attribute implements SplitAPI.IAttribute {
    /**
     * The ID of the Traffic Type of this attribute.
     * @member {string} trafficTypeId
     * @readonly
     */
    readonly trafficTypeId: string;
    /**
     * The ID of this attribute.
     * @member {string} id
     * @readonly
     */
    readonly id: string;
    /**
     * The ID of the Organization owner of this attribute.
     * @member {string} organizationId
     * @readonly
     */
    readonly organizationId: string;
    /**
     * The Display Name of this attribute.
     * @member {string} displayName
     * @readonly
     */
    readonly displayName: string;
    /**
     * The Data Type of this attribute.
     * @member {string} dataType
     * @readonly
     */
    readonly dataType: string;
    /**
     * The Description of this attribute.
     * @member {string} description
     * @readonly
     */
    readonly description: string;
    /**
     * Flag indicating wether this attribute is searchable or not.
     * @member {boolean} isSearchable
     * @readonly
     */
    readonly isSearchable: boolean;
    /**
     * @constructor
     * @param {IAttribute} attributeData - The Attribute-like object from which we will create our instance.
     */
    constructor(attributeData: SplitAPI.IAttribute);
  }
  /**
   * Environment class.
   * @class
   * @implements {IEnvironment}
   */
  class Environment implements SplitAPI.IEnvironment {
    /**
     * The ID of this environment.
     * @member {string} id
     * @readonly
     */
    readonly id: string; 
    /**
     * The Name of this environment.
     * @member {string} id
     * @readonly
     */
    readonly name: string;
    /**
     * @constructor
     * @param {IEnvironment} environmentData - The Environment-like object from which we will create our instance.
     */
    constructor(environmentData: SplitAPI.IEnvironment)
  }
  /**
   * Identity class.
   * @class
   * @implements {IIdentity}
   */
  class Identity implements SplitAPI.IIdentity {
    /**
     * The Key of this identity.
     * @member {string} key
     * @readonly
     */
    readonly key: string;
    /**
     * The ID of the Environment of this identity.
     * @member {string} environmentId
     * @readonly
     */
    readonly environmentId: string;
    /**
     * The ID of the Traffic Type of this identity.
     * @member {string} trafficTypeId
     * @readonly
     */
    readonly trafficTypeId: string;
    /**
     * The ID of the Organization owner of this identity.
     * @member {string} organizationId
     * @readonly
     */
    readonly organizationId: string;
    /**
     * The Timestamp of this identity.
     * @member {number} timestamp
     * @readonly
     */
    readonly timestamp: number;
    /**
     * The values of this identity.
     * @member {Object.<string, string>} values
     * @readonly
     */
    readonly values: {
      [key: string]: string
    };
    /**
     * @constructor
     * @param {IIdentity} identityData - The Identity-like object from which we will create our instance.
     */
    constructor(identityData: SplitAPI.IIdentity);
  }
  /**
   * Traffic Type class.
   * @class
   * @implements {ITrafficType}
   */
  class TrafficType implements SplitAPI.ITrafficType {
    /**
     * The ID of this traffic type.
     * @member {string} id
     * @readonly
     */
    readonly id: string; 
    /**
     * The Name of this traffic type.
     * @member {string} name
     * @readonly
     */
    readonly name: string;
    /**
     * The ID of the Display Attribute for this traffic type.
     * @member {string} displayAttributeId
     * @readonly
     */
    readonly displayAttributeId: string;
    /**
     * @constructor
     * @param {ITrafficType} trafficTypeData - The TrafficType-like object from which we will create our instance.
     */
    constructor(trafficTypeData: SplitAPI.ITrafficType);
  }
}
/**
 * Types and interfaces for @splitsoftware/splitio-api package for usage when integrating Javascript API sdk on typescript apps.
 * @namespace SplitAPI
 */
declare namespace SplitAPI {
  /***** Response specific DTO types *****/  
  /**
   * @typedef {Object<T>} FailureDTO
   * @property {T} object - The item that produced the error.
   * @property {number} status - The status of the response.
   * @property {string} message - The reason of the failure.
   */
  type FailureDTO<T> = {
    object: T,
    status: number,
    message: string
  }

  /**
   * @typedef {Object<T>} ResultDTO
   * @property {Array<T>} objects - The array of succesfully saved items.
   * @property {Object.<string, string>} metadata - Metadata of the operation.
   * @property {Array<FailureDTO<T>>} failed - The list of failures.
   */
  type ResultDTO<T> = {
    objects: Array<T>,
    metadata: { 
      [key:string]: string 
    },
    failed: FailureDTO<T>[]
  }
  /***** Response types *****/
  /**
   * @typedef {Promise<T>} ApiResponse
   */
  type ApiResponse<T> = Promise<T>;
  /**
   * @typedef {Promise<T[]>} ApiResponseList
   */
  type ApiResponseList<T> = Promise<T[]>;
  /**
   * @typedef {Promise<{}>>} ApiResponseBulk
   */
  type ApiResponseBulk<T> = Promise<ResultDTO<T>>

  /***** Config-related *****/
  /**
   * Interface for Attribute-like objects
   * @interface IAttribute
   */
  interface IApiConfig {
    /**
     * @property {string} [endpoint] - The configured endpoint for API calls.
     */
    endpoint?: string;
    /**
     * @property {number} [connectionTimeout] - The configured connection timeout for API calls.
     */
    connectionTimeout?: number;
    /**
     * @property {boolean} [debugEnabled] - Flag for enabling debugging logs.
     */
    debugEnabled?: boolean;
  }
  /**
   * API Config class.
   * @class
   * @implements {IApiConfig}
   */
  class ApiConfig implements IApiConfig {
    /**
     * Endpoint to be used for this API Client
     * @member {string} endpoint
     * @readonly
     */
    readonly endpoint: string;
    /**
     * Connection timeout for the requests of this API Client
     * @member {string} connectionTimeout
     * @readonly
     */
    readonly connectionTimeout: number;
    /**
     * Wether debugging logs are enabled or not.
     * @member {boolean} debugEnabled
     * @readonly
     */
    readonly debugEnabled: boolean;
    /**
     * Split API version.
     * @member {string} apiVersion
     * @readonly
     */
    readonly apiVersion: string;
    /**
     * Split API Spec version.
     * @member {string} apiSpecVersion
     * @readonly
     */
    readonly apiSpecVersion: string;
  }

  /***** Client classes *****/
  /**
   * API Client class.
   * @class
   */
  class ApiClient {
    /**
     * Configuration of this API Client
     * @member {ApiConfig} config
     * @readonly
     */
    readonly config: ApiConfig;
    /**
     * Attribute client.
     * @member {AttributeClient} attributes
     * @readonly
     */
    readonly attributes: AttributeClient;
    /**
     * Environment client.
     * @member {EnvironmentClient} environments
     * @readonly
     */
    readonly environments: EnvironmentClient;
    /**
     * Identity client.
     * @member {IdentityClient} identities
     * @readonly
     */
    readonly identities: IdentityClient;
    /**
     * Traffic Type client.
     * @member {TrafficTypeClient} trafficTypes
     * @readonly
     */
    readonly trafficTypes: TrafficTypeClient;
  }
  /**
   * Attribute Client class.
   * @class
   */
  class AttributeClient {
    /**
     * Returns the list of Attributes for the given Traffic Type
     * @method list
     * @param {string} trafficTypeId
     * @return {ApiResponseList<Attribute>}
     */
    list(trafficTypeId: string): ApiResponseList<entities.Attribute>;
    /**
     * Creates the given Attribute
     * @method create
     * @param {IAttribute} attribute
     * @return {ApiResponse<Attribute>}
     */
    create(attribute: IAttribute): ApiResponse<entities.Attribute>;
    /**
     * Deletes the given Attribute
     * @method delete
     * @param {IAttribute} attribute
     * @return {ApiResponse<boolean>}
     */
    delete(attribute: IAttribute): ApiResponse<boolean>;
  }
  /**
   * Environment Client class.
   * @class
   */
  class EnvironmentClient {
    /**
     * Returns the list of Environments.
     * @method list
     * @return {ApiResponseList<Attribute>}
     */
    list(): ApiResponseList<entities.Environment>;
  }
  /**
   * Identity Client class.
   * @class
   */
  class IdentityClient {
    /**
     * Saves the given Identity
     * @method save
     * @param {IIdentity} identity
     * @return {ApiResponse<Identity>}
     */
    save(identity: IIdentity): ApiResponse<entities.Identity>;
    /**
     * Saves the given list of Identities
     * @method saveBulk
     * @param {Array<IIdentity>} identities
     * @return {ApiResponseBulk<Identity>}
     */
    saveBulk(identities: Array<IIdentity>): ApiResponseBulk<entities.Identity>;
    /**
     * Updates the given Identity
     * @method update
     * @param {IIdentity} identity
     * @return {ApiResponse<Identity>}
     */
    update(identity: IIdentity): ApiResponse<entities.Identity>;
    /**
     * Deletes the given Identity
     * @method delete
     * @param {IIdentity} identity
     * @return {ApiResponse<boolean>}
     */
    delete(identity: IIdentity): ApiResponse<boolean>;
  }
  /**
   * Traffic Type Client class.
   * @class
   */
  class TrafficTypeClient {
    /**
     * Returns the list of Traffic Types.
     * @method list
     * @return {ApiResponseList<TrafficType>}
     */
    list(): ApiResponseList<entities.TrafficType>;
  }

  /***** Entity-like interfaces *****/
  /**
   * Interface for Attribute-like objects
   * @interface IAttribute
   */
  interface IAttribute {
    /**
     * @property {string} trafficTypeId - The ID of the Traffic Type of this attribute.
     */
    trafficTypeId: string;
    /**
     * @property {string} [id] - The ID of this attribute.
     */
    id?: string;
    /**
     * @property {string} [organizationId] - The ID of the Organization owner of this attribute.
     */
    organizationId?: string;
    /**
     * @property {string} [displayName] - The Display Name of this attribute.
     */
    displayName?: string;
    /**
     * @property {string} [dataType] - The Data Type of this attribute.
     * @default STRING
     */
    dataType?: string;
    /**
     * @property {string} [description] - The Description of this attribute.
     */
    description?: string;
    /**
     * @property {boolean} [isSearchable] - Flag indicating wether this attribute is searchable or not.
     */
    isSearchable?: boolean;
  }
  /**
   * Interface for Environment-like objects
   * @interface IEnvironment
   */
  interface IEnvironment {
    /**
     * @property {string} id - The ID of this environment.
     */
    id: string;
    /**
     * @property {string} name - The Name of this environment.
     */
    name: string;
  }
  /**
   * Interface for Identity-like objects
   * @interface IIdentity
   */
  interface IIdentity {
    /**
     * @property {string} key - The Key of this identity.
     */
    key: string;
    /**
     * @property {string} environmentId - The ID of the Environment of this identity.
     */
    environmentId: string;
    /**
     * @property {string} trafficTypeId - The ID of the Traffic Type of this identity.
     */
    trafficTypeId: string;
    /**
     * @property {Object.<string, string>} [values] - The values of this identity.
     */
    values?: {
      [key: string]: string
    };
    /**
     * @property {string} [organizationId] - The ID of the Organization owner of this identity.
     */
    organizationId?: string;
    /**
     * @property {number} [timestamp] - The Timestamp of this identity.
     */
    timestamp?: number;
  }
  /**
   * Interface for TrafficType-like objects
   * @interface ITrafficType
   */
  interface ITrafficType {
    /**
     * @property {string} id - The ID of this traffic type.
     */
    id: string;
    /**
     * @property {string} name - The Name of this traffic type.
     */
    name: string;
    /**
     * @property {string} [displayAttributeId] - The ID of the Display Attribute for this traffic type.
     */
    displayAttributeId?: string;
  } 
}

