# Region Index — React Query / rquery

Stage: **1 / layout-only**

Region IDs are approximate navigation anchors. Later passes may split or merge them after screenshot mapping.

| Region | Normalized name | Approx bbox | Labels | Image uses | Key visible labels | Status |
|---|---|---:|---:|---:|---|---|
| R01 | React Query + browser/HTTP cache | x=3000–6500<br>y=0–1200 | 3 | 3 | react query + browser cache; using react query + http cache with headers from server; you need to do calls with if-match yourself browser does nothing with… | stage1-layout-only |
| R02 | Query basics: statuses, keys, enabled, manual refetch | x=7000–14550<br>y=1200–6500 | 14 | 36 | statuses; examples; fund; enabled; Isloading and when there is no data and no fetching | stage1-layout-only |
| R03 | notifyOnChangeProps / select side notes | x=1500–3600<br>y=3500–6500 | 4 | 7 | notifyonchangeprops; notifyonchangeproops vs select vs structural sharing; when notifyonchanges is useful; why not qc.prefetchquery ? | stage1-layout-only |
| R04 | Staleness / refetch / cache lifetime / rerenders | x=5000–15000<br>y=6500–9500 | 11 | 35 | rereders; Staleness when refetch occurs; if after some manipulations the data that is used by so,e component f…; Refetch triggers; when a query can become stale stale time vs invalidat queires staleti… | stage1-layout-only |
| R05 | Pagination / InfiniteQuery / keepPreviousData side area | x=0–4500<br>y=7400–9800 | 5 | 10 | PAGINATION; usetransition vs placeholderdata:keeppreviousdata; INFINITESCROLL OPTIONS WHAT DOES USEINFINITEQUERY RETURNS HOW GETNEXT…; INFINITEQUERY; !!! | stage1-layout-only |
| R06 | Query composition: useQueries / dependent / combine | x=4500–7300<br>y=10000–13200 | 5 | 10 | use queries dependant queries; COMBINE; NOT PARALLEL; SERIAL EXECUTION, GETTING DATA FOR ONE QUERY THEN FOR ANOTHER; PROMISE.ALL, SHARE LIFECTCLE FETCHING , REFETCHING AND ERRORING | stage1-layout-only |
| R07 | Prefetch / initialData / placeholderData / useQueryClient | x=7800–10300<br>y=9800–13600 | 6 | 11 | PREFETCHING/ INITIALDATA /PLACEHOLDRDATA, USEQUERYCLIENT; PREFETCH STALETIME AND REFETCHING ON MOUNT ISSUE EVEN WITH PREFETCH Q…; init data caveats; DOES PREFETCH STALETIME BELONGS TO BOTH PREFETCH AND NORMAL QUEY?; !!! can prefetch and then fetch again because of default stale time | stage1-layout-only |
| R08 | QueryClient methods / filters / cache control | x=10300–19000<br>y=10500–15450 | 13 | 51 | setqueriesdata olddatashape; QUERYCLIENT; QC OUTSIDE REACT; QUERY FILTERS; METHODS OF QC | stage1-layout-only |
| R09 | Offline / network mode / validation | x=3600–7800<br>y=13500–16050 | 7 | 16 | OFFLINE network mode; mutations network mode resumepausedmutations; network modes; VALIDATION WITH ZOD; fetchstatus paused | stage1-layout-only |
| R10 | Mutations | x=6200–11650<br>y=16000–19550 | 10 | 22 | MUTATIONS; STRUCTURE, CALLBACKS INVALIDATION IN ONSETTLED; CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN; MUTATE VS MUTATEASYNC; SETQUERYDATA RETURN FULL OBJECT LIKE PUT | stage1-layout-only; detailed region already partly audited previously |
| R11 | Websockets / suspense / enabled | x=2300–6600<br>y=24500–33100 | 5 | 28 | when suspence is being shown; websockets; suspence; enabled, what to do; serial suspence not showing nested | stage1-layout-only |
| R12 | Offline persistence / hydration / pruning | x=7800–17200<br>y=24800–32000 | 15 | 69 | OFFLINE network mode; mutations network mode resumepausedmutations; network modes; fetchstatus paused; persistance + resumepausedmutations | stage1-layout-only |
| R13 | Cancellation / request cancellation / error handling | x=7000–10600<br>y=32600–37450 | 9 | 18 | cancelling queries; Request cancellation; or better excplicitly cancel queries when you need cancellation on so…; Error handling error boundary; throw on error | stage1-layout-only |
| R14 | Transitions / urgent vs non-urgent renders | x=2000–4600<br>y=35800–38100 | 4 | 8 | urgent/non urgent updates/rerenders; usetransition; react marksstate updates and rerenders that they cause as urgent and …; use to show that new page is loading while the old page is still on t… | stage1-layout-only |
| R15 | Testing / MSW / global config / key factories | x=9400–12350<br>y=34000–39500 | 5 | 14 | global/default config; Query key factories; performance structural sharing observers SELECT; Testing; msw | stage1-layout-only |
| R16 | Performance / select / structural sharing | x=11500–17100<br>y=37600–42100 | 7 | 18 | select; rerendering with/without select; select usage examples; !!!; memoizing selectors to avoid recomputation of select on every rerender | stage1-layout-only |
| R17 | Step-by-step comparison / best practices summary | x=4000–7600<br>y=39600–43000 | 2 | 7 | step by step comparison; best practises summmary key points | stage1-layout-only |

## Region details

### R01 — React Query + browser/HTTP cache

- Approx bbox: `x=3000–6500`, `y=0–1200`
- Text labels assigned: `3`
- Image uses assigned: `3`
- Status: `stage1-layout-only`

Description:
Top-left/top area. Browser cache, HTTP cache headers, if-match/concurrency note.

Visible labels in this region:

- `L-001` y=10, x=3625: react query + browser cache
- `L-002` y=349, x=4687: using react query + http cache with headers from server
- `L-003` y=621, x=3594: you need to do calls with if-match yourself<br>browser does nothing with it <br>you are handlinkg concurrency 

### R02 — Query basics: statuses, keys, enabled, manual refetch

- Approx bbox: `x=7000–14550`, `y=1200–6500`
- Text labels assigned: `14`
- Image uses assigned: `36`
- Status: `stage1-layout-only`

Description:
Top central/right area. Statuses, examples, enabled/conditional queries, keys, throwing/swallowing errors, manual refetch and query keys.

Visible labels in this region:

- `L-004` y=1806, x=10212: statuses
- `L-005` y=2424, x=11472: examples
- `L-006` y=2842, x=8138: fund
- `L-007` y=3000, x=13105: enabled
- `L-008` y=3047, x=11344: Isloading<br>and when there is no data and no fetching
- `L-009` y=3476, x=13060: conditional queries
- `L-011` y=4155, x=10180: throwing/swallowing errors
- `L-012` y=4279, x=7559: keys
- `L-013` y=4500, x=12733: dont try to interpret disabled quey state in ui
- `L-015` y=4595, x=8609: so when returning usequey<br>we get like a query but <br>dor our specific resource
- `L-016` y=4641, x=12980: move disabled quey to a separate component<br> and mount it only when the condition for queryu is met,<br><br>so you wont mount disabled query, and enable is being used only for preventing shit
- `L-017` y=5085, x=8593: manual refetch and using state to make new<br>queries on that state change for a new key
- `L-020` y=6197, x=12915: RETRY
- `L-021` y=6212, x=11705: with static it can be<br> stale but it wont be refetched automatically on <br>some refetch trigger

### R03 — notifyOnChangeProps / select side notes

- Approx bbox: `x=1500–3600`, `y=3500–6500`
- Text labels assigned: `4`
- Image uses assigned: `7`
- Status: `stage1-layout-only`

Description:
Left-side early area. notifyOnChangeProps and related select/structural-sharing notes.

Visible labels in this region:

- `L-010` y=3688, x=1928: notifyonchangeprops
- `L-014` y=4592, x=2109: notifyonchangeproops vs select vs structural sharing
- `L-018` y=5697, x=2103: when notifyonchanges is useful
- `L-019` y=6148, x=3298: why not qc.prefetchquery ?

### R04 — Staleness / refetch / cache lifetime / rerenders

- Approx bbox: `x=5000–15000`, `y=6500–9500`
- Text labels assigned: `11`
- Image uses assigned: `35`
- Status: `stage1-layout-only`

Description:
Upper-middle area. Staleness, refetch triggers, staleTime/static, gcTime, rerenders and structural sharing/store notes.

Visible labels in this region:

- `L-022` y=6940, x=6562: rereders
- `L-023` y=7005, x=8832: Staleness<br>when refetch occurs
- `L-024` y=7312, x=6449: if after some manipulations the data that is used by so,e component<br>from query has changed - then observer notifies react that rerender is needed
- `L-025` y=7495, x=8134: Refetch triggers
- `L-026` y=7500, x=10142: when a query can become stale<br>stale time vs invalidat queires <br>staletime STATIC
- `L-027` y=7578, x=9070: so if staletime has passed or if we marked as stale with invalidate<br>queries or if we didnt set staletime - by default its 0 <br><br>then we wont get refetch automatically (by default query is stale from the start)<br>it will refetch only if the trigger occursand we didnt removed it in options <br>1 window focus reggained<br>2 reconnect<br>3 new component that is subscribed to stale query mounts<br>4 we invalidate quey (it marks as stale and by default will refetch all active queries)
- `L-029` y=7688, x=14260: so no error thrown bu without auto retry on mount
- `L-030` y=7702, x=5175: structural  sharing, use from query only <br>the data that will cause rerender on change<br><br>acts just like a store
- `L-032` y=8125, x=7983: removing cache that is not being used<br>not active queries<br>gctime
- `L-033` y=8321, x=11445: when refetch can happen with STATIC<br>refetchontrigger: always vs staletime:static
- `L-035` y=9188, x=7602: refetch interval

### R05 — Pagination / InfiniteQuery / keepPreviousData side area

- Approx bbox: `x=0–4500`, `y=7400–9800`
- Text labels assigned: `5`
- Image uses assigned: `10`
- Status: `stage1-layout-only`

Description:
Upper-left/mid-left area. Pagination, InfiniteQuery, infinite scroll options, useTransition vs placeholderData:keepPreviousData.

Visible labels in this region:

- `L-028` y=7661, x=2978: PAGINATION
- `L-031` y=7857, x=106: usetransition vs<br>placeholderdata:keeppreviousdata
- `L-034` y=9185, x=1495: INFINITESCROLL OPTIONS<br><br>WHAT DOES USEINFINITEQUERY RETURNS<br><br>HOW GETNEXTPAGEPARAM WORKS<br><br>HOW DOES IT COMPUTES HASNEXTPAGE
- `L-036` y=9208, x=3195: INFINITEQUERY
- `L-037` y=9437, x=10: !!!

### R06 — Query composition: useQueries / dependent / combine

- Approx bbox: `x=4500–7300`, `y=10000–13200`
- Text labels assigned: `5`
- Image uses assigned: `10`
- Status: `stage1-layout-only`

Description:
Middle-left query-composition area. useQueries, dependent queries, NOT PARALLEL, serial execution, combine, Promise.all lifecycle.

Visible labels in this region:

- `L-039` y=10449, x=5593: use queries<br>dependant queries
- `L-045` y=11040, x=4775: COMBINE
- `L-047` y=11147, x=7044: NOT PARALLEL
- `L-049` y=11319, x=7024: SERIAL EXECUTION, GETTING DATA FOR ONE QUERY THEN FOR ANOTHER 
- `L-054` y=13024, x=6930: PROMISE.ALL, SHARE LIFECTCLE<br>FETCHING , REFETCHING AND ERRORING

### R07 — Prefetch / initialData / placeholderData / useQueryClient

- Approx bbox: `x=7800–10300`, `y=9800–13600`
- Text labels assigned: `6`
- Image uses assigned: `11`
- Status: `stage1-layout-only`

Description:
Middle area. Prefetching, initialData, placeholderData, useQueryClient, prefetch staleTime issue, fetchQuery/ensureQueryData, init data caveats.

Visible labels in this region:

- `L-038` y=10060, x=8655: PREFETCHING/ INITIALDATA<br>/PLACEHOLDRDATA, USEQUERYCLIENT
- `L-048` y=11174, x=8257: PREFETCH STALETIME AND<br>REFETCHING ON MOUNT ISSUE EVEN <br>WITH PREFETCH QUERY
- `L-051` y=11890, x=9486: init data caveats
- `L-052` y=12269, x=7991: DOES PREFETCH STALETIME BELONGS TO<br> BOTH PREFETCH AND NORMAL QUEY?
- `L-055` y=13181, x=8911: !!! can prefetch<br>and then fetch again<br>because of default stale time
- `L-056` y=13543, x=9466: fetchquery<br>ensurequerydata

### R08 — QueryClient methods / filters / cache control

- Approx bbox: `x=10300–19000`, `y=10500–15450`
- Text labels assigned: `13`
- Image uses assigned: `51`
- Status: `stage1-layout-only`

Description:
Middle-right area. QueryClient, filters, methods, QC outside React, get queries, setQueriesData oldDataShape, cancelOptions, remove/reset, getQueryCache/getMutationCache, resumePausedMutations.

Visible labels in this region:

- `L-040` y=10863, x=17894: setqueriesdata<br>olddatashape
- `L-041` y=11020, x=10516: QUERYCLIENT
- `L-042` y=11021, x=15857: QC OUTSIDE REACT
- `L-043` y=11038, x=11756: QUERY FILTERS
- `L-044` y=11039, x=12534: METHODS OF QC
- `L-046` y=11132, x=13805: get queries
- `L-050` y=11365, x=18090: may try to design some abstractions that will <br>ensure that some keys have some specific form
- `L-053` y=12647, x=13730: refetch type VS filters type<br>of invalidate queries
- `L-057` y=13850, x=14636: CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN
- `L-058` y=13865, x=13758: CANCELOPTIONS
- `L-061` y=13987, x=13805: JUST SET SILENT ABD REVERT TRUE ALWAYS
- `L-066` y=15055, x=13675: GETQUERYCACHE <br>GET MUTATIONCACHE
- `L-067` y=15249, x=11482: RESUMEPAUSED MUTATIONS

### R09 — Offline / network mode / validation

- Approx bbox: `x=3600–7800`, `y=13500–16050`
- Text labels assigned: `7`
- Image uses assigned: `16`
- Status: `stage1-layout-only`

Description:
Middle-left/lower-left before mutations. Offline, network modes, fetchStatus paused, mutations network mode, validation with Zod, resumePausedMutations question.

Visible labels in this region:

- `L-059` y=13875, x=5177: OFFLINE<br>network mode
- `L-060` y=13895, x=6244: mutations<br>network mode<br>resumepausedmutations
- `L-062` y=14154, x=3855: <br>network modes
- `L-063` y=14379, x=7723: VALIDATION WITH ZOD
- `L-064` y=14471, x=4987: fetchstatus paused
- `L-068` y=15483, x=6189: !!!
- `L-069` y=15818, x=6374: SHOULD I USE RESUMEPAUSEDMUT<br> WITH OFFLINEFIRST?

### R10 — Mutations

- Approx bbox: `x=6200–11650`, `y=16000–19550`
- Text labels assigned: `10`
- Image uses assigned: `22`
- Status: `stage1-layout-only; detailed region already partly audited previously`

Description:
Middle-lower major region. Mutations, optimistic updates/cancelQueries, structure/callbacks, callback args, invalidation onSettled, setQueryData caveats, mutate vs mutateAsync, pending until revalidation/refetch.

Visible labels in this region:

- `L-070` y=16342, x=8854: MUTATIONS
- `L-071` y=16557, x=7676: STRUCTURE, CALLBACKS<br>INVALIDATION IN ONSETTLED
- `L-072` y=16661, x=6311: CANCELQUERIES IN <br>OPTIMISTIC UPDATES PATTERN
- `L-073` y=16729, x=10587: MUTATE VS MUTATEASYNC
- `L-075` y=17307, x=9048: SETQUERYDATA RETURN FULL OBJECT LIKE PUT
- `L-076` y=17845, x=8023: CALLBACKS AND ARGS
- `L-077` y=18543, x=9226: INVALIDATION ONSETTLED
- `L-078` y=18681, x=9172: SO UPDATING STATE NO MATTER WHAT AND GETTING THE FINAL <br>RESULT AS THE TRUE SERVER STATE NO MATTER WHAT 
- `L-079` y=18807, x=9161: AND NEED TO REMEMBER THAT YOU ARE MANUALLY SETTING CACHE IN BOTH SUCCESS <br>AND ERROR OUTCOMES SO ITS LOGICALLY CORRECT TO GET THE FINAL STATE FROM THE SERVER 
- `L-080` y=19100, x=10573: KEEPING MUTATION IN <br>PENDING STATE UNTIL REVALIDATION + REFETCH

### R11 — Websockets / suspense / enabled

- Approx bbox: `x=2300–6600`, `y=24500–33100`
- Text labels assigned: `5`
- Image uses assigned: `28`
- Status: `stage1-layout-only`

Description:
Lower-middle-left area. Websockets, suspense, when suspense is shown, enabled/what to do, serial suspense/not showing nested.

Visible labels in this region:

- `L-081` y=24954, x=4497: when suspence is being shown
- `L-082` y=25061, x=2582: websockets
- `L-084` y=25348, x=6442: suspence
- `L-098` y=30688, x=5388: enabled, what to do
- `L-101` y=32808, x=5550: serial suspence<br>not showing nested

### R12 — Offline persistence / hydration / pruning

- Approx bbox: `x=7800–17200`, `y=24800–32000`
- Text labels assigned: `15`
- Image uses assigned: `69`
- Status: `stage1-layout-only`

Description:
Lower-middle/right area. Offline/network mode repeated, persistence + resumePausedMutations, persist query client, provider flows, hydrate/dehydrate options, buster, meta filtering, pruning, query.state.

Visible labels in this region:

- `L-083` y=25188, x=10450: OFFLINE<br>network mode
- `L-085` y=25441, x=11744: mutations<br>network mode<br>resumepausedmutations
- `L-086` y=25467, x=9129: <br>network modes
- `L-087` y=25784, x=10260: fetchstatus paused
- `L-088` y=25915, x=13017: persistance + resumepausedmutations
- `L-089` y=27002, x=16858: persistqucl vs provider flows
- `L-090` y=27023, x=15727: persist query client
- `L-091` y=27030, x=11689: !!!
- `L-092` y=27036, x=14416: persistqueryclientsave,subscribe,restore
- `L-093` y=27365, x=11874: SHOULD I USE RESUMEPAUSEDMUT<br> WITH OFFLINEFIRST?
- `L-094` y=28003, x=11822: hydrate/dehydrate options<br>buster
- `L-095` y=28083, x=8115: OFFLINE FIRST CAN TRY TO GET DATA UNTIL IT NEED RETRIES<br>RETRIES WILL BE QUEUED<br>CAN TRY TO GET DATA FROM CACHE
- `L-096` y=28258, x=10101: meta for dehydraton <br>filtering to avoid overpopulaton <br>of the store + acessing metha in queryfn
- `L-097` y=29894, x=10696: pruning
- `L-099` y=31801, x=10668: query.state

### R13 — Cancellation / request cancellation / error handling

- Approx bbox: `x=7000–10600`, `y=32600–37450`
- Text labels assigned: `9`
- Image uses assigned: `18`
- Status: `stage1-layout-only`

Description:
Lower middle area. Cancelling queries, request cancellation, explicit cancel on action, error boundary, throwOnError, retry, queryErrorResetBoundary, retryOnMount.

Visible labels in this region:

- `L-100` y=32779, x=7202: cancelling queries
- `L-102` y=33442, x=9517: Request cancellation
- `L-104` y=34298, x=9634: or better excplicitly cancel queries when you <br>need cancellation on some aciton
- `L-105` y=35152, x=9326: Error handling error boundary
- `L-106` y=35769, x=9667: throw on error
- `L-111` y=36730, x=7455: will it retry with <br>throwonerror?
- `L-112` y=36764, x=8504: flow with catching error in booundary and <br>trying rerender with refetching the query instead<br>of rerendering with error state 
- `L-113` y=36828, x=9641: queryerrorresetboundary
- `L-114` y=37223, x=9439: need retryonmount  true<br>(default)

### R14 — Transitions / urgent vs non-urgent renders

- Approx bbox: `x=2000–4600`, `y=35800–38100`
- Text labels assigned: `4`
- Image uses assigned: `8`
- Status: `stage1-layout-only`

Description:
Lower-left area. useTransition, urgent/non-urgent updates/rerenders, showing new page loading while old page remains.

Visible labels in this region:

- `L-108` y=36229, x=2288: urgent/non urgent updates/rerenders
- `L-109` y=36309, x=4280: usetransition
- `L-110` y=36497, x=2938: react marksstate updates and rerenders that they cause as urgent and non urgent<br>so we can have urgent updates while w are preparing non urgent update that will replace the screen finally
- `L-116` y=38023, x=2348: use to show that new page is <br>loading while the old page is still<br>on the screen

### R15 — Testing / MSW / global config / key factories

- Approx bbox: `x=9400–12350`, `y=34000–39500`
- Text labels assigned: `5`
- Image uses assigned: `14`
- Status: `stage1-layout-only`

Description:
Lower-right-middle area. Global/default config, query key factories, testing, MSW.

Visible labels in this region:

- `L-103` y=34286, x=11952: global/default<br>config
- `L-107` y=35898, x=11967: Query key factories
- `L-115` y=37879, x=11637: performance structural sharing<br>observers<br>SELECT
- `L-118` y=38338, x=9816: Testing
- `L-121` y=39197, x=10988: msw

### R16 — Performance / select / structural sharing

- Approx bbox: `x=11500–17100`, `y=37600–42100`
- Text labels assigned: `7`
- Image uses assigned: `18`
- Status: `stage1-layout-only`

Description:
Bottom-right area. Performance structural sharing/observers/SELECT, select, rerendering with/without select, select usage examples, memoizing selectors, pure selectors.

Visible labels in this region:

- `L-117` y=38132, x=13515: select
- `L-119` y=38643, x=14482: rerendering with/without select
- `L-120` y=38716, x=15930: select usage examples
- `L-123` y=40254, x=16512: !!!
- `L-124` y=41283, x=13485: memoizing selectors to avoid recomputation of select <br>on every rerender
- `L-125` y=41618, x=14927: so we dont memooize result with usecallback, we memoize the reference of the <br>function, we can memoize result with usememo<br><br>we need memoize expensive selectors that do expensive work because <br>rquery can run those selectors every rerender even if the was no change in cache data<br>just because it sees the new reference of the selector<br>so you need to wrap with usecallback
- `L-126` y=41851, x=13641: pure selectors

### R17 — Step-by-step comparison / best practices summary

- Approx bbox: `x=4000–7600`, `y=39600–43000`
- Text labels assigned: `2`
- Image uses assigned: `7`
- Status: `stage1-layout-only`

Description:
Bottom-left/center. Step-by-step comparison and best practices summary/key points.

Visible labels in this region:

- `L-122` y=39928, x=4180: step by step comparison
- `L-127` y=42628, x=7265: best practises summmary<br>key points

