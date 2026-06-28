# Final semantic transcript — Redux Toolkit

Authoritative source: `source/redux rtk.svg`  
Coverage: **50 unique screenshots / 50 placements + 72 native SVG labels**

---

# R01 — actions, payload, error and meta

## What an action is

A Redux action is a plain object describing something that happened.

Minimum shape:

```js
{
  type: "counter/increment"
}
```

Most actions also carry data:

```js
{
  type: "pizza/add",
  payload: 5
}
```

Important fields:

```text
type
    required action identifier

payload
    optional domain data

error
    optional error information, commonly used by rejected async actions

meta
    optional metadata such as thunk argument and request identifier
```

Middleware and reducers receive the same action object. There is no different “RTK action” at the Redux core level. Redux Toolkit generates conventional action creators and action type strings, but dispatch still sends ordinary action objects.

## Action creators

Classic action creator:

```js
const orderBurger = (amount) => ({
  type: "burger/order",
  payload: amount,
});
```

A `createSlice` reducer automatically generates an action creator:

```js
dispatch(pizzaAdded(5));
```

Conceptually dispatches:

```js
{
  type: "pizza/pizzaAdded",
  payload: 5
}
```

Generated type strings use the slice name and reducer name:

```text
sliceName/reducerName
```

That convention reduces collisions and makes DevTools output easier to read.

---

# R02 — store, slices, Provider, hooks and selectors

## `configureStore`

Redux Toolkit creates the store with `configureStore`:

```js
import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./features/pizza/pizzaSlice";
import burgerReducer from "./features/burger/burgerSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    burger: burgerReducer,
    product: productReducer,
  },
});
```

`configureStore`:

```text
combines slice reducers
installs the standard middleware set
supports thunks
enables useful development checks
integrates Redux DevTools in development
```

Extra middleware is added by extending the defaults rather than replacing them accidentally:

```js
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
```

## `createSlice`

A slice groups one state feature with its case reducers and generated actions:

```js
import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",

  initialState: {
    pizzaBase: 10,
  },

  reducers: {
    pizzaOrdered(state) {
      state.pizzaBase -= 1;
    },

    pizzaAdded(state, action) {
      state.pizzaBase += action.payload;
    },
  },
});

export const {
  pizzaOrdered,
  pizzaAdded,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
```

The apparent mutations are safe because Redux Toolkit uses Immer to produce an immutable next state.

Do not both mutate the draft and return an unrelated replacement value from the same case reducer. Use one update style consistently.

## Store state paths

The keys passed to `configureStore.reducer` define the root state shape:

```js
configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
});
```

Selector path:

```js
state.pizza.pizzaBase
```

A frequent bug is using a slice-internal field directly from the root, such as `state.pizzaBase`.

## Provider and hooks

The app must be wrapped in `Provider`:

```jsx
import { Provider } from "react-redux";

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

Components then use:

```js
const dispatch = useDispatch();
const value = useSelector(selector);
```

Dispatch an action creator result:

```js
dispatch(pizzaOrdered());
dispatch(pizzaAdded(5));
```

Do not call `dispatch` with the action creator function itself unless middleware explicitly expects that function, as with a thunk.

## Selectors

Selectors centralize state reads:

```js
export const selectPizzaBase =
  (state) => state.pizza.pizzaBase;

export const selectProductLoading =
  (state) => state.product.loading;

export const selectProductTitles =
  (state) => state.product.products;
```

Benefits:

```text
components stay focused on rendering
state paths are defined in one place
refactoring is easier
selectors are reusable
memoized selectors can derive expensive values
```

A complete application structure can separate:

```text
app/store.js
features/pizza/pizzaSlice.js
features/burger/burgerSlice.js
features/product/productSlice.js
features/product/productThunks.js
features/selectors.js
```

---

# R03 — `createAsyncThunk` lifecycle

## Creating a thunk

```js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (categoryId, thunkApi) => {
    const response = await axios.get(
      "/products",
      {
        params: {
          categoryId,
        },
        signal: thunkApi.signal,
      },
    );

    return response.data;
  },
);
```

The first string is a type prefix, not a URL:

```text
product/fetchProducts
```

Redux Toolkit derives lifecycle action types:

```text
product/fetchProducts/pending
product/fetchProducts/fulfilled
product/fetchProducts/rejected
```

## Dispatch flow

```js
dispatch(fetchProducts(categoryId));
```

Flow:

```text
1. pending is dispatched immediately
2. payload creator runs
3. resolved value becomes fulfilled action.payload
4. thrown/rejected failure creates a rejected action
```

Reducers do not watch a promise. They react to the normal lifecycle actions dispatched around the promise.

## Lifecycle action shapes

Pending contains metadata:

```js
{
  type: "product/fetchProducts/pending",
  meta: {
    arg: categoryId,
    requestId: "...",
    requestStatus: "pending"
  }
}
```

Fulfilled contains returned data:

```js
{
  type: "product/fetchProducts/fulfilled",
  payload: result,
  meta: {
    arg: categoryId,
    requestId: "...",
    requestStatus: "fulfilled"
  }
}
```

Rejected commonly contains serialized error information:

```js
{
  type: "product/fetchProducts/rejected",
  error: {
    message: "Network Error"
  },
  meta: {
    arg: categoryId,
    requestId: "...",
    requestStatus: "rejected"
  }
}
```

Use `rejectWithValue` when the server provides a deliberate domain error payload:

```js
return thunkApi.rejectWithValue({
  message: "Validation failed",
});
```

Then the rejected case may read `action.payload` for the controlled failure and `action.error` for unexpected errors.

## Request state

```js
const initialState = {
  loading: false,
  products: [],
  error: null,
};
```

The common lifecycle transitions are:

```text
pending
    loading = true
    error = null

fulfilled
    loading = false
    products = action.payload

rejected
    loading = false
    error = action.payload ?? action.error.message
```

The component can dispatch on mount and render loading/error/data states.

---

# R04 — `extraReducers` and `builder.addCase`

## Why `extraReducers` exists

Use `reducers` for actions owned by the slice.

Use `extraReducers` when the slice reacts to:

```text
actions generated by another slice
createAsyncThunk lifecycle actions
other external action creators or exact action types
```

Example:

```js
const burgerSlice = createSlice({
  name: "burger",

  initialState: {
    burgerBuns: 20,
  },

  reducers: {
    burgerOrdered(state) {
      state.burgerBuns -= 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      pizzaOrdered,
      (state) => {
        state.burgerBuns -= 1;
      },
    );
  },
});
```

The burger slice does not own the pizza action, but it can still respond to the same dispatched action object.

## `builder.addCase`

Recommended form:

```js
builder.addCase(
  someActionCreator,
  (state, action) => {
    // update draft state
  },
);
```

It can also match an exact action type string, but using the action creator keeps type information and avoids string duplication.

The callback receives:

```text
state
    current Immer draft for the slice

action
    dispatched action object
```

The callback runs only when the dispatched action type matches the registered case.

## Async cases

```js
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload
        ?? action.error.message;
    });
}
```

The same lifecycle action can be observed by multiple slices when several features must react to one request.

## Practical checks

```text
[ ] mount Provider around components
[ ] export each slice reducer and register it under the intended key
[ ] dispatch action creator results, not an uncalled action creator
[ ] dispatch thunk action creators through thunk-capable middleware
[ ] use reducers for owned actions
[ ] use extraReducers for external actions and thunk lifecycle actions
[ ] centralize state paths in selectors
[ ] keep middleware development-only when it is only for logging
[ ] handle both controlled rejected payloads and unexpected errors
```

---

# Coverage

```text
unique embedded screenshots: 50
image uses: 50
native SVG labels: 72
duplicate extra placements: 0

processed image uses: 50
processed text labels: 72
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
