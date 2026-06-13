# AEM01 - ActionDescriptor and ControllerActionDescriptor in MVC/filter context

Conspect: `actiondescriptor-controlleractiondescriptor-endpoint-metadata-route-endpoint-name-iapiendpointmetadata-ordered-metadata`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 09:11:01 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region is about what MVC exposes for a selected controller action, and when ActionDescriptor/ControllerActionDescriptor is the right abstraction.

Key ideas:
- MVC filters expose ActionDescriptor through filter context.
- ControllerActionDescriptor adds controller/action-specific reflection info.
- MethodInfo is useful for reading controller method attributes and return/parameter information.
- Endpoint metadata and MVC ActionDescriptor are separate but both may exist for MVC controller endpoints.
- EndpointNameMetadata and RouteNameMetadata can both appear, but they are not identical concepts.

Reading quality:
```text
Overall: medium-high to high based on source screenshots and contact sheets.
Transcription preserves visible source meaning; exact line-level source images must still be treated as source of truth.
Confidence: high for boundary/semantic split; exact code snippets may be cleaned/paraphrased when tiny.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-021, S-022, S-023, S-024, S-025, S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-017, S-018, S-019, S-020
```

Boundary decision:
```text
AEM01 was processed in NEXT01. No boundary correction was required for this region.
AEM02 and AEM03 remain pending for NEXT02.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| AEM01A-S001 | S-021 | IU-021 | `583fdaf3ba` | AEM01A | `verified-from-source-image` | no | ActionDescriptor versus ControllerActionDescriptor overview |
| AEM01A-S002 | S-022 | IU-022 | `65c618d162` | AEM01A | `verified-from-source-image` | no | Inside MVC code: cast ActionDescriptor to ControllerActionDescriptor |
| AEM01A-S003 | S-023 | IU-023 | `e7412fd3ac` | AEM01A | `verified-from-source-image` | no | EndpointNameMetadata versus RouteNameMetadata |
| AEM01A-S004 | S-024 | IU-024 | `ab056deb4b` | AEM01A | `verified-from-source-image` | no | Route name versus endpoint name in MVC action endpoints |
| AEM01A-S005 | S-025 | IU-025 | `9e9acbd845` | AEM01A | `verified-from-source-image` | no | Reading metadata from matched endpoint after routing |
| AEM01B-S001 | S-001 | IU-001 | `d0c86db280` | AEM01B | `verified-from-source-image` | no | Earlier pipeline: endpoint metadata not yet available in action filter constructor |
| AEM01B-S002 | S-002 | IU-002 | `359e73b57f` | AEM01B | `verified-from-source-image` | no | Filter context gives selected MVC ActionDescriptor |
| AEM01B-S003 | S-003 | IU-003 | `9eeba9e782` | AEM01B | `verified-from-source-image` | no | One important distinction: MVC controllers versus minimal APIs |
| AEM01B-S004 | S-004 | IU-004 | `00ef2dce40` | AEM01B | `verified-from-source-image` | no | Middleware after UseRouting can read endpoint; MVC action filter can read ActionDescriptor |
| AEM01B-S005 | S-005 | IU-005 | `328101fe64` | AEM01B | `verified-from-source-image` | no | Quick examples in controller and filter |
| AEM01B-S006 | S-006 | IU-006 | `e9734aa47c` | AEM01B | `verified-from-source-image` | no | Useful ActionDescriptor/ControllerActionDescriptor data |
| AEM01B-S007 | S-007 | IU-007 | `594356ce9a` | AEM01B | `verified-from-source-image` | no | What you can get from ActionDescriptor and ControllerActionDescriptor |
| AEM01C-S001 | S-017 | IU-017 | `59eda18afc` | AEM01C | `verified-from-source-image` | no | Endpoint metadata can also be read from selected endpoint |
| AEM01C-S002 | S-018 | IU-018 | `7f2d2bfae3` | AEM01C | `verified-from-source-image` | no | Endpoint class and Metadata property |
| AEM01C-S003 | S-019 | IU-019 | `6563e25856` | AEM01C | `verified-from-source-image` | no | Example: read action descriptor and custom attributes |
| AEM01C-S004 | S-020 | IU-020 | `47c47bc723` | AEM01C | `verified-from-source-image` | no | MethodInfo gives access to method-level metadata |

---

## 2. Verified source transcript

## 2.1 AEM01A

### AEM01A-S001 / S-021 - `583fdaf3ba`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: ActionDescriptor versus ControllerActionDescriptor overview

#### Visible meaning

```text
The source compares ActionDescriptor and ControllerActionDescriptor. ActionDescriptor is the general MVC action descriptor abstraction; ControllerActionDescriptor is the MVC controller-action-specific descriptor with controller/action/method info. The practical difference is that ControllerActionDescriptor exposes controller-specific metadata, while ActionDescriptor is the broader base shape.
```

#### Visible code / API shape

```csharp
ActionDescriptor
ControllerActionDescriptor
```

---

### AEM01A-S002 / S-022 - `65c618d162`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Inside MVC code: cast ActionDescriptor to ControllerActionDescriptor

#### Visible meaning

```text
Inside MVC code you often start with ActionDescriptor and cast to ControllerActionDescriptor when controller-specific information is needed. The visible pattern is getting context.ActionDescriptor and then checking whether it is ControllerActionDescriptor.
```

#### Visible code / API shape

```csharp
var cad = context.ActionDescriptor as ControllerActionDescriptor;
if (cad is not null) { /* controller action */ }
```

---

### AEM01A-S003 / S-023 - `e7412fd3ac`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: EndpointNameMetadata versus RouteNameMetadata

#### Visible meaning

```text
The source notes that endpoint name and route name are separate metadata concepts. EndpointNameMetadata is the modern/general endpoint-routing name. RouteNameMetadata is a route name used by route generation scenarios. They can appear similar but are not identical.
```

#### Visible code / API shape

```csharp
IEndpointNameMetadata
IRouteNameMetadata
```

---

### AEM01A-S004 / S-024 - `ab056deb4b`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Route name versus endpoint name in MVC action endpoints

#### Visible meaning

```text
For MVC controller actions, the route name and endpoint name can be related but should not be blindly treated as the same thing. MVC may attach name metadata based on action/route attributes. The source warns that names can be used for link generation and endpoint identification differently.
```

#### Visible code / API shape

```csharp
[Route(..., Name = "...")]
IEndpointNameMetadata
IRouteNameMetadata
```

---

### AEM01A-S005 / S-025 - `9e9acbd845`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Reading metadata from matched endpoint after routing

#### Visible meaning

```text
The image highlights that after endpoint routing has matched an endpoint, route/endpoint name metadata can be read from HttpContext.GetEndpoint().Metadata. For MVC actions, this can reveal endpoint-name and route-name metadata attached to the selected endpoint.
```

#### Visible code / API shape

```csharp
var endpoint = httpContext.GetEndpoint();
var name = endpoint?.Metadata.GetMetadata<IEndpointNameMetadata>();
```

---

## 2.2 AEM01B

### AEM01B-S001 / S-001 - `d0c86db280`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Earlier pipeline: endpoint metadata not yet available in action filter constructor

#### Visible meaning

```text
Before endpoint routing/matching has selected an endpoint, the selected endpoint metadata is not available. In a filter constructor, HttpContext may not even be available, so endpoint metadata cannot be read there. This is why endpoint metadata should be read after routing/selection.
```

#### Visible code / API shape

```csharp
// filter constructor: no selected endpoint yet
```

---

### AEM01B-S002 / S-002 - `359e73b57f`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Filter context gives selected MVC ActionDescriptor

#### Visible meaning

```text
In MVC, inside an action filter, context.ActionDescriptor exists and has the selected MVC action information. If the concrete type is ControllerActionDescriptor, it also exposes MethodInfo and controller-action details. This is an MVC-selected-action view, separate from endpoint metadata.
```

#### Visible code / API shape

```csharp
var descriptor = context.ActionDescriptor;
var cad = descriptor as ControllerActionDescriptor;
```

---

### AEM01B-S003 / S-003 - `9eeba9e782`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: One important distinction: MVC controllers versus minimal APIs

#### Visible meaning

```text
Minimal APIs store most information in endpoint metadata and typically do not use MVC ActionDescriptor. MVC controller actions have both endpoint metadata and MVC ActionDescriptor/ControllerActionDescriptor concepts. This is why logic must know whether it is working in MVC or minimal API territory.
```

#### Visible code / API shape

```csharp
Endpoint.Metadata
ControllerActionDescriptor
```

---

### AEM01B-S004 / S-004 - `00ef2dce40`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Middleware after UseRouting can read endpoint; MVC action filter can read ActionDescriptor

#### Visible meaning

```text
The source shows middleware after UseRouting reading HttpContext.GetEndpoint(), and MVC filters using context.ActionDescriptor. These are two different access paths: endpoint metadata from endpoint routing, and MVC action metadata from MVC filter context.
```

#### Visible code / API shape

```csharp
app.UseRouting();
app.Use(async (ctx, next) => {
    var endpoint = ctx.GetEndpoint();
    await next();
});

var descriptor = context.ActionDescriptor;
```

---

### AEM01B-S005 / S-005 - `328101fe64`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Quick examples in controller and filter

#### Visible meaning

```text
Examples show that inside a controller you can access ControllerContext.ActionDescriptor as ControllerActionDescriptor, and inside a filter you can cast context.ActionDescriptor to ControllerActionDescriptor. This allows access to MethodInfo and route/controller/action values.
```

#### Visible code / API shape

```csharp
var cad = ControllerContext.ActionDescriptor as ControllerActionDescriptor;
var method = cad?.MethodInfo;
```

---

### AEM01B-S006 / S-006 - `e9734aa47c`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Useful ActionDescriptor/ControllerActionDescriptor data

#### Visible meaning

```text
The source lists useful data: logging/metrics, controller/action name, action description, route values, filter/action metadata, and API Explorer/OpenAPI generation. ControllerActionDescriptor also gives ControllerTypeInfo and MethodInfo.
```

#### Visible code / API shape

```csharp
cad.ControllerName
cad.ActionName
cad.MethodInfo
cad.ControllerTypeInfo
```

---

### AEM01B-S007 / S-007 - `594356ce9a`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: What you can get from ActionDescriptor and ControllerActionDescriptor

#### Visible meaning

```text
ActionDescriptor provides general action metadata: display name, id, route values, filter descriptors, parameters, endpoint metadata, and properties. ControllerActionDescriptor adds ControllerName, ActionName, MethodInfo and ControllerTypeInfo. This is useful for MVC-only concerns.
```

#### Visible code / API shape

```csharp
ActionDescriptor.RouteValues
ActionDescriptor.EndpointMetadata
ControllerActionDescriptor.MethodInfo
```

---

## 2.3 AEM01C

### AEM01C-S001 / S-017 - `59eda18afc`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint metadata can also be read from selected endpoint

#### Visible meaning

```text
The code reads endpoint metadata from HttpContext.GetEndpoint().Metadata, including IEndpointNameMetadata, RouteNameMetadata and endpoint metadata collection. This is endpoint-routing data, not necessarily MVC ActionDescriptor data.
```

#### Visible code / API shape

```csharp
Endpoint? endpoint = httpContext.GetEndpoint();
var endpointName = endpoint?.Metadata.GetMetadata<IEndpointNameMetadata>();
var routeName = endpoint?.Metadata.GetMetadata<IRouteNameMetadata>();
```

---

### AEM01C-S002 / S-018 - `7f2d2bfae3`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Endpoint class and Metadata property

#### Visible meaning

```text
Endpoint represents a thing that can handle a request after routing selects it. It has RequestDelegate, DisplayName and Metadata. Metadata is an EndpointMetadataCollection attached to the endpoint.
```

#### Visible code / API shape

```csharp
Endpoint.RequestDelegate
Endpoint.DisplayName
Endpoint.Metadata
```

---

### AEM01C-S003 / S-019 - `6563e25856`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Example: read action descriptor and custom attributes

#### Visible meaning

```text
The example shows pulling ControllerActionDescriptor and reading custom attribute information from MethodInfo. This is a reason to use ControllerActionDescriptor when logic depends on the reflected controller action method.
```

#### Visible code / API shape

```csharp
var cad = context.ActionDescriptor as ControllerActionDescriptor;
var attr = cad?.MethodInfo.GetCustomAttribute<...>();
```

---

### AEM01C-S004 / S-020 - `47c47bc723`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: MethodInfo gives access to method-level metadata

#### Visible meaning

```text
MethodInfo on ControllerActionDescriptor can be used to inspect return type, parameters and custom attributes. This is more detailed than endpoint metadata and only makes sense for MVC controller actions.
```

#### Visible code / API shape

```csharp
cad.MethodInfo.ReturnType
cad.MethodInfo.GetParameters()
cad.MethodInfo.GetCustomAttributes(...)
```

---

## 3. Cleaned source notes

- MVC filters expose ActionDescriptor through filter context.
- ControllerActionDescriptor adds controller/action-specific reflection info.
- MethodInfo is useful for reading controller method attributes and return/parameter information.
- Endpoint metadata and MVC ActionDescriptor are separate but both may exist for MVC controller endpoints.
- EndpointNameMetadata and RouteNameMetadata can both appear, but they are not identical concepts.

---

## 4. Question hooks

- How/why: MVC filters expose ActionDescriptor through filter context?
- How/why: ControllerActionDescriptor adds controller/action-specific reflection info?
- How/why: MethodInfo is useful for reading controller method attributes and return/parameter information?
- How/why: Endpoint metadata and MVC ActionDescriptor are separate but both may exist for MVC controller endpoints?
- How/why: EndpointNameMetadata and RouteNameMetadata can both appear, but they are not identical concepts?