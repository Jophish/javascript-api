export interface IAttribute {
  trafficTypeId: string;
  id?: string;
  organizationId?: string;
  displayName?: string;
  dataType?: string;
  description?: string;
  isSearchable?: boolean;
}

export default class Attribute implements IAttribute {

  readonly trafficTypeId: string;
  readonly id: string;
  readonly organizationId: string;
  readonly displayName: string;
  readonly dataType: string;
  readonly description: string;
  readonly isSearchable: boolean;

  constructor(attrData: IAttribute) {
    if (!this.isAttributeLike(attrData)) {
      throw new Error('You need to pass an object with at least trafficTypeId to instantiate an Attribute');
    }

    const {
      trafficTypeId, id, organizationId, displayName, dataType, description, isSearchable
    } = attrData;

    this.trafficTypeId = trafficTypeId;
    this.id = id;
    this.organizationId = organizationId;
    this.displayName = displayName;
    this.dataType = dataType;
    this.description = description;
    this.isSearchable = isSearchable;
  }

  private isAttributeLike(attrData: any): boolean {
    return (typeof attrData === 'object'
            && typeof attrData.trafficTypeId === 'string');
  }
}