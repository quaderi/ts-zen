import { NonemptyPathTuple } from './NonemptyPath'
import { Rest } from './Rest'

export type _Set<
  Object,
  Path extends NonemptyPathTuple,
  Value = unknown
> = Path[0] extends keyof Object
  ? (
    {
      [key in keyof Object]: Path[0] extends key
        ? (
          Rest<Path> extends NonemptyPathTuple
            ? _Set<Object[Path[0]], Rest<Path>, Value>
            : Value
        )
        : Object[key]
    }
  )
  : Object
