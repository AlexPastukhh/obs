# Final source-reconstructed transcript - TypeScript any vs unknown

Generated: 2026-07-07

Source: `source/typescript any unknown.svg`, local source screenshots, and Stage0 source inventory.

## Coverage

```text
Source screenshots: 2 / 2 visually checked from complete canvas preview
Status before this file: regional transcripts not started
```

## Main topic

```text
any vs unknown
why response.json() is dangerous
```

The sheet contrasts `any` and `unknown` for values whose real runtime shape is not known yet, especially data returned from `response.json()`.

## `any`

`any` turns off type checking. TypeScript lets you do anything and will not complain, even if the code can crash at runtime.

Example from the source:

```typescript
const badUser = await response.json(); // often inferred as any
badUser.anything.deep().call(); // compiles, might crash at runtime
```

Meaning:

```text
any = trust me, don't check
```

Using `any` is dangerous for external data because the compiler stops protecting you.

## `unknown`

`unknown` means: "we don't know the type yet". TypeScript forces you to narrow before using it.

Example from the source:

```typescript
const goodUser: unknown = await response.json();
// goodUser.name // error

if (typeof goodUser === "object" && goodUser !== null && "name" in goodUser) {
  // now you can access safely (with more typing)
}
```

Meaning:

```text
unknown = prove it before using
```

`unknown` is better for untrusted input because it forces a runtime check before property access.

## Practical rule

```text
For external JSON / response.json(): prefer unknown first, then validate or narrow.
Avoid any unless you intentionally want to disable type checking at that boundary.
```

For production code, the narrowing step is often replaced or strengthened by a schema validator such as Zod, io-ts, Valibot, or custom guards.
