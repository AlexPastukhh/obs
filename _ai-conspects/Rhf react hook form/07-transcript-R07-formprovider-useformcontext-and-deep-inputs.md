# Regional transcript — R07: FormProvider, useFormContext and deeply nested inputs

Conspect: `Rhf react hook form`  
Generated: 2026-06-28 00:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Form context prevents prop drilling when many nested components need registration, control or form-state access.

## FormProvider

- Create the form once with `useForm` and pass its methods to `FormProvider`.
- Wrap the subtree containing inputs and submit controls.
- Do not create a second independent form instance inside a child that belongs to the same submission.
- Avoid unnecessary nested FormProviders for one logical form.

## useFormContext

- `useFormContext` reads the nearest provider's methods.
- A reusable native input can obtain `register` and `formState.errors` without receiving the entire methods object through every parent.
- Controlled adapters can obtain `control` and then use `useController`.
- Use the same typed form-value model so nested names remain valid field paths.

## Deep inputs

- Deeply nested components can register names such as `profile.address.city`.
- Keep layout components unaware of unrelated form state.
- A child that only needs one value should use `useWatch`; a child that only needs error/dirty state should use `useFormState`.
- This limits rerenders compared with reading the full context state everywhere.

## Effects and methods

- Use stable individual methods such as `reset` in effects rather than depending on a freshly assembled wrapper object.
- Do not call registration or reset conditionally in a way that changes hook ordering.
- Keep the provider close enough to define ownership but broad enough to include all fields and submit actions.

## Caveats

- Context removes prop drilling but can broaden subscriptions if every child reads the entire form state.
- One provider should represent one coherent form lifecycle.

## Covered source units

### Text elements

```text
T-016, T-017
```

### Screenshot uses

```text
IU-104, IU-105, IU-106, IU-107, IU-108, IU-109, IU-110, IU-111, IU-112, IU-113, IU-114, IU-115, IU-116
```

The raw labels and exact screenshots remain in the source SVG and closed ledgers.
