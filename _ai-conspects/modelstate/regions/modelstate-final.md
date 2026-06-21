# ModelState — final source-preserving transcript

## 0.1 Area understanding / reading quality

This conspect explains how ASP.NET Core MVC populates and uses `ModelState`, how binding and validation failures are represented, how to return consistent error responses, and when manual validation with `TryValidateModel` is appropriate.

Reading quality is high. The source screenshots are preserved for exact code punctuation.

## 1. ModelState basics

`ModelState` is a `ModelStateDictionary` available through `ControllerBase.ModelState` or `ActionContext.ModelState`. It is populated during model binding and validation.

It can receive errors from:

- JSON parsing and model-binding failures;
- type conversion failures;
- missing request body or malformed input;
- data-annotation validation such as `[Required]` and `[Range]`;
- FluentValidation when integrated into model binding;
- explicit calls to `TryValidateModel`;
- manual calls to `ModelState.AddModelError`.

`ModelState.IsValid` is `true` only when no validation errors remain.

Keys represent property paths such as `Name`, `Address.Street` or `Items[0].Price`. Each `ModelStateEntry` can contain attempted/raw values and multiple `ModelError` objects.

A `ModelError` may store either an `ErrorMessage` or an `Exception`. Error extraction should therefore fall back from a non-empty `ErrorMessage` to `Exception.Message`, and only then to a generic message.

## 2. Error responses and API behavior

A common pattern is to project invalid entries into a list or dictionary keyed by field name. These values can feed `ValidationProblemDetails`, `ProblemDetails.Extensions["errors"]`, `ValidationProblem(ModelState)`, or a custom `422 Unprocessable Entity` response.

With `[ApiController]`, ASP.NET Core normally short-circuits invalid model state and produces an automatic `400` response before the action runs. Global formatting can be customized through `InvalidModelStateResponseFactory`.

When an action must inspect invalid state itself, apply custom logic, or return a different status such as `422`, automatic short-circuiting may be suppressed with `ApiBehaviorOptions.SuppressModelStateInvalidFilter`.

Manual errors can be added with `ModelState.AddModelError("FieldName", "...")`, including errors created from exceptions.

## 3. TryValidateModel

`TryValidateModel(object model, string? prefix = null)` manually executes the configured validators for an object and writes failures into `ModelState`.

It:

- uses the same validation system as normal MVC validation;
- executes data annotations, `IValidatableObject`, and integrated validators;
- returns `true` when valid and `false` when invalid;
- does not perform model binding;
- does not read the request body;
- does not catch JSON parse errors;
- does not run authorization filters;
- does not throw for normal validation failure.

It is useful for objects created inside an action, modified after model binding, produced by mapping/database/service layers, nested objects, conditionally constructed models, and PATCH-style updates.

## 4. Prefixes, collections and repeated validation

A prefix is critical for nested objects. Validating `order.ShippingAddress` with prefix `nameof(order.ShippingAddress)` produces keys like `ShippingAddress.Street` instead of a flat `Street`.

Collections should use indexed prefixes such as `Items[0]`, producing keys like `Items[0].Quantity`.

`TryValidateModel` appends errors; it does not clear `ModelState`. Revalidation may therefore require `ModelState.Clear()` or targeted removal before validating again.

`ValidateModel` internally performs similar validation but returns `void`; `TryValidateModel` returns a Boolean and does not throw for ordinary validation errors.

## 5. Typical mistakes

- Expecting `TryValidateModel` to catch malformed JSON after deserialization has already succeeded or failed.
- Forgetting prefixes for nested objects, which creates confusing flat keys.
- Revalidating automatically validated objects and producing duplicate errors.
- Assuming validation and model binding are the same operation.
