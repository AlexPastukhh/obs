# R09C - validation / resumePausedMutations / offline mutations

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
This file processes `11` images for `R09C`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Rebuild B commit, run Stage4x closure audit for all 71 queued sources.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
validation/Zod and resumePausedMutations/offline mutation support
```

Key ideas:

- Mutations have `networkMode`; default `online` can pause/queue offline mutations.
- `resumePausedMutations()` matters mainly for paused mutations, especially persisted/hydrated offline mutations.
- Zod validation can prevent malformed API data from entering the cache.
- `always` does not pause because of offline; `offlineFirst` can try once and pause retries if needed.

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
S-196, S-199, S-201, S-209, S-210, S-215, S-218, S-220, S-222, S-226, S-227
```

Boundary decision:
```text
Included in R09C after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-196 | IU-196 | `5e844a74b1` | `verified-visible-from-contact-sheet` | offline mutations can queue and resume later |
| S-199 | IU-199 | `bf62b2d61c` | `verified-visible-from-contact-sheet` | mutation networkMode defaults and paused queued mutations |
| S-201 | IU-201 | `c9417e839c` | `verified-visible-from-contact-sheet` | response validation with Zod |
| S-209 | IU-209 | `1c40ea8745` | `verified-visible-from-contact-sheet` | Zod schema parse in query function |
| S-210 | IU-210 | `dfc5091fca` | `verified-visible-from-contact-sheet` | networkMode always does not pause; no need for resumePausedMutations |
| S-215 | IU-215 | `810e074c35` | `verified-visible-from-contact-sheet` | networkMode offlineFirst for mutations |
| S-218 | IU-218 | `213fe9db03` | `verified-visible-from-contact-sheet` | validation benefits and tradeoffs |
| S-220 | IU-220 | `819762c974` | `verified-visible-from-contact-sheet` | when resumePausedMutations matters |
| S-222 | IU-222 | `805253d94b` | `verified-visible-from-contact-sheet` | networkMode default and always example |
| S-226 | IU-226 | `2d9e66f8f9` | `verified-visible-from-contact-sheet` | resumePausedMutations on reconnect example |
| S-227 | IU-227 | `79a4777b2f` | `verified-visible-from-contact-sheet` | resumePausedMutations mainly for persisted/hydrated paused mutations |

---

## 2. Source transcript

### S-196 - offline mutations can queue and resume later

Metadata:
```text
source_id: S-196
image_use_id: IU-196
fileId_short: 5e844a74b1
image_file: S-196__5e844a74b1.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
32. Offline mutations

`networkMode` also matters for mutations.

Offline mutations can be queued and resumed later. That means several queued writes may replay on reconnect, so plan invalidation and side effects carefully.
```

#### Notes

Readable.

---

### S-199 - mutation networkMode defaults and paused queued mutations

Metadata:
```text
source_id: S-199
image_use_id: IU-199
fileId_short: bf62b2d61c
image_file: S-199__bf62b2d61c.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Yes — mutations do have a `networkMode` option. On `useMutation`, it can be `'online'`, `'always'`, or `'offlineFirst'`, and it defaults to `'online'`.

The important part:

`networkMode: 'online'` for mutations

This is the default. In this mode, queries and mutations will not fire unless there is network connection. When offline, they can be paused instead.

So this is the mode where offline mutations can end up paused/queued and later resumed. The mutations guide shows exactly that flow: a mutation can be paused while offline, dehydrated/hydrated, and then continued with `queryClient.resumePausedMutations()`.
```

#### Notes

Readable; bottom continuation noted but core is visible.

---

### S-201 - response validation with Zod

Metadata:
```text
source_id: S-201
image_use_id: IU-201
fileId_short: c9417e839c
image_file: S-201__c9417e839c.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
30. Response validation

Do not blindly trust API data.

Schema validation is useful for third-party or fragile APIs.

Using Zod:
```

#### Notes

Readable heading/intro.

---

### S-209 - Zod schema parse in query function

Metadata:
```text
source_id: S-209
image_use_id: IU-209
fileId_short: 1c40ea8745
image_file: S-209__1c40ea8745.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example TypeScript/Zod validation for fetched posts. The query function fetches JSON and returns `PostsSchema.parse(json)` so malformed API data throws instead of silently entering the cache.
```

#### Verified visible code
```tsx
import { z } from 'zod'

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
})

const PostsSchema = z.array(PostSchema)

async function fetchPosts() {
  const response = await fetch('/api/posts')
  if (!response.ok) throw new Error('Failed to fetch')

  const json = await response.json()
  return PostsSchema.parse(json)
}
```

#### Notes

Readable code card; lower edge is cropped but parse flow is visible.

---

### S-210 - networkMode always does not pause; no need for resumePausedMutations

Metadata:
```text
source_id: S-210
image_use_id: IU-210
fileId_short: dfc5091fca
image_file: S-210__dfc5091fca.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`networkMode: 'always'`

This means “ignore online/offline state.” TanStack says in `always` mode, queries and mutations always run and are not paused because of missing network. Retries also do not pause.

So for your question:

when they are being queued while offline, always, we just choose to run `resumePausedMutations` or not?

No.

With `always`, they generally are not paused/queued because of offline state in the first place. They try to run immediately; if they truly need network, they can just fail rather than sit paused waiting for resume.
```

#### Notes

Readable.

---

### S-215 - networkMode offlineFirst for mutations

Metadata:
```text
source_id: S-215
image_use_id: IU-215
fileId_short: 810e074c35
image_file: S-215__810e074c35.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`networkMode: 'offlineFirst'`

This is the middle ground. TanStack says it will run once, but then pause retries if needed. That mode is mainly useful when some cache/storage layer might satisfy the request first.
```

#### Notes

Readable.

---

### S-218 - validation benefits and tradeoffs

Metadata:
```text
source_id: S-218
image_use_id: IU-218
fileId_short: 213fe9db03
image_file: S-218__213fe9db03.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Benefits:

- catches malformed data early
- throws into normal query error handling
- can reduce useless data in cache if schema strips/reshapes

Tradeoff:

- runtime validation costs performance
- expensive for very large payloads
```

#### Notes

Readable.

---

### S-220 - when resumePausedMutations matters

Metadata:
```text
source_id: S-220
image_use_id: IU-220
fileId_short: 819762c974
image_file: S-220__819762c974.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
So when does `resumePausedMutations()` matter?

It matters when you actually have paused mutations — typically with offline behavior under the default `online` mode, especially if you persist them across app reloads. The docs show calling `queryClient.resumePausedMutations()` after hydration/restore for that case.

Best mental model:

- `online` → offline can pause/queue mutations; `resumePausedMutations()` is relevant.
- `always` → doesn't pause because of offline; usually nothing to “resume”.
- `offlineFirst` → try once, then pause retries if network is needed.
```

#### Notes

Readable.

---

### S-222 - networkMode default and always example

Metadata:
```text
source_id: S-222
image_use_id: IU-222
fileId_short: 805253d94b
image_file: S-222__805253d94b.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
31.3 `networkMode`

Default: `'online'`

Pauses network-dependent queries when offline.

`'always'`

Use when the query does not actually need network.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['localValue'],
  queryFn: () => Promise.resolve(1),
  networkMode: 'always',
})
```

#### Notes

Readable.

---

### S-226 - resumePausedMutations on reconnect example

Metadata:
```text
source_id: S-226
image_use_id: IU-226
fileId_short: 2d9e66f8f9
image_file: S-226__2d9e66f8f9.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example. Add an online listener and call `queryClient.resumePausedMutations()` on reconnect.

Mental model:

- paused mutation = “write is queued/waiting”
- `resumePausedMutations` = “continue those writes now”
```

#### Verified visible code
```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

window.addEventListener('online', () => {
  queryClient.resumePausedMutations()
})
```

#### Notes

Readable.

---

### S-227 - resumePausedMutations mainly for persisted/hydrated paused mutations

Metadata:
```text
source_id: S-227
image_use_id: IU-227
fileId_short: 79a4777b2f
image_file: S-227__79a4777b2f.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Usually no, not in the normal “same app session reconnects” case.

With `networkMode: 'offlineFirst'`, TanStack Query will keep the mutation once, and if retries are needed it can pause those retries when there is no network. For paused work, TanStack Query's network mode behavior is that it can continue once connectivity returns; that “continue when back online” behavior is built into the paused/retry mechanism.

`resumePausedMutations()` is mainly needed when you have paused mutations that were persisted and then restored, such as after a page reload or app restart. The mutations guide shows the pattern: dehydrate state, hydrate it later, then call `queryClient.resumePausedMutations()`. It also notes that if you persist offline mutations, they cannot be resumed after reload unless you provide a default mutation function.
```

#### Notes

Readable.

---

## 3. Cleaned source notes

- Mutations have `networkMode`; default `online` can pause/queue offline mutations.
- `resumePausedMutations()` matters mainly for paused mutations, especially persisted/hydrated offline mutations.
- Zod validation can prevent malformed API data from entering the cache.
- `always` does not pause because of offline; `offlineFirst` can try once and pause retries if needed.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Mutations have `networkMode`; default `online` can pause/queue offline mutations. | S-196, S-199, S-201, S-209 plus source transcripts above | high |
| `resumePausedMutations()` matters mainly for paused mutations, especially persisted/hydrated offline mutations. | S-196, S-199, S-201, S-209 plus source transcripts above | high |
| Zod validation can prevent malformed API data from entering the cache. | S-196, S-199, S-201, S-209 plus source transcripts above | high |
| `always` does not pause because of offline; `offlineFirst` can try once and pause retries if needed. | S-196, S-199, S-201, S-209 plus source transcripts above | high |

---

## 5. Open review issues

- This file is valid for Rebuild B because it contains visible text and no OCR-placeholder processed sources.
- After this archive, run Stage4x closure audit rather than starting a new transcript immediately.
- If diff review finds wording issues in a continuation card, fix with a precision patch.
