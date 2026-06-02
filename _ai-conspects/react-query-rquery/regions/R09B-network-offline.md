# R09B - networkMode / offline / offlineFirst

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
This file processes `13` images for `R09B`.

Why:
Only sources with readable visible text are marked processed; no OCR-timeout placeholders are used.

Next:
After Batch A commit, process Batch B or run precision corrections if diff review finds issues.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
networkMode online/always/offlineFirst, paused fetchStatus, offline-aware UI
```

Key ideas:

- `networkMode: 'online'` is the default for network-dependent queries and can pause fetching/retries while offline.
- `fetchStatus: 'paused'` means the query wanted to fetch but was paused, not actively loading.
- `networkMode: 'always'` is for query functions that do not need network access.
- `networkMode: 'offlineFirst'` lets cache/storage-backed work try while offline, while retries wait for connectivity.
- Offline-first is not a freshness guarantee; it is permission to try a request path that may be cache-backed.

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
S-202, S-203, S-205, S-208, S-214, S-217, S-225, S-228, S-230, S-231, S-232, S-234, S-235
```

Boundary decision:
```text
Included in R09B after Stage4x-fixed preflight and local readable transcript review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-202 | IU-202 | `c078f2032f` | `verified-visible-from-contact-sheet` | default networkMode online |
| S-203 | IU-203 | `17f9a3bf92` | `verified-visible-from-contact-sheet` | online mode pauses only when a fetch wants to happen offline |
| S-205 | IU-205 | `c6a05bb126` | `verified-visible-from-contact-sheet` | offline paused queries can be pending and paused |
| S-208 | IU-208 | `635b0dd4d8` | `verified-visible-from-contact-sheet` | network-dependent query example |
| S-214 | IU-214 | `d894c9608c` | `verified-visible-from-contact-sheet` | offline-aware UI using status and fetchStatus |
| S-217 | IU-217 | `73d84c25d2` | `verified-visible-from-contact-sheet` | networkMode always for non-network query functions |
| S-225 | IU-225 | `af413353f2` | `verified-visible-from-contact-sheet` | always mode for computed async value |
| S-228 | IU-228 | `33ec33e3f6` | `verified-visible-from-contact-sheet` | offlineFirst basic option |
| S-230 | IU-230 | `80e917c63d` | `verified-visible-from-contact-sheet` | offlineFirst for cache/storage-backed fetch paths |
| S-231 | IU-231 | `ad15f92387` | `verified-visible-from-contact-sheet` | mixed/cache-backed fetches with offlineFirst |
| S-232 | IU-232 | `921a92e2c6` | `verified-visible-from-contact-sheet` | offlineFirst article fetch example |
| S-234 | IU-234 | `8fb60bf0f8` | `verified-visible-from-contact-sheet` | why offlineFirst can make sense |
| S-235 | IU-235 | `40b7d5950d` | `verified-visible-from-contact-sheet` | offlineFirst is permission to try, not a freshness guarantee |

---

## 2. Source transcript

### S-202 - default networkMode online

Metadata:
```text
source_id: S-202
image_use_id: IU-202
fileId_short: c078f2032f
image_file: S-202__c078f2032f.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
1) Default: `networkMode: 'online'`

This is the default mode. It assumes your query normally depends on network access. The docs say it pauses network-dependent queries when offline, and if a query was already running when you go offline, the retry mechanism is paused and continues when connection returns.
```

#### Notes

Readable.

---

### S-203 - online mode pauses only when a fetch wants to happen offline

Metadata:
```text
source_id: S-203
image_use_id: IU-203
fileId_short: 17f9a3bf92
image_file: S-203__17f9a3bf92.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Does online option pause query when it has data in React Query cache?

No, not automatically.

With default `networkMode: 'online'`, a query is paused only when it wants to fetch but cannot because there is no network connection. TanStack defines `fetchStatus: 'paused'` as “the query wanted to fetch, but has been paused.”

So if the query already has cached data:

- it can still show that cached data
- and it is only paused if a fetch/refetch should happen at that moment and offline prevents it
```

#### Notes

Prompt bubble visible; answer readable.

---

### S-205 - offline paused queries can be pending and paused

Metadata:
```text
source_id: S-205
image_use_id: IU-205
fileId_short: c6a05bb126
image_file: S-205__c6a05bb126.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
31. Offline behavior and `networkMode`

31.1 Paused queries

When offline, queries maybe paused instead of fetching.

Possible state:

This is why `isLoading` is not the same as `status === 'pending'`.

A paused query is not actively loading.
```

#### Verified visible code
```tsx
status: 'pending'
fetchStatus: 'paused'
data: undefined
```

#### Notes

Readable.

---

### S-208 - network-dependent query example

Metadata:
```text
source_id: S-208
image_use_id: IU-208
fileId_short: 635b0dd4d8
image_file: S-208__635b0dd4d8.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example: network-dependent

This query is network-dependent because:

- it calls a remote API
- no internet usually means no successful fetch

How it works in `online` mode:

- online -> it fetches normally
- offline before it starts -> it can be paused instead of actively fetching
- offline during retries -> retries pause and continue later when back online
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const res = await fetch('/api/todos')
    return res.json()
  },
})
```

#### Notes

Readable.

---

### S-214 - offline-aware UI using status and fetchStatus

Metadata:
```text
source_id: S-214
image_use_id: IU-214
fileId_short: d894c9608c
image_file: S-214__d894c9608c.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
31.2 Offline-aware UI
```

#### Verified visible code
```tsx
function Repos() {
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
  })

  if (status === 'pending' && fetchStatus === 'paused') {
    return <div>Offline...</div>
  }

  if (status === 'pending' && fetchStatus === 'fetching') {
    return <div>Loading...</div>
  }

  return (
    <div>
      {fetchStatus === 'paused' && <div>Offline</div>}
      <ul>
        {data?.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

#### Notes

Readable code card.

---

### S-217 - networkMode always for non-network query functions

Metadata:
```text
source_id: S-217
image_use_id: IU-217
fileId_short: 73d84c25d2
image_file: S-217__73d84c25d2.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
2) `networkMode: 'always'`

This mode tells TanStack Query to ignore online/offline state and always run the query. The docs say queries are never paused because of connectivity in this mode, and retries also do not pause.

Use this when the query function does not really need a network.

Example: local storage / IndexedDB / AsyncStorage

Why this is not network-dependent:

- it reads from browser storage
- internet connection is irrelevant
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['draftSettings'],
  queryFn: async () => {
    const raw = localStorage.getItem('draftSettings')
    return raw ? JSON.parse(raw) : { theme: 'dark' }
  },
  networkMode: 'always',
})
```

#### Notes

Readable.

---

### S-225 - always mode for computed async value

Metadata:
```text
source_id: S-225
image_use_id: IU-225
fileId_short: af413353f2
image_file: S-225__af413353f2.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example: computed async value

Again, no network is needed. TanStack's docs use this kind of example directly.

What would we need here?

If you left this as default `online`, then going offline could pause something that actually could have run just fine without internet. That is why `always` exists. This is an inference from the documented behavior of the modes.
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

### S-228 - offlineFirst basic option

Metadata:
```text
source_id: S-228
image_use_id: IU-228
fileId_short: 33ec33e3f6
image_file: S-228__33ec33e3f6.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
`offlineFirst`

Useful when cached/storage-backed work should continue gracefully and retries should wait for connectivity.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  networkMode: 'offlineFirst',
})
```

#### Notes

Readable.

---

### S-230 - offlineFirst for cache/storage-backed fetch paths

Metadata:
```text
source_id: S-230
image_use_id: IU-230
fileId_short: 80e917c63d
image_file: S-230__80e917c63d.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
3) `networkMode: 'offlineFirst'`

This is for cases where work may still succeed offline-ish because of a cache/storage layer, like:

- service worker cache
- HTTP cache
- persistent local cache backing some fetch path

The docs describe it as useful when cached/storage-backed work should continue gracefully and retries should wait for connectivity.
```

#### Notes

Readable.

---

### S-231 - mixed/cache-backed fetches with offlineFirst

Metadata:
```text
source_id: S-231
image_use_id: IU-231
fileId_short: ad15f92387
image_file: S-231__ad15f92387.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Mixed / cache-backed fetches

Use `offlineFirst` when:

- query may still succeed due to cache
- but real retries should wait for connectivity

Example:
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['catalog'],
  queryFn: () => fetch('/api/catalog').then(r => r.json()),
  networkMode: 'offlineFirst',
})
```

#### Notes

Readable.

---

### S-232 - offlineFirst article fetch example

Metadata:
```text
source_id: S-232
image_use_id: IU-232
fileId_short: 921a92e2c6
image_file: S-232__921a92e2c6.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Example: fetch that may be served from cache
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['article', id],
  queryFn: async () => {
    const res = await fetch(`/api/articles/${id}`)
    return res.json()
  },
  networkMode: 'offlineFirst',
})
```

#### Notes

Readable.

---

### S-234 - why offlineFirst can make sense

Metadata:
```text
source_id: S-234
image_use_id: IU-234
fileId_short: 8fb60bf0f8
image_file: S-234__8fb60bf0f8.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
Why this can make sense:

- maybe a service worker or HTTP cache serves the request even while offline
- if the fetch fails and retries are needed, TanStack can wait for connectivity instead of behaving like pure `always` mode

So `offlineFirst` is like:

- “go ahead and try”
- “but if retries are needed, connectivity matters”
```

#### Notes

Readable.

---

### S-235 - offlineFirst is permission to try, not a freshness guarantee

Metadata:
```text
source_id: S-235
image_use_id: IU-235
fileId_short: 40b7d5950d
image_file: S-235__40b7d5950d.png
status: verified-visible-from-contact-sheet
transcript_method: manually prepared from Stage4w2 contact sheet/source image
```

#### Verified visible text
```text
The key point is that `offlineFirst` is about whether the query is allowed to try running while offline, not a guarantee that the data is up to date. TanStack describes `offlineFirst` as useful when “cached data or data storage mechanisms” can make the request succeed, while retries wait for connectivity.

So there are two different freshness layers here:

1. Browser / service worker / HTTP cache freshness

If your `fetch()` is satisfied from some cache while offline, that cached response may be old. `offlineFirst` does not make it fresh. It just allows the request attempt to happen even when offline, which is useful if some cache layer can answer it.
```

#### Notes

Readable; bottom may continue elsewhere, but visible core idea is complete.

---

## 3. Cleaned source notes

- `networkMode: 'online'` is the default for network-dependent queries and can pause fetching/retries while offline.
- `fetchStatus: 'paused'` means the query wanted to fetch but was paused, not actively loading.
- `networkMode: 'always'` is for query functions that do not need network access.
- `networkMode: 'offlineFirst'` lets cache/storage-backed work try while offline, while retries wait for connectivity.
- Offline-first is not a freshness guarantee; it is permission to try a request path that may be cache-backed.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| `online` mode can pause network-dependent fetches/retries offline | S-202, S-203, S-208 | high |
| Paused query can be pending with `fetchStatus: 'paused'` | S-205, S-214 | high |
| `always` is for non-network query functions | S-217, S-225 | high |
| `offlineFirst` is for cache/storage-backed paths and retry waiting | S-228, S-230, S-231, S-232, S-234, S-235 | high |

---

## 5. Open review issues

- This file is valid for Batch A because it contains visible text and no OCR-placeholder processed sources.
- Remaining Stage4x-fixed queue sources are not closed by this file.
- If diff review finds a wording issue in a partial continuation card, fix with a precision patch rather than reverting the whole batch.
