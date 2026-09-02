# Knowledge Registry

Source workspace: `_ai-conspects/REFLECTION/`

Authoritative processed source: `regions/R01R02R03R04-reflection-final-v001.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `data/final-coverage-audit.json`.

Original SVG: `source/REFLECTION.svg` (present in the local workspace and named by `CURRENT_SOURCE_OF_TRUTH.md`; excluded from Git and not resolvable from the current branch tree).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Runtime Type and Assembly discovery, member-category enumeration, MemberInfo hierarchy, BindingFlags composition, DeclaredOnly, and FlattenHierarchy (R01 Reflection model through BindingFlags) | `dotnet.reflection-type-members-and-binding-flags` | `dotnet` | `../_knowledge/dotnet/reflection-type-members-and-binding-flags.md` | MAPPED |
| FieldInfo and PropertyInfo metadata/value access, static/readonly/indexer mechanics, custom-attribute single/multiple/existence APIs, null/ambiguity behavior, and inheritance caveats (R01 Fields through Attribute inheritance) | `dotnet.reflection-fields-properties-and-attributes` | `dotnet` | `../_knowledge/dotnet/reflection-fields-properties-and-attributes.md` | MAPPED |
| Method overload lookup and invocation, wrapped failures, ConstructorInfo versus Activator, and ParameterInfo defaults/optionality/by-ref metadata (R02 Methods through ParameterInfo) | `dotnet.reflection-methods-constructors-and-parameters` | `dotnet` | `../_knowledge/dotnet/reflection-methods-constructors-and-parameters.md` | MAPPED |
| EventInfo handler access, interface assignability, nested-type discovery, and DeclaringType-versus-ReflectedType origin semantics (R02 Events through member origin) | `dotnet.reflection-events-interfaces-and-member-origin` | `dotnet` | `../_knowledge/dotnet/reflection-events-interfaces-and-member-origin.md` | MAPPED |
| Open/closed generic types and methods, construction/invocation constraints, exact/runtime/assignability checks, Nullable unwrapping, and reflection performance/caching guidance (R03 complete) | `dotnet.reflection-generics-type-checks-and-performance` | `dotnet` | `../_knowledge/dotnet/reflection-generics-type-checks-and-performance.md` | MAPPED |
| GetElementType for arrays/pointers/by-ref wrappers, pointer distinctions, ref/out/in metadata and modifiers, underlying-type inspection, and object-array invocation updates (R04 complete) | `dotnet.reflection-element-types-and-byref-parameters` | `dotnet` | `../_knowledge/dotnet/reflection-element-types-and-byref-parameters.md` | MAPPED |
| Source import/boundary review, image/text inventories, duplicate-use records, contact sheets, and final coverage audit | — | — | — | NON_LEARNING |

## Boundary decisions

- Reflection is partitioned by metadata model and invocation/type-shape boundaries rather than by screenshot placement.
- Fields/properties/attributes, executable members, member relationships, generics/type checks, and element/by-ref wrappers remain independently reviewable while retaining exact examples and caveats.
- Coverage/evidence mechanics are excluded; all 95 screenshot placements and 89 native labels are certified closed.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
