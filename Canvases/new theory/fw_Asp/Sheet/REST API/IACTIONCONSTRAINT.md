---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
IACTIONCONSTRAINT ^4gukjXcc

FROM COURSE WITH PLAIN IACTIONCONSTAINT ATTR ^8OCLiVNs

NEED TO VALIDATE 
INPUTTED BY DEVELOPER
VALUES ^KjzxfPBL

BUT NOT ONLY HEADERS MB ^O0Wsc0di

WITH VALIDATION OF DEVELOPERS INPUT AND MULTIPLE CTORS ^UbbhvIry

using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.Primitives;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
public sealed class RequestMatchesAttribute : Attribute, IActionConstraintFactory
{
    // Lower runs earlier
    public int Order { get; set; } = 0;

    public bool IsReusable => true;

    // Optional: match method
    public string? HttpMethod { get; }

    // Optional: match a single header against allowed media types
    // (Typical for Content-Type selection)
    public string? HeaderToMatch { get; }
    private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;

    // Optional: query string rules (presence or exact match)
    public string? RequiredQueryKey { get; }
    public string? RequiredQueryValue { get; }

    // Optional: route value rules
    public string? RequiredRouteKey { get; }
    public string? RequiredRouteValue { get; }

    // Example ctor: match by Content-Type list
    public RequestMatchesAttribute(
        string headerToMatch,
        string mediaType,
        params string[] otherMediaTypes)
    {
        if (string.IsNullOrWhiteSpace(headerToMatch))
            throw new ArgumentNullException(nameof(headerToMatch));

        HeaderToMatch = headerToMatch;

        var all = new List<string> { mediaType };
        if (otherMediaTypes is { Length: > 0 })
            all.AddRange(otherMediaTypes);

        _allowedHeaderMediaTypes = all.Select(mt =>
        {
            // Validate DEV-provided media type strings
            if (!MediaTypeHeaderValue.TryParse(mt, out var parsed))
                throw new ArgumentException($"Invalid media type configured: '{mt}'", nameof(mediaType));
            return parsed!;
        }).ToArray();
    }

    // Example ctor: match by query (presence or exact)
    public RequestMatchesAttribute(string requiredQueryKey, string? requiredQueryValue = null, bool query = true)
    {
        if (!query) throw new ArgumentException("Use the query ctor overload.", nameof(query));
        if (string.IsNullOrWhiteSpace(requiredQueryKey))
            throw new ArgumentNullException(nameof(requiredQueryKey));

        RequiredQueryKey = requiredQueryKey;
        RequiredQueryValue = requiredQueryValue;
    }

    // Example ctor: match by route value
    public RequestMatchesAttribute(string requiredRouteKey, string requiredRouteValue, bool route = true)
    {
        if (!route) throw new ArgumentException("Use the route ctor overload.", nameof(route));
        if (string.IsNullOrWhiteSpace(requiredRouteKey))
            throw new ArgumentNullException(nameof(requiredRouteKey));
        if (string.IsNullOrWhiteSpace(requiredRouteValue))
            throw new ArgumentNullException(nameof(requiredRouteValue));

        RequiredRouteKey = requiredRouteKey;
        RequiredRouteValue = requiredRouteValue;
    }

    public IActionConstraint CreateInstance(IServiceProvider services)
        => new RequestMatchesConstraint(
            order: Order,
            httpMethod: HttpMethod,
            headerToMatch: HeaderToMatch,
            allowedHeaderMediaTypes: _allowedHeaderMediaTypes,
            requiredQueryKey: RequiredQueryKey,
            requiredQueryValue: RequiredQueryValue,
            requiredRouteKey: RequiredRouteKey,
            requiredRouteValue: RequiredRouteValue);

    private sealed class RequestMatchesConstraint : IActionConstraint
    {
        private readonly int _order;
        private readonly string? _httpMethod;

        private readonly string? _headerToMatch;
        private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;

        private readonly string? _requiredQueryKey;
        private readonly string? _requiredQueryValue;

        private readonly string? _requiredRouteKey;
        private readonly string? _requiredRouteValue;

        public RequestMatchesConstraint(
            int order,
            string? httpMethod,
            string? headerToMatch,
            MediaTypeHeaderValue[]? allowedHeaderMediaTypes,
            string? requiredQueryKey,
            string? requiredQueryValue,
            string? requiredRouteKey,
            string? requiredRouteValue)
        {
            _order = order;
            _httpMethod = httpMethod;
            _headerToMatch = headerToMatch;
            _allowedHeaderMediaTypes = allowedHeaderMediaTypes;
            _requiredQueryKey = requiredQueryKey;
            _requiredQueryValue = requiredQueryValue;
            _requiredRouteKey = requiredRouteKey;
            _requiredRouteValue = requiredRouteValue;
        }

        public int Order => _order;

        public bool Accept(ActionConstraintContext context)
        {
            var http = context.RouteContext.HttpContext;
            var req = http.Request;

            // Method (optional)
            if (!string.IsNullOrWhiteSpace(_httpMethod) &&
                !HttpMethods.IsMethod(req.Method, _httpMethod))
            {
                return false;
            }

            // Route rule (optional)
            if (_requiredRouteKey != null)
            {
                if (!context.RouteContext.RouteData.Values.TryGetValue(_requiredRouteKey, out var obj))
                    return false;

                var actual = Convert.ToString(obj);
                if (!string.Equals(actual, _requiredRouteValue, StringComparison.OrdinalIgnoreCase))
                    return false;
            }

            // Query rule (optional)
            if (_requiredQueryKey != null)
            {
                if (!req.Query.TryGetValue(_requiredQueryKey, out var values))
                    return false;

                if (_requiredQueryValue != null && !AnyEquals(values, _requiredQueryValue))
                    return false;
            }

            // Header media type rule (optional)
            if (_headerToMatch != null && _allowedHeaderMediaTypes != null)
            {
                if (!req.Headers.TryGetValue(_headerToMatch, out var raw))
                    return false;

                // IMPORTANT: client header might be malformed -> don't throw
                if (!MediaTypeHeaderValue.TryParse(raw.ToString(), out var parsedRequest))
                    return false;

                var requestMediaType = parsedRequest!.MediaType?.Value;
                if (string.IsNullOrWhiteSpace(requestMediaType))
                    return false;

                foreach (var allowed in _allowedHeaderMediaTypes)
                {
                    if (string.Equals(requestMediaType, allowed.MediaType?.Value, StringComparison.OrdinalIgnoreCase))
                        return true;
                }

                return false;
            }

            // If no header rule configured, and other configured rules passed, accept.
            return true;
        }

        private static bool AnyEquals(StringValues values, string expected)
        {
            foreach (var v in values)
            {
                if (string.Equals(v, expected, StringComparison.OrdinalIgnoreCase))
                    return true;
            }
            return false;
        }
    }
} ^YDFDOT1M

## Embedded Files
3d2742e753fe979e6b1e68dd6662fa62b030f772: [[Pasted Image 20260217055449_872.png]]

ee46ea901b5e01536f7456a7ddb14e7b6db20bfc: [[Pasted Image 20260217052312_394.png]]

e39a58eb0a2ba45d3293c96841abc8d9c96c359c: [[Pasted Image 20260217052335_236.png]]

bb64805eaf018cef1be39da0eba964ae1b2a9820: [[Pasted Image 20260217052359_936.png]]

c2880d57af63239ff4742dc597d7354e4c5c7ae6: [[Pasted Image 20260217052415_752.png]]

cc25e710fbb608b14723e9de9099c470e8ae1bcc: [[Pasted Image 20260217052524_730.png]]

0b40614eb3a42762e44d742051822d37089335ac: [[Pasted Image 20260217052645_016.png]]

a46789a773699c22d2b00c9be28a7ac901301cfc: [[Pasted Image 20260217052647_615.png]]

14243043e8eac24b3f9b6406ed77c921c3d749df: [[Pasted Image 20260217053155_749.png]]

07d8cab71be9a5f909f6af007a5649b314667e0c: [[Pasted Image 20260217053202_638.png]]

c2e4cb842c975b03191279390e3042ef1b86ab4d: [[Pasted Image 20260217053205_821.png]]

c4b7827330f02e0c1bdb6cd342f0dbb4fde7e538: [[Pasted Image 20260217053207_708.png]]

56a028e2fbe8b1d38ffdb678f502de16a90ef588: [[Pasted Image 20260217053220_774.png]]

c80552a432b5b4607d72bc4e513f31be726f7c53: [[Pasted Image 20260217054247_759.png]]

013438c3cb91304c2ca4dcba8ad58c3dc85ee96c: [[Pasted Image 20260217054304_940.png]]

b2348c9d5c5b68e564a9a71cf00cccb2e3977e4c: [[Pasted Image 20260217054433_080.png]]

695b1c33a3039a41bc236463ebee92178fc4e88f: [[Pasted Image 20260217054452_491.png]]

f2f269b014c58c21896d614cb1cd1b0cb1efbe5c: [[Pasted Image 20260217054455_518.png]]

95d09bcb8e781d76ac74afc2922ba3b8c0ec439f: [[Pasted Image 20260217054458_140.png]]

35b452644e524eea3b9dd86feab8fd653099f420: [[Pasted Image 20260217054500_753.png]]

59782c7b04bcc8e2025b2757c2d3b54b318956a3: [[Pasted Image 20260217054844_926.png]]

fd672602bbe75f690f1173c3de2f66c0ae471248: [[Pasted Image 20260217054859_599.png]]

569278f123fdabb9866a12cb37d52d21992fe7f7: [[Pasted Image 20260217054903_196.png]]

abe66aeab5d655e18ad45c8f0dad747012043eae: [[Pasted Image 20260217055509_450.png]]

c12254d0f02ca7f0ee1c3dbbf86f1b37b13bdad0: [[Pasted Image 20260217055515_346.png]]

696f5aa03929a74678825a0e9130d2ea48ddd3bd: [[Pasted Image 20260217062218_583.png]]

d83dd58c8fe32dd23f5f6f4293fafd12fc003430: [[Pasted Image 20260217062223_588.png]]

2f4f7e8650f551585416c0e5f052debcc2d0d8ff: [[Pasted Image 20260217062231_138.png]]

2bbef0f7a05d10ab4a747dff791e033be0434de9: [[Pasted Image 20260217062237_256.png]]

7bcd4334ca231da085b761a741ed9ceb52fed1e9: [[Pasted Image 20260217062250_098.png]]

5d79a211da15bc223ac41abdc851be090684bc5e: [[Pasted Image 20260217062256_652.png]]

5ed28c5bf5bd575bbfe4a1ee4a383c4c29b62f54: [[Pasted Image 20260217062306_931.png]]

d65886f43858be88a3f5d344ecbc779dceb387a0: [[Pasted Image 20260217062309_447.png]]

06e61e55b77f1fc72854c287c5c8c3b5565e27ca: [[Pasted Image 20260217062312_248.png]]

f83b8f43833845e94f05033dd5532f4bd0f4a539: [[Pasted Image 20260217062552_852.png]]

db2b89212c64cf2ef6024d1db9ba0a089b94dce3: [[Pasted Image 20260217062556_306.png]]

edc4449a8db97042bfa304d3ce150607d507bae5: [[Pasted Image 20260217062615_186.png]]

76f792c2e35a63fc1c08df521f9653cb22290931: [[Pasted Image 20260218002432_990.png]]

5d6824423c00d7227b470b1b6c71053e0a4bf048: [[Pasted Image 20260218002436_899.png]]

e331ca0cb4924f6589f79d055dabf362d10c5ad8: [[Pasted Image 20260218002439_450.png]]

%%
## Drawing
```compressed-json
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
```
%%