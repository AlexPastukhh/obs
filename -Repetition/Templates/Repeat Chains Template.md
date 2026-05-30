# Repeat Chains

Status: draft / active

Purpose:

```text
Source of truth / orientation for repeat units and planned repeat dates.
```

Rules:

```text
- Add rows only for repeat units that actually exist.
- A repeat unit is created by a processing/general-note date.
- Do not add rows for holes.
- Use active local theoretical gaps by default: +5, +10, +20, +40, +80 / review.
- Change a chain only when explicitly rescheduled or documented by recovery decision.
```

## YYYY-MM chains

| Unit | Processing date | +5 | +10 | +20 | +40 | +80 / review | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| `YYYY-MM-DD.area` | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | theoretical |
| `legacy repeat unit` | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD | legacy / review |

## Holes / absent units

Optional. Use only when absence needs to be remembered.

```text
YYYY-MM-DD did not create a repeat unit because no processing/general note existed.
```
