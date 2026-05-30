# Pattern Capture Tool

Status: planning / tool design.

Purpose: owner folder for the Tampermonkey Pattern Capture tool plan.

This tool is a quick capture layer for work-pattern events and support facts.

It is not a replacement for date-based day files.

It is not a scorer.

It does not write to the repo in v1.

## Core idea

During a session, writing detailed notes distracts the user.

Some patterns must be captured at the moment they happen.

Pattern Capture provides a small draggable collapsible UI:

- collapsed mode = small movable rectangle / handle;
- expanded mode = quick-button capture interface;
- one click records an event;
- events persist across refresh and browser restart;
- export later into markdown/json;
- chat imports exported data into the date-based day file.

## Owner files in this folder

| File | Owns |
|---|---|
| `README.md` | folder purpose and tool boundary |
| `Panel UI Requirements.md` | collapsed/expanded panel behavior and UX |
| `Storage and Data Model.md` | storage keys, event schema, persistence |
| `Event Taxonomy.md` | work-pattern and support-fact button taxonomy |
| `Export Format.md` | markdown/json export contract |
| `Implementation Plan.md` | v1/v2 roadmap and technical plan |
| `Script File Structure.md` | planned structure of the Tampermonkey userscript |

## Related system files

| File | Relation |
|---|---|
| `Workflows/Pattern Capture Import Workflow.md` | how exported capture data is imported into day files |
| `Templates/Pattern Capture Export Template.md` | markdown export shape |
| `Days/YYYY/YYYY-MM-DD.md` | target destination after import |
| `Templates/Support Facts Table Template.md` | target structure for support facts |
| `Workflows/Real Reward Pattern Playbook.md` | source of pattern names / meanings |
| `Emoji Notation Map.md` | source of emoji notation |
| `Support Score Guide.md` | support scoring rules after facts are imported |

## Non-goals for v1

- No direct GitHub writes.
- No direct Obsidian writes.
- No automatic Work Score calculation.
- No automatic Support Score calculation.
- No replacing chat review/import.
- No long freeform note-taking as the main UX.

## v1 outcome

A Tampermonkey floating panel that can:

- collapse/expand;
- be dragged;
- persist position/collapsed state;
- persist active date/session;
- store events in Tampermonkey storage;
- record work-pattern events;
- record support facts;
- show event counts and last event;
- undo last event;
- export markdown;
- export JSON;
- clear selected date after export.

## Import rule

The script exports raw capture data.

Chat imports it into the relevant day file using:

`Workflows/Pattern Capture Import Workflow.md`
