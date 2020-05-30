import { NormalizedPathKey } from "./NormalizedPathKey";

export type ReadonlyNonemptyNormalizedPath = readonly NormalizedPathKey[] & { readonly 0: NormalizedPathKey }
