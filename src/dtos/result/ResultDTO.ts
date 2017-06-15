import FailureDTO from './FailureDTO';

export default class ResultDTO<T> {
  constructor(
    public objects: Array<T> = [],
    public failed: Array<FailureDTO<T>> = [],
    public metadata: { [key:string]: string } = {}
  ) {}
}
