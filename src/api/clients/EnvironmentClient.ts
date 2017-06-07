import gateway from '../http/gateway';
import Environment, { IEnvironment } from '../dtos/Environment';

export default class EnvironmentClient {
  /**
   * Lists all environments
   */
  list(): Promise<Environment[]> | Promise<Error> {
    return gateway.get('/environments').then((res: any) => {
      return res.objects.map(e => new Environment(e));
    });
  };
}