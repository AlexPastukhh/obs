# Regional transcript — R05: Controller and useController

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Native inputs work well with `register`. Controlled third-party widgets usually need `Controller` or `useController` to adapt their value and event contracts.

## Controller

- `Controller` accepts `name`, `control`, rules and a render function.
- The render function receives `field`, `fieldState` and form-level state.
- Pass `field.value`, `field.onChange`, `field.onBlur`, `field.name` and `field.ref` to the controlled component in the shape it expects.
- Transform a widget-specific event into the actual form value when necessary.

## useController

- `useController` exposes the same field and field-state primitives inside a reusable input component.
- It is useful when the adapter needs custom layout, labels, accessibility and error rendering.
- The hook lets the component control its own markup without an extra render-prop wrapper.
- Keep the adapter generic through typed `name`, `control` and rule props.

## Avoid double registration

- Do not spread both `register(name)` and `field` from Controller onto the same input.
- Controller already registers and manages the field.
- Double registration can duplicate handlers, refs and validation behavior.
- Choose uncontrolled registration or a controlled adapter for each field.

## Lifecycle

- Controlled values must not use `undefined` as their normal empty value; use an appropriate empty string, null or other documented value.
- The disabled field behavior still affects submission.
- Use `shouldUnregister` cautiously with reordered field arrays because unmount/remount can remove values.
- Forward a focusable ref when error focusing is required.

## Caveats

- Third-party components differ in their event signatures; inspect the actual value contract.
- Controller solves integration, not performance automatically—keep controlled widgets scoped.

## Covered source units

### Text elements

```text
T-005, T-006
```

### Screenshot uses

```text
IU-096, IU-097, IU-098, IU-099, IU-100, IU-101, IU-102, IU-103, IU-145
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
