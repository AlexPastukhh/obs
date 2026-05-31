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

- collect support facts and/or provisional support marks;
- do not calculate final Support Score;
- do not let support facts become work points.

At day close / next morning:

- read support facts from the date-based day file;
- calculate previous-day Support Score approximately;
- calculate Support Penalty if the average is too low;
- write support breakdown, penalty, and interpretation into the same day file.

## Support marks

Support Score is calculated as an average of support marks.

Do not normalize Support Score to `/10`.

Do not calculate `Max Support Score = 10`.

Do not sum categories into a 10-point total.

Formula:

`Support Score = average(support marks used for the day)`

Example:

`(1.25 + 1.5) / 2 = 1.375`

Support marks are approximate and individual.

Typical positive marks often use a `0..2` feel-scale, where:

| Mark | Meaning |
|---:|---|
| 0 | did not support continuation / neutral-to-weak |
| 1 | partially supported continuation |
| 2 | strongly supported continuation |

Sleep can be strongly negative when it damages the day or next day.

Sleep may use negative marks such as `-5` for a major sleep collapse.

Because sleep can be negative, average Support Score may be below zero.

## Day-close Support Penalty

After Support Score average is calculated, apply a day-close Support Penalty if support was too low.

Thresholds are non-cumulative.

Use the strongest matching penalty only:

| Support Score average | Support Penalty | Meaning |
|---:|---:|---|
| `< 1.0` | `-20` | support was too weak / fragile; large day-final penalty |
| `< 1.25` and `>= 1.0` | `-10` | support was below required minimum; moderate day-final penalty |
| `>= 1.25` | `0` | no support penalty |

Formula:

`Final Day Score = Net Work Score + Support Penalty`

Support Penalty is not a session penalty and is not a Penalty Event.

Support Penalty must be shown separately from Work Score and Penalty Events.

Work Score, Finished Sessions, and D/F/K/P session records are not rewritten by Support Penalty.

Baseline closure from Work Score remains visible, but the final day result must also show whether support reduced the final day score.

## Support categories

Categories help group facts and choose marks.

They are not summed into a 10-point score.

| Category | What it measures |
|---|---|
| 🛌 Sleep / sleep attempt | sleep quality, honest attempt to sleep, sleep damage |
| 🍽️ Food / no overload | eating did not overload the body / did not hurt next work |
| 🏃 Movement / sport | walking, sport, physical movement |
| 🧲⚡ Stimulus control | did not ignite stimulus loops; handled pull well |
| 🔋 Recovery / readiness | pauses restored ability to continue work |

A day may have several marks from the same category.

If the user gives explicit support marks, preserve them and average them unless there is an obvious contradiction.

If the user gives only facts, AI may suggest approximate marks and then average the chosen marks.

## AI role

For Work Score, preserve the user's D/F/K/P when provided and check only obvious contradictions.

For Support Score, AI may participate more actively:

- collect facts;
- group facts by category;
- suggest approximate support marks;
- calculate the average support mark;
- calculate the Support Penalty from thresholds;
- explain the score and penalty;
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

Work Score 38 + Support Score avg 1.8 + Support Penalty 0:
Old baseline beaten and day support was strong.

Work Score 38 + Support Score avg 1.1 + Support Penalty -10:
Old baseline beaten, but support was below the minimum and reduced the final day result.

Work Score 38 + Support Score avg 0.2 + Support Penalty -20:
Old baseline beaten by Work Score, but the day was fragile / costly and heavily penalized in the final day result.

Work Score 0 + Support Score avg 1.8 + Support Penalty 0:
Good recovery day, but work baseline not closed.

Work Score 70 + Support Score avg negative + Support Penalty -20:
Very strong work day, but next-day risk may be high and the final day result is support-penalized.

## Calibration

Use:

`Examples/Support Score Day Examples.md`

for future scoring calibration.
