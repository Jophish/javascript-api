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

  constructor(
    readonly trafficTypeId: string,
    readonly id?: string,
    readonly organizationId?: string,
    readonly displayName?: string,
    readonly dataType?: string,
    readonly description?: string,
    readonly isSearchable?: boolean
  ) {}

}