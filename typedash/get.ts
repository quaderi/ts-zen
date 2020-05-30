import { ReadonlyNonemptyNormalizedPath } from "../utils/ReadonlyNonemptyNormalizedPath";
import { Mutable } from "../utils/Mutable";
import { NonemptyPathTuple } from "../utils/NonemptyPath";
import { _Get } from "../utils/_Get";
import { _get } from "./_get";


/**
 * Return type will be unknown if path cannot be found in typing
 * To get best results for output type:
 *   - path must be a readonly tuple with pre-normalized keys (literal strings & symbols) at compile time
 *   - object should be provided with as specific a type as possible at compile time
 *  (Literals produced with 'as const' work well)
 * @param object 
 * @param path 
 * @param defaultVal 
 */
export const get = <
  T,
  Path extends ReadonlyNonemptyNormalizedPath
>(
    object: T,
    path: Path,
    defaultVal?: unknown,
): (
  _Get<T, Path>
) => _get(object, [...path], defaultVal) as any
