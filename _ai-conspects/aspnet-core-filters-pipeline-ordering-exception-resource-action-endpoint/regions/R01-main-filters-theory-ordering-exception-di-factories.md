# R01 - ASP.NET Core filters main theory / ordering / exception / DI / factories

Conspect: `aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint`  
File type: **source-preserving region transcript**  
Stage: **stage-1 / verified region transcript v001**  
Generated: 2026-06-02 13:12:24 UTC

---

## Direction check

Goal:
Convert the filters Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 is committed/ready. R01 is the first transcript pass and covers the main upper theory road.

This step:
Process R01: filters vs middleware, async filters, ordering, exception filters, handled exception propagation, DI/global filters, TypeFilter/ServiceFilter, IFilterFactory, status-code pages and content-negotiation notes.

Why:
This closes the large coherent main-theory road without mixing it with concrete filter examples (R02) or the lower addendum/middleware-before-filters tail (R03).

Next:
R02+R03 combined boundary review, if coherent, with final coverage audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- filters vs middleware and where MVC filters execute
- async filters and before/after nesting
- filter ordering and unwind order
- exception filters, handled exceptions, and propagation limits
- DI for global filters, attributes, TypeFilter, ServiceFilter, services from HttpContext
- IFilterFactory and attribute arguments/service-backed filter creation
- status-code pages vs MVC/result filters, ObjectResult/content negotiation, ViewResult error pages
```

Key ideas:

- Middleware is outside MVC; filters are inside MVC/action/result execution and have richer MVC context.
- Filters should be reasoned about as nested wrappers, not a flat list. Ordering controls which wrapper is outside and which after-code runs during unwind.
- Exception filters can handle MVC exceptions by setting a result / marking handled, but they do not catch failures from stages that execute before them.
- For dependency injection, use global filters, `ServiceFilter`, `TypeFilter`, or an `IFilterFactory` pattern rather than assuming normal constructor DI inside plain attributes.
- Result filters can be a better place than generic status-code pages when MVC result/content-negotiation behavior matters.

Reading quality:

```text
overall: high for boundary and conceptual content
code punctuation: medium-high; preserved PNGs should be used for exact correction
coverage: 93 R01 image uses closed; 38 R02/R03 image uses remain pending
```

---

## 1. Boundary / ownership

Included in this pass:

```text
R01 sources: 93
source range: S-001..S-093 by stage0 candidate plan, rechecked visually/semantically
```

Checked but not included:

```text
R02: concrete MVC filter-type examples: authorization/resource/action/exception/result/endpoint filters
R03: lower addendum/main-sheet tail and middleware-before-filters reminder
```

Duplicate image-use handling:

```text
S-001 duplicates S-111: R01 placement closed here; R02 placement remains pending.
S-002 duplicates S-010: both placements are R01 and are closed here.
S-006 duplicates S-112: R01 placement closed here; R02 placement remains pending.
S-009 duplicates S-131: R01 placement closed here; R03 placement remains pending.
```

---

## 2. Verified source-preserving transcript

### 2.1 Filters vs middleware / async filters / ordering

The first road establishes filters as MVC-aware wrappers around action/result execution, not replacements for middleware. Middleware runs earlier and more broadly; filters are useful when the decision needs MVC/action/result context. The area repeatedly stresses async filter forms and ordering: a filter can run before the next delegate, await it, and then run after logic during unwind. This is why ordering should be understood as nested execution.

### 2.2 Exception filters and handled propagation

The exception-filter road shows examples where an exception filter catches MVC exceptions and marks them as handled by setting a result. Once handled, the exception no longer propagates as an unhandled exception through later exception handling. The limitation is equally important: exception filters do not cover failures from earlier stages such as authorization filters; middleware remains the outer safety net for broad exception handling.

### 2.3 DI, filter attributes, global filters, TypeFilter and ServiceFilter

The DI road distinguishes filter attributes from DI-created services. A plain attribute is metadata and cannot be treated like a normal scoped service with constructor injection. For service-backed filters, the notes point toward global filter registration, `ServiceFilter`, `TypeFilter`, or pulling a service from `HttpContext.RequestServices` when that pattern is appropriate. The main idea is to make service lifetime and creation explicit.

### 2.4 IFilterFactory and argument passing

The factory road explains why `IFilterFactory` exists: sometimes the attribute needs to carry simple configuration/arguments while the real filter instance needs services. A factory-style attribute can accept simple values and then create/resolve the real filter with DI-aware logic. The notes also prefer explicit filter interfaces such as `IAsync...Filter`/`I...Filter` over unclear base-attribute behavior when the filter has meaningful behavior.

### 2.5 Status-code pages, MVC result filters and content negotiation

The final R01 road compares lower-level status-code-page behavior with MVC/result-filter behavior. When code is already in MVC land and returns `ObjectResult` or derived result types, result filters can participate in MVC result execution and content negotiation. The notes also mention route checks for API/controller behavior, returning `ViewResult` error pages, always-running result filters, short-circuited previous stages, and invalid model-state response customization.

---

## 3. Source table

See:

```text
data/R01-sources-stage1-v001.csv
data/R01-sources-stage1-v001.json
audit-assets/R01-source-images/*.png
audit-assets/contact-sheet-R01-main-theory-transcript-v001.png
```

Those files preserve every R01 source image use with coordinates, nearest labels, topic, summary, and confidence notes.

---

## 4. Questions / correction hooks

- When exact C# punctuation matters, use the preserved `R01-source-images` PNGs as the correction source.
- Recheck R02 examples before final coverage, especially duplicate placements S-111 and S-112.
- Recheck R03 lower tail before final coverage, especially duplicate placement S-131.
