# Pattern Capture Script File Structure

Status: active design plan.

Purpose: planned internal structure for the Tampermonkey userscript.

V1 may be a single `.user.js` file, but it should be organized into clear sections.

## Planned file

`pattern-capture.user.js`

## Sections

```text
// ==UserScript==
// metadata
// ==/UserScript==

(function () {
  'use strict';

  // 1. Constants
  // 2. Storage keys
  // 3. Button definitions
  // 4. State loading/saving
  // 5. Event model helpers
  // 6. Export formatters
  // 7. DOM builders
  // 8. UI render
  // 9. Drag/collapse behavior
  // 10. Button handlers
  // 11. Init
})();
```

## Metadata requirements

Tampermonkey metadata should include:

```text
@name         Planning Pattern Capture
@namespace    planning-pattern-capture
@version      0.1.0
@description  Quick capture panel for planning work patterns and support facts
@match        *://*/*
@grant        GM_getValue
@grant        GM_setValue
@grant        GM_setClipboard
```

## State modules

Even inside a single file, keep conceptual modules:

| Section | Owns |
|---|---|
| Constants | button definitions, default settings |
| Storage | GM_getValue / GM_setValue wrappers |
| Events | event creation, event filtering, undo |
| Export | markdown/json format |
| UI | DOM creation and rendering |
| Drag | pointer/mouse handling, save x/y |
| Actions | handlers for capture buttons/export/clear |

## Safety

Do not add network access in v1.

Do not auto-submit data to any site.

Do not write to GitHub.

Do not write to Obsidian files.

Copy/export only.
