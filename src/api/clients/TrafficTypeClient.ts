import gateway from '../http/gateway';
import TrafficType, { ITrafficType } from '../dtos/TrafficType';

export default class TrafficTypeClient {
  /**
   * Lists all traffic types
   */
  list(): Promise<TrafficType[]> {
    return gateway.get('/trafficTypes').then((res: any) => {
      return res.map(e => new TrafficType(e));
    });
  };
}