# Knowledge Registry

Source workspace: `_ai-conspects/jsondocument, jsonnode, jsonelement, utf8jsonwriter/`

Authoritative processed source: `regions/R01R02R03R04R05-json-dom-utf8writer-final-v001.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `data/final-coverage-audit.json`.

Original SVG: `source/jsondocument, jsonnode, jsonelement, utf8jsonwriter.svg` (present in the local workspace and named by `CURRENT_SOURCE_OF_TRUTH.md`; excluded from Git and not resolvable from the current branch tree).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| JsonDocument ownership/disposal, JsonElement lifetime and cloning, kinds/getters, property and array access, parsing/deserialization, document-versus-element roles, and JsonProperty (R01 read-only DOM sections; R02 JsonElement/JsonDocument and JsonProperty) | `dotnet.jsondocument-jsonelement-readonly-dom` | `dotnet` | `../_knowledge/dotnet/jsondocument-jsonelement-readonly-dom.md` | MAPPED |
| DTO constructor binding, ProblemDetails.Extensions runtime values, ASP.NET Core DOM model binding and type selection, serializer bridges, and object-to-JsonElement runtime checks (R01 DTO/Extensions; R02 Controller model binding; R03 serialization/runtime object sections) | `aspnet-core.json-dom-model-binding-and-dynamic-values` | `aspnet-core` | `../_knowledge/aspnet-core/json-dom-model-binding-and-dynamic-values.md` | MAPPED |
| Read-only-versus-mutable selection and JsonNode/JsonObject/JsonArray/JsonValue hierarchy, indexers, mutation, order, enumeration, cloning/replacement/path, and ToJsonString (R03 mutation section; R04 complete) | `dotnet.jsonnode-mutable-dom` | `dotnet` | `../_knowledge/dotnet/jsonnode-mutable-dom.md` | MAPPED |
| Utf8JsonWriter destinations/options/flush, structural/value APIs, JsonEncodedText, direct HTTP output, allocation boundaries, serializer comparison, canonicalization, testing, and overall DOM/writer decision checklist (R05 plus Decision guide and Checklist) | `dotnet.utf8jsonwriter-streaming-and-token-control` | `dotnet` | `../_knowledge/dotnet/utf8jsonwriter-streaming-and-token-control.md` | MAPPED |
| Source import/boundary review, image/text inventories, duplicate-use records, contact sheets, and final coverage audit | — | — | — | NON_LEARNING |

## Boundary decisions

- Read-only ownership, ASP.NET model binding/dynamic runtime values, mutable DOM mechanics, and forward-only writing are separate durable models.
- Representative code, lifecycle rules, performance caveats, security boundaries, canonicalization conditions, and the decision checklist remain in the destination bodies.
- Coverage metadata is non-learning; all 165 image uses and 81 native labels are certified closed by the source audit.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
