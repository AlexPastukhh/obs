# Knowledge Registry

Source workspace: `_ai-conspects/zod/`

Authoritative processed source: `01-final-transcript.md` (identical regional copies: `regions/final-transcript.md` and `regions/R01R02R03R04R05-semantic-transcript-final-v001.md`)

Original SVG: `source/zod.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 84 of 84 image uses and 20 of 20 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 `parse` exception/output contract, discriminated `safeParse` result and first object-schema flow | `typescript` | `typescript.zod-schema-validation-and-inference` | `../_knowledge/typescript/zod-schema-validation-and-inference.md` | MAPPED |
| R01 primitive/literal/enum schemas, string/number constraints and URL/floating-point boundaries | `typescript` | `typescript.zod-schema-validation-and-inference` | `../_knowledge/typescript/zod-schema-validation-and-inference.md` | MAPPED |
| R01 collection element/value validation, optional/nullable/nullish/default semantics and transformed output | `typescript` | `typescript.zod-schema-validation-and-inference` | `../_knowledge/typescript/zod-schema-validation-and-inference.md` | MAPPED |
| R05 object-schema derivation helpers and `z.infer`/`z.input`/`z.output` contracts | `typescript` | `typescript.zod-schema-validation-and-inference` | `../_knowledge/typescript/zod-schema-validation-and-inference.md` | MAPPED |
| R02 browser form-value shapes, built-in coercion and boolean-truthiness boundary | `typescript` | `typescript.zod-form-input-coercion-and-transforms` | `../_knowledge/typescript/zod-form-input-coercion-and-transforms.md` | MAPPED |
| R02 preprocessing, coerce/preprocess/transform ordering and conversion-layer decision | `typescript` | `typescript.zod-form-input-coercion-and-transforms` | `../_knowledge/typescript/zod-form-input-coercion-and-transforms.md` | MAPPED |
| R02/R05 React Hook Form conversion/resolver flow, empty numeric input and explicit checkbox normalization | `typescript` | `typescript.zod-form-input-coercion-and-transforms` | `../_knowledge/typescript/zod-form-input-coercion-and-transforms.md` | MAPPED |
| R03 single-rule `refine`, message/path/params and field-targeted issues | `typescript` | `typescript.zod-refinements-and-cross-field-errors` | `../_knowledge/typescript/zod-refinements-and-cross-field-errors.md` | MAPPED |
| R03 object-level `superRefine`, cross-field validation and multiple structured issues | `typescript` | `typescript.zod-refinements-and-cross-field-errors` | `../_knowledge/typescript/zod-refinements-and-cross-field-errors.md` | MAPPED |
| R04 regular union branch trials, combined failures and object-variant example | `typescript` | `typescript.zod-discriminated-union-validation` | `../_knowledge/typescript/zod-discriminated-union-validation.md` | MAPPED |
| R04 discriminator lookup, selected-branch validation, error behavior, scaling and TypeScript narrowing | `typescript` | `typescript.zod-discriminated-union-validation` | `../_knowledge/typescript/zod-discriminated-union-validation.md` | MAPPED |
| Source inventory, image/text assignment and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- General schema construction, derived object schemas and inference stay together because they define one runtime/type contract.
- Form coercion owns raw-input conversion order and React Hook Form handoff rather than being folded into generic schema syntax.
- Refinements and discriminated unions remain independent recall units: one concerns issue production, the other branch selection.
- Version-sensitive helpers are represented as APIs captured by the authoritative source; no unsupported newer-version correction is introduced.

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
