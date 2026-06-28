# Regional transcript — R04: Form state, reset and asynchronous defaults

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 23 / 23
unique screenshots represented: 23
repeated placements retained: 1
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useForm` owns values and metadata such as dirty, touched, validating and submitting state. Edit forms must also coordinate asynchronous data with cached defaults.

## defaultValues

- Prefer defined defaults for every controlled value; avoid using `undefined` as a controlled-input default.
- `defaultValues` establish the baseline used by dirty-state comparisons.
- Defaults are cached by the form instance rather than re-read from props on every render.
- Nested objects and arrays should match the final field-name structure.

## Asynchronous data

- For edit screens, load the record and call `reset(loadedValues)` when it arrives.
- Some React Hook Form versions support asynchronous `defaultValues`; the form can expose loading state while they resolve.
- A reactive `values` option can synchronize external data, but it should be used deliberately because it can overwrite local edits.
- Cancel or ignore stale requests when the selected record changes.

## reset

- `reset()` restores the current default baseline.
- `reset(newValues)` replaces values and normally establishes a new baseline.
- Options such as keeping errors, dirty values or touched state allow targeted workflows.
- Call reset after the form subscriptions are initialized, commonly from an effect responding to loaded data or successful submission.

## formState

- Useful flags include `isDirty`, `dirtyFields`, `touchedFields`, `isValid`, `isSubmitting`, `isSubmitted` and `submitCount`.
- Form state is subscription-based; read the specific properties the component needs.
- `isDirty` compares current values with the default baseline, so incomplete defaults produce confusing results.
- Use `useFormState` in child components to isolate subscriptions.

## Imperative helpers

- `setValue` updates a field and can request validation, dirty and touched calculations.
- `getValues` reads a snapshot without subscribing.
- `trigger` runs validation for selected fields or the whole form.
- `resetField` resets one field without resetting the entire form.

## Caveats

- Repeatedly resetting from changing props can erase user edits.
- Keep server data, form defaults and current values as three distinct concepts.

## Covered source units

### Text elements

```text
T-001, T-011
```

### Screenshot uses

```text
IU-017, IU-018, IU-019, IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-032, IU-033, IU-034
IU-035, IU-043, IU-044, IU-045, IU-046, IU-047, IU-089, IU-091, IU-092, IU-123
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
