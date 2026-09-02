# Knowledge Registry - Events, delegates, Action

Workspace: `_ai-conspects/events-delegaates-action/`

## Authoritative source

- Authoritative processed sources: `10-full-source-preserving-transcript-v003.md`, `11-technical-corrections-v002.md`, `12-repetition-question-bank-v002.md`, `13-final-near-literal-coverage-audit-v002.md`, `15-transcript-quality-hotfix-v003.md`, and `data/source-ledger-near-literal-v002.*`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`
- Original SVG: `source/events,delegaates,action.svg`
- SHA-256: `58fe05fdd4d608c36102140c4a25a6f8975bc5d914825d20ebc1aea90364778e`
- Git blob: `cfd4c2bd0e189a5df4c5044c8f1f92c426aa3c66`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| S-001–S-014: publisher/subscriber model, `EventHandler` and `EventHandler<TEventArgs>`, custom payload and custom-delegate alternatives, sender, subscription, naming, and compatible handlers | `dotnet.csharp-event-declaration-and-raising` | `dotnet` | `../_knowledge/dotnet/csharp-event-declaration-and-raising.md` | MERGED |
| S-001, S-006–S-007 plus corrections 1–3: protected virtual `On<EventName>` raiser, override/base extensibility, conventional signature, and race-safe stable-reference/null-conditional invocation | `dotnet.csharp-event-declaration-and-raising` | `dotnet` | `../_knowledge/dotnet/csharp-event-declaration-and-raising.md` | MERGED |
| S-019, S-025, S-033, S-035, S-040: `+=`/`-=`, named-handler and stored-lambda identity, publisher-to-subscriber retention, and lifetime-sensitive unsubscription | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MERGED |
| S-016, S-026, S-032: mutable event-args cancellation and the publisher's post-notification decision | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MERGED |
| S-021, S-024, S-030: sequential multicast failure behavior, later-handler suppression, and explicit invocation-list iteration when every handler must be attempted | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MERGED |
| S-022, S-031, S-039 plus correction 4: restricted event member versus callable delegate, same-process notification boundary, and mediator/queue/outbox/integration-event alternatives | `dotnet.csharp-event-subscription-lifetime-and-failure` | `dotnet` | `../_knowledge/dotnet/csharp-event-subscription-lifetime-and-failure.md` | MERGED |
| S-044–S-051 plus correction 5: `Action` arities and void return, custom-delegate equivalence, `Func` result shape, and `Predicate<T>` as boolean test | `dotnet.built-in-delegate-shapes` | `dotnet` | `../_knowledge/dotnet/built-in-delegate-shapes.md` | MERGED |
| S-018, S-020, S-028–S-029, S-036 plus correction 6: `EventHandler<T>` async lambda becoming `async void`, unobservable completion, and post-`await` exception escaping the raiser's `try/catch` | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MERGED |
| S-017, S-027, S-038, S-042: awaitable `Func<..., Task>` callback injection for caller-supplied behavior with controlled placement, sequencing, and exception ownership | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MERGED |
| S-015, S-023, S-034, S-037, S-041, S-043: ASP.NET Core authentication `Events` as awaited callback properties and the async token-validation example | `dotnet.async-callbacks-vs-events` | `dotnet` | `../_knowledge/dotnet/async-callbacks-vs-events.md` | MERGED |
| Historical transcripts and processing/status artifacts (00-source-check-and-boundary-review-v001.md, `10-...-v001.md`, `10-...-v002.md`, `11-technical-corrections-v001.md`, `13-...-v001.md`, `13-...-v002.md`, 14-transcript-quality-correction-v002.md, 15-transcript-quality-hotfix-v003.md, TRANSCRIPT_STATUS.md, MANIFEST.md) | - | - | - | NON_LEARNING |
| Repetition material (`12-repetition-question-bank-v002.md`, with v001 retained historically) | - | - | - | NON_LEARNING |
| Preserved SVG, screenshots, image/source ledgers, native SVG text, and audit assets (source/, data/, audit-assets/) | - | - | - | NON_LEARNING |

## Boundary decisions

### Duplicate source identity

The older `_ai-conspects/events,delegaates,action/` workspace and this workspace identify the same canonical source path and the same material inventory: 51 screenshots and 47 non-empty/native text lines. Claim-by-claim comparison also maps the newer S-001–S-051 transcript completely into the four units created from the older workspace, so this migration MERGES into those canonical IDs rather than creating duplicates. SHA-256 `58fe05fdd4d608c36102140c4a25a6f8975bc5d914825d20ebc1aea90364778e` and Git blob `cfd4c2bd0e189a5df4c5044c8f1f92c426aa3c66` are verified by this newer workspace's SOT; the older SOT does not record a hash.

### v003 and technical corrections

The v003 transcript repairs OCR/Markdown without adding a new semantic area. Claim-by-claim comparison found the four existing units complete except for technical correction 1's explicit stable-reference race boundary; that boundary was added to `dotnet.csharp-event-declaration-and-raising`. All four destinations now include this workspace's v003 provenance.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     0 |
| MERGED       |    10 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 13
Distinct Knowledge IDs: 4 (0 new + 4 merged into existing)
