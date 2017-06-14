import Client from './Client';
import Attribute, { IAttribute } from '../dtos/Attribute';

export default class AttributeClient extends Client {
  /**
   * Lists all attributes of a given traffic type
   */
  list(ttId: string): Promise<Attribute[]> {
    if (typeof ttId === 'string') {
      return this.gateway.get(`/trafficTypes/${ttId}/schema`).then((res: any) => {
        return res.map(e => new Attribute(e));
      });
    } else {
      return <any> this.gateway.rejectedReq(new Error('You need to provide a Traffic Type ID to get a list of attributes.'));
    }
  };
  /**
   * Creates an attribute
   */
  create(attribute: IAttribute): Promise<Attribute> {
    try {
      const attr = new Attribute(attribute);
      return this.gateway.put(attr, `/trafficTypes/${attr.trafficTypeId}/schema`).then((res) => {
        return new Attribute(<any> res);
      });
    } catch (err) {
      return <any> this.gateway.rejectedReq(err);
    }
  }
  /**
   * Deletes an attribute
   */
  delete(attribute: IAttribute): Promise<boolean> {
    try {
      const attr = new Attribute(attribute);
      return this.gateway.del(`/trafficTypes/${attr.trafficTypeId}/schema/${attr.id}`);
    } catch (err) {
      return <any> this.gateway.rejectedReq(err);
    }
  }
}
