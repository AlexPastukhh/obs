# Pattern Capture Panel UI Requirements

Status: active design requirement.

Purpose: define how the Tampermonkey floating panel should behave.

## Core UX

The panel behaves like a small draggable sticky-note-style widget, but expanded content is an interface, not a note.

## Collapsed mode

Collapsed mode is a small movable rectangle / handle.

It should show only compact status, for example `🧲 Capture (7)`.

Requirements:

- small rectangle;
- draggable;
- click main body to expand;
- does not show textarea;
- does not show long notes;
- displays event count;
- position persists;
- collapsed state persists.

## Expanded mode

Expanded mode shows the capture interface.

It should include:

- header;
- date input;
- session input;
- fundamental quick buttons;
- frequent situational quick buttons;
- situational dropdown / expandable list;
- support-fact buttons;
- last event preview;
- event counters;
- undo last;
- copy markdown;
- copy JSON;
- clear selected date;
- collapse button;
- hide button.

## Pattern button layout

Fundamental / active point-6 patterns should get concrete always-visible buttons.

Situational patterns should be in a dropdown / expandable list by default.

Frequent situational patterns may be pinned into a small visible `Frequent` row.

The penalty pattern `👁️🚫🥊🎭➡️🕳️ No-resistance known drift` should require confirmation before save.

## Window behavior

- The header is draggable.
- The panel can be collapsed by `−`.
- Clicking collapsed rectangle expands it.
- `×` hides the panel; it does not delete data.
- Deleting data requires explicit Clear Date / Clear All action.

## Quick-capture rule

The default action is button click -> event saved immediately.

Exception: penalty candidate button may require confirmation.

Optional short note is allowed, but it should not be required.

Do not make freeform note typing the main workflow.

## Counts

The panel should show active date events, current session events, work-pattern count, support-fact count, penalty candidate count, and last event.

Counts are not scores.
