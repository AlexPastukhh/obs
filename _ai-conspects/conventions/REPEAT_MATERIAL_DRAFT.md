# Repeat material — ASP.NET Core Application Model Conventions

## One-minute recall

```text
Convention = startup-time MVC metadata mutation.
Not request-time logic.

Whole app       IApplicationModelConvention
One controller  IControllerModelConvention
One action      IActionModelConvention
One parameter   IParameterModelConvention
Razor Pages     IPage* conventions
```

## Model graph

```text
ApplicationModel
└── Controllers
    └── Actions
        └── Parameters
```

Related metadata:

```text
PropertyModel
SelectorModel
AttributeRouteModel
ApiExplorerModel
BindingInfo
```

## Decision rule

```text
local one-off rule      -> attribute
repeated structural rule -> convention
runtime request rule     -> middleware/filter/policy/binder/service
```

## High-value examples

- global `/api/v1` route prefix;
- filters by controller namespace;
- hide actions/controllers from Swagger;
- default `id` parameters to route binding;
- Razor Page route/handler conventions.
