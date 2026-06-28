# Full combined final transcript — Rhf react hook form

Generated: 2026-06-28 00:30:00 UTC

## Source basis and coverage

```text
meaningful text elements: 26 / 26
unique embedded screenshots: 144 / 144
screenshot uses on canvas: 145 / 145
repeated screenshot placements retained: 1
visual-semantic regions: 9 / 9
remaining text elements: 0
remaining screenshot uses: 0
```

## Mental model

React Hook Form keeps most native input state in the DOM and stores a compact form
registry around those inputs. The central design decisions are field lifecycle,
subscription scope, validation timing and the boundary between uncontrolled native
inputs and controlled third-party components.

```text
register / useController   connect a field
formState                  subscribe to metadata
watch / useWatch           subscribe to values
getValues                  read without subscribing
reset                      replace values and the default baseline
useFieldArray              manage repeated structures
FormProvider               share one form instance through a subtree
```

## R01 — Registration lifecycle: register, unregister, disabled and shouldUnregister

`register` connects an input to React Hook Form through its name, ref and change/blur handlers. Dynamic forms must also define what happens when a field is disabled or unmounted.

### register

- `register(name, options)` returns the props needed by a native or uncontrolled input.
- Use stable dot-path names such as `user.email` or `items.0.title` so the submitted value has the intended shape.
- Validation rules can be attached during registration, including `required`, length, pattern and custom `validate` functions.
- Avoid manually overwriting the returned `name`, `ref`, `onChange` or `onBlur` unless an adapter deliberately merges them.

### unregister

- `unregister(name)` removes a field from the form registry.
- Depending on the options, its value, error, dirty state, touched state and validation state can be retained or removed.
- Unmounting a component does not always imply unregistering it; the form configuration decides the default behavior.
- For conditional inputs, explicitly unregister when a hidden value must not be submitted.

### shouldUnregister

- With the usual retained-value behavior, an unmounted field can remain in form values.
- With `shouldUnregister: true`, unmounting behaves more like a native form: the value is removed from submission state.
- Choose the policy once from the product contract—wizard forms often retain values, while mutually exclusive branches often remove them.
- Per-field/controller settings should not contradict the form-wide lifecycle without a specific reason.

### disabled fields

- A disabled registered field is generally omitted or represented as `undefined` rather than submitted as a normal value.
- Use `readOnly` when the value must remain part of the submitted data but the user must not edit it.
- Disabling a `fieldset` is useful for temporarily disabling a group during submission.
- Do not rely on a disabled input as the only source of a required server value; the server must still enforce its own contract.

### What gets included

- Registered and enabled fields contribute their current value.
- Unmounted fields are included or removed according to `shouldUnregister` and explicit unregister calls.
- Disabled fields are not a reliable way to submit fixed data.
- Before final submission, normalize conditional branches so stale values cannot survive from a previously visible section.

### Caveats

- Client-side omission does not provide authorization or integrity.
- Dynamic field lifecycles should be covered by tests because mount/unmount timing can change submitted data.

## R02 — Validation errors, ErrorMessage, criteriaMode and error types

React Hook Form stores validation results in `formState.errors`. The display strategy depends on whether the UI needs only the first failure or every failed rule.

### Validation rules

- Built-in registration rules cover required values, min/max, length and patterns.
- A custom `validate` function can return `true`, `false` or an explanatory message.
- Several named validation functions can be supplied when the UI needs separate rule identities.
- Schema resolvers can centralize cross-field and domain-shaped validation.

### errors object

- Read a field error through its nested path, for example `errors.user?.email`.
- A field error commonly exposes `type`, `message` and, when all criteria are collected, `types`.
- Render errors close to the field and connect them with `aria-describedby`.
- Use `setError` for server or cross-field failures and `clearErrors` when that external condition is resolved.

### criteriaMode

- `criteriaMode: 'firstError'` keeps the first failing rule for each field.
- `criteriaMode: 'all'` collects all failed rules and exposes their messages through `error.types`.
- Collecting every rule is useful for password requirement lists and detailed checklists.
- For simple forms, first-error mode produces a quieter interface and less work.

### ErrorMessage helper

- An error-message component can read a named field from the errors object and render its primary message.
- With all-criteria mode, use its render callback or read `messages/types` to display every failure.
- The helper reduces repetitive optional chaining but does not replace a consistent accessible error component.
- Do not show duplicate summaries and inline messages unless the design intentionally supports both.

### Multiple error types

- Named validators create stable keys such as `uppercase`, `number` and `minLength`.
- Render the values from `error.types` rather than assuming one fixed property order.
- Keep the validation rule and the user-facing message close together.
- Server validation should be mapped to the same field paths where possible.

### Caveats

- Validation mode affects when errors appear; `onChange` validation can be costly in very large forms.
- Client validation improves feedback but the server remains authoritative.

## R03 — watch, useWatch and subscriptions

Watching values is useful for conditional UI and side effects, but the chosen API determines which component rerenders.

### watch

- `watch(name)` reads a value and subscribes the component that owns `useForm` to relevant changes.
- Calling `watch()` without a name observes the entire form and can cause broad rerenders.
- Provide `defaultValues` or a watch fallback so the first render is not unexpectedly `undefined`.
- Use watch in render logic when the root form component genuinely needs the value.

### useWatch

- `useWatch` subscribes inside the component or custom hook where it is called.
- It isolates rerenders better than reading watched values in the form root.
- Pass `control` explicitly or obtain it from form context.
- Subscribe to the narrowest field path or computed projection needed by the component.

### Callback subscription

- A callback-style subscription is appropriate for side effects that should not rerender the form.
- Keep the returned unsubscribe function and dispose it during effect cleanup.
- Depending on the installed React Hook Form version, the subscription API may be exposed through `watch` callbacks or a dedicated `subscribe` method.
- Do not call React state setters unconditionally from a broad subscription; filter changes first.

### Choosing an API

- Conditional JSX in the root: a narrow `watch` can be sufficient.
- Deep child that renders one value: prefer `useWatch`.
- Analytics, persistence or external synchronization: prefer a non-rendering subscription.
- Snapshot without subscription: use `getValues`.

### Caveats

- Watching the whole form is convenient but can hide a performance problem.
- Subscription callbacks must not create update loops by writing the same observed value repeatedly.

## R04 — Form state, reset and asynchronous defaults

`useForm` owns values and metadata such as dirty, touched, validating and submitting state. Edit forms must also coordinate asynchronous data with cached defaults.

### defaultValues

- Prefer defined defaults for every controlled value; avoid using `undefined` as a controlled-input default.
- `defaultValues` establish the baseline used by dirty-state comparisons.
- Defaults are cached by the form instance rather than re-read from props on every render.
- Nested objects and arrays should match the final field-name structure.

### Asynchronous data

- For edit screens, load the record and call `reset(loadedValues)` when it arrives.
- Some React Hook Form versions support asynchronous `defaultValues`; the form can expose loading state while they resolve.
- A reactive `values` option can synchronize external data, but it should be used deliberately because it can overwrite local edits.
- Cancel or ignore stale requests when the selected record changes.

### reset

- `reset()` restores the current default baseline.
- `reset(newValues)` replaces values and normally establishes a new baseline.
- Options such as keeping errors, dirty values or touched state allow targeted workflows.
- Call reset after the form subscriptions are initialized, commonly from an effect responding to loaded data or successful submission.

### formState

- Useful flags include `isDirty`, `dirtyFields`, `touchedFields`, `isValid`, `isSubmitting`, `isSubmitted` and `submitCount`.
- Form state is subscription-based; read the specific properties the component needs.
- `isDirty` compares current values with the default baseline, so incomplete defaults produce confusing results.
- Use `useFormState` in child components to isolate subscriptions.

### Imperative helpers

- `setValue` updates a field and can request validation, dirty and touched calculations.
- `getValues` reads a snapshot without subscribing.
- `trigger` runs validation for selected fields or the whole form.
- `resetField` resets one field without resetting the entire form.

### Caveats

- Repeatedly resetting from changing props can erase user edits.
- Keep server data, form defaults and current values as three distinct concepts.

## R05 — Controller and useController

Native inputs work well with `register`. Controlled third-party widgets usually need `Controller` or `useController` to adapt their value and event contracts.

### Controller

- `Controller` accepts `name`, `control`, rules and a render function.
- The render function receives `field`, `fieldState` and form-level state.
- Pass `field.value`, `field.onChange`, `field.onBlur`, `field.name` and `field.ref` to the controlled component in the shape it expects.
- Transform a widget-specific event into the actual form value when necessary.

### useController

- `useController` exposes the same field and field-state primitives inside a reusable input component.
- It is useful when the adapter needs custom layout, labels, accessibility and error rendering.
- The hook lets the component control its own markup without an extra render-prop wrapper.
- Keep the adapter generic through typed `name`, `control` and rule props.

### Avoid double registration

- Do not spread both `register(name)` and `field` from Controller onto the same input.
- Controller already registers and manages the field.
- Double registration can duplicate handlers, refs and validation behavior.
- Choose uncontrolled registration or a controlled adapter for each field.

### Lifecycle

- Controlled values must not use `undefined` as their normal empty value; use an appropriate empty string, null or other documented value.
- The disabled field behavior still affects submission.
- Use `shouldUnregister` cautiously with reordered field arrays because unmount/remount can remove values.
- Forward a focusable ref when error focusing is required.

### Caveats

- Third-party components differ in their event signatures; inspect the actual value contract.
- Controller solves integration, not performance automatically—keep controlled widgets scoped.

## R06 — useFieldArray operations, ordering and indexes

`useFieldArray` manages dynamic repeated sections while keeping stable item identities and form registration paths.

### Setup

- Call `useFieldArray({ control, name })` for one stable array path.
- The returned `fields` contain an internal stable identifier.
- Render each row with `key={field.id}`, never with the array index as the React key.
- Register values with paths such as `items.${index}.name`.

### Operations

- Common operations are `append`, `prepend`, `insert`, `remove`, `swap`, `move`, `update` and `replace`.
- Provide complete item objects when appending or inserting rather than partial placeholders.
- Several operations can request focus for the newly inserted field.
- Avoid stacking many structural operations in one synchronous handler unless the resulting order is carefully tested.

### Ordering and indexes

- The index in the field name describes the current submitted array order.
- The stable `field.id` preserves the React component identity while items move.
- After `move` or `swap`, render from the new `fields` order and keep registration paths based on the current index.
- Persist an explicit business identifier separately from the internal field-array identifier.

### update versus setValue

- `update(index, value)` can unmount and remount the targeted row.
- Use `setValue` for a narrow field change when remounting is undesirable.
- `replace` is appropriate when the whole array comes from a new external source.
- Resetting the entire form is useful when both array defaults and non-array defaults change together.

### Nested arrays and TypeScript

- Nested arrays use composed paths such as `sections.${sectionIndex}.items`.
- Typed code may need literal-path assertions so the field name remains a specific `FieldPath`.
- A field-array name should not change dynamically during the component lifetime.
- Extract nested row components to keep subscriptions and rendering local.

### Use cases

- Order lines, contacts, addresses, questions, steps and permission rows.
- Dynamic rows with independent validation and remove/reorder controls.
- Server edit forms where existing item IDs must be preserved alongside new client rows.

### Caveats

- Using the index as the React key causes values and local component state to jump between rows.
- Combining `shouldUnregister` with reorder/unmount behavior requires careful testing.

## R07 — FormProvider, useFormContext and deeply nested inputs

Form context prevents prop drilling when many nested components need registration, control or form-state access.

### FormProvider

- Create the form once with `useForm` and pass its methods to `FormProvider`.
- Wrap the subtree containing inputs and submit controls.
- Do not create a second independent form instance inside a child that belongs to the same submission.
- Avoid unnecessary nested FormProviders for one logical form.

### useFormContext

- `useFormContext` reads the nearest provider's methods.
- A reusable native input can obtain `register` and `formState.errors` without receiving the entire methods object through every parent.
- Controlled adapters can obtain `control` and then use `useController`.
- Use the same typed form-value model so nested names remain valid field paths.

### Deep inputs

- Deeply nested components can register names such as `profile.address.city`.
- Keep layout components unaware of unrelated form state.
- A child that only needs one value should use `useWatch`; a child that only needs error/dirty state should use `useFormState`.
- This limits rerenders compared with reading the full context state everywhere.

### Effects and methods

- Use stable individual methods such as `reset` in effects rather than depending on a freshly assembled wrapper object.
- Do not call registration or reset conditionally in a way that changes hook ordering.
- Keep the provider close enough to define ownership but broad enough to include all fields and submit actions.

### Caveats

- Context removes prop drilling but can broaden subscriptions if every child reads the entire form state.
- One provider should represent one coherent form lifecycle.

## R08 — Conditional fields, subscriptions and performance

React Hook Form is optimized around uncontrolled inputs, but broad subscriptions and large controlled trees can still cause unnecessary renders.

### Conditional fields

- Watch only the discriminator that controls visibility.
- When a hidden branch must not submit, unregister it or use an appropriate `shouldUnregister` policy.
- When values should survive toggling, keep them registered or restore them deliberately.
- Clear dependent validation errors when a branch becomes irrelevant.

### Subscription isolation

- Use `useWatch` in the smallest component that renders a watched value.
- Use `useFormState` with selected names for local errors, dirty or touched state.
- Use non-rendering subscriptions for analytics or external persistence.
- Avoid `watch()` for the entire form in the root unless the entire root truly depends on every field.

### Validation cost

- `mode: 'onChange'` validates frequently and can be expensive for complex schemas.
- Use blur or submit-driven validation when immediate feedback is not required.
- Debounce remote checks and cancel stale validation requests.
- Keep synchronous field validators pure and fast.

### Rendering controlled components

- Place Controller/useController adapters close to the controlled widget.
- Memoize heavy row components when their props and subscriptions permit it.
- Do not recreate large option arrays or adapter callbacks unnecessarily.
- For field arrays, stable `field.id` keys are essential.

### Form-state access

- Read only the form-state properties needed by the component.
- Broad root-level error rendering can rerender the form for every validation change.
- Development tools and verbose logging can exaggerate render cost during profiling.
- Measure with realistic form size before introducing custom caching.

### Caveats

- Premature memoization can make form code harder to understand.
- Correct field lifecycle and validation behavior take priority over micro-optimizations.

## R09 — Reusable React Hook Form patterns

Reusable form code separates native registration, controlled adapters, repeated sections, asynchronous edit flows and server-error mapping.

### Native input wrapper

- Accept a typed field name, label and registration rules.
- Obtain register/errors from props or form context.
- Render an accessible input and its field error together.
- Keep visual styling independent from the schema library.

### Controlled component adapter

- Use `useController` inside a reusable select/date-picker component.
- Translate the widget value to the form's domain value at the boundary.
- Expose field-state errors without leaking Controller boilerplate to every screen.
- Forward refs when focus management is supported.

### Reusable field-array section

- Receive `control` and the typed array name.
- Render rows keyed by `field.id`.
- Encapsulate append/remove/move controls and row-level validation.
- Preserve server IDs as domain fields rather than using them as React Hook Form's internal key.

### Asynchronous edit form

- Load data, map the DTO into form values and reset once the record arrives.
- Submit a normalized command rather than sending the internal UI shape blindly.
- After success, reset to the saved representation so dirty state reflects the persisted result.
- Protect unsaved user edits when background data refreshes.

### Server errors

- Map field-level API validation errors through `setError`.
- Use a root/form error for failures not tied to one field.
- Clear or replace stale server errors after the user edits or resubmits.
- The API response contract should use stable field paths.

### Testing checklist

- Test default and asynchronously loaded values.
- Test dynamic mount/unmount behavior and submitted omissions.
- Test all-criteria error rendering.
- Test field-array add, remove, reorder and persistence IDs.
- Test controlled adapters and server-error mapping.

### Caveats

- Reusable abstractions should preserve the library's value and ref contracts.
- Do not hide every form operation behind one oversized generic component.

## Practical architecture

```text
Form screen
├── useForm<TValues>()
├── FormProvider
│   ├── registered native inputs
│   ├── useController adapters
│   ├── useWatch conditional sections
│   └── useFieldArray repeated sections
├── handleSubmit
│   ├── normalize UI values
│   ├── send API command
│   └── map server errors with setError
└── reset(savedValues) after successful persistence
```

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 5 | 19 | 19 | 0 | 0 |
| R02 | 6 | 23 | 23 | 0 | 0 |
| R03 | 4 | 14 | 14 | 0 | 0 |
| R04 | 2 | 23 | 23 | 1 | 0 |
| R05 | 2 | 9 | 9 | 0 | 0 |
| R06 | 4 | 28 | 28 | 0 | 0 |
| R07 | 2 | 13 | 13 | 0 | 0 |
| R08 | 0 | 10 | 10 | 0 | 0 |
| R09 | 1 | 6 | 6 | 0 | 0 |

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and extracted screenshots remain authoritative for exact source code, package
version details and spelling in the original canvas.
