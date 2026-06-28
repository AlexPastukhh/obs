# Final semantic transcript — TypeScript classes, inheritance and definite assignment

Authoritative source: `source/typescript ctor shortcut, inheritance, statics, getters,setters, prop! - definite assertion.svg`  
Coverage: **14 unique screenshots / 14 placements + 10 native SVG labels**

---

# R01 — static members and shared counters

A static member belongs to the class constructor, not to each instance.

```ts
class Person {
  static count = 0;

  static getCount(): number {
    return Person.count;
  }

  public id: number;

  constructor(
    public name: string,
  ) {
    this.id = ++Person.count;
  }
}
```

Usage:

```ts
const first = new Person("A");
const second = new Person("B");

console.log(first.id);
// 1

console.log(second.id);
// 2

console.log(Person.getCount());
// 2
```

`Person.count` is shared by all instances. `++Person.count` increments first and returns the incremented value.

Instance access and static access are different:

```text
instance.id
    per-object value

Person.count
    class-level shared value
```

Static members are appropriate for:

```text
shared counters
factory helpers
class-wide configuration
constants associated with a class
```

Avoid using mutable statics as hidden global application state when dependency injection or explicit state ownership would be clearer.

---

# R02 — getters and setters

A getter exposes property syntax while running a method:

```ts
class Bands {
  private dataState: string[] = [];

  public get data(): string[] {
    return this.dataState;
  }
}
```

Usage:

```ts
const bands = new Bands();
console.log(bands.data);
```

A setter receives one value and returns no value:

```ts
public set data(value: string[]) {
  this.dataState = value;
}
```

This is invalid:

```ts
public set data(value: string[]) {
  return this.dataState = value;
}
```

TypeScript reports that setters cannot return a value.

## Validation

Compile-time typing already checks normal TypeScript callers:

```ts
public set data(value: string[]) {
  this.dataState = value;
}
```

Runtime validation is still useful when values come from untyped JavaScript, JSON, network responses or other untrusted boundaries:

```ts
public set data(value: string[]) {
  if (
    !Array.isArray(value)
    || !value.every(
      (item) => typeof item === "string",
    )
  ) {
    throw new Error(
      "Value must be an array of strings",
    );
  }

  this.dataState = value;
}
```

A getter that returns the backing array exposes the same mutable array. Return a copy when callers should not mutate internal state directly:

```ts
public get data(): readonly string[] {
  return [...this.dataState];
}
```

---

# R03 — interfaces and `implements`

An interface describes a structural contract:

```ts
interface Musician {
  name: string;
  instrument: string;

  play(action: string): string;
}
```

A class can declare that it implements the contract:

```ts
class Guitarist implements Musician {
  constructor(
    public name: string,
    public instrument: string,
  ) {}

  play(action: string): string {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}
```

`implements` checks the instance shape at compile time. It does not copy implementation into the class and does not create runtime interface metadata.

Interfaces are erased from emitted JavaScript.

Use interfaces for:

```text
public object contracts
dependency boundaries
function parameters
class instance shapes
mockable/testable abstractions
```

A class may implement several interfaces, but TypeScript/JavaScript class inheritance still has one base class.

---

# R04 — parameter properties, inheritance, `super` and `!`

## Constructor parameter properties

An access modifier on a constructor parameter creates and initializes an instance property:

```ts
class Coder {
  constructor(
    public readonly name: string,
  ) {}
}
```

Equivalent expanded form:

```ts
class Coder {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

Supported modifiers include:

```text
public
private
protected
readonly
```

Example:

```ts
class Coder {
  constructor(
    public readonly name: string,
    public music: string,
    private age: number,
    protected language: string,
  ) {}
}
```

Meaning:

```text
name
    public and cannot be reassigned after construction

music
    public and mutable

age
    accessible only inside Coder

language
    accessible inside Coder and subclasses
```

The generated assignments do not need to be written manually.

## Inheritance and `super`

```ts
class WebDeveloper extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number,
    language: string,
  ) {
    super(
      name,
      music,
      age,
      language,
    );
  }
}
```

In a derived constructor, `super(...)` must run before accessing `this`.

Reason:

```text
the base constructor initializes the base-class portion of the object
the derived constructor then initializes its own portion
```

A parameter property in the derived constructor still creates and assigns the derived property, but it does not remove the requirement to call `super(...)`.

## Definite assignment assertion

With strict property initialization, this field requires initialization:

```ts
class Coder {
  secondLanguage: string;
}
```

When initialization is guaranteed later, the definite assignment assertion suppresses the compile-time check:

```ts
class Coder {
  secondLanguage!: string;

  setSecondLanguage(
    language: string,
  ) {
    this.secondLanguage = language;
  }
}
```

The `!` means:

> Trust that this property will be assigned before it is read.

It does not assign a runtime value. Reading too early still produces `undefined`.

Prefer constructor initialization when practical:

```ts
class Coder {
  constructor(
    public secondLanguage: string,
  ) {}
}
```

Use `!` for lifecycle-controlled initialization such as framework injection, ORM hydration or a guaranteed setup phase—not merely to silence a design problem.

## Practical checklist

```text
[ ] use static for class-level shared members
[ ] keep setters void
[ ] validate runtime values only at untrusted boundaries
[ ] use interfaces for structural contracts
[ ] use constructor parameter properties to remove repeated declarations
[ ] understand public/private/protected/readonly visibility
[ ] call super before using this in derived constructors
[ ] remember that parameter properties do not remove the super requirement
[ ] use definite assignment assertion only when initialization is genuinely guaranteed
```

---

# Coverage

```text
unique embedded screenshots: 14
image uses: 14
native SVG labels: 10
duplicate extra placements: 0

processed image uses: 14
processed text labels: 10
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
