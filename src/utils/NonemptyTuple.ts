export type NonemptyTuple<X extends unknown = unknown, HasIdx extends number = 0> = (
  X[] & { [k in HasIdx | 0]: X}
) | (
  readonly X[]  & { readonly [k in HasIdx | 0]: X }
)
