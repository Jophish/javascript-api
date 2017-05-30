export interface IAttribute {
  id: string,
  trafficTypeId: string,
  displayName: string,
  dataType?: string,
  description?: string
}

export default class Attribute implements IAttribute {

  constructor(
    readonly id: string,
    readonly trafficTypeId: string,
    readonly displayName: string,
    readonly dataType: string = null,
    readonly description: string = ''
  ) {}

}