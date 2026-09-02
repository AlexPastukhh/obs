# Knowledge Registry

Source workspace: `_ai-conspects/react router/`

Authoritative processed source: `regions/R01R02R03R04-react-router-final-v001.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and the workspace coverage artifacts.

Original SVG: `source/react router.svg` (present in the local workspace and named by `CURRENT_SOURCE_OF_TRUTH.md`; excluded from Git and not resolvable from the current branch tree).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Router-style selection, route-object trees, nested layouts/outlets, links and active styling, programmatic navigation, URL parameters, location state, and search parameters | `react.react-router-route-tree-and-navigation` | `react` | `../_knowledge/react/react-router-route-tree-and-navigation.md` | MAPPED |
| Route loaders, loader-versus-effect boundaries, route actions and Form submissions, and router-aware component and route testing | `react.react-router-loaders-actions-and-testing` | `react` | `../_knowledge/react/react-router-loaders-actions-and-testing.md` | MAPPED |
| Automatic and explicit revalidation, global navigation state, `shouldRevalidate`, `useRevalidator`, and redirects | `react.react-router-revalidation-navigation-state-and-redirects` | `react` | `../_knowledge/react/react-router-revalidation-navigation-state-and-redirects.md` | MAPPED |
| Route error boundaries, thrown responses versus returned validation data, `useActionData`, server-error mapping to React Hook Form, and return-versus-throw decisions | `react.react-router-route-errors-and-action-data` | `react` | `../_knowledge/react/react-router-route-errors-and-action-data.md` | MAPPED |
| `useFetcher`, `fetcher.Form`, imperative submit/load operations, fetcher state, and local mutation versus navigation boundaries | `react.react-router-fetchers-and-local-mutations` | `react` | `../_knowledge/react/react-router-fetchers-and-local-mutations.md` | MAPPED |
| Shared route-loader data, `useMatches`, route `handle` metadata, and breadcrumb composition | `react.react-router-matches-loader-data-handle-and-breadcrumbs` | `react` | `../_knowledge/react/react-router-matches-loader-data-handle-and-breadcrumbs.md` | MAPPED |
| `<Form>` versus `fetcher.Form`, `useSubmit`, React Hook Form/Zod integration, browser-history behavior, decision rules, and the practical checklist | `react.react-router-forms-react-hook-form-and-history` | `react` | `../_knowledge/react/react-router-forms-react-hook-form-and-history.md` | MAPPED |
| Screenshot/text inventories, extraction and reconstruction notes, coverage accounting, and final audit metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- Routing/navigation, route data writes, revalidation, error data, local fetcher operations, cross-route data/metadata, and form/history integration have distinct state and lifecycle boundaries, so they remain independently reviewable units.
- The 35 learning sections of the authoritative transcript are preserved across the seven units, including representative examples, failure boundaries, and decision checklists.
- Processing and coverage artifacts prove closure but do not constitute learning material.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
