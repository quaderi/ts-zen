import { UnnormalizedPath, normalizePath } from "./path/normalizePath"
import { Mutable } from "../utils/Mutable"
import { ReadonlyNonemptyNormalizedPath } from "../utils/ReadonlyNonemptyNormalizedPath"
import { NonemptyPathTuple } from "../utils/NonemptyPath"
import { _Get } from "../utils/_Get"

// TS reimplimentation of lodash.get
//  this version does not include memoization for the parsing of string paths
export const _get = <
  T extends any = any,
  Path extends UnnormalizedPath = UnnormalizedPath,
>(
  object: T,
  path: Path,
  defaultValue: unknown = undefined
): unknown => {
  if (object === null) {
    return defaultValue
  }
  if (object === undefined) {
    return defaultValue
  }
  for (const key of normalizePath(path, object)) {
    if (object && (key in object)) {
      // @ts-ignore
      object = object[key]
    } else {
      return defaultValue
    }
  }
  return (object === undefined) ? defaultValue : object
}
