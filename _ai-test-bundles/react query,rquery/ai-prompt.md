# Task for AI

You are analyzing an Obsidian Excalidraw conspect.

Files:
- note.md: source Excalidraw markdown with text elements and embedded file IDs
- full.svg: visual map of the whole canvas
- image-index.md: mapping from Excalidraw fileId to copied image file
- images/: original embedded images copied from the vault

First do a spatial audit. Do not create study questions yet.

Required output:

1. Overall canvas structure
   - large regions / columns / clusters
   - what is left, right, top, bottom, center
   - visible hierarchy of headings and subheadings

2. Region-by-region map
   For each region:
   - region name or inferred heading
   - approximate location on canvas
   - exact text blocks that belong there
   - embedded images that belong there
   - what concept this region explains

3. Image placement audit
   For every image from image-index.md:
   - where it appears in full.svg
   - what nearby text/headings it relates to
   - what the image likely demonstrates
   - mark uncertain links explicitly

4. Understanding check
   - what you understood confidently
   - what is ambiguous
   - what needs human verification

Only after this spatial audit should repeat questions be generated.
