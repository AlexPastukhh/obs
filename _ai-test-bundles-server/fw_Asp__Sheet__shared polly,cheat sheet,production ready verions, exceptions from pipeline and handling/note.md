---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
how to handle? ^WdDExDVJ

using Polly;
using Polly.Timeout;
using Polly.Bulkhead;
using Polly.CircuitBreaker;
using Polly.Retry;
using Polly.Wrap;
using Polly.Extensions.Http;
using System.Net;

public static class PollyPolicies
{
    public static IAsyncPolicy<HttpResponseMessage> CreateHttpPolicy()
    {
        // 1) Per-try timeout
        var timeout = Policy.TimeoutAsync<HttpResponseMessage>(
            TimeSpan.FromSeconds(10),
            TimeoutStrategy.Pessimistic);

        // 2) Retry with exponential backoff + jitter
        var jitterer = new Random();

        var retry = HttpPolicyExtensions
            .HandleTransientHttpError() // HttpRequestException, 5xx, 408
            .Or<TimeoutRejectedException>()
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: attempt =>
                {
                    // exponential backoff: 200ms, 400ms, 800ms + jitter(0-100ms)
                    var backoff = TimeSpan.FromMilliseconds(200 * Math.Pow(2, attempt - 1));
                    var jitter = TimeSpan.FromMilliseconds(jitterer.Next(0, 100));
                    return backoff + jitter;
                },
                onRetry: (outcome, delay, attempt, ctx) =>
                {
                    // outcome.Exception OR outcome.Result
                    // log attempt + delay + reason
                });

        // 3) Circuit breaker (on transient errors)
        var breaker = HttpPolicyExtensions
            .HandleTransientHttpError()
            .Or<TimeoutRejectedException>()
            .CircuitBreakerAsync(
                exceptionsAllowedBeforeBreaking: 5,
                durationOfBreak: TimeSpan.FromSeconds(30),
                onBreak: (outcome, breakDelay) =>
                {
                    // log breaker open
                },
                onReset: () =>
                {
                    // log breaker reset
                },
                onHalfOpen: () =>
                {
                    // log half-open trial
                });

        // 4) Bulkhead (concurrency limiter)
        var bulkhead = Policy.BulkheadAsync<HttpResponseMessage>(
            maxParallelization: 50,
            maxQueuingActions: 100,
            onBulkheadRejectedAsync: ctx =>
            {
                // log bulkhead rejection (overload)
                return Task.CompletedTask;
            });

        // Wrap: outer → inner
        return Policy.WrapAsync(bulkhead, breaker, retry, timeout);
    }
} ^dw7r7J9a

Exception handling
                  ^nyYjJbSs

theory ^uOdLtRvG

mapping ^LlhpsLgs

try
{
    var resp = await client.GetAsync(url, cancellationToken);

    if (resp.StatusCode == HttpStatusCode.NotFound)
        return /* handle 404 */;

    if ((int)resp.StatusCode >= 500)
        return /* treat as dependency error */;

    resp.EnsureSuccessStatusCode();
    return /* success */;
}
catch (BulkheadRejectedException)
{
    // overloaded
    return /* 429 or 503 */;
}
catch (BrokenCircuitException)
{
    // dependency is down, fail fast
    return /* 503 */;
}
catch (TimeoutRejectedException)
{
    // dependency timed out
    return /* 504 */;
}
catch (HttpRequestException)
{
    // network/transport failure
    return /* 503 or dependency error */;
} ^nzG13rfL

in newer ^wrmX7mxv

exception bubbling ^N8KuCQ7o

!!!! ^Ihm4wZOK

from threading we return our limiter types  ^TJn4975w

for testing ^OCVjMhmA

custom ^nW25oay4

classic ^G5xhHoZ9

shared impl ^51eiHMsz

choosing pipelines based on something ^JQIAbxVm

exception bubling
outer starts call inner one, not throw to inner ^QXs4ZxCY

so cant tell inner starts to not handle ex from outer because ex
bubble fro miner to outer and outer just call inner ones ^gr5lMHVd

setting properties ^xWgbQfoR

hedging priciple of work ^FLog6dE2

args args in shouldhandle
why do we need to attach request to context ^0N1ga1zW

delay generator, way to fallback to defaults ^LN5dmKDP

rate limiter in polly 
concur vs addratelimiter 
and ratelimiterstrat options ^RVaOJV6m

conditional rate limiting  ^5a8VjxFj

making request with pipeline.execute ^iQ2cjmZ8

the pipeline, not handler, you cant use handler for manual execution ^Jas4MVVZ

ratelimiterstrategy args ^Il2UYE6v

so to have delegating handler that gets pipeline with pipelineprovider
based on request properties

or 

creating a wrapper that runs pipeline.execute and passes context 

look like the cleanest options


for simple scenarios its better to create wrapper with manual pipeline
and delegatinghandler if there is some complex conditional shit ^Kyw0ZfLj

need to execute pipeline manually 
OR
pass to request options and get pipeline from provider
and execute it manually 
IN BOTH we pass context  ^3yB6w3A8

if want to pass 
someting into context 
 ^Sg026Wmn

manual executiong 
custom pipeline
+
provider ^BgxZxq5n

passing context to
classic polly

+
getting pipeline from registry ^sug1dVCw

nesting ^G1tNct4s

need to think about nesting in polly like that 

whe nsomeything has multiple retries or hedge attempts
and we put something inside - we wrap each retry with one bulhead 
and all retries affect bulkhead ^q0gBS8EW

so we need ratelimitpartition when 
1 we need specific ratelimiter and we need to pass
key (ratelimiter middleware case)
2 we need to create ratelimiter with callback that has httpcontext
as arg
 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER ^nG6CR4Hs

ratelimiterpartition and partitioned rate limiter 
3 scenarios ^YzQr04cS

cheat sheet ^kOynLKA0

classic polly httppolicyextensions
1what counts as  transient http failure 
2 transient status codes (when have your own exception handling)
3 attach around httpclient with confiigured trans errors handling
4 registry ^RF0pGp3R

!!! ^n1jirl7u

!!! ^guirJz2n

!!! ^gVtLpNdo

examples ^iGm57kAv

extensions ^JyismoDG

new standart vs custom ^fq7S7ilD

SETTING TRUE/FALSE 
BASED ON REQUEST METHOD ^wQq05fMT

need to use pipeline excplicitly with pipeline provider ^xnKghEL6

classic polly transient failures 
new polly 

vs httprequest exception ^goA023PE

manually  ^xJJ4boaU

with extension ^UCaN6fD1

using strategyopiton need to acquire ^zyWJXBGk

!!! ^5h2JgfS1

## Embedded Files
b81bec343811e1dfcdf09a3372aaccece50b734f: [[Pasted Image 20260311080418_355.png]]

b6dcef07354324abd1bd1e51d8e38490983fd278: [[Pasted Image 20260311080429_224.png]]

26d2f62a544a66eed054054b49ae367b84cc7625: [[Pasted Image 20260311080434_841.png]]

764fb76254603b46a01f9f5e315628948b1773cc: [[Pasted Image 20260311080522_506.png]]

b5dc89056b95ce6c0740cc07453885d2f382226e: [[Pasted Image 20260311080527_672.png]]

f4fdb2ed48eaf511cc5881d60565c485cd18cb64: [[Pasted Image 20260311080533_947.png]]

4fda85091a25a871beb21ba1e315bde776148436: [[Pasted Image 20260311080549_283.png]]

bc0bef8a0c5b50c3fdd73e61aef7b48875803375: [[Pasted Image 20260311080558_523.png]]

291353b6eb29b5026a762437b763291d8d3e86a4: [[Pasted Image 20260311080601_702.png]]

893dc6acd1b3173f81e310f390afbf823983acb6: [[Pasted Image 20260311080615_900.png]]

afb5f438bc4ce2dc7a5cde4d72c43fa1e499b93d: [[Pasted Image 20260311080620_619.png]]

19b9f83a9f460cb8ce048b80abc75f01cdf11f3a: [[Pasted Image 20260311080624_688.png]]

63b5a940f463655470a96180e9fbf24d59126fcb: [[Pasted Image 20260311080629_177.png]]

38c57f14403d81c8df74b5797762997c3d32c66e: [[Pasted Image 20260311080636_000.png]]

4756a372c93a12465cd91382b32906f389cd790a: [[Pasted Image 20260311080649_410.png]]

154e41c1f001caa406a32d245b44bfb0e1776048: [[Pasted Image 20260311080655_548.png]]

a9fb8b8fe5f635cf05e8c402a1417267f82aa36d: [[Pasted Image 20260311080659_653.png]]

347d669f32e0206c5742e97c735685b7423a3e9b: [[Pasted Image 20260314035653_412.png]]

dcd85fd5489ba0471628f99a3801402febdf2c39: [[Pasted Image 20260314033615_552.png]]

784c5d39002f7a0e6325e2f364c8603d5635b03e: [[Pasted Image 20260314033624_365.png]]

b1c434af62a6bad24743951d6718af3a82292c51: [[Pasted Image 20260314033627_716.png]]

fdb5e44e624513deb68f58f09339c6ec7e4bd1f1: [[Pasted Image 20260314033630_093.png]]

4b4ce425a390450a40268cbeff676587b8bdf04f: [[Pasted Image 20260314033633_411.png]]

03752417080e93752766b0421bbc3e43100389d1: [[Pasted Image 20260314033638_221.png]]

b9b85c83e8c28cda0460169e0b5c5a75d026853e: [[Pasted Image 20260314033944_527.png]]

471abbd4f562ff5e16523db748c5de22eaa68a02: [[Pasted Image 20260314033951_154.png]]

94f45be6d3aa00450817df3d22818443cc8dfb8b: [[Pasted Image 20260314033954_774.png]]

946be8013bde933ab490d95f234fcc89a2491423: [[Pasted Image 20260314033958_131.png]]

f16a32b44a32a3b135f5b0e9d13e71bd05815744: [[Pasted Image 20260314034003_823.png]]

d067829fd3ada8f827da5ba3ef62d8dc77941baa: [[Pasted Image 20260314034028_026.png]]

46837f4d4dcbf7d8349e7603641057059dbacf97: [[Pasted Image 20260314034030_183.png]]

043ea65a3f35712036dd2ff0eb74135bf1f29f18: [[Pasted Image 20260314034511_633.png]]

abfe206648e81ddd1c2084fd78a82ca982449e36: [[Pasted Image 20260314034710_980.png]]

0536a69afbf45aefd6847906e21d3a648488126c: [[Pasted Image 20260314034715_868.png]]

88a43a5e7550239cf6bbbe9ef298c9fd45641224: [[Pasted Image 20260314034738_506.png]]

020cb4e5d1fb3fa8e7f1e9761b38c6b79239d200: [[Pasted Image 20260314034836_213.png]]

a9f9394a5cc825915115630476a8cbf1e3e4277a: [[Pasted Image 20260314034840_248.png]]

c6022c85f6b8e1a60a03c3761bcf8484b23cd968: [[Pasted Image 20260314034844_484.png]]

4de8acb1fd4d68ec35dd06cffa2556276a49c57e: [[Pasted Image 20260314034851_467.png]]

a35edc76b13c378ec523204682ca0c77f448fc81: [[Pasted Image 20260314034856_744.png]]

3bd3aa517fdcfcd0fa35baf3bf3a586f71e852d6: [[Pasted Image 20260314034902_847.png]]

260ed0a5d463fb148319a0212a5bc49eaccdea1f: [[Pasted Image 20260314034908_650.png]]

d52b2f01d700afdf2af2ba5a796ab07dd181715c: [[Pasted Image 20260314035645_274.png]]

400b773a1d2c1197d16632cd5f86e5a00bf589ca: [[Pasted Image 20260314035649_951.png]]

714b86f673eb4c1721816abecb7067593f4fd730: [[Pasted Image 20260314035750_208.png]]

9a8b3e8e187d339fcbb884409590b46654bc4559: [[Pasted Image 20260311223018_258.png]]

25e6ed724ec2fa6f29da33df3daafa55ed5279af: [[Pasted Image 20260311223021_589.png]]

5a9b22f06848892d9c8b4af4a30ec342ccd227e0: [[Pasted Image 20260311223024_289.png]]

84367ac66e19286d796ead89d085991f277d45d9: [[Pasted Image 20260311223027_145.png]]

82fc2acfb5e903968e76c8bbb567a98c43fb3a52: [[Pasted Image 20260311223030_085.png]]

01c81512dbf129eb27a8378598bd6e72d2b7d008: [[Pasted Image 20260311223033_515.png]]

c037ae667f10e67013bd0b6562d3093eefe82152: [[Pasted Image 20260311223644_012.png]]

1b0e5519bf209cbff528dc00373265472f001009: [[Pasted Image 20260311223646_352.png]]

e272c21bda0fd9ad67f5764fff1a794f8f85f41d: [[Pasted Image 20260311223649_084.png]]

ec40b7bc057138947d03b694a5139b2d9e1110f2: [[Pasted Image 20260311223651_953.png]]

fb3dd4c559eae33b507c8c0417c12dff2c0a1419: [[Pasted Image 20260311223656_051.png]]

556599c61f56b63b64489da4530afe4baece8da6: [[Pasted Image 20260311223659_321.png]]

a03ec19432cc7a942b09e364748e264d49f37848: [[Pasted Image 20260311223703_182.png]]

7f89e929006445ca9e3ccdd49f64c8a2acd39ed6: [[Pasted Image 20260311223707_666.png]]

4cbe1f24003521cbc9bc805660c04c21db42b568: [[Pasted Image 20260311223713_151.png]]

3f0264fc4231c9877772f109f5a2fdec95dc6095: [[Pasted Image 20260311223719_215.png]]

b11e09846e3d48a42693c0c57e6c2bcdf4e59f1b: [[Pasted Image 20260311223725_378.png]]

ce589e156488a587cb43f790fe2e45d3190307fc: [[Pasted Image 20260311223733_866.png]]

a494e5fbbc243a58d7b5b40f7d4d109443473b4f: [[Pasted Image 20260311225426_280.png]]

08f7d43a8479e26a84093a80242cdf5539417ca9: [[Pasted Image 20260311225444_941.png]]

777d5a578d044b55d3b4bd1a85faa4f987af18e6: [[Pasted Image 20260311225451_960.png]]

b7c836d98cd7a391d5a6be5a64f6f45435cebc07: [[Pasted Image 20260311225500_945.png]]

c1f70b7d39670aecff1d11f2778a483d669ba190: [[Pasted Image 20260311225429_721.png]]

39976fc21afb0031cab4c5c1b79bf2649e3e22f8: [[Pasted Image 20260311225432_441.png]]

070fb786e07c9b6d04a4c8ec9efb574515bebcc0: [[Pasted Image 20260311225435_541.png]]

b899ea628b326222dc4870e9b886bd9743c0b23e: [[Pasted Image 20260311225439_641.png]]

8b2be0bfe0b7a8dbd8b51619e38ca0301bd7d109: [[Pasted Image 20260311225944_162.png]]

d6527f34a180eebebba79150c123ff579aff4a56: [[Pasted Image 20260311225948_131.png]]

efdc6fb2570a810ea9464d90a6ec9d735042fabb: [[Pasted Image 20260311230028_540.png]]

29c65452ded9daacd03bf78b0013281797e00b7a: [[Pasted Image 20260311230206_583.png]]

ebe43de39b67aca37879fd3b5122dad889697bb9: [[Pasted Image 20260311230209_090.png]]

19f68a61d8eeae1834fe8da67c4883079b895f9f: [[Pasted Image 20260311230212_396.png]]

4f604be090c86ab1a33818fe0ccfde40acd3f871: [[Pasted Image 20260311230219_111.png]]

6b18c2f35ff9271d956cd8e71d6825db57e02f1a: [[Pasted Image 20260311230236_144.png]]

3c9fb19b6a4be85263f2640df43e469a7e81ac7f: [[Pasted Image 20260314223510_069.png]]

8660f1d7423181f7d4c84ace43a2e604e322a56b: [[Pasted Image 20260314223513_912.png]]

677d2ecb935bebf997b373bc13b37877e9c274bf: [[Pasted Image 20260314223515_848.png]]

cb2e22c967934ef82572792a81a553580053e031: [[Pasted Image 20260314223518_501.png]]

329903ab42a44bf155177aecb5ac04cab7629614: [[Pasted Image 20260314223521_619.png]]

353e736c4634895c2c51994bdc20b0f645022709: [[Pasted Image 20260314223525_236.png]]

1448630305d7e0aee37a9db65c780f00b08264d7: [[Pasted Image 20260314223529_135.png]]

f77ba847a110475a96f51ac7011f07c550112980: [[Pasted Image 20260314223533_660.png]]

70375a0351d39d404f3f91e11fe57778e12a5442: [[Pasted Image 20260314223538_694.png]]

38c992b66d6972ed154fa87006e4c8c6405a8793: [[Pasted Image 20260304005010_917.png]]

f1f655e19dbc186c93fa5b1df2a6df038a6e7ce2: [[Pasted Image 20260304005002_627.png]]

8a9c294898579010ddd593639c16068ca5b5e8d0: [[Pasted Image 20260304005005_735.png]]

c6ca94f06902f447bca5422ac405d36411a82909: [[Pasted Image 20260306024857_034.png]]

9b8ae90c4dd5e0d4d636dd7f354716151890b75e: [[Pasted Image 20260306024828_092.png]]

d16b8dae56621575292b11f8216eb9e11e8af636: [[Pasted Image 20260306024821_162.png]]

07eccec90be01215c42a8acf7bc53fc3053ae7d9: [[Pasted Image 20260323003012_054.png]]

ede52ba6fadbd3a27004618690b347898464caeb: [[Pasted Image 20260323003016_300.png]]

c6c78918dc0d89a9246c62082ef6afc262a261cb: [[Pasted Image 20260301223920_958.png]]

b018717e5c74219bf0a49461acf0b556a3090568: [[Pasted Image 20260301223923_421.png]]

fc8053ad8a0a3393fb121683d3800aeb090c0aec: [[Pasted Image 20260301223917_910.png]]

c7cf32651d8b6b54b5ec0733a321f6d84c6acdee: [[Pasted Image 20260307212719_317.png]]

7048156b70369900f0440fc238c52d5b9749b212: [[Pasted Image 20260309072340_341.png]]

12778194d0148a05a0522a78b79e119a6aa2fc4f: [[Pasted Image 20260309072352_266.png]]

6342b0e96a41ad3407df0dfa1836679299663ada: [[Pasted Image 20260309072354_597.png]]

cf4aba673cf0a55ba258f222e6814f20cf576262: [[Pasted Image 20260311073505_329.png]]

812d9d362b60476d590721fd1183fc483208da7f: [[Pasted Image 20260311073509_067.png]]

334c28aac95c478b463e8fcc0a12b07729d6c489: [[Pasted Image 20260311073514_350.png]]

8504d1915e9e66d65590c6c1302de0f65806b3d1: [[Pasted Image 20260311073746_554.png]]

7a1d15ca37999762bbb784c4ff3a6ac1bdbf493f: [[Pasted Image 20260311073750_776.png]]

39f128b4d582024a3016b13e994dfaeadc9fd7d3: [[Pasted Image 20260311073756_071.png]]

377ad8734cdd54b2abb51b6ca3bd740a575cf7cb: [[Pasted Image 20260311073802_261.png]]

344ef2b02073d8a7280d69b299ffd9bcf9b05942: [[Pasted Image 20260311073858_630.png]]

33f67f3df8aa16514803e811076b9baa839bf378: [[Pasted Image 20260301082237_566.png]]

267483ed5e094c1e65b9bc442e601de53d63cc55: [[Pasted Image 20260301082116_319.png]]

c3bbc91a69f581dee131e922ef56346bdedbebbd: [[Pasted Image 20260307212721_935.png]]

5277e820bd1f337951942a2e9c8eea54d1c0ba05: [[Pasted Image 20260307224545_531.png]]

20244719a107bfc882504be88d5315fd8118858f: [[Pasted Image 20260307224547_806.png]]

5369b3f787a31222045b611ccd8888037fbdf8ac: [[Pasted Image 20260307224647_424.png]]

60fce52ec2524d696f402e343a1011b288d24829: [[Pasted Image 20260307224649_953.png]]

7d6a8e83129f24d15b517f9b82f711b48424912f: [[Pasted Image 20260307224654_553.png]]

2d36297f56a7725c9346a2c5626fbb24a493cce7: [[Pasted Image 20260302002319_895.png]]

af54ccdfe57f9790f4306110bd0012fb68d6f415: [[Pasted Image 20260302002322_808.png]]

f0f0808ea8de7f77884ef79b57e84495c038a396: [[Pasted Image 20260302002327_580.png]]

db8e76c35ce7b250e8475e9f14bda8182b728731: [[Pasted Image 20260302003624_301.png]]

5bd0dfe740d9e5feba622d5306af33a5fcf5897e: [[Pasted Image 20260302003626_953.png]]

2f10c18e17a46464a15b41f73806755531e6098c: [[Pasted Image 20260326001122_869.png]]

c6da91c1d03e16fafe36a1982f9587a2e09f1bae: [[Pasted Image 20260326001136_009.png]]

42f54ebe499ba9c6d8460172bae55a24a199bf53: [[Pasted Image 20260326001143_755.png]]

4d72e66e1021b21408d22748aeed30650ace2a02: [[Pasted Image 20260326060322_704.png]]

4aec986325d795ec8b02245ee73f46a7ab79c097: [[Pasted Image 20260326060326_818.png]]

892310b6503815f8e458d1684f3062453169dd73: [[Pasted Image 20260326060330_271.png]]

e23ed23608a2c777c5a2b8ee45c085b0e1e671fe: [[Pasted Image 20260326060333_174.png]]

24e2f359319275393a68bf3f786f173c9571b874: [[Pasted Image 20260326060337_063.png]]

6b594bdab108e255686d507d6d324fb28bfea8ff: [[Pasted Image 20260326060342_001.png]]

277ca6910b39b6fc3b34558ee1b096c78dee2733: [[Pasted Image 20260326050542_481.png]]

00817539fe2766c44bbb53d4785c04941c631f1e: [[Pasted Image 20260330222410_000.png]]

e7e0102b714ca669378805c950e2a69fa3b6897a: [[Pasted Image 20260330222413_037.png]]

f96bff56a0eddd088e860fb3279f1365a84dc906: [[Pasted Image 20260330222415_807.png]]

03e57d9c304dafb7e93f45c78676b6044bfaef14: [[Pasted Image 20260319235830_111.png]]

427b4f1eadc797d84e8110b3741dea6023492eef: [[Pasted Image 20260311035618_054.png]]

4a75181cc8050f2d16fc97d4c176394bbfa6f18c: [[Pasted Image 20260311035612_049.png]]

0e9d048ae7b08f8ba983c8516d9c18729fc70532: [[Pasted Image 20260311035608_177.png]]

4903cfaa87d34bda904529d7c84672858867cb02: [[Pasted Image 20260405183433_059.png]]

4cd9d99fde1e89b400f955aa7bd306bc48db8af5: [[Pasted Image 20260405183441_734.png]]

764dcc83ead29a5a391a1bb2581b2fa07c6c429b: [[Pasted Image 20260405183635_479.png]]

b49886f626564fbeba0c1e4208ca62ba2cd7f0a3: [[Pasted Image 20260405183638_842.png]]

7acb455cf8ab24faf4c1fe4b34c5a121e835a761: [[Pasted Image 20260405183642_245.png]]

99e5aa46a254118a6c0de3c1ee245735a26a9bd0: [[Pasted Image 20260405183645_007.png]]

ad86b967dacad6c32a9ddcccd7aa73f0f91759f4: [[Pasted Image 20260405183648_425.png]]

b2e1373c76d64823fc319c195ea53b64467c97ae: [[Pasted Image 20260405183651_590.png]]

fd03be67903697d5fff64e4bd472cb4dda691f41: [[Pasted Image 20260405183655_249.png]]

ec6965f4e3849af9049006efb02e28f224121c20: [[Pasted Image 20260405183700_054.png]]

a92f6fd8d2bfa5155f190384e56ef36c74e876ff: [[Pasted Image 20260405183705_015.png]]

219d2a4c021f324913d87ec3bf511fc8a4494345: [[Pasted Image 20260405183710_402.png]]

7ee20c322a37cd44d6071c3f629128fedbd9948f: [[Pasted Image 20260405183717_776.png]]

083fb22bcecea834bdab2db185252f5fc9c8161f: [[Pasted Image 20260405183723_698.png]]

346be9b86fdc8d71657fd920cc123af313aac6c4: [[Pasted Image 20260405183731_024.png]]

5b7c0cfb1edb64d0b0f18a3567d25f58c9b56ff9: [[Pasted Image 20260405183746_544.png]]

5105984e7b2247993d34c43f4f4deccf68078aa0: [[Pasted Image 20260405183804_232.png]]

f0f446defd29242c3903600bce7715cf6bbd093b: [[Pasted Image 20260405183810_736.png]]

d623048952455ac947e11a31d89966b31ca62e27: [[Pasted Image 20260301223346_564.png]]

7dabb30d0333193ed91ca0973334a1098e02d60c: [[Pasted Image 20260301223350_494.png]]

2bbd5cb57c633c4168f853c6f4da76d4824e00d7: [[Pasted Image 20260301223353_811.png]]

3d110ff6b303ccfcf13d888b0430b9c1f624b006: [[Pasted Image 20260301224129_015.png]]

a4db22a75f293b78b9c4e220bf8872038cab5422: [[Pasted Image 20260301224131_949.png]]

5f9e2fb3e272fb460c2d0dadb7a5ccaaf8bc5cf2: [[Pasted Image 20260301224140_896.png]]

704a3a0c7e5cdd5973cf8dc11ae51ccc6c8d3d21: [[Pasted Image 20260301224657_589.png]]

595961545c84abe8b6a8e265c2f67dabfd4f47d4: [[Pasted Image 20260301224700_687.png]]

0dc6095cb3050947299cb1319ee5594b08b8cf68: [[Pasted Image 20260302003721_305.png]]

e3c053fa6caf4546ea9feaba48e1aa5218c9d3da: [[Pasted Image 20260302003728_031.png]]

c51aae1bdba184093f8c6f56234b7d67d70ddcc5: [[Pasted Image 20260302003802_945.png]]

a9581bee9332293cde9484bdaa1d0f9b3f5c3f98: [[Pasted Image 20260302003805_030.png]]

9720169f201a49af245888fa932f1f06debd8619: [[Pasted Image 20260302005630_441.png]]

78311235f18aa2adca26a1655f99ced51c581650: [[Pasted Image 20260304003123_372.png]]

ff7f3e7177136da155cdee0abdb791031d80f863: [[Pasted Image 20260304003132_005.png]]

d86de76424dd4568eb4e9e19212ef005fba97912: [[Pasted Image 20260410195158_003.png]]

b408541b04996d372a408454af59dfb01f4c9000: [[Pasted Image 20260423055718_877.png]]

%%
## Drawing
```compressed-json
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=
```
%%