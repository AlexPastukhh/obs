# Route parameters and query strings — repetition guide v002

## One-minute model

```text
route value -> one value from one path segment
simple scalar -> built-in conversion such as int/Guid
repeated query keys -> built-in collection shape
CSV in one route/query value -> application-defined grammar
custom value/binder -> reusable parsing policy
request body -> structured/large batch input
```

## Compare

1. route identity vs query filtering.
2. repeated query keys vs CSV query value.
3. scalar conversion vs collection grammar.
4. inline split/parse vs custom binder.
5. custom binder vs `IParsable<T>` value object.
6. explicit composite segments vs packed key string.
7. GET query list vs POST structured batch request.
8. framework binding behavior vs REST design advice.

## Checklist

```text
[ ] route and parameter names match
[ ] scalar constraints are declared
[ ] list grammar is explicit
[ ] invalid element -> controlled 400
[ ] count and URL-size limits exist
[ ] duplicate/order/empty semantics are documented
[ ] GUID/int parsing is culture-safe
[ ] no silent dropping of malformed values
[ ] integration tests cover real binding behavior
```
