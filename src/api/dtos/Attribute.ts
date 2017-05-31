export interface IAttribute {
  id: string;
  organizationId?: string;
  trafficTypeId?: string;
  displayName?: string;
  dataType?: string;
  description?: string;
  isSearchable?: boolean;
}

export default class Attribute implements IAttribute {

  constructor(
    readonly id: string,
    readonly organizationId?: string,
    readonly trafficTypeId?: string,
    readonly displayName?: string,
    readonly dataType?: string,
    readonly description?: string,
    readonly isSearchable?: boolean
  ) {}

}