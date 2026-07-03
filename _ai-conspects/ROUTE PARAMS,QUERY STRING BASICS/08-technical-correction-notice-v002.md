# Technical correction notice — route lists and model binding v002

## Over-broad old/source wording

The phrase:

```text
Route parameters are meant to identify one specific resource,
not multiple resources.
```

is useful design advice but too absolute as a technical statement.

A URI path may identify a collection or batch-selection resource when the API defines that meaning. REST does not prohibit a list-shaped path value.

## Precise framework statement

A route segment such as:

```text
1,2,3
```

is one route value. Built-in scalar conversion can parse one `int` or `Guid`, but the framework does not automatically invent a CSV collection grammar for one segment and expand it into `long[]` or `IEnumerable<Guid>`.

Use one of:

1. bind `string` and parse;
2. bind a custom parsable value type;
3. apply/register a custom model binder;
4. use repeated query keys for ordinary filter collections;
5. use a structured request body for large/complex batches.

## Authority

For study, use:

```text
04-source-preserving-transcript-v002.md
05-code-reference-v002.md
06-repetition-guide-v002.md
07-question-bank-v002.md
```
