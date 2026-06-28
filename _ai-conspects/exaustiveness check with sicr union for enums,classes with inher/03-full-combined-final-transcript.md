# Full combined final transcript — exaustiveness check with sicr union for enums,classes with inher

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 0 / 0
unique screenshots: 6 / 6
screenshot uses: 6 / 6
repeated placements retained: 0
regions: 2 / 2
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Enum and switch exhaustiveness checks

C# switch expressions can expose missing enum cases when no catch-all arm hides the omission.

### Switch expressions

- List each known enum member as an explicit switch arm.
- Omitting a discard/default arm allows compiler diagnostics and analyzers to report non-exhaustive handling.
- An unhandled runtime value causes a `SwitchExpressionException`.
- Adding a new enum member then makes the unhandled case visible during build or analysis.

### Catch-all tradeoff

- A discard arm that throws makes failure explicit but also makes the switch syntactically exhaustive.
- Because the discard already accepts every future value, the compiler cannot prove that a newly added named member was forgotten.
- Use a catch-all only when the runtime contract genuinely requires one, and reinforce it with tests or analyzers.

### Enum caveat

- Enums can contain numeric values not declared by a named member.
- Validation may still be required at external boundaries before entering the switch.

### Caveats

- Compiler warning behavior depends on language version, analyzer configuration and project settings.
- An enum is not a closed algebraic data type at runtime.

## R02 — Sealed hierarchies and discriminated-union-style exhaustiveness

A closed record hierarchy plus pattern matching can model TypeScript-style discriminated unions more strongly than a plain enum.

### Closed shape hierarchy

- Use an abstract base record or class and a finite set of derived record types.
- Pattern-match on the runtime type in a switch expression.
- Each derived type can carry the data required for that case.
- Mark leaf types sealed and keep construction controlled so the intended set stays closed.

### Exhaustiveness

- List every known derived type without a discard arm when compiler/analyzer support can enforce the closure.
- Adding a new derived case should create diagnostics at every exhaustive switch.
- A runtime unhandled value still fails rather than silently choosing an unrelated default.

### Alternatives

- A library union type such as `OneOf` can provide an explicit finite case set.
- Visitor patterns provide compile-time dispatch but add more boilerplate.
- For simple value-free cases, an enum remains smaller and easier.

### Caveats

- C# does not provide a native TypeScript-style discriminated-union declaration.
- A publicly extensible base class prevents true global exhaustiveness.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 1 | 1 | 0 | 0 |
| R02 | 0 | 5 | 5 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
