# Knowledge Registry

Source workspace: `_ai-conspects/iframe,cross window communication,target/`

Authoritative processed source: `06-full-combined-final-transcript.md`

Authoritative audit: `07-full-conspect-final-coverage-audit.md`

Original SVG: `source/iframe,cross window communication,target.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 browsing-context model, iframe lifecycle, references, same-origin inspection boundary, sandbox and anti-framing controls | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MAPPED |
| R01 same-origin direct coupling versus cross-origin messaging and alternative channel choices | `javascript.cross-window-postmessage-security` | `javascript` | `../_knowledge/javascript/cross-window-postmessage-security.md` | MAPPED |
| R02 iframe/popup placement, creation, use cases, activation, opener/sandbox/Permissions Policy risks and UX caveats | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MAPPED |
| R03 window references/methods/properties and navigation/name behavior | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MAPPED |
| R03 exact target origin, structured clone/transferables, origin/source/schema validation, cleanup and versioned handshake | `javascript.cross-window-postmessage-security` | `javascript` | `../_knowledge/javascript/cross-window-postmessage-security.md` | MAPPED |
| R04 `window.open` arguments, feature hints, activation/blocking, opener isolation and popup lifecycle | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MAPPED |
| R05 special/named targets, HTML versus `window.open` defaults, reuse, security and accessibility | `javascript.browsing-contexts-popups-and-targets` | `javascript` | `../_knowledge/javascript/browsing-contexts-popups-and-targets.md` | MAPPED |
| Coverage and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

Boundary decision: browsing-context identity, popup/iframe lifecycle and target selection remain one navigation/lifecycle unit; the explicit `postMessage` trust protocol is independently recallable and therefore separate.
