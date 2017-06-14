import Client from './Client';
import TrafficType, { ITrafficType } from '../dtos/TrafficType';

export default class TrafficTypeClient extends Client {
  /**
   * Lists all traffic types
   */
  list(): Promise<TrafficType[]> {
    return this.gateway.get('/trafficTypes').then((res: any) => {
      return res.map(e => new TrafficType(e));
    });
  };
}
