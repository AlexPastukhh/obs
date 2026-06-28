# Final semantic transcript — JavaScript generators, async iterables and `finally`

Authoritative source: `source/js yield, asyncenumerable, finally of generator.svg`  
Coverage: **30 unique screenshots / 30 placements + 19 native SVG labels**

---

# R01 — iterator boundaries and cancellation

A generator call returns an iterator object immediately; execution starts only when the consumer requests a value.

```js
function* numbers() {
  yield 1;
  yield 2;
  return 3;
}

const iterator = numbers();

iterator.next();
// { value: 1, done: false }
```

The consumer controls the boundary between items:

```text
next()
    resume until the next yield or completion

return(value)
    request early completion

throw(error)
    inject an error at the suspended point
```

A wrapper that owns another iterator should propagate cancellation to the underlying producer:

```js
async function cancel(reason) {
  console.log("Cancelled:", reason);

  if (typeof iterator.return === "function") {
    await iterator.return();
  }
}
```

That gives the producer a chance to run its cleanup logic.

For streams or adapters:

```text
consumer cancellation
    -> wrapper cancel method
    -> underlying iterator.return()
    -> producer finally block
```

A cancellation signal and `iterator.return()` solve related but different problems. A signal can interrupt awaited I/O when the producer cooperates; `return()` requests iterator completion and cleanup.

---

# R02 — `yield`, `return`, sync and async generators

## Generator basics

`yield` is valid inside generator functions:

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

`yield` means:

```text
produce a value now
pause execution
remember the current position
resume here when next() is called
```

Calling the generator function does not execute it like a normal function:

```js
const iterator = numbers();
```

Values can be consumed manually:

```js
iterator.next();
iterator.next();
```

or with iteration syntax:

```js
for (const value of numbers()) {
  console.log(value);
}
```

## `yield` versus `return`

```js
function* demo() {
  yield 10;
  yield 20;
  return 30;
}
```

Results:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: true }
```

`yield` emits an intermediate item and preserves the continuation.  
`return` completes the iterator.

A normal `for...of` loop ignores the final `done: true` value. Manual iteration can observe it.

## Async generators

```js
async function* numbersAsync() {
  yield 1;

  await new Promise(
    (resolve) => setTimeout(resolve, 500),
  );

  yield 2;
}
```

Consume with:

```js
for await (const value of numbersAsync()) {
  console.log(value);
}
```

Mental mapping:

```text
JavaScript function*
    close to .NET IEnumerable<T>

JavaScript async function*
    close to .NET IAsyncEnumerable<T>
```

The analogy is useful, but the exact cancellation, disposal and final-value APIs differ.

---

# R03 — `generator.return()` and `finally`

Calling `return(value)` requests abrupt completion at the current suspension point:

```js
function* source() {
  try {
    yield "work-1";
    yield "work-2";
  } finally {
    console.log("cleanup");
  }
}

const iterator = source();

iterator.next();
iterator.return("END");
```

The generator enters pending `finally` blocks before it completes.

If the `finally` block does not yield, the result is commonly:

```text
{ value: "END", done: true }
```

The important rule is:

```text
normal completion
throw
return()
```

all pass through applicable `finally` blocks.

`finally` is therefore the natural place for:

```text
releasing resources
closing handles
unsubscribing
logging completion
propagating cancellation to an owned iterator
```

`return()` is a request to terminate; it is not permission to skip cleanup.

---

# R04 — a `finally` block can yield

A subtle case:

```js
function* demo() {
  try {
    yield "work";
  } finally {
    yield "cleanup-1";
    yield "cleanup-2";
  }
}
```

After the first item:

```js
const iterator = demo();

iterator.next();
// { value: "work", done: false }

iterator.return("END");
// { value: "cleanup-1", done: false }
```

The requested completion value has not been returned yet because the `finally` block suspended at another `yield`.

Further calls drain cleanup values:

```js
iterator.next();
// { value: "cleanup-2", done: false }

iterator.next();
// { value: "END", done: true }
```

Mental model:

```text
return("END")
    starts termination

finally yields
    termination pauses

consumer keeps calling next()
    cleanup sequence continues

finally finishes
    iterator completes with "END"
```

This is why `generator.return(value)` does not universally mean “the next result is immediately `done: true`.”

## Async-generator caveat

An async generator processes control requests in sequence. If it is currently blocked in an awaited operation that never settles, a later `return()` cannot reach the `finally` block until control leaves that await.

```text
return() requests cleanup
but it cannot magically interrupt arbitrary awaited work
```

To make cancellation responsive, the awaited operation should support cancellation, for example through an `AbortSignal`.

## Practical checklist

```text
[ ] use yield for intermediate values
[ ] use return for completion
[ ] remember that generator calls return iterator objects
[ ] use for await...of for async generators
[ ] propagate consumer cancellation with iterator.return when appropriate
[ ] place cleanup in finally
[ ] keep draining if finally itself yields
[ ] make awaited operations cancellable when prompt shutdown matters
```

---

# Coverage

```text
unique embedded screenshots: 30
image uses: 30
native SVG labels: 19
duplicate extra placements: 0

processed image uses: 30
processed text labels: 19
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
