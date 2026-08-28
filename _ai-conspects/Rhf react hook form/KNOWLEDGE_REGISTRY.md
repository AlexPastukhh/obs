# Knowledge Registry

Source workspace: `_ai-conspects/Rhf react hook form/`

Authoritative processed sources: `10-full-combined-final-transcript.md`; `11-full-conspect-final-coverage-audit.md`

Original SVG: not physically resolved in the current branch workspace; `_ai-conspects/Rhf react hook form/source/` currently contains extracted images only. The completed transcript and audit are the authoritative processed sources used for migration.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: `register(name, options)` supplies name/ref/change/blur integration, stable nested paths, registration validation rules, and the warning against overwriting returned field props without an adapter | `react-hook-form.field-registration-and-lifecycle` | `react-hook-form` | `../_knowledge/react-hook-form/field-registration-and-lifecycle.md` | MAPPED |
| R01: `unregister` removes registry ownership with optional retained state; unmounting and unregistering are distinct; `shouldUnregister` controls retained versus native-like removal semantics and should follow the product contract | `react-hook-form.field-registration-and-lifecycle` | `react-hook-form` | `../_knowledge/react-hook-form/field-registration-and-lifecycle.md` | MAPPED |
| R01: disabled fields are omitted/undefined rather than normal submitted values; `readOnly` preserves submitted data; fieldset disabling, stale conditional values, server authority, and lifecycle testing boundaries | `react-hook-form.field-registration-and-lifecycle` | `react-hook-form` | `../_knowledge/react-hook-form/field-registration-and-lifecycle.md` | MAPPED |
| R02: built-in/custom/named validation rules, schema-resolver boundary, nested `formState.errors`, error `type`/`message`/`types`, and accessible field-local rendering | `react-hook-form.validation-errors-and-criteria` | `react-hook-form` | `../_knowledge/react-hook-form/validation-errors-and-criteria.md` | MAPPED |
| R02: `criteriaMode` first-error versus all-errors behavior, ErrorMessage rendering, named validator identities, and `error.types` iteration | `react-hook-form.validation-errors-and-criteria` | `react-hook-form` | `../_knowledge/react-hook-form/validation-errors-and-criteria.md` | MAPPED |
| R02: `setError`/`clearErrors`, server and cross-field failures, validation-mode cost, and server-authoritative validation boundary | `react-hook-form.validation-errors-and-criteria` | `react-hook-form` | `../_knowledge/react-hook-form/validation-errors-and-criteria.md` | MAPPED |
| R03: `watch(name)` versus whole-form `watch()`, first-render defaults, `useWatch` local subscriptions, narrow paths/projections, and `getValues` snapshot-without-subscription selection rule | `react-hook-form.subscriptions-and-render-isolation` | `react-hook-form` | `../_knowledge/react-hook-form/subscriptions-and-render-isolation.md` | MAPPED |
| R03: callback-style non-rendering subscriptions for side effects, version-dependent `watch` callback/`subscribe` surface, cleanup ownership, and update-loop avoidance | `react-hook-form.subscriptions-and-render-isolation` | `react-hook-form` | `../_knowledge/react-hook-form/subscriptions-and-render-isolation.md` | MAPPED |
| R04: defined `defaultValues`, cached default baseline, nested shape, async load + `reset`, version-dependent async defaults, reactive `values`, stale-request handling, and separation of server/default/current state | `react-hook-form.defaults-reset-and-async-edit-flows` | `react-hook-form` | `../_knowledge/react-hook-form/defaults-reset-and-async-edit-flows.md` | MAPPED |
| R04: `reset()` versus `reset(newValues)`, keep-state options, reset timing, dirty-state baseline, and `setValue`/`getValues`/`trigger`/`resetField` imperative-helper responsibilities | `react-hook-form.defaults-reset-and-async-edit-flows` | `react-hook-form` | `../_knowledge/react-hook-form/defaults-reset-and-async-edit-flows.md` | MAPPED |
| R05: Controller render contract, field/fieldState primitives, widget event-to-value adaptation, and `useController` as the reusable controlled-input primitive | `react-hook-form.controlled-field-adapters` | `react-hook-form` | `../_knowledge/react-hook-form/controlled-field-adapters.md` | MAPPED |
| R05: double-registration prohibition, controlled empty-value boundary, disabled behavior, ref/focus ownership, `shouldUnregister` caution around reordered arrays, and controlled-widget performance scope | `react-hook-form.controlled-field-adapters` | `react-hook-form` | `../_knowledge/react-hook-form/controlled-field-adapters.md` | MAPPED |
| R06: stable `useFieldArray` path, internal `field.id`, index-based registration paths, complete inserted objects, focus support, and append/prepend/insert/remove/swap/move/update/replace operations | `react-hook-form.field-array-identity-and-operations` | `react-hook-form` | `../_knowledge/react-hook-form/field-array-identity-and-operations.md` | MAPPED |
| R06: current submitted index versus stable React identity versus explicit business ID; move/swap ordering; index-key failure mode | `react-hook-form.field-array-identity-and-operations` | `react-hook-form` | `../_knowledge/react-hook-form/field-array-identity-and-operations.md` | MAPPED |
| R06: `update` remount semantics versus narrow `setValue`, whole-array `replace`, whole-form reset, nested typed paths, stable array name, local row extraction, and reorder + `shouldUnregister` caveat | `react-hook-form.field-array-identity-and-operations` | `react-hook-form` | `../_knowledge/react-hook-form/field-array-identity-and-operations.md` | MAPPED |
| R07: one `useForm` instance with `FormProvider`, avoidance of unnecessary nested providers/independent child forms, `useFormContext` access, and shared typed nested paths | `react-hook-form.form-context-and-nested-fields` | `react-hook-form` | `../_knowledge/react-hook-form/form-context-and-nested-fields.md` | MAPPED |
| R07: deep-input subscription isolation with `useWatch`/`useFormState`, stable individual method dependencies in effects, hook-ordering boundary, and provider ownership scope | `react-hook-form.form-context-and-nested-fields` | `react-hook-form` | `../_knowledge/react-hook-form/form-context-and-nested-fields.md` | MAPPED |
| R08: conditional-field discriminator watching, hidden-branch unregister/retention policy, dependent-error clearing, and lifecycle-before-micro-optimization priority | `react-hook-form.field-registration-and-lifecycle` | `react-hook-form` | `../_knowledge/react-hook-form/field-registration-and-lifecycle.md` | MAPPED |
| R08: narrow `useWatch`/`useFormState`, non-rendering subscriptions, whole-form-watch/root-error rerender cost, on-change validation cost, remote validation debounce/cancellation, profiling realism, and premature-memoization caveat | `react-hook-form.subscriptions-and-render-isolation` | `react-hook-form` | `../_knowledge/react-hook-form/subscriptions-and-render-isolation.md` | MAPPED |
| R08: controlled adapters close to widgets, heavy-row memoization when subscriptions permit, option/callback recreation caution; stable field-array IDs are consolidated with their R06 destination | `react-hook-form.controlled-field-adapters` | `react-hook-form` | `../_knowledge/react-hook-form/controlled-field-adapters.md` | MAPPED |
| R09: typed native wrapper, controlled `useController` adapter, reusable field-array section, responsibility separation, and warning against one oversized generic abstraction | `react-hook-form.reusable-form-architecture` | `react-hook-form` | `../_knowledge/react-hook-form/reusable-form-architecture.md` | MAPPED |
| R09: asynchronous edit flow maps DTO -> form values -> normalized command -> saved representation, resets baseline after persistence, and protects unsaved edits during background refresh | `react-hook-form.defaults-reset-and-async-edit-flows` | `react-hook-form` | `../_knowledge/react-hook-form/defaults-reset-and-async-edit-flows.md` | MAPPED |
| R09: field-level API errors through `setError`, root/form errors for non-field failures, stale server-error replacement, and stable API field-path contract | `react-hook-form.validation-errors-and-criteria` | `react-hook-form` | `../_knowledge/react-hook-form/validation-errors-and-criteria.md` | MAPPED |
| R09: integrated FormProvider/register/useController/useWatch/useFieldArray/submit/reset architecture and testing checklist for defaults, dynamic lifecycle, all-criteria errors, arrays, adapters, and server-error mapping | `react-hook-form.reusable-form-architecture` | `react-hook-form` | `../_knowledge/react-hook-form/reusable-form-architecture.md` | MAPPED |
| Coverage counts, screenshot/text ledgers, regional closure, superseded region-plan bookkeeping, and final audit metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- A dedicated `react-hook-form` topic is introduced because the source teaches a library-specific form state/subscription/lifecycle model comparable in durability to the existing library-specific `react-query` topic.
- R01 remains the registration/submission-lifecycle unit; the conditional-field lifecycle portion of R08 is merged into it because it is the same retained-versus-removed-value decision.
- R02 owns validation-result shape and UI/server error mapping. Validation-frequency performance from R08 is kept with subscription/render isolation because its decision is primarily about update frequency and rerender cost.
- R03 and the subscription/performance parts of R08 form one unit. R04 form-state subscription details and R07 deep-child isolation are included only where they explain the same subscription ownership model.
- R04 owns default baseline, reset semantics, async loading, and edit-flow state transitions. R09's async-edit pattern is routed there rather than duplicated as a separate architecture mechanic.
- R05 owns controlled widget adaptation. R08 controlled-render guidance and R09 adapter guidance extend the same unit.
- R06 owns field-array identity and structural operations. Repeated stable-key reminders in R08/R09 are consolidated because they teach the same `field.id` versus index mechanic.
- R07 remains a context/ownership unit because FormProvider scope and deep-field access are a separate central model from value subscription.
- R09 gets an architecture unit only for the composition model, server-command boundary, testing checklist, and abstraction boundary; mechanics already fully owned by other units are linked rather than duplicated gratuitously.
- The original SVG is not physically resolvable from the current workspace tree. This affects provenance metadata only; the completed combined transcript and final coverage audit fully resolve the authoritative learning source.

| Status | Count |
|---|---:|
| MAPPED | 24 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
