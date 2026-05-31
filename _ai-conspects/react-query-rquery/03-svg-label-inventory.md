# SVG Label Inventory — Stage 1

Source: `full.svg` text elements.  
Sorted by vertical position, then horizontal position.

Important: this is source label inventory, not a cleaned note.

| Label ID | Region | y% | x | y | font | lines | Original visible text |
|---|---|---:|---:|---:|---:|---:|---|
| L-001 | R01 | 0.02% | 3625 | 10 | 174.66674804687506 | 1 | react query + browser cache |
| L-002 | R01 | 0.73% | 4687 | 349 | 58.400000000000006 | 1 | using react query + http cache with headers from server |
| L-003 | R01 | 1.30% | 3594 | 621 | 41.33333333333333 | 3 | you need to do calls with if-match yourself<br>browser does nothing with it <br>you are handlinkg concurrency  |
| L-004 | R02 | 3.79% | 10212 | 1806 | 76.53334960937502 | 1 | statuses |
| L-005 | R02 | 5.08% | 11472 | 2424 | 64.44441731770057 | 1 | examples |
| L-006 | R02 | 5.96% | 8138 | 2842 | 20.0 | 1 | fund |
| L-007 | R02 | 6.29% | 13105 | 3000 | 329.333312988281 | 1 | enabled |
| L-008 | R02 | 6.39% | 11344 | 3047 | 79.04761323474233 | 2 | Isloading<br>and when there is no data and no fetching |
| L-009 | R02 | 7.29% | 13060 | 3476 | 98.93330078124997 | 1 | conditional queries |
| L-010 | R03 | 7.74% | 1928 | 3688 | 99.99999999999996 | 1 | notifyonchangeprops |
| L-011 | R02 | 8.72% | 10180 | 4155 | 52.00000000000004 | 1 | throwing/swallowing errors |
| L-012 | R02 | 8.98% | 7559 | 4279 | 91.11112467448694 | 1 | keys |
| L-013 | R02 | 9.44% | 12733 | 4500 | 73.33332519531254 | 1 | dont try to interpret disabled quey state in ui |
| L-014 | R03 | 9.63% | 2109 | 4592 | 20.0 | 1 | notifyonchangeproops vs select vs structural sharing |
| L-015 | R02 | 9.64% | 8609 | 4595 | 20.0 | 3 | so when returning usequey<br>we get like a query but <br>dor our specific resource |
| L-016 | R02 | 9.74% | 12980 | 4641 | 20.0 | 4 | move disabled quey to a separate component<br> and mount it only when the condition for queryu is met,<br><br>so you wont mount disabled query, and enable is being used only for preventing shit |
| L-017 | R02 | 10.67% | 8593 | 5085 | 81.77773030598179 | 2 | manual refetch and using state to make new<br>queries on that state change for a new key |
| L-018 | R03 | 11.95% | 2103 | 5697 | 20.0 | 1 | when notifyonchanges is useful |
| L-019 | R03 | 12.90% | 3298 | 6148 | 53.77779134114684 | 1 | why not qc.prefetchquery ? |
| L-020 | R02 | 13.00% | 12915 | 6197 | 148.00000000000003 | 1 | RETRY |
| L-021 | R02 | 13.03% | 11705 | 6212 | 44.888888888889056 | 3 | with static it can be<br> stale but it wont be refetched automatically on <br>some refetch trigger |
| L-022 | R04 | 14.56% | 6562 | 6940 | 172.88891601562503 | 1 | rereders |
| L-023 | R04 | 14.70% | 8832 | 7005 | 131.63636363636394 | 2 | Staleness<br>when refetch occurs |
| L-024 | R04 | 15.34% | 6449 | 7312 | 24.266662597656254 | 2 | if after some manipulations the data that is used by so,e component<br>from query has changed - then observer notifies react that rerender is needed |
| L-025 | R04 | 15.72% | 8134 | 7495 | 63.636363636363264 | 1 | Refetch triggers |
| L-026 | R04 | 15.74% | 10142 | 7500 | 57.214822048610976 | 3 | when a query can become stale<br>stale time vs invalidat queires <br>staletime STATIC |
| L-027 | R04 | 15.90% | 9070 | 7578 | 20.0 | 9 | so if staletime has passed or if we marked as stale with invalidate<br>queries or if we didnt set staletime - by default its 0 <br><br>then we wont get refetch automatically (by default query is stale from the start)<br>it will refetch only if the trigger occursand we didnt removed it in options <br>1 window focus reggained<br>2 reconnect<br>3 new component that is subscribed to stale query mounts<br>4 we invalidate quey (it marks as stale and by default will refetch all active queries) |
| L-028 | R05 | 16.07% | 2978 | 7661 | 180.00000000000006 | 1 | PAGINATION |
| L-029 | R04 | 16.13% | 14260 | 7688 | 20.0 | 1 | so no error thrown bu without auto retry on mount |
| L-030 | R04 | 16.16% | 5175 | 7702 | 34.39999999999998 | 4 | structural  sharing, use from query only <br>the data that will cause rerender on change<br><br>acts just like a store |
| L-031 | R05 | 16.48% | 106 | 7857 | 71.55554199218747 | 2 | usetransition vs<br>placeholderdata:keeppreviousdata |
| L-032 | R04 | 17.05% | 7983 | 8125 | 48.444446910511324 | 3 | removing cache that is not being used<br>not active queries<br>gctime |
| L-033 | R04 | 17.46% | 11445 | 8321 | 37.45454545454557 | 2 | when refetch can happen with STATIC<br>refetchontrigger: always vs staletime:static |
| L-034 | R05 | 19.27% | 1495 | 9185 | 43.77142857142858 | 7 | INFINITESCROLL OPTIONS<br><br>WHAT DOES USEINFINITEQUERY RETURNS<br><br>HOW GETNEXTPAGEPARAM WORKS<br><br>HOW DOES IT COMPUTES HASNEXTPAGE |
| L-035 | R04 | 19.28% | 7602 | 9188 | 117.77775065104353 | 1 | refetch interval |
| L-036 | R05 | 19.32% | 3195 | 9208 | 76.88883463541566 | 1 | INFINITEQUERY |
| L-037 | R05 | 19.80% | 10 | 9437 | 78.38597347861796 | 1 | !!! |
| L-038 | R07 | 21.11% | 8655 | 10060 | 163.99999999999994 | 2 | PREFETCHING/ INITIALDATA<br>/PLACEHOLDRDATA, USEQUERYCLIENT |
| L-039 | R06 | 21.92% | 5593 | 10449 | 254.66662597656241 | 2 | use queries<br>dependant queries |
| L-040 | R08 | 22.79% | 17894 | 10863 | 126.66666666666684 | 2 | setqueriesdata<br>olddatashape |
| L-041 | R08 | 23.12% | 10516 | 11020 | 109.60000000000004 | 1 | QUERYCLIENT |
| L-042 | R08 | 23.12% | 15857 | 11021 | 105.37636215582607 | 1 | QC OUTSIDE REACT |
| L-043 | R08 | 23.16% | 11756 | 11038 | 63.851860894096895 | 1 | QUERY FILTERS |
| L-044 | R08 | 23.16% | 12534 | 11039 | 93.20783781413334 | 1 | METHODS OF QC |
| L-045 | R06 | 23.16% | 4775 | 11040 | 85.77775065104063 | 1 | COMBINE |
| L-046 | R08 | 23.35% | 13805 | 11132 | 105.37636215582607 | 1 | get queries |
| L-047 | R06 | 23.39% | 7044 | 11147 | 85.77775065104063 | 1 | NOT PARALLEL |
| L-048 | R07 | 23.44% | 8257 | 11174 | 48.110340896446694 | 3 | PREFETCH STALETIME AND<br>REFETCHING ON MOUNT ISSUE EVEN <br>WITH PREFETCH QUERY |
| L-049 | R06 | 23.75% | 7024 | 11319 | 20.0 | 1 | SERIAL EXECUTION, GETTING DATA FOR ONE QUERY THEN FOR ANOTHER  |
| L-050 | R08 | 23.84% | 18090 | 11365 | 20.0 | 2 | may try to design some abstractions that will <br>ensure that some keys have some specific form |
| L-051 | R07 | 24.94% | 9486 | 11890 | 110.84094158496742 | 1 | init data caveats |
| L-052 | R07 | 25.74% | 7991 | 12269 | 49.87902151996967 | 2 | DOES PREFETCH STALETIME BELONGS TO<br> BOTH PREFETCH AND NORMAL QUEY? |
| L-053 | R08 | 26.53% | 13730 | 12647 | 79.25922309027808 | 2 | refetch type VS filters type<br>of invalidate queries |
| L-054 | R06 | 27.32% | 6930 | 13024 | 50.35898061899039 | 2 | PROMISE.ALL, SHARE LIFECTCLE<br>FETCHING , REFETCHING AND ERRORING |
| L-055 | R07 | 27.65% | 8911 | 13181 | 20.0 | 3 | !!! can prefetch<br>and then fetch again<br>because of default stale time |
| L-056 | R07 | 28.41% | 9466 | 13543 | 51.030273437500014 | 2 | fetchquery<br>ensurequerydata |
| L-057 | R08 | 29.06% | 14636 | 13850 | 73.33334585336415 | 1 | CANCELQUERIES IN OPTIMISTIC UPDATES PATTERN |
| L-058 | R08 | 29.09% | 13758 | 13865 | 68.41026893028756 | 1 | CANCELOPTIONS |
| L-059 | R09 | 29.11% | 5177 | 13875 | 126.6666666666672 | 2 | OFFLINE<br>network mode |
| L-060 | R09 | 29.15% | 6244 | 13895 | 126.6666666666672 | 3 | mutations<br>network mode<br>resumepausedmutations |
| L-061 | R08 | 29.34% | 13805 | 13987 | 18.47617885044601 | 1 | JUST SET SILENT ABD REVERT TRUE ALWAYS |
| L-062 | R09 | 29.69% | 3855 | 14154 | 126.6666666666672 | 2 | <br>network modes |
| L-063 | R09 | 30.17% | 7723 | 14379 | 73.33325195312499 | 1 | VALIDATION WITH ZOD |
| L-064 | R09 | 30.36% | 4987 | 14471 | 126.6666666666672 | 1 | fetchstatus paused |
| L-065 | UNASSIGNED | 31.05% | 9304 | 14799 | 51.030273437500014 | 1 | REMOVEQUERIES RESETQUERIES |
| L-066 | R08 | 31.58% | 13675 | 15055 | 61.33331298828125 | 2 | GETQUERYCACHE <br>GET MUTATIONCACHE |
| L-067 | R08 | 31.99% | 11482 | 15249 | 54.66662597656251 | 1 | RESUMEPAUSED MUTATIONS |
| L-068 | R09 | 32.48% | 6189 | 15483 | 129.47368421052627 | 1 | !!! |
| L-069 | R09 | 33.19% | 6374 | 15818 | 50.90603715945562 | 2 | SHOULD I USE RESUMEPAUSEDMUT<br> WITH OFFLINEFIRST? |
| L-070 | R10 | 34.28% | 8854 | 16342 | 228.0000000000001 | 1 | MUTATIONS |
| L-071 | R10 | 34.74% | 7676 | 16557 | 79.52380807059161 | 2 | STRUCTURE, CALLBACKS<br>INVALIDATION IN ONSETTLED |
| L-072 | R10 | 34.95% | 6311 | 16661 | 73.33334585336415 | 2 | CANCELQUERIES IN <br>OPTIMISTIC UPDATES PATTERN |
| L-073 | R10 | 35.10% | 10587 | 16729 | 68.0 | 1 | MUTATE VS MUTATEASYNC |
| L-074 | UNASSIGNED | 35.18% | 2842 | 16770 | 20.0 | 3 | OFFLINE FIRST CAN TRY TO GET DATA UNTIL IT NEED RETRIES<br>RETRIES WILL BE QUEUED<br>CAN TRY TO GET DATA FROM CACHE |
| L-075 | R10 | 36.31% | 9048 | 17307 | 45.21213600852207 | 1 | SETQUERYDATA RETURN FULL OBJECT LIKE PUT |
| L-076 | R10 | 37.44% | 8023 | 17845 | 63.48715444711559 | 1 | CALLBACKS AND ARGS |
| L-077 | R10 | 38.90% | 9226 | 18543 | 64.19049944196448 | 1 | INVALIDATION ONSETTLED |
| L-078 | R10 | 39.19% | 9172 | 18681 | 20.0 | 2 | SO UPDATING STATE NO MATTER WHAT AND GETTING THE FINAL <br>RESULT AS THE TRUE SERVER STATE NO MATTER WHAT  |
| L-079 | R10 | 39.46% | 9161 | 18807 | 20.0 | 2 | AND NEED TO REMEMBER THAT YOU ARE MANUALLY SETTING CACHE IN BOTH SUCCESS <br>AND ERROR OUTCOMES SO ITS LOGICALLY CORRECT TO GET THE FINAL STATE FROM THE SERVER  |
| L-080 | R10 | 40.07% | 10573 | 19100 | 52.000000000000036 | 2 | KEEPING MUTATION IN <br>PENDING STATE UNTIL REVALIDATION + REFETCH |
| L-081 | R11 | 52.35% | 4497 | 24954 | 77.90478515624996 | 1 | when suspence is being shown |
| L-082 | R11 | 52.58% | 2582 | 25061 | 209.86650390624996 | 1 | websockets |
| L-083 | R12 | 52.84% | 10450 | 25188 | 126.6666666666672 | 2 | OFFLINE<br>network mode |
| L-084 | R11 | 53.18% | 6442 | 25348 | 170.85714285714195 | 1 | suspence |
| L-085 | R12 | 53.38% | 11744 | 25441 | 126.6666666666672 | 3 | mutations<br>network mode<br>resumepausedmutations |
| L-086 | R12 | 53.43% | 9129 | 25467 | 126.6666666666672 | 2 | <br>network modes |
| L-087 | R12 | 54.09% | 10260 | 25784 | 126.6666666666672 | 1 | fetchstatus paused |
| L-088 | R12 | 54.37% | 13017 | 25915 | 103.20004882812498 | 1 | persistance + resumepausedmutations |
| L-089 | R12 | 56.65% | 16858 | 27002 | 61.33331298828126 | 1 | persistqucl vs provider flows |
| L-090 | R12 | 56.69% | 15727 | 27023 | 56.26665039062502 | 1 | persist query client |
| L-091 | R12 | 56.71% | 11689 | 27030 | 129.47368421052627 | 1 | !!! |
| L-092 | R12 | 56.72% | 14416 | 27036 | 48.8 | 1 | persistqueryclientsave,subscribe,restore |
| L-093 | R12 | 57.41% | 11874 | 27365 | 50.90603715945562 | 2 | SHOULD I USE RESUMEPAUSEDMUT<br> WITH OFFLINEFIRST? |
| L-094 | R12 | 58.75% | 11822 | 28003 | 80.66668701171872 | 2 | hydrate/dehydrate options<br>buster |
| L-095 | R12 | 58.92% | 8115 | 28083 | 20.0 | 3 | OFFLINE FIRST CAN TRY TO GET DATA UNTIL IT NEED RETRIES<br>RETRIES WILL BE QUEUED<br>CAN TRY TO GET DATA FROM CACHE |
| L-096 | R12 | 59.29% | 10101 | 28258 | 79.7333414713542 | 3 | meta for dehydraton <br>filtering to avoid overpopulaton <br>of the store + acessing metha in queryfn |
| L-097 | R12 | 62.72% | 10696 | 29894 | 62.666601562499984 | 1 | pruning |
| L-098 | R11 | 64.38% | 5388 | 30688 | 170.85714285714195 | 1 | enabled, what to do |
| L-099 | R12 | 66.72% | 10668 | 31801 | 53.77775065104215 | 1 | query.state |
| L-100 | R13 | 68.77% | 7202 | 32779 | 159.99999999999997 | 1 | cancelling queries |
| L-101 | R11 | 68.83% | 5550 | 32808 | 97.93938654119265 | 2 | serial suspence<br>not showing nested |
| L-102 | R13 | 70.16% | 9517 | 33442 | 150.66668701171872 | 1 | Request cancellation |
| L-103 | R15 | 71.93% | 11952 | 34286 | 136.44447835286408 | 2 | global/default<br>config |
| L-104 | R13 | 71.96% | 9634 | 34298 | 44.205134465145235 | 2 | or better excplicitly cancel queries when you <br>need cancellation on some aciton |
| L-105 | R13 | 73.75% | 9326 | 35152 | 114.66668701171875 | 1 | Error handling error boundary |
| L-106 | R13 | 75.04% | 9667 | 35769 | 114.66668701171875 | 1 | throw on error |
| L-107 | R15 | 75.31% | 11967 | 35898 | 92.88891601562493 | 1 | Query key factories |
| L-108 | R14 | 76.01% | 2288 | 36229 | 88.26669921875003 | 1 | urgent/non urgent updates/rerenders |
| L-109 | R14 | 76.18% | 4280 | 36309 | 107.99999999999997 | 1 | usetransition |
| L-110 | R14 | 76.57% | 2938 | 36497 | 20.0 | 2 | react marksstate updates and rerenders that they cause as urgent and non urgent<br>so we can have urgent updates while w are preparing non urgent update that will replace the screen finally |
| L-111 | R13 | 77.06% | 7455 | 36730 | 85.1851671006945 | 2 | will it retry with <br>throwonerror? |
| L-112 | R13 | 77.13% | 8504 | 36764 | 40.543221932870296 | 3 | flow with catching error in booundary and <br>trying rerender with refetching the query instead<br>of rerendering with error state  |
| L-113 | R13 | 77.26% | 9641 | 36828 | 114.66668701171875 | 1 | queryerrorresetboundary |
| L-114 | R13 | 78.09% | 9439 | 37223 | 20.0 | 2 | need retryonmount  true<br>(default) |
| L-115 | R15 | 79.47% | 11637 | 37879 | 95.85186089409738 | 3 | performance structural sharing<br>observers<br>SELECT |
| L-116 | R14 | 79.77% | 2348 | 38023 | 34.26262133049267 | 3 | use to show that new page is <br>loading while the old page is still<br>on the screen |
| L-117 | R16 | 80.00% | 13515 | 38132 | 203.1111246744782 | 1 | select |
| L-118 | R15 | 80.43% | 9816 | 38338 | 138.6666259765625 | 1 | Testing |
| L-119 | R16 | 81.07% | 14482 | 38643 | 44.88888888888902 | 1 | rerendering with/without select |
| L-120 | R16 | 81.23% | 15930 | 38716 | 48.71796123797979 | 1 | select usage examples |
| L-121 | R15 | 82.24% | 10988 | 39197 | 199.19999999999993 | 1 | msw |
| L-122 | R17 | 83.77% | 4180 | 39928 | 58.666687011718714 | 1 | step by step comparison |
| L-123 | R16 | 84.45% | 16512 | 40254 | 129.1281926081727 | 1 | !!! |
| L-124 | R16 | 86.61% | 13485 | 41283 | 107.11111653645844 | 2 | memoizing selectors to avoid recomputation of select <br>on every rerender |
| L-125 | R16 | 87.31% | 14927 | 41618 | 20.0 | 7 | so we dont memooize result with usecallback, we memoize the reference of the <br>function, we can memoize result with usememo<br><br>we need memoize expensive selectors that do expensive work because <br>rquery can run those selectors every rerender even if the was no change in cache data<br>just because it sees the new reference of the selector<br>so you need to wrap with usecallback |
| L-126 | R16 | 87.80% | 13641 | 41851 | 96.79999999999997 | 1 | pure selectors |
| L-127 | R17 | 89.43% | 7265 | 42628 | 103.047607421875 | 2 | best practises summmary<br>key points |
