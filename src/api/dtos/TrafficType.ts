export interface ITrafficType {
  id: string,
  name: string
}

export default class TrafficType implements ITrafficType {

  constructor(
    readonly id: string, 
    readonly name: string
  ) {};
}