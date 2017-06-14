import Client from './Client';
import Environment, { IEnvironment } from '../dtos/Environment';

export default class EnvironmentClient extends Client {
  /**
   * Lists all environments
   */
  list(): Promise<Environment[]> {
    return this.gateway.get('/environments').then((res: any) => {
      return res.map(e => new Environment(e));
    });
  };
}
