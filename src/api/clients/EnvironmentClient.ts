import gateway from '../http/gateway';

export default class EnvironmentClient {
  /**
   * Lists all environments
   */
  list() {
    return gateway.get('/environments');
  };
}