# Stage 0 - Source check and boundary review

Generated: 2026-06-02 00:09:09 UTC

## Done

- New conspect started in this folder only:

```text
_ai-conspects/httpclient-summary-theory-base-usage-jsonoptions-wrapper-handlers/
```

- Source SVG inspected:

```text
httpclient,summary,theory,base usage,jsonoptions wrapper,handlers.svg
```

- Embedded screenshots/images detected: `224` unique images.
- Image uses on canvas detected: `229`.
- Text labels detected: `92`.

## Now

This is a source/boundary checkpoint only. No transcript is completed yet.

Inventory/ledger is a checklist, not source of truth.

## Batching note

The user allowed trying larger transcript passes, roughly double the previous area size. For this conspect that means: one transcript archive may combine adjacent coherent candidate regions when the contact sheets are readable and the boundary review is explicit.

Safe examples:

```text
R01 + R02 may be processed together if local review confirms they are one base-usage road.
R03 + R04 should likely be processed together because both are typed-client / JsonOptions wrapper material.
R05A + R05B can be a larger factory/lifetime/DNS pass only if contact-sheet review stays readable.
```

Still required:

```text
candidate review
nearby/same-column/parallel-column checks
explicit include/exclude/reassign reasons
area overview / key ideas / reading quality section
```

## Initial candidate regions

| Candidate region | Source count | Meaning |
|---|---:|---|
| `R01-left-testing-create-jsonpatch-shortcuts` | 34 | testing, create resource, JsonPatch, shortcuts vs request messages; likely can combine with R02 if local review confirms |
| `R02-base-usage-quick-headers-dispose` | 39 | base HttpClient usage, quick examples, Accept/Content-Type, request/response disposal, shortcuts |
| `R03-theory-typed-client-jsonoptions-part1` | 23 | general theory and typed HttpClient start, first half of JsonOptions wrapper path |
| `R04-jsonoptions-wrapper-typed-client-methods` | 11 | JsonOptions wrapper / typed client methods and custom method shape |
| `R05A-factory-lifetime-reuse-dns-upper` | 49 | HttpClientFactory, problems without factory, connection reuse, disposal, handler pool, DNS upper road |
| `R05B-named-typed-clients-dns-lower` | 26 | named clients, typed clients, DNS/handler lifetime lower road |
| `R06-global-config-primary-handler-basics` | 18 | global HttpClient config, timeouts, primary handler basics, redirection handler configuration |
| `R07-message-handlers-primary-handler-rotation` | 29 | HttpMessageHandler / DelegatingHandler examples, primary handler, handler rotation vs connection rotation |

## Next

Recommended next step:

```text
R01+R02 transcript pass: testing/create/resource/jsonpatch/shortcuts + base usage/quick/headers/dispose
```

This is a larger combined pass, but still bounded and visually checkable.
