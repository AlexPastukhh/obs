# Repetition Policy

Status: active repetition-tracking policy
Scope: gradual recovery and maintenance of knowledge represented by `_ai-conspects`.

## 1. Purpose

The repetition layer tracks learning state. It does not replace the conspects, transcripts, SVG originals, source audits, or the existing master register that maps a workspace/conspect to its SVG.

The system must answer:

- what should be reviewed next;
- what was recalled before looking at the source;
- what was forgotten or confused;
- whether the textual conspect is trustworthy enough for the current review;
- whether the related SVG should be inspected first;
- which new questions appeared;
- which questions should become part of later reviews.

## 2. Ownership

```text
_repetition/REPETITION_POLICY.md
  = repetition rules and state semantics;

_repetition/REPETITION_INDEX.md
  = current cross-conspect repetition state;

_repetition/QUESTIONS_BACKLOG.md
  = canonical lifecycle of newly discovered questions;

_repetition/REPETITION_ENTRY_TEMPLATE.md
  = canonical shape of one per-conspect review entry;

<conspect workspace>/REPETITION.md
  = append-only review history for that conspect, created lazily on first review;

existing master register / audit
  = workspace ↔ SVG mapping and source-audit authority;

existing conspect/transcript/SVG files
  = study source material.
```

Do not copy the full master register into the repetition layer. Resolve the current mapping from the current local/repository source available for the session. A previously inspected snapshot included a master file named `INDEPENDENT_TRANSCRIPT_AUDIT_MASTER_ALL_306.md`; its filename is useful for discovery but this policy does not hard-code an unverified repository path.

## 3. Two Independent State Axes

### Source status

Source status describes trust in the current textual representation, not the learner.

```text
OK
CHECK_BEFORE_REVIEW
REBUILD_REQUIRED
```

Bootstrap mapping when the current master audit uses these verdicts:

```text
OK_FOR_STUDY                 → OK
NEEDS_EXACT_PASS             → CHECK_BEFORE_REVIEW
NEEDS_REBUILD_OR_TRANSCRIPT  → REBUILD_REQUIRED
```

If the current source uses different/newer verdicts, resolve them explicitly instead of silently forcing this mapping.

### Learning state

Learning state describes recall quality.

```text
NOT_REVIEWED
WEAK
RECOVERING
STABLE
```

Source status and learning state must never be conflated.

## 4. Recall Score

Score recall before reading the source.

```text
0 — practically nothing reconstructed;
1 — isolated fragments only;
2 — core model recalled, substantial gaps remain;
3 — topic reconstructed, mostly detail-level gaps;
4 — confident reconstruction of the topic and important details without hints.
```

The score is evidence from the current session, not a permanent rating of the learner or the conspect.

## 5. Review Types

```text
FULL
  reconstruct the whole topic;

TARGETED
  review selected weak areas;

QUESTIONS_ONLY
  test previously discovered/integrated questions;

SOURCE_REPAIR
  inspect/correct source quality rather than measure recall.
```

A review may have a narrower explicit scope even when the conspect is large.

## 6. SVG Preflight

Before a learning review:

1. Resolve the conspect/workspace in the current master register.
2. Resolve the related SVG and current source/audit status.
3. Decide whether source preflight is needed.
4. When preflight is needed, inspect the SVG before generating source-dependent questions, but do not expose source content to the learner before active recall unless required.
5. Record whether SVG was checked, why, the checked scope, and any source problem found.

Default behavior:

```text
OK
  → textual conspect can normally be used without SVG inspection;

CHECK_BEFORE_REVIEW
  → inspect the relevant SVG scope before relying on uncertain details;

REBUILD_REQUIRED
  → do not treat the textual conspect as authoritative without SVG/source repair.
```

Also inspect SVG when the textual conspect appears internally inconsistent, unexpectedly incomplete, or conflicts with checked knowledge.

## 7. Canonical Review Workflow

```text
1. Select a due or explicitly requested conspect.
2. Resolve workspace → SVG through the current master register.
3. Resolve current source status.
4. Perform SVG/source preflight when required.
5. Run active recall before showing source material.
6. Record provisional recall score 0–4.
7. Ask questions from core model toward details within the selected scope.
8. Compare answers against the checked conspect/SVG/source.
9. Classify findings as:
     learner memory gap;
     source/transcript gap;
     newly discovered question.
10. Add substantial new questions to QUESTIONS_BACKLOG.md.
11. Append a review entry to <workspace>/REPETITION.md.
12. Update REPETITION_INDEX.md current state.
13. Set next review, next type/scope, and focus.
```

## 8. Per-Conspect History

Create `<workspace>/REPETITION.md` only when that conspect is first reviewed.

Keep prior review entries append-only. Corrections may add a correction note, but must not erase evidence that a gap occurred.

The header may contain a compact current summary for convenience; the historical entries remain the evidence.

Repeatedly forgotten areas are useful signals and should remain visible.

## 9. New Question Lifecycle

Every substantial newly discovered question gets a stable ID such as:

```text
Q-modelstate-001
Q-efcore-007
```

Question statuses:

```text
OPEN
RESOLVED
INTEGRATED
DISCARDED
```

Meaning:

- `OPEN`: worth investigating; answer is not yet accepted.
- `RESOLVED`: answer was checked, but it is not automatically part of future review scope.
- `INTEGRATED`: accepted as part of future repetitions of one or more conspects.
- `DISCARDED`: no longer useful or based on a false premise.

Only `INTEGRATED` questions automatically belong to future review scope.

## 10. Scheduling

`Next review` is required when another review is intended.

Until a separate interval algorithm is explicitly adopted, the next date is selected from session evidence rather than from an invented fixed formula.

Guideline only:

```text
0–1  → soon;
2    → short interval;
3    → longer interval;
4    → substantially longer interval.
```

Do not silently convert this guideline into a permanent scheduling algorithm.

## 11. Index Rules

`REPETITION_INDEX.md` is current state, not historical log.

A row may cache the SVG name and source status for convenience, but the existing current master register remains mapping/source-audit authority.

Update the index after each completed review.

## 12. Boundaries

Do not:

- rewrite original conspects merely because a learner forgot something;
- treat a memory gap as proof of a source defect;
- treat a source defect as proof of a memory gap;
- mutate SVG during ordinary repetition;
- duplicate complete question records in both backlog and per-conspect history;
- pre-create hundreds of empty `REPETITION.md` files;
- erase old gaps from history after they are learned;
- automatically integrate every tangent or curiosity into future review scope.
