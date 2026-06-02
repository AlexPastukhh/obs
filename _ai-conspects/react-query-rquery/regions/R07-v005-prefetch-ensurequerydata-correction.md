# R07 v005 - prefetch / ensureQueryData correction

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
This file processes `2` images for `R07`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Rebuild B commit, run Stage4x closure audit for all 71 queued sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
prefetch/fetchQuery/ensureQueryData correction addendum
```

Key ideas:

- Prefetch `staleTime` affects the prefetch operation, not future observer rules.
- `ensureQueryData({ revalidateIfStale: true })` can return cached data immediately and refetch stale data in the background.

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
S-189, S-195
```

Boundary decision:
```text
Included in R07 after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-189 | IU-189 | `a4fc92617d` | `verified-visible-from-contact-sheet` | prefetch staleTime does not stamp future useQuery observer freshness |
| S-195 | IU-195 | `4330f070b7` | `verified-visible-from-contact-sheet` | ensureQueryData revalidateIfStale returns cached data and refreshes in background |

---

## 2. Source transcript

### S-189 - prefetch staleTime does not stamp future useQuery observer freshness

Metadata:
```text
source_id: S-189
image_use_id: IU-189
fileId_short: a4fc92617d
image_file: S-189__a4fc92617d.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Then:

- prefetch won't refetch again within 10s
- and the component's `useQuery` will also consider that cached data fresh for 10s.

A compact rule:

Prefetch `staleTime` does not “stamp” the future `useQuery` observer with freshness rules. It only affects the prefetch operation itself. The later observer still uses its own `staleTime` or the QueryClient defaults.
```

#### Notes

Readable R07 correction.

---

### S-195 - ensureQueryData revalidateIfStale returns cached data and refreshes in background

Metadata:
```text
source_id: S-195
image_use_id: IU-195
fileId_short: 4330f070b7
image_file: S-195__4330f070b7.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`revalidateIfStale` on `ensureQueryData`

This is what makes `ensureQueryData` closer to “return now, maybe refresh in background.”

Behavior:

- if cache exists, return cached data immediately
- if that cached data is stale, also refetch in the background

So it becomes:

“Give me whatever we have now, but refresh if it's outdated.”

That is different from `fetchQuery`, which would wait for the fresh fetch result if data is stale.
```

#### Verified visible code
```tsx
const data = await queryClient.ensureQueryData({
  queryKey: ['todo', id],
  queryFn: () => fetchTodo(id),
  revalidateIfStale: true,
})
```

#### Notes

Readable R07 correction.

---

## 3. Cleaned source notes

- Prefetch `staleTime` affects the prefetch operation, not future observer rules.
- `ensureQueryData({ revalidateIfStale: true })` can return cached data immediately and refetch stale data in the background.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Prefetch `staleTime` affects the prefetch operation, not future observer rules. | S-189, S-195 plus source transcripts above | high |
| `ensureQueryData({ revalidateIfStale: true })` can return cached data immediately and refetch stale data in the background. | S-189, S-195 plus source transcripts above | high |

---

## 5. Open review issues

- This file is valid for Rebuild B because it contains visible text and no OCR-placeholder processed sources.
- After this archive, run Stage4x closure audit rather than starting a new transcript immediately.
- If diff review finds wording issues in a continuation card, fix with a precision patch.
