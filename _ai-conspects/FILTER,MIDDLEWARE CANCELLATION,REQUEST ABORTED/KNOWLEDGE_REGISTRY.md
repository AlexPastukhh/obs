# Knowledge Registry

Source: `regions/R01-final-transcript.md`; SVG: `source/FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| RequestAborted causes, cancellable-operation propagation and cooperative CPU checks | `aspnet-core.request-aborted-propagation` | `aspnet-core` | `../_knowledge/aspnet-core/request-aborted-propagation.md` | MAPPED |
| Middleware early return, no `next`, `InvokeAsync`, narrow catch and no late response | `aspnet-core.request-aborted-propagation` | `aspnet-core` | `../_knowledge/aspnet-core/request-aborted-propagation.md` | MAPPED |
| Filter token access, no `next`, `context.Result` and outbound cancellation | `aspnet-core.request-aborted-propagation` | `aspnet-core` | `../_knowledge/aspnet-core/request-aborted-propagation.md` | MAPPED |
| Disconnect is not 500; token guard prevents hiding unrelated cancellation | `aspnet-core.request-aborted-propagation` | `aspnet-core` | `../_knowledge/aspnet-core/request-aborted-propagation.md` | MAPPED |
| Evidence map and coverage bookkeeping | — | — | — | NON_LEARNING |

Middleware and filter mechanics remain one request-lifetime cancellation model. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
