# Knowledge Registry

Source workspace: `_ai-conspects/valuetask/`

Authoritative processed sources: `10-full-source-preserving-transcript-v002.md` and `11-technical-corrections-v002.md`; coverage audit `13-final-near-literal-coverage-audit-v002.md` reports 18/18 source blocks.

Original SVG: `source/valuetask.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| S-003/S-004/S-007/S-010/S-014 mental model, one caller `await`, completed constructor and `FromResult` equivalence | `dotnet.valuetask-synchronous-completion-and-consumption` | `dotnet` | `../_knowledge/dotnet/valuetask-synchronous-completion-and-consumption.md` | MAPPED |
| S-001/S-002/S-005/S-008/S-009 async-ValueTask state machine, `return T` rule and reduced cache-hit benefit | `dotnet.valuetask-synchronous-completion-and-consumption` | `dotnet` | `../_knowledge/dotnet/valuetask-synchronous-completion-and-consumption.md` | MAPPED |
| S-006/S-011 through S-017 non-async cache-first wrapper, EF/HttpClient Task-backed cost, `IValueTaskSource`, single consumption, `.AsTask()` and measured API choice | `dotnet.valuetask-synchronous-completion-and-consumption` | `dotnet` | `../_knowledge/dotnet/valuetask-synchronous-completion-and-consumption.md` | MAPPED |
| S-018 blocking I/O, `Task.Run` thread-pool occupation and async-I/O/background-queue alternatives | `dotnet.server-threadpool-async-io-and-background-work` | `dotnet` | `../_knowledge/dotnet/server-threadpool-async-io-and-background-work.md` | MERGED |

Boundary decision: S-018 is a thread-pool/I/O ownership rule rather than a ValueTask semantic, so it extends the existing server-thread unit. The other source blocks form one independently recallable ValueTask cost-and-consumption model.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 1 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
