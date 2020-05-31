import { PartialRecursive, PartialRecursiveObject} from './utils/PartialRecursive'
import { get } from './typedash/get'
import { AreEqual } from './utils/AreEqual'
import { _Set } from './utils/_Set'
import { PipeBuilder } from './utils/Pipe'

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
console.assert(`[null,[{"left":true,"right":{"left":false}},{"left":true,"right":{"left":false}}]]` === JSON.stringify(undefinedAndReadOnlyFriendlyJson))


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

type APipeBuilder = PipeBuilder<[number, string, boolean, number, string, boolean]>
const pipeBuilder: APipeBuilder = (
    a,
    b,
    c,
    d,
    e
) => (arg: number) => e(d(c(b(a(arg)))))
const aPipe = pipeBuilder(
    (n: number) => `${n}`,
    (s: string) => s.charAt(0) === '1',
    (b: boolean) => (b ? 10 : 0),
    (n: number) => `${n * 2}`,
    (s: string) => (s == '20')
)
const boolVal: boolean = aPipe(10)
console.assert(boolVal === true)
console.log('done')