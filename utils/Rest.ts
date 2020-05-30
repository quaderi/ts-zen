import { NonemptyTuple } from "./NonemptyTuple";

export type Rest<Tuple extends NonemptyTuple> = (
  ((...b: Tuple) => void) extends (a: any, ...b: infer I) => void
  ? I
  : []
)
