# Knowledge Registry

Source workspace: `_ai-conspects/equality/`

Authoritative processed sources:
- `10-full-source-preserving-transcript-v003.md` - 18 screenshot source blocks, complete
- `11-technical-corrections-v002.md`
- `12-repetition-question-bank-v002.md`
- `13-final-near-literal-coverage-audit-v002.md`
- `15-transcript-quality-hotfix-v003.md`

Original SVG: `source/equality.svg` (Git blob SHA: 02906f4e05e6e444ad07a4de26cd17d1255aac5c)

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| ToString() is outside the equality contract (S-001, Correction 1); override for logging/debugging/API output; records synthesize ToString, class-based value objects do not have to | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Address value object implementation (S-002, Correction 6): Address inheriting ValueObject with City, Street, Zip, Country and GetEqualityComponents() yielding properties (ordering matters) | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| GetHashCode equality contract (S-003, Corrections 2 & 8): equal objects must return the same hash code (required for Dictionary/HashSet); collisions allowed, reverse not required | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MERGED |
| Three related members of equality (S-004): Equals(object?), IEquatable<T>.Equals(T?), and GetHashCode() belong to the same contract | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Standalone Money value object pattern (S-005): sealed Money : IEquatable<Money>, Amount, Currency, ReferenceEquals null check, ReferenceEquals this check | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Value equality vs reference equality concept (S-006): new Person("A","B") reference check vs value check; 3 core equality methods | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Standard classic value equality pattern (S-007): sealed Person : IEquatable<Person> with FirstName, LastName, Equals(Person?), Equals(object?), GetHashCode() | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| ValueObject reason #1: expressive intent (S-008, Correction 6): yield return answers "What are the equality components, in order?" declaratively step by step | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Complete operator and ToString implementation (S-009): Equals(object?) forwarding, GetHashCode with Combine, operator ==, operator !=, ToString formatting | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Intent vs data structure allocation (S-010): yield return declares equality components clearly without hiding sequence in a container (new object[]) | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Equals(object?) purpose (S-011): base virtual method from object, enables equality when instance type is only known as object | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Equals(object?) forwarding implementation (S-012): object x, object y, x.Equals(y) forwarding via obj is Person other && Equals(other) | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| ValueObject reason #2: no coupling to concrete collection (S-013): yield return is a read-only throwaway sequence with no mutation temptation vs List<object> | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| IEquatable<T>.Equals(T?) strongly typed equality (S-014, Correction 3): avoids boxing for value types / casts through object, preferred by generic collections | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| ValueObject reason #3: no risk of reusing stale data (S-015): caching components in _components ??= breaks if properties change; yield return evaluates dynamically | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| ValueObject reason #4: natural base-class integration (S-016): base class uses GetEqualityComponents().SequenceEqual(other.GetEqualityComponents()) | `dotnet.value-object-equality-and-component-streams` | dotnet | `../_knowledge/dotnet/value-object-equality-and-component-streams.md` | MAPPED |
| Why not only override Equals(object?) (S-017): IEquatable<T> is better for generic/typed collections and comparers; implement all 3 together | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Member consistency requirement (S-018): overriding Equals requires overriding GetHashCode; all 3 members kept consistent | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Five-member equality consistency (Correction 4): Equals(object?), Equals(T?), GetHashCode(), operator ==, and operator != must all agree | `dotnet.hashcode-api-and-implementation` | dotnet | `../_knowledge/dotnet/hashcode-api-and-implementation.md` | MERGED |
| Mutable key protection (Correction 5): do not include mutable fields in equality/hash code if the object can be used as a dictionary key | `dotnet.hashcode-equality-contract` | dotnet | `../_knowledge/dotnet/hashcode-equality-contract.md` | MERGED |
| Record vs class value equality (Correction 7): records synthesize value equality automatically, but class-based value objects must implement it explicitly | `dotnet.record-value-semantics-and-representation` | dotnet | `../_knowledge/dotnet/record-value-semantics-and-representation.md` | MERGED |
| Processing/evidence metadata: source verification, near-literal OCR normalized transcript, repetition question bank, final coverage audit | - | - | - | NON_LEARNING |

## Boundary decisions

- ValueObject pattern with component streams (`GetEqualityComponents()`), the 4 architectural reasons for `yield return`, `Address` and `Money` examples, operator `==`/`!=` overloads, and `ToString()` boundary -> `dotnet.value-object-equality-and-component-streams` (new unit).
- General equality foundations, `IEquatable<T>` vs `Equals(object?)`, forwarding patterns, operator `==`/`!=` consistency, and the mandatory `GetHashCode()` contract -> merged into existing `dotnet.hashcode-api-and-implementation` and `dotnet.hashcode-equality-contract`.
- Record auto-generated value equality vs class-based value equality (Correction 7) -> merged into existing `dotnet.record-value-semantics-and-representation`.

| Status | Count |
|---|---:|
| MAPPED | 9 |
| MERGED | 12 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
