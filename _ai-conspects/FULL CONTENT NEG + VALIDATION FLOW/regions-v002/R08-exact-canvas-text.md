# R08 — RequestMatchesAttribute for method/header/query/route matching

Exact non-empty SVG text elements in this region: 163

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-103

Canvas position: `x=7233.082`, `y=22287.113`

~~~text
using Microsoft.AspNetCore.Mvc.ActionConstraints;
~~~

## T-104

Canvas position: `x=7233.082`, `y=22312.113`

~~~text
using Microsoft.Net.Http.Headers;
~~~

## T-105

Canvas position: `x=7233.082`, `y=22337.113`

~~~text
using Microsoft.Extensions.Primitives;
~~~

## T-106

Canvas position: `x=7233.082`, `y=22387.113`

~~~text
[AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
~~~

## T-107

Canvas position: `x=7233.082`, `y=22412.113`

~~~text
public sealed class RequestMatchesAttribute : Attribute, IActionConstraintFactory
~~~

## T-108

Canvas position: `x=7233.082`, `y=22437.113`

~~~text
{
~~~

## T-109

Canvas position: `x=7233.082`, `y=22462.113`

~~~text
// Lower runs earlier
~~~

## T-110

Canvas position: `x=7233.082`, `y=22487.113`

~~~text
public int Order { get; set; } = 0;
~~~

## T-111

Canvas position: `x=7233.082`, `y=22537.113`

~~~text
public bool IsReusable => true;
~~~

## T-112

Canvas position: `x=7233.082`, `y=22587.113`

~~~text
// Optional: match method
~~~

## T-113

Canvas position: `x=7233.082`, `y=22612.113`

~~~text
public string? HttpMethod { get; }
~~~

## T-114

Canvas position: `x=7233.082`, `y=22662.113`

~~~text
// Optional: match a single header against allowed media types
~~~

## T-115

Canvas position: `x=7233.082`, `y=22687.113`

~~~text
// (Typical for Content-Type selection)
~~~

## T-116

Canvas position: `x=7233.082`, `y=22712.113`

~~~text
public string? HeaderToMatch { get; }
~~~

## T-117

Canvas position: `x=7233.082`, `y=22737.113`

~~~text
private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;
~~~

## T-118

Canvas position: `x=7233.082`, `y=22787.113`

~~~text
// Optional: query string rules (presence or exact match)
~~~

## T-119

Canvas position: `x=7233.082`, `y=22812.113`

~~~text
public string? RequiredQueryKey { get; }
~~~

## T-120

Canvas position: `x=7233.082`, `y=22837.113`

~~~text
public string? RequiredQueryValue { get; }
~~~

## T-121

Canvas position: `x=7233.082`, `y=22887.113`

~~~text
// Optional: route value rules
~~~

## T-122

Canvas position: `x=7233.082`, `y=22912.113`

~~~text
public string? RequiredRouteKey { get; }
~~~

## T-123

Canvas position: `x=7233.082`, `y=22937.113`

~~~text
public string? RequiredRouteValue { get; }
~~~

## T-124

Canvas position: `x=7233.082`, `y=22987.113`

~~~text
// Example ctor: match by Content-Type list
~~~

## T-125

Canvas position: `x=7233.082`, `y=23012.113`

~~~text
public RequestMatchesAttribute(
~~~

## T-126

Canvas position: `x=7233.082`, `y=23037.113`

~~~text
string headerToMatch,
~~~

## T-127

Canvas position: `x=7233.082`, `y=23062.113`

~~~text
string mediaType,
~~~

## T-128

Canvas position: `x=7233.082`, `y=23087.113`

~~~text
params string[] otherMediaTypes)
~~~

## T-129

Canvas position: `x=7233.082`, `y=23112.113`

~~~text
{
~~~

## T-130

Canvas position: `x=7233.082`, `y=23137.113`

~~~text
if (string.IsNullOrWhiteSpace(headerToMatch))
~~~

## T-131

Canvas position: `x=7233.082`, `y=23162.113`

~~~text
throw new ArgumentNullException(nameof(headerToMatch));
~~~

## T-132

Canvas position: `x=7233.082`, `y=23212.113`

~~~text
HeaderToMatch = headerToMatch;
~~~

## T-133

Canvas position: `x=7233.082`, `y=23262.113`

~~~text
var all = new List<string> { mediaType };
~~~

## T-134

Canvas position: `x=7233.082`, `y=23287.113`

~~~text
if (otherMediaTypes is { Length: > 0 })
~~~

## T-135

Canvas position: `x=7233.082`, `y=23312.113`

~~~text
all.AddRange(otherMediaTypes);
~~~

## T-136

Canvas position: `x=7233.082`, `y=23362.113`

~~~text
_allowedHeaderMediaTypes = all.Select(mt =>
~~~

## T-137

Canvas position: `x=7233.082`, `y=23387.113`

~~~text
{
~~~

## T-138

Canvas position: `x=7233.082`, `y=23412.113`

~~~text
// Validate DEV-provided media type strings
~~~

## T-139

Canvas position: `x=7233.082`, `y=23437.113`

~~~text
if (!MediaTypeHeaderValue.TryParse(mt, out var parsed))
~~~

## T-140

Canvas position: `x=7233.082`, `y=23462.113`

~~~text
throw new ArgumentException($"Invalid media type configured: '{mt}'", nameof(mediaType));
~~~

## T-141

Canvas position: `x=7233.082`, `y=23487.113`

~~~text
return parsed!;
~~~

## T-142

Canvas position: `x=7233.082`, `y=23512.113`

~~~text
}).ToArray();
~~~

## T-143

Canvas position: `x=7233.082`, `y=23537.113`

~~~text
}
~~~

## T-144

Canvas position: `x=7233.082`, `y=23587.113`

~~~text
// Example ctor: match by query (presence or exact)
~~~

## T-145

Canvas position: `x=7233.082`, `y=23612.113`

~~~text
public RequestMatchesAttribute(string requiredQueryKey, string? requiredQueryValue = null, bool query = true)
~~~

## T-146

Canvas position: `x=7233.082`, `y=23637.113`

~~~text
{
~~~

## T-147

Canvas position: `x=7233.082`, `y=23662.113`

~~~text
if (!query) throw new ArgumentException("Use the query ctor overload.", nameof(query));
~~~

## T-148

Canvas position: `x=7233.082`, `y=23687.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredQueryKey))
~~~

## T-149

Canvas position: `x=7233.082`, `y=23712.113`

~~~text
throw new ArgumentNullException(nameof(requiredQueryKey));
~~~

## T-150

Canvas position: `x=7233.082`, `y=23762.113`

~~~text
RequiredQueryKey = requiredQueryKey;
~~~

## T-151

Canvas position: `x=7233.082`, `y=23787.113`

~~~text
RequiredQueryValue = requiredQueryValue;
~~~

## T-152

Canvas position: `x=7233.082`, `y=23812.113`

~~~text
}
~~~

## T-153

Canvas position: `x=7233.082`, `y=23862.113`

~~~text
// Example ctor: match by route value
~~~

## T-154

Canvas position: `x=7233.082`, `y=23887.113`

~~~text
public RequestMatchesAttribute(string requiredRouteKey, string requiredRouteValue, bool route = true)
~~~

## T-155

Canvas position: `x=7233.082`, `y=23912.113`

~~~text
{
~~~

## T-156

Canvas position: `x=7233.082`, `y=23937.113`

~~~text
if (!route) throw new ArgumentException("Use the route ctor overload.", nameof(route));
~~~

## T-157

Canvas position: `x=7233.082`, `y=23962.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredRouteKey))
~~~

## T-158

Canvas position: `x=7233.082`, `y=23987.113`

~~~text
throw new ArgumentNullException(nameof(requiredRouteKey));
~~~

## T-159

Canvas position: `x=7233.082`, `y=24012.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredRouteValue))
~~~

## T-160

Canvas position: `x=7233.082`, `y=24037.113`

~~~text
throw new ArgumentNullException(nameof(requiredRouteValue));
~~~

## T-161

Canvas position: `x=7233.082`, `y=24087.113`

~~~text
RequiredRouteKey = requiredRouteKey;
~~~

## T-162

Canvas position: `x=7233.082`, `y=24112.113`

~~~text
RequiredRouteValue = requiredRouteValue;
~~~

## T-163

Canvas position: `x=7233.082`, `y=24137.113`

~~~text
}
~~~

## T-164

Canvas position: `x=7233.082`, `y=24187.113`

~~~text
public IActionConstraint CreateInstance(IServiceProvider services)
~~~

## T-165

Canvas position: `x=7233.082`, `y=24212.113`

~~~text
=> new RequestMatchesConstraint(
~~~

## T-166

Canvas position: `x=7233.082`, `y=24237.113`

~~~text
order: Order,
~~~

## T-167

Canvas position: `x=7233.082`, `y=24262.113`

~~~text
httpMethod: HttpMethod,
~~~

## T-168

Canvas position: `x=7233.082`, `y=24287.113`

~~~text
headerToMatch: HeaderToMatch,
~~~

## T-169

Canvas position: `x=7233.082`, `y=24312.113`

~~~text
allowedHeaderMediaTypes: _allowedHeaderMediaTypes,
~~~

## T-170

Canvas position: `x=7233.082`, `y=24337.113`

~~~text
requiredQueryKey: RequiredQueryKey,
~~~

## T-171

Canvas position: `x=7233.082`, `y=24362.113`

~~~text
requiredQueryValue: RequiredQueryValue,
~~~

## T-172

Canvas position: `x=7233.082`, `y=24387.113`

~~~text
requiredRouteKey: RequiredRouteKey,
~~~

## T-173

Canvas position: `x=7233.082`, `y=24412.113`

~~~text
requiredRouteValue: RequiredRouteValue);
~~~

## T-174

Canvas position: `x=7233.082`, `y=24462.113`

~~~text
private sealed class RequestMatchesConstraint : IActionConstraint
~~~

## T-175

Canvas position: `x=7233.082`, `y=24487.113`

~~~text
{
~~~

## T-176

Canvas position: `x=7233.082`, `y=24512.113`

~~~text
private readonly int _order;
~~~

## T-177

Canvas position: `x=7233.082`, `y=24537.113`

~~~text
private readonly string? _httpMethod;
~~~

## T-178

Canvas position: `x=7233.082`, `y=24587.113`

~~~text
private readonly string? _headerToMatch;
~~~

## T-179

Canvas position: `x=7233.082`, `y=24612.113`

~~~text
private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;
~~~

## T-180

Canvas position: `x=7233.082`, `y=24662.113`

~~~text
private readonly string? _requiredQueryKey;
~~~

## T-181

Canvas position: `x=7233.082`, `y=24687.113`

~~~text
private readonly string? _requiredQueryValue;
~~~

## T-182

Canvas position: `x=7233.082`, `y=24737.113`

~~~text
private readonly string? _requiredRouteKey;
~~~

## T-183

Canvas position: `x=7233.082`, `y=24762.113`

~~~text
private readonly string? _requiredRouteValue;
~~~

## T-184

Canvas position: `x=7233.082`, `y=24812.113`

~~~text
public RequestMatchesConstraint(
~~~

## T-185

Canvas position: `x=7233.082`, `y=24837.113`

~~~text
int order,
~~~

## T-186

Canvas position: `x=7233.082`, `y=24862.113`

~~~text
string? httpMethod,
~~~

## T-187

Canvas position: `x=7233.082`, `y=24887.113`

~~~text
string? headerToMatch,
~~~

## T-188

Canvas position: `x=7233.082`, `y=24912.113`

~~~text
MediaTypeHeaderValue[]? allowedHeaderMediaTypes,
~~~

## T-189

Canvas position: `x=7233.082`, `y=24937.113`

~~~text
string? requiredQueryKey,
~~~

## T-190

Canvas position: `x=7233.082`, `y=24962.113`

~~~text
string? requiredQueryValue,
~~~

## T-191

Canvas position: `x=7233.082`, `y=24987.113`

~~~text
string? requiredRouteKey,
~~~

## T-192

Canvas position: `x=7233.082`, `y=25012.113`

~~~text
string? requiredRouteValue)
~~~

## T-193

Canvas position: `x=7233.082`, `y=25037.113`

~~~text
{
~~~

## T-194

Canvas position: `x=7233.082`, `y=25062.113`

~~~text
_order = order;
~~~

## T-195

Canvas position: `x=7233.082`, `y=25087.113`

~~~text
_httpMethod = httpMethod;
~~~

## T-196

Canvas position: `x=7233.082`, `y=25112.113`

~~~text
_headerToMatch = headerToMatch;
~~~

## T-197

Canvas position: `x=7233.082`, `y=25137.113`

~~~text
_allowedHeaderMediaTypes = allowedHeaderMediaTypes;
~~~

## T-198

Canvas position: `x=7233.082`, `y=25162.113`

~~~text
_requiredQueryKey = requiredQueryKey;
~~~

## T-199

Canvas position: `x=7233.082`, `y=25187.113`

~~~text
_requiredQueryValue = requiredQueryValue;
~~~

## T-200

Canvas position: `x=7233.082`, `y=25212.113`

~~~text
_requiredRouteKey = requiredRouteKey;
~~~

## T-201

Canvas position: `x=7233.082`, `y=25237.113`

~~~text
_requiredRouteValue = requiredRouteValue;
~~~

## T-202

Canvas position: `x=7233.082`, `y=25262.113`

~~~text
}
~~~

## T-203

Canvas position: `x=7233.082`, `y=25312.113`

~~~text
public int Order => _order;
~~~

## T-204

Canvas position: `x=7233.082`, `y=25362.113`

~~~text
public bool Accept(ActionConstraintContext context)
~~~

## T-205

Canvas position: `x=7233.082`, `y=25387.113`

~~~text
{
~~~

## T-206

Canvas position: `x=7233.082`, `y=25412.113`

~~~text
var http = context.RouteContext.HttpContext;
~~~

## T-207

Canvas position: `x=7233.082`, `y=25437.113`

~~~text
var req = http.Request;
~~~

## T-208

Canvas position: `x=7233.082`, `y=25487.113`

~~~text
// Method (optional)
~~~

## T-209

Canvas position: `x=7233.082`, `y=25512.113`

~~~text
if (!string.IsNullOrWhiteSpace(_httpMethod) &&
~~~

## T-210

Canvas position: `x=7233.082`, `y=25537.113`

~~~text
!HttpMethods.IsMethod(req.Method, _httpMethod))
~~~

## T-211

Canvas position: `x=7233.082`, `y=25562.113`

~~~text
{
~~~

## T-212

Canvas position: `x=7233.082`, `y=25587.113`

~~~text
return false;
~~~

## T-213

Canvas position: `x=7233.082`, `y=25612.113`

~~~text
}
~~~

## T-214

Canvas position: `x=7233.082`, `y=25662.113`

~~~text
// Route rule (optional)
~~~

## T-215

Canvas position: `x=7233.082`, `y=25687.113`

~~~text
if (_requiredRouteKey != null)
~~~

## T-216

Canvas position: `x=7233.082`, `y=25712.113`

~~~text
{
~~~

## T-217

Canvas position: `x=7233.082`, `y=25737.113`

~~~text
if (!context.RouteContext.RouteData.Values.TryGetValue(_requiredRouteKey, out var obj))
~~~

## T-218

Canvas position: `x=7233.082`, `y=25762.113`

~~~text
return false;
~~~

## T-549

Canvas position: `x=2478.247`, `y=25769.814`

~~~text
produces attribute
~~~

## T-263

Canvas position: `x=1296.268`, `y=25806.154`

~~~text
CAN SPLIT OUR ACTION THAT PRODUCES 4 DIFFERENT VARIANTS(APPJSON/HATEMARVIN
~~~

## T-219

Canvas position: `x=7233.082`, `y=25812.113`

~~~text
var actual = Convert.ToString(obj);
~~~

## T-264

Canvas position: `x=1296.268`, `y=25832.417`

~~~text
= FRENDLYJSON/FRENDLYHATE)
~~~

## T-220

Canvas position: `x=7233.082`, `y=25837.113`

~~~text
if (!string.Equals(actual, _requiredRouteValue, StringComparison.OrdinalIgnoreCase))
~~~

## T-221

Canvas position: `x=7233.082`, `y=25862.113`

~~~text
return false;
~~~

## T-222

Canvas position: `x=7233.082`, `y=25887.113`

~~~text
}
~~~

## T-223

Canvas position: `x=7233.082`, `y=25937.113`

~~~text
// Query rule (optional)
~~~

## T-224

Canvas position: `x=7233.082`, `y=25962.113`

~~~text
if (_requiredQueryKey != null)
~~~

## T-225

Canvas position: `x=7233.082`, `y=25987.113`

~~~text
{
~~~

## T-226

Canvas position: `x=7233.082`, `y=26012.113`

~~~text
if (!req.Query.TryGetValue(_requiredQueryKey, out var values))
~~~

## T-227

Canvas position: `x=7233.082`, `y=26037.113`

~~~text
return false;
~~~

## T-228

Canvas position: `x=7233.082`, `y=26087.113`

~~~text
if (_requiredQueryValue != null && !AnyEquals(values, _requiredQueryValue))
~~~

## T-229

Canvas position: `x=7233.082`, `y=26112.113`

~~~text
return false;
~~~

## T-230

Canvas position: `x=7233.082`, `y=26137.113`

~~~text
}
~~~

## T-231

Canvas position: `x=7233.082`, `y=26187.113`

~~~text
// Header media type rule (optional)
~~~

## T-232

Canvas position: `x=7233.082`, `y=26212.113`

~~~text
if (_headerToMatch != null && _allowedHeaderMediaTypes != null)
~~~

## T-233

Canvas position: `x=7233.082`, `y=26237.113`

~~~text
{
~~~

## T-234

Canvas position: `x=7233.082`, `y=26262.113`

~~~text
if (!req.Headers.TryGetValue(_headerToMatch, out var raw))
~~~

## T-235

Canvas position: `x=7233.082`, `y=26287.113`

~~~text
return false;
~~~

## T-236

Canvas position: `x=7233.082`, `y=26337.113`

~~~text
// IMPORTANT: client header might be malformed -> don't throw
~~~

## T-237

Canvas position: `x=7233.082`, `y=26362.113`

~~~text
if (!MediaTypeHeaderValue.TryParse(raw.ToString(), out var parsedRequest))
~~~

## T-238

Canvas position: `x=7233.082`, `y=26387.113`

~~~text
return false;
~~~

## T-239

Canvas position: `x=7233.082`, `y=26437.113`

~~~text
var requestMediaType = parsedRequest!.MediaType?.Value;
~~~

## T-240

Canvas position: `x=7233.082`, `y=26462.113`

~~~text
if (string.IsNullOrWhiteSpace(requestMediaType))
~~~

## T-241

Canvas position: `x=7233.082`, `y=26487.113`

~~~text
return false;
~~~

## T-242

Canvas position: `x=7233.082`, `y=26537.113`

~~~text
foreach (var allowed in _allowedHeaderMediaTypes)
~~~

## T-243

Canvas position: `x=7233.082`, `y=26562.113`

~~~text
{
~~~

## T-244

Canvas position: `x=7233.082`, `y=26587.113`

~~~text
if (string.Equals(requestMediaType, allowed.MediaType?.Value, StringComparison.OrdinalIgnoreCase))
~~~

## T-245

Canvas position: `x=7233.082`, `y=26612.113`

~~~text
return true;
~~~

## T-246

Canvas position: `x=7233.082`, `y=26637.113`

~~~text
}
~~~

## T-247

Canvas position: `x=7233.082`, `y=26687.113`

~~~text
return false;
~~~

## T-248

Canvas position: `x=7233.082`, `y=26712.113`

~~~text
}
~~~

## T-249

Canvas position: `x=7233.082`, `y=26762.113`

~~~text
// If no header rule configured, and other configured rules passed, accept.
~~~

## T-250

Canvas position: `x=7233.082`, `y=26787.113`

~~~text
return true;
~~~

## T-251

Canvas position: `x=7233.082`, `y=26812.113`

~~~text
}
~~~

## T-252

Canvas position: `x=7233.082`, `y=26862.113`

~~~text
private static bool AnyEquals(StringValues values, string expected)
~~~

## T-253

Canvas position: `x=7233.082`, `y=26887.113`

~~~text
{
~~~

## T-254

Canvas position: `x=7233.082`, `y=26912.113`

~~~text
foreach (var v in values)
~~~

## T-255

Canvas position: `x=7233.082`, `y=26937.113`

~~~text
{
~~~

## T-256

Canvas position: `x=7233.082`, `y=26962.113`

~~~text
if (string.Equals(v, expected, StringComparison.OrdinalIgnoreCase))
~~~

## T-257

Canvas position: `x=7233.082`, `y=26987.113`

~~~text
return true;
~~~

## T-258

Canvas position: `x=7233.082`, `y=27012.113`

~~~text
}
~~~

## T-259

Canvas position: `x=7233.082`, `y=27037.113`

~~~text
return false;
~~~

## T-260

Canvas position: `x=7233.082`, `y=27062.113`

~~~text
}
~~~

## T-261

Canvas position: `x=7233.082`, `y=27087.113`

~~~text
}
~~~

## T-262

Canvas position: `x=7233.082`, `y=27112.113`

~~~text
}
~~~
