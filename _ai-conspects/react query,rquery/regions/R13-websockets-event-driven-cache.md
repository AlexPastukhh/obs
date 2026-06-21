# R13 - WebSockets / event-driven cache updates

Conspect: `react query,rquery`  
File type: **verified region transcript**  
Stage: **5b / transcript v001**  
Generated: 2026-06-02 11:29:24 UTC

---

## Direction check

Goal:
Process the first transcript pass after Stage5a boundary review.

Done:
Stage5a split S-261..S-383 into candidate groups.

Now:
This file processes `8` sources for `R13`.

Why:
The images are readable and do not need OCR-placeholder handling.

Next:
After Stage5b review/commit, process Stage5c R14 persistence/hydration/pruning.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
WebSockets/SSE event-driven invalidation, direct cache updates, and staleTime Infinity on-demand strategy
```

Key ideas:

- WebSocket/SSE work is outside React Query; React Query still uses query keys and cache updates.
- A server event can trigger query invalidation/refetch.
- A server event can carry data that is written directly with `setQueryData` or `setQueriesData`.
- `staleTime: Infinity` can fit event-driven freshness when server push is reliable.
- On-demand freshness is a bad fit if server push is incomplete or delayed.

Reading quality:
```text
Visible text read from Stage5a source images/contact sheets.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
Continuation and duplicate cards are explicitly marked in source notes.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-276, S-285, S-293, S-299, S-313, S-321, S-328, S-333
```

Stage5b local boundary correction:
```text
S-276 and S-321 were Stage5a R12 candidates by proximity, but visual reading shows they are WebSockets/on-demand freshness cards. They are processed in R13.
```

Boundary decision:
```text
Included in R13 after Stage5b local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Status | Theme |
|---|---|---|---|---|
| S-276 | IU-276 | `4f53d979bc` | `verified-visible` | React Query core model for WebSocket-driven cache updates |
| S-285 | IU-285 | `789db879bc` | `verified-visible` | WebSockets / real-time updates strategies |
| S-293 | IU-293 | `d4e1e182d3` | `verified-visible` | direct cache update strategy from WebSocket event |
| S-299 | IU-299 | `50585b9627` | `verified-visible` | on-demand app strategy with staleTime Infinity |
| S-313 | IU-313 | `38abff4a0e` | `verified-visible` | why staleTime Infinity fits event-driven freshness |
| S-321 | IU-321 | `05e742e808` | `verified-visible` | normal refetch strategy vs on-demand strategy |
| S-328 | IU-328 | `f6f7e865e5` | `verified-visible` | when on-demand WebSocket strategy is a good fit |
| S-333 | IU-333 | `98945a566a` | `verified-visible` | when staleTime Infinity push strategy is a bad fit |

---

## 2. Source transcript

### S-276 - React Query core model for WebSocket-driven cache updates

Metadata:
```text
source_id: S-276
image_use_id: IU-276
fileId_short: 4f53d979bc
image_file: S-276__4f53d979bc.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
The core model

React Query is still centered on:

- query keys identifying cached server state
- manual cache actions telling the cache what changed

So with WebSockets, the usual pattern is:

1. open a WebSocket connection yourself
2. receive server events/messages
3. decide which query key(s) those messages affect
4. either:
   - invalidate those queries and let them refetch
   - or write directly into the cache with `setQueryData` / `setQueriesData`
```

#### Notes

Stage5b boundary correction: moved from R12 candidate group to R13 because it is WebSockets/on-demand strategy.

---

### S-285 - WebSockets / real-time updates strategies

Metadata:
```text
source_id: S-285
image_use_id: IU-285
fileId_short: 789db879bc
image_file: S-285__789db879bc.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
34. WebSockets / real-time updates

For real-time systems, you often do not want polling alone.

Two common strategies with WebSockets:

1. receive a message telling the client to refetch
2. receive the actual new data and write it directly into cache

34.1 Refetch strategy
```

#### Verified visible code
```tsx
socket.onmessage = () => {
  queryClient.invalidateQueries({ queryKey: ['todos', 'list'] })
}
```

#### Notes

Readable.

---

### S-293 - direct cache update strategy from WebSocket event

Metadata:
```text
source_id: S-293
image_use_id: IU-293
fileId_short: d4e1e182d3
image_file: S-293__d4e1e182d3.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
34.2 Direct cache update strategy
```

#### Verified visible code
```tsx
socket.onmessage = (event) => {
  const updatedTodo = JSON.parse(event.data)

  queryClient.setQueryData(['todos', 'list'], (previous) =>
    previous?.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ) ?? previous
  )
}
```

#### Notes

Readable.

---

### S-299 - on-demand app strategy with staleTime Infinity

Metadata:
```text
source_id: S-299
image_use_id: IU-299
fileId_short: 50585b9627
image_file: S-299__50585b9627.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
34.3 On-demand app strategy

If server pushes all important updates, one possible strategy is very long freshness.

Then rely on:

- invalidation from server messages
- direct cache updates from server messages

This is great for highly interactive real-time apps.
```

#### Verified visible code
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
```

#### Notes

Readable.

---

### S-313 - why staleTime Infinity fits event-driven freshness

Metadata:
```text
source_id: S-313
image_use_id: IU-313
fileId_short: 38abff4a0e
image_file: S-313__38abff4a0e.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
Why `staleTime: Infinity` fits this

Because freshness is no longer based on time.
Freshness is based on events.

So the app behaves like this:

- query loads once
- data stays “fresh”
- React Query does not keep rechecking automatically
- server events decide when cache should change

That is why it is called an on-demand strategy.
```

#### Notes

Readable.

---

### S-321 - normal refetch strategy vs on-demand strategy

Metadata:
```text
source_id: S-321
image_use_id: IU-321
fileId_short: 05e742e808
image_file: S-321__05e742e808.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
Simple comparison

Normal strategy

“Data may be outdated after some time, so refetch automatically.”

On-demand strategy

“Data stays valid until the server explicitly tells me it changed.”
```

#### Notes

Stage5b boundary correction: moved from R12 candidate group to R13 because it belongs to event-driven freshness.

---

### S-328 - when on-demand WebSocket strategy is a good fit

Metadata:
```text
source_id: S-328
image_use_id: IU-328
fileId_short: f6f7e865e5
image_file: S-328__f6f7e865e5.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
When this strategy is a good fit

Use it when:

- server push exists, like WebSockets or SSE
- backend emits reliable update events
- real-time consistency matters
- you want to reduce unnecessary network traffic
```

#### Notes

Readable.

---

### S-333 - when staleTime Infinity push strategy is a bad fit

Metadata:
```text
source_id: S-333
image_use_id: IU-333
fileId_short: 98945a566a
image_file: S-333__98945a566a.png
status: verified-visible
transcript_method: manually prepared from Stage5a source image/contact sheet
```

#### Verified visible text
```text
When it is a bad fit

Avoid it when:

- you do not have reliable server push
- users can change data elsewhere and your client will not hear about it
- backend events are incomplete or delayed
- you still need time-based revalidation

In that case, `staleTime: Infinity` can make data stay wrong for too long.
```

#### Notes

Readable.

---

## 3. Cleaned source notes

- WebSocket/SSE work is outside React Query; React Query still uses query keys and cache updates.
- A server event can trigger query invalidation/refetch.
- A server event can carry data that is written directly with `setQueryData` or `setQueriesData`.
- `staleTime: Infinity` can fit event-driven freshness when server push is reliable.
- On-demand freshness is a bad fit if server push is incomplete or delayed.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| WebSocket events must be mapped to query keys and cache actions | S-276 | high |
| Refetch strategy uses invalidateQueries from socket messages | S-285 | high |
| Direct strategy writes server event data into cache | S-293 | high |
| staleTime Infinity can fit an on-demand push strategy | S-299, S-313, S-321 | high |
| Good and bad fit conditions depend on server push reliability | S-328, S-333 | high |

---

## 5. Open review issues

- This file is valid for Stage5b because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage5a groups are not closed by this file: R14, R11B, R09D.
- Stage5 closure audit must run after Stage5b/Stage5c/Stage5d are complete.
