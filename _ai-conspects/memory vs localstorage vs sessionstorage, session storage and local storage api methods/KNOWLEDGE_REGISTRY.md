# Knowledge Registry

Source conspect: `_ai-conspects/memory vs localstorage vs sessionstorage, session storage and local storage api methods/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/memory vs localstorage vs sessionstorage, session storage and local storage api methods.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| R01 — Storage API, string values, JSON serialization, and safe parsing | `javascript.web-storage-api` | `javascript` | [[../_knowledge/javascript/web-storage-api]] | MAPPED |
| R02 — memory/session/local persistence, sharing, XSS, and token trade-offs | `javascript.browser-storage-lifetimes-and-security` | `javascript` | [[../_knowledge/javascript/browser-storage-lifetimes-and-security]] | MAPPED |
| R03 — theme/draft/redirect helpers and synchronous API cost | `javascript.web-storage-api`; `javascript.browser-storage-lifetimes-and-security` | `javascript` | [[../_knowledge/javascript/web-storage-api]]; [[../_knowledge/javascript/browser-storage-lifetimes-and-security]] | MAPPED |
| R04 — cross-tab events, quotas, and write failures | `javascript.web-storage-events-and-failures` | `javascript` | [[../_knowledge/javascript/web-storage-events-and-failures]] | MAPPED |
| Final checklist | all three units above | `javascript` | [[../_knowledge/javascript/web-storage-api]]; [[../_knowledge/javascript/browser-storage-lifetimes-and-security]]; [[../_knowledge/javascript/web-storage-events-and-failures]] | MAPPED |
| Coverage counts, screenshot/text inventories, audit state, and processing metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- Storage mechanics and serialization are separate from lifetime/security selection.
- Cross-tab events and quota failures form an operational unit with independent recall value.
- R03 is split because its examples apply API mechanics to different lifetime choices.

## Explicit disposition notes

- All four regions, 20 screenshots, and six native SVG labels are mapped.
- No substantial source statement was excluded.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 5 | Every semantic region and checklist is traceable. |
| MERGED | 0 | No semantic duplicate existed. |
| NON_LEARNING | 1 | Coverage and processing metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful claim remains unclassified. |
