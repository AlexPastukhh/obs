---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

public class RequireAdminFilter : IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        if (!user.IsInRole("Admin"))
        {
            context.Result = new ForbidResult();
            return;
        }
        await Task.CompletedTask;
    }
}
 ^2ZFyZHar

using Microsoft.AspNetCore.Mvc.Filters;

public class SimpleCacheResourceFilter : IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        // Example: short-circuit if cached
        var key = context.HttpContext.Request.Path.ToString();
        var cached = MyCache.Get(key);
        if (cached != null)
        {
            context.Result = new Microsoft.AspNetCore.Mvc.ContentResult
            {
                Content = cached,
                ContentType = "application/json",
            };
        }
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        // maybe update cache with context.Result if success
    }
}
 ^lC5zgUAI

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

public class TimingActionFilter : IAsyncActionFilter
{
    private readonly ILogger<TimingActionFilter> _log;
    public TimingActionFilter(ILogger<TimingActionFilter> log) => _log = log;

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var sw = Stopwatch.StartNew();

        // Example: auto-validate ModelState and short-circuit
        if (!context.ModelState.IsValid)
        {
            context.Result = new Microsoft.AspNetCore.Mvc.BadRequestObjectResult(context.ModelState);
            return;
        }

        var executedContext = await next(); // actually runs the action
        sw.Stop();

        _log.LogInformation("Action {action} took {ms}ms", context.ActionDescriptor.DisplayName, sw.ElapsedMilliseconds);

        // You can inspect executedContext.Result or Exception here
    }
}
 ^plDDuF9M

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ApiExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        // map exception types to status codes / ProblemDetails
        var pd = new ProblemDetails {
            Title = "An error occurred",
            Detail = ex.Message
        };
        context.Result = new ObjectResult(pd) { StatusCode = 500 };
        context.ExceptionHandled = true;
    }
}
 ^vBPgSfN0

!!! ^pYofqNWI

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class WrapResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        if (context.Result is ObjectResult obj)
        {
            // wrap existing payload
            var newObj = new { data = obj.Value, ok = true };
            context.Result = new ObjectResult(newObj) { StatusCode = obj.StatusCode };
        }
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // after result wrote to response
    }
}
 ^RBDfvZoN

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Threading;

public class LogEndpointFilter : IEndpointFilter
{
    private readonly ILogger<LogEndpointFilter> _log;
    public LogEndpointFilter(ILogger<LogEndpointFilter> log) => _log = log;

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        _log.LogInformation("Before endpoint {e}", ctx.Endpoint?.DisplayName);
        var result = await next(ctx);
        _log.LogInformation("After endpoint {e}", ctx.Endpoint?.DisplayName);
        return result;
    }
}

// Attach example:
app.MapGet("/hi", () => "hello").AddEndpointFilter<LogEndpointFilter>();
 ^a7oYBOF6

!!! ^Et7sucuw

more intuitivee ^qTVl2cLN

returning cached result before model binding ^787oktQy

resource filter after 
action can cache 
validated models ^J9ECHP4P

CAN ALSO USE FILTER ATTRIBUTES
CANT USE DI IN CTOR, NEED TO GET FROM CONTEXT
IT IS A DEFAULT WAY TO USE FILTERS ACTUALLY ^EmZaBzER

IFILTERFACTORY ^fPIF0d9A

can pass shit to attr with filt fact ^FDTzUHjX

filters
_____
filters vs middleware and 
theor ^3yAJSPOz

filters ^5IoSes8a

!!!! ^yQMFbSQm

middleware simply runs 
before filters ^cYEWWU6Q

can add this under main sheet which is lower ^V5YZZQp3

mb better to use
more excplicit ismthFilter or iasyncSmthFilter
and base Attribute class ^jnP2Df7H

but here you also can do async things ^yN1bPMpx

<---ASYNC FILTERS ^Zp2WfAEV

!!! ^e5cmHOsw

DI FOR GLOBAL AND TYPEFILTER WITH SERVICEFILTER ^D9xT5xQW

ordering ^EirAFqRV

exception filter ^fgM2OUwB

so when we are in mvc land and return object result or derived from object 
result, we dont care about accept header, its automatically handled
in middleware we nneed to use pdservice/factory for some content negotiations  ^7no5VPb2

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ApiExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        // map exception types to status codes / ProblemDetails
        var pd = new ProblemDetails {
            Title = "An error occurred",
            Detail = ex.Message
        };
        context.Result = new ObjectResult(pd) { StatusCode = 500 };
        context.ExceptionHandled = true;
    }
}
 ^km8kvWcH

result after exec vs 
resource after action ^zl1fMuxJ

invalidmodstrespfac with 
middleware and filter ^5efXIiN9

checking if rout is from api 
or controller ^n7WbgTCM

how to get services from httpcontext ^0vjKZPr9

why we cant use exc filters
to catch exceptions from auth filters ^dgCmagTK

exception middleware can ^aYacgEZD

return viewresult error page ^hcsYf5DQ

filter instead of 
statuscodepages? ^QEwBEi5n

always run result filter ^Cc7vWCej

alwats run result filter ^ZLsXGz2R

filter will run even if previous stages short circuited ^D5mKX66B

example ^lz492mGl

marking exception as 
handled to stop propagation ^gYZ4regU

## Embedded Files
9b8716a2a76d0895d05369dcbd5eb508694bed33: [[image_9136.png]]

71e898ccbf00acb5d6aa3a14f2156f43d7d4c14a: [[image_9137.png]]

ef0c26051cb7df0fde55d704bf286a9173f98b9f: [[image_9138.png]]

ea3ad239c0854f4c41782fe750c89260f7686f6e: [[image_9139.png]]

be9ea757cd495f93bb339b5a5621134e87c274c6: [[image_9140.png]]

9d9fef53f8a164e1b77f5976544826f7a57193d1: [[image_9141.png]]

f9529ae0529aedb65f044dbe6f65c6ed4ffb8d56: [[image_9142.png]]

58f90fb329603af8975ef54f02a64b0f9be7cfa3: [[image_9143.png]]

768ad6d87647379913ab69fa3eab42f4545b071a: [[image_9144.png]]

d3c9d9a2f60e76d50831fd4f7b3a5b68379555ea: [[image_9145.png]]

3643ec66acf7c3bf7c63e1afaac7d668d2b17aaa: [[image_9146.png]]

01b55d8a9f6ec0b5e0791c2a1c721b039524c2c5: [[image_9147.png]]

a3a0cc5df0f15ecd45b9a8066017633de05a79c6: [[image_9148.png]]

4a42c12b3615c2edd45fe37f9a8cc048bd0a5c1c: [[image_9149.png]]

dc6792e8310347a16f9cf57981dedcdf92834c8a: [[image_9150.png]]

7a6ed84d1662c9f9529d19537171e262e44797c5: [[image_9151.png]]

94b17b02bf58b6955f724add119fce2119d14ed5: [[image_9152.png]]

b63667e7f9fdc016ff11eb2a430fad1d8fb42ac3: [[image_9153.png]]

f56802ef5277c0d0cda2f459df0bb79cf37b440d: [[image_9154.png]]

7c9446a5993f1733b999f9f8210ac9ee79300766: [[image_9155.png]]

c2ded639992097aae2315dbf6ac06f346c26536f: [[image_9156.png]]

765d576f202f8c2e170a40eda9d2d6397bd4c927: [[image_9109.png]]

c0513e3528a9325533bde91e7eebf5a56ad18cba: [[image_9110.png]]

53eb0defc9bfba71df24cbb37fd3baf2b0262ba5: [[image_9121.png]]

3a68e8982ddbcac3bf6937fa7f91b70fe30a1dbe: [[image_9122.png]]

bafba5ab17671bc58f6941f9b498a1a5351a462f: [[image_9123.png]]

7b22815b4e351ad1692139b893a925d0d56515f1: [[image_9124.png]]

9d2c8ac99549227e49c4cb78b93444ed44e509eb: [[image_9158.png]]

6d7e88d385fb8141d9c4ea19418e44652e325802: [[image_9159.png]]

2c73a1e1f8b4c3926a067a3c8c1332314d72e075: [[image_9160.png]]

5c7432db2737cf7e4f8314e3bed7272d508a49ea: [[image_9161.png]]

3bcb09ef68bf271540d232153d11539d61ce0e9e: [[image_9162.png]]

005397b039a299f948416229e0c6f1aa08fa2a86: [[image_9193.png]]

04e252974aadc75a513ba6c0a7d54131bc082aa7: [[image_9194.png]]

cdd528cadefe35e2fcb5fef7189cc272068fc713: [[image_9195.png]]

db1a7685815db5b070b691f214f922c836f58af9: [[image_9196.png]]

29591d9d12aad440b273c38b83b5fa5c6a86a09a: [[image_9197.png]]

aaa294e396292ece11a12f7648bbc17e0c59fa4b: [[image_9198.png]]

0c23aaaa8469478d6174b389f5c552a430e2b309: [[image_9199.png]]

b2d87df8bec8c84334a537400458814c19c88634: [[image_9200.png]]

732d99ce76cc6c74cdada0cb449fb99930dd6fef: [[image_9201.png]]

a5de109283395b97656b15b380ede1737af99a8f: [[image_9202.png]]

e36a1080599867434e165a4c41266071500de053: [[image_9203.png]]

3e4254d81cf5da3e68cbd2680c0de622bd0717fe: [[image_9125.png]]

2fbf5f4a213388e5186a509cca4d02ec5df03f37: [[image_9126.png]]

28193b168416e6e12bd63e0f4b3932c4d011495a: [[image_9127.png]]

661e1574e0d36b3b316fe91160deace90829f350: [[image_9128.png]]

7a24558b071d46a1086b9e7f7c11a93c0b96cf7f: [[image_9129.png]]

49e0cc15ef90265ed75a3ce31f85dea5eafe5c23: [[image_9130.png]]

19644c36daefba2f85cf72ec456c1c43db8b0470: [[image_9131.png]]

d209d928ae795faa64431d66ca26ac2236f3d589: [[image_9132.png]]

d9a263c3c4b92195d523da9926a300a7d0c483cb: [[image_9133.png]]

7a89f8c8da8be47690b372404784f01d70c07be8: [[image_9134.png]]

b8b1cf2e5743deb9e0ed068729ac6198a03c21e0: [[image_9135.png]]

24af66f2c628b4488fe8a1f6b1dfacd27b6efd98: [[Pasted Image 20260217043305_009.png]]

e82dd2c54f905d847b2f28bd8d7d27832763f036: [[Pasted Image 20260217043326_774.png]]

d941efedbf753a879498c0661212f0bc6519b051: [[Pasted Image 20260217042951_822.png]]

1cc804b3f7b2904bde22f7ea845efb5929eb3ff4: [[Pasted Image 20260217042954_662.png]]

39d0e8629a6f17c77ca4b1f9b1d43a1c85204110: [[Pasted Image 20260305224929_248.png]]

e725d0e5ac262b07148368c78fb569bcfb7fd4cb: [[Pasted Image 20260305224931_520.png]]

0398a9108079234d2a4c6d00d630856646f6b8d8: [[Pasted Image 20260305224934_449.png]]

defbd72d13a2d7f2e342ab09a344be4cea4a55ba: [[Pasted Image 20260305225155_457.png]]

95f870b8a2ade8bdfd2620c567312ab9c30d3364: [[Pasted Image 20260305225158_726.png]]

e432736380db6abd33e273bf5030696893c6bb11: [[Pasted Image 20260305225318_233.png]]

9e40cc45b2be6a8bb3146a95a628330ebfebdc86: [[Pasted Image 20260305225320_508.png]]

0b93e82aeb58fd4315a0b2fa5e9727a55aabf830: [[Pasted Image 20260305225323_933.png]]

4788bb24a65677a4d4e052eaa3d1764df2e80bac: [[Pasted Image 20260305225330_056.png]]

9d9b4178776ece5f3e087694565667dbed32e8f8: [[Pasted Image 20260305225755_755.png]]

0634b9e19dc0c6c065788cfb888e905722b3f038: [[Pasted Image 20260305225757_940.png]]

aa3498a3d41f9d8e0cc5880543edb564b49ae714: [[Pasted Image 20260305225801_979.png]]

38ffe06974fd7f9f26f61ff554ef0c606817fb77: [[Pasted Image 20260305225805_194.png]]

771e64c31a91bb9821301f659508df4710f9866d: [[Pasted Image 20260305225808_624.png]]

244121cf6372ea64df26da74a6a65038974f2b13: [[Pasted Image 20260305225812_735.png]]

d9b163de3d0769e4201fa0dc85a57fbf5fc6b12e: [[Pasted Image 20260305225816_876.png]]

1c9260cc02bd5f519335ca0e844e1648f26c206b: [[Pasted Image 20260305225824_066.png]]

18fb7159651a81fa8c6035a57615fc7b724ac8ae: [[Pasted Image 20260305225830_042.png]]

efd711203223f9b2df5ee8c83a128527255018fb: [[Pasted Image 20260305225834_238.png]]

6249abba08552f0527b863c3819dcf0610065231: [[Pasted Image 20260305230405_712.png]]

0f65c5298035c485ab5bf709800dd58581f68ccb: [[Pasted Image 20260305230409_024.png]]

bda5986d0fd421747c9bff04e1bc29788a8988c1: [[Pasted Image 20260305230719_643.png]]

cbd8ba63aaa26e8e95d8f47e9d4c7194db9e30bb: [[Pasted Image 20260305230722_049.png]]

b7365210643f55d913f39382256a42fc73cf0eeb: [[Pasted Image 20260305230725_205.png]]

53873cac3cca854282d396b87198c4cc4f5bbb3f: [[Pasted Image 20260305230731_914.png]]

1a75dc540092552f544cc336f2dbdce8167a1bee: [[Pasted Image 20260305230736_512.png]]

e3cd34b0b5907f190e2df5f533b3bf4b49fc4089: [[Pasted Image 20260306003128_379.png]]

33eac658e7a48813a4349d5cfb6fc70cdc7ab410: [[Pasted Image 20260306003130_405.png]]

3cb5c10c5f6a5033311abde66dab21341d8083a3: [[Pasted Image 20260306003134_167.png]]

41a9ad79f89901c0c30d3020079cdb66c84cc1e0: [[Pasted Image 20260306003137_477.png]]

5252cdeb09cd1925b5aa2006acb9d12a601ad846: [[Pasted Image 20260306003141_528.png]]

c6dd57137f1f4a47964c67c000adab1fe1eacd6f: [[Pasted Image 20260306003145_394.png]]

48d79ef6508ce92b73ebc810e92c4985a84ec5c4: [[Pasted Image 20260306003150_473.png]]

4b1f2a96925f85a890c9cf3cd55502c1df3e9637: [[Pasted Image 20260306003206_748.png]]

291e54689d0dd7a06d2ac1c6d9254189413d7880: [[Pasted Image 20260306003333_175.png]]

8bbad5308d47ebb14e271c1f9c5087bf3dd192c1: [[Pasted Image 20260306003335_273.png]]

750b88ae42fd5e59e9b8af1f2874eb46d8423ee0: [[Pasted Image 20260306003338_191.png]]

23a3435ea4b6155128d8b8132499090e6e5e463d: [[Pasted Image 20260306003341_443.png]]

cf1f56cc8fb3e6a87d390af2e8016df34b466ab5: [[Pasted Image 20260306010606_300.png]]

dc3165d865e059d57a517e58dcec5d78e44d958f: [[Pasted Image 20260306010608_880.png]]

6e894d1f81f88ba3119601535e14edc7d41dafed: [[Pasted Image 20260306214052_509.png]]

0f7884b709098492f5de8b0de753ce3bf8cbb82e: [[Pasted Image 20260306214055_068.png]]

67d8bef193bb3fa477217bc8d6f8304f5ed3ac85: [[Pasted Image 20260306214112_063.png]]

2476abba71ad91dd7d7dd6d1178fc4f93bb0f99e: [[Pasted Image 20260306214114_637.png]]

1baacc63931d1fddbe42b809bb859fe127957b4c: [[Pasted Image 20260306214118_144.png]]

454e14f8a45c305615891d15ea09755c530e0e9e: [[Pasted Image 20260306214602_815.png]]

b3077b81f177e8a6788154a0602937ffa09d696c: [[Pasted Image 20260306214914_940.png]]

1d9c78a992f1e921e892593b4d4c4d8a4365112c: [[Pasted Image 20260306214916_925.png]]

97b077bd1f89f8567cea95b677d587ce3905fc46: [[Pasted Image 20260306214919_954.png]]

f932b0a7ba612b6354fa200923b335955c525917: [[Pasted Image 20260306214926_932.png]]

41db8958859756dd0f407eff26f0e63a3515c833: [[Pasted Image 20260307215329_475.png]]

ce26e77c4fb9a43b71fecf3c556559067256dcd7: [[Pasted Image 20260307215332_017.png]]

70f17387057a00a3c6ce7babd70310a6cb0fa984: [[Pasted Image 20260307215336_504.png]]

302cd4072366323d80040d134ffd1c9b84a1be35: [[Pasted Image 20260307215339_927.png]]

2ce773c91343926c0d7e7977119d46c8ba845717: [[Pasted Image 20260307215344_930.png]]

0ea40d1fbaa727673ec65a2a4c7e6bd67ed97dcf: [[Pasted Image 20260401142855_759.png]]

8776dd099ab20a801abfe79aa6a676cf40ad7cff: [[Pasted Image 20260409040046_611.png]]

a51d520ebd1fcdef64f019057da319c3510d6405: [[Pasted Image 20260409040050_294.png]]

780d014f11fba3b7b8823ccf4c745f864fa46a96: [[Pasted Image 20260409034756_743.png]]

3a8afcfb89c050bbbd6f939ce53dcc1c00088563: [[Pasted Image 20260409034802_248.png]]

5dcd0f4024f162cf15df3e729dd309118246a63f: [[Pasted Image 20260409034805_760.png]]

eaee9e7642e0d57aef5c8437a7aff045dacaa0d0: [[Pasted Image 20260409034809_222.png]]

311fe02859c63d9a9786032def8bdb45b4f2868e: [[Pasted Image 20260409034818_358.png]]

36da6d9b48fdeea7d66c60904a8a3d87097fbf5f: [[Pasted Image 20260409035824_468.png]]

925d55f5604fec0b9281ca84df038958dd122fcb: [[Pasted Image 20260409025039_512.png]]

6efe57001d7113d984c38cb9e7fc5d6aba9a9c12: [[Pasted Image 20260409025047_671.png]]

ff821c3f6c42e8ec59f8a289684fa14917b4f44d: [[Pasted Image 20260409025050_711.png]]

b817164278283e5f4e5d2da45f87b857f7e071f8: [[Pasted Image 20260409025054_298.png]]

37515c6fd28b71a6cbf5b4360138f478385ac7b8: [[Pasted Image 20260409025057_481.png]]

%%
## Drawing
```compressed-json
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

mXYGAAExXEgQAA==
```
%%