import { PartialRecursive, PartialRecursiveObject} from './PartialRecursive'

// Example code
type JsonLeaves =
| null
| boolean
| number
| string
type BinaryBooleanTree = PartialRecursiveObject<boolean, false, 'left' | 'right', false>
const binaryBooleanTree = {
    left: true,
    right: {
        left: false
    }
} as const
const b: BinaryBooleanTree = binaryBooleanTree

type ReadOnlyFriendlyJson = PartialRecursive<JsonLeaves, true>
const x: ReadOnlyFriendlyJson = [b, binaryBooleanTree]

type UndefinedAndReadOnlyFriendlyJson = PartialRecursive<JsonLeaves | undefined, true>
const y: UndefinedAndReadOnlyFriendlyJson = [undefined, x]
console.log(y)
