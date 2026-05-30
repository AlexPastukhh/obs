# Pattern Capture Panel UI Requirements

Status: active design requirement.

Purpose: define how the Tampermonkey floating panel should behave.

## Core UX

The panel behaves like a small draggable sticky-note-style widget, but expanded content is an interface, not a note.

## Collapsed mode

Collapsed mode is a small movable rectangle / handle.

It should show only compact status, for example:

`🧲 Capture (7)`

or:

`Pattern Capture (7)`

Where `(7)` is the number of stored events for the active date or active session.

Requirements:

- small rectangle;
- draggable;
- click main body to expand;
- does not show textarea;
- does not show long notes;
- displays event count;
- position persists;
- collapsed state persists;
- should not cover much of the screen.

Optional collapsed controls:

- close/hide button;
- small expand icon.

## Expanded mode

Expanded mode shows the capture interface.

It should include:

- header;
- date input;
- session input;
- work-pattern buttons;
- support-fact buttons;
- last event preview;
- event counters;
- undo last;
- copy markdown;
- copy JSON;
- clear selected date;
- collapse button;
- hide button.

Suggested shape:

| Area | Content |
|---|---|
| Header | `🧲 Pattern Capture (7)` + collapse/hide controls |
| Active state | Date + Session |
| Work patterns | quick buttons for Point-6 / Real Reward patterns |
| Support facts | quick buttons for food/sleep/movement/stimulus/recovery |
| Last event | short preview of latest event |
| Export | Copy MD / Copy JSON |
| Maintenance | Undo / Clear Date |

## Window behavior

- The header is draggable.
- The panel can be collapsed by `−`.
- Clicking collapsed rectangle expands it.
- `×` hides the panel; it does not delete data.
- Deleting data requires explicit Clear Date / Clear All action.
- The panel should stay above page content with high z-index.
- The panel should not break page interactions when not used.
- Text selection / typing in page should still work.

## Quick-capture rule

The default action should be:

button click -> event saved immediately.

Optional short note is allowed, but it should not be required.

Do not make freeform note typing the main workflow.

## Visual style

- compact;
- readable;
- dark/light safe;
- not flashy;
- small enough to keep open during work;
- collapsed mode should be minimal.

## Counts

The panel should show useful counts:

- active date events;
- current session events;
- work-pattern event count;
- support-fact count;
- last event time/type.

Counts are not scores.

They are only capture summaries.
