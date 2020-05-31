import { NormalizedPath } from '../../utils/NormalizedPath'
import { parsePathString } from './parsePathString'

/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/
export type UnnormalizedPathKey = string | symbol | number
export type UnnormalizedPath = UnnormalizedPathKey[] | UnnormalizedPathKey
export const normalizePath = (
  pathVal: UnnormalizedPath,
  object: unknown,
  parseString: boolean = true
): NormalizedPath => {
  if (typeof pathVal === 'string') {
    if (!parseString) {
      return [pathVal]
    }
    const isKey = reIsPlainProp.test(pathVal) || !reIsDeepProp.test(pathVal) ||
      (object != null && pathVal in Object(object))
    return isKey ? [pathVal] : parsePathString(pathVal)
  } else if (Array.isArray(pathVal)) {
    return pathVal.map((x) => (normalizePath(x, null, false)[0]))
  } else if (typeof pathVal === 'number') {
    let strNumVal = `${pathVal}`
    strNumVal = (strNumVal == '0' && (1 / pathVal) == -(1 / 0)) ? '-0' : strNumVal
    return [strNumVal]
  } else { // symbol
    return [pathVal]
  }
}
