# Knowledge Registry

Source workspace: `_ai-conspects/donwloading files, blob,window.location,signed uri, showsavefilepicker createwritable/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04R05-semantic-transcript-final-v001.md`)

Original SVG: `source/donwloading files, blob,window.location,signed uri, showsavefilepicker createwritable.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 57 of 57 screenshot uses and 40 of 40 native SVG labels are closed.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 `Content-Disposition` attachment/inline behavior, MIME/browser boundary and ASP.NET Core `File(...)` response | `http.content-disposition-filenames` | `http` | `../_knowledge/http/content-disposition-filenames.md` | MERGED |
| R01 simple browser-native GET through anchor/current-tab navigation and download-attribute limitations | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MAPPED |
| R01 `window.location` current-context behavior, `window.open`/anchor target selection and `noopener` | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MERGED |
| R02 fetch/Axios Blob buffering, object-URL creation and revoke-after-use lifecycle | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MAPPED |
| R02 Blob MIME/display behavior, anchor-forced download and original-response-versus-new-Blob-URL ownership | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MAPPED |
| R02-R03 `Content-Disposition` as fetched filename metadata, `filename`/`filename*` forms and CORS exposure | `http.content-disposition-filenames` | `http` | `../_knowledge/http/content-disposition-filenames.md` | MERGED |
| R03 integrated response-to-Blob-to-safe-filename-to-anchor flow and robust-parser boundary | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MAPPED |
| R03 strategy selection across cookie/simple GET, bearer/custom-header or POST Blob flow and very-large-file handling | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MAPPED |
| R03 SameSite/Secure/domain/path and credentialed-fetch cookie-delivery axes | `http.browser-cookie-delivery-and-security` | `http` | `../_knowledge/http/browser-cookie-delivery-and-security.md` | MERGED |
| R03 protected prepare call, scoped short-lived signed URL and browser-native streaming handoff | `security.signed-download-url-handoff` | `security` | `../_knowledge/security/signed-download-url-handoff.md` | MAPPED |
| R04 `showSaveFilePicker` naming/location/type/ID/all-files options and remembered-purpose behavior | `javascript.file-system-access-save-and-streaming` | `javascript` | `../_knowledge/javascript/file-system-access-save-and-streaming.md` | MAPPED |
| R04 `createWritable`, write/close commit and response-body `pipeTo` without a giant Blob | `javascript.file-system-access-save-and-streaming` | `javascript` | `../_knowledge/javascript/file-system-access-save-and-streaming.md` | MAPPED |
| R04 `keepExistingData`, seek/edit mechanics and exclusive-versus-siloed writer concurrency | `javascript.file-system-access-save-and-streaming` | `javascript` | `../_knowledge/javascript/file-system-access-save-and-streaming.md` | MAPPED |
| R04 secure-context/user-activation/browser/permission requirements and Blob-anchor fallback | `javascript.file-system-access-save-and-streaming` | `javascript` | `../_knowledge/javascript/file-system-access-save-and-streaming.md` | MAPPED |
| Screenshot/text inventories, coverage reconciliation and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Native navigation and fetch/Blob are kept together as one browser download decision model; the object-URL lifetime and original-response boundary depend on comparing those strategies.
- The protected signed-URL handoff is a separate security capability because its scope, lifetime, replay and logging concerns remain useful outside one JavaScript implementation.
- File System Access has a distinct permission, temporary-write and commit lifecycle and therefore forms its own unit.
- Protocol-level disposition/filename and cookie-delivery claims merge into existing HTTP units, while popup target mechanics merge into the existing browsing-context unit.

| Status | Count |
|---|---:|
| MAPPED | 10 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

