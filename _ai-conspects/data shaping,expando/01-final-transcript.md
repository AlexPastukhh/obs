# Final transcript — data shaping,expando

Generated: 2026-06-27 UTC

## Overall understanding

The conspect explains field-based response shaping in an ASP.NET Core REST API. It defines the public `fields` contract, validates field names, implements reusable shaping helpers with reflection and `ExpandoObject`, integrates them into collection and single-resource controllers, and then compares `ExpandoObject` with dictionaries, anonymous types and database projection.

## Verified transcript regions

### R01 — Data-shaping contract, fields parameter and field validation

Public DTO fields, `AuthorsResourceParameters.Fields`, case-insensitive property validation and deliberate `400` responses for invalid fields.

Coverage: **13 image uses**, **51 physical text nodes**. See `regions/R01-contract-fields-validation.md`.

### R02 — Collection/single shaping extensions and controller flow

Reflection-driven collection and object extensions, dictionary-backed population of `ExpandoObject`, JSON serialization, DI, controller integration and preserving `fields` in pagination links.

Coverage: **24 image uses**, **10 physical text nodes**. See `regions/R02-shaping-extensions-controller-flow.md`.

### R03 — ExpandoObject, dictionary/dynamic semantics and alternatives

Runtime property bags, `IDictionary<string, object?>` casting, dynamic access, comparison with dictionaries and anonymous types, and safe restrictions on generic shaping helpers.

Coverage: **20 image uses**, **6 physical text nodes**. See `regions/R03-expando-dictionary-dynamic-alternatives.md`.

### R04 — Why data shaping differs from database projection

Representation-layer shaping versus query projection, computed DTO fields, dynamic expression complexity, when to use predefined views or DB projection, and what can be reused from sorting-field mapping.

Coverage: **15 image uses**, **7 physical text nodes**. See `regions/R04-shaping-vs-projection-tradeoffs.md`.

## Cross-region conclusions

- `fields` is part of the public representation contract and should only expose approved DTO properties.
- Validate field names before the shaping helper so invalid input becomes a controlled client error.
- `ExpandoObject` is a convenient dictionary-backed representation for a runtime-selected property set; it is not mandatory.
- Shape after mapping for clarity and consistency; move selection into the database only when measured scale or latency requirements justify the added projection machinery.
- Sorting mappings and projection mappings share whitelisting ideas, but selecting DTO values requires expressions, not merely property-name paths.

## Source preservation

The package includes the original SVG, all extracted screenshots, the text-node and image-use ledgers, contact sheets and a source-to-transcript map.
