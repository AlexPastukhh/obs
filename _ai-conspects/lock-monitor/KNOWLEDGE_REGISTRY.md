# Knowledge Registry

Source workspace: `_ai-conspects/lock-monitor/`

Authoritative processed source: `04-source-preserving-transcript-v002.md`

Corrected boundary authority: `00-stage0-source-verification-and-corrected-boundaries-v002.md`

Final coverage audit: `03-stage3-final-coverage-audit.md` (`25/25`, `coverage-complete`)

Original SVG: `source/lock-monitor.svg`

Authority note: `CURRENT_SOURCE_OF_TRUTH.md` records the completed stage files and counts but does not name the later physical v002 correction transcript. The v002 boundary verification, physical v002 transcript, and final coverage audit above form the auditable authority chain used here.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| S-001-S-006 blocking-versus-short-critical-section boundary, private gate ownership, same/different gate behavior, and `lock` lowering with guaranteed release | `dotnet.monitor-mutual-exclusion-and-lock-ownership` | `dotnet` | `../_knowledge/dotnet/monitor-mutual-exclusion-and-lock-ownership.md` | MAPPED |
| S-007-S-015 `Monitor` operation families, `Enter`/`Exit`, immediate and timed `TryEnter`, safe `ref bool` pattern, ownership exceptions, and reentrancy count | `dotnet.monitor-mutual-exclusion-and-lock-ownership` | `dotnet` | `../_knowledge/dotnet/monitor-mutual-exclusion-and-lock-ownership.md` | MAPPED |
| S-016-S-019 `Wait` release/suspend/reacquire lifecycle, `Pulse`/`PulseAll`, mandatory condition loop, producer-consumer implementation, and coordination-not-storage boundary | `dotnet.monitor-condition-waiting-and-signaling` | `dotnet` | `../_knowledge/dotnet/monitor-condition-waiting-and-signaling.md` | MAPPED |
| S-020-S-024 one-versus-all wake-up choice, multi-consumer contention timeline, queue case, and global-condition/shutdown case | `dotnet.monitor-condition-waiting-and-signaling` | `dotnet` | `../_knowledge/dotnet/monitor-condition-waiting-and-signaling.md` | MAPPED |
| S-025 prohibition on `await` inside `lock`, monitor thread-affinity boundary, and `SemaphoreSlim.WaitAsync` alternative with `finally` release | `dotnet.monitor-mutual-exclusion-and-lock-ownership` | `dotnet` | `../_knowledge/dotnet/monitor-mutual-exclusion-and-lock-ownership.md` | MAPPED |
| Coverage and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

