# R03 - notifyOnChangeProps / select / structural sharing

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4u / verified region transcript v001**  
Generated: 2026-06-02 00:13:59 UTC

This file covers R03 as part of the combined R03 + R04A transcript archive. R03 remains a separate region file.

---

## Direction check

Goal:
Process the small R03 region together with R04A while keeping files separate.

Done:
R03/R04 boundary review split R03, R04A, and R04B.

Now:
Create R03 transcript for notifyOnChangeProps, select, and rerender narrowing.

Why:
R03 is a compact side-road about observer notification and selected data, so it can safely be paired with R04A in one archive.

Next:
Commit this archive; R04B remains pending.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- how useQuery result tracking affects component rerenders
- default tracked properties and when a component rerenders
- select as data-shape narrowing for an observer
- notifyOnChangeProps as explicit allowed result fields
- prefetchQuery versus useQuery with notifyOnChangeProps: []
```

Key ideas:

- By default, TanStack Query tracks which result fields a component reads and rerenders only when those fields change.
- notifyOnChangeProps can explicitly restrict which query result fields may trigger a rerender.
- select changes the data value seen by the observer, not the whole query result object.
- select and notifyOnChangeProps solve different problems.
- Most code does not need notifyOnChangeProps because default tracked-property behavior is already optimized.
- notifyOnChangeProps can be useful for a fixed field list or prefetch-like hook usage.
- prefetchQuery fetches/caches without subscribing a component; useQuery with notifyOnChangeProps: [] still creates an observer but suppresses notifications.

Reading quality:
```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after R03/R04 boundary review and local R03 check.
Limitations: No known text loss in R03 sources.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-029, S-035, S-041, S-046, S-055, S-058, S-059
```

R04A processed in same archive:
```text
S-062, S-063, S-067, S-068, S-070, S-071, S-073, S-074, S-075, S-076, S-077, S-079, S-082, S-084, S-087, S-088, S-090, S-091, S-095, S-097, S-098, S-099, S-103, S-104
```

R04B reserved:
```text
S-069, S-072, S-078, S-081, S-086, S-089, S-092, S-096, S-100, S-102, S-105, S-107
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R03-S001 | S-029 | IU-029 | `905bfe2c8b` | `r03-notifyonchangeprops-default-tracked` | `verified-from-extracted-svg-image` | no | notifyOnChangeProps and default tracked properties |
| R03-S002 | S-035 | IU-035 | `b7b12231ee` | `r03-notifyonchangeprops-explicit` | `verified-from-extracted-svg-image` | no | Explicit notifyOnChangeProps restricts re-render fields |
| R03-S003 | S-041 | IU-041 | `ca846784a5` | `r03-select-reduces-observed-data-shape` | `verified-from-extracted-svg-image` | no | select subscribes observer to selected result |
| R03-S004 | S-046 | IU-046 | `cfea23af3a` | `r03-select-vs-notifyonchangeprops` | `verified-from-extracted-svg-image` | no | select and notifyOnChangeProps solve different problems |
| R03-S005 | S-055 | IU-055 | `224e1a8e1a` | `r03-when-notifyonchangeprops-useful-fixed-list` | `verified-from-extracted-svg-image` | no | notifyOnChangeProps useful for explicit fixed observer fields |
| R03-S006 | S-058 | IU-058 | `25af0ad09e` | `r03-notifyonchangeprops-empty-prefetch-like` | `verified-from-extracted-svg-image` | no | notifyOnChangeProps empty list for prefetch-like hook observer |
| R03-S007 | S-059 | IU-059 | `d1b9ca270e` | `r03-prefetchquery-vs-usequery-empty-notify` | `verified-from-extracted-svg-image` | no | prefetchQuery versus useQuery with notifyOnChangeProps empty |

---

## 3. Source transcript

### R03-S001 / S-029 - `905bfe2c8b`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-notifyonchangeprops-default-tracked`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: notifyOnChangeProps and default tracked properties

#### Verified visible text
```text
`notifyOnChangeProps` is a `useQuery` option that controls which returned query fields are allowed to trigger a component re-render.

By default, TanStack Query uses tracked properties: it watches which fields from the query result your component actually reads, and only re-renders when one of those used fields changes.

So this:

means your component usually re-renders when `data` or `isLoading` changes, because those are the fields you used. If `isFetching` changes but you never read it, that alone should not cause a re-render.
```

#### Verified visible code
```tsx
const { data, isLoading } = useQuery(...)
```

#### Notes
Verified from R03 contact sheet/source image.

---

### R03-S002 / S-035 - `b7b12231ee`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-notifyonchangeprops-explicit`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: Explicit notifyOnChangeProps restricts re-render fields

#### Verified visible text
```text
You can override that behavior with `notifyOnChangeProps`.

This means: re-render this component only when `data` or `error` changes. Changes to `isFetching`, `isStale`, `status`, and other fields will not trigger a re-render for this observer.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  notifyOnChangeProps: ['data', 'error'],
})
```

#### Notes
Verified from R03 source image.

---

### R03-S003 / S-041 - `ca846784a5`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-select-reduces-observed-data-shape`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: select subscribes observer to selected result

#### Verified visible text
```text
If you use `select`, your component subscribes to the selected result, not the whole original data shape. So if the underlying query data changes, but the value returned by `select` does not meaningfully change, the component does not need to re-render for that reason. TanStack Query documents this with the example of selecting `data.length`: the component re-renders only when the length changes, not when a todo's name changes.

Example:

If one todo title changes but the array length stays the same, this component should not re-render because of `data`, since the selected value is still the same count.

Now to the main question: then why do we need `notifyOnChangeProps` at all?
```

#### Verified visible code
```tsx
const { data: count } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (todos) => todos.length,
})
```

#### Notes
Verified from R03 source image.

---

### R03-S004 / S-046 - `cfea23af3a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-select-vs-notifyonchangeprops`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: select and notifyOnChangeProps solve different problems

#### Verified visible text
```text
Because `select` and `notifyOnChangeProps` solve different problems.

- `select` controls what data value this observer sees
- `notifyOnChangeProps` controls which fields from the `useQuery` result are allowed to trigger a re-render

So `select` helps with the `data` part.
`notifyOnChangeProps` helps with the whole result object: `data`, `error`, `isFetching`, `isPending`, `status`, `isStale`, and so on.

By default, TanStack Query already does smart tracking with a Proxy: it only re-renders if a property your component actually used changes. So if you do not read `isFetching`, then changes to `isFetching` should not re-render your component anyway.

That is why, in normal code, you often do not need `notifyOnChangeProps`. The default behavior is already optimized.
```

#### Notes
Verified from R03 source image.

---

### R03-S005 / S-055 - `224e1a8e1a`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-when-notifyonchangeprops-useful-fixed-list`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: notifyOnChangeProps useful for explicit fixed observer fields

#### Verified visible text
```text
So when is `notifyOnChangeProps` useful?

One case is when you want to be explicit and lock the observer to a fixed list, like only `data` and `error`.

That means even if the component accidentally starts touching some other field later, only `data` and `error` are supposed to trigger updates.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  notifyOnChangeProps: ['data', 'error'],
})
```

#### Notes
Verified from R03 source image.

---

### R03-S006 / S-058 - `25af0ad09e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-notifyonchangeprops-empty-prefetch-like`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: notifyOnChangeProps empty list for prefetch-like hook observer

#### Verified visible text
```text
Another important case is when you intentionally use a query only to kick off fetching/prefetching, but do not want that hook to re-render the component at all.

TanStack Query shows this as an optimization for prefetch-like usage. The query runs, but this component does not subscribe to result changes.

And another subtle reason: the tracked-props optimization depends on which properties get accessed. The docs note that certain patterns like object rest destructuring can defeat that optimization. In those cases, setting `notifyOnChangeProps` manually gives you precise control.
```

#### Verified visible code
```tsx
useQuery({
  queryKey: ['article-comments', id],
  queryFn: getArticleCommentsById,
  notifyOnChangeProps: [],
})
```

#### Notes
Verified from R03 source image.

---

### R03-S007 / S-059 - `d1b9ca270e`

Metadata:

- status: `verified-from-extracted-svg-image`
- candidate_type: `r03-prefetchquery-vs-usequery-empty-notify`
- readability: `high`
- cut_off: `no`
- confidence: `high`
- theme: prefetchQuery versus useQuery with notifyOnChangeProps empty

#### Verified visible text
```text
The main difference is this:

- `prefetchQuery()` means: fetch and cache this query, but don't subscribe any component to it. It returns `Promise<void>`, does not return data, and does not throw errors. That is exactly what prefetching is for.
- `useQuery({ notifyOnChangeProps: [] })` means: create a query observer in this component, start the fetch, but suppress re-render notifications from this observer. The fetch still happens and the cache is still populated, but you are still using a render hook for something that is not really being rendered from. This is why docs describe it as “prefetch-like.”

So your instinct is right: in many cases, use `queryClient.prefetchQuery()` instead.

Why would someone still use the `useQuery(... notifyOnChangeProps: [])` version?

One reason is convenience inside a component. If you are already in component code and want a child query to start as soon as the parent renders, this hook-based version can be dropped in without wiring up `useQueryClient`, `useEffect`, or an event handler. It behaves like “start fetching during this render path, but don't make this component care about the result.” That can help avoid request waterfalls.
```

#### Notes
Verified from R03 source image.

---

## 4. Cleaned source notes

- By default, TanStack Query tracks which result fields a component reads and rerenders only when those fields change.
- notifyOnChangeProps can explicitly restrict which query result fields may trigger a rerender.
- select changes the data value seen by the observer, not the whole query result object.
- select and notifyOnChangeProps solve different problems.
- Most code does not need notifyOnChangeProps because default tracked-property behavior is already optimized.
- notifyOnChangeProps can be useful for a fixed field list or prefetch-like hook usage.
- prefetchQuery fetches/caches without subscribing a component; useQuery with notifyOnChangeProps: [] still creates an observer but suppresses notifications.

---

## 5. Minimal interpretation

R03 explains how TanStack Query decides whether a component should re-render from a query result. The default behavior tracks which result fields the component actually reads. `select` changes the `data` value seen by an observer, while `notifyOnChangeProps` restricts which result object fields can trigger re-render notifications. Most normal code does not need manual `notifyOnChangeProps`, but it can be useful for fixed field lists, avoiding tracked-prop pitfalls, or prefetch-like hook usage.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Default behavior tracks which query result fields are read | R03-S001, R03-S004 | extracted SVG image transcript/code | high |
| notifyOnChangeProps can explicitly restrict rerender-triggering fields | R03-S002, R03-S005 | extracted SVG image transcript/code | high |
| select changes the data value seen by this observer | R03-S003, R03-S004 | extracted SVG image transcript/code | high |
| select and notifyOnChangeProps solve different problems | R03-S004 | extracted SVG image transcript | high |
| notifyOnChangeProps: [] can be used for prefetch-like hook usage | R03-S006, R03-S007 | extracted SVG image transcript/code | high |
| prefetchQuery fetches and caches without subscribing a component | R03-S007 | extracted SVG image transcript | high |

---

## 7. Question hooks

- What does notifyOnChangeProps control?
- What is the default tracked-properties behavior?
- Why does reading data and isLoading usually only rerender for those fields?
- What does select change?
- How is select different from notifyOnChangeProps?
- When is notifyOnChangeProps useful if tracked properties already exist?
- Why is queryClient.prefetchQuery often better than useQuery with notifyOnChangeProps: []?

---

## 8. Open review issues

- R03 is complete for the reviewed notify/select/structural sharing sub-block.
- R04A is processed separately in this same archive.
- R04B remains pending and must be processed before R03/R04 closure audit.
