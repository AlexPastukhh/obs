# Batch 22: Pattern Capture tool plan

PUT-style package.

## Purpose

Add a dedicated docs folder for the planned Tampermonkey Pattern Capture tool.

The tool is a floating collapsible quick-capture panel for work-pattern events and support facts.

## Create

- `-Planning/Tools/Pattern Capture/README.md`
- `-Planning/Tools/Pattern Capture/Panel UI Requirements.md`
- `-Planning/Tools/Pattern Capture/Storage and Data Model.md`
- `-Planning/Tools/Pattern Capture/Event Taxonomy.md`
- `-Planning/Tools/Pattern Capture/Export Format.md`
- `-Planning/Tools/Pattern Capture/Implementation Plan.md`
- `-Planning/Tools/Pattern Capture/Script File Structure.md`
- `-Planning/Workflows/Pattern Capture Import Workflow.md`
- `-Planning/Templates/Pattern Capture Export Template.md`

## Update

- `-Planning/START HERE.md`
- `-Planning/Responsibility Map.md`
- `-Planning/Use Case Map.md`

## Core decisions

- Panel has collapsed and expanded modes.
- Collapsed mode is a small draggable rectangle/handle.
- Expanded mode is an interface, not a note.
- Use Tampermonkey GM storage.
- Persist events, active date/session, position, collapsed state.
- Export markdown/json.
- Do not calculate Work Score or Support Score in the script.
- Do not write directly to repo/day files in v1.
- Import exports through chat into date-based day files.

## Commit message

`Add pattern capture tool plan`
