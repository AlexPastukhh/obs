# R04A v002 - static staleness correction

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **4y rebuild B / transcript v001**  
Generated: 2026-06-02 08:52:31 UTC

---

## Direction check

Goal:
Finish the Stage4x-fixed queue after Rebuild A.

Done:
Rebuild A processed R05/R09A/R09B with readable visible transcript.

Now:
This file processes `2` images for `R04A`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Rebuild B commit, run Stage4x closure audit for all 71 queued sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
static/staleness correction addendum
```

Key ideas:

- A query can have data, be stale, and be fetching at the same time.
- `staleTime: 'static'` overrides normal always-refetch triggers for mount/focus/reconnect.

Reading quality:
```text
Readable from Stage4w2 contact sheets/source images.
No OCR-timeout, image-missing, or empty visible-text placeholder is used.
Some cards are duplicated or continuation cards; those are marked in source notes.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-109, S-110
```

Boundary decision:
```text
Included in R04A after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-109 | IU-109 | `39e62ae511` | `verified-visible-from-contact-sheet` | query can have data, be stale, and be fetching at same time |
| S-110 | IU-110 | `96bd41a485` | `verified-visible-from-contact-sheet` | staleTime static overrides always refetch triggers |

---

## 2. Source transcript

### S-109 - query can have data, be stale, and be fetching at same time

Metadata:
```text
source_id: S-109
image_use_id: IU-109
fileId_short: 39e62ae511
image_file: S-109__39e62ae511.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
A query can:

- have data
- be stale
- be fetching

all at the same time.
```

#### Notes

Fully readable static/staleness correction.

---

### S-110 - staleTime static overrides always refetch triggers

Metadata:
```text
source_id: S-110
image_use_id: IU-110
fileId_short: 96bd41a485
image_file: S-110__96bd41a485.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Tiny example. Even with `"always"` on `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect`, the docs say those refetches still won't happen because `'static'` overrides them for those triggers.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['config'],
  queryFn: fetchConfig,
  staleTime: 'static',
  refetchOnMount: 'always',
  refetchOnWindowFocus: 'always',
  refetchOnReconnect: 'always',
})
```

#### Notes

Readable correction card; belongs to R04A static staleTime, not R09.

---

## 3. Cleaned source notes

- A query can have data, be stale, and be fetching at the same time.
- `staleTime: 'static'` overrides normal always-refetch triggers for mount/focus/reconnect.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| A query can have data, be stale, and be fetching at the same time. | S-109, S-110 plus source transcripts above | high |
| `staleTime: 'static'` overrides normal always-refetch triggers for mount/focus/reconnect. | S-109, S-110 plus source transcripts above | high |

---

## 5. Open review issues

- This file is valid for Rebuild B because it contains visible text and no OCR-placeholder processed sources.
- After this archive, run Stage4x closure audit rather than starting a new transcript immediately.
- If diff review finds wording issues in a continuation card, fix with a precision patch.
