# R09D - Offline / fetchStatus / resume tail

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **5c / large remaining transcript v001**  
Generated: 2026-06-02 12:10:41 UTC

---

## Direction check

Goal:
Close the remaining Stage5a candidates in one larger pass.

Done:
Stage5b closed R12/R13/R15.

Now:
This file processes `21` sources for `R09D`.

Why:
The user asked to take more; Stage5c processes all remaining Stage5a sources in separate region files.

Next:
After Stage5c review/commit, run closure audit for S-261..S-383.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
NetworkMode tail: online/always/offlineFirst, fetchStatus paused, offline-aware UI, and resumePausedMutations.
```

Key ideas:

- `networkMode: 'online'` is the default and can pause network-dependent work while offline.
- `fetchStatus: 'paused'` means work wanted to fetch but could not proceed.
- `networkMode: 'always'` ignores online/offline state and is for work that does not need network.
- `networkMode: 'offlineFirst'` can try cache/storage-backed work first and pause retries when network is needed.
- `resumePausedMutations()` matters for actual paused mutations, especially persisted/hydrated offline mutations.

Reading quality:
```text
Visible text was read from Stage5a source images with OCR assistance and manual fixes for the OCR-timeout cards.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is marked processed.
Because this is a large 86-image pass, any later wording issue should be fixed with a precision patch, not by reverting the whole batch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-275, S-280, S-281, S-282, S-286, S-291, S-294, S-296, S-301, S-302, S-312, S-314, S-327, S-334, S-284, S-290, S-303, S-309, S-311, S-320, S-326
```

Boundary decision:
```text
Included in R09D after Stage5c local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-275 | IU-275 | `5e844a74b1` | `verified-visible-ocr-assisted` | 32. Offline mutations |
| S-280 | IU-280 | `c078f2032f` | `verified-visible-ocr-assisted` | 1) Default: networkMode: ‘online’ |
| S-281 | IU-281 | `17f9a3bf92` | `verified-visible-ocr-assisted` | DOES ONLINE OPTION PAUSES QUERY WHEN IT HAS DATA IN REQCTQ |
| S-282 | IU-282 | `c6a05bb126` | `verified-visible-ocr-assisted` | 31. Offline behavior and networkMode |
| S-286 | IU-286 | `635b0dd4d8` | `verified-visible-ocr-assisted` | Example: network-dependent |
| S-291 | IU-291 | `d894c9608c` | `verified-visible-ocr-assisted` | 31.2 Offline-aware UI |
| S-294 | IU-294 | `73d84c25d2` | `verified-visible-ocr-assisted` | 2) networkMode: ‘always* |
| S-296 | IU-296 | `810e074c35` | `verified-visible-ocr-assisted` | networkMode: ‘offlineFirst’ |
| S-301 | IU-301 | `805253d94b` | `verified-visible-ocr-assisted` | 31.3 networkMode |
| S-302 | IU-302 | `819762c974` | `verified-visible-ocr-assisted` | So when does resumePausedMutations() matter? |
| S-312 | IU-312 | `79a4777b2f` | `verified-visible-ocr-assisted` | Usually no, not in the normal “same app session reconnects” case. |
| S-314 | IU-314 | `ad15f92387` | `verified-visible-ocr-assisted` | Mixed / cache-backed fetches |
| S-327 | IU-327 | `40b7d5950d` | `verified-visible-ocr-assisted` | The key point is that offlineFirst is about whether the query is allowed to try running wh |
| S-334 | IU-334 | `8fdcc18b67` | `verified-visible-ocr-assisted` | Best mental model |
| S-284 | IU-284 | `bf62b2d61c` | `verified-visible-ocr-assisted` | Yes — mutations do have a networkMode option. On useMutation, itcan be ‘online’ \| ‘always' |
| S-290 | IU-290 | `dfc5091fca` | `verified-visible-ocr-assisted` | networkmode: ‘always* |
| S-303 | IU-303 | `af413353f2` | `verified-visible-ocr-assisted` | Example: computed async value |
| S-309 | IU-309 | `33ec33e3f6` | `verified-visible-ocr-assisted` | “‘offlineFirst" |
| S-311 | IU-311 | `80e917c63d` | `verified-visible-ocr-assisted` | 3) networkMode: ‘offlineFirst' |
| S-320 | IU-320 | `921a92e2c6` | `verified-visible-ocr-assisted` | Example: fetch that may be served from cache |
| S-326 | IU-326 | `8fb60bf0f8` | `verified-visible-ocr-assisted` | Why this can make sense: |

---

## 2. Source transcript

### S-275 - 32. Offline mutations

Metadata:
```text
source_id: S-275
image_use_id: IU-275
fileId_short: 5e844a74b1
image_file: S-275__5e844a74b1.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
32. Offline mutations
networkMode also matters for mutations.
Offline mutations can be queued and resumed later.
That means several queued writes may replay on reconnect, so plan invalidation and side effects carefully.
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-280 - 1) Default: networkMode: ‘online’

Metadata:
```text
source_id: S-280
image_use_id: IU-280
fileId_short: c078f2032f
image_file: S-280__c078f2032f.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
1) Default: networkMode: ‘online’

This is the default mode. It assumes your query normally depends on network access. The docs say it pauses
network-dependent queries when offline, and if a query was already running when you go offline, the retry
mechanism is paused and continues when connection returns. — tanstack +1
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-281 - DOES ONLINE OPTION PAUSES QUERY WHEN IT HAS DATA IN REQCTQ

Metadata:
```text
source_id: S-281
image_use_id: IU-281
fileId_short: 17f9a3bf92
image_file: S-281__17f9a3bf92.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
DOES ONLINE OPTION PAUSES QUERY WHEN IT HAS DATA IN REQCTQ
CACHE?
Zlyman Ha npotsxKeHun 11s >
Not automatically.
With default networkMode: ‘online’ , a query is paused only when it wants to fetch but cannot because
there is no network connection. TanStack defines fetchStatus: ‘paused’ as “the query wanted to fetch, but
has been paused.”  tanstackcom = 1
So if the query already has cached data:
¢ it can still show that cached data
¢ and it is only paused if a fetch/refetch should happen at that moment and offline prevents it.
tanstack.com +1
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-282 - 31. Offline behavior and networkMode

Metadata:
```text
source_id: S-282
image_use_id: IU-282
fileId_short: c6a05bb126
image_file: S-282__c6a05bb126.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
31. Offline behavior and networkMode
31.1 Paused queries
When offline, queries may become paused instead of fetching.
Possible state:

“) TypeScript

status: ‘pending’

fetchStatus: "paused"

data: undefined
This is why isLoading is not the same as status === ‘pending’ .
A paused query is not actively loading.
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-286 - Example: network-dependent

Metadata:
```text
source_id: S-286
image_use_id: IU-286
fileId_short: 635b0dd4d8
image_file: S-286__635b0dd4d8.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Example: network-dependent
“) TypeScript a.)
useQuery({
queryKey: ['‘todos'],
queryFn: async () => {
const res = await fetch('/api/todos')
return res.json()
}
))
This query is network-dependent because:
¢ it calls a remote API
* no internet usually means no successful fetch
How it works in online mode:
¢ online — it fetches normally
¢ offline before it starts > it can be paused instead of actively fetching
¢ offline during retries — retries pause and continue later when back online. —tanstack +:
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-291 - 31.2 Offline-aware UI

Metadata:
```text
source_id: S-291
image_use_id: IU-291
fileId_short: d894c9608c
image_file: S-291__d894c9608c.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
31.2 Offline-aware UI
«> TypeScript 6
function Repos() {
const { data, status, fetchStatus } = useQuery({
querykey: [‘repos'],
queryFn: fetchRepos,
»
if (status === 'pending' && fetchStatus === 'paused') {
return <div>Offline</div>
3
if (status === 'pending' && fetchStatus === 'fetching') {
return <div>Loading. ..</div>
3
return (
<div>
{fetchStatus === ‘paused’ && <div>Offline</div>}
<ul>
{data?.map((repo) => (
<li key={repo.id}>{repo.name}</1i>
))}
</ul>
</div>
) v
+
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-294 - 2) networkMode: ‘always*

Metadata:
```text
source_id: S-294
image_use_id: IU-294
fileId_short: 73d84c25d2
image_file: S-294__73d84c25d2.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
2) networkMode: ‘always*
This mode tells TanStack Query to ignore online/offline state and always run the query. The docs say queries
are never paused because of connectivity in this mode, and retries also do not pause. test
Use this when the query function does not really need a network.
Example: local storage / IndexedDB / AsyncStorage
«> TypeScript oO
useQuery({
querykey: ['draftSettings'],
queryFn: async () => {
const raw = localStorage.getItem('draftSettings')
return raw ? JSON.parse(raw) : { theme: ‘dark’ }
Lb
networkMode: 'always",
3)
Why this is not network-dependent:
* it reads from browser storage
* internet connection is irrelevant Vv
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-296 - networkMode: ‘offlineFirst’

Metadata:
```text
source_id: S-296
image_use_id: IU-296
fileId_short: 810e074c35
image_file: S-296__810e074c35.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
networkMode: ‘offlineFirst’
This is the middle ground. TanStack says it will run once, but then pause retries if needed. That mode is
mainly useful when some cache/storage layer might satisfy the request first. tanstackcom +1
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-301 - 31.3 networkMode

Metadata:
```text
source_id: S-301
image_use_id: IU-301
fileId_short: 805253d94b
image_file: S-301__805253d94b.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
31.3 networkMode

Default: ‘online’

Pauses network-dependent queries when offline.

*always*
Use when the query does not actually need network.
«> TypeScript oO
useQuery({
queryKey: ['localValue'],
queryfn: () => Promise.resolve(7),
networkMode: 'always",

»
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-302 - So when does resumePausedMutations() matter?

Metadata:
```text
source_id: S-302
image_use_id: IU-302
fileId_short: 819762c974
image_file: S-302__819762c974.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
So when does resumePausedMutations() matter?
It matters when you actually have paused mutations — typically with offline behavior under the default
online mode, especially if you persist them across app reloads. The docs show calling
queryClient.resumePausedMutations() after hydration/restore for that case.  tanstaccom -
Best mental model:

* online — offline can pause/queue mutations; resumePausedMutations() is relevant. tanstacccom ~

* (always — don’t pause because of offline; usually nothing to “resume.” tansackcom

© offlineFirst — try once, then pause retries if network is needed. tanstckcom +
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-312 - Usually no, not in the normal “same app session reconnects” case.

Metadata:
```text
source_id: S-312
image_use_id: IU-312
fileId_short: 79a4777b2f
image_file: S-312__79a4777b2f.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Usually no, not in the normal “same app session reconnects” case.
With networkMode: ‘offlineFirst’ , TanStack Query will run the mutation once, and if retries are needed it
can pause those retries when there is no network. For paused work, TanStack Query’s network mode
behavior is that it can continue once connectivity returns; that “continue when back online” behavior is built
into the paused/retry mechanism.  tansactcom -

resumePausedMutations() is mainly needed when you have paused mutations that were persisted and then
restored, such as after a page reload or app restart. The mutations guide shows the pattern: dehydrate state,
hydrate it later, then call queryClient .resumePausedMutations() . It also notes that if you persist offline
mutations, they cannot be resumed after reload unless you provide a default mutation function. tantactcom
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-314 - Mixed / cache-backed fetches

Metadata:
```text
source_id: S-314
image_use_id: IU-314
fileId_short: ad15f92387
image_file: S-314__ad15f92387.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Mixed / cache-backed fetches
Use offlineFirst when:
* query may still succeed due to cache
* but real retries should wait for connectivity
Example:
> TypeScript
useQuery({
querykey: ['catalog'],
queryFn: () => fetch('/api/catalog').then(r => r.json()),
networkMode: 'offlineFirst',
3)
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-327 - The key point is that offlineFirst is about whether the query is allowed to try running wh

Metadata:
```text
source_id: S-327
image_use_id: IU-327
fileId_short: 40b7d5950d
image_file: S-327__40b7d5950d.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
The key point is that offlineFirst is about whether the query is allowed to try running while offline, not
a guarantee that the data is up to date. TanStack describes offlineFirst as useful when “cached data or
data storage mechanisms” can make the request succeed, while retries wait for connectivity.

So there are two different freshness layers here:

1. Browser / service worker / HTTP cache freshness

If your fetch() is satisfied from some cache while offline, that cached response may be old. offlineFirst
does not make it fresh. It just allows the request attempt to happen even when offline, which is useful if
some cache layer can answer it.
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-334 - Best mental model

Metadata:
```text
source_id: S-334
image_use_id: IU-334
fileId_short: 8fdcc18b67
image_file: S-334__8fdcc18b67.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Best mental model

offlineFirst means:

“Try now, even offline, because some local/network cache might satisfy the request.”
It does not mean:

“The data is guaranteed current”
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-284 - Yes — mutations do have a networkMode option. On useMutation, itcan be ‘online’ | ‘always'

Metadata:
```text
source_id: S-284
image_use_id: IU-284
fileId_short: bf62b2d61c
image_file: S-284__bf62b2d61c.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Yes — mutations do have a networkMode option. On useMutation, itcan be ‘online’ | ‘always' |
*offlineFirst’ , and it defaults to ‘online’ . tontacecom
The important part:

networkMode: ‘online’ for mutations
This is the default. In this mode, queries and mutations will not fire unless there is network connection.
When offline, they can be paused instead, nstckcom

So this is the mode where offline mutations can end up paused/queued and later resumed. The mutations
guide shows exactly that flow: a mutation can be paused while offline, dehydrated/hydrated, and then
continued with queryClient.resumePausedMutations() . tanstackcom +
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-290 - networkmode: ‘always*

Metadata:
```text
source_id: S-290
image_use_id: IU-290
fileId_short: dfc5091fca
image_file: S-290__dfc5091fca.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
networkmode: ‘always*
This means “ignore online/offline state.” TanStack says in always mode, queries and mutations always run
and are not paused because of missing network. Retries also do not pause. ackcom
So for your question:
when they are being queued while offline, always, we just choose to run resumePausedMutations) or not?
No.
With always , they generally are not paused/queued because of offline state in the first place. They try to
run immediately; if they truly need network, they can just fail rather than sit paused waiting for resume.
==
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-303 - Example: computed async value

Metadata:
```text
source_id: S-303
image_use_id: IU-303
fileId_short: af413353f2
image_file: S-303__af413353f2.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Example: computed async value
«> TypeScript oO
useQuery({
querykey: ['localValue'],
queryFn: () => Promise.resolve(7),
networkMode: always",
3)
Again, no network is needed. TanStack’s docs use this kind of example directly. trstct
What would be weird here?
If you left this as default ‘online , then going offline could pause something that actually could have run just
fine without internet. That is why always exists. This is an inference from the documented behavior of the
modes. _ tanstack Vv
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-309 - “‘offlineFirst"

Metadata:
```text
source_id: S-309
image_use_id: IU-309
fileId_short: 33ec33e3f6
image_file: S-309__33ec33e3f6.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
“‘offlineFirst"
Useful when cached/storage-backed work should continue gracefully and retries should wait for
connectivity.
” TypeScript
useQuery({
queryKey: [‘data'],
queryFn: fetchData,
networkMode: 'offlineFirst',
»
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-311 - 3) networkMode: ‘offlineFirst'

Metadata:
```text
source_id: S-311
image_use_id: IU-311
fileId_short: 80e917c63d
image_file: S-311__80e917c63d.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
3) networkMode: ‘offlineFirst'
This is for cases where work may still succeed offline-ish because of a cache/storage layer, like:
* service worker cache
* HTTP cache
* persistent local cache backing some fetch path
The docs describe it as useful when cached/storage-backed work should continue gracefully and retries
should wait for connectivity. tense
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-320 - Example: fetch that may be served from cache

Metadata:
```text
source_id: S-320
image_use_id: IU-320
fileId_short: 921a92e2c6
image_file: S-320__921a92e2c6.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Example: fetch that may be served from cache
> TypeScript
useQuery({
queryKey: ['article', id],
queryFn: async () => {
const res = await fetch(~ /api/articles/${id} )
return res.json()
Lb
networkMode: 'offlineFirst',
3)
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

### S-326 - Why this can make sense:

Metadata:
```text
source_id: S-326
image_use_id: IU-326
fileId_short: 8fb60bf0f8
image_file: S-326__8fb60bf0f8.png
status: verified-visible-ocr-assisted
transcript_method: Stage5c visible read from source image; OCR-assisted with manual fixes where needed
```

#### Verified visible text
```text
Why this can make sense:
* maybe a service worker or HTTP cache serves the request even while offline
«if the fetch fails and retries are needed, TanStack can wait for connectivity instead of behaving like pure
always mode
So offlineFirst is like:
© “go ahead and try”
* “but if retries are needed, connectivity matters” tarsi -
```

#### Notes

Visible text present; no OCR timeout/error placeholder is used.

---

## 3. Cleaned source notes

- `networkMode: 'online'` is the default and can pause network-dependent work while offline.
- `fetchStatus: 'paused'` means work wanted to fetch but could not proceed.
- `networkMode: 'always'` ignores online/offline state and is for work that does not need network.
- `networkMode: 'offlineFirst'` can try cache/storage-backed work first and pause retries when network is needed.
- `resumePausedMutations()` matters for actual paused mutations, especially persisted/hydrated offline mutations.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| online/offline/fetchStatus paused tail remains R09D | S-275, S-280, S-281, S-282, S-286, S-291 | medium-high |
| always mode belongs to R09D networkMode, not persistence | S-290, S-303 | high |
| offlineFirst and resumePausedMutations belong to R09D | S-296, S-302, S-312, S-314, S-327, S-334 | medium-high |

---

## 5. Open review issues

- This is intentionally a larger 86-image pass. Run closure audit next.
- Sources are processed only because visible text exists; OCR-timeout cards were manually read instead of left as placeholders.
- If a later review finds an OCR artifact in wording, create a precision patch for that source.
