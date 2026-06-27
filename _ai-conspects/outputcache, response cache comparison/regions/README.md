# Regions — outputcache, response cache comparison

Status: **complete after Stage5 independent full-SVG audit**

```text
R01 — legacy comparison transcript: 5 image uses
R02 — middleware options/default policy/builder/variation: 47 image uses / 34 text nodes
R03 — custom policy/store/tags/context/ResponseCaching/ETag: 56 image uses / 39 text nodes
R04 — response-aware safety/dynamic expiration: 33 image uses / 27 text nodes
R05 — lifecycle/callback timing/flag mutation: 13 image uses / 27 text nodes

Total: 154 image uses / 127 physical text nodes
Remaining: 0
```

The original five-image R01 remains historical evidence. R02-R05 restore the 149 screenshots missing from the earlier
SVG export. Stage5 independently re-parsed the complete SVG, verified every placement and text node exactly once,
re-read every contact sheet and corrected the R03 dynamic-tag placeholder to `product-details:{id}`.
