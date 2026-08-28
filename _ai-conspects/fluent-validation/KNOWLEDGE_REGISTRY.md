# Knowledge Registry

Source workspace: `_ai-conspects/fluent-validation/`

Authoritative processed sources: `regions/FV01-regex-basic-validators.md` through `regions/FV07-throwing-exceptions-summary.md`

Closure transcript: `02-stage2-next01-full-transcript.md`

Original SVG: `assets/raw/full.svg`

Evidence and coverage: `03-stage3-final-closure-audit.md`; 41 of 41 image uses and 25 of 25 canvas text labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| FV01 type-dependent `NotEmpty`, whitespace-only boundary and explicit whitespace predicate | `dotnet` | `dotnet.fluentvalidation-built-in-rules-conditions-and-cascade` | `../_knowledge/dotnet/fluentvalidation-built-in-rules-conditions-and-cascade.md` | MAPPED |
| FV01 `Matches` versus `Must(Regex.IsMatch)` and `ApplyConditionTo.CurrentValidator` scope | `dotnet` | `dotnet.fluentvalidation-built-in-rules-conditions-and-cascade` | `../_knowledge/dotnet/fluentvalidation-built-in-rules-conditions-and-cascade.md` | MAPPED |
| FV03 naive email/phone conditions, invalid-present-value failure and exclusive `When(...).Otherwise(...)` contract | `dotnet` | `dotnet.fluentvalidation-built-in-rules-conditions-and-cascade` | `../_knowledge/dotnet/fluentvalidation-built-in-rules-conditions-and-cascade.md` | MAPPED |
| FV03 separated presence/format rules and rule-level versus class-level cascade stop | `dotnet` | `dotnet.fluentvalidation-built-in-rules-conditions-and-cascade` | `../_knowledge/dotnet/fluentvalidation-built-in-rules-conditions-and-cascade.md` | MAPPED |
| FV02 independent collection/container, item-null and child-validator responsibilities | `dotnet` | `dotnet.fluentvalidation-collections-children-and-polymorphism` | `../_knowledge/dotnet/fluentvalidation-collections-children-and-polymorphism.md` | MAPPED |
| FV02 null-dependent work controlled through cascade stop, current-validator conditions or `DependentRules` | `dotnet` | `dotnet.fluentvalidation-collections-children-and-polymorphism` | `../_knowledge/dotnet/fluentvalidation-collections-children-and-polymorphism.md` | MAPPED |
| FV05 base/derived request types and runtime dispatch through `SetInheritanceValidator` | `dotnet` | `dotnet.fluentvalidation-collections-children-and-polymorphism` | `../_knowledge/dotnet/fluentvalidation-collections-children-and-polymorphism.md` | MAPPED |
| FV04 constructor DI versus `IServiceProvider` service location inside validators | `dotnet` | `dotnet.fluentvalidation-custom-rules-domain-errors-and-dependencies` | `../_knowledge/dotnet/fluentvalidation-custom-rules-domain-errors-and-dependencies.md` | MAPPED |
| FV04 `Custom` validation, domain address creation and domain-error-to-request-field mapping | `dotnet` | `dotnet.fluentvalidation-custom-rules-domain-errors-and-dependencies` | `../_knowledge/dotnet/fluentvalidation-custom-rules-domain-errors-and-dependencies.md` | MAPPED |
| FV04 reusable `IRuleBuilder` extensions for value-object and full-name factories | `dotnet` | `dotnet.fluentvalidation-custom-rules-domain-errors-and-dependencies` | `../_knowledge/dotnet/fluentvalidation-custom-rules-domain-errors-and-dependencies.md` | MAPPED |
| FV06 named/default rule sets and `IncludeRuleSets`/`IncludeRulesNotInRuleSet` selection | `dotnet` | `dotnet.fluentvalidation-rulesets-reuse-and-failure-results` | `../_knowledge/dotnet/fluentvalidation-rulesets-reuse-and-failure-results.md` | MAPPED |
| FV06 validator/data-contract reuse as a CRUD-versus-task-contract warning | `dotnet` | `dotnet.fluentvalidation-rulesets-reuse-and-failure-results` | `../_knowledge/dotnet/fluentvalidation-rulesets-reuse-and-failure-results.md` | MAPPED |
| FV07 `ValidateAndThrow`, `ThrowOnFailures` and expected validation-result versus exceptional-failure boundary | `dotnet` | `dotnet.fluentvalidation-rulesets-reuse-and-failure-results` | `../_knowledge/dotnet/fluentvalidation-rulesets-reuse-and-failure-results.md` | MAPPED |
| Inventory, duplicate-placement accounting, canvas module roadmap and final closure metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Built-in checks, condition scope and cascade behavior stay together because they determine rule-chain execution.
- Collection/child validation and inheritance validation share the object-graph boundary but remain separate from general conditional-rule syntax.
- Domain failure adaptation and validator dependency ownership form one reusable custom-rule unit.
- Rule-set selection stays with reuse and exception cautions because the source uses all three to distinguish deliberate scenario composition from an overloaded validator/data contract.

| Status | Count |
|---|---:|
| MAPPED | 13 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

