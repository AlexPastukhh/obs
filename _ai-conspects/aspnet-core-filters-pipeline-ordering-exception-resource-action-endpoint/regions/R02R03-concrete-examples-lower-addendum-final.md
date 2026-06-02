# R02+R03 - concrete filter examples / lower addendum / final coverage

Conspect: `aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint`  
File type: **source-preserving combined region transcript**  
Stage: **stage-2 / final coverage transcript v001**  
Generated: 2026-06-02 13:31:40 UTC

---

## Direction check

Goal:
Convert the filters Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
R01 main theory is done. This pass closes the remaining concrete examples and lower addendum.

This step:
Process R02/R03 together: concrete MVC filter examples, endpoint-filter examples, and the lower middleware-before-filters reminder.

Why:
R02 gives practical examples for the filter types introduced in R01. R03 is a short final addendum that clarifies the bigger choice: middleware vs global MVC filters vs controller/action filters vs endpoint filters.

Next:
Review cached diff, commit, then this filters conspect is complete by image-use coverage.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- concrete filter examples: authorization, resource, action, exception, result, endpoint filters
- resource-filter caching before model binding/action execution
- action-filter timing/logging around action execution
- exception/result filters as concrete implementations of the R01 theory
- endpoint filters around endpoint/minimal-API execution
- lower addendum: when middleware runs, when filters run, and how to choose the right layer
```

Key ideas:

- Resource filters are the important “early MVC wrapper” examples: they can short-circuit before model binding and action execution.
- Action filters are good for before/after action method work, such as timing/logging, where the action context matters.
- Exception filters and result filters are shown as concrete examples, but the R01 limitation remains: exception filters do not replace outer exception-handling middleware.
- Result filters operate around result execution; always-run result filters are for cases where a normal result filter might be skipped by short-circuiting.
- Endpoint filters are a separate endpoint/minimal-API pipeline tool: they can inspect arguments/results around `next`, but they are not the same thing as MVC action filters.
- Middleware runs before MVC filters. If the request never reaches MVC, MVC filters will not run.

Reading quality:

```text
overall: high for boundary and conceptual content
code punctuation: medium-high; preserved PNGs should be used for exact correction
coverage: final pass closes 38 image uses; remaining unclosed image uses = 0
```

---

## 1. Boundary / ownership

Included in this pass:

```text
R02 sources: 27
R03 sources: 11
Total newly closed: 38
```

Previously closed:

```text
R01 sources: 93
```

Duplicate image-use handling:

```text
S-001 duplicates S-111: S-001 was R01; S-111 is closed here as R02 placement.
S-006 duplicates S-112: S-006 was R01; S-112 is closed here as R02 placement.
S-009 duplicates S-131: S-009 was R01; S-131 is closed here as R03 placement.
S-002 duplicates S-010: both were R01 and already closed.
```

---

## 2. Verified source-preserving transcript

### 2.1 Authorization filters

The authorization examples show the earliest MVC-filter-style request gate. They are about deciding whether the request may continue, not about wrapping action results or catching all errors. This is why the earlier R01 caveat remains important: exceptions from authorization-stage code are not the same problem as exceptions thrown later inside action/result execution.

### 2.2 Resource filters / cached result before model binding

The resource-filter examples are the most important concrete bridge from theory to practice. A resource filter can run before model binding and action execution, so it can short-circuit with a cached result before action arguments are created and before the action method runs. The notes emphasize that this is often more intuitive for caching than trying to do the same thing in an action filter after model binding has already happened.

### 2.3 Action filters

The action-filter examples wrap the action method itself. The screenshots include timing/logging-style examples that run before and after the action delegate. This is the right layer when the cross-cutting concern needs action context and action execution timing rather than the whole HTTP pipeline.

### 2.4 Exception filters

The exception-filter examples show concrete forms of handling MVC exceptions by setting a result / marking the exception handled. They reinforce the earlier model: exception filters can transform certain action/MVC exceptions into responses, but they are not a replacement for middleware-level exception handling across the whole app.

### 2.5 Result filters / always-run result filters

The result-filter examples show result wrapping and after-result logic. The always-run result-filter notes clarify the distinction between normal result filters and filters intended to run even when previous stages short-circuit or when result execution takes a less typical path. Use this layer when the concern is about MVC result execution, not arbitrary HTTP middleware behavior.

### 2.6 Endpoint filters

The endpoint-filter examples belong to endpoint/minimal-API execution. They use the endpoint filter context, inspect arguments, invoke `next`, and can transform or short-circuit endpoint results. The notes separate this from MVC action filters: endpoint filters are closer to the endpoint routing/minimal API model.

### 2.7 Lower addendum: middleware before filters / choosing the layer

The lower addendum summarizes the choosing rule. Middleware is the outer pipeline and runs before MVC filters; it can see broad HTTP traffic and non-MVC requests. MVC filters run after routing/MVC selection and provide MVC/action/result contexts. Controller/action filters are narrower still. Endpoint filters apply to endpoint/minimal API flows. The practical rule is to choose the earliest layer that has enough context and the narrowest layer that matches the concern.

---

## 3. Final coverage audit

```text
total image uses: 131
R01 processed: 93
R02 processed: 27
R03 processed: 11
remaining unclosed image uses: 0
```

Final verdict:

```text
ASP.NET Core filters conspect complete by image-use coverage.
```

---

## 4. Source table

See:

```text
data/R02R03-sources-stage2-v001.csv
data/R02R03-sources-stage2-v001.json
data/R02R03-boundary-review-stage2-v001.*
data/final-coverage-audit-stage2-v001.*
audit-assets/R02R03-source-images/*.png
audit-assets/contact-sheet-R02R03-final-coverage-v001.png
```

Those files preserve every R02/R03 source image use with coordinates, nearest labels, topic, summary, and confidence notes.

---

## 5. Questions / correction hooks

- When exact C# punctuation matters, use the preserved `R02R03-source-images` PNGs as the correction source.
- Recheck endpoint-filter examples separately if you later want a verbatim code-oriented pass.
- Recheck resource-filter caching examples if you later want a more code-exact before/after model-binding explanation.
