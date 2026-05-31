# Support Score Day Examples

Status: active reference examples.

Purpose: curated calibration examples for Support Score estimation.

This file is not a complete factual log.

Detailed real day records live in:

`Days/YYYY/YYYY-MM-DD.md`

Use this file only for representative examples that help future chats estimate Support Score.

## Rules

Support Score is separate from Work Score.

Support Score never closes 35 / 70 work baselines.

During the day, collect facts and/or provisional support marks only.

Support Score is calculated at day close / next morning.

Support Score is an average of support marks.

Do not normalize Support Score to `/10`.

Do not sum categories into a 10-point total.

Sleep is special: it may use strong negative marks, such as `-5`, when sleep collapses.

Support Penalty thresholds are non-cumulative:

| Support Score average | Support Penalty |
|---:|---:|
| `< 1.0` | -20 |
| `< 1.25` and `>= 1.0` | -10 |
| `>= 1.25` | 0 |

Final Day Score:

`Final Day Score = Net Work Score + Support Penalty`

## Example A — High Work Score, weak support

Facts:

- Work Score: 38.
- Moved enough to beat old baseline.
- Overate late.
- Had stimulus drift before sleep.
- Tried to sleep but fell asleep late.

Support Marks:

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 | 🛌 Sleep / sleep attempt | -2 | honest attempt, but sleep was damaged |
| 2 | 🍽️ Food / no overload | 0 | overeating hurt state and sleep risk |
| 3 | 🏃 Movement / sport | 1 | some movement happened |
| 4 | 🧲⚡ Stimulus control | 1 | no full collapse, but drift before sleep |
| 5 | 🔋 Recovery / readiness | 1 | partial recovery only |

Support Score average: `0.2`

Calculation: `(-2 + 0 + 1 + 1 + 1) / 5 = 0.2`

Support Penalty: `-20`

Final Day Score: `38 + (-20) = 18`

Interpretation:

Work baseline was beaten by Work Score, but support was fragile. The final day result is heavily support-penalized and the next day should start recovery-aware.

## Example B — Low Work Score, good support

Facts:

- Work Score: 0–3.
- No serious work baseline progress.
- Slept well.
- Ate normally.
- Walked.
- Avoided major stimulus loops.
- Felt ready for next day.

Support Marks:

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 | 🛌 Sleep / sleep attempt | 2 | good sleep |
| 2 | 🍽️ Food / no overload | 2 | no overload |
| 3 | 🏃 Movement / sport | 1 | some movement |
| 4 | 🧲⚡ Stimulus control | 2 | no major stimulus loop |
| 5 | 🔋 Recovery / readiness | 2 | recovery supported next day |

Support Score average: `1.8`

Calculation: `(2 + 2 + 1 + 2 + 2) / 5 = 1.8`

Support Penalty: `0`

Final Day Score: unchanged from Net Work Score.

Interpretation:

Good recovery/support day, but work baseline was not closed.

## Example C — Sleep collapse

Facts:

- Some work happened.
- Food was acceptable.
- Movement was low.
- Stimulus loop continued late.
- Sleep failed badly.

Support Marks:

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 | 🛌 Sleep / sleep attempt | -5 | sleep foundation failed |
| 2 | 🍽️ Food / no overload | 1 | acceptable but not strong |
| 3 | 🏃 Movement / sport | 0 | no meaningful movement |
| 4 | 🧲⚡ Stimulus control | 0 | stimulus loop hurt sleep |
| 5 | 🔋 Recovery / readiness | 0 | next-day readiness damaged |

Support Score average: `-0.8`

Calculation: `(-5 + 1 + 0 + 0 + 0) / 5 = -0.8`

Support Penalty: `-20`

Final Day Score: `Net Work Score - 20`

Interpretation:

Even if Work Score exists, support was negative because sleep collapsed. The final day result is heavily support-penalized.

## Example D — Borderline support

Facts:

- Work Score: 70.
- Some pauses helped, but recovery was not stable.
- Food and stimulus control were acceptable but not strong.
- Sleep was not collapsed, but not clearly supportive.

Support Marks:

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 | 🛌 Sleep / sleep attempt | 1 | not collapsed, but not strong |
| 2 | 🍽️ Food / no overload | 1 | acceptable |
| 3 | 🧲⚡ Stimulus control | 1.25 | handled enough, not strong |
| 4 | 🔋 Recovery / readiness | 1.25 | helped continue, but fragile |

Support Score average: `1.125`

Calculation: `(1 + 1 + 1.25 + 1.25) / 4 = 1.125`

Support Penalty: `-10`

Final Day Score: `70 - 10 = 60`

Interpretation:

Work full closure was reached, but support was below the required minimum. The final day result is moderately support-penalized.
