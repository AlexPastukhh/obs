# Regional transcript — R01: Enum and switch exhaustiveness checks

Conspect: `exaustiveness check with sicr union for enums,classes with inher`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

C# switch expressions can expose missing enum cases when no catch-all arm hides the omission.

## Switch expressions

- List each known enum member as an explicit switch arm.
- Omitting a discard/default arm allows compiler diagnostics and analyzers to report non-exhaustive handling.
- An unhandled runtime value causes a `SwitchExpressionException`.
- Adding a new enum member then makes the unhandled case visible during build or analysis.

## Catch-all tradeoff

- A discard arm that throws makes failure explicit but also makes the switch syntactically exhaustive.
- Because the discard already accepts every future value, the compiler cannot prove that a newly added named member was forgotten.
- Use a catch-all only when the runtime contract genuinely requires one, and reinforce it with tests or analyzers.

## Enum caveat

- Enums can contain numeric values not declared by a named member.
- Validation may still be required at external boundaries before entering the switch.

## Caveats

- Compiler warning behavior depends on language version, analyzer configuration and project settings.
- An enum is not a closed algebraic data type at runtime.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-006
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
