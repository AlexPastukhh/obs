# Regional transcript — R01: Registration lifecycle: register, unregister, disabled and shouldUnregister

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 19 / 19
unique screenshots represented: 19
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`register` connects an input to React Hook Form through its name, ref and change/blur handlers. Dynamic forms must also define what happens when a field is disabled or unmounted.

## register

- `register(name, options)` returns the props needed by a native or uncontrolled input.
- Use stable dot-path names such as `user.email` or `items.0.title` so the submitted value has the intended shape.
- Validation rules can be attached during registration, including `required`, length, pattern and custom `validate` functions.
- Avoid manually overwriting the returned `name`, `ref`, `onChange` or `onBlur` unless an adapter deliberately merges them.

## unregister

- `unregister(name)` removes a field from the form registry.
- Depending on the options, its value, error, dirty state, touched state and validation state can be retained or removed.
- Unmounting a component does not always imply unregistering it; the form configuration decides the default behavior.
- For conditional inputs, explicitly unregister when a hidden value must not be submitted.

## shouldUnregister

- With the usual retained-value behavior, an unmounted field can remain in form values.
- With `shouldUnregister: true`, unmounting behaves more like a native form: the value is removed from submission state.
- Choose the policy once from the product contract—wizard forms often retain values, while mutually exclusive branches often remove them.
- Per-field/controller settings should not contradict the form-wide lifecycle without a specific reason.

## disabled fields

- A disabled registered field is generally omitted or represented as `undefined` rather than submitted as a normal value.
- Use `readOnly` when the value must remain part of the submitted data but the user must not edit it.
- Disabling a `fieldset` is useful for temporarily disabling a group during submission.
- Do not rely on a disabled input as the only source of a required server value; the server must still enforce its own contract.

## What gets included

- Registered and enabled fields contribute their current value.
- Unmounted fields are included or removed according to `shouldUnregister` and explicit unregister calls.
- Disabled fields are not a reliable way to submit fixed data.
- Before final submission, normalize conditional branches so stale values cannot survive from a previously visible section.

## Caveats

- Client-side omission does not provide authorization or integrity.
- Dynamic field lifecycles should be covered by tests because mount/unmount timing can change submitted data.

## Covered source units

### Text elements

```text
T-002, T-015, T-019, T-020, T-021
```

### Screenshot uses

```text
IU-036, IU-037, IU-038, IU-039, IU-040, IU-041, IU-042, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053
IU-054, IU-056, IU-057, IU-138, IU-139, IU-140
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
