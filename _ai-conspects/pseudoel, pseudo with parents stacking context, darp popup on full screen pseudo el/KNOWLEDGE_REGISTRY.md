# Knowledge Registry

Source: `04-full-combined-final-transcript.md`; SVG: `source/pseudoel, pseudo with parents stacking context, darp popup on full screen pseudo el.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: generated box, `content`, absolute positioning, intended containing block and local `inset: 0` geometry | `css.pseudo-element-positioning-and-stacking` | `css` | `../_knowledge/css/pseudo-element-positioning-and-stacking.md` | MAPPED |
| R01: fixed viewport geometry, transformed ancestors, viewport-unit limitation, no reparenting/portal | `css.pseudo-element-positioning-and-stacking` | `css` | `../_knowledge/css/pseudo-element-positioning-and-stacking.md` | MAPPED |
| R02: local `z-index`, ancestor stacking-context boundary/triggers and diagnostic walk | `css.pseudo-element-positioning-and-stacking` | `css` | `../_knowledge/css/pseudo-element-positioning-and-stacking.md` | MAPPED |
| R02: clipping versus stacking, negative `z-index`, intentional pointer events | `css.pseudo-element-positioning-and-stacking` | `css` | `../_knowledge/css/pseudo-element-positioning-and-stacking.md` | MAPPED |
| R03: root/portal backdrop, fixed geometry, layer token, dialog/backdrop context | `css.fullscreen-modal-overlay` | `css` | `../_knowledge/css/fullscreen-modal-overlay.md` | MAPPED |
| R03: scroll lock, focus trap/restore, inert background, real-node interaction/accessibility needs | `css.fullscreen-modal-overlay` | `css` | `../_knowledge/css/fullscreen-modal-overlay.md` | MAPPED |
| R03: local decorative pseudo-element boundary, incomplete dark rectangle, transform/mobile testing | `css.fullscreen-modal-overlay` | `css` | `../_knowledge/css/fullscreen-modal-overlay.md` | MAPPED |
| Coverage counts, regional map, exactness and processing bookkeeping | — | — | — | NON_LEARNING |

R01 and R02 are combined because geometry, containing blocks, stacking contexts, and clipping must be diagnosed together. R03 is separate because a modal overlay adds document placement, interaction, and accessibility responsibilities. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
