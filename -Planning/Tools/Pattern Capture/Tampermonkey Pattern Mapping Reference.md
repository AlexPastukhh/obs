# Tampermonkey Pattern Mapping Reference

Status: reference for Pattern Capture script.

Purpose: document local Tampermonkey pattern duplication and required source links.

## Rule

Tampermonkey may duplicate labels because the script needs local arrays.

But it should not be treated as source of truth.

Each pattern object should include:

- `id` matching `Real Reward Pattern Playbook.md`;
- `label` for UI button;
- `full` for export/display;
- `source` pointing back to the playbook.

## D/F score model

Normal session = `3.5`.

- `D base = 1.75`
- `F base = 1.75`
- `Total = D + F + adjustments`

Only D/F quick buttons adjust score draft.

Pattern buttons toggle selected pattern IDs. They are check lenses and export context, not score buttons.

## New fundamental pattern object

```javascript
{
  id: "low_cost_stimulus_cage_desired",
  label: "🧲⚡🧱👁️🌅➡️🎯",
  full: "🧲⚡🧱👁️🌅➡️🎯 Low-cost stimulus cage toward Desired",
  source: "Workflows/Real Reward Pattern Playbook.md#low_cost_stimulus_cage_desired",
}
```

## Recommended source fields for all fundamental patterns

```javascript
const fundamentalPatterns = [
  {
    id: "short_distance_self_competition",
    label: "🏁🥊⏱️",
    full: "🏁🥊👤↔️👤⏱️ Short-distance self-competition",
    source: "Workflows/Real Reward Pattern Playbook.md#short_distance_self_competition",
  },
  {
    id: "useful_result_min_losses",
    label: "🎯💎📉",
    full: "🎯💎📉 Useful result with minimal losses",
    source: "Workflows/Real Reward Pattern Playbook.md#useful_result_min_losses",
  },
  {
    id: "low_cost_stimulus_cage_desired",
    label: "🧲⚡🧱👁️🌅➡️🎯",
    full: "🧲⚡🧱👁️🌅➡️🎯 Low-cost stimulus cage toward Desired",
    source: "Workflows/Real Reward Pattern Playbook.md#low_cost_stimulus_cage_desired",
  },
  {
    id: "session_frame_visible_target",
    label: "⏱️🚂",
    full: "⏱️🚂🛤️➡️🎯 Session frame / visible target",
    source: "Workflows/Real Reward Pattern Playbook.md#session_frame_visible_target",
  },
  {
    id: "targeted_stimuli_chemistry_only",
    label: "🧲⚡🎯",
    full: "🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only",
    source: "Workflows/Real Reward Pattern Playbook.md#targeted_stimuli_chemistry_only",
  },
  {
    id: "course_desired_connection",
    label: "🛤️🌅",
    full: "🛤️🌅➡️🎯 Course / Desired connection",
    source: "Workflows/Real Reward Pattern Playbook.md#course_desired_connection",
  },
  {
    id: "value_left_after_attention",
    label: "👁️💎",
    full: "👁️⏳➡️💎 Value left after attention ends",
    source: "Workflows/Real Reward Pattern Playbook.md#value_left_after_attention",
  },
  {
    id: "no_resistance_known_drift",
    label: "👁️🚫🥊🎭🕳️",
    full: "👁️🚫🥊🎭➡️🕳️ No-resistance known drift",
    source: "Workflows/Real Reward Pattern Playbook.md#no_resistance_known_drift",
    penalty: true,
  },
];
```

## Score buttons

```javascript
const dfButtons = [
  { label: "✅D+", dimension: "D", delta: 0.1, effect: "positive D adjustment" },
  { label: "✅D-", dimension: "D", delta: -0.1, effect: "negative D adjustment" },
  { label: "⚡F+", dimension: "F", delta: 0.1, effect: "positive F adjustment" },
  { label: "⚡F-", dimension: "F", delta: -0.1, effect: "negative F adjustment" },
];
```

## Export implication

When possible, exported selected patterns should include `id`, `label`, `full`, and `source`.

Score events should stay event-based, not final-number-based:

```json
{
  "kind": "df-score-adjustment",
  "dimension": "D",
  "delta": 0.1
}
```
