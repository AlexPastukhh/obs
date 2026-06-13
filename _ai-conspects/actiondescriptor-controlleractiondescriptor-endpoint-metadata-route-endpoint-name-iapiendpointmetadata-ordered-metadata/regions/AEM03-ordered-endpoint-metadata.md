# AEM03 - Ordered metadata and ordered endpoint metadata lookup

Conspect: `actiondescriptor-controlleractiondescriptor-endpoint-metadata-route-endpoint-name-iapiendpointmetadata-ordered-metadata`  
File type: **source-preserving region transcript**  
Stage: **3 / NEXT02 verified transcript v001**  
Generated: 2026-06-13 10:41:31 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region covers how metadata order affects lookup and effective behavior.

Key ideas:
- Endpoint metadata is an ordered collection.
- GetMetadata<T>() selects the effective metadata item.
- GetOrderedMetadata<T>() returns all matching items in order.
- Order matters for auth, CORS, filters and custom conventions.

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
S-032, S-033, S-034, S-035, S-036
```

Boundary decision:
```text
AEM03 was processed in NEXT02. No boundary correction was required for this region.
No transcript regions remain; final closure/audit remains.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| AEM03A-S001 | S-032 | IU-032 | `59cf456c4c` | AEM03A | `verified-from-source-image` | no | Ordered metadata overview |
| AEM03A-S002 | S-033 | IU-033 | `f1b376a0b4` | AEM03A | `verified-from-source-image` | no | GetMetadata returns last/highest-priority metadata |
| AEM03A-S003 | S-034 | IU-034 | `d861e75fdb` | AEM03A | `verified-from-source-image` | no | GetOrderedMetadata returns all relevant metadata in order |
| AEM03B-S001 | S-035 | IU-035 | `b557687361` | AEM03B | `verified-from-source-image` | no | Order matters for auth/CORS/custom metadata |
| AEM03B-S002 | S-036 | IU-036 | `f607ed2bf0` | AEM03B | `verified-from-source-image` | no | Practical ordered metadata mental model |

---

## 2. Verified source transcript

## 2.1 AEM03A

### AEM03A-S001 / S-032 - `59cf456c4c`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Ordered metadata overview

#### Visible meaning

```text
Endpoint metadata has ordering semantics. Some metadata consumers care about order, and APIs such as GetMetadata<T>() and GetOrderedMetadata<T>() reflect endpoint metadata ordering behavior.
```

#### Visible code / API shape

```csharp
GetMetadata<T>()
GetOrderedMetadata<T>()
```

---

### AEM03A-S002 / S-033 - `f1b376a0b4`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: GetMetadata returns last/highest-priority metadata

#### Visible meaning

```text
The source emphasizes that when multiple metadata items of the same type exist, GetMetadata<T>() selects according to metadata ordering, commonly the most specific/latest one.
```

#### Visible code / API shape

```csharp
var item = endpoint.Metadata.GetMetadata<T>();
```

---

### AEM03A-S003 / S-034 - `d861e75fdb`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: GetOrderedMetadata returns all relevant metadata in order

#### Visible meaning

```text
GetOrderedMetadata<T>() is used when the consumer must inspect all metadata instances in the configured order, not just the single effective value.
```

#### Visible code / API shape

```csharp
var all = endpoint.Metadata.GetOrderedMetadata<T>();
```

---

## 2.2 AEM03B

### AEM03B-S001 / S-035 - `b557687361`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Order matters for auth/CORS/custom metadata

#### Visible meaning

```text
Metadata order can matter for authorization, filters, CORS, custom conventions and endpoint-specific overrides. Higher-level/group metadata and endpoint-local metadata can combine; consumers must respect the intended order.
```

#### Visible code / API shape

```csharp
group.RequireAuthorization();
endpoint.AllowAnonymous();
```

---

### AEM03B-S002 / S-036 - `f607ed2bf0`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Practical ordered metadata mental model

#### Visible meaning

```text
Think of endpoint metadata as an ordered list built from conventions, groups and endpoint-specific additions. A consumer either asks for the effective item or walks the ordered list depending on semantics.
```

#### Visible code / API shape

```csharp
Endpoint.Metadata: [group metadata, convention metadata, endpoint metadata]
```

---

## 3. Cleaned source notes

- Endpoint metadata is an ordered collection.
- GetMetadata<T>() selects the effective metadata item.
- GetOrderedMetadata<T>() returns all matching items in order.
- Order matters for auth, CORS, filters and custom conventions.

---

## 4. Question hooks

- How/why: Endpoint metadata is an ordered collection?
- How/why: GetMetadata<T>() selects the effective metadata item?
- How/why: GetOrderedMetadata<T>() returns all matching items in order?
- How/why: Order matters for auth, CORS, filters and custom conventions?