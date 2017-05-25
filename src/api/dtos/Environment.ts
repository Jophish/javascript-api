export interface IEnvironment {
  id: string,
  name: string
}

export default class Environment implements IEnvironment {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}