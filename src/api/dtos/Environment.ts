export interface IEnvironment {
  id: string;
  name: string;
}

export default class Environment implements IEnvironment {

  constructor(
    readonly id: string, 
    readonly name: string
  ) {}
}