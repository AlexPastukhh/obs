# Canvas-wide Map — React Query / rquery

Source: `full.svg`  
Stage: **1 / layout-only**

This map is a global navigation layer. It is meant to answer:

```text
Where are we in the full visual conspect?
What is above/below/near this region?
Which region should the next transcription pass focus on?
```

It is not a complete content transcription.

## Vertical minimap

```text
FULL SVG MAP — React Query / rquery
Canvas orientation: very tall vertical sheet
Direction: top → bottom

001.3% ┌─ R01 — React Query + browser/HTTP cache
      │ Location: x=3000–6500, y=0–1200
      │ Labels: 3 | Image uses: 3
      │ Key visible labels: react query + browser cache; using react query + http cache with headers from server; you need to do calls with if-match yourself browser does no…
      └────────────────────────────────────────────────────────────
008.1% ┌─ R02 — Query basics: statuses, keys, enabled, manual refetch
      │ Location: x=7000–14550, y=1200–6500
      │ Labels: 14 | Image uses: 36
      │ Key visible labels: statuses; examples; fund; enabled; Isloading and when there is no data and no fetching; conditional queries
      └────────────────────────────────────────────────────────────
010.5% ┌─ R03 — notifyOnChangeProps / select side notes
      │ Location: x=1500–3600, y=3500–6500
      │ Labels: 4 | Image uses: 7
      │ Key visible labels: notifyonchangeprops; notifyonchangeproops vs select vs structural sharing; when notifyonchanges is useful; why not qc.prefetchquery ?
      └────────────────────────────────────────────────────────────
016.8% ┌─ R04 — Staleness / refetch / cache lifetime / rerenders
      │ Location: x=5000–15000, y=6500–9500
      │ Labels: 11 | Image uses: 35
      │ Key visible labels: rereders; Staleness when refetch occurs; if after some manipulations the data that is used by so,e c…; Refetch triggers; when a query can become stale stale time vs invalidat queir…; so if staletime has passed or if we marked as stale with in…
      └────────────────────────────────────────────────────────────
018.0% ┌─ R05 — Pagination / InfiniteQuery / keepPreviousData side area
      │ Location: x=0–4500, y=7400–9800
      │ Labels: 5 | Image uses: 10
      │ Key visible labels: PAGINATION; usetransition vs placeholderdata:keeppreviousdata; INFINITESCROLL OPTIONS WHAT DOES USEINFINITEQUERY RETURNS H…; INFINITEQUERY; !!!
      └────────────────────────────────────────────────────────────
024.3% ┌─ R06 — Query composition: useQueries / dependent / combine
      │ Location: x=4500–7300, y=10000–13200
      │ Labels: 5 | Image uses: 10
      │ Key visible labels: use queries dependant queries; COMBINE; NOT PARALLEL; SERIAL EXECUTION, GETTING DATA FOR ONE QUERY THEN FOR ANOTH…; PROMISE.ALL, SHARE LIFECTCLE FETCHING , REFETCHING AND ERRO…
      └────────────────────────────────────────────────────────────
024.5% ┌─ R07 — Prefetch / initialData / placeholderData / useQueryClient
      │ Location: x=7800–10300, y=9800–13600
      │ Labels: 6 | Image uses: 11
      │ Key visible labels: PREFETCHING/ INITIALDATA /PLACEHOLDRDATA, USEQUERYCLIENT; PREFETCH STALETIME AND REFETCHING ON MOUNT ISSUE EVEN WITH …; init data caveats; DOES PREFETCH STALETIME BELONGS TO BOTH PREFETCH AND NORMAL…; !!! can prefetch and then fetch again because of default st…; fetchquery ensurequerydata
      └────────────────────────────────────────────────────────────
027.2% ┌─ R08 — QueryClient methods / filters / cache control
      │ Location: x=10300–19000, y=10500–15450
      │ Labels: 13 | Image uses: 51
      │ Key visible labels: setqueriesdata olddatashape; QUERYCLIENT; QC OUTSIDE REACT; QUERY FILTERS; METHODS OF QC; get queries
      └────────────────────────────────────────────────────────────
031.0% ┌─ R09 — Offline / network mode / validation
      │ Location: x=3600–7800, y=13500–16050
      │ Labels: 7 | Image uses: 16
      │ Key visible labels: OFFLINE network mode; mutations network mode resumepausedmutations; network modes; VALIDATION WITH ZOD; fetchstatus paused; !!!
      └────────────────────────────────────────────────────────────
037.3% ┌─ R10 — Mutations
      │ Location: x=6200–11650, y=16000–19550
      │ Labels: 10 | Image uses: 22
      │ Key visible labels: MUTATIONS; STRUCTURE, CALLBACKS INVALIDATION IN ONSETTLED; CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN; MUTATE VS MUTATEASYNC; SETQUERYDATA RETURN FULL OBJECT LIKE PUT; CALLBACKS AND ARGS
      └────────────────────────────────────────────────────────────
060.4% ┌─ R11 — Websockets / suspense / enabled
      │ Location: x=2300–6600, y=24500–33100
      │ Labels: 5 | Image uses: 28
      │ Key visible labels: when suspence is being shown; websockets; suspence; enabled, what to do; serial suspence not showing nested
      └────────────────────────────────────────────────────────────
059.6% ┌─ R12 — Offline persistence / hydration / pruning
      │ Location: x=7800–17200, y=24800–32000
      │ Labels: 15 | Image uses: 69
      │ Key visible labels: OFFLINE network mode; mutations network mode resumepausedmutations; network modes; fetchstatus paused; persistance + resumepausedmutations; persistqucl vs provider flows
      └────────────────────────────────────────────────────────────
073.5% ┌─ R13 — Cancellation / request cancellation / error handling
      │ Location: x=7000–10600, y=32600–37450
      │ Labels: 9 | Image uses: 18
      │ Key visible labels: cancelling queries; Request cancellation; or better excplicitly cancel queries when you need cancella…; Error handling error boundary; throw on error; will it retry with throwonerror?
      └────────────────────────────────────────────────────────────
077.5% ┌─ R14 — Transitions / urgent vs non-urgent renders
      │ Location: x=2000–4600, y=35800–38100
      │ Labels: 4 | Image uses: 8
      │ Key visible labels: urgent/non urgent updates/rerenders; usetransition; react marksstate updates and rerenders that they cause as u…; use to show that new page is loading while the old page is …
      └────────────────────────────────────────────────────────────
077.1% ┌─ R15 — Testing / MSW / global config / key factories
      │ Location: x=9400–12350, y=34000–39500
      │ Labels: 5 | Image uses: 14
      │ Key visible labels: global/default config; Query key factories; performance structural sharing observers SELECT; Testing; msw
      └────────────────────────────────────────────────────────────
083.6% ┌─ R16 — Performance / select / structural sharing
      │ Location: x=11500–17100, y=37600–42100
      │ Labels: 7 | Image uses: 18
      │ Key visible labels: select; rerendering with/without select; select usage examples; !!!; memoizing selectors to avoid recomputation of select on eve…; so we dont memooize result with usecallback, we memoize the…
      └────────────────────────────────────────────────────────────
086.6% ┌─ R17 — Step-by-step comparison / best practices summary
      │ Location: x=4000–7600, y=39600–43000
      │ Labels: 2 | Image uses: 7
      │ Key visible labels: step by step comparison; best practises summmary key points
      └────────────────────────────────────────────────────────────
```

## Region sequence

```text
R01 → R02 → R03 → R04 → R05 → R06 → R07 → R08 → R09 → R10 → R11 → R12 → R13 → R14 → R15 → R16 → R17
```

## Suggested use during repetition

When generating future questions, include a short location header like:

```text
You are here:
React Query / rquery sheet
→ R10 — Mutations
→ middle-lower part of the full canvas
→ after QueryClient/cache-control area
→ before websockets/suspense/persistence areas
```
