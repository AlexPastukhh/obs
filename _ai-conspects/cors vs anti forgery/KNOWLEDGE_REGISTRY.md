# Knowledge Registry

Source workspace: `_ai-conspects/cors vs anti forgery/`

Authoritative processed source: `FINAL_TRANSCRIPT.md`; `TRANSCRIPT_QUALITY_AUDIT_v002.md` confirms all 20 screenshot blocks and five canvas-label groups are preserved.

Original SVG: `source/cors vs anti forgery.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| S-001 through S-004/S-008/form S-016 cookie-authenticated CSRF, form delivery and CORS response-read boundary | `security.cors-and-antiforgery-boundaries` | `security` | `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MAPPED |
| S-009 through S-011 plus conclusion non-simple JSON preflight failure versus simple/actual request state-change flow | `security.cors-and-antiforgery-boundaries` | `security` | `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MAPPED |
| S-005 through S-007 XHR construction, numeric ready states and XHR-versus-Fetch selection | `javascript.xhr-lifecycle-progress-and-streaming` | `javascript` | `../_knowledge/javascript/xhr-lifecycle-progress-and-streaming.md` | MERGED |
| S-012/S-013/S-015/S-019/S-020 image/tag requests, canvas/read limits, redirects, cache probes and load/error/timing signals | `security.cross-origin-embedding-and-side-channels` | `security` | `../_knowledge/security/cross-origin-embedding-and-side-channels.md` | MAPPED |
| S-014/S-017/S-018 authentication/authorization/antiforgery defenses, JSONP/script execution risk, JSON content type and `nosniff` | `security.cross-origin-embedding-and-side-channels`; `security.cors-and-antiforgery-boundaries` | `security` | `../_knowledge/security/cross-origin-embedding-and-side-channels.md`; `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MAPPED |

Boundary decision: the workspace contains three semantic models: CORS-versus-CSRF security, cross-origin embedding/side channels, and the browser XHR API. The XHR material extends its existing lifecycle unit rather than creating a duplicate.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 1 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
