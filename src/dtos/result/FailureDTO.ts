export default class FailureDTO<T> {
  constructor(
    public object: T,
    public status: number,
    public message: string
  ) { }
}