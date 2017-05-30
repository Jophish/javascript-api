import gateway from '../http/gateway';
import { IAttribute } from '../dtos/Attribute';

export default class AttributeClient {
  /**
   * Lists all attributes of a given traffic type
   */
  list(ttId: string) {
    return gateway.get(`/trafficTypes/${ttId}/schema`);
  };
  /**
   * Creates an attribute
   */
  create(attr: IAttribute) {
    return gateway.put(attr, `/trafficTypes/${attr.trafficTypeId}/schema`);
  }
  /**
   * Deletes an attribute
   */
  delete(attr: IAttribute) {
    return gateway.del(`/trafficTypes/${attr.trafficTypeId}/schema/${attr.id}`);
  }
}
