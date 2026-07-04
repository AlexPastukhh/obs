# Questions — ASP.NET Core Application Model Conventions

## Core model

1. At what stage do application-model conventions run?
2. Why are they not middleware?
3. Why are they not action filters?
4. What kinds of metadata can they change?
5. Which rule from the source is a good convention job?
6. Which rule is explicitly not a good convention job?
7. What should handle request/user-dependent behavior instead?

## Interface choice

8. When should `IApplicationModelConvention` be used?
9. When should `IControllerModelConvention` be used?
10. When should `IActionModelConvention` be used?
11. When should `IParameterModelConvention` be used?
12. Which interface changes Razor Page routes?
13. Which interface changes Razor Page handlers?
14. Why is choosing the narrowest sufficient convention interface useful?
15. How often is each interface called for an app with 3 controllers, 10 actions, and 25 parameters?

## Model objects

16. What does `ApplicationModel` represent?
17. Name three important `ApplicationModel` members.
18. What does `ControllerModel` represent?
19. Which `ControllerModel` member contains actions?
20. Which member contains selectors?
21. What does `ActionModel` represent?
22. Which `ActionModel` member gives the parent controller?
23. What does `ParameterModel` represent?
24. Which property is modified to select route/query/body binding?
25. What is `ParameterModelBase` for?
26. What does `PropertyModel` represent?
27. What does `SelectorModel` control?
28. Name the three main `SelectorModel` collections/properties shown.
29. What is `AttributeRouteModel.CombineAttributeRouteModel` used for?
30. What does `ApiExplorerModel.IsVisible` control?
31. What does `ApiExplorerModel.GroupName` control?
32. Name four `BindingInfo` members.

## Code recall

33. Write a controller convention that adds `AuthorizeFilter("AdminOnly")` for namespaces containing `.Admin.`.
34. Write an action convention that adds `ValidateAntiForgeryTokenAttribute` to actions with `HttpPostAttribute`.
35. Write a parameter convention that binds parameters ending with `Id` from the route.
36. Write a global route-prefix convention using `AttributeRouteModel.CombineAttributeRouteModel`.
37. Write an action convention that hides actions whose name starts with `Internal`.
38. Show how to register controller, action, and parameter conventions in `AddControllers`.

## Design judgment

39. When is an attribute clearer than a convention?
40. Why should conventions remain deterministic?
41. Why is controller discovery not normally changed by an `IActionModelConvention`?
42. Why does a parameter convention not perform model binding itself?
43. How can a controller convention still modify actions?
44. How can an action convention inspect its controller?
45. What is the difference between registering a convention globally and using it as an attribute?
46. Why were two screenshots from the uploaded SVG excluded from this conspect?
