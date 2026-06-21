# ViewComponent — final coverage transcript

## 0.1 Area understanding / reading quality

This conspect explains ASP.NET Core MVC View Components, their invocation and rendering pipeline, and the difference between View Components, ordinary Razor views/partials, and interactive React components.

Reading quality is high. All eleven screenshots are legible; no separate canvas text labels exist.

## R01 — basics, class, invocation and render flow

A View Component is a reusable server-side UI unit that combines rendering with its own data-fetching or business-facing orchestration.

A component class derives from `ViewComponent` and commonly exposes `InvokeAsync(...)`. It may inject services through its constructor, load its own model, and return `View(model)`.

Typical Razor invocation:

```cshtml
@await Component.InvokeAsync("FeaturedProducts", new { count = 2 })
```

Typical flow:

1. Razor encounters `Component.InvokeAsync(...)`.
2. MVC locates the corresponding View Component class.
3. MVC calls `Invoke(...)` or `InvokeAsync(...)`.
4. The component returns an `IViewComponentResult`, usually `View(model)`.
5. MVC renders the component view, commonly under `Views/Shared/Components/<Name>/Default.cshtml` or another valid discovery path.
6. The generated HTML is inserted into the parent Razor response.

A partial is appropriate when data already exists and only reusable markup is needed. A View Component is appropriate when the reusable UI block needs its own data retrieval, service calls, logic, or independence from the parent page model.

## R02 — React logic, Razor logic, View Component logic and updates

React component logic is interactive and stateful. It includes hooks, state, side effects, event handlers, derived rendering, and client-side data fetching. React automatically re-renders when state or props change and can update a small DOM subtree.

Razor view logic is mostly presentational. It is suitable for formatting, loops, small conditionals, helpers, and reading model/context/view data. Heavy business logic should remain in controllers or services, with shaped data supplied through a view model.

View Component logic is server-side widget logic:

- query a database or service;
- decide what to display;
- return a small view;
- use dependency injection and services similarly to a controller;
- remain reusable across views and layouts.

View Components do not become reactive merely because they are components. They render during a server request. Updating one later requires a page refresh or a client-side mechanism such as fetch/AJAX, HTMX, or SignalR that requests fresh component HTML.

## R03 — data flow and selection guide

React data flow commonly sends props down and events up, stores state in the client, and performs client-side fetching.

Razor MVC data flow commonly has the controller build a view model, the view render it, and the server emit HTML. State is usually request-to-response, with cookies or session only when needed.

A View Component is invoked by a parent view/layout, fetches or receives its own data, and returns an HTML fragment embedded in the page.

Use Razor views when:

- building server-rendered pages;
- SEO and fast first render matter;
- forms and CRUD pages are central;
- JavaScript should stay minimal.

Use View Components when:

- a reusable UI block needs independent data or logic;
- dependency-injected services are needed;
- the same widget appears in several views or layouts;
- duplicated controller/view logic should be avoided.

## Final takeaway

A View Component is best understood as reusable server-rendered UI with controller-like service access, not as a React-style reactive component. It owns a small server-side rendering workflow and produces HTML that the parent page embeds.
