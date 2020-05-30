import { PartialRecursive, PartialRecursiveObject} from './PartialRecursive'
import { get } from './typedash/get'
import { AreEqual } from './utils/AreEqual'
import { _Set } from './utils/_Set'

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
const readonlyFriendlyJson: ReadOnlyFriendlyJson = [b, binaryBooleanTree]

type UndefinedAndReadOnlyFriendlyJson = PartialRecursive<JsonLeaves | undefined, true>
const undefinedAndReadOnlyFriendlyJson: UndefinedAndReadOnlyFriendlyJson = [undefined, readonlyFriendlyJson]
console.log(undefinedAndReadOnlyFriendlyJson)


const nestedObject = {
    a: {
        b: {
            c: {
                d: 'Hello',
                foo: 'bar'
            },
            bar: 'baz'
        }
    }
} as const
type NestedObject = typeof nestedObject
const pathABCD = ['a', 'b', 'c', 'd'] as const
type PathABCD = typeof pathABCD
const extractedValue = get(nestedObject, pathABCD)
const _tsAssertionHello: AreEqual<typeof extractedValue, 'Hello'> = true
console.assert(_tsAssertionHello && (extractedValue === 'Hello'))

const goodbye = 'Goodbye' as const
type Goodbye = typeof goodbye
type X2 = _Set<NestedObject, PathABCD, Goodbye>
