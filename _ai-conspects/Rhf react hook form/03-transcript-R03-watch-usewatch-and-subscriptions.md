# Regional transcript — R03: watch, useWatch and subscriptions

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Watching values is useful for conditional UI and side effects, but the chosen API determines which component rerenders.

## watch

- `watch(name)` reads a value and subscribes the component that owns `useForm` to relevant changes.
- Calling `watch()` without a name observes the entire form and can cause broad rerenders.
- Provide `defaultValues` or a watch fallback so the first render is not unexpectedly `undefined`.
- Use watch in render logic when the root form component genuinely needs the value.

## useWatch

- `useWatch` subscribes inside the component or custom hook where it is called.
- It isolates rerenders better than reading watched values in the form root.
- Pass `control` explicitly or obtain it from form context.
- Subscribe to the narrowest field path or computed projection needed by the component.

## Callback subscription

- A callback-style subscription is appropriate for side effects that should not rerender the form.
- Keep the returned unsubscribe function and dispose it during effect cleanup.
- Depending on the installed React Hook Form version, the subscription API may be exposed through `watch` callbacks or a dedicated `subscribe` method.
- Do not call React state setters unconditionally from a broad subscription; filter changes first.

## Choosing an API

- Conditional JSX in the root: a narrow `watch` can be sufficient.
- Deep child that renders one value: prefer `useWatch`.
- Analytics, persistence or external synchronization: prefer a non-rendering subscription.
- Snapshot without subscription: use `getValues`.

## Caveats

- Watching the whole form is convenient but can hide a performance problem.
- Subscription callbacks must not create update loops by writing the same observed value repeatedly.

## Covered source units

### Text elements

```text
T-004, T-012, T-022, T-023
```

### Screenshot uses

```text
IU-058, IU-059, IU-060, IU-061, IU-082, IU-083, IU-084, IU-085, IU-086, IU-087, IU-088, IU-090, IU-141
IU-142
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
