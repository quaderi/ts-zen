
export type NonemptyTuple<X extends unknown = unknown> = (X[] & { [0]: X}) | (readonly X[] & { readonly [0]: X })

