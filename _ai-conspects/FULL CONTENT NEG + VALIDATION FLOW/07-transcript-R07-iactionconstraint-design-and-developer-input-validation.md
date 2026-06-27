# Regional transcript — R07: IActionConstraint design and developer-input validation

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 27 / 27
unique screenshots represented: 26
repeated placements retained: 1
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`IActionConstraint` participates in MVC action selection after route candidates
are found. Returning false removes an action candidate; it is not a general
request-validation response mechanism.

### Developer configuration

Attribute constructor arguments, configured header names and media type strings
come from application code.

- reject blank keys with `ArgumentNullException`;
- validate media types during construction;
- throw a clear `ArgumentException` for invalid constants;
- pre-parse immutable allowed media types once.

Invalid developer configuration should fail during startup/action discovery
rather than silently making every request fail.

### Client input

Header, query and route values are untrusted request data.

- use `TryParse` rather than throwing;
- malformed values normally return false from the constraint;
- add a separate filter/middleware when malformed input must produce an
  explicit 400 contract.

### Factory design

`IActionConstraintFactory` exposes:

- `Order`: lower values run earlier;
- `IsReusable`: safe only for immutable/thread-safe state;
- `CreateInstance`: creates the runtime constraint from validated settings.

Do not perform I/O or request-body parsing inside action selection. Multiple
overloaded constructors are possible, but separate purpose-specific attributes
often produce a clearer public API.

## Representative source labels

- FROM COURSE WITH PLAIN IACTIONCONSTAINT ATTR
- NEED TO VALIDATE
- INPUTTED BY DEVELOPER
- VALUES
- BUT NOT ONLY HEADERS MB
- WITH VALIDATION OF DEVELOPERS INPUT AND MULTIPLE CTORS

## Covered text elements

```text
T-097, T-098, T-099, T-100, T-101, T-102
```

## Covered screenshot uses

```text
IU-019, IU-028, IU-029, IU-030, IU-036, IU-037, IU-041, IU-042, IU-044, IU-045, IU-046, IU-047, IU-048
IU-049, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055, IU-056, IU-057, IU-058, IU-059, IU-067, IU-068
IU-069
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
