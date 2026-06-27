# R04 — import.meta.url, ES module worker URLs and bundler-safe loading

Generated: 2026-06-27 UTC

```text
Image uses: 13
SVG text nodes: 1
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region explains module-relative resource resolution.

- `import.meta.url` is the URL of the current ES module. It provides a stable base for resolving files relative to the module rather than relative to the page's current URL.
- The worker examples use `new URL("./worker.js", import.meta.url)` and pass that URL to the `Worker` constructor.
- Declaring `{ type: "module" }` gives the worker ES-module semantics so it can use `import` and module-relative resolution.
- This pattern is friendly to modern bundlers because the worker dependency is visible during the build and can be emitted/rewritten as a separate asset.
- A plain string such as `"./worker.js"` may resolve against the document URL and can break when the importing module is moved, nested, hashed, or served from another base path.
- `import.meta.url` is a module feature, not a general CommonJS replacement for every environment. Runtime/tooling support and build output still determine the final URL.
- The examples also distinguish static module imports from dynamic `import()` and from worker construction: each has a different lifecycle and return value.

## Covered image uses

S-075, S-076, S-077, S-078, S-079, S-081, S-082, S-084, S-085, S-087, S-088, S-091, S-093

## Covered SVG text nodes

T-040

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
