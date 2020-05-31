import { PrependNonNever } from './PrependNonNever'
export type DeepFlattenTuple<T> = PrependNonNever<
  {
      0: T extends (infer L)[] ? DeepFlattenTuple<L> : never
      1: never
  }[T extends any[] ? 0 : 1],
  Exclude<T, any[]>
  >