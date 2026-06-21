# Configuring System.Text.Json serialization in ASP.NET Core

Source conspect: `SYSTEM.TEXT.JSON SER SER.svg`  
Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area overview / reading quality

This compact sheet contains 6 image placements and 1 canvas text labels. The main concepts and code examples were visually reviewed as one coherent area. Exact code punctuation remains preserved in `source/images/` and the original SVG.

## Verified transcript

### MVC/controller JSON options

For controllers, configure `System.Text.Json` through `AddControllers().AddJsonOptions(...)`. Common options include camel-case property naming, custom converters, `DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull`, cycle handling with `ReferenceHandler.IgnoreCycles`, and optional indentation.

### Minimal API JSON options

Minimal APIs use `ConfigureHttpJsonOptions(...)` from `Microsoft.AspNetCore.Http.Json`. When an application mixes controllers and minimal APIs, configure both option pipelines if both need identical serialization behavior.

### Null/default handling

`WhenWritingNull` omits null-valued properties from serialized output; it does not mutate the object. `WhenWritingDefault` is broader and can also omit value-type defaults such as `0` and `false`. The old `IgnoreNullValues` option is obsolete.

### Formatters and media types

MVC formatter configuration can enable behaviors such as returning 406 for unsupported `Accept` headers and adding vendor-specific media types to the System.Text.Json input/output formatters. These formatter settings are separate from core serializer options.

## Evidence map

Image placements: `S-001, S-002, S-003, S-004, S-005, S-006`

Canvas labels: `T-001`

Detailed coordinates and hashes are stored in `data/image-uses.*`, `data/text-labels.*`, and the review ledgers.

## Final coverage

```text
image uses processed: 6
text labels processed: 1
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```