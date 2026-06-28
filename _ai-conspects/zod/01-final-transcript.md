# Final semantic transcript — zod

Authoritative source: `source/zod.svg`

---

# R01 — Zod fundamentals

## Installation and first schema

```bash
npm i zod
npm i @hookform/resolvers
```

```ts
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2),
  age: z.number().int().nonnegative(),
});

const user = UserSchema.parse({
  name: "Ali",
  age: 20,
});
```

`parse` returns validated/transformed output or throws a `ZodError`.

```ts
const result = UserSchema.safeParse(input);

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}
```

`safeParse` is convenient at application boundaries because validation failure is represented as a discriminated result instead of an exception.

## Primitive schemas

```ts
z.string();
z.number();
z.boolean();
z.bigint();
z.date();
z.null();
z.undefined();
z.literal("ADMIN");
z.enum(["ADMIN", "USER"]);
z.nativeEnum(Role);
```

Exact values:

```ts
z.literal("ADMIN");
z.literal(42);
z.literal(true);
```

Use `z.enum([...])` for an inline set of string values and `z.nativeEnum(...)` when validating values from a TypeScript enum or compatible enum-like object.

## Strings and numbers

```ts
z.string().min(2).max(50);
z.string().email();
z.string().url();
z.string().uuid();
z.string().regex(/^\d+$/);
z.string().trim();

z.number().int();
z.number().positive();
z.number().nonnegative();
z.number().min(0).max(100);
z.number().multipleOf(5);
```

`url()` validates URL syntax; it does not check that the remote resource exists.

Floating-point `multipleOf` validation can be affected by precision. Financial validation is often safer in integer minor units.

## Collections

```ts
z.array(z.string());

z.tuple([
  z.string(),
  z.number(),
]);

z.record(z.string());

z.map(
  z.string(),
  z.number(),
);

z.set(z.string());
```

The container schema validates both structure and element/value schemas.

## Optional, nullable and defaults

```ts
z.string().optional();  // undefined allowed
z.string().nullable();  // null allowed
z.string().nullish();   // null or undefined
z.string().default("x");
```

A default is applied when the input is `undefined`, including a missing object property.

## Transformations

```ts
const NormalizedName = z
  .string()
  .trim()
  .transform(value => value.toLowerCase());
```

`transform` changes the output after prior validation steps. The inferred output type may differ from the input type.

---

# R02 — coercion, preprocess and form input

## Browser form values

Most HTML controls submit strings:

```text
text input        string
number input      usually string unless the form library converts it
select            string
textarea          string
checkbox          omitted or a configured value such as "on"
radio             selected string value
```

Therefore:

```ts
z.number().parse("42");
```

fails, while:

```ts
z.coerce.number().parse("42");
```

produces `42` and validates it as a number.

Common coercions:

```ts
z.coerce.number();
z.coerce.date();
z.coerce.boolean();
z.coerce.string();
```

Boolean coercion deserves care because JavaScript truthiness can make non-empty strings surprising. For checkbox payloads, an explicit `preprocess` rule is often clearer.

## `preprocess`

`preprocess` converts raw input before the target schema validates it:

```ts
const OptionalAge = z.preprocess(
  value =>
    value === "" || value === undefined
      ? undefined
      : value,
  z.coerce.number().int().min(0).optional(),
);
```

Use it for:

```text
empty strings
custom boolean representations
date formats
legacy payload shapes
normalizing missing values
```

Conceptual order:

```text
raw input
preprocess
target schema validation
transform
final output
```

## Coercion versus preprocess versus transform

```text
z.coerce.*
    built-in conversion before validation

z.preprocess(...)
    custom conversion before validation

.transform(...)
    output conversion after validation
```

Coercion is simplest for common form inputs. Preprocess is best when raw input has application-specific edge cases. Transform is best for normalized output and derived values.

## React Hook Form conversion

React Hook Form can convert values at registration time:

```tsx
<input
  type="number"
  {...register("age", {
    valueAsNumber: true,
  })}
/>
```

Other options include `valueAsDate` and `setValueAs`.

Alternatively, keep RHF simple and perform conversion in the Zod schema:

```ts
const FormSchema = z.object({
  age: z.coerce
    .number()
    .int()
    .min(0),
});
```

With `zodResolver`, transformed output is passed to the valid-submit handler. The DOM input is not automatically rewritten to the normalized value.

## Empty numeric inputs

An empty string may be converted to `0` by JavaScript number conversion, which is often not the intended meaning.

Explicit pattern:

```ts
const AgeSchema = z.preprocess(
  value =>
    value === ""
      ? undefined
      : value,
  z.coerce.number().int().min(1).optional(),
);
```

## Checkboxes

Required terms checkbox:

```ts
const TermsSchema = z.object({
  accepted: z.preprocess(
    value =>
      value === "on" ||
      value === "true" ||
      value === true,
    z.literal(true),
  ),
});
```

For a regular optional boolean, decide explicitly whether missing means `false`, `undefined`, or a validation error.

---

# R03 — refinements and multiple issues

## `refine`

```ts
const Password = z
  .string()
  .min(8)
  .refine(
    value => /[A-Z]/.test(value),
    {
      message: "Must contain an uppercase letter",
    },
  );
```

`refine` adds one custom boolean-style validation.

Options commonly include:

```text
message
path
params
```

A path attaches the issue to a specific field.

## Object-level validation

```ts
const SignupSchema = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirm) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm"],
        message: "Passwords do not match",
      });
    }
  });
```

`password` and `confirm` are ordinary object properties. The callback argument is the validated object; destructuring it is normal JavaScript.

## `superRefine`

Use `superRefine` when:

```text
multiple issues may be emitted
different fields need different error paths
validation depends on several fields
custom issue codes or metadata are needed
```

```ts
Schema.superRefine((value, context) => {
  if (...) {
    context.addIssue(...);
  }

  if (...) {
    context.addIssue(...);
  }
});
```

For one boolean rule, `refine` is concise. For cross-field or multi-issue validation, `superRefine` is usually clearer.

---

# R04 — unions and discriminated unions

## Regular union

```ts
const ValueSchema = z.union([
  z.string(),
  z.number(),
]);
```

A regular union tries branches until one succeeds. On total failure it can report nested errors from several branches.

Object union:

```ts
const Circle = z.object({
  type: z.literal("circle"),
  radius: z.number(),
});

const Square = z.object({
  type: z.literal("square"),
  size: z.number(),
});

const Shape = z.union([
  Circle,
  Square,
]);
```

## Discriminated union

```ts
const Shape = z.discriminatedUnion(
  "type",
  [
    Circle,
    Square,
  ],
);
```

The discriminator acts like a branch key:

```text
type = "circle" → Circle schema
type = "square" → Square schema
```

Benefits:

```text
clearer errors
one selected branch
better scaling for many variants
less ambiguity for overlapping object shapes
strong TypeScript narrowing
```

A discriminated union does not parse every branch. It selects the branch from the discriminator lookup and validates only that schema.

## Error behavior

A regular union may return a combined union error containing branch-specific failures. A discriminated union can report a direct discriminator or selected-branch error.

Use a discriminated union when all object variants share a stable literal field. Use a regular union for unrelated or primitive alternatives.

---

# R05 — schema composition, inference and RHF

## Object helpers

```ts
const Base = z.object({
  a: z.string(),
  b: z.number(),
});

Base.pick({ a: true });
Base.omit({ b: true });

Base.extend({
  c: z.boolean(),
});

Base.merge(
  z.object({
    d: z.string(),
  }),
);

Base.partial();
Base.deepPartial();
```

These helpers derive related schemas without manually duplicating every property.

## Type inference

```ts
type User =
  z.infer<typeof UserSchema>;
```

When transforms or preprocessors are involved, distinguish input and output types when needed:

```ts
type Input =
  z.input<typeof Schema>;

type Output =
  z.output<typeof Schema>;
```

## React Hook Form integration

```ts
import { zodResolver }
  from "@hookform/resolvers/zod";

const form = useForm<
  z.input<typeof FormSchema>,
  unknown,
  z.output<typeof FormSchema>
>({
  resolver: zodResolver(FormSchema),
});
```

Core flow:

```text
DOM/RHF raw values
resolver
Zod preprocess/coerce/validation/transform
validated output
submit handler
```

Keep validation rules in one schema where possible. Avoid converting the same field independently in both RHF and Zod unless the behavior is deliberate.

## Practical checklist

```text
[ ] use safeParse at untrusted boundaries
[ ] use DTO/schema inference instead of duplicate types
[ ] handle empty strings explicitly
[ ] choose one conversion layer for each form field
[ ] prefer superRefine for multiple cross-field issues
[ ] use discriminatedUnion for tagged object variants
[ ] attach errors to useful paths
[ ] remember transforms change the output type
```

# Coverage

```text
unique embedded screenshots: 84
image uses: 84
native SVG labels: 20
duplicate extra placements: 0

processed image uses: 84
processed text labels: 20
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
