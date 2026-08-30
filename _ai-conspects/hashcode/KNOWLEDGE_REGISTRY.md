# Knowledge Registry

Source workspace: `_ai-conspects/hashcode/`

Authoritative processed sources:
- `02-source-preserving-transcript-v002.md` - 24 screenshot source blocks, complete
- `03-repetition-guide-v002.md`
- `04-native-svg-labels-v002.md`
- `05-transcript-quality-correction-audit-v002.md`
- `regions-v002/`

Original SVG: `source/hashcode.svg` (Git blob SHA: 0eaf471525a9cf3056a6815b07a7c1c266ed210c)

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Hash codes are not security primitives (S-001); GetHashCode not for passwords/signatures/digests; use SHA-256/HMAC/bcrypt/Argon2 | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Hash codes are not stable IDs (S-002); no cross-process/version guarantee; no uniqueness; durable identity needs explicit ID | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Mutable dictionary key danger (S-003): mutation does not reindex; hash changes but entry stays in old bucket; lookup searches wrong bucket | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| IEquatable<T> implementation pattern (S-004): Equals(object?), IEquatable<T>.Equals(T?), GetHashCode() using same identity fields | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| HashCode.Add with explicit comparer (S-005): OrdinalIgnoreCase for email; equality and hashing must use same comparer | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Conditional HashCode accumulation (S-006): Add only when value is not null; Equals must mirror same conditions | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Incremental HashCode.Add vs Combine (S-007): Add for variable/conditional/loop input; ToHashCode() returns final int | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Collection hashing with accumulator (S-008): Order with Tags list; foreach Add; order-sensitive; Combine awkward for variable-length | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| HashCode struct for many fields (S-009): when to prefer accumulator over Combine (many fields, conditional, loop) | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| HashCode.Combine for small fixed sets (S-010): overloads for 2/3/4 args; ideal for known fixed few values | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Nulls with HashCode.Combine (S-011): Combine handles null; manual ?.GetHashCode() ?? 0 usually unnecessary | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Mandatory equality contract (S-012): equal objects must have equal hash codes; unequal may share hash; one-direction only | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Field consistency rule and bad mismatch example (S-013): Equals uses 2 fields, GetHashCode uses 3 - lookup breaks | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Manual unchecked hash formula vs modern (S-014): old hash*23+field.GetHashCode() pattern; needs unchecked; more error-prone than Combine | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Typical HashCode.Combine implementation (S-015): sealed Person with init properties and Combine(FirstName, LastName, BirthDate) | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Why hash codes exist (S-016): Dictionary and HashSet use hash to select bucket, equality to confirm; hash not proof of identity | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Original order-independent loop snippet (S-017): sort then Combine accumulated int in loop; pattern works but is criticized | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Intent of sorted collection hash (S-018): ["a","b"] and ["b","a"] should hash equal; equality must treat as set/multiset consistently | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Manual null handling often unnecessary (S-019): Add/Combine handle null; s?.GetHashCode() ?? 0 is redundant | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Repeated Combine in loop not ideal (S-020): accumulator cleaner; avoids treating prior int as another identity field | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| Improved set-like collection hash (S-021): GetSetLikeHash with OrderBy+Add using same comparer; benefits listed; still duplicate-sensitive | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MAPPED |
| HashSet uses same hashing principle (S-022): item is its own key; same 3-step lookup; same mutable-field danger | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Dictionary bucket flow before mutation (S-023): concrete text diagram - hash 1234, bucket 2, lookup found | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Dictionary bucket flow after mutation (S-024): email mutated, hash 8888, bucket 1, entry still in bucket 2, not found | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MAPPED |
| Records generate equality and hash code automatically (S-001); shortcut for value-like objects | `dotnet.record-value-semantics-and-representation` | dotnet | `../_knowledge/dotnet/record-value-semantics-and-representation.md` | MERGED |
| Processing/evidence metadata: source verification block, corrected-coverage counters, recall-question sets, repetition guide, quality audit verdict | - | - | - | NON_LEARNING |

## Boundary decisions

- Security/stability/contract/bucket-mechanics -> `hashcode-equality-contract`: these are the conceptual "why and what" foundation claims.
- Implementation APIs, patterns, and examples -> `hashcode-api-and-implementation`: these are the practical "how to write it" claims.
- S-001 mention of records generating equality and hashing is merged into the existing unit `dotnet.record-value-semantics-and-representation` (which already covers record equality/hashing generation), with a brief shortcut mention retained in `hashcode-api-and-implementation`.
- Mutable key content goes into `hashcode-equality-contract` (not merged into `hashset-operations-and-ownership`) because the source provides the concrete bucket-flow diagrams (S-023/S-024) that are the core of the learning claim. `hashset-operations-and-ownership` references the rule briefly; the new unit teaches the exact mechanism.

| Status | Count |
|---|---:|
| MAPPED | 24 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
