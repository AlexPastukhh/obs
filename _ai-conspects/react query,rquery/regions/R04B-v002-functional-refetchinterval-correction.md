# R04B v002 - functional refetchInterval correction

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
This file processes `1` images for `R04B`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Rebuild B commit, run Stage4x closure audit for all 71 queued sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
functional refetchInterval correction addendum
```

Key ideas:

- Functional `refetchInterval` can keep polling while a condition is false and stop by returning `false`.

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
S-113
```

Boundary decision:
```text
Included in R04B after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-113 | IU-113 | `2bc6c3c458` | `verified-visible-from-contact-sheet` | functional refetchInterval stops polling when condition met |

---

## 2. Source transcript

### S-113 - functional refetchInterval stops polling when condition met

Metadata:
```text
source_id: S-113
image_use_id: IU-113
fileId_short: 2bc6c3c458
image_file: S-113__2bc6c3c458.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
13.1 Functional `refetchInterval`

You can stop polling when a condition is met.

Return:

- number → keep polling
- `false` → stop polling
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['totalAmount'],
  queryFn: fetchTotalAmount,
  refetchInterval: (query) => {
    return query.state.data?.finished ? false : 3000
  },
})
```

#### Notes

Readable correction card; belongs to R04B polling/refetchInterval.

---

## 3. Cleaned source notes

- Functional `refetchInterval` can keep polling while a condition is false and stop by returning `false`.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Functional `refetchInterval` can keep polling while a condition is false and stop by returning `false`. | S-113 plus source transcripts above | high |

---

## 5. Open review issues

- This file is valid for Rebuild B because it contains visible text and no OCR-placeholder processed sources.
- After this archive, run Stage4x closure audit rather than starting a new transcript immediately.
- If diff review finds wording issues in a continuation card, fix with a precision patch.
