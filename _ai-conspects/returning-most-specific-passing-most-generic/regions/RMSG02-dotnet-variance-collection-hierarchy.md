# RMSG02 - .NET generic/collection hierarchy and immutable collection consequence

Conspect: `returning-most-specific-passing-most-generic`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 09:11:01 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region maps the guideline to C# variance and collection API design.

Key ideas:
- Covariance/contravariance explain input/output positions.
- Choose collection interfaces according to needed operations.
- Immutable/read-only returns avoid copying and mutation errors.

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
S-006, S-007, S-008
```

Boundary decision:
```text
RMSG02 was processed in NEXT01. No boundary correction was required for this region.
No transcript regions remain; final closure/audit remains.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| RMSG02A-S001 | S-006 | IU-006 | `3b76c6d940` | RMSG02A | `verified-from-source-image` | no | Guideline in C#: variance |
| RMSG02A-S002 | S-007 | IU-007 | `8702fc2b30` | RMSG02A | `verified-from-source-image` | no | Collection interface hierarchy in .NET |
| RMSG02B-S001 | S-008 | IU-008 | `57937ca009` | RMSG02B | `verified-from-source-image` | no | Returned collection should be immutable |

---

## 2. Verified source transcript

## 2.1 RMSG02A

### RMSG02A-S001 / S-006 - `3b76c6d940`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Guideline in C#: variance

#### Visible meaning

```text
The C# grounding is covariance and contravariance. Generic type positions matter: return/output positions and argument/input positions have different variance constraints. The principle aligns with return-specific and accept-generic API design.
```

#### Visible code / API shape

```csharp
Covariance and contravariance
```

---

### RMSG02A-S002 / S-007 - `8702fc2b30`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Collection interface hierarchy in .NET

#### Visible meaning

```text
The hierarchy shows IEnumerable<T> at the top, with interfaces such as IReadOnlyCollection<T>, IReadOnlyList<T>, ICollection<T>, IList<T>, IQueryable<T>, and concrete types like Array. API signatures should pick the abstraction that exposes exactly what is needed.
```

#### Visible code / API shape

```csharp
IEnumerable<T>
IReadOnlyCollection<T>
IReadOnlyList<T>
ICollection<T>
IList<T>
IQueryable<T>
```

---

## 2.2 RMSG02B

### RMSG02B-S001 / S-008 - `57937ca009`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Returned collection should be immutable

#### Visible meaning

```text
The source says returned collection must be immutable. Benefits: no need to copy the collection defensively, and avoiding a whole class of mutation bugs. Returning a specific immutable/read-only shape can be more useful and safer.
```

#### Visible code / API shape

```csharp
ImmutableArray<T>
IReadOnlyList<T>
```

---

## 3. Cleaned source notes

- Covariance/contravariance explain input/output positions.
- Choose collection interfaces according to needed operations.
- Immutable/read-only returns avoid copying and mutation errors.

---

## 4. Question hooks

- How/why: Covariance/contravariance explain input/output positions?
- How/why: Choose collection interfaces according to needed operations?
- How/why: Immutable/read-only returns avoid copying and mutation errors?