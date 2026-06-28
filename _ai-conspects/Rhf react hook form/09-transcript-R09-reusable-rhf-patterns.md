# Regional transcript — R09: Reusable React Hook Form patterns

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Reusable form code separates native registration, controlled adapters, repeated sections, asynchronous edit flows and server-error mapping.

## Native input wrapper

- Accept a typed field name, label and registration rules.
- Obtain register/errors from props or form context.
- Render an accessible input and its field error together.
- Keep visual styling independent from the schema library.

## Controlled component adapter

- Use `useController` inside a reusable select/date-picker component.
- Translate the widget value to the form's domain value at the boundary.
- Expose field-state errors without leaking Controller boilerplate to every screen.
- Forward refs when focus management is supported.

## Reusable field-array section

- Receive `control` and the typed array name.
- Render rows keyed by `field.id`.
- Encapsulate append/remove/move controls and row-level validation.
- Preserve server IDs as domain fields rather than using them as React Hook Form's internal key.

## Asynchronous edit form

- Load data, map the DTO into form values and reset once the record arrives.
- Submit a normalized command rather than sending the internal UI shape blindly.
- After success, reset to the saved representation so dirty state reflects the persisted result.
- Protect unsaved user edits when background data refreshes.

## Server errors

- Map field-level API validation errors through `setError`.
- Use a root/form error for failures not tied to one field.
- Clear or replace stale server errors after the user edits or resubmits.
- The API response contract should use stable field paths.

## Testing checklist

- Test default and asynchronously loaded values.
- Test dynamic mount/unmount behavior and submitted omissions.
- Test all-criteria error rendering.
- Test field-array add, remove, reorder and persistence IDs.
- Test controlled adapters and server-error mapping.

## Caveats

- Reusable abstractions should preserve the library's value and ref contracts.
- Do not hide every form operation behind one oversized generic component.

## Covered source units

### Text elements

```text
T-007
```

### Screenshot uses

```text
IU-117, IU-118, IU-119, IU-120, IU-121, IU-122
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
