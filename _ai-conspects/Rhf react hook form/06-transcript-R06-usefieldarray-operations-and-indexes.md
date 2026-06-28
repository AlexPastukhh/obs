# Regional transcript — R06: useFieldArray operations, ordering and indexes

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 28 / 28
unique screenshots represented: 28
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useFieldArray` manages dynamic repeated sections while keeping stable item identities and form registration paths.

## Setup

- Call `useFieldArray({ control, name })` for one stable array path.
- The returned `fields` contain an internal stable identifier.
- Render each row with `key={field.id}`, never with the array index as the React key.
- Register values with paths such as `items.${index}.name`.

## Operations

- Common operations are `append`, `prepend`, `insert`, `remove`, `swap`, `move`, `update` and `replace`.
- Provide complete item objects when appending or inserting rather than partial placeholders.
- Several operations can request focus for the newly inserted field.
- Avoid stacking many structural operations in one synchronous handler unless the resulting order is carefully tested.

## Ordering and indexes

- The index in the field name describes the current submitted array order.
- The stable `field.id` preserves the React component identity while items move.
- After `move` or `swap`, render from the new `fields` order and keep registration paths based on the current index.
- Persist an explicit business identifier separately from the internal field-array identifier.

## update versus setValue

- `update(index, value)` can unmount and remount the targeted row.
- Use `setValue` for a narrow field change when remounting is undesirable.
- `replace` is appropriate when the whole array comes from a new external source.
- Resetting the entire form is useful when both array defaults and non-array defaults change together.

## Nested arrays and TypeScript

- Nested arrays use composed paths such as `sections.${sectionIndex}.items`.
- Typed code may need literal-path assertions so the field name remains a specific `FieldPath`.
- A field-array name should not change dynamically during the component lifetime.
- Extract nested row components to keep subscriptions and rendering local.

## Use cases

- Order lines, contacts, addresses, questions, steps and permission rows.
- Dynamic rows with independent validation and remove/reorder controls.
- Server edit forms where existing item IDs must be preserved alongside new client rows.

## Caveats

- Using the index as the React key causes values and local component state to jump between rows.
- Combining `shouldUnregister` with reorder/unmount behavior requires careful testing.

## Covered source units

### Text elements

```text
T-008, T-009, T-010, T-018
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-027, IU-028, IU-029, IU-030, IU-031, IU-093, IU-094
IU-095, IU-124, IU-125, IU-126, IU-127, IU-128, IU-129, IU-130, IU-131, IU-132, IU-133, IU-134, IU-135
IU-136, IU-137
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
