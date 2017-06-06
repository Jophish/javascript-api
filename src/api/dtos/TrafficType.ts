export interface ITrafficType {
  id: string;
  name: string;
  displayAttributeId?: string;
}

export default class TrafficType implements ITrafficType {

  readonly id: string; 
  readonly name: string;
  readonly displayAttributeId: string;

  constructor(ttData: ITrafficType) {
    if (!this.isTrafficTypeLike(ttData)) {
      throw new Error('You need to pass an object with at least name and id to instantiate a Traffic Type.');
    }

    const {
      id, name, displayAttributeId
    } = ttData;

    this.id = id;
    this.name = name;
    this.displayAttributeId = displayAttributeId;
  };

  private isTrafficTypeLike(ttData): boolean {
    return (typeof ttData === 'object'
            && typeof ttData.id === 'string'
            && typeof ttData.name === 'string');
  }
}