import gateway from '../http/gateway';

export default class TrafficTypeClient {
  /**
   * Lists all traffic types
   */
  list() {
    return gateway.get('/trafficTypes');
  };
}