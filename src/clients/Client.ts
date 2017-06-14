import Gateway from '../http/gateway';

export default class Client {
  protected gateway: Gateway;

  constructor(gateway: Gateway) {
    this.gateway = gateway;
  }
}
