# Regional transcript — R08: Conditional fields, subscriptions and performance

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

React Hook Form is optimized around uncontrolled inputs, but broad subscriptions and large controlled trees can still cause unnecessary renders.

## Conditional fields

- Watch only the discriminator that controls visibility.
- When a hidden branch must not submit, unregister it or use an appropriate `shouldUnregister` policy.
- When values should survive toggling, keep them registered or restore them deliberately.
- Clear dependent validation errors when a branch becomes irrelevant.

## Subscription isolation

- Use `useWatch` in the smallest component that renders a watched value.
- Use `useFormState` with selected names for local errors, dirty or touched state.
- Use non-rendering subscriptions for analytics or external persistence.
- Avoid `watch()` for the entire form in the root unless the entire root truly depends on every field.

## Validation cost

- `mode: 'onChange'` validates frequently and can be expensive for complex schemas.
- Use blur or submit-driven validation when immediate feedback is not required.
- Debounce remote checks and cancel stale validation requests.
- Keep synchronous field validators pure and fast.

## Rendering controlled components

- Place Controller/useController adapters close to the controlled widget.
- Memoize heavy row components when their props and subscriptions permit it.
- Do not recreate large option arrays or adapter callbacks unnecessarily.
- For field arrays, stable `field.id` keys are essential.

## Form-state access

- Read only the form-state properties needed by the component.
- Broad root-level error rendering can rerender the form for every validation change.
- Development tools and verbose logging can exaggerate render cost during profiling.
- Measure with realistic form size before introducing custom caching.

## Caveats

- Premature memoization can make form code harder to understand.
- Correct field lifecycle and validation behavior take priority over micro-optimizations.

## Covered source units

### Text elements

```text
(none; this visual region is screenshot-only)
```

### Screenshot uses

```text
IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
