# AEM02 - Endpoint metadata, MVC endpoint metadata, RouteEndpoint and IApiEndpointMetadata

Conspect: `actiondescriptor-controlleractiondescriptor-endpoint-metadata-route-or-endpoint-name-iapiendpointmetadata-ordered-metadata`<br>
File type: **source-preserving region transcript**  
Stage: **3 / NEXT02 verified transcript v001**  
Generated: 2026-06-13 10:41:31 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region covers endpoint metadata as endpoint-routing's unified metadata model and how MVC/minimal APIs contribute metadata.

Key ideas:
- Endpoint.Metadata is the unified endpoint-routing metadata bag.
- Endpoint metadata can be read after routing via HttpContext.GetEndpoint().
- Minimal APIs mostly use Endpoint.Metadata, while MVC also exposes ActionDescriptor.
- IApiEndpointMetadata is API-description/OpenAPI-related metadata.
- Attributes, conventions and builder methods all contribute metadata.

Reading quality:
```text
Overall: medium-high/high.
Exact source images remain source of truth; transcript preserves visible meaning and API shapes.
Confidence: high for conceptual/semantic mapping.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-026, S-027, S-028, S-029, S-030, S-031
```

Boundary decision:
```text
AEM02 was processed in NEXT02. No boundary correction was required for this region.
No transcript regions remain; final closure/audit remains.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| AEM02A-S001 | S-008 | IU-008 | `41e1101f92` | AEM02A | `verified-from-source-image` | no | Endpoint metadata overview |
| AEM02A-S002 | S-009 | IU-009 | `94a3be02eb` | AEM02A | `verified-from-source-image` | no | Endpoint metadata lookup by type |
| AEM02A-S003 | S-010 | IU-010 | `9f4be0682e` | AEM02A | `verified-from-source-image` | no | Endpoint metadata can include MVC action-related data |
| AEM02B-S001 | S-011 | IU-011 | `4782a5027c` | AEM02B | `verified-from-source-image` | no | Minimal API endpoint metadata |
| AEM02B-S002 | S-012 | IU-012 | `68da5af80d` | AEM02B | `verified-from-source-image` | no | Endpoint.Metadata as a unified metadata bag |
| AEM02B-S003 | S-013 | IU-013 | `1958f75494` | AEM02B | `verified-from-source-image` | no | Endpoint metadata versus action descriptor metadata |
| AEM02B-S004 | S-014 | IU-014 | `3b923bdd2b` | AEM02B | `verified-from-source-image` | no | Reading endpoint metadata in middleware |
| AEM02B-S005 | S-015 | IU-015 | `6f047fa761` | AEM02B | `verified-from-source-image` | no | Metadata added by attributes and conventions |
| AEM02B-S006 | S-016 | IU-016 | `0e39a18bcf` | AEM02B | `verified-from-source-image` | no | Endpoint metadata practical uses |
| AEM02C-S001 | S-026 | IU-026 | `e9e89f5a7b` | AEM02C | `verified-from-source-image` | no | IApiEndpointMetadata overview |
| AEM02C-S002 | S-027 | IU-027 | `e5c3a0ddfd` | AEM02C | `verified-from-source-image` | no | IApiEndpointMetadata in endpoint metadata collection |
| AEM02C-S003 | S-028 | IU-028 | `6c889635cf` | AEM02C | `verified-from-source-image` | no | API metadata produced by minimal APIs/MVC |
| AEM02C-S004 | S-029 | IU-029 | `c815d9e470` | AEM02C | `verified-from-source-image` | no | Endpoint metadata and API Explorer/OpenAPI |
| AEM02C-S005 | S-030 | IU-030 | `44490a213d` | AEM02C | `verified-from-source-image` | no | Minimal APIs rely more directly on endpoint metadata |
| AEM02C-S006 | S-031 | IU-031 | `e9cc148aaa` | AEM02C | `verified-from-source-image` | no | MVC endpoint metadata can bridge to MVC concepts |

---

## 2. Verified source transcript

## 2.1 AEM02A

### AEM02A-S001 / S-008 - `41e1101f92`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata overview

#### Visible meaning

```text
Endpoint metadata is the metadata collection attached to an Endpoint selected by endpoint routing. It can contain attributes, filters, endpoint-name/route-name metadata and custom metadata from endpoint builders.
```

#### Visible code / API shape

```csharp
var endpoint = httpContext.GetEndpoint();
var metadata = endpoint?.Metadata;
```

---

### AEM02A-S002 / S-009 - `94a3be02eb`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata lookup by type

#### Visible meaning

```text
EndpointMetadataCollection supports type-based lookup. GetMetadata<T>() returns the most relevant metadata item for that type according to collection/order rules; GetOrderedMetadata<T>() can return all ordered items.
```

#### Visible code / API shape

```csharp
endpoint.Metadata.GetMetadata<T>();
endpoint.Metadata.GetOrderedMetadata<T>();
```

---

### AEM02A-S003 / S-010 - `9f4be0682e`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata can include MVC action-related data

#### Visible meaning

```text
For MVC endpoints, endpoint metadata may include action-related attributes and metadata produced by MVC endpoint creation. This is endpoint-level metadata after routing, not the same object as ControllerActionDescriptor.
```

#### Visible code / API shape

```csharp
Endpoint.Metadata
ControllerActionDescriptor
```

---

## 2.2 AEM02B

### AEM02B-S001 / S-011 - `4782a5027c`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Minimal API endpoint metadata

#### Visible meaning

```text
Minimal API endpoints commonly attach metadata through endpoint builder APIs such as WithMetadata, WithName, WithTags, RequireAuthorization and Produces. This metadata is then available from Endpoint.Metadata.
```

#### Visible code / API shape

```csharp
app.MapGet("/todos", handler)
   .WithName("GetTodos")
   .WithTags("Todos")
   .WithMetadata(new SomeMetadata());
```

---

### AEM02B-S002 / S-012 - `68da5af80d`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint.Metadata as a unified metadata bag

#### Visible meaning

```text
Endpoint.Metadata is a unified bag of endpoint metadata regardless of whether the endpoint came from minimal APIs, MVC, Razor Pages or other endpoint-routing sources. Consumers can inspect it by metadata interface/type.
```

#### Visible code / API shape

```csharp
endpoint.Metadata.GetMetadata<IAuthorizeData>();
```

---

### AEM02B-S003 / S-013 - `1958f75494`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata versus action descriptor metadata

#### Visible meaning

```text
Endpoint metadata is what routing selected. ActionDescriptor is MVC's description of an MVC action. MVC controller endpoints can have both; minimal API endpoints mostly use Endpoint.Metadata.
```

#### Visible code / API shape

```csharp
HttpContext.GetEndpoint().Metadata
context.ActionDescriptor
```

---

### AEM02B-S004 / S-014 - `3b923bdd2b`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Reading endpoint metadata in middleware

#### Visible meaning

```text
Middleware after UseRouting can read the selected endpoint and its metadata. This works for endpoint-routing metadata, and is often the right place for cross-cutting routing-aware middleware.
```

#### Visible code / API shape

```csharp
var endpoint = context.GetEndpoint();
var authorize = endpoint?.Metadata.GetMetadata<IAuthorizeData>();
```

---

### AEM02B-S005 / S-015 - `6f047fa761`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Metadata added by attributes and conventions

#### Visible meaning

```text
Metadata can come from attributes, conventions and endpoint builder calls. The final Endpoint.Metadata collection is the merged/ordered result of those sources.
```

#### Visible code / API shape

```csharp
[Authorize]
[EndpointName("...")]
.WithMetadata(...)
```

---

### AEM02B-S006 / S-016 - `0e39a18bcf`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata practical uses

#### Visible meaning

```text
Endpoint metadata is useful for authorization, CORS, endpoint names, OpenAPI/API Explorer, filters, custom endpoint behavior and cross-cutting middleware decisions.
```

#### Visible code / API shape

```csharp
endpoint.Metadata.GetMetadata<IEndpointNameMetadata>();
```

---

## 2.3 AEM02C

### AEM02C-S001 / S-026 - `e9e89f5a7b`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: IApiEndpointMetadata overview

#### Visible meaning

```text
IApiEndpointMetadata is part of API-related endpoint metadata. It is used by API Explorer/OpenAPI-oriented infrastructure to understand endpoint API surface and metadata.
```

#### Visible code / API shape

```csharp
IApiEndpointMetadata
```

---

### AEM02C-S002 / S-027 - `e5c3a0ddfd`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: IApiEndpointMetadata in endpoint metadata collection

#### Visible meaning

```text
The source shows IApiEndpointMetadata living inside Endpoint.Metadata. It is another metadata interface that can be found through type-based lookup.
```

#### Visible code / API shape

```csharp
endpoint.Metadata.GetMetadata<IApiEndpointMetadata>();
```

---

### AEM02C-S003 / S-028 - `6c889635cf`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: API metadata produced by minimal APIs/MVC

#### Visible meaning

```text
API metadata can be produced by endpoint builder calls and framework conventions. Minimal APIs and MVC can both participate in producing endpoint metadata consumed by API description tooling.
```

#### Visible code / API shape

```csharp
WithOpenApi()
Produces<T>()
IApiEndpointMetadata
```

---

### AEM02C-S004 / S-029 - `c815d9e470`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata and API Explorer/OpenAPI

#### Visible meaning

```text
OpenAPI/API Explorer style tooling inspects endpoint metadata to build descriptions: route, method, parameters, response types, tags and API-specific metadata.
```

#### Visible code / API shape

```csharp
ApiDescription
Endpoint.Metadata
```

---

### AEM02C-S005 / S-030 - `44490a213d`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Minimal APIs rely more directly on endpoint metadata

#### Visible meaning

```text
Minimal APIs do not have ControllerActionDescriptor. Their endpoint information is represented through Endpoint and Endpoint.Metadata. That makes endpoint metadata central for minimal API introspection.
```

#### Visible code / API shape

```csharp
RouteEndpoint
Endpoint.Metadata
```

---

### AEM02C-S006 / S-031 - `e9cc148aaa`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: MVC endpoint metadata can bridge to MVC concepts

#### Visible meaning

```text
MVC endpoints can include metadata that reflects action/controller attributes, endpoint names, route names and API metadata. But MVC's ActionDescriptor remains a separate MVC-specific model.
```

#### Visible code / API shape

```csharp
ControllerActionDescriptor
Endpoint.Metadata
```

---

## 3. Cleaned source notes

- Endpoint.Metadata is the unified endpoint-routing metadata bag.
- Endpoint metadata can be read after routing via HttpContext.GetEndpoint().
- Minimal APIs mostly use Endpoint.Metadata, while MVC also exposes ActionDescriptor.
- IApiEndpointMetadata is API-description/OpenAPI-related metadata.
- Attributes, conventions and builder methods all contribute metadata.

---

## 4. Question hooks

- How/why: Endpoint.Metadata is the unified endpoint-routing metadata bag?
- How/why: Endpoint metadata can be read after routing via HttpContext.GetEndpoint()?
- How/why: Minimal APIs mostly use Endpoint.Metadata, while MVC also exposes ActionDescriptor?
- How/why: IApiEndpointMetadata is API-description/OpenAPI-related metadata?
- How/why: Attributes, conventions and builder methods all contribute metadata?