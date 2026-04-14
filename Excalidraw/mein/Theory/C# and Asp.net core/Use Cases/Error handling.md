---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
Explicit errors ^82myHDkW

 public static class DomainErrors
 {    
    public static class General
    {
        public static Error NotFound(long? id = null)
        {
            string forId = id == null ? "" : $" for Id '{id}'";
            return new Error("record.not.found", $"Record not found{forId}");
        }

        public static Error ValueIsInvalid() =>
            new Error("value.is.invalid", "Value is invalid");

        public static Error ValueIsRequired() =>
            new Error("value.is.required", "Value is required");

        public static Error InvalidLength(string? name = null)
        {
            string label = name == null ? " " : " " + name + " ";
            return new Error("invalid.string.length", $"Invalid{label}length");
        }

        public static Error CollectionIsTooSmall(int min, int current)
        {
            return new Error(
                "collection.is.too.small",
                $"The collection must contain {min} items or more. It contains {current} items.");
        }

        public static Error CollectionIsTooLarge(int max, int current)
        {
            return new Error(
                "collection.is.too.large",
                $"The collection must contain {max} items or more. It contains {current} items.");
        }

        public static Error InternalServerError(string message)
        {
            return new Error("internal.server.error", message);
        }
    }
} ^z4OMmYnC

 public sealed class Error : ValueObject
 {

     public string Code { get; }
     public string Message { get; }
     private readonly List<Error>_errors = new List<Error>();
     public IReadOnlyList<Error> Errors =>_errors;

     internal Error(
         string code, 
         string message,
         IEnumerable<Error>?errors =null)
     {
         Contract.Requires(
             code is not null &&
             message is not null);

         Code = code!;
         Message = message!;
         if(errors is not null)
         {
             _errors = errors.ToList();
         }
     }

     internal void AddError(Error error)
     {
         _errors.Add(error);
     }
     protected override IEnumerable<object> GetEqualityComponents()
     {
         yield return Code;
     }

     public bool HasErrors()
     {
         if (_errors.Count > 0) return true;
         return false;
     }

     

     public static Error WithErrors(
         string code,
         string message,
         IEnumerable<Error> errors)
     {
         Contract.Requires(
             code is not null &&
             message is not null &&
             errors is not null);

         return new Error(code!, message!, errors);

     }

     
 } ^NghJSoci

Error details ^CxeeA2hZ

Problem details response on every status code with errorcode param + problem from error ^trMyaG2A

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        await Results.Problem(
            new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Type = "https://problems-registry.smartbear.com/server-error",
            Title = "Server error",
            Extensions = new Dictionary<string, object?>
            {
                {"Code",DomainErrors.General.InternalServerError("Something went wrong").Code}
            }
        }).ExecuteAsync(httpContext);

        return true;
    }
} ^pSQXytwo

Global exception handler ^62H2r5UE

builder.Services
    .AddProblemDetails(options =>
        options.CustomizeProblemDetails = ctx =>
        {
            ctx.ProblemDetails.Extensions.Add("trace-id", ctx.HttpContext.TraceIdentifier);
            ctx.ProblemDetails.Extensions.Add("instance", $"{ctx.HttpContext.Request.Method} {ctx.HttpContext.Request.Path}");
        })
    .AddExceptionHandler<GlobalExceptionHandler>(); ^r6fGIzWb

protected IActionResult ValidationProblem(IEnumerable<ValidationFailure> validationErrors)
{
    var modelstate = new ModelStateDictionary();

    foreach (var error in validationErrors)
    {
        modelstate.AddModelError(
            error.PropertyName,
            error.ErrorCode);
    }
    return ValidationProblem(modelstate);
}

protected IActionResult BodyValidationProblems(IEnumerable<ValidationFailure> validationFailures)
{
    var errors = new List<object>();
    foreach(var failure in validationFailures)
    {
        errors.Add(new
        {
            pointer = $"#/{failure.PropertyName.ToLower()}",
            code = failure.ErrorCode,
            detail = failure.ErrorMessage
        });
    }
    var problemDetails = new ProblemDetails
    {
        Type = "https://problems-registry.smartbear.com/validation-error",
        Title = "Validation Error",
        Detail = "The request is not valid.",
        Status = 422,
        Extensions = new Dictionary<string, object>
            {
                {
                    "errors", errors
                }
            }!
    };
    return new ObjectResult(problemDetails);
        
    
}



protected IActionResult BadRequestProblem()
{

    return new ObjectResult(
        new ProblemDetails
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Bad request",
            Type = "https://problems-registry.smartbear.com/bad-request"
        }

    );
}

protected IActionResult NotFoundProblem()
{

    return new ObjectResult(
        new ProblemDetails
        {
            Status = StatusCodes.Status404NotFound,
            Title = "Resoure not found",
            Type = "https://problems-registry.smartbear.com/not-found"

        }

    );
}



protected IActionResult ProblemFromError(Error error)
{
    if(error == DomainErrors.General.NotFound())
    {
        return NotFoundProblem();
    }
    throw new Exception();            
} ^UmX4uuCV


public static readonly Error EmailIsTooLong "user.email.is.too.long",
"Email is too long, 50 characters max");
new(
public static readonly Error EmailIsInvalid = new(|
"user.email.format.is.invalid",
"Email is invalid"); ^vNduWFkU

options.CustomizeProblemDetails = context =>
{
    context.ProblemDetails.Instance = 
        $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
    
    context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);

    var activity = context.HttpContext.Features.Get<IHttpActivityFeature>()?.Activity;
    context.ProblemDetails.Extensions.TryAdd("traceId", activity?.Id);
}; ^xhk0ecb5

Something for fullname ^VwWBSb9C

 public static Error FirstNameIsTooLong(string currentLegnth)=>
     new Error("account.firstName.is.too.long", $"Max length for first name is 50 characters" +
         $" provided string has {currentLegnth}");

 public static Error MiddleNameIsTooLong(string currentLegnth) =>
     new Error("account.middleName.is.too.long", $"Max length for middle name is 50 characters" +
         $" provided string has {currentLegnth}");

 public static Error LastNameIsTooLong(string currentLegnth) =>
     new Error("account.lastName.is.too.long", $"Max length for last name is 50 characters" +
         $" provided string has {currentLegnth}");

 public static Error FirstNameIsRequired() =>
     new Error("account.firstName.is.required", "firstName is required");

 public static Error MiddleNameIsRequired() =>
     new Error("account.middleName.is.required", "middleName is required");

 public static Error LastNameIsRequired() =>
     new Error("account.lastName.is.required", "lastName is required"); ^P0WqFji0

## Embedded Files
5d9dd236b8e244f1625f18d5dc0409ef042271fd: [[image_1478.png]]

da86dde86e58d3e659a86ffbc62db2cec5688a98: [[image_1479.png]]

3112ad3fb4958ee9a8c0e118808b072dd813ce3c: [[image_1480.png]]

f11b60108616c9f8511ba2d2574470844716cc81: [[image_1481.png]]

8463f70dc4fc1a29534486b90224813e0eaad682: [[image_1482.png]]

b7995f33a86d08cd5aaa4be20e983a8f46cff21e: [[image_1483.png]]

37bd673646db7cdf641f12cfbcb94199256cf5cd: [[image_1484.png]]

97106d36ffe596196e3f5c12661d76a6bccbac04: [[image_1485.png]]

b75d352d92388bae22ef1f54a0c4241374160447: [[image_1486.png]]

4c77ef92034c057e04533c1618158f4e87a081f0: [[image_1487.png]]

d63c3a907314c7fb0bbaaf649548308b919eb016: [[image_1488.png]]

6444c5c36f413f4556db908ac9381549f874009b: [[image_1489.png]]

39ec744a5cab37db558b6c6f5304c05e0b945ce9: [[image_1497.png]]

ef3dd55b4534d0c663d39525086355c8faa788de: [[image_1498.png]]

01d7eea1adeceeb70778353c0c7c09215f5ea7e9: [[image_1597.png]]

%%
## Drawing
```compressed-json
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=
```
%%