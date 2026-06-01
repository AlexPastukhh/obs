# R01 - Binding Source Attributes

Conspect: `BINDING SOURCE ATTRIBUTES`  
File type: **source-preserving region transcript**  
Stage: **3 / compact verified transcript**  
Generated: 2026-06-01 20:31:14 UTC

## Direction check

Goal:
Convert `BINDING SOURCE ATTRIBUTES` into source-preserving AI-readable text.

Now:
The uploaded SVG was parsed as the source container and its 3 embedded screenshots were visually read.

This step:
Create the verified region transcript, cleaned notes, evidence table, and reading quality overview.

Why:
This proves the intended workflow works: SVG -> embedded images -> visual reading -> source-grounded transcript.

Next:
1. Review this transcript against the original SVG/images.
2. If accepted, use this region as the complete processed output for this tiny conspect.
3. Generate repetition questions only if requested.

---

## 0.1 Area overview / key ideas / reading quality

What the area is about overall:
This area explains ASP.NET Core binding source attributes: where an action parameter should be bound from - body, form-data, header, query string, route tokens, or DI services. It then shows an explicit attribute example and explains how `[ApiController]` changes binding inference.

Key ideas:

```text
- [FromBody] reads and deserializes the request body.
- [FromForm] reads form-encoded or multipart form data.
- [FromHeader] binds from an HTTP header.
- [FromQuery] binds from the query string.
- [FromRoute] binds from route template tokens.
- [FromServices] resolves from the DI container.
- [ApiController] enables binding source inference.
- Complex classes/DTOs are inferred as [FromBody].
- IFormFile / IFormFileCollection are inferred as [FromForm].
- Parameters matching route tokens are inferred as [FromRoute].
- Other simple/primitive parameters are inferred as [FromQuery].
```

How well the AI perceived/understood the ideas:
The area was perceived clearly. The conspect is small and linear: first a list of binding source attributes, then an explicit controller/action example, then `[ApiController]` inference rules.

How well the source was read:
The SVG contains 3 embedded screenshots. All 3 screenshots were visually read. The main prose is readable with high confidence.

Known reading limitations / cropped / unclear sources:
`BSA-S003` has a code block with a horizontal scrollbar / hidden continuation. Only the visible part of the code block is transcribed. The `CreateAuthor` method body is not visible.

Confidence summary:

```text
source structure confidence: high
visual reading confidence: high
exact prose transcript confidence: high
visible code transcript confidence: medium-high
cropped/hidden code: yes, BSA-S003 code block
overall semantic confidence: high
```

---

## 1. Source / layout map

```text
SVG canvas: 1098 x 1076.78

Spatial order:
1. Top image    -> BSA-S001 / cff6870722 / binding source attributes list
2. Middle image -> BSA-S003 / bbda8972bc / explicit attributes example
3. Bottom image -> BSA-S002 / b2e22dce47 / [ApiController] inference rules
```

| Source ID | fileId short | Layout position | Read status | Notes |
|---|---|---|---|---|
| BSA-S001 | `cff6870722` | top | verified-visible | readable |
| BSA-S003 | `bbda8972bc` | middle | verified-visible-partial-code | code block has visible scrollbar / hidden continuation |
| BSA-S002 | `b2e22dce47` | bottom | verified-visible | readable |

---

## 2. Verified visible transcript

### BSA-S001 - Binding source attributes list

```text
Binding source attributes (what each one does)

- [FromBody] - read the request body and deserialize it (JSON, XML depending on input formatters).
  Used for complex objects in JSON APIs.

- [FromForm] - read form-encoded data or multipart/form-data (good for IFormFile, form fields).

- [FromHeader] - bind a parameter from an HTTP header.

- [FromQuery] - bind from the query string (e.g. ?page=2).

- [FromRoute] - bind from route tokens in the URL template (e.g. {id} in route).

- [FromServices] - get the value from DI container (inject a service directly into an action parameter).
```

---

### BSA-S003 - Example: explicit attributes

```text
Example (explicit attributes)
```

Visible code block:

```csharp
[HttpGet("{authorId}", Name = "GetAuthor")]
public async Task<ActionResult<AuthorDto>> GetAuthor([FromRoute] Guid authorId) { ... }

[HttpPost]
public async Task<ActionResult<AuthorDto>> CreateAuthor([FromBody] AuthorForCreationDto author) {
```

Visible notes:

```text
- GetAuthor: authorId is read from the route.
- CreateAuthor: author is deserialized from the request body JSON.
```

Reading note:

```text
The code block has a horizontal scrollbar / cropped visible area.
Only the visible code is transcribed.
The method body for CreateAuthor is not visible.
```

---

### BSA-S002 - What `[ApiController]` changes

```text
What [ApiController] changes (the important inference rules)

When a controller is decorated with [ApiController], ASP.NET Core applies binding inference automatically:

1. Complex types (classes/DTOs) -> inferred as [FromBody] (so you don't need to add [FromBody]).

2. Parameters of type IFormFile / IFormFileCollection -> inferred as [FromForm].

3. Parameters whose name matches a route token -> inferred as [FromRoute].

4. Any other simple/primitive parameter (string, int, bool, GUID not matching a route token, etc.) ->
   inferred as [FromQuery].
```

---

## 3. Cleaned source notes

### Binding source attributes

`[FromBody]` means the parameter is read from the request body and deserialized, usually from JSON/XML depending on input formatters. It is used for complex objects in JSON APIs.

`[FromForm]` means the parameter is read from form data, including `multipart/form-data`; this is relevant for `IFormFile` and form fields.

`[FromHeader]` means the parameter is bound from an HTTP header.

`[FromQuery]` means the parameter is bound from the query string, for example `?page=2`.

`[FromRoute]` means the parameter is bound from route tokens in the URL template, for example `{id}` in a route.

`[FromServices]` means the value is resolved from the DI container and injected into the action parameter.

### Explicit attributes example

In the `GetAuthor` example, `[FromRoute] Guid authorId` means `authorId` is read from the route.

In the `CreateAuthor` example, `[FromBody] AuthorForCreationDto author` means `author` is deserialized from the request body JSON.

### `[ApiController]` inference rules

With `[ApiController]`, ASP.NET Core can infer the binding source automatically.

Complex classes/DTOs are inferred as `[FromBody]`.

`IFormFile` and `IFormFileCollection` are inferred as `[FromForm]`.

Parameters whose name matches a route token are inferred as `[FromRoute]`.

Other simple/primitive parameters, such as `string`, `int`, `bool`, or `GUID` that does not match a route token, are inferred as `[FromQuery]`.

---

## 4. Evidence table

| Claim | Evidence | Source | Confidence |
|---|---|---|---|
| `[FromBody]` reads and deserializes request body | explicit bullet in BSA-S001 | screenshot text | high |
| `[FromForm]` reads form data / multipart form data | explicit bullet in BSA-S001 | screenshot text | high |
| `[FromHeader]` binds from HTTP header | explicit bullet in BSA-S001 | screenshot text | high |
| `[FromQuery]` binds from query string | explicit bullet in BSA-S001 | screenshot text | high |
| `[FromRoute]` binds from route tokens | explicit bullet in BSA-S001 | screenshot text | high |
| `[FromServices]` resolves from DI container | explicit bullet in BSA-S001 | screenshot text | high |
| `GetAuthor` uses `[FromRoute] Guid authorId` | code + note in BSA-S003 | screenshot code/text | high |
| `CreateAuthor` uses `[FromBody] AuthorForCreationDto author` | code + note in BSA-S003 | screenshot code/text | high for visible signature |
| `[ApiController]` applies binding inference automatically | heading/body in BSA-S002 | screenshot text | high |
| Complex DTOs infer `[FromBody]` | rule 1 in BSA-S002 | screenshot text | high |
| `IFormFile` / `IFormFileCollection` infer `[FromForm]` | rule 2 in BSA-S002 | screenshot text | high |
| Route-token name match infers `[FromRoute]` | rule 3 in BSA-S002 | screenshot text | high |
| Other simple/primitive params infer `[FromQuery]` | rule 4 in BSA-S002 | screenshot text | high |

---

## 5. Question hooks

```text
What does [FromBody] bind from?
When would [FromForm] be used?
What is the difference between [FromQuery] and [FromRoute]?
What does [FromServices] do?
In the GetAuthor example, why is authorId [FromRoute]?
In the CreateAuthor example, why is author [FromBody]?
What does [ApiController] change about binding source inference?
How does ASP.NET Core infer binding for complex DTOs?
How does ASP.NET Core infer binding for IFormFile?
What happens when a parameter name matches a route token?
Where do simple primitive parameters come from if they do not match route tokens?
```

---

## 6. Remaining limitations

```text
BSA-S001: fully readable.
BSA-S002: fully readable.
BSA-S003: prose and visible code readable; code block has hidden/cropped continuation due horizontal scrollbar.
```
