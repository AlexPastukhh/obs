# Repetition Entry Template

Use this template when appending a review to `<workspace>/REPETITION.md`.

Do not create a per-conspect history file until the first actual review.

## Suggested File Header

```markdown
# Repetition — <conspect/workspace>

## Current state

SVG: <resolved from current master register>
Source status: <OK | CHECK_BEFORE_REVIEW | REBUILD_REQUIRED>
Learning state: <NOT_REVIEWED | WEAK | RECOVERING | STABLE>
Last review: <YYYY-MM-DD or —>
Last recall: <0–4 or —>
Next review: <YYYY-MM-DD or —>
Next type / scope: <FULL | TARGETED | QUESTIONS_ONLY | SOURCE_REPAIR + scope>
Open questions:
- <question IDs or —>
```

## Append-Only Review Entry

```markdown
## Review — <YYYY-MM-DD>

Type: <FULL | TARGETED | QUESTIONS_ONLY | SOURCE_REPAIR>
Scope: <whole conspect or explicit subset>

### Source preflight

Master mapping resolved: YES | NO
SVG: <name/path if resolved>
SVG checked: YES | NO
Reason: <source status / observed inconsistency / not required / other>
Checked scope: <full / selected areas / none>
Source problems found:
- <problem or none>

### Recall before looking at source

Could recall:
- <item>

Could not recall:
- <item>

Uncertain / confused:
- <item>

Provisional recall score: <0–4>

### Checked gaps and errors

- <memory gap / wrong model / source defect, clearly classified>

### Newly discovered questions

- <Q-id — short title>
- <none>

### Result

Final recall score: <0–4>
Learning state: <NOT_REVIEWED | WEAK | RECOVERING | STABLE>
Next review: <YYYY-MM-DD or —>
Next type / scope: <type + scope>
Next focus:
- <weak area>
- <integrated question ID>
```

## Classification Rule

When reviewing an error, explicitly distinguish:

```text
MEMORY_GAP
SOURCE_GAP
NEW_QUESTION
```

A source gap must not lower recall merely because the source itself was incomplete. A memory gap must not trigger source repair unless checked evidence indicates a source problem.
