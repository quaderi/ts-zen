/**
 * A type that allows any level of nesting allowed with respect to arrays/objects using specified leaf types
 *  Depending on the parameters it can specify a superset or subset of json as
 *  (e.g. for standard json, set allowed leaves to json primitives, AllowReadOnly to false, and keep other defaults) 
 *  but also allow undefined, however alternative primitives may be explicitly specified
 *  Unless NoReadOnly is false, arrays and objects not in leaves are allowed to be readonly
 *  Unless a specific string literal union is specified for AllowedKeys, all string keys are allowed
 *  If arrays should not be allowed outside of leaves, AllowArrays should be set to false
 *  If non-array objects should not be allowed outside of leaves, AllowObjects should be set to false
 */
export type PartialRecursive<
  Leaves,
  AllowReadOnly extends boolean = true,
  AllowedKeys extends string = string,
  AllowArrays extends boolean = true,
  AllowObjects extends boolean = true,
> = (
  | Leaves
  | (
    AllowObjects extends true
      ? PartialRecursiveObject<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
      : never
  )
  | (
    AllowArrays extends true
      ? PartialRecursiveArray<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
      : never
  )
)| (
  AllowReadOnly extends false
    ? never
    : AllowArrays extends false
      ? never
      : (
        ReadonlyArray<(
          | Leaves
          | (
            AllowObjects extends true
              ? PartialRecursiveObject<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
              : never
          )
          | PartialRecursiveArray<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
        )>
      )
)

/**
 * An object which may be readonly (unless NoReadOnly is false)
 *  which has strings for all keys and has PartialRecursive values
 *   with the specified settings passed along recursively
 */
export type PartialRecursiveObject<
  Leaves,
  AllowReadOnly extends boolean = true,
  AllowedKeys extends string = string,
  AllowArrays extends boolean = true,
  AllowObjects extends boolean = true,
> = Partial<{
  [property in AllowedKeys]: PartialRecursive<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
}> | (
  AllowReadOnly extends false
    ? never
    : (
      Readonly<Partial<{
        [property in AllowedKeys]: PartialRecursive<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>
      }>>
    )
)


/**
 * An array which may be readonly (unless NoReadOnly is false)
 *  which contains a PartialRecursive with the specified settings
 *  passed along recursively
 */
export type PartialRecursiveArray<
  Leaves,
  AllowReadOnly extends boolean = true,
  AllowedKeys extends string = string,
  AllowArrays extends boolean = true,
  AllowObjects extends boolean = true,
> =
  | Array<PartialRecursive<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>>
  | (
    AllowReadOnly extends false
      ? never
      : ReadonlyArray<PartialRecursive<Leaves, AllowReadOnly, AllowedKeys, AllowArrays, AllowObjects>>
  )
