# R02B - enabled / disabled / conditional UI

Conspect: `react query,rquery`  
File type: **source-preserving region transcript**  
Stage: **4q / verified region transcript v001**  
Generated: 2026-06-01 23:28:46 UTC

This file covers the second R02 sub-pass: `enabled`, disabled query state, and conditional UI. It does not complete all R02; R02C remains pending.

---

## Direction check

Goal:
Continue R02 after correcting R02A.

Done:
R02A v002 now owns the status mental-model card `S-013`.

Now:
R02B processes only enabled/disabled/conditional UI sources.

Why:
This keeps query status semantics separate from UI/input conditions.

Next:
Review/commit, then process R02C query keys/manual refetch/declarative dependencies.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- enabled option for conditional queries
- disabled query state when required input is missing
- why pending does not necessarily mean loading
- hooks must not be called conditionally
- rendering separate no-input UI instead of interpreting disabled query state
```

Key ideas:

- enabled lets a hook stay mounted while preventing the query from running until a condition is true.
- A disabled query with no data can be status pending but fetchStatus idle.
- That disabled state means there is no data yet and no fetch is currently happening.
- Hooks cannot be called conditionally, so conditional queries use enabled rather than wrapping useQuery in if.
- For no-input cases, a separate UI state can be clearer than mounting a disabled query.
- No user input yet is a UI state, not a server-loading state.

Reading quality:
```text
Overall conceptual understanding: high.
Main source readability: high.
Code readability: high.
Spatial/layout understanding: high after local R02B review.
Limitations: S-032 is a cropped continuation but its enabled code is readable.; S-026 continues R02A status explanation at top but belongs to R02B for disabled-query meaning.; S-013 moved out to R02A v002.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-026, S-027, S-032, S-033, S-037, S-042, S-047, S-056
```

Moved to R02A v002:
```text
S-013
```

Reserved for later R02C:
```text
S-039, S-040, S-043, S-045, S-048, S-050, S-051, S-052, S-054, S-057, S-061
```

Reserved for R04:
```text
S-062
```

---

## 2. Source inventory

| Region source | Global source | Image use | fileId short | Candidate type | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| R02B-S001 | S-026 | IU-026 | `29e9da2f37` | `r02b-disabled-query-state-explanation` | `verified-from-extracted-svg-image` | top-continuation-from-r02a-status-visible | Disabled query can be pending but not loading |
| R02B-S002 | S-027 | IU-027 | `048f7ed433` | `r02b-hooks-not-conditional-wrong` | `verified-from-extracted-svg-image` | no | Wrong conditional hook call |
| R02B-S003 | S-032 | IU-032 | `d812eda414` | `r02b-enabled-basic-example` | `verified-visible-partial-from-extracted-svg-image` | top-and-bottom-continuation-cropped | Most common enabled example with missing id |
| R02B-S004 | S-033 | IU-033 | `796e9f55f7` | `r02b-hooks-not-conditional-correct` | `verified-from-extracted-svg-image` | no | Correct enabled query pattern |
| R02B-S005 | S-037 | IU-037 | `202c0dd895` | `r02b-missing-id-disabled-state` | `verified-from-extracted-svg-image` | no | Disabled query state when id is missing |
| R02B-S006 | S-042 | IU-042 | `0035fc7737` | `r02b-ui-why-disabled-query-state-matters` | `verified-from-extracted-svg-image` | right-edge-card-crop-no-text-loss | Why disabled query state matters in UI |
| R02B-S007 | S-047 | IU-047 | `441233c7df` | `r02b-separate-ui-for-no-input` | `verified-from-extracted-svg-image` | no | Render no-input UI instead of mounting disabled query |
| R02B-S008 | S-056 | IU-056 | `7e756912a0` | `r02b-why-separate-ui-better` | `verified-from-extracted-svg-image` | no | Why no-input UI is better than interpreting disabled query state |

---

## 3. Source transcript

### R02B-S001 / S-026 - `29e9da2f37`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-disabled-query-state-explanation`
- readability: `high`
- cut off: `top-continuation-from-r02a-status-visible`
- confidence: `high`
- theme: Disabled query can be pending but not loading

#### Verified visible text
```text
So it is only `true` when the query is in its first actual fetch.

That makes the three flags:

- `isPending`: there is no resolved result yet
- `isFetching`: a fetch is currently running
- `isLoading`: the query is doing its initial fetch right now

So your combination:

- `isPending === true`
- `isLoading === false`
- `fetchStatus === 'idle'`

means:

the query has no data yet, but it is not currently fetching.

That usually happens when the query is waiting to be allowed to run, not actively loading.
```

#### Notes
Top continuation ties to R02A status explanation; the enabled/disabled meaning is visible and belongs in R02B.

---

### R02B-S002 / S-027 - `048f7ed433`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-hooks-not-conditional-wrong`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Wrong conditional hook call

#### Verified visible text
```text
12. Conditional queries with `enabled`

Hooks must not be called conditionally.

Wrong
```

#### Verified visible code
```tsx
function useIssues(search: string) {
  if (search) {
    return useQuery({
      queryKey: ['issues', search],
      queryFn: () => fetchIssues(search),
    })
  }
}
```

#### Notes
Verified from extracted SVG image.

---

### R02B-S003 / S-032 - `d812eda414`

Metadata:
- status: `verified-visible-partial-from-extracted-svg-image`
- candidate_type: `r02b-enabled-basic-example`
- readability: `high`
- cut off: `top-and-bottom-continuation-cropped`
- confidence: `high-for-visible-code`
- theme: Most common enabled example with missing id

#### Verified visible text
```text
Most common cases:
```

#### Verified visible code
```tsx
const query = useQuery({
  queryKey: ['user', id],
  queryFn: fetchUser,
  enabled: !!id,
})
```

#### Notes
Top continuation from S-026 and bottom continuation are cropped; visible code is clear.

---

### R02B-S004 / S-033 - `796e9f55f7`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-hooks-not-conditional-correct`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Correct enabled query pattern

#### Verified visible text
```text
Correct
```

#### Verified visible code
```tsx
function useIssues(search: string) {
  return useQuery({
    queryKey: ['issues', search],
    queryFn: () => fetchIssues(search),
    enabled: search !== '',
  })
}
```

#### Notes
Verified from extracted SVG image.

---

### R02B-S005 / S-037 - `202c0dd895`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-missing-id-disabled-state`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Disabled query state when id is missing

#### Verified visible text
```text
If `id` is missing:

- `status: 'pending'`
- `isPending: true`
- `fetchStatus: 'idle'`
- `isFetching: false`
- `isLoading: false`

Why? Because React Query is saying:

“I don’t have data yet, but I’m also not fetching, because this query is disabled for now.”
```

#### Notes
Verified from extracted SVG image.

---

### R02B-S006 / S-042 - `0035fc7737`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-ui-why-disabled-query-state-matters`
- readability: `high`
- cut off: `right-edge-card-crop-no-text-loss`
- confidence: `high`
- theme: Why disabled query state matters in UI

#### Verified visible text
```text
Why this matters in UI

If you do this:

then when `search` is empty:

- query is disabled
- `isLoading` is false
- so spinner does not show

That is good, because there is nothing to load yet.
```

#### Verified visible code
```tsx
const query = useQuery({
  queryKey: ['issues', search],
  queryFn: fetchIssues,
  enabled: !!search,
})

if (query.isLoading) return <Spinner />
```

#### Notes
Right edge/card border crop visible; text and code are readable.

---

### R02B-S007 / S-047 - `441233c7df`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-separate-ui-for-no-input`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Render no-input UI instead of mounting disabled query

#### Verified visible text
```text
What the second screenshot means

They are saying: for “no input yet”, don’t treat it like a loading state.

Example:
```

#### Verified visible code
```tsx
function IssueSearch() {
  const [search, setSearch] = React.useState('')

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      {search ? (
        <IssueList search={search} />
      ) : (
        <div>Please enter a search term</div>
      )}
    </div>
  )
}
```

#### Notes
Verified from extracted SVG image.

---

### R02B-S008 / S-056 - `7e756912a0`

Metadata:
- status: `verified-from-extracted-svg-image`
- candidate_type: `r02b-why-separate-ui-better`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Why no-input UI is better than interpreting disabled query state

#### Verified visible text
```text
Why this is better

When `search` is empty, there is no real query to run yet.

So instead of:

- mounting a disabled query
- then trying to interpret its odd state

you just render a separate UI:

- no search term → show “Please enter a search term”
- search term exists → render component that uses the query

This is simpler because “no user input yet” is a UI state, not a server-loading state.
```

#### Notes
Verified from extracted SVG image.

---

## 4. Cleaned source notes

- enabled lets a hook stay mounted while preventing the query from running until a condition is true.
- A disabled query with no data can be status pending but fetchStatus idle.
- That disabled state means there is no data yet and no fetch is currently happening.
- Hooks cannot be called conditionally, so conditional queries use enabled rather than wrapping useQuery in if.
- For no-input cases, a separate UI state can be clearer than mounting a disabled query.
- No user input yet is a UI state, not a server-loading state.

---

## 5. Minimal interpretation

R02B explains how to handle queries that should not run until required input exists. The main idea is that `enabled` prevents a query from fetching while still keeping the hook call unconditional. A disabled query with no data can be `pending` but `fetchStatus: 'idle'`, which means there is no data yet but no active fetch. For user-input cases, the notes recommend treating “no input yet” as a UI state: render a prompt or mount a separate query component only when input exists.

---

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| A disabled query can be pending but not loading because fetchStatus is idle | R02B-S001, R02B-S005 | extracted SVG image transcript | high |
| Hooks must not be called conditionally | R02B-S002 | extracted SVG image transcript/code | high |
| enabled keeps the hook mounted while preventing the query from running until input exists | R02B-S003, R02B-S004 | extracted SVG image transcript/code | high |
| Disabled query state matters for loading UI | R02B-S006 | extracted SVG image transcript/code | high |
| A separate no-input UI can be clearer than interpreting disabled query state | R02B-S007, R02B-S008 | extracted SVG image transcript/code | high |

---

## 7. Question hooks

- What does enabled do in useQuery?
- Why should hooks not be called conditionally?
- Why can a disabled query be pending but not loading?
- What does fetchStatus idle mean in a disabled query?
- Why can no user input yet be treated as a UI state rather than a server-loading state?
- When is it better to render a separate component instead of mounting a disabled query?

---

## 8. Open review issues

- R02B is complete for the reviewed enabled/disabled/conditional UI sub-block.
- S-013 was deliberately moved to R02A v002, not included in R02B.
- R02C remains pending: query keys/manual refetch/declarative dependencies.
- S-062 remains reserved for R04.
