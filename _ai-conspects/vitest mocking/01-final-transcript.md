# Final semantic transcript — Vitest module mocking

Authoritative source: `source/vitest mocking.svg`  
Coverage: **6 unique screenshots / 6 placements + 22 native SVG labels**

---

# R01 — module factory mocks

`vi.mock` replaces a module before the tested module imports it:

```ts
vi.mock(
  "../MutationFns/registerIndClient",
  () => {
    const mockedRegisterInd = vi.fn();

    return {
      registerIndClient:
        mockedRegisterInd,

      __mockedRegisterInd:
        mockedRegisterInd,
    };
  },
);
```

The production export points to the mock. A test-only export can expose the same mock instance for assertions and reset operations.

Retrieve it after Vitest has installed the mock:

```ts
const getMocks = async () => {
  const module = await import(
    "../MutationFns/registerIndClient"
  );

  return {
    mockedRegisterInd:
      module.__mockedRegisterInd,
  };
};
```

The import path must match the path used by the tested code after resolution and aliases.

---

# R02 — hoisting and `vi.hoisted`

Vitest hoists `vi.mock` calls before ordinary top-level code. A mock factory therefore cannot safely depend on a variable declared later in normal module execution.

Create shared factory state with `vi.hoisted`:

```ts
const mocks = vi.hoisted(() => ({
  registerIndClient: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock(
  "../MutationFns/registerIndClient",
  () => ({
    registerIndClient:
      mocks.registerIndClient,
  }),
);
```

Router example:

```ts
vi.mock(
  "react-router-dom",
  async () => {
    const actual =
      await vi.importActual<
        typeof import("react-router-dom")
      >("react-router-dom");

    return {
      ...actual,
      useNavigate: () => mocks.navigate,
    };
  },
);
```

Partial mocking preserves exports that the test does not intend to replace.

`__esModule: true` can help interoperability in some module shapes, but it is not a substitute for returning the correct named/default exports.

---

# R03 — reset, clear and restore

Before each test:

```ts
beforeEach(() => {
  mocks.registerIndClient.mockReset();
  mocks.navigate.mockReset();
});
```

Differences:

```text
mockClear
    clears call history

mockReset
    clears call history and configured implementation/results

mockRestore
    restores the original implementation for spies/restorable mocks
```

Global helpers such as `vi.clearAllMocks()` are convenient, but targeted resets make ownership explicit.

If module-level state itself must be recreated, use module-reset APIs carefully and re-import the module after mocks are configured.

---

# R04 — assertions and typing

Example assertion:

```ts
expect(
  mocks.registerIndClient,
).toHaveBeenCalledTimes(1);

expect(
  mocks.navigate,
).toHaveBeenCalledWith(
  "/login",
);
```

Prefer typed helpers where possible:

```ts
const mocked =
  vi.mocked(registerIndClient);
```

or explicit mock function types instead of spreading `any` through the test.

A reliable pattern is:

```text
declare hoisted mock handles
install module mocks
render through required providers
trigger behavior
assert calls and arguments
reset between tests
```

Avoid creating a new `vi.fn()` every time `useNavigate` is called; that would give the component and the assertion different mock instances.

---

# Coverage

```text
unique embedded screenshots: 6
image uses: 6
native SVG labels: 22
duplicate extra placements: 0

processed image uses: 6
processed text labels: 22
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
