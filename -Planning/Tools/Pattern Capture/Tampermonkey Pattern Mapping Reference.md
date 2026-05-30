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

## Updated fundamental pattern object

Replace the old object:

```javascript
{
  id: "result_over_process",
  label: "🎯📈",
  full: "🎯📈≠🎭🔁 Result Tracking over process",
}
```

with:

```javascript
{
  id: "useful_result_min_losses",
  label: "🎯💎📉",
  full: "🎯💎📉 Useful result with minimal losses",
  source: "Workflows/Real Reward Pattern Playbook.md#useful_result_min_losses",
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

## Export implication

When possible, exported pattern events should include `patternId` and may include `source`.

Example:

```json
{
  "kind": "work-pattern",
  "patternId": "useful_result_min_losses",
  "pattern": "🎯💎📉 Useful result with minimal losses",
  "source": "Workflows/Real Reward Pattern Playbook.md#useful_result_min_losses",
  "outcome": "+"
}
```
