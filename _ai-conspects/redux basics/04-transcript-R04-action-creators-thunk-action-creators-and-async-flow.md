# Regional transcript — R04: Action creators, thunk action creators and async flow

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 28 / 28
unique screenshots represented: 27
repeated placements retained: 1
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A normal action creator returns a plain action. A thunk action creator returns a function that middleware executes with `dispatch` and `getState`.

## Normal action creator

- Calling the creator produces an object.
- Dispatch receives the resulting plain object.
- No thunk middleware is needed.
- Use normal creators for synchronous state transitions.

## Thunk action creator

- Calling the creator produces a function.
- Dispatching that function requires thunk middleware.
- The thunk can perform I/O and dispatch zero or more plain actions.
- It can read current state through `getState`.

## Classic async lifecycle

- Dispatch a request/start action before the API call.
- Dispatch success with data when the promise resolves.
- Dispatch failure with a serializable error payload when it rejects.
- The reducer updates `loading`, `data` and `error` for each phase.

## Conditional and chained logic

- Skip a request when equivalent data is already loading or cached.
- Read auth/filter state before constructing the request.
- Dispatch a follow-up action after success.
- Keep component code small by locating orchestration in the thunk.

## Component integration

- Hooks code calls `dispatch(fetchProducts())`.
- Classic connect maps the same thunk action creator through `mapDispatchToProps`.
- Components select loading/data/error and render the current state.

## Modern direction

- Redux Toolkit `createAsyncThunk` standardizes pending/fulfilled/rejected actions.
- RTK Query is often preferable for server-state fetching and caching.
- Manual thunks remain useful for multi-step workflows and non-query orchestration.

## Representative pattern

```js
export const fetchProducts = () => async (dispatch, getState) => {
  if (getState().products.loading) return;

  dispatch({ type: "FETCH_REQUEST" });

  try {
    const { data } = await axios.get("/products");
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: error.message });
  }
};
```

## Caveats

- Do not dispatch raw Error objects when serializable state/actions are required.
- Guard retries and duplicate calls explicitly; async dispatch alone does not deduplicate requests.

## Source labels

- `action creators / thunk functions`
- `(+ thunk action creators) difference`
- `and explaination`
- `async flow example`
- `examples`

## Covered text elements

```text
T-006, T-007, T-008, T-009, T-010
```

## Covered screenshot uses

```text
IU-011, IU-012, IU-013, IU-014, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020, IU-047, IU-048, IU-049
IU-050, IU-051, IU-052, IU-058, IU-063, IU-064, IU-065, IU-066, IU-067, IU-068, IU-069, IU-070, IU-071
IU-072, IU-079
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
