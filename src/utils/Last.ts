import { NonemptyTuple } from './NonemptyTuple'
import { Rest } from './Rest'
import { Shell } from './Shell'
import { Unshell } from './Unshell'

type LastHelper<
  Tuple extends NonemptyTuple
> = Rest<Tuple> extends NonemptyTuple
  ? [
      LastHelper<Rest<Tuple>>
  ]
  : Shell<Tuple[0]>

export type UnionFlatten<T> = Exclude<T, any[]> | {
  0: T extends (infer L)[] ? UnionFlatten<L> : never
  1: never
}[T extends any[] ? 0: 1]
  
export type Last<T extends NonemptyTuple> = Unshell<UnionFlatten<LastHelper<T>>>
