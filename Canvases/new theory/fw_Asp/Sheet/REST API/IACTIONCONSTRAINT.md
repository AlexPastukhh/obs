---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
IACTIONCONSTRAINT ^4gukjXcc

FROM COURSE WITH
 PLAIN IACTIONCONSTAINT ATTR ^8OCLiVNs

NEED TO VALIDATE 
INPUTTED BY DEVELOPER
VALUES ^KjzxfPBL

BUT NOT ONLY HEADERS MB ^O0Wsc0di

WITH VALIDATION OF DEVELOPERS INPUT 
AND MULTIPLE CTORS ^UbbhvIry

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