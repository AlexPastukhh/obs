# R03 v002 - notify/select correction

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
This file processes `2` images for `R03`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Rebuild B commit, run Stage4x closure audit for all 71 queued sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
notifyOnChangeProps/select correction addendum
```

Key ideas:

- `select` narrows the data value; tracked props and notifyOnChangeProps control rerender triggers.
- Default tracked props already avoid rerenders from fields the component does not read.
- `notifyOnChangeProps: []` can support a special prefetch-like hook pattern.

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
S-065, S-066
```

Boundary decision:
```text
Included in R03 after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-065 | IU-065 | `1a557e01c2` | `verified-visible-from-contact-sheet` | select/default tracked props/notifyOnChangeProps mental model |
| S-066 | IU-066 | `3b93be2992` | `verified-visible-from-contact-sheet` | useQuery notifyOnChangeProps [] vs prefetchQuery timing |

---

## 2. Source transcript

### S-065 - select/default tracked props/notifyOnChangeProps mental model

Metadata:
```text
source_id: S-065
image_use_id: IU-065
fileId_short: 1a557e01c2
image_file: S-065__1a557e01c2.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
So the practical answer is:

- If you don't use `isPending`, `isLoading`, `isFetching`, etc., you usually don't need `notifyOnChangeProps` to suppress them — default tracking already does that.
- If you do use them, then their changes should re-render the component, because you asked for them.
- You use `notifyOnChangeProps` when you want stricter/manual control over which fields can trigger re-renders, or when you want zero subscription behavior like `[]`.

A good mental model is:

- `select` = “give me only this slice of `data`”
- default tracked props = “re-render only for query result fields I actually read”
- `notifyOnChangeProps` = “ignore automatic tracking and use this exact whitelist instead”
```

#### Notes

Readable correction card; belongs to R03, not R09.

---

### S-066 - useQuery notifyOnChangeProps [] vs prefetchQuery timing

Metadata:
```text
source_id: S-066
image_use_id: IU-066
fileId_short: 3b93be2992
image_file: S-066__3b93be2992.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Another reason is timing. `useQuery` participates naturally in the component lifecycle, while `prefetchQuery` is often used in:

- event handlers
- route loaders / router integration
- effects
- explicit preloading logic

So the practical advice is:

- If you want true prefetching, especially from a click, hover, route transition, loader, or explicit preload step, use `queryClient.prefetchQuery()`.
- If you want a component to kick off another query during render but not subscribe to updates from it, `useQuery({ notifyOnChangeProps: [] })` is a valid special-case pattern.
```

#### Notes

Readable correction card; belongs to R03 prefetch-like discussion.

---

## 3. Cleaned source notes

- `select` narrows the data value; tracked props and notifyOnChangeProps control rerender triggers.
- Default tracked props already avoid rerenders from fields the component does not read.
- `notifyOnChangeProps: []` can support a special prefetch-like hook pattern.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `select` narrows the data value; tracked props and notifyOnChangeProps control rerender triggers. | S-065, S-066 plus source transcripts above | high |
| Default tracked props already avoid rerenders from fields the component does not read. | S-065, S-066 plus source transcripts above | high |
| `notifyOnChangeProps: []` can support a special prefetch-like hook pattern. | S-065, S-066 plus source transcripts above | high |

---

## 5. Open review issues

- This file is valid for Rebuild B because it contains visible text and no OCR-placeholder processed sources.
- After this archive, run Stage4x closure audit rather than starting a new transcript immediately.
- If diff review finds wording issues in a continuation card, fix with a precision patch.
