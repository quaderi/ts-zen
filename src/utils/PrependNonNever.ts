export type PrependNonNever<
    Rest extends unknown[],
    NewHead extends unknown
> =  [NewHead] extends [never]
  ? Rest :
  (
    ((head: NewHead, ...args: Rest) => any) extends ((...args: infer U) => any)
        ? U
        : Rest
  )