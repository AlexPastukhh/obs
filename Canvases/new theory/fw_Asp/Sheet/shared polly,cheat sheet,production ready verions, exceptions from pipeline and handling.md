---

excalidraw-plugin: parsed
tags: [excalidraw]

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
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

C4gUOQwwFUESogvAm9AYAAXmiEgIAA==
```
%%