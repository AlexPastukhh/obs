# Razor partial updates for ViewComponent — final coverage transcript

Source: `RAZOR PARTIAL UPDATES FOR VIEWCOMPONENT HTMX,AJAX.svg`  
Coverage: **12 image uses + 10 canvas labels**

## 0.1 Area understanding / reading quality

This conspect answers whether a server-rendered ViewComponent can update without a full page reload. The answer is yes, but not automatically: once the generated HTML reaches the browser, it is static markup. A client-side mechanism must request or receive fresh HTML/data and replace part of the DOM. The screenshots and code were readable; exact snippets remain preserved in source PNGs.

## R01 — available update mechanisms

A ViewComponent is rendered on the server. After its HTML is delivered, the browser does not know when the underlying server state changes. Common approaches are:

```text
1. AJAX/fetch -> call an endpoint that returns ViewComponent HTML, then replace a DOM fragment.
2. HTMX       -> declare the request, trigger, target, and swap strategy with HTML attributes.
3. SignalR    -> notify the browser that data changed; the client then refreshes the fragment.
```

SignalR can push complete HTML, but a lighter and usually cleaner pattern is to push a small “refresh now” event and let the client fetch the updated ViewComponent HTML. That avoids maintaining a separate client-side rendering model.

## R02 — AJAX/fetch and DOM replacement

The controller exposes an endpoint that returns the ViewComponent result, for example a cart-summary endpoint. The Razor page initially renders:

```razor
<div id="cartSummaryContainer">
    @await Component.InvokeAsync("CartSummary")
</div>
```

A client function then:

1. calls the endpoint with `fetch`;
2. reads the returned HTML text;
3. replaces `innerHTML` of the target container.

A button or another browser event can invoke this refresh function. This re-renders the ViewComponent on the server and swaps only the affected fragment instead of navigating or reloading the entire page.

Important boundary: the endpoint returns HTML, not necessarily JSON. The browser owns the replacement step.

## R03 — HTMX partial updates

HTMX provides the same request-and-swap behavior declaratively. The source uses attributes such as:

```html
<div id="cartSummary"
     hx-get="/widgets/cart-summary"
     hx-trigger="load, every 5s"
     hx-swap="innerHTML">
    @await Component.InvokeAsync("CartSummary")
</div>
```

Core attributes:

```text
hx-get / hx-post -> endpoint to call
hx-trigger        -> load, click, change, every 5s, or another event
hx-target         -> element that receives the response
hx-swap           -> replacement strategy, such as innerHTML
```

The page includes the HTMX script, and the endpoint still returns server-rendered HTML. No custom JavaScript is required for ordinary polling or button-triggered refreshes.

A minimal button example uses `hx-get`, `hx-target`, and `hx-swap` to refresh the component on demand. A polling example repeats the request every few seconds, giving a live-widget or SPA-like feel while keeping MVC/ViewComponent rendering on the server.

## Choosing an approach

```text
AJAX/fetch
- best when custom client logic is already present;
- explicit control over requests, errors, loading states, and DOM updates.

HTMX
- best when UI updates are mostly “replace this fragment with server HTML”;
- minimal JavaScript and no frontend build pipeline required.

SignalR
- best for server-triggered notifications or true real-time change signals;
- often combined with AJAX/HTMX to fetch the new fragment.
```

These techniques provide partial page updates, not client-side routing/state management. They can feel SPA-like for widgets, tables, inline forms, and dashboards while retaining server-rendered Razor architecture.
