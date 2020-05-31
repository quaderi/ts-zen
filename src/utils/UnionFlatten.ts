export type UnionFlatten<T> = Exclude<T, any[]> | {
  0: T extends (infer L)[] ? UnionFlatten<L> : never
  1: never
}[T extends unknown[] ? 0: 1]
