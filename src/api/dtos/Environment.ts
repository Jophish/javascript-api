export interface IEnvironment {
  id: string;
  name: string;
}

export default class Environment implements IEnvironment {

  readonly id: string; 
  readonly name: string;
  
  constructor(envData: IEnvironment) {
    if (!this.isEnvironmentLike(envData)) {
      throw new Error('You need to pass an object with name and id to instantiate an Environment');
    }

    const {
      id, name
    } = envData;

    this.id = id;
    this.name = name;
  }

  private isEnvironmentLike(envData: any): boolean {
    return (typeof envData === 'object'
            && typeof envData.id === 'string'
            && typeof envData.name === 'string');
  }
}