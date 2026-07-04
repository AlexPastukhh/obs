# ASP.NET Core Application Model Conventions — source-preserving final transcript v002

Generated: 2026-07-04 UTC

## Source decision

The uploaded SVG contained 52 image uses. The last two screenshots (`S-051`, `S-052`) are unrelated SQL Server `SqlBulkCopy` material and do not belong to the conventions conspect.

This archive therefore installs a cleaned current source containing the 50 relevant conventions screenshots. It does not treat the two foreign screenshots as missing conventions coverage.

```text
uploaded image uses: 52
foreign unrelated uses: 2
cleaned relevant uses: 50
native text lines: 19
grouped canvas labels: 18
broken images: 0
dangling uses: 0
```

Transcript mode: near-literal normalized. Visible code, member names, examples, and key wording are retained; spacing and minor punctuation are normalized.

## S-001 — Rule of thumb: startup metadata, not request-time behavior

**Near-literal normalized text**

A convention is for changing MVC's metadata before the app starts serving requests.

Good convention job:

> Every controller in namespace `MyApp.Admin` gets an `/admin` prefix.

Not a good convention job:

> If the current user is admin, change route behavior.

The second rule depends on the current request/user, so use middleware, filters, authorization policies, endpoint filters, or model binders instead.

## S-002 — Global API prefix

Add a global API prefix to all controllers.

Use either:

```csharp
IApplicationModelConvention
```

or:

```csharp
IControllerModelConvention
```

## S-003 — Prefix by controller namespace or type

Add a route prefix only when the controller namespace/type matches a rule.

Natural interface:

```csharp
IControllerModelConvention
```

## S-004 — Default filter for every action

Add a default filter to every action.

Possible entry points:

```csharp
IApplicationModelConvention
```

or:

```csharp
IActionModelConvention
```

## S-005 — Filter selected action patterns

Add a filter only to actions matching a particular name, attribute, route, or other action-level pattern.

Natural interface:

```csharp
IActionModelConvention
```

## S-006 — Hide selected actions from Swagger

Hide actions from Swagger / API Explorer.

Use:

```csharp
IActionModelConvention
```

and modify:

```csharp
ApiExplorerModel
```

## S-007 — Hide a whole controller from Swagger

Hide an entire controller from Swagger / API Explorer.

Use:

```csharp
IControllerModelConvention
```

and modify its:

```csharp
ApiExplorerModel
```

## S-008 — Default `id` parameters to route binding

Default all action parameters named `id` to route binding.

Use:

```csharp
IParameterModelConvention
```

## S-009 — Change Razor Page routes

Change Razor Page routes with:

```csharp
IPageRouteModelConvention
```

## S-010 — Change Razor Page handlers

Change Razor Page handlers with:

```csharp
IPageHandlerModelConvention
```

## S-011 — `ApplicationModel`

`ApplicationModel` represents the whole discovered MVC application.

Important members:

```csharp
application.Controllers
application.Filters
application.Properties
```

You can walk every controller/action/parameter, add global filters, and store global custom metadata in `Properties`.

Useful for global API prefixing, global metadata, application-wide naming policies, global filters, and rules that compare multiple controllers/actions.

## S-012 — `ControllerModel`

`ControllerModel` represents one controller class.

Important members:

```csharp
controller.Actions              // IList<ActionModel>
controller.ApiExplorer          // ApiExplorerModel
controller.Application          // ApplicationModel
controller.Attributes           // IReadOnlyList<object>
controller.ControllerName       // string
controller.ControllerProperties // IList<PropertyModel>
controller.ControllerType       // TypeInfo
controller.DisplayName          // string
controller.Filters              // IList<IFilterMetadata>
controller.Properties           // IDictionary<object, object>
controller.RouteValues          // IDictionary<string, string>
controller.Selectors            // IList<SelectorModel>
```

You can rename the controller, add/remove filters, modify controller-level routes, change API Explorer visibility/grouping, add metadata, inspect controller attributes, and inspect all actions under the controller.

## S-013 — Controller convention example

Example:

```csharp
public void Apply(ControllerModel controller)
{
    if (controller.ControllerType.Namespace?.Contains(".Admin.") == true)
    {
        controller.Filters.Add(new AuthorizeFilter("AdminOnly"));
    }
}
```

Best for controller-wide behavior.

Not best for per-request authorization decisions. Use authorization policies/handlers. Per-action runtime behavior should usually be implemented with filters.

## S-014 — `ActionModel` members

`ActionModel` represents one action method.

Important members:

```csharp
action.ActionMethod              // MethodInfo
action.ActionName                // string
action.ApiExplorer               // ApiExplorerModel
action.Attributes                // IReadOnlyList<object>
action.Controller                // ControllerModel
action.DisplayName               // string
action.Filters                   // IList<IFilterMetadata>
action.Parameters                // IList<ParameterModel>
action.Properties                // IDictionary<object, object>
action.RouteParameterTransformer // IOutboundParameterTransformer?
action.RouteValues               // IDictionary<string, string>
action.Selectors                 // IList<SelectorModel>
```

## S-015 — Action convention example

What you can do: rename actions, add filters, modify route selectors, hide/show an action in API Explorer, set a route token transformer, add custom action descriptor metadata, and inspect parameters.

Example:

```csharp
public void Apply(ActionModel action)
{
    if (action.Attributes.OfType<HttpPostAttribute>().Any())
    {
        action.Filters.Add(new ValidateAntiForgeryTokenAttribute());
    }
}
```

## S-016 — Action convention fit

Best for rules that apply to action methods.

Not best for changing controller discovery rules. For discovery, you usually need application parts or providers, not a normal application-model convention.

## S-017 — `ParameterModel`

`ParameterModel` represents one action method parameter.

Important members:

```csharp
parameter.Action        // ActionModel
parameter.Attributes    // IReadOnlyList<object>
parameter.BindingInfo   // BindingInfo?
parameter.DisplayName   // string
parameter.Name          // string
parameter.ParameterInfo // ParameterInfo
parameter.ParameterName // string
parameter.ParameterType // Type
parameter.Properties    // IDictionary<object, object>
```

You can set the binding source, binder type, binder name, and custom metadata, and inspect the parameter's attributes, type, and name.

## S-018 — Parameter convention example

Example:

```csharp
public void Apply(ParameterModel parameter)
{
    if (parameter.ParameterType == typeof(CancellationToken))
    {
        return;
    }

    if (parameter.ParameterName?.EndsWith("Id") == true)
    {
        parameter.BindingInfo ??= new BindingInfo();
        parameter.BindingInfo.BindingSource = BindingSource.Path;
    }
}
```

## S-019 — Parameter convention fit

Best for default binding rules.

Not best for validating values after binding. Use model validation, action filters, endpoint filters, or custom model binders for that.

## S-020 — `ParameterModelBase`

`ParameterModelBase` is the base model for things that are parameter-like or property-like.

Important members:

```csharp
model.BindingInfo
model.Name
model.ParameterType
model.Properties
```

Use it when one convention should apply to both MVC parameters and Razor Pages parameters/properties.

## S-021 — `PropertyModel`

`PropertyModel` represents a controller property that MVC treats as a model property.

Its important members are similar to `ParameterModelBase`, plus property reflection information.

Use it when customizing binding/metadata for controller properties, usually properties decorated for binding.

Usually avoid it when constructor injection, action parameters, or ordinary model types are clearer than binding controller properties.

## S-022 — `SelectorModel`

`SelectorModel` represents how a controller/action can be selected.

Important members:

```csharp
selector.AttributeRouteModel // AttributeRouteModel?
selector.ActionConstraints    // IList<IActionConstraintMetadata>
selector.EndpointMetadata     // IList<object>
```

You can change attribute routes, add action constraints, and add endpoint metadata.

Example:

```csharp
foreach (var selector in action.Selectors)
{
    selector.EndpointMetadata.Add(new MyCustomMetadata());
}
```

## S-023 — Selector model fit

Best for routing, action selection, HTTP method constraints, and endpoint metadata.

Not best for business logic. `SelectorModel` affects endpoint/action matching.

The documented surface includes `ActionConstraints`, `AttributeRouteModel`, and `EndpointMetadata`.

## S-024 — `AttributeRouteModel`

`AttributeRouteModel` represents an attribute route such as:

```csharp
[Route("api/products")]
```

Common members:

```csharp
route.Template
route.Name
route.Order
route.SuppressLinkGeneration
route.SuppressPathMatching
AttributeRouteModel.CombineAttributeRouteModel(...)
```

## S-025 — Route prefix combination

Use it for changing route templates, adding prefixes, and combining controller/action routes.

Example:

```csharp
var prefix = new AttributeRouteModel(
    new RouteAttribute("api/v1"));

selector.AttributeRouteModel =
    AttributeRouteModel.CombineAttributeRouteModel(
        prefix,
        selector.AttributeRouteModel);
```

Best for global route prefixes, route normalization, and version prefixes.

When the rule is simple and local, `[Route]`, `[HttpGet]`, route groups, or endpoint routing directly may be clearer.

## S-026 — `ApiExplorerModel`

`ApiExplorerModel` controls API Explorer metadata consumed by tools such as Swagger/OpenAPI.

Important members:

```csharp
apiExplorer.IsVisible
apiExplorer.GroupName
```

## S-027 — API Explorer example

Use it for hiding endpoints from generated docs, grouping APIs, and versioned API documentation.

Example:

```csharp
action.ApiExplorer.IsVisible = false;
action.ApiExplorer.GroupName = "internal";
```

For one action/controller, an attribute may be clearer:

```csharp
[ApiExplorerSettings(IgnoreApi = true, GroupName = "...")]
```

## S-028 — `BindingInfo`

`BindingInfo` controls model-binding metadata.

Important members:

```csharp
bindingInfo.BinderModelName
bindingInfo.BinderType
bindingInfo.BindingSource
bindingInfo.EmptyBodyBehavior
bindingInfo.PropertyFilterProvider
bindingInfo.RequestPredicate
```

## S-029 — Binding metadata example

Use it to default values to `[FromRoute]`, `[FromQuery]`, `[FromBody]`, a custom binder type, or a binder model name.

Example:

```csharp
parameter.BindingInfo ??= new BindingInfo();
parameter.BindingInfo.BindingSource = BindingSource.Query;
```

For one parameter, use binding attributes. For actual custom binding, implement `IModelBinder` / `IModelBinderProvider`.

## S-030 — `IApplicationModelConvention` declaration

```csharp
public sealed class MyConvention : IApplicationModelConvention
{
    public void Apply(ApplicationModel application)
    {
    }
}
```

Parameter: `ApplicationModel`.

Scope: the whole MVC application.

Use it to inspect or change all controllers/actions/parameters globally.

## S-031 — Whole-application use case

Good use cases:

```csharp
application.Controllers
application.Properties
```

Example:

```csharp
public sealed class GlobalRoutePrefixConvention
    : IApplicationModelConvention
{
    public void Apply(ApplicationModel application)
    {
        foreach (var controller in application.Controllers)
        {
            // modify every controller
        }
    }
}
```

## S-032 — When to choose an application convention

Good when a global convention depends on multiple controllers or actions, for example global route prefixing, global metadata, naming rules, or inspection of the whole discovered MVC application.

Use something narrower when possible:

```text
per-controller rule -> IControllerModelConvention
per-action rule     -> IActionModelConvention
runtime behavior    -> middleware or filters
```

Application-model conventions are startup-time configuration, not request-time logic.

## S-033 — `IControllerModelConvention` declaration

```csharp
public sealed class MyConvention : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
    }
}
```

## S-034 — Controller convention scope and members

Parameter: `ControllerModel`.

Scope: one controller at a time.

Use it when the rule is naturally about a controller class.

Good members:

```csharp
controller.ControllerName
controller.Selectors
controller.Filters
controller.ApiExplorer
controller.Actions
controller.RouteValues
controller.Properties
```

## S-035 — Controller prefix example

```csharp
public sealed class ApiPrefixConvention
    : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        foreach (var selector in controller.Selectors)
        {
            selector.AttributeRouteModel =
                AttributeRouteModel.CombineAttributeRouteModel(
                    new AttributeRouteModel(
                        new RouteAttribute("api/v1")),
                    selector.AttributeRouteModel);
        }
    }
}
```

## S-036 — When to choose a controller convention

Good when you want to add a route prefix, add a filter to whole controllers, hide/show controllers in Swagger/API Explorer, rename controllers, or apply metadata based on namespace/type/attributes.

For one specific controller, `[Route]`, `[Authorize]`, `[ApiExplorerSettings]`, or `[Area]` is often clearer.

For all actions regardless of controller, use `IActionModelConvention`.

## S-037 — `IActionModelConvention` declaration

```csharp
public sealed class MyConvention : IActionModelConvention
{
    public void Apply(ActionModel action)
    {
    }
}
```

## S-038 — Action convention scope and members

Parameter: `ActionModel`.

Scope: one action method at a time.

Good members:

```csharp
action.ActionName
action.ActionMethod
action.Parameters
action.Selectors
action.Filters
action.ApiExplorer
action.RouteValues
action.RouteParameterTransformer
action.Properties
```

## S-039 — Hide internal actions example

```csharp
public sealed class HideInternalActionsConvention
    : IActionModelConvention
{
    public void Apply(ActionModel action)
    {
        if (action.ActionName.StartsWith("Internal"))
        {
            action.ApiExplorer.IsVisible = false;
        }
    }
}
```

## S-040 — When to choose an action convention

Good when you want to add filters to some actions, rename actions, alter action routes, add OpenAPI/API Explorer metadata, add action constraints, inspect parameters, or set per-action metadata.

Use filters for actual logic before/after execution. Prefer attributes for simple route definitions. For endpoint-level Minimal API metadata, use endpoint route-builder APIs.

## S-041 — `IParameterModelConvention` declaration

```csharp
public sealed class MyConvention : IParameterModelConvention
{
    public void Apply(ParameterModel parameter)
    {
    }
}
```

## S-042 — Parameter convention scope and members

Parameter: `ParameterModel`.

Scope: one action parameter at a time.

Good members:

```csharp
parameter.ParameterName
parameter.ParameterType
parameter.BindingInfo
parameter.Attributes
parameter.Action
parameter.Properties
```

## S-043 — `id` from route example

```csharp
public sealed class IdFromRouteConvention
    : IParameterModelConvention
{
    public void Apply(ParameterModel parameter)
    {
        if (parameter.ParameterName == "id")
        {
            parameter.BindingInfo ??= new BindingInfo();
            parameter.BindingInfo.BindingSource = BindingSource.Path;
        }
    }
}
```

## S-044 — When to choose a parameter convention

Good when you want to set default binding behavior, require certain parameters to come from route/query/header/body, add custom binder metadata, or attach metadata for later use.

For one parameter, use `[FromRoute]`, `[FromQuery]`, `[FromBody]`, `[FromHeader]`, `[ModelBinder]`, and similar attributes.

A parameter convention configures binding metadata; it does not perform binding.

## S-045 — Razor Pages convention interfaces

Razor Pages conventions are similar to MVC conventions, but use separate interfaces.

| Interface | Model parameter | Use |
|---|---|---|
| `IPageApplicationModelConvention` | `PageApplicationModel` | Change Razor Page handler/page-model metadata |
| `IPageHandlerModelConvention` | `PageHandlerModel` | Change individual handlers such as `OnGet`, `OnPost` |
| `IPageRouteModelConvention` | `PageRouteModel` | Change Razor Page routes |
| `IParameterModelBaseConvention` | `ParameterModelBase` | Shared convention for controller/Razor Page parameters/properties |
| `IPageConvention` | varies | Common interface for Razor Pages route/application-model conventions |

## S-046 — Global registration and invocation count

Register MVC conventions globally:

```csharp
builder.Services.AddControllers(options =>
{
    options.Conventions.Add(new MyControllerConvention());
    options.Conventions.Add(new MyActionConvention());
    options.Conventions.Add(new MyParameterConvention());
});
```

MVC applies them to all discovered matching model objects during startup:

```text
IApplicationModelConvention -> once for the whole ApplicationModel
IControllerModelConvention  -> once for each ControllerModel
IActionModelConvention      -> once for each ActionModel
IParameterModelConvention   -> once for each ParameterModel
```

## S-047 — Concrete invocation-count example

If the app has:

```text
3 controllers
10 actions total
25 parameters total
```

then:

```text
IApplicationModelConvention.Apply(...) runs 1 time
IControllerModelConvention.Apply(...)  runs 3 times
IActionModelConvention.Apply(...)      runs 10 times
IParameterModelConvention.Apply(...)   runs 25 times
```

## S-048 — Controller convention can traverse actions

`IControllerModelConvention` is called for each controller, but inside it you can still access that controller's actions:

```csharp
public void Apply(ControllerModel controller)
{
    foreach (var action in controller.Actions)
    {
        // You can modify actions here too.
    }
}
```

## S-049 — Action convention can access controller

`IActionModelConvention` is called for each action, but the action still exposes its controller:

```csharp
public void Apply(ActionModel action)
{
    var controller = action.Controller;
}
```

The interface mostly controls the natural entry point and how many times MVC calls the convention.

## S-050 — Convention used as an attribute

Conventions can also be applied as attributes:

```csharp
[MyControllerConvention]
public class ProductsController : ControllerBase
{
}
```

In that form, the convention applies only to that controller rather than globally.

```text
registered in options.Conventions -> global
used as attribute                 -> local to that controller/action/parameter
```


# Canvas labels

```text
attributes
app model
Controller model
Action model
Parameter model
Parameter model base
Property model
selector model
api explorer model
binding info
App Model Convention
IController Model Convention
IAction Model Convention
IParameter Model Convention
Razor Pages interfaces
use or not
can access nested models in outer convention
```

# Integrated summary

Application-model conventions run while MVC builds its startup-time model. They modify controller, action, parameter, selector, API Explorer, route, filter, and binding metadata before requests are handled.

Choose the narrowest useful interface:

```text
whole graph    -> IApplicationModelConvention
one controller -> IControllerModelConvention
one action     -> IActionModelConvention
one parameter  -> IParameterModelConvention
Razor Pages    -> page convention interfaces
```

Do not use conventions for current-user or current-request decisions.
