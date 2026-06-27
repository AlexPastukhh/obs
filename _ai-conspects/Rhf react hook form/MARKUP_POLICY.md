# Markup policy — Rhf react hook form

Generated: 2026-06-27 15:00:00 UTC

## Decision

The full canvas remains one logical region: `R01`.

No automatic x/y slicing is used. Contact sheets are pagination aids only and
do not represent semantic regions.

## Why

The canvas contains cross-linked React Hook Form topics:

- `register`, `unregister`, `disabled` and `shouldUnregister`;
- validation, `criteriaMode`, error messages and error types;
- `watch`, `useWatch` and callback subscriptions;
- asynchronous default values and `reset`;
- `Controller` and `useController`;
- `useFieldArray`, ordering and index-based registration;
- `FormProvider`, `useFormContext` and deeply nested inputs;
- reusable field-array and form patterns.

Splitting these only by coordinates would misrepresent the source structure.
