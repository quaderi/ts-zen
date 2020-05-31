import { NonemptyTuple } from './NonemptyTuple'
import { Fn } from './Fn'
import { DeepFlattenTuple } from './DeepFlattenTuple'
import { Last } from './Last'
import { Rest } from './Rest'

export type RestAny<Tuple> = Tuple extends NonemptyTuple ? (
  Rest<Tuple>
) : []


export type _ProtoPipe<
  R extends NonemptyTuple<unknown, 1>
> = RestAny<R> extends NonemptyTuple<unknown, 1>
    ? [
        Fn<[R[0]], R[1]>,
        _ProtoPipe<RestAny<R>>
    ]
    : [
        Fn<[R[0]], R[1]>
    ]

// @ts-ignore
export type PipeBuilder<R> =  R extends unknown[] & { 0: unknown, 1: unknown } ? Fn<
  // @ts-ignore
  DeepFlattenTuple<_ProtoPipe<R>>,
  // @ts-ignore
  Fn<[R[0]], Last<R>>
> : never
