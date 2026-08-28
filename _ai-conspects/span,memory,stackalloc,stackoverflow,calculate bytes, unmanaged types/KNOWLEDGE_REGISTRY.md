# Knowledge Registry

Source workspace: `_ai-conspects/span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types/`

Authoritative processed source: `06-full-combined-final-transcript.md`

Authoritative audit: `07-full-conspect-final-coverage-audit.md`

Original SVG: `source/span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Sections 02–04 Span/ReadOnlySpan, ref-struct restrictions, Memory async boundary, descriptor copying and producer/consumer ownership | `dotnet.span-memory-and-ref-safety` | `dotnet` | `../_knowledge/dotnet/span-memory-and-ref-safety.md` | MERGED |
| Sections 05–07 bounded stack allocation, threshold fallback, stack pressure/overflow, loop/helper lifetime and async-safe owners | `dotnet.stackalloc-lifetime-and-stack-pressure` | `dotnet` | `../_knowledge/dotnet/stackalloc-lifetime-and-stack-pressure.md` | MAPPED |
| Section 07 pool return/clearing rules and ownership selection | `dotnet.stackalloc-lifetime-and-stack-pressure` | `dotnet` | `../_knowledge/dotnet/stackalloc-lifetime-and-stack-pressure.md` | MAPPED |
| Section 08 ordinary versus ref-returning properties and safe span/ref-return storage | `dotnet.span-memory-and-ref-safety` | `dotnet` | `../_knowledge/dotnet/span-memory-and-ref-safety.md` | MERGED |
| Sections 09–10 unmanaged recursion/constraint, size-API distinctions, byte views, endianness and serialization boundary | `dotnet.unmanaged-size-and-struct-layout` | `dotnet` | `../_knowledge/dotnet/unmanaged-size-and-struct-layout.md` | MAPPED |
| Sections 11–12 struct copying, padding/alignment, auto-property storage, interop risk, size guideline and measured selection | `dotnet.unmanaged-size-and-struct-layout` | `dotnet` | `../_knowledge/dotnet/unmanaged-size-and-struct-layout.md` | MAPPED |
| Coverage and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

Boundary decision: Span/Memory view semantics extend the existing stable unit; stack-allocation failure/lifetime mechanics and unmanaged-layout mechanics form two independent units rather than mirroring the five source regions.
