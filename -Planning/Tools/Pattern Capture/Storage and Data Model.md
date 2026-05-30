# Pattern Capture Storage and Data Model

Status: active design requirement.

Purpose: define how Pattern Capture stores data.

## Storage choice

Use Tampermonkey storage when possible:

- `GM_getValue`
- `GM_setValue`

Do not rely only on page `localStorage`.

Reason:

Tampermonkey storage belongs to the userscript and can persist across sites where the script runs.

Page localStorage is domain-bound and can fragment data by site.

## Storage keys

Use versioned keys:

| Key | Purpose |
|---|---|
| `planningPatternCapture:v1:settings` | UI settings |
| `planningPatternCapture:v1:active` | active date/session |
| `planningPatternCapture:v1:events` | captured events |
| `planningPatternCapture:v1:exportHistory` | optional export history |

## Settings object

```json
{
  "collapsed": true,
  "hidden": false,
  "x": 80,
  "y": 120,
  "width": 320,
  "compactMode": true
}
```

## Active object

```json
{
  "date": "2026-05-30",
  "session": "S3",
  "mode": "work"
}
```

## Event base fields

All events should include:

```json
{
  "id": "evt_1717071234567_ab12",
  "createdAt": "2026-05-30T14:22:14.000-04:00",
  "date": "2026-05-30",
  "time": "14:22",
  "session": "S3",
  "kind": "work-pattern",
  "effect": "noticed",
  "note": ""
}
```

## Work-pattern event

```json
{
  "id": "evt_1717071234567_ab12",
  "createdAt": "2026-05-30T14:22:14.000-04:00",
  "date": "2026-05-30",
  "time": "14:22",
  "session": "S3",
  "kind": "work-pattern",
  "patternId": "complexity_to_stim",
  "pattern": "🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation",
  "effect": "returned",
  "note": "hard analysis"
}
```

## Support fact event

```json
{
  "id": "evt_1717072234567_cd34",
  "createdAt": "2026-05-30T18:40:02.000-04:00",
  "date": "2026-05-30",
  "time": "18:40",
  "session": "after S6",
  "kind": "support",
  "supportType": "🍽️ food",
  "fact": "Объелся",
  "effect": "worsened F / sleep risk",
  "note": ""
}
```

## Persistence requirements

Persist:

- collapsed/expanded state;
- hidden state;
- panel position;
- active date;
- active session;
- all events;
- last event;
- optional export history.

Data should survive:

- page refresh;
- tab close;
- browser restart.

## Safety requirements

- Export should not automatically clear events.
- Clear Date and Clear All must be explicit.
- Undo Last only removes the latest event.
- JSON export should exist as backup/debug.
- Markdown export should be the main import format for chat.
