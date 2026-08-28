# Knowledge Registry

Source workspace: `_ai-conspects/utility types/`

Authoritative processed source: `01-final-transcript.md`

Authoritative technical correction: `02-technical-corrections-v001.md`, TC-001

Original SVG: `source/utility types.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 shallow `Partial`, `Required`, and `Readonly` property transformations | `typescript.built-in-object-and-union-utility-types` | `typescript` | `../_knowledge/typescript/built-in-object-and-union-utility-types.md` | MAPPED |
| R01 `Pick`/`Omit` object-key selection versus `Exclude`/`Extract`/`NonNullable` union-member filtering | `typescript.built-in-object-and-union-utility-types` | `typescript` | `../_knowledge/typescript/built-in-object-and-union-utility-types.md` | MAPPED |
| R01 finite `Record<K, V>` key/value mapping | `typescript.index-signatures-assertions-and-records` | `typescript` | `../_knowledge/typescript/index-signatures-assertions-and-records.md` | MERGED |
| R02 constructor side versus instance side, `InstanceType`, `ConstructorParameters`, and generic factory | `typescript.constructor-and-instance-types` | `typescript` | `../_knowledge/typescript/constructor-and-instance-types.md` | MERGED |
| R03 `Parameters` and `ReturnType` function-signature extraction | `typescript.function-signature-and-async-utility-types` | `typescript` | `../_knowledge/typescript/function-signature-and-async-utility-types.md` | MAPPED |
| R03 async `ReturnType`, recursive `Awaited`, and `MaybePromise` composition | `typescript.function-signature-and-async-utility-types` | `typescript` | `../_knowledge/typescript/function-signature-and-async-utility-types.md` | MAPPED |
| R04 `ValueOf<T> = T[keyof T]`, runtime enum-like objects, and use cases | `typescript.object-value-unions-and-literal-inference` | `typescript` | `../_knowledge/typescript/object-value-unions-and-literal-inference.md` | MAPPED |
| R05 `as const` literal preservation versus value widening | `typescript.object-value-unions-and-literal-inference` | `typescript` | `../_knowledge/typescript/object-value-unions-and-literal-inference.md` | MAPPED |
| R04 simple recursive partial and the need to handle primitives, built-ins, functions, collections, arrays, readonly arrays, and tuples deliberately | `typescript.deep-partial-recursive-contracts` | `typescript` | `../_knowledge/typescript/deep-partial-recursive-contracts.md` | MAPPED |
| R04 source-shaped safer `DeepPartial` plus explicit resolution of its `ReadonlyArray`-before-`Array` branch-order effect | `typescript.deep-partial-recursive-contracts` | `typescript` | `../_knowledge/typescript/deep-partial-recursive-contracts.md` | MAPPED |
| R05 `Prettify` display materialization without runtime behavior | `typescript.custom-mapped-utilities-prettify-and-xor` | `typescript` | `../_knowledge/typescript/custom-mapped-utilities-prettify-and-xor.md` | MAPPED |
| R05 `Without`/`XOR`, structural-union caveat, and exactly-one-branch example | `typescript.custom-mapped-utilities-prettify-and-xor` | `typescript` | `../_knowledge/typescript/custom-mapped-utilities-prettify-and-xor.md` | MAPPED |
| Coverage and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 10 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
