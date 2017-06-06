import gateway from '../http/gateway';
import Attribute, { IAttribute } from '../dtos/Attribute';

export default class AttributeClient {
  /**
   * Lists all attributes of a given traffic type
   */
  list(ttId: string): Promise<Array<Attribute>> | Promise<Error> {
    if (typeof ttId === 'string') {
      return gateway.get(`/trafficTypes/${ttId}/schema`).then((res: any) => {
        return res.objects.map(e => new Attribute(e));
      });
    } else {
      return gateway.rejectedReq(new Error('You need to provide a Traffic Type ID to get a list of attributes.'));
    }
  };
  /**
   * Creates an attribute
   */
  create(attribute: IAttribute) {
    try {
      const attr = new Attribute(attribute);
      return gateway.put(attr, `/trafficTypes/${attr.trafficTypeId}/schema`).then((res) => {
        return new Attribute(<any> res);
      });     
    } catch (err) {
      return gateway.rejectedReq(err);
    }
  }
  /**
   * Deletes an attribute
   */
  delete(attribute: IAttribute) {
    try {
      const attr = new Attribute(attribute);
      return gateway.del(`/trafficTypes/${attr.trafficTypeId}/schema/${attr.id}`);     
    } catch (err) {
      return gateway.rejectedReq(err);
    }
  }
}
