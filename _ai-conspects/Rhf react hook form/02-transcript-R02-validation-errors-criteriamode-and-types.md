# Regional transcript — R02: Validation errors, ErrorMessage, criteriaMode and error types

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 23 / 23
unique screenshots represented: 23
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

React Hook Form stores validation results in `formState.errors`. The display strategy depends on whether the UI needs only the first failure or every failed rule.

## Validation rules

- Built-in registration rules cover required values, min/max, length and patterns.
- A custom `validate` function can return `true`, `false` or an explanatory message.
- Several named validation functions can be supplied when the UI needs separate rule identities.
- Schema resolvers can centralize cross-field and domain-shaped validation.

## errors object

- Read a field error through its nested path, for example `errors.user?.email`.
- A field error commonly exposes `type`, `message` and, when all criteria are collected, `types`.
- Render errors close to the field and connect them with `aria-describedby`.
- Use `setError` for server or cross-field failures and `clearErrors` when that external condition is resolved.

## criteriaMode

- `criteriaMode: 'firstError'` keeps the first failing rule for each field.
- `criteriaMode: 'all'` collects all failed rules and exposes their messages through `error.types`.
- Collecting every rule is useful for password requirement lists and detailed checklists.
- For simple forms, first-error mode produces a quieter interface and less work.

## ErrorMessage helper

- An error-message component can read a named field from the errors object and render its primary message.
- With all-criteria mode, use its render callback or read `messages/types` to display every failure.
- The helper reduces repetitive optional chaining but does not replace a consistent accessible error component.
- Do not show duplicate summaries and inline messages unless the design intentionally supports both.

## Multiple error types

- Named validators create stable keys such as `uppercase`, `number` and `minLength`.
- Render the values from `error.types` rather than assuming one fixed property order.
- Keep the validation rule and the user-facing message close together.
- Server validation should be mapped to the same field paths where possible.

## Caveats

- Validation mode affects when errors appear; `onChange` validation can be costly in very large forms.
- Client validation improves feedback but the server remains authoritative.

## Covered source units

### Text elements

```text
T-003, T-013, T-014, T-024, T-025, T-026
```

### Screenshot uses

```text
IU-055, IU-062, IU-063, IU-064, IU-065, IU-066, IU-067, IU-068, IU-069, IU-070, IU-071, IU-072, IU-073
IU-074, IU-075, IU-076, IU-077, IU-078, IU-079, IU-080, IU-081, IU-143, IU-144
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
