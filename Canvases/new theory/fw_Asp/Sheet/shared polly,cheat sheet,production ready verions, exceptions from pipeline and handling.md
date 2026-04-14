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

polly uses ratelimiterstategyoptions ^KMOZntkh

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
 3 we need to create chained rate limiter ^nG6CR4Hs

ratelimiterpartition 
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

%%
## Drawing
```compressed-json
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=
```
%%