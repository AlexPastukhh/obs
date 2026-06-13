# RMSG01 - Main guideline: accept generic, return specific

Conspect: `returning-most-specific-passing-most-generic`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 09:11:01 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region captures the main API design rule shown by object/pet/dog diagrams.

Key ideas:
- Accept generic input, return specific output.
- Do not limit consumers by returning an unnecessarily generic type.
- Avoid APIs that force consumers to downcast when the method knows a more specific result.

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
S-001, S-002, S-003, S-004, S-005
```

Boundary decision:
```text
RMSG01 was processed in NEXT01. No boundary correction was required for this region.
No transcript regions remain; final closure/audit remains.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| RMSG01A-S001 | S-001 | IU-001 | `4f101c5525` | RMSG01A | `verified-from-source-image` | no | Guideline statement |
| RMSG01A-S002 | S-002 | IU-002 | `fe393faa4c` | RMSG01A | `verified-from-source-image` | no | Accept most generic type |
| RMSG01B-S001 | S-003 | IU-003 | `3a0ae4bedf` | RMSG01B | `verified-from-source-image` | no | Return most specific type |
| RMSG01B-S002 | S-004 | IU-004 | `ade2a632af` | RMSG01B | `verified-from-source-image` | no | Avoid leaky abstraction when downcasting |
| RMSG01B-S003 | S-005 | IU-005 | `cc218458a7` | RMSG01B | `verified-from-source-image` | no | One-picture guideline |

---

## 2. Verified source transcript

## 2.1 RMSG01A

### RMSG01A-S001 / S-001 - `4f101c5525`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Guideline statement

#### Visible meaning

```text
Use the most generic types possible for arguments and the most specific types possible for return values. The caller should have flexibility when passing input, and should receive a rich enough type when consuming output.
```

---

### RMSG01A-S002 / S-002 - `fe393faa4c`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Accept most generic type

#### Visible meaning

```text
The diagram has Objects, Pets and Dogs. Feed applies to Pets but not Objects; Wash applies to Dogs but not Pets. For arguments, choose the most generic type that supports the operation. If Feed only needs Pet behavior, accept Pet rather than Dog.
```

#### Visible code / API shape

```csharp
void Feed(Pet pet)
```

---

## 2.2 RMSG01B

### RMSG01B-S001 / S-003 - `3a0ae4bedf`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Return most specific type

#### Visible meaning

```text
The source shows returning Pet from FindNextDogToWash as too weak. If the method actually returns a dog, returning Dog gives the caller more capability and avoids limiting consumers.
```

#### Visible code / API shape

```csharp
public static Dog FindNextDogToWash() { /* ... */ }
```

---

### RMSG01B-S002 / S-004 - `ade2a632af`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Avoid leaky abstraction when downcasting

#### Visible meaning

```text
The consumer calls FindNextDogToWash, gets a too-generic return value, and then must cast to Dog. That makes the method a leaky abstraction because callers know the result is really a Dog but the signature hides it.
```

#### Visible code / API shape

```csharp
Dog dog = (Dog)FindNextDogToWash();
```

---

### RMSG01B-S003 / S-005 - `cc218458a7`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: One-picture guideline

#### Visible meaning

```text
The picture shows utility as return values increasing toward the more specific type, and utility as arguments increasing toward the more generic type. Return specific; accept generic.
```

---

## 3. Cleaned source notes

- Accept generic input, return specific output.
- Do not limit consumers by returning an unnecessarily generic type.
- Avoid APIs that force consumers to downcast when the method knows a more specific result.

---

## 4. Question hooks

- How/why: Accept generic input, return specific output?
- How/why: Do not limit consumers by returning an unnecessarily generic type?
- How/why: Avoid APIs that force consumers to downcast when the method knows a more specific result?