# Knowledge Registry

Source workspace: `_ai-conspects/sheet dict/`

Authoritative processed source: `01-final-transcript.md`; `CURRENT_SOURCE_OF_TRUTH.md` reports 35/35 image uses and 11/11 native labels closed.

Original SVG: `source/sheet dict.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 dictionary content-equality algorithm, separate key/value comparers and `KeyValuePair` value semantics | `dotnet.dictionary-equality-and-key-set-operations` | `dotnet` | `../_knowledge/dotnet/dictionary-equality-and-key-set-operations.md` | MAPPED |
| R01 comparer-aware key union/intersection/difference and selected-key dictionary construction | `dotnet.dictionary-equality-and-key-set-operations` | `dotnet` | `../_knowledge/dotnet/dictionary-equality-and-key-set-operations.md` | MAPPED |
| R02 constructor capacity, resize/rehash/GC costs, capacity-versus-count, `EnsureCapacity`, `TrimExcess` and comparer-at-construction | `dotnet.dictionary-capacity-and-api-contracts` | `dotnet` | `../_knowledge/dotnet/dictionary-capacity-and-api-contracts.md` | MAPPED |
| R03 hash-table complexity/order boundary, lookup/add/update/remove return behavior, live views and interface-cast boundary | `dotnet.dictionary-capacity-and-api-contracts` | `dotnet` | `../_knowledge/dotnet/dictionary-capacity-and-api-contracts.md` | MAPPED |
| R04 weak-key/strong-associated-value lifetime, `GetValue`, metadata/cache use cases, limited API and JavaScript WeakMap comparison | `dotnet.conditionalweaktable-lifetime-associations` | `dotnet` | `../_knowledge/dotnet/conditionalweaktable-lifetime-associations.md` | MAPPED |

Boundary decision: equality/set algebra, ordinary dictionary storage/API contracts, and weak-key lifetime are three independent models. Capacity and the API sheet stay together because both define operational dictionary behavior.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
