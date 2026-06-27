# R03 — Action, Func, Predicate and built-in delegate shapes

## Boundary

This region is the boxed lower section about built-in delegate types.

## Verified transcript

`Action` is the built-in delegate family for methods that return `void`.

- `Action` takes no parameters and returns `void`.
- `Action<T>` takes one parameter and returns `void`.
- `Action<T1,T2>` and higher arities describe additional input parameters.

For example, `Action<int,string>` is equivalent in shape to a custom delegate declared as `delegate void LogUserDelegate(int userId, string name)`. The built-in type avoids declaring a custom delegate when no domain-specific delegate name is needed.

`Func<TResult>` and `Func<T,TResult>` represent functions that return a value. The final generic argument is the result type. Use `Action` for a void-returning operation and `Func` when the caller needs a result.

`Predicate<T>` is a delegate taking `T` and returning `bool`; it is shape-compatible with `Func<T,bool>`, though the semantic name emphasizes a test. The screenshots compare these families and show lambdas assigned to each.


## Source closure

- Verified image uses: 8
- Verified non-empty SVG text nodes: 3
- Missing: 0
- Unreviewed: 0
