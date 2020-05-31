import { NonemptyPathTuple } from './NonemptyPath'
import { Rest } from './Rest'

export type _Get<
  Object,
  Path extends NonemptyPathTuple
> = Path[0] extends keyof Object
  ? (
    {
      [key in Path[0]]: Rest<Path> extends NonemptyPathTuple
          ? _Get<Object[Path[0]], Rest<Path>>
          : Object[Path[0]]
    }[Path[0]]
  )
  : unknown
