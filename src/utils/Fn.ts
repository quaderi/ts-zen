export interface Fn<
  Args extends ReadonlyArray<unknown>,
  ReturnVAlue extends unknown = unknown
> {
  (...args: Args): ReturnVAlue
}
