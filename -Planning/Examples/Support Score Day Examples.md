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

Interpretation:

Work baseline beaten, but support was fragile. Next day should start recovery-aware.

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

Interpretation:

Even if Work Score exists, support was negative because sleep collapsed.
