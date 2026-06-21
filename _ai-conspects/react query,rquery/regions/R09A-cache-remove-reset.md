# R09A - cache remove / reset

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **4x rebuild A / transcript v001**  
Generated: 2026-06-02 08:43:05 UTC

---

## Direction check

Goal:
Rebuild Batch A after invalidating the bad Stage4x OCR archive.

Done:
Stage4x-fixed preflight returned the corrected scope to pending.

Now:
This file processes `4` images for `R09A`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Batch A commit, process Batch B or run precision corrections if diff review finds issues.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
removeQueries / resetQueries / direct QueryCache access
```

Key ideas:

- `removeQueries` deletes cache entries and does not refetch.
- `resetQueries` keeps query entries, resets them to initial/preloaded state, notifies subscribers, and can refetch active queries.
- Direct `QueryCache` access is advanced; normal app code usually uses higher-level `QueryClient` methods.
- `QueryClient` is the control panel; `QueryCache` is the lower-level storage of query entries.

Reading quality:
```text
Readable from Stage4w2 contact sheets/source images.
No OCR-timeout, image-missing, or empty visible-text placeholder is used.
Some continuation cards are partial at card edges; those are marked in source notes.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-211, S-213, S-223, S-229
```

Boundary decision:
```text
Included in R09A after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-211 | IU-211 | `ed216f6b30` | `verified-visible-from-contact-sheet` | removeQueries deletes matching queries from cache |
| S-213 | IU-213 | `66a439f157` | `verified-visible-from-contact-sheet` | resetQueries resets query entry and can refetch active queries |
| S-223 | IU-223 | `4f209f3728` | `verified-visible-from-contact-sheet` | direct QueryCache API is advanced; high-level QueryClient methods usually enough |
| S-229 | IU-229 | `20e12516b1` | `verified-visible-from-contact-sheet` | queryClient.getQueryCache gives lower-level QueryCache object |

---

## 2. Source transcript

### S-211 - removeQueries deletes matching queries from cache

Metadata:
```text
source_id: S-211
image_use_id: IU-211
fileId_short: ed216f6b30
image_file: S-211__ed216f6b30.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`removeQueries` deletes matching queries from the cache. After that, the cached entry is just gone. It does not refetch, and it does not return anything.
```

#### Notes

Fully readable.

---

### S-213 - resetQueries resets query entry and can refetch active queries

Metadata:
```text
source_id: S-213
image_use_id: IU-213
fileId_short: 66a439f157
image_file: S-213__66a439f157.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`resetQueries` keeps the query entry but resets it back to its initial/pre-loaded state. It notifies subscribers, resets data to `initialData` if there was any, and if the query is active it will refetch. It returns a promise that resolves after active queries have been refetched.

A good mental model is:

- `removeQueries` = “forget this query ever existed”
- `resetQueries` = “put this query back to its starting state”

So if a component is mounted and using that query:

- after `resetQueries`, it stays subscribed to the query, sees the reset, and active queries refetch.
- after `removeQueries`, the cache entry is removed; there is no “reset and refetch” behavior described for it. The next time the query is needed, it will behave like a query with no cached entry.
```

#### Notes

Readable.

---

### S-223 - direct QueryCache API is advanced; high-level QueryClient methods usually enough

Metadata:
```text
source_id: S-223
image_use_id: IU-223
fileId_short: 4f209f3728
image_file: S-223__4f209f3728.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Usually you do not need it for normal app code, because higher-level methods like:

- `getQueryData`
- `setQueryData`
- `invalidateQueries`
- `removeQueries`

are easier and safer. Those are the normal API surface.

When you may need it:

Mostly advanced cases:

- inspecting all queries
- subscribing to cache-level changes
- building tooling
- custom debugging/instrumentation
- very custom integrations
```

#### Notes

Top continuation is cropped, but main list is readable.

---

### S-229 - queryClient.getQueryCache gives lower-level QueryCache object

Metadata:
```text
source_id: S-229
image_use_id: IU-229
fileId_short: 20e12516b1
image_file: S-229__20e12516b1.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example idea

Then you can work at the lower level with the cache object instead of only the higher-level `QueryClient` helpers.

Mental model:

- `QueryClient` = control panel
- `QueryCache` = actual storage for queries
```

#### Verified visible code
```tsx
const queryCache = queryClient.getQueryCache()
```

#### Notes

Readable.

---

## 3. Cleaned source notes

- `removeQueries` deletes cache entries and does not refetch.
- `resetQueries` keeps query entries, resets them to initial/preloaded state, notifies subscribers, and can refetch active queries.
- Direct `QueryCache` access is advanced; normal app code usually uses higher-level `QueryClient` methods.
- `QueryClient` is the control panel; `QueryCache` is the lower-level storage of query entries.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `removeQueries` deletes matching queries and does not refetch | S-211 | high |
| `resetQueries` resets entries, notifies subscribers, and can refetch active queries | S-213 | high |
| Direct QueryCache access is advanced; QueryClient helpers are usually safer | S-223, S-229 | high |

---

## 5. Open review issues

- This file is valid for Batch A because it contains visible text and no OCR-placeholder processed sources.
- Remaining Stage4x-fixed queue sources are not closed by this file.
- If diff review finds a wording issue in a partial continuation card, fix with a precision patch rather than reverting the whole batch.
