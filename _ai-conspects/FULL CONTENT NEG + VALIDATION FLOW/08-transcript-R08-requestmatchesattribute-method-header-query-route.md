# Regional transcript — R08: RequestMatchesAttribute for method, header, query and route matching

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 163 / 163
image uses processed: 21 / 21
unique screenshots represented: 21
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The complete `RequestMatchesAttribute` example validates configuration in the
attribute and creates an immutable runtime action constraint.

### Supported rules

- optional HTTP method;
- optional route key and expected value;
- optional query-key presence;
- optional exact query value;
- optional header matched against allowed media types.

`AllowMultiple = true` permits several attributes. `Order` controls execution
order and `IsReusable` allows MVC to cache immutable instances.

### Constructor behavior

- reject blank header/query/route keys;
- validate every configured media type with `TryParse`;
- store parsed values in an immutable array;
- treat invalid constants as developer errors.

### Runtime `Accept`

The constraint:

1. compares the optional HTTP method;
2. reads and compares the optional route value;
3. verifies query-key presence and optional expected value;
4. reads the configured header;
5. uses `TryParse` so malformed client input does not throw;
6. compares the parsed request media type with the allowed list;
7. accepts when every configured rule passes.

If no header rule exists and the other rules pass, it accepts.

### Selection versus response

Returning false removes the action candidate and can eventually surface as
404/415-like selection failure. It does not directly create `ProblemDetails`.
Use explicit validation when malformed client input must return 400.

For request `Content-Type`, `[Consumes]` is usually preferable. For response
`Accept`, formatters or an explicit negotiation helper are usually more
idiomatic. Custom constraints are best for additional route/query/header
selection rules not already covered by the framework.

## Representative source labels

- using Microsoft.AspNetCore.Mvc.ActionConstraints;
- using Microsoft.Net.Http.Headers;
- using Microsoft.Extensions.Primitives;
- [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
- public sealed class RequestMatchesAttribute : Attribute, IActionConstraintFactory
- {
- // Lower runs earlier
- public int Order { get; set; } = 0;
- public bool IsReusable => true;
- // Optional: match method
- public string? HttpMethod { get; }
- // Optional: match a single header against allowed media types
- // (Typical for Content-Type selection)
- public string? HeaderToMatch { get; }
- private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;
- // Optional: query string rules (presence or exact match)
- public string? RequiredQueryKey { get; }
- public string? RequiredQueryValue { get; }
- // Optional: route value rules
- public string? RequiredRouteKey { get; }
- public string? RequiredRouteValue { get; }
- // Example ctor: match by Content-Type list
- public RequestMatchesAttribute(
- string headerToMatch,
- string mediaType,
- params string[] otherMediaTypes)
- if (string.IsNullOrWhiteSpace(headerToMatch))
- throw new ArgumentNullException(nameof(headerToMatch));
- HeaderToMatch = headerToMatch;
- var all = new List<string> { mediaType };

## Covered text elements

```text
T-103, T-104, T-105, T-106, T-107, T-108, T-109, T-110, T-111, T-112, T-113, T-114, T-115, T-116, T-117
T-118, T-119, T-120, T-121, T-122, T-123, T-124, T-125, T-126, T-127, T-128, T-129, T-130, T-131, T-132
T-133, T-134, T-135, T-136, T-137, T-138, T-139, T-140, T-141, T-142, T-143, T-144, T-145, T-146, T-147
T-148, T-149, T-150, T-151, T-152, T-153, T-154, T-155, T-156, T-157, T-158, T-159, T-160, T-161, T-162
T-163, T-164, T-165, T-166, T-167, T-168, T-169, T-170, T-171, T-172, T-173, T-174, T-175, T-176, T-177
T-178, T-179, T-180, T-181, T-182, T-183, T-184, T-185, T-186, T-187, T-188, T-189, T-190, T-191, T-192
T-193, T-194, T-195, T-196, T-197, T-198, T-199, T-200, T-201, T-202, T-203, T-204, T-205, T-206, T-207
T-208, T-209, T-210, T-211, T-212, T-213, T-214, T-215, T-216, T-217, T-218, T-219, T-220, T-221, T-222
T-223, T-224, T-225, T-226, T-227, T-228, T-229, T-230, T-231, T-232, T-233, T-234, T-235, T-236, T-237
T-238, T-239, T-240, T-241, T-242, T-243, T-244, T-245, T-246, T-247, T-248, T-249, T-250, T-251, T-252
T-253, T-254, T-255, T-256, T-257, T-258, T-259, T-260, T-261, T-262, T-263, T-264, T-549
```

## Covered screenshot uses

```text
IU-032, IU-034, IU-035, IU-038, IU-060, IU-061, IU-062, IU-063, IU-064, IU-065, IU-066, IU-070, IU-071
IU-072, IU-138, IU-139, IU-140, IU-141, IU-142, IU-143, IU-144
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
