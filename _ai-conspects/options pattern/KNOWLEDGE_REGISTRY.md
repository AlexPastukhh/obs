# Knowledge Registry

Source workspace: `_ai-conspects/options pattern/`

Authoritative processed sources: `regions/OPT01-options-validation.md` through `regions/OPT07-optionsmonitor-sensor-station-validation-reload.md`

Original SVG: `source/options pattern.svg`

Evidence and coverage: `data/final-coverage-audit-stage4-v001.json`; all 91 image uses and 30 physical SVG text nodes are reviewed with no missing, duplicate, or unreviewed uses.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| OPT01 DataAnnotations options class and `AddOptions`/`Bind`/`ValidateDataAnnotations` composition | `aspnet-core.options-validation-and-startup-failure` | `aspnet-core` | `../_knowledge/aspnet-core/options-validation-and-startup-failure.md` | MAPPED |
| OPT01 custom predicate rules for HTTPS, required values and cross-field conditions | `aspnet-core.options-validation-and-startup-failure` | `aspnet-core` | `../_knowledge/aspnet-core/options-validation-and-startup-failure.md` | MAPPED |
| OPT01 first-use validation versus startup failure, per-name validation and source-generated perf/trimming/AOT boundary | `aspnet-core.options-validation-and-startup-failure` | `aspnet-core` | `../_knowledge/aspnet-core/options-validation-and-startup-failure.md` | MAPPED |
| OPT02 strongly typed options, section-name constant, dictionary comparer and section binding | `aspnet-core.options-binding-names-and-access-lifetimes` | `aspnet-core` | `../_knowledge/aspnet-core/options-binding-names-and-access-lifetimes.md` | MAPPED |
| OPT02 same-type named sections, representative appsettings and `IOptionsSnapshot.Get(name)` endpoint | `aspnet-core.options-binding-names-and-access-lifetimes` | `aspnet-core` | `../_knowledge/aspnet-core/options-binding-names-and-access-lifetimes.md` | MAPPED |
| OPT03 plus OPT04 S-032 transient/scoped/singleton service lifetimes and `IOptions` static, `IOptionsSnapshot` per-scope, `IOptionsMonitor` live access distinctions | `aspnet-core.options-binding-names-and-access-lifetimes` | `aspnet-core` | `../_knowledge/aspnet-core/options-binding-names-and-access-lifetimes.md` | MAPPED |
| OPT03 strict binder handling of unknown keys and non-public members | `aspnet-core.options-binding-names-and-access-lifetimes` | `aspnet-core` | `../_knowledge/aspnet-core/options-binding-names-and-access-lifetimes.md` | MAPPED |
| OPT03 configure/bind then named `PostConfigure` then `PostConfigureAll` ordering and override/default semantics | `aspnet-core.options-configuration-pipeline-and-di` | `aspnet-core` | `../_knowledge/aspnet-core/options-configuration-pipeline-and-di.md` | MAPPED |
| OPT03 monitor `CurrentValue`, optional local field and immediate `OnChange` reaction choices | `aspnet-core.options-monitor-reload-and-background-services` | `aspnet-core` | `../_knowledge/aspnet-core/options-monitor-reload-and-background-services.md` | MAPPED |
| OPT04 sensor factory/fake service, hosted registration and options-driven threshold/polling scenario | `aspnet-core.options-monitor-reload-and-background-services` | `aspnet-core` | `../_knowledge/aspnet-core/options-monitor-reload-and-background-services.md` | MAPPED |
| OPT04 background constructor subscription, `IDisposable` cleanup and per-cycle `CurrentValue` loop | `aspnet-core.options-monitor-reload-and-background-services` | `aspnet-core` | `../_knowledge/aspnet-core/options-monitor-reload-and-background-services.md` | MAPPED |
| OPT05 `IOptionsFactory` create/configure/post-configure/validate pipeline and same-named-instance composition | `aspnet-core.options-configuration-pipeline-and-di` | `aspnet-core` | `../_knowledge/aspnet-core/options-configuration-pipeline-and-di.md` | MAPPED |
| OPT05 DI-aware `OptionsBuilder.Configure<TDependency>` versus injected configurer classes and second-container `BuildServiceProvider` failure | `aspnet-core.options-configuration-pipeline-and-di` | `aspnet-core` | `../_knowledge/aspnet-core/options-configuration-pipeline-and-di.md` | MAPPED |
| OPT05 cookie scheme as options name, `AddCookie` plus named `AddOptions` composition and handler `IOptionsMonitor.Get` resolution | `aspnet-core.options-configuration-pipeline-and-di` | `aspnet-core` | `../_knowledge/aspnet-core/options-configuration-pipeline-and-di.md` | MAPPED |
| OPT05 server-side ticket lifetime/sliding-expiration alignment and persistent multi-instance Data Protection keys | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MERGED |
| OPT06 normal, post and named configuration interfaces, default/name methods and Snapshot/Monitor named retrieval | `aspnet-core.options-configuration-pipeline-and-di` | `aspnet-core` | `../_knowledge/aspnet-core/options-configuration-pipeline-and-di.md` | MAPPED |
| OPT07 polling interval/sensor-dictionary/low-high validation and source-generated validator application | `aspnet-core.options-validation-and-startup-failure` | `aspnet-core` | `../_knowledge/aspnet-core/options-validation-and-startup-failure.md` | MAPPED |
| OPT07 provider reload, rebinding, CurrentValue/callback sequence and file-share/container/polling-watcher limits | `aspnet-core.options-monitor-reload-and-background-services` | `aspnet-core` | `../_knowledge/aspnet-core/options-monitor-reload-and-background-services.md` | MAPPED |
| Image inventories, staged incomplete-source history, source reconciliation and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Binding/names/access lifetimes, validation, configuration composition/DI, and runtime monitoring each form independent decisions and therefore separate units.
- The sensor implementation remains an integrated monitor example rather than being split into factory and fake-sensor files.
- Cookie ticket persistence and Data Protection lifecycle merge into the existing authentication-ticket unit; only options-pipeline mechanics stay in the new options unit.

| Status | Count |
|---|---:|
| MAPPED | 17 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
