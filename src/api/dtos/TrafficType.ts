export interface ITrafficType {
  id: string,
  name: string
}

export default class TrafficType implements ITrafficType {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  };
}