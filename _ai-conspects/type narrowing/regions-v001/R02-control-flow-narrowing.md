# R02 — Control-flow narrowing

## S-002 — Why the final call has no TypeScript error

### Near-literal normalized transcript

At the start, `maybeName` is:

```ts
string | undefined
```

Calling:

```ts
needsString(maybeName)
```

would normally be an error because the value might be `undefined`.

But this guard:

```ts
if (maybeName === undefined) return;
```

removes the `undefined` possibility.

Inside the code after that `if`—the remaining or “else” control-flow path—TypeScript knows:

- execution reached this point only when `maybeName` is not `undefined`;
- therefore `maybeName` must be a `string`.

This is called **type narrowing**, also described as a type guard or control-flow analysis.

Without narrowing:

```ts
function demo(
    maybeName: string | undefined
) {
    return needsString(maybeName);
    // error: possibly undefined
}
```

### Study meaning

TypeScript tracks possible values separately along control-flow branches. A branch that returns early removes the excluded type from every later reachable statement.

### Recall questions

1. What is the declared union type?
2. Why is the unguarded call rejected?
3. What fact is established by the early return?
4. What does “control-flow analysis” mean here?
5. Would the narrowing remain after assigning a new union value to `maybeName`?


## S-003 — Complete early-return example

### Near-literal normalized transcript

The source first defines a function that accepts only a string:

```ts
function needsString(x: string) {
    return x.toUpperCase();
}
```

Another function receives a value that may be missing:

```ts
function demo(
    maybeName: string | undefined
) {
    if (maybeName === undefined) {
        return;
    }

    return needsString(maybeName);
    // no error
}
```

### Study meaning

The guard dominates the final call. If `maybeName` is `undefined`, execution exits. The call is reachable only on the branch where the value is a string.

The function's return type is inferred from both branches:

- `undefined` from the early `return`;
- `string` from `needsString(...)`.

That commonly produces:

```ts
string | undefined
```

unless an explicit return type changes the contract.

### Recall questions

1. What parameter type does `needsString` accept?
2. Why is the final call safe?
3. What values can `demo` return?
4. What would happen if the guard did not return?
5. Rewrite the example with an `else` branch.
