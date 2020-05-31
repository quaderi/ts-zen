import { NonemptyTuple } from './NonemptyTuple'

export type Rest<Tuple extends NonemptyTuple> = (
  ((...args: Tuple) => void) extends (first: unknown, ...rest: infer RestTuple) => void
  ? RestTuple
  : []
)
