# Pattern Capture Implementation Plan

Status: active implementation plan.

Purpose: staged implementation plan for the Tampermonkey Pattern Capture tool.

## V1 goals

Build a single-file Tampermonkey userscript with:

- floating panel;
- collapsed mode;
- expanded interface;
- draggable position;
- persistent GM storage;
- active date/session inputs;
- quick work-pattern buttons;
- quick support-fact buttons;
- event counts;
- last event preview;
- undo last;
- copy markdown export;
- copy JSON export;
- clear selected date;
- no repo writes.

## V1 non-goals

- No direct Obsidian writes.
- No direct GitHub writes.
- No automatic scoring.
- No full dashboard rendering.
- No replacing chat import/review.
- No complex custom UI builder.

## V1 technical steps

1. Create userscript metadata.
2. Add GM storage permissions.
3. Define constants:
   - storage keys;
   - pattern buttons;
   - support buttons;
   - default settings.
4. Implement storage helpers:
   - load settings;
   - save settings;
   - load active;
   - save active;
   - load events;
   - save events.
5. Implement event helpers:
   - create event id;
   - get local ISO/time;
   - add event;
   - undo last;
   - filter by date;
   - summarize counts.
6. Implement UI:
   - root container;
   - collapsed view;
   - expanded view;
   - header;
   - controls;
   - button groups;
   - footer.
7. Implement drag:
   - drag by header/collapsed handle;
   - persist x/y.
8. Implement collapse/hide:
   - persist collapsed/hidden state.
9. Implement exports:
   - markdown grouped by Work Pattern Events and Support Facts;
   - JSON export;
   - copy to clipboard.
10. Implement clear:
   - clear selected date;
   - optional clear all with confirmation.
11. Test across page refresh and browser restart.

## V2 ideas

- Hotkeys.
- Custom pattern buttons.
- Obsidian URI integration.
- Local file append via local server.
- Better session timer.
- Import from JSON back into panel.
- Daily mini-summary.
- Counts by pattern.
- Visual warning when events are not exported.
- Per-date archive list.

## Acceptance criteria

V1 is successful when:

- panel can be collapsed/expanded;
- panel can be dragged;
- position survives refresh;
- events survive refresh/browser restart;
- one-click pattern capture works;
- support facts export into the correct table shape;
- markdown export can be pasted into chat and imported into a day file.
