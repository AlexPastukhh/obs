# Support Score Guide

Status: active guide.

Purpose: rules for separate support scoring.

This file owns Support Score rules.

It does not own support-facts table layout.
It does not own support-review rendered layout.
It does not own Work Score.

## Core distinction

Work Score is the main score.

Work Score comes from Finished Sessions and D/F/K/P.

Support Score is separate.

Support Score shows whether sleep, food, movement, stimulus control, and recovery supported the ability to continue work.

Support Score never closes the 35 / 70 work baselines.

## Work baseline

35 Work Points = close old 4y2m baseline.

70 Work Points = close old baseline + current day.

Only Work Score can close these baselines.

## Support Score timing

During the day:

- collect support facts only;
- do not calculate Support Score;
- do not let support facts become work points.

At day close / next morning:

- read support facts from the date-based day file;
- calculate previous-day Support Score approximately;
- write support breakdown and interpretation into the same day file.

## Categories

Max Support Score = 10.

Each category max = 2.

Sleep is special:

- Sleep max = 2;
- Sleep min = -5.

Categories:

| Category | Range | Meaning |
|---|---:|---|
| 🛌 Sleep / sleep attempt | -5..2 | sleep quality, honest attempt to sleep, sleep damage |
| 🍽️ Food / no overload | 0..2 | eating did not overload the body / did not hurt next work |
| 🏃 Movement / sport | 0..2 | walking, sport, physical movement |
| 🧲⚡ Stimulus control | 0..2 | did not ignite stimulus loops; handled pull well |
| 🔋 Recovery / readiness | 0..2 | pauses restored ability to continue work |

Because sleep can be negative, total Support Score may be below zero.

## AI role

For Work Score, preserve the user's D/F/K/P when provided and check only obvious contradictions.

For Support Score, AI may participate more actively:

- collect facts;
- group facts by category;
- suggest approximate scores;
- explain the score;
- compare with previous curated examples;
- point out sleep/food/stimulus effects.

The user may override or adjust the support score.

## Support facts

Support facts may include:

- did not overeat;
- overate;
- moved / walked / sport;
- honest sleep attempt;
- slept;
- failed to sleep;
- pause helped continue;
- pause became stimulus drift;
- avoided igniting stimuli;
- ignited stimuli;
- did health maintenance;
- recovery made next session easier.

## Interpretation

Support Score does not reward avoiding work.

Support Score measures stability and repeatability.

Examples:

Work Score 38 + Support Score 9:
Old baseline beaten and day support was strong.

Work Score 38 + Support Score 1:
Old baseline beaten but the day was fragile / costly.

Work Score 0 + Support Score 9:
Good recovery day, but work baseline not closed.

Work Score 70 + Support Score Red:
Very strong work day, but next-day risk may be high.

## Calibration

Use:

`Examples/Support Score Day Examples.md`

for future scoring calibration.
