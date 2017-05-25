export interface IAttribute {
  id: string,
  trafficTypeId: string,
  name: string,
  dataType: string,
  description?: string
}

export default class Attribute implements IAttribute {
  readonly id: string;
  readonly trafficTypeId: string;
  readonly name: string;
  readonly dataType: string;
  readonly description: string;

  constructor(attrData: IAttribute) {
    const {
      id, trafficTypeId, name, dataType, description
    } = attrData;

    this.id = id;
    this.trafficTypeId = trafficTypeId;
    this.name = name;
    this.dataType = dataType;
    this.description = description;
  }

}