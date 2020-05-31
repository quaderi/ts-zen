// Note: much of the _get related logic
//  and regexes is borrowed from lodash
//  it is intended to be functionally
//  interchangeable
const charCodeOfDot = 46
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

export const parsePathString = (pathStr: string): string[] => {
  const pathArr = []
  if (pathStr.charCodeAt(0) === charCodeOfDot) {
    pathArr.push('')
  }
  // Abusing String.prototype.replace
  //  for side-effect (lodash does this)
  pathStr.replace(rePropName, (
    match: string,
    expression: string,
    quote: string,
    subString: string
  ) => {
    // Side effect we care about
    let pathPart
    if (quote) {
      pathPart = subString.replace(reEscapeChar, '$1')
    } else if (expression) {
      pathPart = expression.trim()
    } else {
      pathPart = match
    }
    pathArr.push(pathPart)

    // return shouldn't matter but ought to be a string
    return match
  })
  return pathArr
}
