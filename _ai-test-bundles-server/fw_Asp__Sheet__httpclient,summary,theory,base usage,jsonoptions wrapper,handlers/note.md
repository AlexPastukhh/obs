---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
default, but not all message hand;ers
are sending request though network ^4Ec8QuXQ

often there is a pipeline of handlers ^aRflZqvU

there can be a caching handler that instead of 
delegating to socket handler can return cached 
response ^jNjPcaRa

quick ^fEpGMulU

dispose requestmessage and especiallty response message ^eB5i5Tu1

ADD ACCEPT HEADERS 
TO WAIT FOR SOME
SPECIFIC TYPE ^WYJPaWeQ

CHECK RESPONSE CONTENT-TYPE
SO YOU CAN DESERIALISE
PROPERLY ^X1qc6qXO

by default preference =1  ^bJVKWK5L

in our case will return json even if xml is default for
api ^frCEe2qI

!!! ^zX8WIvsz

!! ^v03DAcu2

!! ^eVYNSeMt

!! ^2Iv1C96k

!! ^V026sMfY

when using httpclient defaultrequestheaders need to clear
because it is a shared option for all requests of that http client ^3nocvAlY

sometheory ^lHmie6bC

accept/contenttype headers, 
preference via q,
clearing defaultheaders/using httprequestmessage,
disposing messages ^2XeCinLz

Why not to use shortcuts all the time? ^9MjCieVa

you cant set specific acept header for specific request with shortcusts, if you have different request scenario
you cant use shortcuts ^rAV8t95C

using Microsoft.AspNetCore.JsonPatch;
using System.Text.Json; // Make sure to use System.Text.Json
// Depending on your project setup, you might need:
// using Microsoft.AspNetCore.JsonPatch.SystemTextJson; 

// Define a simple DTO (Data Transfer Object)
public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public AddressDto Address { get; set; }

    public class AddressDto
    {
        public string Street { get; set; }
        public string City { get; set; }
    }
}

// ... in your client-side code or business logic ...

// Create a new JsonPatchDocument for the Employee type
var patchDocument = new JsonPatchDocument<Employee>();

// Add operations to the patch document
// Replace the LastName property
patchDocument.Replace(e => e.LastName, "Smith"); 

// Add a new value to the address city
patchDocument.Replace(e => e.Address.City, "Seattle");

// You can add more operations as needed (Add, Remove, Move, etc.)
// patchDocument.Add(e => e.Address.ZipCode, "98101"); 

// Serialize the patch document to a JSON string using System.Text.Json
var jsonOptions = new JsonSerializerOptions
{
    // Configure any specific System.Text.Json options (e.g., camelCase, indentation)
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

// The serialization is handled internally by the package's integration
var patchJson = System.Text.Json.JsonSerializer.Serialize(patchDocument, jsonOptions);

// The resulting JSON string (patchJson) will look something like this:
// [{"op":"replace","path":"/lastName","value":"Smith"},{"op":"replace","path":"/address/city","value":"Seattle"}]
 ^IP5cnqYi

Need to use Json.Net for this  ^upPzKGS4

We need to return patch document of changes ^kLORO1yY

can do both typed and utyped version (untyped for dynamic sys when you dont have classes
typed helps with checks of or patch actions) ^03QwckZG

patch operations ^4mmUuz4d

creating request ^gg4Y18Ol

setting response content and content related header ^If22pC82

needed to check everything is good ^qKMhV6Jw

better to check if advanced deep dive array onega is supported by the api ^PenK6GCX

same api for text.json patchdocument ^YJMSmQjA

shortcut ^XGS9ymPC

!!!!!!! ^GQowXtVm

CREATE RESOURCE
UPDATE
DELETE 
PATCH
TEXT.JSON PATCH 
SHORTCUTS 
(NO STREAMING ) ^jFGizvlz


IF NEED TO SEND FILES OR MULTIPART DATA - CAN USE FILESTREAM(MB VIA FILE.OPENREAD)
OR MULTIPARTFORMCONTENT AND ADD MULTIIPLE CONTENT TYPES THERE, STRING/FILESTREAM ETC
 ^giy6qTXQ

NEED TO BUILD SOME CLEAR STEPS FOR USING HTTPCLIENT

LIKE 
PAYLOAD
if already has stream or small object 
+ need something with string -> create stringcontent with contenttype and charset and put 
to body
IF BIG OBJECT -> use jsoncontent.create and put to body
if also need compression -> CREATE MEMORY STREAM,serialize object to memory stream,
put stream to streamcontent
if file -> ^8QbYtpIO

IF WE WANT, WE CAN ADD READING ON HEADERS ARRIVE ^DntzPbYi

CAN READ AS STRING AND SERIALIZE ^VQFEJ8yS

CAN READ AS JSON

CAN READ AS STREAM WHEN READING ON HEADERS OR 
WHEN GETTING ACTUAL STREAM ^mGqeQyvj

when getting objects stream
need to read as stream too 
and await foreach deserializeasyncenumerable ^TuK8v53D

as administrator ^DOlb7KhB

after http client is disposed
the socket cant be available 
to do requests for 240 sec,just to 
receive packets  ^iQQqTefv

when you disposing socket with 
client, sockets just do nothing for 240 sec ^9Kmq4qTS

can lead to socket exsaustion ^yQNOBQPU

using one httpclient ^DMHzhxrW

one connection instead of 10 ^fJBzzCUk

we didnt disposed httpclient 
and its handler ^2CYIuUOE

When instantiates httpclient it takes handler(socket usually) from a pool ^yU2K23kA

And it manages the lifetime of handlers (2 mins) ^lnec0Mrh

For 2 mins, handlers can be reused  ^Hdb2LRFF

!1 ^Bzi0p7tl

need to understand with deep 
dive to web ^ir0Jmqzh

named clients ^oUTbM04f

using typed client and inject it instead of factory ^wWQjIkLh

need to clarify evr after computer network course ^CeJ5eLUc

configuring default json options with jsonoptions wrapper ^pO3gciVq

need a workaround ^uXc74DTr

injecting though constructor and using   ^9ATgYUMi

can potentially use different wrappers for different
putposes as different httpclients ^CZRN1Gcz


jsonoptionswrapper ^mYOwb66q

problems without httpclient factory ^cfncLonh

global httpclient config  ^TCmVwUsL

Can create chain of handlers ^hTFrRzdU

Can configure primary handler ^wNtgopsa

configuring redirection(need to return new configured handler) ^W6veBgeR

by default true, now RedirectToAction wont work ^v6wU2CSZ

can i configure primaryhandler for one specific httpclinet (not named) ^pqegMDsA

httpmessagehandlers ^RRfTzt9B

!!! ^csFXyVES

global timeout via client.timeout and 
percall timeout via cancel after ^8LI0hq47

Factory will automatocally creqate instance of httpclient ^zgtWAchr

Injecting via constructor ^jlZwfi7X

!!! ^XtHOv0W1

IJ youve configured custom handler in program cs, you must not override it in client class - this handler 
wont be teken from a pool anymore  ^jxEyLBPy

Adding jsonoptonswrapper ^GDEQsiCG

creating method of our typed client ^96hxCOIc

we will create specific methods to interact with api,
so make it private ^sSH8q6Ok

can lead to calling api via uri that no 
longer matches the correct server ^gYOLs1Nj

TYPED HTTPCLINET ^25nlxLCZ

TESTING ^GS2FG8da

newwer ^RYdYomWk

reusing connections ^uwSvLzJd

flow ^Upr5qE1g

basic theo ^CAKlqy5N

about dns ^ULVjDJB4

httpmessagehandler options 
one connection lifetime vs
handler lifetime

sinlgetoneclient withconfigured connection
lifetime
 ^aed5ioSM

why need rotate handlers  ^Kq4wAiCe

handler rotation vs connection rotation
why we even need handler (factory) ^lZcDFWF2

contenttype headers on
content type
not requestmessage ^q7Y78Jpv

need to dispose 
readasstreamasync too ^3V47OLc8

delegating handlers examples  ^Xp0m9F8O

corridhandler example ^XkTL44pO

accesstoken and logger ex ^zPEn54Kg

primary message handler ^jIQAyMro

primaryhandlers ^arbiJ3v2

do we need to create primary mes
handler al the time? ^1w54X6gg

## Embedded Files
9b584e464781085daf1d722aa67c0136da5575ec: [[Pasted Image 20260218021751_738.png]]

b65a03d1090f97c4e9d040ec92b4899731e02650: [[image_5241.png]]

aa57b2858b35d3782da67bb46a69b1c2781be822: [[image_5242.png]]

81fa18a583f9eae0f5b2ac12d9280b6ff03c1932: [[image_5244.png]]

505aaab8bb07a68ff43668d3e7a53c73d9228835: [[image_5246.png]]

b3acc09f167bc009bf1bb11728fc590d997a7062: [[Pasted Image 20260218024038_355.png]]

0c02f2b96676f85674dfa13ae95612c74097107e: [[Pasted Image 20260218024040_241.png]]

a829e5da834a6c87a6385608bd4615ca39bdb3a2: [[Pasted Image 20260218024042_990.png]]

96997841ddd2f688bcc4d4f1003e48745ee302af: [[Pasted Image 20260218024305_556.png]]

eb50adc7f23bf4aa0e3148c471d08495686e72e4: [[Pasted Image 20260218024315_035.png]]

c4bcad034ad852180b0442cafc3b3496a832cc32: [[Pasted Image 20260218030958_262.png]]

08d487651c514d6921844080649ef7ff82f0a0ec: [[Pasted Image 20260218025458_234.png]]

b1eb8ee2cad540a6dbad2c644a5ed003fdae420d: [[Pasted Image 20260218025502_585.png]]

718a612360c729b328a3fffe12accce42a53a528: [[Pasted Image 20260218025506_575.png]]

fb5f1de2bba83a7f29a8ac843f9a46911d28cef5: [[Pasted Image 20260218025509_890.png]]

51aa89fb6bb61cb56d3c12df8dff7d72359d3861: [[image_5263.png]]

ac018a01a6b0d3cb2f56234ff65150b8653196b7: [[Pasted Image 20260218025705_092.png]]

98a5e7211f0591bee76290a3d8791df9cdfd353f: [[Pasted Image 20260218025707_629.png]]

5c497328bb739497874f7083364640613599c80a: [[Pasted Image 20260218025709_879.png]]

71ce8934abced4eaa0347375238914ec0858f7c5: [[Pasted Image 20260218030621_064.png]]

4d11b0dc3b11f72d84f67abefb8eede0a7e0fabc: [[Pasted Image 20260218030645_770.png]]

d96263ebb225e884e85aab7c2c1043d0fa315b13: [[Pasted Image 20260218030652_648.png]]

12ea3c6755fac2439b9bd834b104bff651716972: [[image_5270.png]]

97784ae7c780e5aa17d728941f8fd0cccc949b51: [[image_5271.png]]

f484f5f9951ae216ec362a07bc5c01cd40909d99: [[image_5272.png]]

e77af20350aed435a8f6a375b50de79300bed68c: [[Pasted Image 20260218030827_299.png]]

e9a443a8600476e05928aebbd6a2afea14332b2a: [[Pasted Image 20260218030914_934.png]]

43622b63f98238e8a2d6a7d99563b9cd7ebc7b0c: [[Pasted Image 20260218031000_854.png]]

727a1fce3da740e4943c9bc92616280f85e4f69f: [[Pasted Image 20260218031121_113.png]]

873ff8027faf4467d41dc886e4f9b4c9e1cb5b2f: [[Pasted Image 20260218031237_895.png]]

49a249585eb4476dfbc2c7834d9bf57b4f71141f: [[Pasted Image 20260218031245_570.png]]

a38ac5b6aa776abd99ad719de035ac40b6e6a407: [[Pasted Image 20260218031331_776.png]]

de7e748290c869e554a2db45b03bf963183be0df: [[Pasted Image 20260218031401_538.png]]

6d4cbefff2844e0f7e0bbe3386836f80f3d9e66e: [[Pasted Image 20260218031426_812.png]]

595c530b7ef0cec73a64b2f3eb769ff5ca5fc6e7: [[image_5292.png]]

4790046314dd82da50c2f137580e6890ab3bd4e3: [[image_5296.png]]

3fb4712723bdb0ec753c3c3a0cc203974378b8f8: [[image_5286.png]]

51c71f9000635387260e1386fa3e7bdf95f14a67: [[Pasted Image 20260219041914_613.png]]

eae241cd1a17405b18bccc0b92dea893934d6113: [[Pasted Image 20260219041919_079.png]]

a9ad00af654d79e5d76f115eaa796c8a67261507: [[Pasted Image 20260219042318_845.png]]

90f64b764adff5f4afed388dc67b0726540c71ba: [[Pasted Image 20260219042327_707.png]]

759199bd5069e3864e23dc602910b1d62779a885: [[Pasted Image 20260219042337_724.png]]

c581be05ae81925d0bd97f1b02295bae59f2701e: [[image_5298.png]]

9523f5e209f16d33d0822633d73cdb2a10a8b8df: [[image_5299.png]]

d603550ef41b09c09cbcc1cb6314e1bf7c5dda8d: [[image_5300.png]]

26a5848998bea722afe0895c267afa3f9bead661: [[image_5301.png]]

1fd653dc23567e1becd8fb21ee7bb58909405ee1: [[image_5313.png]]

1f8b489c0332e1b913bada9da755fbe15aff8720: [[image_5314.png]]

9fb2a4e1c5e072e64156daf1f0951175e035dcb6: [[image_5315.png]]

7b80c37d4193fe13d2735d5bc61547286d476d0d: [[image_5316.png]]

e3063a210c8a02da942054b03119c9782ff85e1e: [[image_5317.png]]

03f9ccd757f28ae7c20bed5c61dbca29b2d2b9d0: [[image_5318.png]]

d86c57055a30bbfadc75e1762bf453ab6a5733d0: [[image_5319.png]]

d6338a4b81bab921a6cd2daf3091acf4826689e2: [[image_5320.png]]

5ddfc555b40fb8bede58732dea36a749395e67e3: [[image_5321.png]]

86e05d2e78bc47fbb4c57e24e136fc717ffeb7ba: [[image_5322.png]]

8daea22e1b54b09db8d2d66366a84a934f37e78f: [[image_5323.png]]

9976193b530bbf1e8f412ef6b08be31fa9415b4f: [[Pasted Image 20260219044146_183.png]]

e7694c37c464dd889c970b6ec3b5435d1aed29f3: [[Pasted Image 20260219044149_659.png]]

f2c7a70fa70d37ae507a6ede5059f0b5ea62b73d: [[Pasted Image 20260219045240_206.png]]

47d16f1da059b59219f8dd68bf37116335dd7797: [[Pasted Image 20260219045244_749.png]]

e3c87ff97f4866bd2fbcadfe37430ff85dc9709f: [[Pasted Image 20260220023234_541.png]]

78b1a7e45ef9238aab1428caf58ce71fc0a1e569: [[Pasted Image 20260222004207_848.png]]

ca3e87285a4267d76ed1b2c8b05d601a89b03b7d: [[Pasted Image 20260222004210_257.png]]

56bace4a629f5410ee1d86fe44bd1e3123afb0e4: [[Pasted Image 20260222004233_264.png]]

578166625d997654868c453a625f536c1258f1bc: [[Pasted Image 20260222004701_317.png]]

36a499917eb497a9ecc6b4a5427981f3edfab8ca: [[Pasted Image 20260221035949_887.png]]

7a7c07d105887b8d67c3dd980b1bd9ebd0f20d14: [[Pasted Image 20260221035952_768.png]]

fa46d6b89b1c22d852d896d24224444802d8ccc7: [[Pasted Image 20260221035956_738.png]]

662c286ca462ef134bd2bad280ee080552414ed2: [[Pasted Image 20260222004847_568.png]]

8534de729da9322adc678eb63013ab3daf27c6bd: [[Pasted Image 20260223233326_154.png]]

4d24af0060c8824e64cbb941b9ba9b01ec830991: [[Pasted Image 20260220025659_088.png]]

606f4408a0dc13b863690748093dc1c31c86f1b0: [[Pasted Image 20260220033057_292.png]]

02f4e557882216eaff1ab8fde45f602547221988: [[Pasted Image 20260220001334_528.png]]

f6b364a8de913b59814db189340f319d1acf0b70: [[Pasted Image 20260220001337_296.png]]

4de3ef0ba4e962b3410a5fdf32e4a765f8b21348: [[image_5325.png]]

6773f6cb70e7c99c68df464a74e5313e848a2fc6: [[image_5326.png]]

94da25652f9aa46c043ca9de0108b7346db7b0bc: [[image_5327.png]]

d9f6fc1700c75ebc14ed3794ca7c9c968ddc07ec: [[image_5328.png]]

202081ee543d4ed4cfb487bef361f18c14b794e5: [[image_5329.png]]

7761600d47407c2241e5723a74265cdf320ded74: [[image_5330.png]]

f7edffa71af5efb52a0f5eaf03818e899edb2af7: [[image_5331.png]]

65807b93578381b4b29962561244d91a6bd1e217: [[image_5332.png]]

333f5ff16e44f05ec689835fb9968f96ebb0eb31: [[image_5333.png]]

b25ab211ccd172c40d53eb5a6d62aa6fb6398b43: [[image_5334.png]]

b9a453d224acb778b9274f9e4db251155d6b836d: [[image_5335.png]]

23bf7b86462c9b0a4f5064c9a6ba430e13b3809a: [[image_5336.png]]

ce8b52861c986a3a9fa2a68a0947d39b2919aea0: [[image_5337.png]]

2777119b3b6da645ea8a3a1a60bdc1396eb5745c: [[image_5338.png]]

4b8d99cfb194095056a669293fab136930afd2f4: [[image_5339.png]]

1ba3a60bab9ac349d52a0881e7f5c2f442eca630: [[image_5340.png]]

51119ed496e28d0a0c9c0bce45254620ac4b7c18: [[Pasted Image 20260219234545_655.png]]

cb4e7c0b4bc8a48103c745d14aeed41f9277926e: [[Pasted Image 20260219234558_102.png]]

b64ece815e22d647a4d842b3d25ca5333cd1b874: [[Pasted Image 20260219234603_504.png]]

a797db587b3666c1c8f3d49c8c57552b54fa2440: [[Pasted Image 20260219234606_931.png]]

f935ba97efd93440506e352d4c4fe45f16b2701d: [[Pasted Image 20260219234715_303.png]]

1445cf4807833917bc61183822830588bae52f00: [[Pasted Image 20260219234722_232.png]]

9ed36b90e1797189bbc521e8e7881dd32e59353e: [[Pasted Image 20260219234724_550.png]]

16a761591055d9b47ffaf453a0bf0e9d9e6ece3d: [[Pasted Image 20260219034808_353.png]]

8dc7cd5bb8b04e94c0dc5040329dbf27ac2a398b: [[Pasted Image 20260219034812_593.png]]

5125d7d35c62a10e4c041432f703a68747679355: [[Pasted Image 20260219034816_186.png]]

9cb8f585c247e2cbc9caf723559759f2eac0b89c: [[image_5280.png]]

c18f77f29d94837da144ed74ff14c426dd26c307: [[image_5282.png]]

21589d7eb795b300fffc8e988bceceb3e3e8d6c1: [[image_5283.png]]

3626ffdf9f608c58dd6617e8c6dedda0a83a1c58: [[image_5284.png]]

5a0ef358237b7bd56a092d2482913d8b0bc1f538: [[image_5285.png]]

2d92d09ce18b010a83ed4984826357dd5fd67498: [[Pasted Image 20260219034959_420.png]]

018ea05bc78787b9f9d397f5d7f495bf4f110e3c: [[Pasted Image 20260219035146_536.png]]

c84560f23a284f6a9dcb9147922e639fe27b0e90: [[Pasted Image 20260219035152_315.png]]

82d381018e6cc9e1be67b5ef6a15223cd5fbfe23: [[image_5341.png]]

e021376e40bf8d87a1e60fce35449412592f4477: [[image_5349.png]]

a4da972f461727f9c052c17f1cf104849547a556: [[image_5350.png]]

2d196f25d1e15b1508f3f9396f8a4e80da9abc34: [[image_5351.png]]

7d1a2bdf34e4947c8571c6bdaebf75a5e1c3edf9: [[Pasted Image 20260220001316_819.png]]

7442b68c364fcc210c02b3db26ce182eadfa507c: [[Pasted Image 20260220001320_880.png]]

330cecd6e770520043f2cb0a3c9c06e5403ece6d: [[Pasted Image 20260220001324_239.png]]

d1633ed3ccc21c12cf84ee7f977fcaff169f4c25: [[Pasted Image 20260220001517_675.png]]

e3d628c777ea7e697ce1453b36ca247f90ba6a3a: [[Pasted Image 20260220002106_948.png]]

fa97ca0b8a719e508cdd2ce1c030c7db877d17a0: [[Pasted Image 20260220002109_488.png]]

fdc1aaf4c0cac842264c1459ee6d42633393d5b6: [[Pasted Image 20260221231500_323.png]]

c87665d51226fd5e8339cf1b9908ebc1be4fc111: [[Pasted Image 20260221231506_712.png]]

79b8794c5413014c49cab9a47952db2e42c5a012: [[Pasted Image 20260221231509_860.png]]

c84e1e316d3c2aadbff171769a595f23060bb2ef: [[Pasted Image 20260223041831_807.png]]

1cc06f04f64c8448d7490e5dbea21e14ddc8af87: [[Pasted Image 20260223041835_204.png]]

1f1cb142fff7cea2f93887a04b002ae1852b6fb1: [[Pasted Image 20260223041838_761.png]]

47e05703d8f43cf08a6d4ab3a67118ea5d653c19: [[Pasted Image 20260223042355_066.png]]

d08f769e530258691acd9d3d02df07e4f95f48aa: [[Pasted Image 20260223042359_761.png]]

4bcc03963562126d53e5a46d75d7d79a79c011c0: [[Pasted Image 20260223042407_554.png]]

0b92f44dd0a9faba96503f43151b26cba5503c91: [[Pasted Image 20260223042414_330.png]]

cbb466d33d16b071e3b1653461f64a0d10b49c4c: [[Pasted Image 20260223042429_240.png]]

cb3725a5be1cdbda4fcaa66d6b4d28da494972d2: [[Pasted Image 20260223042649_423.png]]

a4af98739872e8c5f9574f033ba5783f42607e39: [[Pasted Image 20260223042818_953.png]]

c7b72d71cdbd13765d47b47164f0afe278142e34: [[Pasted Image 20260223042822_374.png]]

71ab827415c95e73759763afe58ce237ef53a894: [[Pasted Image 20260223042825_399.png]]

d008a904bfd3e58525928eb8e3ad5a94cd54a87f: [[Pasted Image 20260223044857_262.png]]

1902720bb98aa7ea5e39aacc37ef2db5d7f66d01: [[Pasted Image 20260223044902_509.png]]

91714272a362b6b816ee9c7dc818dc16735ff4ca: [[Pasted Image 20260223044911_070.png]]

4bfacc9f3eff23e783ba9a041dcd3f441c9fb06f: [[Pasted Image 20260223044916_105.png]]

7bf23901234860d34aa1945a5aa6deb88a34003b: [[image_5352.png]]

63132f3c04be1f5e42b0b329f4bf0492733704a9: [[image_5353.png]]

a9defbc1433de8d407e68c5939a9a45da1ea8415: [[image_5355.png]]

aa442ba0a4c185ed1bbf0b0f77d03794afc4f1b3: [[image_5356.png]]

ae9801c095d969af3e7b4350d5bb86dca79375fe: [[image_5357.png]]

c6bc5c08c8a9729af64458850a4942276e8246b0: [[image_5358.png]]

2c15b6f8120525f553248547a1f871cee4d91796: [[image_5359.png]]

ab81d807e9ba7c291b9a497c879d5ec4193d66bf: [[image_5360.png]]

60bbfbc2b4fa39be2a4d92f340c0125e5166b554: [[image_5363.png]]

1c60178e34ed4b760c75b593e8f87d828eebf77b: [[image_5364.png]]

a84be9c6b4a29061b49f0f121a579ccdca62c425: [[image_5365.png]]

dec33ef3903d06b12a711afb8419d1fbfe88f298: [[image_5366.png]]

82a63c589a5b0757e2809426eacd385b7d4a90d6: [[image_5367.png]]

8f3371b5438c5b72e03bbef68dc76db921f319f5: [[Pasted Image 20260228035542_894.png]]

53815676e5cf5d454643124efa55784d3624fbd6: [[Pasted Image 20260228035545_827.png]]

a390fb1d24999c0ba21b1eb7152c49ae18eb7db1: [[Pasted Image 20260228035548_538.png]]

02556c5bf185e065ce4df990c11b4f608c40ec98: [[Pasted Image 20260228035914_888.png]]

899275bdc4e76efcac7a6e1934e286d96b593738: [[Pasted Image 20260228035917_775.png]]

e3fca9bd345205d2ff8a851f16ab24896190cb83: [[Pasted Image 20260228035923_579.png]]

cd7dd2ccaecbbf1428f70ae5f9d29c308338d5e7: [[Pasted Image 20260309061843_611.png]]

4fc0e865d4bbff85a5ad8dbab2a8e12abc77f9ef: [[Pasted Image 20260309061846_444.png]]

532c8597a5dfcb4e7bc3d44a319ec309a66da74d: [[Pasted Image 20260309061852_060.png]]

75ffd6bf0e9c9a85a8268f349399233caabaaeb8: [[Pasted Image 20260309061855_042.png]]

04a0f2df0d6bed75d7759877cad85c159c42d1a8: [[Pasted Image 20260309062419_991.png]]

1aaeb988798f52b6cca94c5c51377af29ec86f86: [[Pasted Image 20260309062422_966.png]]

5b816732dc46301c7aeb65b860d717966fe36e47: [[Pasted Image 20260309062428_731.png]]

b28d3b75d80d7f0d2e80614f8d1ce887835d9aa1: [[Pasted Image 20260309062446_356.png]]

91b51b9a604ea9a8780b28fa70030583c6d87ae8: [[Pasted Image 20260309062452_564.png]]

8e00d7575bb503569dbf6ac19054180f58ea7cb9: [[Pasted Image 20260309062457_052.png]]

6622bc99930d8a1ac4c99b5ae03a04c30b3f9b16: [[Pasted Image 20260309062501_989.png]]

531617b2579c1c09a7aabbe1580f8f6ac56a1c0e: [[Pasted Image 20260309062525_378.png]]

1231584a7e26cee528b793dd88a214b7cb6eddb9: [[Pasted Image 20260309062530_505.png]]

19bd88e8e520e36c338e8f2cc13c3649e25c6cc8: [[Pasted Image 20260309062537_470.png]]

e6551b014b1d9cc589d62c52bbdcc80eb215eea9: [[Pasted Image 20260309062543_485.png]]

73602c0b97ec9ca13392a7167e53cde84a48da31: [[Pasted Image 20260309062808_098.png]]

c7e249260ddcd4e1e6fd0e77171bad70543629a9: [[Pasted Image 20260309063216_476.png]]

abb69051cbef1c7f7fe559277c1f25537bb8e702: [[Pasted Image 20260309063223_724.png]]

050a2dfd84b8a28b97fcbd694d4d0017cbfc6605: [[Pasted Image 20260309063227_203.png]]

c4ed17e86e5b7e02958e840d9b14d831be44c0ff: [[Pasted Image 20260309063231_086.png]]

9bbb7d8413f7397e248e2587fc7633156bf1b45f: [[Pasted Image 20260309063235_349.png]]

db43ffc48d19949ec755f5cca218ec06ba14707e: [[Pasted Image 20260309063239_447.png]]

f6a3dd38700ab5686a5366fd4a592dba733e15b8: [[Pasted Image 20260309063244_132.png]]

fb0030f6ab504a9c450b4e74a441c1319dbe2723: [[Pasted Image 20260309063249_376.png]]

ca9face7c3bc386084c51d416f2d8a0c96b89d7b: [[Pasted Image 20260309063259_610.png]]

dea06952fb66d8a8af26e73a27bfe4f649177e06: [[Pasted Image 20260309063307_472.png]]

f84c1290e7ae62aef7f8e60658862a94b3a19380: [[Pasted Image 20260311210706_670.png]]

21b68f72fb14179bdd9410b6f306331c26034cda: [[Pasted Image 20260314042529_002.png]]

25618bf4aa3a3a6d19113d980b29fe52f088d49c: [[Pasted Image 20260314042534_951.png]]

47bb6ff5746fdef2c22e6d68e511f2136cd3be3b: [[Pasted Image 20260314042542_279.png]]

7e5b6b59a2452c7d58e940dd710e361b996a2140: [[Pasted Image 20260314042544_907.png]]

591837209da66515954ace4013620d197981f058: [[Pasted Image 20260314042548_468.png]]

e3ba0af38a34b6f036ac5de3c449ab4f0dbfee6a: [[Pasted Image 20260314042553_156.png]]

7e13203bfc335863acc05a14d8f260ef810b9552: [[Pasted Image 20260314042605_037.png]]

d8ab24206679fb4cb1e8e16bbf8cc23cb66a8932: [[Pasted Image 20260314042610_443.png]]

986022f8f148c9b7e5bc9a208581b38c52555984: [[Pasted Image 20260314042617_085.png]]

8d4ae426d13edaf94b2ffa699ffe2d8c7ababd25: [[Pasted Image 20260314042622_755.png]]

668c96240eda20cbb905d7fee0a9d7f76e986430: [[Pasted Image 20260314043831_614.png]]

c7b6eb61cdb7541c98428e148de11e735d865a01: [[Pasted Image 20260314043835_967.png]]

ed5e754a89d4ae8b692724f513f4473ca8ac2bb1: [[Pasted Image 20260314043838_683.png]]

a82c18c500b1bcf031b8ced6cd414e50cf651ee3: [[Pasted Image 20260314043841_621.png]]

073b2fededfebe2e8a2575fe19ee30d0e1addacb: [[Pasted Image 20260314043848_532.png]]

4926a30fc59bf2590dc2a89b35206b88f70f6ca5: [[Pasted Image 20260314043851_632.png]]

0d86925f7c0ad10ce8823e381857289dbb66998f: [[Pasted Image 20260314043855_482.png]]

7130d38605be379112cb89d8218e93473317f097: [[Pasted Image 20260314043859_696.png]]

dce15c90ebd17eeb5946b812216b0ea8a6d151a1: [[Pasted Image 20260314043904_128.png]]

453935282daf1aec2ba2c305c456783b6ecd92f1: [[Pasted Image 20260314043915_050.png]]

f35f0019e62ba750e3e9fc813576a18526c50290: [[Pasted Image 20260314043919_760.png]]

a822639cf795fa0faf6e3c7a7a6e712c3a6afccb: [[Pasted Image 20260314043923_240.png]]

5e71a5df90ccb79f80e5429d6c1ba4b02e097dc8: [[Pasted Image 20260314043927_000.png]]

ed89c93ba8700aeca6f6ed7ef8c3679d732cea97: [[Pasted Image 20260323020319_860.png]]

9514b257e0861bd595c402c0e3d696fb153161ac: [[Pasted Image 20260323020322_237.png]]

ca637dc68cc95c3d24c190dcb5816408b383d16c: [[Pasted Image 20260323020324_776.png]]

cb8eef0bde64d27503bd0ef0fa71e80969d00b52: [[Pasted Image 20260323020327_872.png]]

3ddf4b65e69abfc8c2dbd1c7cd72e78b63961f24: [[Pasted Image 20260323024254_119.png]]

c69c11db887d2a6d5fe1304d8e70994df5d4ee98: [[Pasted Image 20260323024258_603.png]]

63d85f0428e48273e90a60ca64473898e5f8a6c6: [[Pasted Image 20260323024301_490.png]]

599f7325eb48f53763ae8225419126d84885f8c7: [[Pasted Image 20260323024304_256.png]]

16f21e54883423ff3c3f6eb7719335f08ce02119: [[Pasted Image 20260323024423_623.png]]

c35fa352c0126d5603655f843f3a5180193a930e: [[Pasted Image 20260327055404_672.png]]

87ece5e4383255215193257d6b74eed2f6d18bcd: [[Pasted Image 20260327055408_656.png]]

ae3a5fed3dae9b554477682d3cb2be559bbf7d5a: [[Pasted Image 20260228032058_876.png]]

b700305d88c24bcf064d2ffc848f107128d10d28: [[Pasted Image 20260228032101_399.png]]

1a793f8bd348a6b0e36074d2a11bc495c0304e49: [[Pasted Image 20260228032104_195.png]]

48c4e1a19305fa288cd1a139489785491a5b2809: [[Pasted Image 20260228032107_366.png]]

7b1486ab316454deccb0a67c5b40e0afbbd7b016: [[Pasted Image 20260228032112_436.png]]

746186810248751df5a5f832ba1324f541354b10: [[Pasted Image 20260228032132_298.png]]

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebR4ABm0AZho6IIR9BA4oZm4AbXAwUDBSiBJuCAARAH1JZgBBAEUE0gBWAHkAFQAzAFEADQBpPoBhAC0OJsw00shYRErCfWik

fjKZtABGAA5d7QAWADYEgHYDgE4Enh2D09O29cgYbmc7i7i2ra22g4SL04JZI3R5FSAUEjqbinC5HJ5SBCEZTSbh3Hbw6zKYLcBLw5hQUhsADWCFGbHwbFIlQJ1mYcFwgRyszKmlw2CJykJQg4xDJFKpEhpHDpDOyUGZkB6hHw+AAyrBsRJBB4JRB8YSSQB1SGSbh8MFqgnEhDymCK9DKirwrnIjjhPLbeFsenYNQvbYJXEGznCOAASWIDtQ+QAu

vCeuQsgHuBwhDL4YQeVhKrgEqquTy7cwg7H4wawghiNwthdkkcLhc2kcjgd4YwWOwuNsDqC5gwmKxOAA5ThiVHV747Cv6tuEZhVDJQQvcHoEMLwzTCHl9YJZHJB0PwoRwYi4KdF7b3H4JLaXZKXVtlIgcIkxuP4eEU9nTtCz/Dz/NRKBCIMQRA8xNlFVKVgmjCQLk0NpbgQY40S2BIdjaXcei2YhTh4HhcFwI5TmwE8y13No2geBBsFVZh3HEYMw

TALYnlosEwwNbBCTgO88zbSRQi6LAoAAGUTW9XznBAigAX3WEoygqCQ+LaBIOC7LYAEdSEwAAleUiHwC5Rg6AAxIQjlVBYqPKFZlDWA1NlQLYYTabQLlPHgjjaWE0WBeF3VQZwjh2M4UgSI4eCg5JvkSWsDQhYgoQ9BIDniNoMJCociLsi54UkRFkXFNAywuQ42mSf4DgOHYeAOHgSwxDgsSor023VY0+UpalyGFelGXFBc2Q5DNeXJVrBXakUuu

A6U5QVMzLSLPEjS1HU9TmjUTSmyoZvTYRbXtYsnRdN1i09eEfW3AMNyYtsI1wKMD1QXMHwNRNiGTCRcC2TbuWILMc3vPEEBfVBqyuNyPgasp607JtbNOOiDQhxsew4Ps0CSi5Sp2U5bgTcdJwBt8PzbRdPpXTIxXOrcdz3AG7Jh+TT1LC9H0E9iHrbJ8SVu/GEDmvcf0qf9HFq8bQNuiBNFc1NkmIeCrh6AFsAOBALmIeKElIj5NDKitTjChBrlc

tM8UogoaNhuYGLmC6yi45geMwfjmeE99ueY1iWfEyTHtFzV1IjOAtkwU5CHoNoACs4FIBpQ+IUPQ/UgAFEz4DM5ZVlVGzdigxyHkQ9Cth4WEEK814jjCpIEL+KCthre4Mqixa0D8rZtB2YFXOrfyDi2ZJMuylE8vLQrirRsqKqquu20xc0wYEebSUGgV0CFUaxVVVl2ROnkWsX6ARs61fwwm01zTVckrU/FbtRi3U0BHMompJY/prP2aDRtSRvt2

g1nTZA64uOrk/pAwFCtpKSMCAwJ3V+o9JMNkIC4B4B9TMO00D3T+gDE4rcYRVThHDDsjZixQTrPg7svYqLfEqsRGsNZsYTmCPuGcIkFxLmICTNcuQQEU13Aww8tMTxnkZgaa8QkoEcSvGwZ8nMmGfl5r+AWgFhYQNFlhYimgQQ7E0MkJCyRMY8F3DhTQmsjjYQglsbAPBMZbE0AgcqiCjYECooUc2Zs5hbEYplbivEBI3kYc7eELFnTu1KBJIoUl

IAyXQM4KAyg/TqWIDAP0HR1KkAAJopIGMpeOuBZQAFlMBsXhKZJYFkrJtgzjsGshxAQ3BOMkHRFdi5oGcFBU4RxtAPDOKXCpp4yrwmirFQGvxtA027jwHRGEvi9yRP3VA+Uh4lVHpVaqBop71WWs1BebVaT7yZD1De/Vt5bI6qKXZBoQKTTNM/FU6yFrXyWhfY0T91ovw+ttbMX82w/1dLAQ6M8IAnSAeTM54DIFoJgc9OBuBUjWhYZ/VB0DGr/V

uqWCpOju64LbPDTghD0R4IbKQpG5CEio0xp6P5Y46EIB4agLmzDiarjJpwg025uHUyPHTARlYmY+PhWIyA7M8bSMal+PmEh5FC0PiLSoexZy7FwKFOWIQ9Y9DaGotk+diAfH8uLHoPQgTYBLMCcixs0BONcfRNxlsPG2y8Y7GlQqygBLYry/AHtQle0qAcGoowABSkhTgcC7qMZwOw/R9FwIQFJHQdgAHEahJ0WK9UghIqDwhsi5H47TXLfCuEeY

KGKyjeWaScOIJxgo6PLEeHu9c7l5Qse0+4gIKwnFLK0qZOVuDFUcklMsNZEiJCCnUmqdUcQ3PnvySoABiLYCAZ0zrXr1TeA0J3DW2Sc7qZyj5rSVC8sdV8Bl31nitJ5O7rlvy2h/FBtk9q/x+f/b0gCzpMsuiC26YLRywJTAcJBX0r1hPmMnPUYIQmIuphhf4laC2QCxVDOykVMUkMUmQwhZwGa/Hg9JHG9DBV+INETZcDL1zPrKCyqmt0RkcoZl

yoRdr33iMkb4gmZQ4BsETBw01NEzVzBnqUBINFQFgC46UZwwJTgNvuP8QuraoPCa7ZWMZ1ZKrXE9KXZI/H3FCNCFAMk+h9BqH3PHVjTIXU81IFAAAQk9BRJmDTZGIJZgCQsbPCoZFABoya2AUCyrgN9CKyh2fcym7zyiPOpts/gRcFAcNMcgDbO2DseX2udm60oYTyiiwOH0bAOwmhCAGE0BNZkpz23TnqMthxPSnmCnsP4WjGk+SrMcdpdS7J1N

uP8XFbZ+k31maXbQRUARtYqTDDGl5Yt91yqgeSw7p5jsORIads6lsLv2Sw+bS897ruFhck+G090N14GOk9Fpd3nr8Je95jpv77TvbZI6D7fRPtNaAiAV0boswTJ+16bQf1wtEaze+SLiz+S+Hse4UH2z4qhhhCe4NEOI2RrZSqLk0YYQw+ErDVLosu0JiwthjLntcLI8Wdl/CqNjYgMIj7QiJEc0YzjsoxXJsQGerOOMUBqCoE0EIKAd02C84IPg

VAWRsyrFQFxHkABuDsAAdDgopUBhEc8oVAgRlJCHCLz9QF67pUooJSW81pKDxcqKz3A7POfc95xwfnqBBfC/tGLiXxBpcsDlwrpXgsVdq41/iVA2vzu66gPr0ghuzmcCgLKQgRgqKJHDBH/S11pTeQp0zhoRBlBQ0pwgHoG6ENmfMAQdPSIs9QECf4iPEa7SkFBX5yAlIkSJgICbiQZuLdc553zgXMoHei8suL6wLvZfy8CIruzgFVcIHV5r/3kg

dd2mDwb1U5uy/qXCNHqiBINfcoQAACQm8WRK1r4veJEVzFLxQPWvV9vgcYyl6AAFVCvUl4qV7YFxyrDJ6WFCsVYhzVrbCLV+FPBSCSjGXihrBLAh2607XkmawBGOH+B0QpyymmUmxChmzWQeRJHWwgEWznVKRZEXQOU2VXWOTGklR2yuXPmFUvgO0PUNGPW3ROzPTbHfj+xcXrxu28ngj+QBSe2DBezeyUWpw/QhRTGMhhU+j+zowECB22GSFhEB

B+DjzxUhmLCuGIShwR3IW7kQj8iSk60w0pWpVpTwzx0I3Y0EKJ2pQozJ3PGozZlozr0p1p2x0KVfwkDYFz2yFnyYAQFQDHDt1QDgEIEQGvACO8IHx5GCBYHTGN08PQG8KnA4D8NHyCNwBCLCKCETEiJ6GiOIFiLyHjxyCjxjz1D+R6ATyT3wBTw8PtmL0z0qGCFz1VHrCgEL3wEaNL3L2Ykr1yJr18z5QgAb38Gb0SJGJ8NSPUH8MCOYGCNCPCNy

NQCiOdyKOXx5zYDX1YHKLQC3wZ35VyP3zQMPwwINDi1tUS3P2CU9lHFFh6CqH0nwEkB4H0ASGIHGFwCMEMWUmYE1HGGUDCGfwkFTksjf1sicgcnKgvDClPAxhbHq2aTqXLmrCIhwVbhcj6QO2CiSC+HQ1LiqiHCMPGxOLyjKn6xhkqlzmcgqUwNHWwPHSGg2zXQoLw2ILW1IOZPIIPk3RlGO1PlYPvjnn3R6wYIflWkuWeUFMgHYKvU4JGO4N+QA

Ue2AUJ2BWuhEOc2ki+3QFwFOF+yvVkLVHkKm1UxwlaT+RgxxS0Mhh0OBwqSCm7g+FoVxikVw1x3pVJiIzVLbFI1sNJ3pgcIpypy1P5TcLdJi0NFkX5nHwlV5M1PQHkjaCwlwE0A0U0DOGwh2F1QOF7R2GIGSAQFOHlWSGwB1k1Qwh2Fbh+3sXNCE04ItlKBewuPtlP3p38TdhdQvzSwiQgD4h9UwFlGcFGEkHUn0hSS6B4D4i7C7AADUclizTggJ

ClAMk0U1wSXI3JDgfgP9iVSoYQIcgD/gxNiUgpWlbhFDqwsTa1eAkoUh/IP8ekip84UCD80A7htAjgSwgoqovgMJyw6S0A/lxTcD8Dls9k+oOSV0uSV5TlLot1JTT0aChS6CbyxS55+S9szs3kgx5Svk/47s+DH1VTrD1T3tQzygdT4EdgDTLtUB/1oBVzeBgN0FboQp4oYYLSbSCFDwGCYM7S0BKxiph5nTHpMdTCHVIB8NWFLCgVfTKZ/S+FAz

BEnDEsjSBUIyDi/wjMrChMhMwAeMDL+N6J9LnAQo4hkgHyasWwwozjzYwA3gxMvyrhgofh84Ud1MrVNN8QdM9MZBCxDM2NRChTXMHMvdgrIA7MwrrN/tTM3NQtgsIqMAeRAtPNEq1zPNVQghIt3DzjPFWy7VriwAQNL87jKhQ4uxQ5448B1JcBgSl5X800ysqwW5Wk6l+1ARFNESvhzwW4bhczVZTxLLryBljgCoTxYQipgQgQXz20ZkHhALUBgK

55QKCD50IKl1cDl4dk88yhzlMLTtaDjQRT7kjrH5mCBTkKZSL0OCb1vkeD7s2x+CSLNwyKEyjSnoXpdSLhaKfphiCxyMWx8IoJ0dId1Db5S5uKCVEddhEIxlAR0IXTsNNK6UCMvTdKXs/S2UlLOVgznDhiNL2yDQmdqQspR88BUjrFgi8BsBJAJ81imBZ89xAjhQpwfMVj8i5dnpghlA9wJ8y9Fc3DecGbSBUAKbJ9vxSBUiaaspiBUA5dAg6ROA

gSjcKAW8l4yaAjxaqbMiZb6bB9YimbedEx8QQg5aoiuaMheaOjap/c2BBbnxhaDbGbxbAhJbpa2RZb5aOBFaWNhRCDJQI8yjY9Kjqi9NajuBU9eJujmic9droMmAOj3AY7BRei2w9Acgq8mBa9hjRim98B1boBNaxbrAucAjdbPb9aYjGb1BmaTa2bzbOakwea+bbaBbBBHaCjDbXaqURAPbabCxvbfblaA74FNjtiN9uB9id9jiO1tgj88qbUCq

riRJuyr90BNQjh9B8AjAiRQ4+JsBQ5d9zdnBiAjBsBMAGgNd6rzI04mrDxKpPyQocI7gaYC5ESu5Kkzg4NLLx4dYRqesrhm4KwQHQHQG5rJtSoKdVl6SzrGSd5tqtsNqSDoLd4WSeT4K+SLqsK4GTrb4jtsHDqyhZS6K8LFT70nriK5K9rX0krPrIUGhfqkqAa9RUU4TPI1CeLUA9goakNCVDoaw/8ekkascUbzDPT2FqHIAsbyMAzcbuURF1Lwy

iaXNvw5FYzlz4zIExZkg2Q8ILgUIDE8J/hNAUJDFvh0JszsA3J3jtY9SfzjUHETZnELUNN07OzYrF6T9CrV6bj3UyqQSoAUkuxHAiQ+hZRJBsB9IoBQ4egGhlB1IckmgOgb7QTR6M5MYdh4h8oqpjhzLiVESyxEJDgTg3IqzrhczQaYC0AYYADrY3zeBARFrlqVotrNtWTCZ2TPo2n0G4K9qELdsiGj1jr6CCHEKWCrqIASHcK7qCLeDlTToXqhD

aGKL6GUxzMmGKKWGUYC5Tx7gbheHoR5T+LkMUYEaKoaExKTDcqPS0bJHiNpGFLsbjxlLHCrx8aAcwyGMnZIz8RoyxUNHFFtGEg8IeAegeBNBYQcIjgeh9DzhiBZVdGlYqx84yy/gAR4JThR6KInGOMXHTY3HHUPGjSWyEsz9fHirbjpJRY+ILhxhzMLNZyqhmAUkrAehNRZRThlIahNAclijiamLb6wT77bI9hkhmscJdgTwGCi02sEpdgLEMZvh

y1aSa0BlqwGDUC57ZlW5mm5tOS0HuS+mpKumt4DXEGOn+msHxnLrX5cHRmGSDrpSpmbq5TZnbt5mHtFmpHXsVnPGxCvr4FRhNn/XAcMEKklNiSwauGMZeGBLUBLEc1oSRGJL3SWQLD0afWZGSccbycFGkrCafmtK/m1GYzlcgXlFyoLgEAkJcBW4DhsJstiyukqwEJNBiBjgfg8BFD23NEEFHG6zTZXGvL3HAkKLSW2yi216An0A4A2gUllIEhlJ

kkEgqhzNThZzcAY0H9mBZyGgjB3oVzE10A0mNzARxX+q7J85zhioZXXhP6EotZ2sWwvhKoAHuBbgHJBt4owoRL4oIHURP9bLoHapZsGSemjX46xZTXl0mTDXYKoP9rCHnXxS8HDtHXkPJnpmPkyh8KPXHqyhnqfXhCc7PnKLxDXoqgQ2jTtnuGhxLhwDQarTth37OHoaqIcIiJVNSoU2bn02JGCdSL5LWVZHc2gz82KLC2ktfmRV1Hy3JUEyIBYR

tZbhUJiBiAwW/INFsAFYO2UJPRCyypzg2h/pb3cAegB3HEh2CWR2iWx3Q3Yt8qyX6dp3qXKg9MOgOhcA/Rd8QX44qhJA2gY01Eo06QhBUmSkNzS4HJPQWkQdI3Cnvgkgyom4/gbh0JYdwQDtMZH2cJ/giIqyxkioAP3ygPZqVlQOsC4GIOEOVtILunzX2mMGrWqCpTJnUOHW4GnWsPXXSH3WHqiKVTiO/WPqqLcA+hqOXDaPTx4ou4qSo3mPAYFv

4dTmE3DCZqkpeOxHbmZLM2HmIBs3eEXn5GaM1KXCpOzDVHRVZ3AWFPtGEBIIEgfMyzwXkhTGG3UwEAwoyoFYYYVZbhKw/IjgiyeAYJLPnHzUbOmyOz7OSWnPJ3pPRI/HUt17Xs+g4AY0ck4wn8j2itGrrJXgKpH7oSrgiedEP9ETK0HIqwdYEIP9wD5TqneATh4hczq4/hgpXzSTbIdF7yOsnzgO6nIAYGgL9XUGwL1q2TVsGvUGLXmvJQBnqC7W

UKRm0KxnBnnXsOrtPlyHCKFnAV9uSOhiyO1nXows2DYVDSpuTSXy/JB1VD89waE3LSVv+Hb4TwBwHhYQtuVH+O7nBPXrhPicjuI3yw8SIcLvJLoAJj1dzAw82CEiSsJBY/2RgIg7J6PQCorg0Rw/2KgQSioBE9w66jibo6M8s8WioP2jOiU6l407HV+jq9SOnRSBG95cC6Y+hA4+NjV919dj/dSBt9Tu98Gnm47LrZ4efG03DizuZRXPwlRYsB6B

9IugjgGgH8+JkgfUaghghhZQOAKBThzM/RlIIu76CemkLEKoUgyprLLLMXKeQd4gAQKpzgHgu4Kcmf/J5StWZknS9XwOjXXplB3Xj1czWsvJrsa1eyK82uyvYZrcgPTq8leryC7DM2uy3oBu+vAQoHxoYalm+4KQNrgBmBSFkEdFGjiaUSDawP+DvOHFDm4CQ02OfDRHO1TuCtJRKo4cSnxykoZt7mPpEjE81E67BqElYH4BHw+aPhlGRbHmKWwB

byctGosBWJoDwAqxzwPmOGlKwzKlQeAeAHoNgDe4OFjEGJHTkalrJWd8WziQlpACdRJUJ2U/MIPP3SyVAEA5mNoIQDaBdAhAh7AVse2j4lYRWZlDVt2grCKFwoUEHCJT0gLtJv2iEeCMRAYJM8UW2cNGB8F2ALVziDTcfsL0q6wMVeOBA1hL1HqgDNqQAyDttm65wDGCqvRARhxtY4NiGvXNATrwwFKkvWBvPgWAjwHG9PsFHXUi8BIG/oyB1vAG

DCGODnhq4LvOgR6AhwnM3eU2VpBYjgzkpOB23P3rt14FCd+BInHNkILGp4lTgEg75oj3qLM5HAStMIJPmnz4gRczAMXIPlQDhBEAroQXLAEnxK1/aveG4cKzfiJ8ThY4FjOcJ9ya5rhtwnkPcLpCkQrAMoF4cPXeHAivhl0dPv3xoGB0cgRfZPJHWOG19s8rRLQknSLzl9qQ9fKwY32zpdDv4rfMYh3yT7oBTh/wgIoCKuGO5+8dwh4RCOeEwBXh

ftc4XCNHor4tiffTfIPy0oRFZ6f/BepxEn4r1p+lOD5g4N7JVB9AXYLdqMC7DKRlAmAfMjGhgANAOg+AHgBwE1CMNcexSc/mUmLDdxn+Msa4BVA/zyRDyJcGpCkCchow3KYUVKO+0bjkkdYiEKso2nHig1f+kDMrpkPgTZDRegAiAcALq7FDIxpQyguUPIjClOuuQiUhrx67nZbq6A+6i0MoZDdDeI3Fwqb3QAZldQ/QmQkMNujtw0URUaYYhnNE

TDbSq3W4H5EuAtgIcFKV0r724ECdvSGwx5lsKO6UYEImMCTg51cKHDLuIVGQTdzkGYNFOCEDthjGzTWNTwxAcsISVKgIQgolwHPKcF1TlQ9Un3MiKYIh6lAGylqaHq7Fh4uFbBUo+wcj1KpucQSFAWclAHwBYsjAPqYLgkHCYNBWMNQaxuF2NEglIuIrJLocAY7NpSUYyXYN1XuBZMqw+UHWFf3YFlAv+xwErqgDyYADquJQ2rsgygpwc5eUApDr

UKGaVCEBopJAbAJQGZimh2YihoRyob5jOhdDKihmUICTd/qNvR8nT3ghMc6xHoPiq7xhpKs9gw2Bgh2ORpdixYPAgPpjQEHbChxGMKNiGTHGR9pRJba7n+Fu7yDKgmgGdGmX+jaCfMvwJ7kcGICsgNO2AGsA2xM4qwgQPQXcDBESAVCcWg7cwa4ksEQBrB47SUeS2SwPieyoseOOMGcAdAY0IcczA/i6ChwckFwZgPrj6BdAYAocTRm2CKQgTTRG

wc0Vn0glKF/IMEqNkAQLgOQ7gircqGWGGpqses5UfYekO56VMcJKYmrjtWjEoMiJkAxDjAKQpuSkxavGoWmIqFa9r0WYuZgR0gBEcWJ5FMcUWLFgJBQ4XEsjtNyBAOkeqtYyYXdky7Rt2OwOasF+QLjtjlhMk6Svjl7E4D+xwfaGLm2HGqTxBNOCcVHy0lydwqd3UWCNmwj5wywILDLpohuBQpdUPQWdJhB05iBKoJZeVDcHB54tIeFg2zlYOJY3

j/JLnIKajwaA8BRgykB/JqCGBEgjABwXUUID9A5J9AygGAKMD1Fn94ROUoSYcDRg1hgQ8kY4KiQ/pw1DgGMSsNCXPaM8DsewH/g0zLAgcR04Y3CbGPwlS8wBsHBBl1LKGYc+pqFaoV1zlm0S3WY0/DoN29bTT3qhY9iQkHj71DpCVvbidTHo73BioiNRgeaOW7aFVuTpAuEeEknHSpB4jf3udIUkDjrpx3K4CpNHFKNHpmk2TmW1el6SJAPQSCCh

GegQtWQrcPUuCwuB1s2QF5OWLgDGrfANOOwMQCqmhnURPJZ47yb5LHG3iAp94ylv4yfEWghgKSFSDGgoDmYEgD+PoFAGcDmZNQFmIYLvguBdgqZ6TQnucE/JJQWx8wj/AzEf4WjFCMQ9CILLRgeieercEpl8GhZaDPQmrAWYPBsoLJoS48ZqfAPgZHJxZnTaXuAM6lRj4xys/bANKVlkTNeDQnDlwWaGMTJpzE9ob61YmrNdZ+AJaaxQ0JVlSotS

YSZtJhhxtbZ1cEsBVA94+9nZO3M6RjRsLPNlJI407oo3O6SCjhMiacTpNnFWtFOXwLCEODDlHBDEX5bAJBAsmlkNUsLBFj0FOBoQiuysSyl+Wzn1lh2l4iUUvWc6QK7Ozqf7HKIUHL8EAs5RgD6mjx+gzKogZIKQEViyghg3c8EtXHFZJRKoDwIHpSVcgf1zwUJVHCcCBClQwoM8mGBDkDF6gmmFXYWUtTF7Hy4xEsmMRYv3ktcEx58xWSmPsXYV

UBt8hUvfL16tDsByzV+bNN1n6BP5+YG3p+z+CXANpTvRQkAtmEvte0VCCBagqgWyV9uh3T2fArumz8yOGkmTv8xnHBy5x2jNkCeB2Cpgtg2EDMgWWIVgsqwYyA4LqmzTyQ0yrkH/AQv1IniYZZ45hWABewFy4ebChHkVRKrBTKgFAYgFUCECjBRgfoC4OGlb4JA2AbQIQF0FaD6QjR3glOKBIv5I42k35VHFojazVw72TSSuGJkxiwkOUQ4N5llx

vKtIAxAsqsNvIom7yyCtik1ofKll7y2pp8q+e136mOKd5zii3hmNVn0TxpGstoX2JfkzTRuPQ+aVwDLFGzlpJpIqFVDbhVlDmKMIXjtKYGx5vgUEUbGWHiWTjuxrs3SjRH/QL9+YBwKAB0FIB8QdwhAWclsA4DKQjA4wKoH6AoA+A2AEoRnIKwZDrkaIJVFHvZUcESAY0PQGNDGi6B0qGgW7JoKHD9D6AhgzARSLvmcAxoeVAGHwfysyqCrvJKSu

wvTFum+zkF/s7JegvFTpSsF2jD/PKhB7fA9UbkKxP9CHlPcpYHM1CHLGwAIsCyRUCzm0pzmwyvJ8MnyYjOGJFyUZpc4VeXMpwNAhgFAEwE0AfwUADgkgV8ZqFnIdtzM4wLsDkhkVgTiIoBI8GcHXlYwDQsrHCHEBuDfdZurleIdl1cjaAyUzaltfzO56lSHlIFPCZ8qsUdTpZJ83kq116mJiFZVEwacgKkI4U3FeHTAV4qWbhgCxwxOaRmW5XwrB

hxs5FEA3LCVQBJm0tyFEsRwMchB6GQlVH1OlJLn5BquRt7IQWqUkFBNFBUSqjIWrdJ+S0WG0AViDYbghiHWMkMxjnAqFCEOpNQg57dwQY2WJ7owus5wyWFnCmwcjKnaoyZ2f4KlTSrpWOBGVzK1leys5UUgb6Oq83jTMIpJAMIdSeCa5HraHKfIlcBKG5HeDqLQct6tCQdi0S0aOsXwbBBYkuUIhueQyCxjXGJSFcFFnalavkLWqFCYOrUpBoOoB

Upi0O6FJgt8uGk3zteuHXXp61zGazn5RvNiTCozIFIzspAoMAxUynMU5gQq40tTDKjEowo2CdFQm3CUIxVuYSont7yuadiOFxKtYfJNgWCC0lJqh9Waq0osY2MG4TjDRAMr0QjK5sATKZVY39Z2N6UDCPZCi18a7IAmvFeZQOCeVYNs8UKlZicxjioqBWoCGgAYoZB2E2jEZWMomVTKZlhAOZQsqWWkAVlPKiAPoDYDPQlgwoEgAHQV6YAAqOlU8

bxn7m/0iotTL8mVF0URakg4wjFuVCgKEkXIOWqNSFTMypUvMZtJKgFgSpbaMqhGyKhFk8xcCpACGxHjwsqCagUkPqLJJqAQAFZgJDVPwZsvggFxWeBcHRK3HKi1IP68EcVpNsoRjIyw5wGeRVCyZAgP8MMX8uVHz4NTtWaQyeGGLMURi4OBQ9qYRP7WWLMGQ6iZvLKqFjrL5Q0lWX1zVmzrNN4Ki6ZCu1lLrdZp/NdX9URVgYgQdvNyP/Kd6IQD1

VEeEoCCHD5xT10o89Xt0vWKTBxZOY1Q9LpyebfBzOBoFUCqCoAGgEyvoPHC6CoBd8fQWXX0E0je0ugHQVAIaL9Cq79ISSVALKA6A5I+gcuWUPHDGB+h9IfoUYKgC6ApIbd8RNWhMVl3y7FdowZXarvV2a7tdcuXXfroaCG7UAxu9SKbvN2W6OA1u23fbsd3O7XdBfYOhUQL5oiI6KMTEQSIkCV82iidGvjnrr4Gb06JIwYklTzrt9C6nuhXUrpV1

q6NdVQLXbKB1166DdRuk3Wbot1W6bdkyhPU7pd0TcMQ49AUVPSFEz1R+4oifn0rsHCjZRSGmNeKslXSq4AsqmNPKsVXKrVV6q/DaFlkWegEoHwD4CWlSEPAqNImemaAWSGlhkCOiTFUz2BAJRAQmWrRAXDm63L21YmIGoDzbEwgAQEOEXsjtFmo7xN6OmXjYp7XY7ZNO8+TdROHWTrXFqmu+QxM8Xk7vFC63xdCsDYZkqQ9O7gCZqYo8AWKQSgGD

aJRxnA2dXDVRYwPjZgaR4API6dcxWFeboFWbEXakrF0+zEFBbR9VHxC3nTwt9lQynxhi0mUItIma/s/sK6v6XRPHCLfWm/2NYae2sI4Ctpex/MzM0VQrUaWK3lsytNEDAJYSq2jLxlky6ZQyAa3zLFlyy1ZebHa2daU4PWrrfRGgEDbiAgVYzIGu4yflh5Qlc8JuN/ro4RtihT0Bi2vZlgu4J4FbRZo0PxUgse2orSlV20+YUwe++ENlWO3MHTtM

+u8Uj1W1DKJAAwFSDZOUgDAUmj26XfvqqhNrOkuZdCI6UxWytQYTaxCPhGOBDg/IM8vZcMgrBDh8IkrUbJhIR1lBADLTDZOL1AMETwDmOl5dAOtZE6HFBOpxWfJcV0S1NHijTUxLzHabF1JvXWfy0BVGbmGNvRIJxyrCXNHeXDQcJzo/a5xOkbmjgUwZOlyS3ZvmpSZwaY1fNJdCSxnBMVGDq7RgQwVAOpHCbxwOgXYWUH0FQB6QuwXQPoLCecBJ

6Y9Zu1AFGgfzQmGgXYVAE3shPqQ/QDQPiH6EhNy5446kDoDbvUh8QUkbuwuv8bGBAmQT1u8E5CehPgm4TCJpE1br11omMTWJnE1rvxOEniTHAUk+Sa11Um0+pRDPrwFDqoiaiJfDKWXxLyx0cReKPEV0SL3QAiRPksvfgM+QUj86tJgEwydBPMmoTMJ9k10EROD6uTqJjoOidGCYnsT4TAUwSaJMx7RTFJiU8Pt747FBRQ/VSiP255j8UCZ2p9Wp

PugXaJAHAQgKHB9TJBRgWANgD6nwAcAjAQwccpgHoAXAOWN9CIrItaQtwzgtwS4AhBwjAbCmaObOMvJRzNKqmB2FsONTuDml0tdSVCSSW1Z/JRj5ineGjqmNHyZjkBuxSsftYXzljSm4nY0PWMoHNjj87YxCp01vy9NCQKDv1D+wEHj2RB8zV/LyiIQP81m+zbmRuMDxEg4OauPzsjKC71hlOq9TdK4N3qeDQW+EPwdJXmx9Kwh4yoIfNiNmm1zZ

o8G1UUKHpeMahuKlodK2JH7MJW5hlEHW3JGyRbYHbfEZSMUUWMtRZQNiil0RrEN+R1HkYAuA8gegTQLYLOVODOB5cMaU4E0AoAxooAXQFlfmpe29VSzEOlsMcCgjXBESIUAEP1l+A6weq8UFyPVK6zZdeeHvRCIoUZm3AV5jU4MULLA7AHBz0mg+ZLKk2WsFe8xidQyVgPjqaJCBtY8gdBVYD51b1PU9qWXNATDNAwhnTubmFUJghjmjCwm22kzD

EcX5NuMCH8gXmtKV5nzcynYOGrSz9595hkoOHfGn1z0oOQojemVAYYYgf/A2yUGFhFYWEbRTrDP2WUnIisPCD6KoXWMoNucxsl0ph5cLel3jXI1GY3qEBMAkgeOMu11HOB9Is5fSDsAaCuRGVQwGsmspNHUzIANkCpMMgQgPlioMQpuJxYQhQkvydvX+Z3D0VERPyUl+yN/wHmYTR4KQcrojtMVjG8hYsoc68pUvdqlLw5ic4sdOrjmFjqx4FdOc

MtzrhumBnWcufoCBLQM5GfLh/kUKbdLZNTZyyJKohsC7gdPRgx5p+MsGL1EK2817PF0PnJOvBgOTkowV5LrVGWaWFYneJ6CDJWwKhXoluA9AcIqZHPEZMLB6w9SyqVMsePzAmovDtETpd0rDVkcsL52hfRSokBEhJAmgZXc4GDjKRlIfoJoIwEwCEAuwRgKAPQFsO8qfBp7EVlolao4RmxymahOftEFxB6ZL5f/XUkiU1ToQaKuHTMi0RyWquLUg

62peg5vLVL8vOYzjttYjr8dp1/5SOYNlTqkD7imcxNP+RPyFzux7odgYSAHaXWhs9dYzrYoFwLEZTXdU7240uWqIlYTpBVHPPubpJUuny68b8seyArN69JfesyUw3zV2ky1RW1NywgXIhZQxBMhsTQREIWETQLhG0H8SpYCQWcGFFVTdx8rQavOSGp6VIycjxcvI4MtR59BZysoFJLvh4ANAagRgXAOpAGCQRmA6kXfCknQvSKKjEtl7d8Ecgwl/

I9wIqIV0S57BsmQIYs3ZHkgHMNbaAAHhBNci/BW448uQ5xFXkFR159BseMsg2vyWDbO1w63tesWKWjbpE866Ob+WPLoDvth26NJBXqyjLt1qFfda9vEDLL5YjdUcxbRowi4n1hNtbMbGzD24Wg/yEsKeMJ2XjMC5O1dNTuQ3grGd0KydoiuyCEb6lxTvnBCClkzjs4cxLmQggQRiA9bAyfFFMY42ON1cF/s3Y6VQ8irXjS4l3eKtBIcLyGvoJqFD

ikAYAmgDgAkCMB9BkgcZg4HxBLDmYUpicCowRv319Y0Y1SlKF7xB3lrCeL/LNKXFzJVgPgYyUHXeUsr88oGwHTCW0gcITJ0I6Gc4J0ZMUv2d5q1JbJL2Uuf2Pl79824A465jnbbx1i6yTtAdk6tjWm923dZp3Lm+hsDv9AYdM1bmHxchUgyDgHSx3Ljjl4YwnRtmzCekshuJXHdEbPGexBDoPopQhtBWZ+ZDiXSdpfNha3zM2qLSIfhmCZxD5lPn

o+WcfrXzYvkG/rY7iFeP2jIF7ytpgMB+UDMQ2rZjBYsxQWKKuh8Kqs9cwbb0qEFvZwkfgRpHwsOVLI/TYGVUsmbxYn1LOSGA4y2gfEG+iTTAlAgxMXG/hPFEmr/BCmFTPqo+VPD5xQln/egrmSSF1Tyme56qTffbV62ch/jsTYE4k0m3DbZtn+5pb/tLHonv9+24gZAdXWwHN1rWaZfCS6yjAT1sNuRlbidI6k192gWHYcvYrDoSZAEP5CjZSTan

eD+p2wZTvXqSHrTx82Faj4k0JAmgDkW3nwC84I4OefwoSlQAABeLYOgFVqF0xXqACV1K8CBAzGQYgBV0q8lOR5pTyI17GHXRFZ7S+DRTU3ntxGF7lTqdEvQ30zoDESXIxA01XomJquNXIRLV7K91eKvlXKyEfX6bH0BngrQZ7ViGePyiPI1Pd5DaMH0BwAdgKytoDACiwNsoA8cZwFUC6A7BBAhsLq/tvBJANWenFb4MDp/acWlFTa5tKilLhfkZ

5uK1qvbKh02aaemEtGBBNKgMcqyTMinr4/1sIuJjSLsAwOdCff2epuOq25RJtsAO7b11IFXE4JcJO5zSTynYub8V6b4IIbDc7HmIPPXO05wLuBjEoOOXPLNB1bm6JCglgPrjxoG0+sTsNPNhRDvly05lEhX2nWRzp8NvfO9PPz3T+ys4EbfHuAQLboqG2/EMduu3pULVK0cuA7A5nbMLTL5X0yDagqOzzQxs4gtgXoLuzuC9tqSNIWQs65dI0dqi

znOwzFLWNzGojA+6EAPAbm88/x5miT76ERyKWALiq3SwV5Mx5f3OBxB0YFSAHle4YHCWby8kLJu8E45B3YQgx7W5Nmmz9v4XjygJwQRHfvLnlu18J3O8eXaXCdGL3F/padvXW0Dxll9Ck72ObuvBhxqy8cbAy1Zt1odq40feKdMvtgpcHWKXHzg4O73Z6/Bzy+fd3nPjb7tp2zCztaURXJ7VIsIFFp4BzhEIHvG7T7qoBQ4ggVIggEYCpFCA+RTA

NvTmLquc85uSVzSkpDu5QiNJiYomBWIiAS6cXiaBLSS8pfOA9wjL4EWy+5egiXrqoqQFK+cSU9Rr2U4X3lMYiLXbmK13HXz0F5k6mpsvA6+JFOum+8F3Dm6/GLUjKKVXmL6EACLxehciXqWsl9S/NffCWX1ADl6FwdeCv7OYr91/lxlefT/I4N3sXH3D9RRk2SNyI+Xpd2KrEAAYKMEIC5keAu+TGF2CgD6B44DQZIEICGA1A2Q/qgtyew2XMefI

V7eeWiA8/Eo3I9oppEl3FZv9ypdB9LQ2/AkCWnIIS0sMREwnngEJlJEENT9VbP2B3yn1F1AKKF9qx3aLid5bZOv4MdL8B2J1OYMuEuTPED6nRZ+wP5wKXeT8jHTDCEWyXP5oxl/GwqQUbVY3n+O8Ddkncvkl/ll90F4jOmqhXsNl9Zgpoc2r4JDbIsmWX8g1ssIdkGhfRwxvZkVYoM7AMkMghWf74FNphUI+bIUfpR7dufozdFXoAKAuAPSLORrb

8QGQOwUPAkFqLqQjAu+d31qvWXZTerrwTGMMk8/jwaeInwtK8CggOR8oewdcVY7pdXKBkVZTFYYtviALFPIs1+xAbCcs+MdbPkiRz7qEwHkx2L/T/O+AdkMNjLtqaTsfM+e24EBk6FBk/9s2X84Xn9jxcfpdcMiIx5tbr0YqT3KanqbS835+G3kqg/EAfSA/lqBEhlIbAI4OpH0BtAWtfoDlRzeYBDA+tyf1IwKvNhiR9V2vwL+ncFcUPA5VDqKy

HPQA9AZULUptAcsCIK4AdHtXCkQZYJhBnASgh+ong3quiz/AmqD9QBqXvjBrCOrCmVZiOV4iVb3gX3lsDmY+kEYAUAyQPpCKQKSBwBbA6kOpChwQgD0A+oJAZIRw+QrD3JNIXaM/ouQtWB7zjwxUoTyVI1ZJARlM8kFohCWzGtcpfALcEg4UIQUCWZtq2rKtYuOdfkAYN+X9mbbN+0xq37dSGlrpZaWXfrO4xOgKn379cOYok4U6PipA6pOYvt+h

4GWzCaSjCZUMqxoOXDNC4L+u0jUyokB0i7Ycum/t5bb+wury4f+AWpnZPmaCjnavqiNk4L3A5nIkBaIT3ElZaIdbDjZQoDwI9zPQMIMVAJA1iGuIZyAjlTbe+4jn5Kd2Mblc57+RwKMAP4BwH6A+oOwDUAdAbAMoDxwmoAMB9AFwDbpDAyQKLaP+WUj1YQANkCGiH6BdqDjvW3jvVj/kPFhUjw0+cCcC/yeipoRyenaMVAiarTEz4gCkmqsGyyhg

XJr6B4pIA4jS/fs7Zgq6BiZaLepLpu6dW1nnA4B2xYA3YRsfwA2IuBYgWU7oOoks5S7k3gU7Lq+D7v55NO/mtwbQ2oQVdwvSf/m+pOC8cjop1sWis2Z6wrOsUoPc7bMYiYQQMm9C5kwIGqh5B54vnK02Ubh94lBZctc4QARgAMA7AmoH6D0AzAOS4VGLzpspmUpYEWZQQzokFCb2fAXWgnKlwD8D+QtmvTIguN5CzzMy7kHnA4QynJhL+Q2TJyEw

wSBOcAVgyweMYgGw7v2bqeMFJp7ouugZi4zuuwdp77BJgQ/Ku285mu4e2BAmP7VwEvpZrkY5YN3CHuh5gr6rcDMqeCNY7Lp8H3u/gWDbv+zTrr5hexwpUAAAhD6Hleq3j6FehBrqnqeiPRsT5+QUoSAzp6Q3ua6Kmlrna7oA1rmqa2uTRPa6qgGdFEDOupwa65t8K3szgBhPfPd7Sm09M96T6IYhc5R8evgH6SOMapoDjAyQN4D0ACQPOQdBKsJv

yt8ocMkBNANgSwFL2iPoB6FmVUDZoPAm9rUgshgMF+QDWpcJ6BVk/+HY7H23DCeCYS//MoFbWTykqFN+6wW/bjuOgbz5qh3Pnp6qhBnpdYC+y7rqGruFgSL6j++knZAmh03I2aohbaCg51Y57hg7Wia/nzob+J2t8Fa+gQW6Gf+AIQb7Z2wIXGSghEgIoLKC2imoJJQGgrNwmSugvoJhKdbMCDGCdiOTa4slNpiFt22Ie97sKDNtWEEhD+IQAiAs

5E0CSA+AAcAP4NwESD6AIaG0BJqWwLKAMWfYbkzxAsQsgQjhq0vVgxCwyBcwcUNSK2JzBTwTxrasMODKHbWjfkbYaBo7hp5hOKobuHbBUTgYE4uvfni4HBxnmYHHBZnpYGi+RoTRS2BY4tNxtmrlFDqHmDwe4HXSWqJuLbSPgV+HOhQmLv69kbAMpA9AXQPHCnAtQAMAb8MAJpBmYPAKQBVAu+AvYRajFNqp76gqvRAORosPpA+o2AMpBLkMAAkD

jA4wPpBais5F2CMARwMoDKAXQWLZmQejnqohq4Nn4boQbPMEHkOWRpQ65KIIZEESAuZMFAQspcHLCVSOwDYgIIa4nqQoBiEpCzeqWLEoKnAGZGTaNQnvtBrBquWqGrXi4ar74lyVHgSFS02AA/gwAmUUYDqcD+PzZEghADCycgxZExFEaZlIWpQQNwOMKWML9KDQ8EM/qvZVspGv8CwS84RvZLhj4fT5KeXaluHqBm4RJHs+O4ZO5c+6HAeHyRKk

YZ4zqpgSu7mBGBtpFXhoriWC3hJpKTwg0wjCg43ubga54ymDhMDAfht7mr5OhmvgEEBef4WVEfuMkpVHw21USb7vSFiG9C6CX3LuDnAasK2KlkEEC74Zo1WHXaIQMEDjYGMGIdTaFBhclNHd2pQb2RhSvIMrD92MgE0CjAJIGER9AmgBMr6y3QfD6p+fQR+xf05YBNQwSQlNtLeQdvE2qokB9h8DwSUbEzzBQh+oCCjwZYIC7fAK1ieApAattbE2

xYkWuHwcmnlJGKhDsbJHt+5EpE7/2GoVsH/Rx4UZ6C+GkaZ64CYMYaHXhXQb7ZHGdgSbIzBShMa6Lc+6i+GHqvBLio+O6MZy5fBdke7I4xfwVDbqSHoWEHARVqiTHSoOsPuLXAe4uZy/y1Cl3DEA2WBUisxEEAcAu+s6MQqqoYLBzEFBuAfBrFB2FjNF7+bAF0CSAPqPKr1ycACvw1AWbmFJVAHQMoA8AUHKZqsB4JLcBZMPwHUbDY4ks+GAE9Ym

0iNobkG1ShG5UHoquBHZjMihKdsabbM+b0WoFt+n0Zz56BikV7HKRQDqpHahqBgHHC+LrsuqEBUMdTAGErSOWDtmWKvQLHMP1sWA3AKKl24OhuDunFYxLob+HZxpDl/4VRP/lVEgRNUegCXACCBeAsxmsM2YIsSgtoKnKBwJqimMqiLUowwgLrD5DR6EegGjRmAXBpFB2AXiHRqBIU5EuRbkR5FeRPkVAB+RAUUFEZSfKic6I+7Rr+YlqXvEOA3K

XEaKGuULDucDpa0BCxpNY+0ueyuQrSAjTtuv5nUYFwiEF3DnkZ8Yi6qeCoefHaBFth346eOwRhSahKmvi4nhQMWeEgxJwbppi+wbPpE7uQGNuYkGt0HEEnAbAoy70C31uU6I4LkLFyCyQkTZFZG34djFNOxURVDTaOcX7KARwWjpRdOcwD+4zaf7ikkRa54G0hKJzOlQhqJEHhonjItojol+QCHmtrrOehvRQGGFWmKDaMhEcRGkR5EZRE7A1EbR

H0RjES4YdaXWiCROGfWq4aoenhu+YtwrbDHbzafEU8Eja+cOUy1MAIPJjriamDFp7u/mDyDYe6HnEZpUCRjoYEeGycha6kgif5ikeJ2uWHSiHWowA5IJAB4a5A2oOoDQKTCY+IEhpwPHAdEs5CQG3AQ5PHD6ARIIwFcs9AKSY7RafifYfkfRgsK9o/5KdGEIsIJn6Xk2itXAXkeikFBLhCMVkKbWPZloFqeRiZsGPxHsVi5KRPfk/EAx6moP5u2+

oSP4hxEMVRz6R5AtTDSYrYlrZy+KMGZFIxtTPJDThqvmnGYxJKsknMJMatFGxR8UYlHJRqUelEIAmUdlGaqIUXlFhRL/m/5wJHxttKVhIQQknSC4Qcb5zGinFCjFK1jOLBYQ4OKmQoBPmDDDKwesIkEKwWQcDzGIfwK0poRHki3aFWNNhNF02PMV968pcUWTICpKUTABpRGUVlFhx88Xo6S2YLqDAspc3NBHTyPHndhlgV+koqVY7GjPJJkhUKxa

/ASaS+yYSVCNuTXA9bEshTaeiUO4GJvai34yR24SYnuxvyjikPxeKVqGk6tiUP7JOwcQGxGhQ+pP7GaWToQZLJkvqAm7AsKXDH0pqAPMEue8bHB5v6NYNZGOhvnjAk3mrodEn/eeMaF6AhzGEknfuPTmkmiGX5nMDxpiaRulJpY2KUBppkRtWpaC7DGUl5aGHpUnlaRhqLD1JpACRFkRFEVRE0RiEO0ltaXSY4YOAfSVKBuGlycNoGU7SMvJEkn7

BYgvsmXCNpsuvol9KIEzZtEbpGKyZh5np6NNoyPJzya8kHA7yZ8nfJ9+H8mdJDht1qvpbWu+kDJk2EMnLyf2luJAgRXIJZhpQhgNYfASZBFCnk7PNlqLJ7iS5iwWhHvh7EAhzrsnHOxHqc6ZGMkscmRkpyQgDnJ7hkknXJkgLck9xfMaLBwAKSMUrqQQgLvgUACQCyiagkgLKAUAygOoC74eaovYI+RGg6S/mcGHMnei4KbwjisdUeGEA67lDPKV

qS4RwyPR9foO7vRF8Si4vR18cWkocpaeqEWJ3sfim+xgMTqE1pJKXWlmWYvvpDfxbFFHblQGJPZoKe/abbJaIQMLDSQJPngLp2RZKsFG9k/sBSHYAPqFlHKARIDAAP4AwD6gDAcSJpBtAOUbLFcZuqtKmFRrofAryp90rOlKp+cZFaoJRca3hFkRZKPBXA2WOWA1svwG1GawqqECCmMsIG6JvcesAiztxGAfal4Bk0d3F4Rvcb2SygpANPE+oHQF

UBxmu+MpA5IKSMEDOAR2TwDVU/yQrFY+OEKxEdGgPBJYVgpmbZDAEPFijiyJewCFBCRTPLTxWx10RixeO0lgoGyWOac5lrBrmUDmYpeKdineZimo/GVp8TtWnEpF4R/HsSWwBqqUpFYsWDloVjs/SHmFOBHbFgkRvFDVw5Pp+HhJGcW8ZHcQlL/KzcM6fRitZQIe1mFxaqdowWSjcdYiAy/VIrB12WLFkHWIbWH5BlgsLHXZSw1bNWDYsw0QVYXi

dCQjIOpOIbhGXO+IXv6NhyQFUANA2AEICoR/CT4LUhfYXUiF+FSEAywpFiBxT1YV7OXB7mbPAEb36LGm0jWalwMfoPAliGWENMrHs5SxCb/GwJOQgOb2aTG+aZoGFpH0R5k/Ko6pDmPIliQu78+fsaeFBZCOVmGfxu+BFmHQ01EzGMpkdIynxsUoU0o7qXlqjTeaSdo05wKcqeVEySEXhAC+hKrhMSl54eFKb98WcPlz9UZTL+TH6UYcXzDesYaN

7xh2IlXwF6U3u3kzeaYbqZZhlermHehgYXd4T0/fMWGBmL3qcShmS2eGbz6+EXv78KwTLKBCZc8YKxa5RGnoRSBVZN3AWMXblRpDUwDC5RiJOimcBdG1uZ3DDgnHA7lc88OqWglgruawL/x8pN2Yo6XufKE+50keuFFpETl5n7hZ1hWlWJakf7HAxmkUHGXhZKcWJbAfoPHmNwE2VHaOeJTpiq45KMLnDng24lnkuyOeY+6XSvwQXn4xUusXkV5C

fO7r+hI+ZXmGu1eeDryYn7PTw7kmJBQUZ6Cpr8ZxhKYQmHjeNrt3lsFWprN46m83qSIV6y3lSJ5h5BZPBBuRYU96T5pYTPmMJUugqlfePAGSFbAowLCAyxEqS/jPaiPpPL9YXSMCD/62ihTg8E8JPEDUuFyuTwUIhPnEB8W6BWcCg4e5vdHg669qWBAacQgAZI6q4Sp7gUn+c7HESxib/lB5/+d36HhPsYu42JgWfDmgxEBfWnXhPqLAW2QcGBC7

r+PaSvHL+PwMVAnA35KDRhJdTpyk/hWcfgUtZJ2kQWiFxDD8LD5QYdKbOQJTA4HMyPogimMF0YVNjZ67eYmH546pliK95FePwXl6FFIPnCF5RaPmj6chUcTSFMuf0oVh8+Stmiws5PrDMAOSD0DUmVIUx5EaiQNTyuQSyOfYhGjRhUQfAq9sNZaKFjPrFW57Ml8525xEK9m3581PflOQxKG7nP5nuVOje5wTqz5+57mf4XW2gRbinBFfmaEUR5cO

XqHR5jiUaF8JBshHEGRJpGHywghqL4nbAN0fFkVO5ocSj2ygNhjFjpuRZEn55RqhzKF5hBeXklFMpGUUSAxBXtSIiVEDXk0FjZgtqs6EOFURymzeTGEsFbedwWtFtAu0XTe2pumFZ0PRWOJ9FhdMSXC84hePmSFYblPnz0ZYTzHBBzqYf41Ax/qf7n+l/vbo3+Y4Pf6763GYj5/4bHsEl9otBYiQ863aLswGcxECB4Nud5JWSvaCRU5D2Z9TMGZ2

Q/WNS6lgMsDZRDoK4aikLYTxUQQg5V8X4XaeEOZ8Xlp3xTDlLu/xeeGRFiOZu5POLiS2mbmbaaaGgJgFmbIAJi3CcDL+gIEFCSYKccYSpZW/uOmZxeBViUwg1OV8YdOC6e0oDOQhr+4rp/7uM4qE8QIdHXAFpaMhRaFjHaXDwZcIY5q2R6VGQnp2zlh4wZ1SeenDKofh0Dh+bQJH6kA0fkSCx+3kQn5J+kAM+mVAlIJoBqAuGVVb4ZX6UkCKEo8A

8AchLkMX7EkwRmjB1SeJN9owgxsZBkyILGTslZhiFleVP+mVCR5nOfGU6mB+vZMkA242ACLb4AixSwEb5AKYDDAgPRoxqxc1YFaXPAJcB/is85TIXC2FPMryGWU2TDJ5JkULlGzV+U2F2buFrpegB9m3hRilfKWKX/k/RABQGVAFL8bOZ2JYBR0IhZZwWL46ZTabZ6eJ9MslB0piMXqBzh8JYEmISDpQSrE5ORdgU/BmJYFYFlBBer7F5m2qkQ/g

9NDIBwA2AEQBig+XmziSuDIjMQ+YHYLriD0AtDJUhA13tYh4AP4AERqAeXpkTMAXEIEDm0cAB0RNeXXnbgJeU+L7i5AHNEbTi4UlWLSyVUAuQCkFzOGJWoAElbbTSAsgDJWEAclRq5KVwWKpV2g6lfbSaVDIHLg6V5uOcIGVGRIrgmVg9M6AWVqRFZX24SlfMRREtdMLTOVAVWi6klaeg0X0lTRSN5YiLJWU5slPeRyX95ghTmH9FEgF5U+VKuH5

XSVrlbzjBVtlZrihVLAGpVy0GlcEDRVHALFV6VgRMbTzERlclVmVaVVd7WVO3t1X4g2VfkS5VTlbIAuVgVVAJ8iY+f6Zz6doKKW2QU+o5yz5ExRkpfe2WefR5ZWUYVnFZpWeVmyglWaqX3lmyn0b9Yw8H8B8Ou8QfkWOlUOWB5cX0sCD1q1ykkCuQuseuKchaMdaXasTkO0gLyewPTzng33A8VulH+c8UFp3+f7nvF07n6U+Z0OSRVVp4RQCWhlM

eUjldykZXYbZOMZbRxceB+tOnwxqeRe5fk1wIBZspvgdnmsGeRXmWCVTWe+6FFn7iWWU2qSUIbpJpQPpSAg/cmDVaoM1EBYOUMNduVNwCNebmdlsRqsm9lp6f2VwZ0mbJnj2CmUpkqZamRplaZtFXYbzlPSThkuGeGSJloelNt+nHgoOGiTsex7j84zaLcEC7oo1cDlyVqpwOeXMZ6yZtq7JWyexl4ehbg+W8ZmFs+UL5vZPgC74emCKlSxjHpoW

b5zhSkA3As3AkU5cupRNTZMGPn8CtwMsHGmFmwOs6IpCsnjC4RuXaC2qV1i4S6Vv5jxajUel+1m5nelvmb6WEVQRX9E/F4eQFmvxoBYHGUVURaFlGh5RnRWRxbFENQeOD0SxV5QyBSAkowU4fJCy+mZaiVpZOZWTkcGx4GrZCRWSuF4TEggFkAzElIOk4kFhdHvVUoWUIfUVF/fPxI1GVdc2rbStJYN6lVUdKwUV8HBUmFcFPRLwWclmYfVWUiJ9

QYBn1CABfWDFD3gPyhuM/OG5ii4pSdXSi8hS+WiwPAAMCkgiYHxCUhP5csV/lImDrAtw9CmjhOQmTNsVNI1MScqQkkrPxLFc84afqfkP5CeBXspdVDU62MIF/jhQxwIe4ZByNVhXulH9i8UY1bxT6UEVCmiHm+ZgZWEU915FX3VU6YZWL46OI9eCXUpSabUjcVyReEIJx5CG9a38S8ZgWJKQurAn5F4wrfxb1eca3kpgOnAgDmVCgOmFigpkOLhm

0HYJzhy40rtq7ZAurmYCZEykNQBy4UVa3y20Grr1URALVWtXSulwiD5Mi3MFzR/CbAKwC20PIgcalFHlSY1iA5jZY05A1jX432NHAI42+uARK42oA7jZ41DV3jSri+NtjSwAKAATW1VKVPIh40AQZwhPgxNl9b9ZQkyUDaKU+nMjSWmumemVWt5FVW/VtFyYZ/V953RS668lExHoxmNUABY0R4VjcnA2NKlSwDpNmTTq7ZNVgLk3VNXjRPjFNczf

41RNrVVJWVNoTdU20ikTXU2hNsTQKW+mEheA1vukDa95HV2RrIXq+cDZHXKIQgDkhDAsfj6hEgNQJRFdAXQMQAQmBwHADKAzgCCXVZvYbtFuWhfncA9UNMG3CU8Zbv1gzcIChkFHxEAEzy/4iLTojg4tDeewU+a8kVAbyj9ttKv5ClmimGJGwXhXg5AjXAZfRfPtOqEpRwRI3ruWBkaEPasjVSnkYMdm5BTUM9ZtJlwy/kaWKsymFo2rCHNRiWCC

ofD27q2cSfr7f+cNrnbRWEgNy3WMxUJXY54ILKRA6w2EAcBqIPQEXZsCuqB+ryougsDxWpVCTamCOc2WMWz6XMZGbwNlQBwA9A4wKYAq5MaDsA+oMALpikApwJqDTApAMkhnZ/QV+QZ+lYJYwEtSht1SAulovcHOUdUYT75wiLWnWvZCmAYq328yA/ZLIxLRhW11rxcDmN1oOZS3fFrdYI3nUwjfjWw5hNSGUOJS5mL7qQcRbYhAg9SMAmbS/VKk

VvOpGQvIitINjo0Tpv4ZK3iWPNSF405crUb7UOjORlgwgB+p55EJ7DnojyoILGCwWh7FiKl9GqZG9wdsX3LNm0JPvjA2Rk/vq6j2tEgEspxIpwH6CuC9AD6gpSe7D4CygzAAkApIMBbpnyxQbWkUaJ1wPTL25QkUWjoQb2gcq/AEyGlD1mN5N8AgERSreyKEv+AUwLBA8HfYEtGbVvI11pLbm3opFLTJr8NARW3VfFHdSI1/FlbfYlaRA9dRVGhH

Sey1o5glA6Rn6AFCg6Zwy/h5a/yTkCiXspaJXxWc1zzP20DYhZeOK05U4iqljtIEIpzJAYcq/RX867RmSatRUHoJ6CqYDpyxBCBJ9ppksLFu2t2Y0fxlaU+7V95GA9AJoBdgAwF0C4KRILvgxoQwE0D2YXRLvhdwgbfezNoPFtUpdwZPncCU86EG45nAjaLnCA8M8qjiYS8NBw0uxkkZfFktaHS3XUtPPrS1GBz8QTViNUecTVAl14V0BxFzkGlY

DoOOYJIym/iS8G6EP5PCTOeS9Ux0r16Jbo1NO7HdK0IJAESO28dxMeO2VAXwGWQY2VwCph7Kx7icCzo9CvXZFk7bHLAgBp4NhBmtHvtQkjRynZLnjRC2Y6m7tvMfLm9k5mLpB9A9AKcBCK6kEcA+opwICYP4zgMwBtAygBUGWdTSHTDNwciT1S7xXcJTwtgVhbCmWZxsTyEV+KjWXUzIlZD52+FKHU3Vg5RbcF2/RoXUeG/F3dWRVRd1bRu5i+OP

KR3wO2wPJC6xOikJGLcg4akU36GMPQqs1tkavWEOhXdQhStg7YgkExyCUTEdZlXRIBKoMdt6qlKiwo3bacOnFkEfAz0HWylgDMGuJluSnXam2tHdg81y5zCXv6egDVh0CBRXYG0A+o6kMwCNxRgA0BdAOrSki8F88eC2YNJaNvEngZTJ45pQH9E0otwx3d+SQETIXMF/ZN3f/SIdqgQF1o1vubw3N1+FRh0ltqYoAVh59LQP6Mt78STWbus5HEUA

gxKMkK8tTvBMipFUDFWyw0XbRr75dvbTjFFdKPaV1IJ8rREGdZ31D5ieg5nOsVoQ1bEhCtIKED8AhAepLCDZY3XRmgL1NPRLnzZXcQz2UeUmZUADAmAKHCzkMaA0A5Y+kKyDh+uAJUHxmOSGYBbdPkKUzJc9kDP5Nt3VMFAFQOsHUa2O2ittIfZ8/sfGTYwOnd0yy5LY92FtHdcW00tt8WF0EpZveA7EulvWL6agcRTnDDYnbPZq7AaXU5qzCpse

orNm7vREkFdbHUj0DtnHdvXKpBcXnbgQddjWCV2NYD5iGtgAeZyFgllPmQ2S/URQbrFP0lYh1UaAf1209ncQwnRukmeN2iwa3eZihwvYBcDOgXYAgANASjgMBCA7raMAL9T7b0FBtTIbDVNwXwMpxQdm8U0h5cVhXV3XArOpaG3R0odB1YSHFhr1OZXpQ90FtgXfr0fFmHf6XYd5bUGV4dFFZI1z9RoQMD1tpTLipDgq/cFCpFKMQOC9IPFVy6e9

uZQf3tGR/f8G5xc6XlqjtFXfx3wZTqhWDtsdotWz0KisGMg1xJaDcUGSa4hYgwgdbIhCp9WIdLk4R4xYFLPNlQHoIRSQvRQANAoyinIXAzgAIqiA5gHpE9hemWL3dwSQPoRUIsJKY44D1GlVDNwymOQm51f5B527Fu8b+wLWbfXi2wd71YsgIdDmSoFUDWvQ3UhOyHSP1vdnfvfG41xvcYERdX3REU/dLLdeHfllwQirT+DRpVKHdKDiiq0dJasB

oZlGOFAkcpLHeK3bCPvcf1GNPHWf2Kt6ANYx7A1iMSjgB8NSFAqw7bACBmM1opWCsgNbAYyG5QTr10Wt+QVa2WDNrX/3cKh7egAdAoyh8myg6kI2DMAVZM8SaomAGEz5uGuSn4oDJcKEaFQwMJX7r25+lv3tIhdpL17m4ljPL0cXnWX6hiKKTm269NA9QN5DE/QpGexRQ8RUm9jtp91EpRNRUNQORoeMD1tHGqhiNDPaTgipFIUJZTEQlPrv2k5C

PVINacHHbIPxJZXUMP/+SnD2gqodHv8CGMBZLXa2IqmGhClklkphDwQdbGmQzZ3/eLneSqnXT1VhUxZUD0AMaMpAJmocLKDjA+AJgAimDQE0GYAygPpA8AKSING5R3VmwG198UFkykoq0qSgHRhTMVBP65TGcDWi8NJbk3kEbF51KNIxtm1IdoI0P20DUBuh0MDhvXsEsDojWUNIjBHVI1GhX/QD3XBbnmmWdIHOk0Oxxs9fEVkN04VkWjpeXd0P

79ErYf3kjMrYFrcdCg+V2Y9yg6LBriQIERBqwgASjYXA+jMQo6cZiOLDfcs6KYy4QSELuD5kZgyGpCjuw3a02DEgOpkpINwqcDRMD+OZjxwu+MkCagykJQjqQD+OFnID2o75AgdrtQhAWI+aLIGcWobWKEtoRXKcpHFN5L/j3RmKiS2a9uQzhWodro0F0G94/aYk4dCI+b2z9MXRDGaAcRVVCxBCiuGPYjkNc8Eb9iOGEIZpgnkSPw9eecmPSDqY

yV1yDGY8+pZjDOTmOVALkPKhLxvRtYh6kGEA/108H6oJbmcAMhBBm0A4I2MqdEpS2P4B+w0pw5IocL978KgY3cMaFUHP0EtIT+rewfabzizLhpAQi2DtI7wEiULC6vaJ4DIv9Dg2suCwkAHIEXnXC6OZjPrmleF2vV/m+dmNW6PY1jAzCPMDcI9Ym4dkXeUN+jnA9eEaj87mCUct6ORRqdpPDE0P1uqjTcHpc3cF3COynQ8x1itSY70MpjxXQK5+

9ReRMSqZHIjbha49tGNXGVlIFACq59lfbgzE/uMsAIAAAPx+hzOA5Nd4dtN5XnCbk2ZieTk1T3g+THRFkCBTfXkiIDeTBS3mMlPTaqZ9NH9YSJf1dVb0VCFhdCFNOTYU65Nz4UUzzgxTQuHFN+TiU4G4XNQpVc0iioxdsPlWuE5HCzkOwFACVgzieg2J1YvZJjbkdecX6otRaCFBDIP+LZRSe/fZQ2DWn5A/kc8jubxroVwI46N4EXDcbb5t4I3Q

NUtx4yF2QjIRV3UMtM/cP5UV5HGL7KafttZYeJGhArXVI6/Y5ZtYy/qca0uLDV+MSDa9SMh9DFI7K1ZGxeTADCAJdDkBj4vOOCKugUoNgB24iTcLQlNc1aDNZe5gBcJ2VqABCDqASVe5Oq5S1ZzjHe/00IAD4jAOq5ZeTjUDNKViuGIAj47AHLg4zgM7zilT6MxVNBTlQFTMU0IM1SiK4jwvDMQzbIOM2zNz0KLRWVcM+DOIzM+CjOSAaM+VOYzr

XqgBUzXEPjOOAuqLK684JMxRDZAFhmwCUzAM8zPhTARJFMeT9M0lMh0TeWa5dN6U2N6ZTrJf005TgzRmELev9YaYTETM9YAszIM+zOCzXM+ZU8zjNPzMuzCMyTMizYs7rMSz2MwDMyzARHLNEzis4tUgzZM6rPqzuM5rO0z5UxwggNlzXtU3N0+da2tTbY+gB+g8cB+rMqrLAnVkT6fkpjZMYOiDAyGiJBaHW5cENuqlwXfQdivabSCAyCW5xWM6

99oCS7Y7jmQyjV5pIkz4WD9208927Tr3ftOd1pvYcHHTtaYR1nTRoaPRrmtQ9dNuetMOzxVQ9mgXAM1m/bkzIk2XR0NZlfgd+NPuiPX+PWTXHUUUTEATeckBIggLnjaADQHSBQDCzoEDaAPqKl5ZIHk5ICS4cuAE2ygMAKbT6A2gPFjPzqXpLioASgKgA5IuACSCK4IgAEQC0Y1T/N/zAC7xBALnAHLhgLE4JaorEqRDjOi0EcGwChwpEE7PbgnO

FTN6YOUP1XIAaCwoDhTE+JfOEg181AC3z981ShkgT8y/OcAb87TTaACC1OD6A8WOwscAIC3LhUL2JjnjLERlcsA+AARNm566AABRVAe4JkRdAI0Nq6oAHQJoAEL2AFAAAAlA41aARABDMyVoQPMR9ACbhSAwA/0HLjAAcuKgC2LIRPosIzbGKgABg9FKgCWQUACAthAHi6gBiQNi3YtwADixDPqgE+PpCEALAFABKiWQK4vuLni1SggLvi6kT+Lg

S4rgEgE+HxBaYkSwETAAbi3EvAz8S34u2LAS5oAGLCuupyK044ALRODZAPaDRLuS14v5LHAAUv2LxSwjNGL2YKUvVL2YFUBl4TS9YuJLdi0kstLQS6ku208oIECsz2SzEt5LPi00sDLRSyUvBLttL94vCky3Uu5LCSwMsJLCSyIvaAuyyzRSz0XhtVigq3b1pi0DhisSi03OFE01LFIKoAQzuy9oDCLNgNQujAgQFTDBEdoBQCoAAi5wuSAVQBIh

CA7CHNU+Tpi1yoWLsC8nBy49AAyAhEe4LTT/LquUCvyuuuF8s/LcK38sAr7CAAA8oK+Yv/QAAHyyL2i5/ONLzyx0srEiAOQBpV8xALQ+T9IO/PqumK2KAiLa+D4BczfhKgDpL+IJkveuzoInQwADjeisIrgK2KDaArK/gBczsiwETyu+K/cLaAXKxEsak9jRACygflJIAy4EAMSve0Ii1UsfLCAF8vQrvgLAv20Pkz5idL8xPdSCr788KvsIYq2Y

0SrYgFKsKusqwgC3zZS/aDaAyyzADKrK+XuBviCABqvErTy2AspIGs6XRmrwuJSCRElK3zTK0duPMThVz0HLSyLVS5zhr4gmZzg5IbAIwCc4VKNgDaAui2Sv0r8K0ys5Abq8QBOrMq3KtVL5S9oDjAYRGSDPQyq7xJbAga0IukrYCyvmt8BABvgcrxa6LPEApa85PBEPqGbpYmiyyrjfzv87wtIL9sCgukr0K6LSNeHAB0DmVZwwq4or3y6l5drk

IhvjrZa68rRWLTS2AtkgjrUiAwLduBwAciAswjM8LmQLOuMLAixSvUrqAFKvaAygNoCc4eAFkD4AowJt5YzSYJnRpVhawMvxwrEPyuRLgEIZgGLHIsisCLkG7VDQb5gDACerGpL+ubecuGJAkrIiwPHazTALutj2s1UEQM0ctGxhMA7fLURc4HInSu9QqwAADk8xGRucgsawuswr/a0+vIrd6//OALAi/Os7rPazHikA3C/hsCbCALIv9rNq2KCc

4y66uvUrQax2vULuG68Ls4E+KOvgmKS4U2vr7G6l7aLyM3V4UgxIILT71dNLbREAUC+oBjglC2Sv5A1iwqQarlC1Mz2rXMxqseNf4HuDqrKABqsKAEq9ysakLmxquGrGuPZsarqq2oAebEkLZvOgwW45tsrYgP5tub6gNFsKAZq+UsWNboPFuBbAa55sqrIQDIDBAGq2JAhgcuAzMSAF8+YD0LyREwtwAD86wuuraK+/MkrU64gs8bwC6AvULEC1

AvMAF63AvnCXGw+vzrIixgsaMWCwcvVeeC5otELcACQsAzZC9IAULIi2VtXzlW3fPVbLC1Gvzrvy9wvTrmQPwutbwa9QsTgUoHaDBErAGYvSLwevIuKLTuiouM06ixNuFr8y60s+bJi2YtsA4K0ev9LzSyUtOLLi6sveL9SzMufbj28MuaboS+Es8rf27EveLGy4MsLLIyyrgKrEOzkv/b6y00vA7HS+UvdL9tDWs1LkO9MvbLQO8kttL8xDjtdL

PS59t9LAy3MvJLE66boEg/0Lzh47AOzDtU7X2wjO07Xq7Uso70O00tbL+26gAPL+yzgtHLOQCcvPQZy+LuUgHeNcvtLtywjMPL/O68u5b5dJuv1bJa4ityVVlSCuvb4K/7iQrHAIuuwr1q0Osbrny1uscLQq0Os4rOuwStEr2G2Su6rfK1SvrrtK1lBG7tNIysa7OQCytOburj5OI7GpLyuUrsAFavq7Iq2Wvirkq9Ksur8qxktKr8tCqtqrba9q

sO76nHqsGrBABrhhTpq+6vtLlqxk2W7Xu4wuR7jq9HvVrue8wCerboD6u5b/q22v87oa3HPhraex1qj4TuyxuTVCa0iiD0Ka+pxprmQNmvcw4C4Pu5rHkwWsiLEm0OvlrlazHuk7le/WtwAja0PsarLa8nv87/G0QAx4fa+iue74e8OuZEam+Ovw7NC6Mvbb3G8gsCLUKzCsybB68KCm7+q+bux6Im5vtMAsm2cMfbAyyeucAUoMoAXr1gNevezE

M31stbTXqlXrrb6x+tfraG3+vzgLNM9BAbjYCBt2LYG07uwACG40Fnw2ALBuP76B0htYHqGz+swHAaxwBYb/O0pthA3a5vssbeXiRss0U4FLSC4HImq40b7IPRuMbOQAgDMbaVVfu4L6Kxxum6Z+/1u8bAixvt7rwm5Qcb44m4Xt770m6l5v7ytPJs4bbu4rQqbttIfsabE+FIfvzAi7pvbeqAAZtEgRm2fUT4Zm7At008gCIs2bGq1FvZbgQLFt

Zbrm/SsebDm95tx7WQBluZ7WWw5uhbiWxAARb1h3ADRbdhw6sOHGq04dJbKW/aBpbIezQABbnh9Fu+reW1luFbxW/rPFVCInSVGzz9UyWv1Zs1VUWzqYV0XWzAhflMNVhdItsVbN8yts1b622rsfzX8zs0CHzWxfutbYCx1vaz3Wy5O9bghyAcKboi5gtNewu+NuELwM8QujbwuGgTzbZKxUeRNy28wuPzdW6/PorW23/O7bnAO2uDbYi8dsSLZ2

9iYXbCi1EDXbtIKot3bhCw9tE7z26gC4rb25YscAlO7DuOLQM79vI7UOw0vU7Qyxoe20YO75tRLTO6juE7Hx7TsB7vxy8f47aO8ktz7WOxju47oJ8ztPL7xyUvE70J2TtqzFO7MsPHIOxPhjLDO1zuvHgO6zuFLNO8fuc7fxzzufbfO30eC7lXsLsFVou6+kS7kRJcs+VNyw0Hy7uy4rtvLU4OnuP7vy5JtAzWu27vXHuu6ZA8H7uxitF79+6itL

Hxu0XvW7YK7buKHqe2ZVMAHe9ntu7/a7vvsIPu/YccrwJwER4LwewKsF7Mp3vt2r9hzPtyrepz6tJ7mqxsdKn3J5ltqn5dBXti06W8adh7tqyXtibZe66tz7Ve7AA17fq/lu2nDe2GupEEa63vRrKpy+uhA/VT3uprwJgPs5rw+8md5r4+0WvSHtq1UsWnvpxXt1rDaw4bNrewCeBr7fR6Idb7NGwyuDrEpwLQH7Y658eTrjR8ActHqCwbvX7ch7

fvzEyK2bsiHz+3uvyHwoB/t2LX+2eu/7o+P/tszEIoLPNnc60+tgHcaxAefrJdIQf/rcB2KAsbSB7YsoHhp7geYH2B/BtJ4iG3ucEHQQEQeYb9u2AvkHfZ4RuNgNB87SkbHBwwcygTB9RvqntG5ZAMbdB5wfO7rZ4bvabTXpxs9HLZxwB8b150wDiHBG2JuT7Re7IecAA58wCKnl58ofhAqhyrjqHtO1oe00Oh3ps94Bh0YcWbpm4QDmb5h1ZtgL

Vh3Zu2Hvu6EcJbzh15s+biq+4exHDAPEfZbPh+FvUAkW4EeUX9h/FvhH2W8lsV70RwKtMXmWwke17wZykdwqdU4WENTqcwdVveWAQAOPNkxdn0SA5mHoJeY5mE0B8Q4wMEz9jOSLKBbA+AMRZkgNfc0j0cjkFgj6wLWICOjTsJK1T28GMJxRsV4gQMhJcWTFohao/hk51JFDDX334tKQ5vJP29oytO7jTo/uPD9g86P0vdRFTJMlDFbQpO+j4Bf6

PXhlCaCU2eo9f2A9oaXM22O9p4Mv5CUxEJl1vTiY171HzZIyfMKpOJer6ExCrTSMY2a4kVA1xRXDhDVjpEOw5hyVUC6qGIDISVDEo/0En5qgYubalp9GczgGjsw3V97bg8cOmYxosoN2EkTgoBg3nZDWL8A4+HWCB5ABvwJxZoojkMJRFQlcForvZLGtcCHA48oaieXvE2QMhiXc4JNyhvc9kM8NYk3w1Hj7oyePkSZ40dNEuJ09POfxDOfPNT+i

87wBVzNxfcBrzoFVirxsBdtgi2SJV+ZNlXpI8j39D8g5UYSAUAxFVazj+9oAPzwK+YcBux9RMTo3A1V0cBEvGzjcCnQRA03pHJJZkedN2RxlOd5k3viI1VuU0M0D5BU4TdIoJU+cJk3rMxTfzEBYTtUhucl81OKXuIYANM9vZEIAl9agIQANA6kDsD4AfQEcBviuAKHAJAygAm6j0IvT4MrX5l0Mj8RrOgJbBXYFVj7aJ1DVWC7x6WsHYNuB+oxN

jTcQRxT5XZA3Mj326MES0D9A6n3O4VUV/kNmJhQ1DnFD4XQlc+jVbUpNXjUBaWJBj0/tleWUd+uDcnuSMZiz2QwmmIPQJ70ySO/jFV772ATVI/Tnn96AA76awQ4HhDtU1Y5aVWSuAMrB6kREGHKzoyZPuL1GGE4N3NjE1xI6ijIJEMDmY+AF2DJAJ/BcCyg3d/G4wAXYHAAUAxS9wO6O+yf1N1IjkCBX7kA4ETkhD/YfFBaxtME2ikopTmi30EvP

GWjAwlUMDr3AH+tqx9Yr/IJ6wQvwCBU+d2Fd7cHjR1vQOSTHo6HnxXrA4ldh3yV8pMQxvXrI2uJt8FTX2BH/JlascT484HmR55OvdFOOXWzVYF8N5INZ3SN99PpjxZaFqLp5Zcun9O+lPDTUNysf+2H3wQ+bCn3aIC2KCMzMgsmWw3kvRfIe/lFbWeGNHGs6q1gdQw9TcazhxnXl2yf7VEez1QhaHJ5HqN1feMAF9CKEmqEcB8QykB0DKQowDsD6

AsoAPesgzAYtdyxDw9t2n27Ie5As6CJHRO75tGlK3tGBI8+Pb31ypcAihbhaFfdz4V7feRXh4w/cIAunrFd+3n19P3fXU8ylcQxi0qjmA9d2PoRnAihGD0pdFUMl0BJ5CPUiIEzaHDeg2CN/A8yDaY4ql53v/tmPSginAYxqoisGYgmcFBiKkf8FkuZwY2+XBYxpPWiDXHiwzdzu2Z9fvrTZfeRIHxBJIHQFsAwA1Q5qNLXfU3rdVwgwSWAsO30h

7maPElpZce1danw4zyLYMAyXkL/O3CLTIkfxMZDd1+/kPX3DejXPXevTtNvXe06eNej8k6Hf4dH9xHdiwWwGoUA3V0/u6lcdvJ9q5XXDDaICtlTFop2ju88vXZlGdz+OWTx8zneUjv0/ZMBEia2FO7eqRBqfVne+w5W00mIOEAlbG9G89c3AtJ89inmp3JVRE/z7VCAvaR+7yGzdN80XMlvTebPZThR30Rs3ts+66red2v1UfPvdHt7fPJu9C8S4

lkGc1j09U7tUT6wZnc2qdX3kuy/rAwJqD2mPAG4MNAu+F0C/rFwKg1yjZlzYxj8pUH9qQEgg5o/VwbSFlpIEcNK/QedQldd3oEG8SFd+OUz1kOzPOvfM9Pd0V8PN2Po8w48TzTj8Fm/XSOR/LuPwY54/3Bgz748ttLly+PmRUyUK8lgi9dc+5dtz6VdwPDz9nfI3QE7VeB9WPegD9R/kHoJVxhqEDLdwGnHxbEAqqDZIrxx0R2ytIKsG5LDXlrdu

1jXMkup24TLURcAX+NcQcA5IykAkgQDbQPoCagRAdgD1P1Wf6k0hxEIWaw0KLMOmohiJK9UIEDwDrnDyQNW5dVkLcDOG/Au5O0Zb3qFbEI2dwBMOCpCEzx4X6Jwk49dzP93RCOmJY/cs8fXqz+eOTzhry49QFASuTUKPOTqtrtpJ9qDCWlAIGvM2vkN02JsWP7Ix3QP2jdebuvIfFZNPPP0zJJfupZULXmwfTrlpllziJ28zh2ib2/hh26Q5SDvR

EERB2dJdQ8CdllD4s4oeND5Nh0P+WpUmMPmHrB+XlHD2xmsPd5T7YZGZHk+V8PuE0CBUW7IOMAo5vU0XPKPCbQSRtN4GPwN0TxhWfqjC01FWwXdgDMSiJQFPbIY/klxfJ7LTyr89H3Xk72q+iTM777ejz87yPMrPsk8AWR5ik5s81tRoVJc1DgNwc8QkMdqiTV1PafHf6T2wNFmwkERmE89tN757JfT0T9VdPqxeeLSDrXOPziizpkHLR3CPOMnB

y0MGK+vcg1n3NXxI8uHphBLv88jNZQ2CwDODrQMyHMuVxi+EBy4Ln1lD4AcgHpuozA9OyDLVFyxC9sgcm0C8+SpdOZ+LgqMy5+2fLn45+yLzn/Z+ufMAO5/s7Xn15VUz/n07T4zxOyF85A+X+F+RffszF9EgcX1LsaniX2cPaLVNwi8lVWR8i+5HjN9VXcFnRZi/FH3JUaQjNq3mZ/206X1Z/5fWX/l85feX4gBy0VlW59J4nn/MSlffnxHh4zWt

M9vVfYX0ED1fYW2LRZQsXw5UtfO+218KHgt0MVgNIt7S/QNpT9NGqX6AEYDbgcAKHCEA4wFAA5ImoJqBtAe9PQBbA9AOMAzdahTrfPt+fj6LzWkwbuUtgVH8vcSYLRuxaiYfkGjDHX1o4+N+XnaJA/Ip3H6JqWPU7+q+CfVj4s+P3719fLifpFYiPv3/dWu/bPq6tHdA330sK+rzEY4nfxsyJPMJxtad10Pw3GWSKq9kViPgChw4wEICLKmtx0AU

AmADUDmYgLQgCERzgOKl+pUqeZoyp3vXe9evsTygmgTCT/dzpFujIOGJ91wLuCo4e5BmSwkJY1xP7iJnGsMCASb5sMpvLU+Nf0Jew1nMQA6kPExsA5mDsCpuzALCy2wQgOMB9AHAAPfKAFQir9qlELQZwiJ6LDnAMcEQglAy2v1eWDfS+D+X49Y04yB0lQogkAzngIoVbE2xatv1S6slAyq89zfHxtM5D5j/fdk/Nj+YmB3sIy/fejNPxs90/n91

AW8Fez/gZRlu7kxmUueOSB2TWOiGvPmxGn6KyCWe5JPXOvl76K3hP+n59Oa/iDzE/81KD8+9LpwtZWUZJ9lFn9JcLojY5tGUWiGiF/Rf3R2tw4H0h6Qf1D5+lrJTD8MRbOMVEh9+1+zoHVofIdTxlYf4dTh/u/BwLpgP4QgPjII/uvllri+0MIMMkOND48CuF+10/Mx9MYPJhxrMShu4FaM3LpUhbck5cj9H+8+Jtfd1pk7EfbqT8h5ks9RPou8q

fqUNW/uwNmWiiNrwnTomfop8iSBkUHCKP9QHkncUVC2wHjFA84enc9D5ojcongBNnnnZNVvBqd29tStkvoICY1sID4XjKZEXswV5gEqYUXnkdIcAN8BmkUcuSsM0ObgICd9kICzhjd9QGhPkRSqLdp9E98xupLdRYML9RfuL8ugJL9pfrL95for8nqj7ZUBghAtYn+9bskeY6JlNRhkpfYqoG1REgOuM3LkVA57tFl/1NWBf1EuFS0PuZizGtdxt

HCUlXgz4ePtM9K/rgC77upYA8njpyfgu9Kfs381nmQCmWgaFoihDFcDD/de/m4lcnLGVYSlWwpWuDcN5jDRXNJaUPgqZMExrA8PpkeBDPrwCH3lLon3oLUN/q+8Rah+9XEP4CZPOlwlxOWYgMgB8wge1hMYJEC0UPB5GMmNEIPrpgoPjf8DIvQ9EPi4QH/oVpYMpVpRYG984AB98vvj98/vgD9Q4ED8QfmD8n0lhkzar1oVyh+kVnDbVy4IgCI2J

3A7aqIlenD+k0rPFApqPBBmxAxlyHv39j0s/9NkqsD2Hvs4ashh8eHth9DAV94sogcAq5DsBdRIXNwSL5AgNIFB2QuxQWsGOFi0BJ5JtJYwJQiMITSnqMSwB6oRAi5RVeugQx3phU1pvXV+Pv3MvbrX8CAWkCiARkDg7q/d1nuQDcgYPVrwhS9u/plc8oAJY+0HpNsRvn9x/oTkl4iNZdPte8mgSNgl/kZ9hKiZ8JiCxBcthPglKsl95Qa3RvcJH

NOvpIDuvki9yqqbN+vgUdi9FbMVAezcyjnKDOToqD1QcnNZLjS8I3HS8I6h3d0APHB9IPpBTgLXIegKMARAF5x1IDAAagMoABgBQBJgKpN1Cj0FJxgyFm4N9JrHHlxUYIUxLgPNYawBDp/1MeRbbj8AvOoe8y/nEDVXlX8nriT9aQVq9CATq8xPpkDl3ga9ASjJ9rwquZLeAp8B/nlAkAT6JSwGvM/gKkU1+p/RO2rz8zJuE8BfnYZeyLCx8AD6h

NAEMA/IpghCyIQBaAjAADgPQEZYg089ks/41fvVk+2lKDWgUg9/eooN4nlKgJAI5ISxj1FiIOCw4QlXYsgoWAP1F+RLJHgAC4GogNOJCwVYMU9U3lLp03u78/QOCweAIvtyoPCD/BHios+LTB/IMrF6isvcIOlIEVMMm0C/LDo2Jj1hoIlEIC7DuVpalgC0wQT9ePnb9MwdO8B5vgDcwfSD8wcQDCwV9chfJeNSwRDELLPJ99nlWCJ/nW5J5Fa9H

evHF2KuQgdYBaEwdHGN6ga69GgZncPXgg9pQXzV+AczgvFjbQ1QW8JzhMk0BcKCJuIZPgJVvuAPZgUCCbqt42IeaDOIVrQpmkDM7hHxDAgAJDB6L1UNQca4H6qlMGSjICX6iqY9Qei8DQcoCf6qUc/6rvUqUOxDORCPQzlhwdpIbxCpIRHN5IXLRFIZaDqXiWEHvjIUlLoz17knv4GIhQBk1BVAUkIOta5AMA5bqvoZRjUBqAQo8QQQiCjOAVBwC

LmgFMIKDvwZWBPyMNY6eKG0+ZPY51rtWIVMF8BsBtj8FCGJgC7CIJqwJL1OeNgDKQXBDifghCcwX7cRPihDGQVP19XhhCfrvT8DJI9ZN3pODt3jEYkVHV1EgI69wbg71XxuRDuWpzJARtkVxBm68JQTsJPXsv9jPnwYBanpQugdxgegaZQ8Rj+l0oUyFYhE2VeeHlCF5BkVqlG0AL/j5Qr/ss5rak/87/mRw1geBYn/m/8DnMHUpwVw8Dko+Uv/h

CDcJt2Dewf2DSAIODEQCOCxwT0BwfgIko/v1NySFJ5AeJNRa/Mvc3tH0Z/gHb0CRtv0TSlYV4JE4FnKI2gVrBK8Jsloh9CEC4e+kCN8fisEhJrBDEgYT9kgVjV6/gHchGnjUSASHdsgRb0tngZIfbFyCqkhTVW0r8DSgTKYxWIpgAnnld7pkjF2QpxRosmKDfLPc9b3o88tfqv8BDFWVuMBWUMHhFoayq514YY68wbuIYmsIdIdcmjCLmN8CmyBQ

9L/vMDr/jcDjoSsD7/tBl1anYYakjkBtGI6DnQa6D3Qetlx7N6DfQf6CkYGcDukkkRSAEuV46P1o1yqWVv0kDQrRAcVj3JkIRtJ7CIYd7DJ5ACAfauUlLoa/9roWFDQ6p/91fPS9cJspAhgDkg01At0fbPPFfynrdVMFkwXIFdF/2h8BCGj5A55EiUeqO/wkSvIkbyOooeLKy4JLMB8qOvK89QGSCQRhSCZnqVCBPuVCCYRJMiYdCNG/nFcmQS38

Lxg1CO/ts8YHLhD6KnGUW+oVITno5YM0E9NdRl8B+JNRC95uzV5/mNCWgTZNc7i89VvImsMbo19DvHI4CLirggiOhZOtMl9N4cTcTvqRBDDul4mADAA94Xl5D4RUIH6sGFNQRkdH6j18dQS0VUXvkdtITwVDQXpCeSmoDmcCfCwptvDL4bvCTNvvD5iHfDtASnNrQVA1nIeLdlsi98IAKMAugLOQ2em0BZQDsBOVDEweADUEH8LhAASCa9vBpD9c

BsShskoVIOjAS05Xnn43PPx43LP4YhqB55bbnSFC7HEFgPtY5j7jrYAroS1M2p7csdET8W4TSC24a9dkIe3V7Hku90IW/FMIb90jQkfV0rlcEbLD4CcuLbliIac87IE9Nj3JMF9HsND07qND6IQLCJoUxDh2kuCQJgXcWcBUhrGM/pkyKq1TGM9wSINbd3uEVBUyMYgoYReD+RiNdBRlhM27l2RcJqMA8IPQBJAGTJNQCxAugH6AUkHxAY0F6CWW

H0BGfqFDReunDPQGJgxhPiN2sF0h6sAyE57ho14SN2lXLrVIO3LYgL7HBBPtCtYd7MRAD7lnCDlP8MoIdjCXRvwjqQXwihEdY9bHqIjdXuIjHHvVDnHgPCDJGg1h4dyC7sGBoqyJNRKgc70r3NdEL3hwDdEfzCDPvODV4XwCpdD69VUmBNW8BnCU5GmRP+pCwqoI2wNOMhBh4KUpsAIAFvtGj86PJeDnfmm9ynrhNd8OVAOgE0Bb8EZAugM615on

0ApHlpcUkGy1YkbrdyJtZ1+EO3AfgOJ4xwi+RgGLvE+LKeUPwTZl4oclBfqgDwXREkN02u7ceEVUjZQltMLHjUiGkXX8mkVh0xEWTDmQRTCpEZUNRXIkB4urexzgBcoVEZPCMILR0LGP+QAEtoi+fkvC9EVMjBYZNCZQU9J0enVdQIomR1OLoIgPprA67GmRsgjWxoenoh6HMYgpQu9YRUliwJ/Oa0zBO4imxp4jXfq2N7QWqAd+EkgOAOD4/QEY

AuwAcA2AFMoOgIFxUkDI1QofmZ/BCWgn9B8AgaFolWBMbk4MK7U2qD0hTug24/IE2pgPmBCDooBDsoZM9brumCK/rjD/OnuNEIZVCYrs0iCwT3CsgX3COkVTCqoNu4igX/dGYbRwsWq0gnyKP8SUUndyEv48hwCZMF4TA9aUZMjF/gyjDEUWVhYa+Zt/q+9xYe+99KLClHUT29XKC6iheMBYZgYN05gUs43YUsC4Pj2UEPvB9mHrh5WMps4gQQCD

FsoYDnzOSAYAOhYoYK5CCjLOwiQPpBNbrvgmgG61zMOI8qwE0AjACYAfUP3EzLrUgypK3B0fn/E7Osbk3+M1hOKmAkQFO29apI/QhQuEY5uNWQvOmMh5ej28cuBkF0frwjZjHjDkUVp5hER3Cy0tJMMUWhC2kZIj+4eGj1cnIiF5op8GEcEDP2PZpYSMv4LlD2hpWLzDc8lwDInv+MZkW0CariyjfXosj0AHXFiUBpwiyNpw7gGHJNYBYi6PCk9+

cjV09xEDJK7KyBjkWLdZclHwbwQqj44NkAhgEcAY0KMBJ7sR8EQdy15WFg54aATlqDCEN+0F+x0uDog2eKsVkAT1gMuD4Z5MIBZW5iSC64cVCm4c+jEURVDhPgGj0US0jMUb3CV3iWDpEfpIxkHEUaNLnUa4VPVeAKX8yIfQIIaklB/2K2CGgVmj4MQxCeAUhjFwSxD9JEZCa6JFVTvoYdjvD5hoVoSg5aM9AzGgTN8ZvypcAByJOAJwdMiEEQut

jsD3JoPRmDm7tcALd5vhPE1RXK5jRaBpUPMZLNvMdYAxAH5j/oHABAseXRk0CFisFuFi8vFFiWMGZhYsa+dy6Iljn4Y/DlIR01pAdLoGbhN5FAZbNdITbN9IXbNVvNYh/KGlj3MefDMscQAfMTlj8vAFjHAEFiisaFi7QLzQyse98YsXLQ4sTVjv7mIUqXsLcYEbc1Hvi5Cs+kANKgE0AhgPHA4AA/hZyJIAhgF2BsAPHB41IZBkgNOQY0D6gKUk

QilHjqM+sNUpTUR0Yr3GMF3KHTILyMzV9FHLCgIR+xV7vGUvnHxZ0YNCi3bqkMTbpjDYgdBClMVSC8Acpi53qpimBl+jg0UWD2kau9OkRVB4ukr42zElA2YaoiCcXa9PtD293OtZjaIbZjcCtwDEMcF5UenMjUMQsi9fqLB8yOAEEEKDwrEL8AMyMrBeRnogQKtWA62A2wGYHq0sWJjA0rvb8+ugKMZUaN1hRge13ftdoDLvoB5VL6lgAU08g2rr

Ez7IdIQQHjjK5tZoTCp55hBOn8DHhX4KwD0YZuEVCyBizwgPlbirce8B5MQkCfUTX8UUXSD30cHlS2qTDv0XVDf0WGisIcWIQoPF16jIJYxWPWCOfqtxOqH9odPuTj95pwCqcQhjKrgMN1IaxDA9gljCAMCtkFsusxTj892EMl8bhFEtk8ani51unj+1pnjCqlXkqIOSQoPBXidFKZiabi/DtQd01dQa1j9Qd/COsSUc/4SaDRIUnjQiPnjGFoXj

0VsXitqoKUHIVIUnIVeDlLmdU2plABxgFVRcAHxAiQBcAFbqL8/QACQH8PgByABcFJwQvF/BBRC2kJKFs/MeR5SEWgDCMvF17KtIy3BDcv+KJZb6mSh5AifFnaukNx3vjDm4XUjZjHJF/Udq9A0ahC0cRIje6pTCfcWLAXIDb0nOnkx/scZiH8imUDOLS4Usjc8o8RMi7MfojGIQuCV/mj0A+ozjVwegAVDIahIINYiUIDYgixqDwcbBmQNEF9wM

bFXcP+JrAxcUNcJcdKixovu1R8aOjUeDkhoQTAMGgDkgfUAkAYAM3IKAO80fUA/gWrMZczLhRCTlDMEAbLuV1YiXAqSPL1f1LONioJMh5wilDrrqxMYgU9FYcRmDFMRmDX8Spj38Wpig0bVD1Ij/icUZQC8UT101Jhlc5Gpy0/sSFAjHtR0l7ojFaDKiFGKlASXXjAS6IdmjmgdMjacbZN6cSgS+Okziogtuog3grAawOpwBkS75AQOLAoApBBrH

NLBwAhpwDGBKj1hlKjk3gN10+v/14EfQTkNAMA5rhcBPWvHAepqFC04eRMb2Gx43RIJoy3GITG4BK9ECK/xjYj8AnXkbjM/hn5RkGMgXIAVDFbKmlm4PtJMEONp0fhhJ4UeJF4gd6jPSuoS3Yp5ktCSjj1MR7i9CeI1f8Tpi8UV4MekWYTCEIagpgkmjCENaFZhBRDlMKE9I8YvC9PsvD3CSf0RvOtAyprrNVzISULQCcTPJhqCu4IX8akNS5RAq

mDn4apDjZgniWsZwVmboN9aqli8usTi9WIZcSecFAirQY5CbQVti0iadUM7F94J7EMARMPQAhgJgAeAGORcAN79lIBQBU3F0ALgFHc3kcQifIGfo9Rm2VqlBQMQhpT5HINME0YIjVMBq4CAcYJRj3qhUimI+jHYg7iNXrO8S0mMTP0RMSv8T+j9CX+i/8WohUAjQD8ISWBbRK+x+QaATkyuP9ouObI8VLBicCgdxXQivCPCWvDkCcuDdfmgTXsAQ

l7GLOBAQAWRiyDWxMyMDxnoCy49UJBAQgMFBK7FLAqMXKj6ettjrBgqjpyESAhADKV9+D6hL2m0AH8D0BJAHfMYAMkAY0D9DxbO8j0/ERAcfGlBxrO2UD8few9RvBIJkPUhc/Bn8P2BBUr8dfiKfEv4+ifbFswfDikga+jGkQ38SYUHddCSAVpiQYSrAmP5h7Db0pLCWY2fso0k0bQZi/IXBjutKT+KrHj73k5ivCcqTTEXcBpYDCxUIKmA3IJBA

UhAYx8yDkFTGGig5FAU80IKeULSVLlhunQSdscYDKgOvpPMAMAoALOQN3uxijUYbFs4IIS8RpZR7sgco6ZB/gsupZRjOA243tLnC84L+xmzL5d25jUxxWDOFAeM/onOobiPUSoSvUci5NpsMSb4kjjWSV3DUcXmTJPkld2/uGiNmKa86hp2kgoI+RV+ttdxSTzotBDvNygPGMKcXsS6UTmiDEUYjnMUSUAwvmEy8mQUMKfiUTXKXjI6AVAQOoTkI

jFXBLyFIC0pq8SG8e8SNTCzcf4Z1i28QZDsKRhTASUPi9ASPiTkcMVx8e79Q4ClFo8PQAd6M+Cq3sEJtyJXE5uLFxdSlDpYanACu4MOTGPp2g6Qgcjtoebja4dPV5WO+0lCMCjdbHbjBiW+TfUYjiWSXmCP8TVD/Mt/iCydyTZib7i8iYBjKwbu9PHhxpSKav0t7igUE2H/EQKsg5U4rP9u2uKCkKW4Tc0ahTcSqt5RgCCZ+elCZGTPaZ1ID7o5c

A/h/OCFS5cE3o+IMlIoTCSZ+ev8Yg9IMAugM/N6zmD4ugP8ZvaLKBd8EkgcqTFIW9HLhZFl2A9dLKAugMFSckH6AuwDGhUAB18sKczggqRro4TMCZwmOFTIqRwBoqcrk4THFS+gAlS2qclScqbvg0qbp1MqeptsqblSrdAVT1IEVSugCVSOAGVSKqVVSNdDVS6qQ1SNQfBVdgD/gJso69lrFqCmsWngqKe/UPiUoDhvkaDsXkPkJAC1SQqe1SzdA

/gIqTHoeqbFSOAPFTEqd7QpqaNSOAHCZxqeocvqXlTZqfNTFqctTTdKtSWCbVT6qY1TpLkLdHvI1MRiuxTqMVYNIyE80FUaoBFospAugPlhBKX2Ej3GJhL7JlCn+v2huqHuYeIl0hK1JzxfAZn9pxv6IgrvQ0ryWI0nydUiBia+Tq/kyShPp+TDKdoTP8b+Tgym38OBuGjH2vyTbKSMI7IK9leoY5YaOkKCbNHdkiUfWTWOr+NK/O8CpodKJi8nL

g7dKgAuwH0A+gPLpg9JCYuwPLp7dAlSW9CbockBvwQkWD45qdiZ+eg0AfILyZUAA/gWTEbTwmODSckLIsckOZhUALOR8TOHo/QAlTtAGKYuwMFSqgIWtTaebSc5vLcugBHockBaZ4TKrpMTF7o5dOAtw6TnMEqayZYTHHSB9DboW9F0B1dCCZOcJVS8THVSFAM7TC6WtSrjjlTUjkljC6OrT9IJrTtabrSKqfCZDaX7TwmGotI9GbS+IBbTI6dbS

ugLbTnAPbTHaVCZS6a7T3aZ7TvabbTnaQHSbdEHTG9KHSO6eHTLaVHSkkDHS2TJnSE6Qrok6Z3SQkanTzTGvTYTFnS26bnStdH0AC6VVTIaSXTW6WXSWCRXTRgFXS6sf15yKWpDmsSdSspmdT2sRdTf4WN9/4ZUBa6fXSdaU7om6QbTfacbT26cnSu6RHSrab1T+6YPSnaVfTR6R7SvaT7Sp6YHTg6fPTwGd3S5qdHTY6QfSN6TXpt6df544GnSc

GarokTDnS86afSwaUXSY0JfTjaa7Tb6ffSRjIPj1scCTYEdOTYGipddsRIAcsJoAUkLIBEkDjTdolnDxqIIxxgWSTj3ofjKyE2pLEdS5HAhj8BkDcUzrjfpYhH28OPkYp64atMb7rUiEcU7ikIS7icat+T2SbzS2BjkDSUnkDfceW9w4qYSNJu/gtYAzJRBj2kC/G212Ps5QxkSTkD5jHiPXqDBjXIcTjGmjcG6YAzUANFI/afLou9OaYEqfLcwa

croW9BHoHabKBIaWrpfmrkTCTHHSnloSYRgJ9SGgGEiOgLLo5cF5jV8WbQORDbANNiEB9APF9mACsAe8HYAJtt7QAANT4vU+o3wv2a07ZwCyrFUFcnCdZ8Qhr5WQ6xoyQkypeLS9Zy0AJa84UL5TfTrRGnDWnH8eqkdAczA+oMYCq6VpmY3ZdbcQ3QCcncuigiYZlhTRcDxIPJn5EOcD20d556ABNzlLW86LM26ltUi3Q5IJJApIKhlrU6gAUHSC

4rEDRYjHAWhZAVvbXrenbXQapqbM9UClMsKa/M66DcQ3Zk0oBJ4+QfFbJfLWkAM4PTBMviChM6PTQmCJmR6SqnRM8PQm6R2kJMzl6uRUYApM2ExpMv0AZM5KnZM3JkxmPZkFMnzBFM2M4AssplS7Cpn24apkjHOXD1M956NMsBFRfUWYtMtplrMhs5dM477cQ3pm8Q/pmszO4SbM0ZkWfHZkcASZl+gaZmzM+ZlgspZmpeFZntM9ZlDMzvAC0bZl

GnfJmCAfF5HM6VzZgU5myrc5lQmS5nXM25ksE+5lgXJ5k1M15kD7ORwlMr5l6LEGafMspnt0J1lAsklkgs4IBgspSEpTRor03V+lovd+kYvUvTfEhindY5nCQsxulBMh/AhMqPQW6BFka6JFlwmeOAxMtFnxMjamYs5JlhoXFmkrdJlJUhUZEsqoDAsggBvLeJAD4eYhUs8pmVMoXD0srRZ1MhpkANJpnHfDlli0LlmdMqyFsssyEpEGQAzNPpkM

gAZnCszvCis9Vl/0qZlqLGVnIIuVljVZZlWQ1ZnK7QZn2LYdbDs91n7M7VkGAXVmQwOVmGs8BZ9AK5nqQG5nX0nJDmsiQ5b7GtnDrN5mH1O1n6Ab5md4Ctkust5b6AN1nHefjpes+yEsM4fEgkuBE0YjhlcUhVGaAQyANAFwDTo9RynAZgD6QBID0AHJD4AeOChrZXF+k7EkBCOaxlQSzFKYMuLT/CABAEYGDUNW9ipCS8jHo7gDJCJcJ9pJQkCT

T1GO4p/E6MzMmoo7Mlu43MkmUzklmU73EWU//FojYClA3A+x9GWGiIFKGCQUszGNwP8iplMtQeU8ZEuEuAn0o9cTCtRlHMQlskmI4YYQATGAGSYmwtgHPC5w4pSpkGkg6CKCBiAGGC6CJ7gzoGxwTkoboZ9a0nPfLhm6kI4BqQZSChweRysIM9pQAFRynAIYBvUuADyPDfFxI/oJX8BKADIm9jM6TpDQA7bptiCkikNN5wiCBtxhQHfEJkwkluop

GopkijlqEvSm6Mt/Fc08Yk6Eujme4rkmMc3FG+44ibWUvCG2UsZBTDRxyOUpgHxsU8x8WO7Kw9dxnR42Ulzgsaj9oP5BVXJlGG+GTk0jbtg2IMNopyQSxoQfUlWIbQQaILDEZFcnoW/SuyJvKglJE3/peI7mLf/BVHl9VCCoktgADAMwB6ALl49ALsCAkIYCSAOPITjBEGT/EtyoYcRK2IZvoQVJ/oeeHciccQnxGYhmmpCekkbhIYnxcyjnO4tF

HJcnmmpcqYnfdcO48kiFhxFPnJo/OGixZCeFIxbpA7dCqDy0nob6I7xn1c5rL+UlDHeEpQa+EpVoEKLmYNsFvoqoSIwDXdhwwsGCA6taWDEEsZDmcMToLXBInDaTCI0E7CJI02fRfeKoA5AIwDxwXhkrYjfEFEwngHXJtQKsQFw2MbdTdUbcSfDMuKzJA95yUlGAQVdKBEosDxtE664aMsK6Nw+3G3csjkaEzmkiI7mnGUj7qmUt7nSfJjlqIQMG

0wmxlYSLmTjyZPIegf7m0GJuDDpCG7UotsGIU1wmSg2rkScqTkiVCYga0zUBQmQ0SwmTnD28+2k16YOkJM9Tb+6JvTa6eW54mWciNpESHM4O3kO8zExdAZ3nmmJ0xu8xvQe8rExe85vQK6GgJ+gf3nesp+kvEl+nvw+QHV8L+FDfYNkjfVQHt4oPl10l3mO8sPn66CPlYmKPmy6GPkN6APQt6X3lJ8gPlMMtbFw0+74fs9hko0zhmzkiQAkRfSB9

AGoIwAEjr5EkAGE8IV7M8yAgTAk8CqfahHUaB8hnXHWDDwWRIMFKknkDQ/SOvXowQEemnCRG7pi8sx4S8nSls0tMn3cvRmPctkkpcxXn0c5XkAUj7kXTdSZkdCEj1sCjowlWyDAPWwmrcATHivOcYg8iyZg8urkq0yMjF5R0xYmYOkK6FvSF0hJkb03EyCmJfGN8gkrJY9ACAC9qmy6EAVUM8AXAMyAVumYP4p8w6kUU9PlyArSGBsnSGf0+inf0

gvmVABAXAChoCgC8+kbUiAWumQkyYC19kt8jbHpzDilj4iEm4TfQASje7QwAegBuPVck0hGJIFQdeznGOcZ65PznUaG5TZ1LBDfaEBR88qbBzyBGHA9VpA7QpcKdzB0bi8rRnpkx/Ey8gyly8p7kK8w6YX8qT5X81Xmg8HHHiM3OCJ3DQhcctPJjUKOxaI+CnOEynHVcjX6W8nxnx41G7wCp0wUClvSH7J5bkCxvTICg9n66dXRAC6PkbUz3mN6e

Pkm6OXCagUIWoAGNDJSEJE0C5BEP4Akyms42pxNWkzeCwIWUC75ZjrfwU5CpAV5C4IVxC+EyIC9lQRC2PlRC7XQxCg0TxCxIW/NcAWpC9IUHsrAVPE31m9fTSGN47PlfEvPnGgxinNUooVe6XwUFC0lYBC4oVUC6qkhC8oXu8qoU1873km0yPSxChoVJC5oVdANIV8QDIUsUt9lsUtvmsCufI/sxBGzMnJBKZfsH59IYD4AfQCy/HJA8AeKTQclc

lYkp7FmUTqg9GS1KBDZsyY+BrAJI12otgeCToQRhGUNHNCIpKNhM0hFGqExkmH8nQWjEpLmn857nn8tLkMczHHhoigka8u/nAENvq68qbAcwkrnXsEQRU5HYmZos3mic5Cng8oWFKk5rlsoiACtzfaTTDFQwX2PyAKwRxGc8FVBlgA1ApQMxiBg9ySJEx37JEmXHt8owFuQ1bJ9AMX5sAHgDMASVyzkA4CLkpoCtWXPrKQfQCYk1zn+k9gI/sFOo

gwXcj1GChrL3GyjNwcbQmjQ6RAddVi3ABLT0cPnL6wUiFuoxQJtzaHHKE5mkQiqXns0v1GaE2EWGMs/mGCxEWX8gWkfc/64Vg3LlMwvZiwpdIpMA0BI2C22SX2CGHKsL/kRPLxm/8yTlQ88KwM4nwmqkssAuDCsB2QB7iXAYsjVsHTgEKOySKKR8h6tQsCzgNMh4AAzm0Eg4UzkoUXKICxbJAWch6QVaL6AO4WkhGoAIAACSSjCl4Q/Z4UN2T4Dy

YIGjiJIiDiCi/RS2XiziWGxxhDGIbbSVCrpca7l+dR0VQikYmB5V0U5kpv4ckz0XGC70WmCpUUmE+RFsczKy1YOsnUdNRHj/RWEMdY1wm8mzHEizxk/8q3mIEv/nFsJMWw81UmLkPCDUKWIS+iXkY4QPQTqcXcgGSWYYPcFWDgsd4ingcsWk8gwHGcwUVjog7j6AfSCD3AYAGAJoDJoGoBqjUYDZgPsZNABnJdiyca2aZuBoA3ND1IILwVqa/j7S

Y9xfSIkhGiwBjaiqLnGKe/Hkgw/lxc6XmLi1IH6MqSZui+EUei17kbiigFFk3TF08ncVAY/CEBGM0pWCljgh46JQhGOITnixwW7E7ynm88aFki+MX5oikXUjKkWzgY4BriNMimIcxBY2JKDsOWEAacZHBQeQqTsOUGTGEygkbDYnmDdCsVk8zOb0Y9hy74UX5y3PiDmYZIBwDTABGAHoA1AMODpmMy5o4GLjQtWQK6IbxIf0S25ZoKshfkQUkAZD

zp8Yt1FluWcWvRecWtwo/mJcvQVwigwXjzTiX/kzcWZc//F8ChYma80BQ65LJIhimphE4pO7/AfqiEkCrm8VETnXisTkKSvNGnzYxEqStBIQADVjmIcxEpyYKA54IybtsCFg+YVOr/QLcRokObiFgADHi4iyWcxbCZ9oiCUadBoAQc8Za1We9qDAaOApIUOCagZ0FsYp4WTjdEj9yZeRThP4XlE6jSVwbOBfSW3qJZPDkn2QtRvOVTi/VWrBCRVC

rWim67qC3fn0SyEVJS6EVLi1KVsS9KXwjJXlcStkFEdXTG7PP0Ujw2+DwQOMEZBESXcMfXnAKTBBfOY3nSSokWySkkW+U8Tk+MyHlKS6TktSoPoQAcSxEJEHjV3djyYQXQaYwB7hThbuBrtZCAWIGyTtsUCUWDGyWfeXCYeCIYA7AEOBK5QRmYNZVi7dUDRIld6z6PIAg2OBKG1zcKBgY+cIsOJISTaN7IXFIYw788v6cNEqEMSp0X6UmEXfSlcX

dw4xlv3fmncSnSK6YwhH5Su/k4ke2rA86joOdIUHz1DLhsAmf7Cc5wXg2UPgNShMXCuCYheVdxbGQ09nlsp1ly4d55gvM2jxrS9l20e2ju4UESUACNC84LrwhAD3bPQB5mibUICFfMmYircgDFLOebnEtFo+fZHZuy55laLD2X3sr2Wgve2glsv2W3stgCBy+XDBykPwGVcOWe0fLzRyl/axywlCxgLICJy7EASAhrG03I6myAvr49CggXN4ogWt

4kgWDC4ZRpy12UT4d2WXs3OUY3AuWUsp1kBy72h3CEOUVyqNZVyqOVgXOuXxyxuWpkZuUw02766AiBryXW0HS45f4EBfik8ALsANAczDMAHgBVAfN4JAUR7X+TAA1PbW6CsNzmvAa9hfsBCAywDIrVIL4XNIP4WOQZokQdPoy9E5fmV+EpiKYee5fkHjlWigHIxcjMlKyhcUfk3QUsSp+5ltDTEhorTHRdD7mPCnLlgy+IrfkYMlYioaiNgwZ5Gl

S8lwUmiFOCq8UuC8q4OyxzFIE7GX53WTlfcJti6oOYYpcAhQacMOTKCIGTCY4qA2/GuK29dmJuIsbmjXaaUjdR6Hu/HYCSATACjAejxwAZwAvIigDqQegBZuGoBxgXADbZMy7WOByDKEQ8kloU4zN9Quq2aTKG08Htx6KA+JkDRszxSlzK6UxiUIK1WVIKin7piSYn5kr0U6y8GK+4uT7YK3pHriO0KEjeGIOM1/kVOXgjQkRsqEiq958w1GUW8n

+QDgckX0KuJ4qkxThEJCqDmcFTAgsQriKwGsDEKSFhdwSFisgCCAngUiD2lJyD0yqcmVim0mIIvVDW6LoDfASgDjALAADAfuy70AYBKiJAaPY7CUgQ7UrAwMFJXdafnFoCcKoYWeFlMTzwF1B6UNMWrBWKvNoH8j6VMSqdwOK9IFOKtcWZS2n7ZSwwm+4mJFeKxYlueUBQzUBsH+KsqVQ3NR4c8RwmeUj3qwEuqU5o6JUik2hX3i0/oMKmkZloQA

K51VMA1xbuCNKfKAlqIawvKvQRmICpDzDEpVGcsEnlK0znoc5gDjAC4AkATBF1UssA9gikRsAczjC9J+UqipHAlROaZKKVtAXk5vr+AjHw9vOCBIpeokJ5bJJ44xfk4IUZXc8V25wdWFFpDYjmTPUjnKyrQUvoz6XMSk/k/ShZWaylkGmM06bLqB8HxdSAjUZW4CrE3ihCDJByWMEMQXihCkoy85X7MNyitsWhqxK6Hmtk2TkEywshGklORKwU0l

jCJ7ggBBFjAgGCB6kVyCwsNRBGTeYmE80sqWSkp4QSmXFfefQCdyIkC3tDtijAHoD4mBoBEgDojkmCgBVAX0n3DbUZVYACoYwUhHsobpCRtQswRDKSwJIgJWxk2EowwG9HP0SeSOBKvxptCHFBXLNqmPeWV0q8jkZkxlWzK5lXqyn8kvclxUAysxnsgvFEhQjZWa8nOGBS/7nA4CWlJ3UG5/4UVVIy8JVwYyVV5wcPiVYeUgNc63mJimHkrgxTjm

kQTpHAYhSAgC3wVgGyT5kQAI39c4A1sX9g2IMqAIIE1oGc1u6WkkUaIInYFvfZwDpLNoD3+TyEQILRzJAdaJEgFjltK2RRsWMTDhQTKzuQbqF0TKqQTWSgS+iGHAUS3KQ3kopjTtNFXg4ilWQ45NVYw8EV3cuBXTKuxVfSuZUMg1lV5qv8nLKtxWQFf/HCQ0tV38pAG6xYs7VqvUCxJQJXVArMUQA0JINquf6UK28y/kUQRtquVVdqhVU0jNGC7g

Z+hJQZORdSvCC5kPABGpSfkaINvoWSCjFZBLkUO/M1UCiy1W4TKeIRYBzmSAICn8CxHx7MACo6KZtCZQ9ym9K+pBZMS0o/0Nt4j/ShpbkQ1KooXnRKUyCG0ShuGaC9NXaCmZXfRZBXu4xZX5qrKXga8xn/4zkGgy3pGfAvFT7kStW3wWCnOUvOqCaVTjRihf5Sq1tWyqxSVNStCm6kSarEAPTAxmdUB7gVqBNUlMCea7zVjgGkBl4KDUoiSgoGzb

AXP046kZ8/AU0Uz4ms3foVXUxqoeau3BeaxMAhaqlb+areU6A4Uq7y/QHHVcRUKonBEGXWUBwAH1AdWfSA5IVJChwXACgDTl64ATIVgtJFVVYDPzBQbmTQsSViy9SNLWUPEjKYOQU1wNaw1wJtDFJFCoJq99VJqiZVgjd8kpArNXUco3qritlXYo8yk5StRDlgy6Y4Kz4GVgNizV4217Q4L8HIasvE08FolWEoTmVcs5VUK7Gg4amVVj/RqW+MwY

Z3KqkWaoHGy6COyCegMsgmcJQSngR/ojCPAC4QK35+QdTivi0iALq2VGTk9u6IIiEBHAeNRCAUOBVAdSAZkNoBVAedjKAegBkgJoCHq7aXHq4IHtIWFIgMAEVkouiaZtT4Y6KNp5v6WCoDIDHzoDOWyf0GrBvqwK4e3GBWP439WCI5KUuitWU0cpbUgavmmsgwtVAyvFE4Q6DUePXYAH3Objh2FLpSsZfyp/X8jVvBzUSgm7UHFdtWYytzVxKnX6

mIurl7Af6BrXDdodsPZHF3fqI54U2IoQDOSngSuxowGthg6g+UTc+VGIIrYBdAbNSEAFlR6AHgBA/foC6deliT0LblgSZmTNwJcQkZDNDOlUGHyYViK75fKHA9MTHQgSQIhKj7S/sUV4qU3rDJDbhFUqvH4w4+0U/q96Vs6zNVaaxxUXTZxWga7WWAymea6Y5qHC0gMXpabbWyE7EZZQ/bUlcjtpooDR7namqW2y9/yK6vDWuah7WZjHGV+vOTnx

orRRxvS1LaSruA1sSeR6kX6ofqbVWuSQsDnAK3X9o0RVfeUgB9APfgD8hZQP4GNCEAAYDjATUBOtPiARU24U19PZiJAKpCYwYNreA7+VjweVjKxcoFwkQbVBQX8wSSGHATA0lXasclWM6uFEqa1aZvSxKVZ6zTV3xTuE5qoxk86kxkzEtbU8AGmEmazZXMwwdC1YDmF7SSDHAgD2rP6eXU+UltW4alzX3ajwXzI5MWKcKhTFizUmlKekZhyJKCpg

ekYpK+/gtRC5SFgNVBUKWfUWq+fW4TPN6JRAyR9ALQDhSFNRsAfSA1AfQAUAHoBGAIj6hQyt78ay+5Z8OISYsDmQVk3pX9UNxx65V/SooRV4Rq2ZA3ACkg0kYiA0kQEbTikGqtNSAh5MQWSg0MEX9EuuoKYzPX1I9nWy8wDXVQ4DUIipZWF6/nXF6vFFDwjZW/3MzQlA6binmLRBgEpoaia2vUJZJmqpQF/nWyi7W1Sq7WicNvXoGu8WNcyMgdA2

aFoPTf4SwgDweWZQ1UkVQ1UkMvylAI/VWODoxzcDHK/APaELOTWGHQ2h4do7sqP/QEGQWdtH/UFh7XQ8OFdom6Ggg+6Exwu0GIIwgBNAJoCY0nPCl6ofmq4whDlSfuQiC/LnF+RcbVwFuBThKFiPkcsxdGRDkwgCFxsuOjSqCrj5p679UKyow3f6kw3Z6v/UfollV563TUF6vnWcq9iQ8AWRH8SmykBi9MVr+VDDgYonW8cwiiVkFvroa8hUySiJ

XNq0I13a8I2dqp2Wreczj0HQJoi7CaoEzM4SFgUL5u7DugkgXnCazHWjQraUAbygIiis8z5ZVOapgKMfDYAagB0BP3AC0BWikQRED4zF0AgmgW4Ba16A+EUWhtVH415eI5phAYgCAm7WZC0amZl0O3AQmiVZJy72gC0WE2RzeYhWVBE1hAJE0om4dbomsQDBwfU69QKlC4migr1Yn1lP1LoW56D+EKApvE58x1zJan4nXU3UgEm7420nX42kmgE0

5AIE1UmsE3l0Ok1Qmxk320Zk3BNVk1S7dk2kQZE0/gbk0+0DE18m2FaO0IU2rYmS6sUgrWI08CWAqkzld89AlDAfQDDjTGmD8+nnD8oHrNmdpAnlCqU9K024+QIVo4NPQh/CniZyCndRJCKQwqMi7lb8zj7aU1mlZgv9VzanPXzKrY3La0NHIij7ndI4XVmvMAgxxAVXM8WGUVOfixDhZA3m8543K63mqOy1WnOytOVlfCJqNHYE2szP2b5NTaoc

4B2g4m5LwWmxlZd4Vllsmv4CIm5L6bfXGakmifCdm3nDdmpGAdVTnBzm+Yhcm4c1OTUc0mm8c0cm9oU1454l+suLVdyhLXnU3PmXU+U2pa1OW+ENs21NW2hzmjtk9mqTb9mwU2Dmv3DmfDc0T4Mc0JACc2MCu77MCsUqfs5GmQS1HgwAJoDlUrS7xwf7qdGkj4PZaFoJaSVgQwssx5wgIRDgFICRDM/ROqIPU5IvUCQpUGqTtCHTsfZTXUqh/EwQ

9M3wQn/X/qplULaz0aoK9HFe4gs2q84qA8qkBR3S8s0Q9cf7CUTzyVYWs2RK+s34a943M4cWhDVU+F3mrAA3CC00EIPE0jDUuhCW/5lUm0S1xVNKq7miLX7m8U3sFTPld5buUymubxym0Nm/E2wbSW32Xt0OS2YAMS34gCS25a6BGsMzbEAW8nkcanJC74IwBSK0gCtKqC3Hq9rBnXDIpKYLMX3ZMyjw/frBUkY/RjIABJM8Q1AVwh0j3q2xyEW1

PV2ixY1780i1lQ8i1Zm9Y2u4xbUayoA1ay3Y1GvPTRhQAlGOOAkauo/bVVqttp85QrjHipvUjQoI3Ya6VVK6vi3Nm1bwBNMLGBNFU3JfBq3HbNqrNWluWim1+H14w83UUjop9Cs826WhU0HcRo6NW9q0dVHYVMCqy0sCxmV3JKCXqQcYAlZdCDT2XfCNALTpUBIFqkALzCgtIMGKPb1XQeRJGoha/JAaIcVNgkkntUMISTWbjQhWt5yEckx5fqgw

0Z6lY0v43/V7hViUAG90UZSvTVgaovXLqEwRl66bgMdBA3n2VfrmKq421YA+w9Ubi1PG6q3t6jA0o3LA1Pi3tXsWfqJk+NcZWIHVoceTngHSUqCaoUpTsKmdBeA2g1umtTpnI934MBczBLoioKeq0ibHq2RIp1LWC/VVjSnWw8pZoHqjsUIUKN6rC23wAuHawN7Eb8/t4ZCOWW0qtTWs61Y2vWqEYbGj63sSr607GjlVZW7Ax1IeLrA9B0o7kVfp

1gk8XpaGEAgKaG3BGnNi8WjvUeC4vKNWjOh2gLRa3neui+yqIhbuSS0jEY7am2whYW21mhW2/Ig224U2P06LVp82LV4Co839WpLWDW/uVhshcr22zgBm2ojbO29mjW224ZN8x027C5037C2a0S3asWVAXfBdgUkxCATACQsN7bOAS7FWARHWSATJAdGjfGCGzfIosP3W8WKiEdqTR4lmfy2w/bW2hGUuHsTetBxBT+j4NM8gcI+TzLxKAjNmSYLK

ce60LGx61LGyXk2KtNVrGt63aa2jlWG7602GvY3ZWgnlHG5tL0w6Moxom3hccM3zHvcHpeGk94IlFtCfsO40ZoxtUykqq3Oal43XKiI2JJNf6dAmI3dArf6i1cQyiYUAi8Ytu0v0VLRd2gUJA8Q6SwgXI1UPAo0wfIo0VJVtGlGk6FxUMOGlGy6GRwj/5HJRo3AqjGQPtIQAP4DoAwC3a2VGAtSTaO0q2iOeGb8otCw0JICcyVFBpQSsiXSkzFiY

TAYb2EIzKUt1FxZIi3kg0W3GGl60UW+bXEwrnVpWqe1y2kA2rKnRjr4he04K1TCgKNyhrzLe3OU7HzmULwG624+1oG0+0Kk2ZE281bxRYAmZfQTqrtmhSFSVFU2zy0ERqAeYgi0Sc2hzEgBAzNU22QlR0dVNR2kbeypaOzq2p8g80+2vq3slf21f0lwjjfTyo6OhR1/GukQGO/ypGOoOUmOzR3O0cLWUvWO1TW99lsMspXum5O0SATUAmDXIAOqr

Jmr6TQCYARkYsYqoA7WrCXHqi8BdvP4WGEGHBIWlQgkaXMjtYJJEEg227YNdMWBkgEW29NRkwdGFEfq6bXOjOHGmGxBXZq5h25q1h286+W2NQssDxdC5imxKvWgEoLxCOipgMcJMhiO1vWw2sI1n2t41Nc7vXoYiABq2FVC6oSAKlQR1SkQH7laIMOQ1uOWDA8QxBqwTRCDXbkVE8qaWJ29Xx0YxBExoeCVGAGAAa4B/DEKOrXmYKxBdATAAGMFc

AH6rQRtIFW2TtYp2GFF+WxcVew86GWwudEAkKG3gg3kjjSxtJ/oAJacW7FBmAzUfhAY+bjwf68Xlf6ke3wKpK3j23PWTmWW0tO9h08S0Vw6IW8aiYH/AWIUf6Vm1yzriLdH726AkPGptV623hAG2+G3evR8U9q7RhqIZMiGqsxB49dCCmpSN5F2ZMgWSYKBYQGFiVjD/CaweIkTSnkWsa4J2k2h1JfeRgn/GHgX26e2BygegDKAHYDW6WciEAGNB

8k7HU+65FTUNEnwjwdGHdUMFzVvc8CDhLI3yM2qTwVf/C86Iilv6FaxvaRNVjwCQ3RWkjnPksjli2+h3IuyW0pW6i356jF2Fk3WXYu41XcO0zVxBCsAQ6SzXA3Yrm2yTBDn2N7JDOwII0u141NmoCJPa1qWQsFORNXNHBsgSuzyckHqKoIhJMu3FRIQAhStwCyTE2r9l7tMm0KoorI8AfsF7q2Dl48Lo3NgA6IM24bB1zeH6U8a/ilIntBgKYDT1

za5SZoDmRbQwqFjPbflpmmbV3cse2eugxnS236VyTWi3pc+i1raxQiL9HalQMMqWsMatW0GEDpZw+zVhKzDUSqql3XSBN1jOpN071XF5py+uiOzKwBTgTR2GO3s3jVf3CQLcIBd0JgCyLO80/gIQCMHXTYRgAwALEYuX6yrIX2TC92s0K91UwW93uO+90GVKIAkgbx3V0UgBvuqk0fur900oQkBlMzIgsYckBKWvCm149uUaQiU3qWpm7Hmj+mnm

ux250H+lhO4D1/MHIDXu593jWyD1a4J92wewoivu991dbZD0/utD0hEf92TW383TW/80Cir7ypmUiAJAGrXbi5B0M8pt19YOtSd9QcVHS8y4dE3FS29XFQqYAZ7i1DmT/xBGjS1cp23kMd01O2bWEwhp2pWpp0cS6e2ZWtp1hxNEUi6jjxEot6yj/HEWrcGTzfcWphxugLzHuqR3IY2UGreADkmO4XDWAVYA0rN3ZEAIGTxTPIgvuvqqyLHgATHY

UDQ0wPmVAbz0PulYDy4cl4crIL1UoPyYOVEWjzECL1RehC5YelSGdCt+FWO06lEeoNmymgO32O8j3oAeL0GVRL3+elL1ZeNL1RLVYg+OrL2Re7zW5en807y65p7y0EnluoC3IaXfCcjXfVOgzmUrXO0I3EnbU1iaLJOQMMm4DJ9Vx3MuIHKe/hdGUqBvVQbBP9AYyC22Fy6eiK4MqiW0FDf/WNOwA3NO4A1+u9xU6MXjUGykXV36D6oqUYzFsWq4

13jCKAZFFz2KUNz0dq092ehCQD6QE005eznCZewGY0mwIB6VOWjJfH72i0Nr0m0f70tewH1U0YH1km/G414kU0WO1S0d5X202Ouil9yir2kC772/e9r3Q+uD0WrUuhw+hAAg+xH3nNfx28ewJ3WWgT24TH4A3aHgBGdQgDEyYgApIZIAP4BMyagUgDEAH1BAAuDlPY5yAOor+X4i3ixfC3nhSsdeYVMOISPE7m3xFKWyAWOqLVIFzoM65PVQ4/Q2

pkpKVuu5UL7e/26Heoz3Hekz1sOs70QazRBWUoN2QGsWnYIYEXUdQ3FCOjILaJI8l7urymPGw91v0EZ2SOj71Yy+VWUi1qVjIGsaNKPJgu+DMgpyFVDbiF3xlKFOTFQZrqaIB8jZckV17OjuIHOp9RHO4FWU2hrRwAU4BviUb0ZwYTGt9YEB36OIIVoS1HyKDzxlwYFJXK/FUn2CTzDwGpQu5DnhLhGMEH2atSeeQ8nMVJ100ql11xW8d22Kj10H

eqW1Hez61/SowX6a363sSDmWsc4DGDPGJK246joI/I7W/IBmS/xV73Xa930Nmodpe+zz15hQa7uVPkqDXB+GVFEsA38a0Q4PbHwo+wr2dy6x20UlvGjfbH0DyokqDXbarby/LXdewrX3NWaW4TMJYJAH1Demxy3Z+m4LDYUuYF+kQJocngiXZPJgpcMCm0pB9U8gsfg68qHR9GCh0M0qh3t+4i0s07v2j2nX1VQoymWGw32+u1bUcOzRBIOyz1mv

aYLloRAGwG8GViSxHCUdehQ6Tcq06Iyq3DOk+1r+unEyOgBF5y7ypJgcJZ3CP2b+Y/LHhNfGYC0KLA3jW23eylyZcBqj1y0XgN5Y72gTY41bIzB7h5exrE4C720X+4r1+2zH03+sj04+9ABiBzgO8zSQMdsvgOyBm01CBxQOde5/1NTF01Fa9/3u/D+BsAJWC4ALoARIyCAG0n77TxNbLxwee3IO5+XNgORTDJepDAw5KBpI+CBRCQFzKYJWlmu0

BIhQT8iUlWjWv6FX3wdNX0vS1NUIuqZWJWgz1UW5+7bGvAMZcggNkBDp1Zwn9pUIwq2afIl04qDkJA8KfkBG5vVYapgMSOlgOeE732TOuHkjDGxCQQGpBmID/DGIXRgGMBBBZkVMDo/AsgQQXZjxyEIDR2+P2mq/Z2umvr3sa9373OowDqjZgChSIkCYmYgCBcBIANABoAxoBIDjkJ53pQC6I1IDzzWOS1EtUQ2KHuPQjgYIh0IEZnmG5a9XQtcb

VkqrhFJBz9UD2jX1s6rX2uxBh3ZmoDW5m9K3sqzF3+u4sTekjp2sNdebJgm32RuzfqVYVP7JmsVUUKg93iO27WNBxUlq6jHoJK7RhGDchIQQN7hZPQRghAYpS6MfG1ZBF5WXkB7hdu5jWjc3kXjcmYOAWuYMKo8rUwAbUCGYebpHAPegwDSQAG00YDxwCgA024MHHqh/Ku1MjQqSHaniCkBSwB/EZAfR4F/DVb172MWkTUTfm0k54OUq5IMpq2lV

pBjM0ZB9uGGe7105B0734BrF3AhzbkA2igSxcYOx8WAR1VAyOxQ6LgJz+moMVWlvXxu1f21W5N3xKtsm8jEdVhyNp75cUhHYQEl2CdNTn5QYqDmcDhXeB3Z1TBxP20hnYY26nCbu/NgAxSXljxQCgmpwgM1I4b8hRCPYBgEJXw7koWWVodezQBPt7HkiMnDyKAiNofwxRW20XOu9PVD2/fmah8W3fB5K3Tugf0y2of3rikf22Gv61C0q71mvftAt

Exe6OU9Ykw0ORSZGu/HsAwI2Oh1z3Ohw20o3YvLufQegqmzkEpyucNy0BcNKBtuUqBjuXdCy/2JazQP58u/26BjUgrhjqoUvR/15a+Gn7VV/2xw9341ALsBCAWchOQJoDqQTUD4AGoAG7AOCkAIKD8Qfg3Ki7EmAuB4ANoKqSkabBz3ZU8z+DLRIVS+CSYWhQ0tiUMLIkMnxkaRIMqh14MxWwe1pqz4M/5bUNZBlBU+u/UN5Bw0M6MWIoT+gUnuU

cazyGwBKafez0VODyyv8FtDL+kI1Th2l3a/dEOmIz/q6ME4CsgNN16CS4CRvGAI75IsgqocxCPK0Hh4AKcJluukP0G934UAX1oKqSp5ielMONupHCxBfrCWE9ihOkSR3eQATGFQKIHFmZ/R9u0ahXANawXqstyHREd2kgnb1Io2p2Tuvv1eu7IN5m9BXIjfCOaIHa3EBuoZMyLRSxsJoa4/be3VA7dQ3sfw1kKg+37ul31Ihmq3ThoCbF5AJoufV

R13CRMA1MhKoR2xuj2oLRbANaunnzRo5RRox0xRjgBxR42gJRhypMOMLWHG7D3I+z22WOtQNv0kr2ECkj3EC2/1B20rbpR/L7RR9R3ZRkY7xR02iR2/IgFRlKMOm2GlU+vYVBOpP1ViqCU8vU4D0AfQDSKhSANAZKQg/CgAcAczkXAaFZ5mXIgCh+tDw1ChDx/WF3T8/iQWUWeFeArUVRBoHrisMszGTLwE75QTluo+Y0oR+2K0O563a+hsMounM

1ou1sPWGsz2dIm7GRope19/Fw0mkZsTVkXWKg2wcPkINsQUksq1jh2oOIh+oPIhl0MX2kWFFosWHoPUtGSw/wHHR9yhi08SRBGaLQ/A2YEawxtHQfHDzFG7QxAO3WHLSSo01G6o23lVImzBg0CoWIdGOWdInUec3R8QLn2SK5wBnyn1rrZGoAELb358+r1WyKH/AJQQax5kNyAQ3ItCVwcViU+I9zPkfaRyC0xUWK0hXq+2Ll0Ou6O9+3X39+/X2

D+ud3/S9sOz2xW3Naqxm7i4DEH6Ht1OUyXXhq7yMZddH7vainDwhil1H2yGOhRxiPNSlN24y2eElgJKywgOjz5kJ7ggsEsZMamCD44vJhPcRQS4QXYD/KymOAWr7yNxMEzYskzpQAOJhdgUiLqQTADEAO5zURA/Vhc95zTBCAi8qocXuG3B3shaQbHdGMmV+7hhZwbcoKKEIxE8YpEWUG0UKx2BVKxr4MqxrAPy8nAPou3COLu/INk1E0OkGWEjJ

aSR2LcFQipFc+yVqQZ1O+05WMBp0PMB6GO3Kt0Oyc4hSKwXCBZBHVqJ9RwL6oYzjSwc3xJWWrpGDY/Si5KkNiumMMzSkm1feefHxMwda4ALsB+gOpDDYo4DVWewCzkVXLpxhFoe8TFiDWaYKLjT/Bplb8iW+zcZyEjPxjTH5Fk+NyzP6k+LQKuF2vSzX0NxjCNvonUO2R/4MravCNAhnRjD1bsPT+GfzxovbXkRh7JQht8YYQO0Jo/OiP62hiOJu

jf3Mo7tUYh0WDiwLKw2IWPoYQNcR3AFOTsOSqCaIDThGtHlp49NMgz6oRXUhkRWHxsRW2BhVHpIHYBAtIkBvbdSBmIAYCL6o4AffNCD0AeNDe6xiyYsHix9oZKAgdTiw6JZnlwec8C08EGGy+xvLXXIjkoBuiWQJ26ONxzINMO9WMthzWPD+n60dhsf36o4s1oJtIqlMUgbJFM2VXGv7Qf8P8gjpe43Iy4KP2xyrAMET32q65oPOxnvXx9ahSQQD

GCaIfaQGobLB6tDtgljDOTEQNEiRE2cBE8CYPmS0V3TBiHXhx2y3u/ZIArgNgDJAXTAJIa6D5YNgCZ+15ajKcaU+B1rXTUByC4W6Ql/xdEGGEcVjpi+CBTJasgHR3tJQ42knHvOuMs6qBPiTGBNYRnTV2R4sEYKhi2vIxxNscmHQb1Tp7JFE+ZCOpyAtEolHykG2N+Jyl0hRwJPTxtrKzxmkZywLRB5KrFhOSBmCVwIKBfcXSWNxWpT+xwxhqIZQ

gjcyaWRh3JOTc4rWII0HhGAWUATKRqzo6yFijAIwA7AAYAwwBADqLJ+NbkVd2IA8TXn6dkLZJDzwTAr6QV+m62OulM04/ZCNVh2K0ahsi31hpuPI4tKWtx56Ome1p1vRutpER2ynooATn8O02VUB36wmjMIR0BsGMOhuoOTxiR1BJlXWd64CYtB1UlPkPZHWaU5QhCfqLRvHam2Ialx4qJYZkaz0Bhxt5MCJxBG74EQBNAIkw3gEWwdAIwBgG6WC

r8dSDmYLaU/hgX22aU9UEjDrVNKO0Poc+9iBklOrDgGIQKYSnXiYjPyShgkEKhyLkM0p6XC2zv1YphK04p8xN6+3UMTJjHHaYpd1+m832a8y+zKsRGoQUyiNvjejiNmbuCEJ6l3u+tlONm0hMTOsJNTO6tgFkAhRXAWdCnlNfqGIaxhdXFqKZMNTg6q4WNFQPePPJrYZ8J2n3u/RMw+oEzh8QS51/+hQh0aLDnfaRkIgB/PxlMX8zhhLp3rogZ4w

1IyJloUZymRuTHM6ki3oBpF2eptWPep+BP5mv1P5BuLpkpgMW0B6siUk0UlVkm0K6uvBNkupwm2xhslEJk+1BJo20TEPQNGLVvg9ADkTpeUWifGl2hrsnnCM0BfAh4Qw56AEQAq0VKMbwjgMnprLznp+gCXppU06s29Oi0e9MG4M5bPp0ej7+5KZn+nq1FeiqMaB6/17huqO6B99MSrU9Nfpn9NfGv9NfGwDOh4YDMsAXkTMMgJ39Rmn3iuyUq4T

FJBCAeOBxoC4A98noC74AbR4QfAABRLa1r5HwSGol7SHXZSMooLRQ1II6WWE8zKjG5Ai0NRu2AMeKHW4kTN4q1CqXRjFOoRm6OIuzM0TpmyPYRvUMZW4lNUw9n0fRrd7/3amBFMHnSIQdd0KEK0MfsapAX2UcP2hhgMTht71xpvZNtgKI2rpXjAloyXK9A0oAYtUTPW4mWpvvLpTeSFWrExqDJlGwB0VGztEUxq6Fkxlwg0x4dHggmVPAqrEBCKZ

QBcE9SBDAYgAbC5oI5ILfj6QZSAIAPkN7WxeKUkVqj7k5ondBo7oMTbxL6EarAyvOQlAKqLln5EdO1O9CMjJrMkWJqdMnepTOAh872aIIu2BpmDVq2bcTM1AR2Ax6EBTaMeAMpkzM0o5lOTh/dOWZx7UHJqkXVwPVU7kWIRIQBuJkYiuKOIrIJ6oJWCaoEVIYm80ncJg+NLq/hPHx85FNAaRyws3ADg+FZQh+ckDuk/34TAGvpKsF52gwMWNaJD5

0kIphrlgJcSqGlFA9J5QUU+UGNGJhuFupgREepzCN1ZuBMNZgEPG+wzWaIcA2ba0zU6KHt5kR8HpLBTW1FcNNGKEwbOm8iGMsp27Xxp9f0hJgjU++3GXP9XCCRvQxB9cxWBowPCA1xJmSkZbnHgsYsjmIKFCCuqVOlWcLMemiAApISWK7ZFJD0AXfBtAO/Aw6jNQ3aG4Sj2a7OHuSZxNKQ6KNYOCQr2F7MShZomV+GzIV+2kkDZysMd+6sNoR4ZM

vXWrNep4HO4B9uOzpxyPJABw1tZqz3YObRP9xvx6Ha7w0IlPcyv8fyObJw+27p2NOjZsKNMR1lGtSv8hR9X1Q2SLkY0xSjXj1QDRsR7nRChXWyM5q0l7Z935wADoDJAZQCugWcglq6rISeujgxgzco1uMyQVZ5e7rFXbqQ6FRKGoFLTzhRIR7mArhJmtv2op2+Aup1XPSZ9IMA50ZNA5hTM+pui165pBOaIIqMuRtjn25QUlrXNeaQKy3Mw0YeRW

uiv125oKPbJgJMwY8+1fekYbf7c9aabL1zp4+c537P2bLrWfMbfcgA7ApgDKgifNjnDZoXeIrwz5zs4dshfO75igDL5ylZrhnD0bhvD1qW+LUwZ3uVaBsjgOO2wbr5kQCb5hSq84HfMvrefOpeRfPIzI/Or5iwPnhtOb8eojOHy3CYimbwizkDlj1AfKmagCoJbAdUQ+oEVJFR5J2vOcV4aJArjZoJQiU8L53loIMNNoH5F/DF2wDvSR2DJl9HVZ

jXNUcmvPjJ6dP2R97kMWos1G5kgPAwHx6nmcDHnR7vMh0LizSYrdMnKvfoxix3OspsbNd65NOtBpTjEKbMgF+ZhxYsbQRKCEsbmcSeREQAEBuQcFgRyrIIl3MSPRhnbNTXAYBosbNy+O+SPQW17TkkSf7QRLxOze2vqGEYZD0aL4Z5MOQWdpPHXdBjKzjCUQQVhogtoBvT0TuzAN4pzY1PR6xNth2xM6xsfx/AW8YgMYsxIa0oOzIdxPz+w8CH2F

1EbJjDXO+ofMY5g4pY51gOb+h1pc3TIgPphkAsIY+FpF5GYG4TIufQE/MqW8/1bh9QMY+2DMDC+DMQAd57pFvIv9QHj1deqwMJ2qMO2SxBH1AbfV9AVCA8ANgAr5fQBbAM7EHAIYDYAWcjDFg/Vk4Vqjjwtu3Rpuia2ScIbJaZwoqSPtzL8+yDP8OubJtcMKIRqp2VZh0UyZrUPV5rXO15yguTJhyON5izoLp2jh2iUXUAi8DGxQiIvP8qNNGcTF

QD5uIt2xhIu7J53NOxibOtSg1DZke4BxyTVBTaahQohRWBoQWpQoQG5MuQdTguQPQRnAVQu5GekOIIi4D89ZQApIB/DnJBtN3YKsxhc6DxS1EwvmXU64F2eEgFQuokP6OkIae80ZKBBPXPStUOd+ivN1h911yZpsOWJ2d0SfXIMdxxyOVQf3GdpGWzFxxbhaU8f6htNvrQ9GNNHuizPvF9zWUUCbb80OfCB4DOjqgIQDJRy9OgiAJrk+qZgpy2KO

O2tujSl5EBmQuUsKl+dnKlwosFeyDPlRgNmVRnuXVRrH3aB/cMSljUsq4APDal2Utb4PUu2fRo4ql08OWW6n0zW5otMyn/7EAea5tAZSCOtHnMe07kALUikJQDFy06p71UJIyKEUGTkLwkY1NAEQIST8ztj7MJXwedIY0/yNvrWaSnyyYip32u9/XUO37MmJnYtV5zXOTp7XNtxxrNg5otXFiXMgdOlzoEjVxPGYlrCQYg646JFFNPF8eNmZlf1O

5x2PKSwQuqk6HTKwXqL2QTRCegQGTZYJWBVkRKxiATRBfcGxBriA1Cwll36vJ23XAq8mQdAMKTyllJCnAPiAJAFVOSuScjFkNfWjFzpAzjUQT44oHTdUFKDxADrA1zOyBEO8HBLheCDVO3b2WR9wtfkmd0Ep7wsvR5TM8k0qC3jZyDNoUNNPhaIGsF+gQF+T7RK5rsvcFxzWoGzHP8FzlODlgTr5oXVAIsAxiYIUYbqcT3g2IGyRJrXcBPcGOSpP

QN1ZJhP3lp70unIyV0ca1Boj3eEkHAUgA5ITPDmYbpZkRLa1bATsWIq38NTtGowchUN2lhyNouQWIOGocKU88v4YeRhPVRirYtPW0sv0lwHP7Figsg5hBNslk4tcO/WMCS8lOxcDkIy9J8IhF82Py+BjgWkHxOBR54sO5kUt9lkhM45shOEaqkXJkQsaow+GgUYyN7GICqUGS13ruqDMjfa1kWkV8MMYRHJNv+km3wl4FXr6SJj5U/5bVbQiI8sG

oCagN4jKAIwBK/BROI+eEhP6J24cUCtByegeQl+vBM+Apy56KJrD0wPHxo/C3Ml5rXk1xqksPW94MmGkgsLPB7ljJye0656ssGhk4sucugvT+AHi/0UTACO/ZW2yHnTBimIu+J+3MK0vdN8FsUtoh13O4yvRCk9f4BiAXYAZkbkatwd2NLxQuzEQdThaql+gf4EPNHxvr1TXMcb0AFEnISvCzHZjgApIBoB/eeOAHGhxMta7EnJVhLSVMGIRduIc

U2UMqQH3S56lMaANrcOIARc6oMlViPHgJ1IMllyvNyVvYsVlg4tKVmdNTJtbV3AZW18eN3K6Z3gBL824tFSFFhY/VHOXi9HMjZkav9lsatoYoQtFKcYNRvf9TRJgxh0KOYZR9QAKLDQAIx9NWClkTau7Z7attTFLNGAaLN3zPTqagQWxEmHBFPEKoBdxzV0vVZCT9YQbCDizIKbR8M1vAc6KbkK9zcTYqsfZOaxisIUmWZYquPSsBNFlz/UA1ukv

KxhkvvW5sPMl6n7g144vNZsqC3jfMaOkbcqj/fTM8gujSpQR4uxF7svDZ8zMWVk92Jp10Pq6ueOfsE4CvcBBDY2YxDKwYhSZWTjQipRQhAyCxBidK4C01ytMKoiYDqQJSAxoCwDollRkSazuCowmfxEIaYug4O8sQotngH6OQUspNjwowuAEEWsgbIB5XOoBww3D2wGsa1+Ssg1xSsNV0HNNVg2sau2ZPAY4cK2hS0WhFm4DhpoJ42OU8o16gKPk

urZMvFjGuIV0fNHEsCKl0FjBdsyESUbMaphzBWZf5hLGUrY02i0GetdQB1l0iTvYEzeWZdQJq3Hh5UFj1/nBigSesciaeuEzWeuH5+euqVFb4n1lesZNHnBr1v2XL1uSp0exlDmO0qOo+yqpSm3oW2OmqNWlyovi0cesH1xg6Y3B+tAzM+sr5vqqX1zevMrG+uyASJrPu2M7ANvKoQe5+sWWoEmelgAuDR79nsC936aAdMxek9yICQcYBSs5QB8Q

ZQCzkXfCjxKoBmSyP63Qv8oF2R9iZBXciowqiWi19YoSeMsyVkRLKAjB/TwVaWP4WxAMlV/YCdEv1UWMUd7mR7RkZqz8vLi7Ws/llku65iGsEBg4AWeiA1OGtqEx3YcDOiVutYJ2onO9TijeJ4Utu+h2vue5snq+azOiw2zMIx+zP6UNrCfkFT7kO32G0QLJhCN5Qh0NMD51o9QzLA8o2nQ/WG+ZkmP+ZlD7dooOo1GiB3cPeo1PqK8MKo/QBRoc

e7VgOPPie1MMk+Eh2WIID5i0qYuI/IwY4NE/QXgCgyE+P4CfkeYRh8CkvlZ/GmA6T4G9ZUEUpBkW04A9XM1V4/l1V7nVg1qgsq8yGuXexusCkrOGIA2eGr9K576Vljh51BkJwhm2twVhXWil8Z3/8iYhy4ffPUrUBvH5220TNj/OdnaZs/5921X1a9EWhWMZtmfF0QZk2a9W0otX+6/NwZvS0SAOZucARfOLN3x3ul1BsEZr0s2BwKtAF9357IpG

B8QTgByRlXF6FnXKfALcRAuUqR6Vw/FtwKIRAwM3LvtUHR85Q4BgJf8gqCsgaChpRJN+jAHF55wul12sPYpoGvll+TPV1qsu11xBMG1kQPdxysRBSpAHlmxYuI1ptDk062ODN4kZ1mkZufekeuzsQkBJy/QAbfMLbCARBvtVe91dRuRwiA2lurgBlsB4ZluqOtltFRsDPkIfwHWxamI1KK64dCsU3FF/D2X5sov7NiouHNmlt2ALltssplvb11lu

JfbqMx23qMNFhGlNFm5tUx6J5feeZRbAD2k1AX/6wvIwChwRB3EATwRYydZVXVp7FLaMMFAfMRI23NwG+iYY1ZIuQs4PP4ZikhPWsNN8sWR/T2V11Fv1V9FvKVhvMG1m/nWMmDUsAk/XhF0Iv3BVIrcwkDKktgauD5geuKUfmO9ujW1Y10JOfF3GXXAQAKDZTJh4J4HjmcFCCpkR3x3JktAV23gI+VljX+V6yWUVpO1QS8YDdAXAAdAWUBNAU4A1

axBoOcmNCgqoFMXAQ3N1J7EmEkFex8yVWCkoZM1AESIx5NnwGoa0HDiV8LkJkm/HoEMG0q1+F1q1pFsV14Guht+ps11iNvyN9ktzzCA2a8xAjFQQnJw1yhBPTEGixq/qsmV22vo1rNttPHNuYqYJMcpxG0Mu+4gEKCIx1sZ6AV3MpiriAyTxWQXIlgaIl7IrIKAgMOviur7w5U/QCzkTyHMACMp8alYpOkfwajCYQJzjIcXDpEh2OBJDlx6lGslx

0qSfAbNA6Z1RlfZl51xl8KDlmAZMVNmktVN0xPQJlFuMl+rNHtvWvUFyGuoi89swarNPdIMM1YJoGi4jNt7jWfRtmyN9v5QXNtUtvxnoALEB2AAgBqtuSoZ0H/Yqlnf0TEeTusgIXBP1oGYqdpEAqlwVt1wi9iCaG0T4QH0QU4fL2St40slF6DOyti0s35lvg6B/5AUgLTtKd3Tvr5t0t4ZvqPx2gaMtttgWQ64FVVAfziYAJoCygckB9AZo3ok0

HjpeHgD4AfsE19XcrVGEDz5wKFh/6cQXFS4ZC2aAajgRqzFLFiuqg4MWN65fR7Ti6owjSwcAhCHt6Bt8Rsaa+6NTurWtMlmRu61xpsmCyGu+iqHOQG1HBjwchKxZAl3j/TdGPkLOHidlt6CebcnMNoxt0K/Nsu1mkblQAsjFnXYAipHTjVsZ1QGIEzjJBFQhjIb1QgBUxh0eYV1kViMMUV/VviRvhNfeJKLmYGOmZ4ZQDKQLLAwAczDA8X5KnAFJ

Dc1hLuccczJxCe4n/WKjSVxhLReeWbj7vW2491krsSZlXOYpndvup5FtkFhSthtwlNG+uusm+1NTxdYcBokYZUoOMJSNglWy5MdNF91waug866QjhL7Q2UJCvftihNOCesoVoGCDLZ/MgYwN6AipOuxiAVjStidHuPK+4ArlqiuTXXCaSAKOn+tZaKQW/00KR3coThI0pOeuowo5k1O7mVb3sWBmAWIEVug6drUqGD8Fxg/hvTisvOxW2ku7tsxM

httjuVl6HuslyNtw9viXqV443nF2CC+iRZPGY23K0dGsC+iYTFDdvHujdj9vspw9OBU0uhKsk75V4DL0te5L5/raWhcs/56VeZr2E+w0tWd7ZtQZ00tX5+zsHN4a1e9ltlzs33tRefIiZe+ouWB3Vu+dw7v5JhVEUAYHzoWOQBx+uJt89lsTisCxjg4MFs3F8M12dBKCP6UHBTOHutM8atSItEDwDYAuuUl5XtSZpjuyVvdusd+rvsd8NucdppsK

NvKWtN8lPldsBIIahlI4JtRr72GfzzwrHsZtsys0wW3ufse3sJpqyt1W5qnO9h/Oj4COCpwW1lmO19Or96Wjr9/U6t8FYDb9nx2B97q3B9k0ufwzS0DW0j235yr1IItfujnC9ab94/sUsuD2J9v/M9emy0tF4FWqK+VQSIPEyhwJwaYAGNDw65QDfNB9neBxAubKFonxQ0JR29HXJSVkIaUIXKE7awh3uUSPVCSbT2/sKrv0qj8u1d6yOa90Gscd

5rsrK9ksgy9rsFSvLhZJO6Io9uny3F1nkQwmiWMp0zN217Gjz9gnujVybvMR2TmMJqu7oQcdWPlvcS+xpKAGoPcRmIfThABHbXFkLjgs968GVuxBGlQTUBYgM0DKAP9lq3fAA5IRYPmYZSC4ALnPPd/ZjCViKX/qABLeQcqQkaMHAqENqg2EhQ16lQ+yTZXbXcaJUNJ6l4O4D9TV7eggeqxg9ssOkgdHFrjsKNgD2tVoG45wcbRJQcs3AEVIqtsD

6ojyMeNDNlA0cDsbuftzA30u4nsSAPRBQEcFhIQOdCN2cTx6tI5OwgWFiqq/yCm/UmzngOQeHOhQfAqzeiMAczCWQUlNodv8qCWPuT/kH9jsFwlul9hmSFQQ3JFKKnM2ZfEttPBwnEgpwsMd8vOt98uvq9/dtEDtFva9uRv61uHtYKoIeKfdYoX2cDyOMqCM9N8cJJcJTBuM8GP+JwIIJDxfvY5jlOmfdfvmgxwCBAc22cAWRZ6B8F5m7PTtjnBS

E+OmL2Aeib6nD22imVMJaO2q4c3Dwl6pEO4cH92yFPDs/t14i/s2d0Pt2dsr239xzvWl+4eP594eFgT4eXDpak/D92ibrWEemVML3PDin3atpPsXh6wMBV+mvu/egBHATyEYyGUbol4Oyz3MjSS+gnISV6fm38XCUDyMnwpJmX0KGlLigQvyAZoEbBbe8Z5iNvAfBtyYed9rXu/lolNNZuHueKxYf4QwTy95iEOOMkXvOUnokDdnYdMpl9vsD2gN

29pCvF5T1xb5rXDj6PnBfLNfDnDwhZdANgAq5War64EBtL4W23aj5/O/m/UeJnI0daLE0dmj284Wj+c1Wj5ZtRaiVvn9yik7N2zt7N8Pvyt4a02jwry6j7fD2jw0eIj2iymjpEe5Fy0eh4D/ut8lPsEjiOMMG6ArsgQDQWA5wA9AWciYANoAPxy7HOAKhtcVx1sFcQ/R8yaDxZhz7svkUAijCcawpJryMfZBNslVruAv5EYcg9j4PVNzV4pS8w3Y

Bv4MNNvwe999kv2tg3v+i6bgvZQ8pp5s3sUZBgdUIMClfaG3vqjhfuE9lIemIt8UIIdrrngGCDo/bLCqG2mXOSGsbJkW356CYsUN1yYN+Vl5OGcvJM/9lnOnAU/xbAIQBVAToIXAann4AbAAnDaxjdAK0wJdwcXU8K9zwSQbArp8M1NtK2IqSNMph8egfQRyFJ+qqxwP5dLTae51NuD6qvdjjnW9jluP9j3we+pk9snFrv68dkXXZXGIRm5zaRwe

RsF8yH1XHKm2VsD0TgHDlcfkJtcdaCcWAZyCIy6CcxDwQUFgsJtRADq2dDlQM2izgBeqUhstNO/CtNwd3CZEgCgD6AXfCH0JL36AP0CSAFJCaAZyWqjUOBHAWJvQDxHxjTFnhIlY/Q7KuolmDygTzWDijM6CbIhiA2JRqwMmwpNLiudauNrWcqtvBxWPMdmrMQ9qutQ9kUcw9zFtw92Jst5xT5hGYOxETp3jQtIeMgMZHCXGlgdDZ1UfUTpcecDv

Nu45rlMCdYqBiAb1SmtTgIH6QTqSFt1Qu+PCDA8MySFkMQClurbNNtsCWp9m8ehO9AAPgv9Y5ILYASKdSAcAejNBALYDuYP0AcAcf1HqkVg8Z8WPmlYHRJkPOHBkp0R3AT7T4QTAfcMP1tWiwTvwtmSvjDljtOT7wfGe7vukDgzW1lsWAMV/TEMNqSwj9qbDdNoR2IEPnEzj1GviqvYcBeGidcDmKcoV4FhgsRWCDiwrg4IEIBzOqttOSGtuEDcq

T1t2DsYNkJ1QS/XBHAE4ZdAGqm74GoBHALg17sviAylJoBEMn8cH3Nm3J/DLgsF0XvYijGAC1p0i5OgsZEO8KU31K/Hrt1hgMEMaeuursfMk+xWwJ4gezTwcctdhRvGaygftZoWunKWLIV+oR0rxcpjYSWIfktyJWHT6KfWVvHM96ggn/t/MhKwV5XAd/N1r9dAp6tCDu7Io0kwd/KeXj5ttFTn0sKowgAXAcEzKQDRBKu2Zmc5okDmYVfShwIwB

HASxlqTlYqLIV2rOiLWDDye7K7xO+ztYEGDrV61OR0UUIDURb3VErEZRc/qwpcdiyi69FjbjdseoRv7PP49vtTTqYcuT2RuNV9yfg5qlTK2yvzeJTRtxxFFNCO8DAIzt9j0zjxmu+sh0jd5cdHTlmexT7RgdkupCP9UGRVQdkV7I6CD8RkDy6CCtt8OQALmINSu+VmhJ8i0RXh1xBEu6I4BL4wgDKDmABdADgB8QIoxSR9TJDjHnsOt7UZvZBxwn

6oULCBL4UEkRJHo+SYK3FXrvAKpXOPSnuuYztXMOT0gu1V8gs+zpruEzsgcnFoXWSj8lPv6XtAS64ic8lqMYWhcV7ZoaqUqj/aeKUJmeWVr9urjxhVSwarBlke4AhALFiVoGas2UGJPHgvDFXAOR5QoHPtlzn/q8JnbNVz4FWLgPiDQrP5ZLKBMzeEET3EoI+jMAb8NdzjcjVvcvvc6FIR/VerDQscWPfcZWItvOYLxqxqS2zn7Oq1zsdzzmps9j

vGfTD1yc697CcG11rOjjrbXIkCBUf8Q8ybtiCsscKErQwmOdVc28znzx2vL952s8Dw5P8DvADKFvUhux8TzeqayTNxPexlkSyROXaWDFkTJM/zyXEk8hmV+d+mMEhO9qNWZgBbAU/wUAKJhdgJRxwAIkCjADgDQk/XvzxFjPqTlFjaKrqF1RBGePZhNikaM65SWUnjdBoh1pFSKHCx2bjGxewpkDIHsl1l8ljp2TMa9oUf4zmYd+zlSsG1yHNglF

RsaZtigH6Mswe1Q8whiZykjCNKx+qxccJzqKcXzjwWmNuGPmN2I2Ixnf4DYFj4mjf6xIckYFuZkMAeZjxs+N7zPAOi8r/AgOpgOqo3BZwdGhZh6HM5kqcQAUox3Y/SD0AHRddAGKutITQA+oCmTMAMWLjjFqcwD6kqfDPPgQK8CvQz9/hvyriwwSLSc2ZDPyv0VEiDPd0QWK5Wv4L7duELtvsTDjvsT2w9sEzrCdzDgOejtrycCklrCkoZZMpdTP

InixgtpWKfvbp/uuz9+OclWzJfcLy+d0T2TlOSA1BYQYucgsROTI4TJV2hatgipDtgsIiSxE5lqt7di8cHdq8fSpsPMKo5IBDALYABRTRd5YckDYAfwCc4iECkVrWeNDlpAFQRBxSeU8riC4s5tIbRIfgtQ3mzk+yr3F8hSEjqgFWlse7L4uvGJg5cTTxycLzyHunL0JcYt8Jdw95vN4TkgOY5CAE3t1FpCOx/QtsaOf0BsKenztUcZLxIcO9hG1

XzlrlDApCB/kFyBOSEziX2EsZmMUN0tRb7XWIWpQGob4DPTlRdDR1HgBwXSDjALYBsE7ABUmTUAwAfSChwWLvMAOgLzpyZcWL4wrgYIagMyHTNcRSayOQGEMuUKLIyhnBciRQxOcr4svcr9WtHLr2fBLshe+zoVe69gOe0Fmhema/9qW1qceJtuHP7ztH76KeqLpLr5eqrpfu/LmyutSmECcJsnPAEK9s3J6Qtpu94C6StRAuSaxglKWpMKL6glW

SwqcpjtPsrq1LPKAHJDMset2021qd2iIF1jUL3gE5erCCExFrmUIq6VgOQWCWXbqLtqTDitt1Em4ktQQYIUKYA6Ss1h+K3/Z8Ht8r5ycCr8hezD/weOR+SDxdVsSp1K4soOSbSpFUbB/4Ysxlr/HuJDx3sCW0ugp49EeH9rfswAEWhzVRq03rCGZ0ehfCvrYqbLhrEeqluAUpfTLxmQn/bP9o/sMgIDc+OkDfHbMDdqtyDfXD23AwbjUFMNZZdmy

OowWd5QMxazcPSt9H0BjyEff1u/tOd8Wh/rg/veuQDfAbqyqgbwA44b1mZ4b63CHh2DcXNp00v+/EeLq2hWQk32BdAIWwXAFpvx51MPP0KWxQMOj4WkFOv8Y7xLbkQIH0yDPLxtJ/TOQNWz7mLdeXc3njNNAVO2hEWtxrzRljDxNeTTs9fTTg31nL+vOULk31fAOIoRGE2KhzlLo+PAVog0WyhlZ3acIhpVcRTlVcft79eVANqo8iBPu220LehNc

Leejw6Ct9RtCWlVsdOlLZu+jkPtX9s0taWvgo6WwO0KtqQBSVMLce93/NJjwjMvTvapYNtFdIdvLDOcnl7rBiUUMBTGDqQCLB6x4lcrXLwFbkaHoSYJAg8/HUVA6e8i75fwwYsJGd9JsZUlBszf7LqqvYzjmn1Oups+DuzcLujNcLTjoMNluGgQdcN2GoSIf8VoWtDd7NtSdw4fJF5OcnThQTQQGdBhcipSYQHzDcOK9hsCeVCVgV7hplYuw54K1

cSzua292U4BEgBZT0AA4AkBIYDN4GoA9AXkOnAB/BdgYsf8+7uetYfDscUYzhy2QpjeiXrcLCbcRQEX1sSasBjI7qcWj8Ebczz92cUcqyNeD72cXrtNfHti5cLboqD6Yp0hw0XRNt1/yMRzraH2QTguUT8Kc5sbbf/xXbdNB46cFtnvWsuoKB6oWpSZKksz5kKUJqwJCAwTLq6riGuLFKWFhmSntfCK8walKkrdfefP2BwNgD0sUYDTAHei66PLK

aL+gAzJuBetTqVgF948powhuyFMf9rI/CaizJZlc2ZXZWUl5st7LiBMJrtXtWb2puLzvHfLz85fXrxvO/AL7laJehSyj0Ak7TjYdFXAkhTULbeSdpne0T6te4yjGwVjZyCAyXCAhAMFgooKntcOZeTgBTOANRL0OPbgdfFTqCUxoDg1sqSUbOq7JAaLL0FNAOEzqQPTGJV9DuX2JtR4Jnx7KCq2XQzwDwwSRNoDIkIztDkuMRDyFsI1m3f/Vu3dg

9z2fWb3HczbwVcE7t3fNZoiB3rpmoqJTBPg9ZgfML+IoDIwgYwVsluxz28yM74IRh71mdTOu4Awhc9gdXKjV6oYpTM5NdrddQcAhAIt0SdSGKizpFfizzPeSzxBFdgB/Aw61jD0AcxCJILulsAJDv5IOSecVkHcbkKVhj8K4DQVXfKOphvc0wNxxkaH9iP6UIxrL6nho+DrU0wcnfsrsqvN9yqtPoibfOisw2kLpeekAnvtEzm9fwr65e2UwGqtY

BYSd58oN45NMpblWnfjhqicM7kPfr7pOdJptndTO/7hUKAbIEtFKDmhNkCaoAsgqwPRB6oLFi1KG7ezq7+eNtsWf9r8JuIItmykAJoCEAZwBGATAAz4uAub8HYOOghoAXAbVPa7mAePluIBIAnanmjdMt0TQh15N5uu3FO3g9J8qAIT5Ml/V9UOg9k9f97x3f8rofeXrsJfzbgXXFiYiC3jEp1hKVi3WHhgfaT/x4xS3zc7poatmZeg/Sdn5fJDv

5c0jZeOl3CbLVKaYKcu63zqSh4BoQCPrx9PCDfAPCAZ7yQ/AqyQC/ze50VM6AoJINoA1AVyX9jMR7mABLs0wfwZkoZ8jlMMbujTTuDDIbFricjyxmKtGfvkZTdbt23fjbohcoTzA/TbmafD73A+rzsfekVwg8BivkF3Afcjg3MfsaEX9j6wVJuhTtHP+bug9kknbcb7lOeiwEnpnTmdpPcPoN5Kg2CCdNnhfATifEKeVAiBF3w7OsQ/X7iQ/QOln

P6QQj4UAGoCkAH1A52/qI3aWOCV2XAC74GABIO5rfpodKDlwRtDTtC5SJca9HnGRCTzjd6svZrzro712eoHhkn9HnGcAarA/O7nA9zT0f16aNyB3rtsx3LigO3kMMWzCfHEShDKzB7jY+h7xg+8L8as96rJXMyZkYdkjMggpt7jEUztg42BtjASpeMljRuI5Hh4+dLhoDOAH8Bs1+HWFgfsG1ELYDxwIKAcAWci1JwE96gMWnysdH4iCS+4Yw7B2

CaBKFAfVDA5obo+2D69GUdnZfIHpCfoHlWVonoY+2bkY9YnuxM4npRukzjx6ydduvCUOz1CqgHh+q4yvT90yuhH66Rr7iI/jdm5X7JqbtUi4hTjII8fWIMxCWSXcDmrvl08uzWDpySM9/qPRDdr249CT/+ciT+5ugcgYCepcJgUjlQiCY1tDfSAruIkJByu1PEZBWmDwMrraTxAeTXa2okGK10firelHfI7oSIzz1Xt97pNcD7lNfYH8mGjH+afu

HsWBtAaTfZri32pd/HFsr+HPEnmGi/0LjTUZCk9HWhg+jNs90iFXCnqd7CkagxtyNn5HfJb3AWX9j+vX9r+uWl+jfWlzCkoNwTeNF5Mcib8btfedVSpT5W7EAcKRNAKoDXAXAD+8/QAMBZMMlj0HcAi1qgfVTpNceOxdvAIEAlMQA/XsD/iE5WawgJ9Ajyrno897vo+HLh3ckL808ax/Hc9n7E/YGNoBm+oc8Xtx177kU3uhFtbdCguQvoYfBqzn

99tbHg7dfocziQ6ceToQPCsgBUNq1KRtqsgc4onHoJLios8cIr8uc0htcuh5wkcKoh/CbqigB9AQS/6QUgDrc5yXOtLuDHZ5QA81qMt/7jzwNoVoxZwwcWnWpQ3zjxbSGZv3cGxGIO5wUSscUZyjWTwpvd72w+97+w/tnxw/nr5w/IXq09+F/STI6+toDoQRiCdgeN+76mdccXNDUH3YfxFgLw+n5neoh7ge0nqZ1lkSux6IWKwRnquZIQO4Cawf

RQMXh/qKsZyBfcMMPJniufCT2XccCzABVAOADPhpdEpmP4gRwZgADAEgL6QTUCXVsduOt8V6ZwktSIEWuBi+nezOiGrB/4H7KCZj9g0kgWTGpjHd2Hj2dmXhC9O7yy8u7+zeE7vs+QQIgNirmywhn6Wrlm0BQidw9yW3a2vptz08492FrhH3y/SO1neBnmtelKNMgAZLtiVgIsjIEVWwP9TTk7d05OOI+jh8nqbmIIgeLjAUYCjxVyCD2BACsqOA

B9AfJBHAH37wrsxfLRnXeqYHwyCMA8gvkdEHsj5T2eXeMGmbkK2VIV7ScY/WBCvCC9KeFs8Wb+3e8r8y82bpC99XubcOb8HNtACZcLE6Jcr2gGAyEj+UTXly/7z6EhmSOAEkXzY/UnmGOFou+3X2+aG32hzO0QMG+EDHbWQ3nRJ2ZypchqTzOeN2pdeZ+pegOvWGBNgLNGkELN0xqPi5HlnOEAMcCF9f0FSqLYAdASNBHAGrVCAdwxQAXbvyn8GX

w1GoyClmFriCsIaPsZolKGXFT6PA2L7AKrCGEZITrzDu2AcLPgtExGr3BXNDGnlE+Tb3GeIXqxNWXlee9nuw0eH2BeYX9EWkZWIImxlto7z9Lp45M/SPltvewVhmfNqvHvS+PGiVrqI/h7nvUOSYpTZ8UxgFkflH44rVAPcFqK6MSN6kEzbsNsDGAUEyXc8J6XcAq3i+IItKTKQLsA8AJDvrS9TiP4cYBEgNmxDAP0Dadao8n638zeM4DQ7k6EiT

OPoza2mOw9J6hAlMFTArr4yZATkqtS91njuRmduhmh29wXhG/dXpw/DHlw/prtG9E740OoJtjlTaVP53e0ItjCJ6bVYb7RQX4I/vLr09z92gMx3si/MHoQvfkK/jc5W1TE2O1SKELCDGCU5N6ISCBoQHGwWSE8BnX95PAq6X7VK+OChwIkAxoHTrMAXlj6AWEHOImoApwj89yX6sB2le3KFOCxiWo6/hr+MSm4WjGFf8RwH0wAPcQyukdOpjlftX

ky+dX+C+oT9E+9XzE/u31C9j+NoBdhgfsnG4HqoxuGtjTF9eL3etVzX59trHsI+Un+c9ZL9VfRHqkX4NBLqYQaALiwVZHA8JWBSL7LC7AF5XlmEALFz0Q/7xgqfKLp7ett1HgXAJV0rgTEwKZNQdFGA4D/EZwB9ADoB8QTG+yXnXc/tVexlxb+h2acNLxo1nj4jeGisuJhclx3nQU+Evujb3o9oHx28YHqbc9Xle9u313dDj93eERnFvdGgsaQ6Q

k8XMWjrnGNLhc20+/Y97/nenpa/X3ta+4ynVpMOF3xFi3VBjIHDFvcKu6pgauLeqE49dwbJ8ZkGFh/3jpdQSnYCEmBIAF2qGtLFPnvFmAWNzLkjJYOqzpKGsniBWmWAVnmpDoL80ILTbAc4WjVi7xUZ4CRQ9dd+1ws9+zWsnLqh/dn6y8K2uh/ORka9A3WHM6JYjsz7tdMYOCTDnkTsvL7jhfv+Hy/+n2TvOdhTtVTPyaqtnJoqm7QAhe1Vt3CBx

pMAdwAXPrIBXPlZoU0MQBC4K9O+Olc/M4TTuKdu5+d4a58dVW5+XPzvAPPjJpPP7yZgv3nDXP7LFBAO3AEmtc9ZwXht2N5RFbn1QNgjtLdh92jcHn6EeVF/58vPoBpAv958gvwF88QuWiPP0QDQv158kviuiEoL59Ivwrd/mw6q9eo7uIEq1Wyi2UALSVyUUANUY1AK+XYAebqngTXc19Akbl9iqVGDHdTcab9pkobchH6LiwDgKmmgJQswlujzx

jTYIMu3ZUObFmw+upjq9Y7yRuc6hrsYT2bdIitw+e3/s/69yY+0cT3hQMa3daN4zMbDgXgFjdYcR3lff2xgkH/hPy+rXvhdUi/qKvcIBg1KB0gFkD7htPI8d8u56BpkQkP3BN7jlD5P2VDlnMxoBABdgczAPszlRdAbADdU5gA+oZSC74U0fOAdbI19PQaZdqIuV+d+PTF6Dyxgo0p5h663ZcEA+0k5sckP2C88r+eeI3wfeBPlG9mv9e+DXsOAE

oqBibkafeS65Y9z7vwbNmXWKzXp9txDilvh8T19pP31+tSlv1gsUshcOWdD0jZhNZBPQqABUxhfOKXvBPKu5xv2jEJvzpdM1qACGiWmg6F15vgkN6t3lyEjmUapA+WkGCH6TAYasQGpsPvPMtUC5QUaWII2ipXt8j9wf4D3FNfl6Rsmvy080P609oXige38671gaeyAT3geNUzqMaRGMSl4L3utvLpJ88F8yuiCWd8U3sfP7+DVu2svQ58iFYBl4

Z58cieUG6Drk6XuuVyrEO91m2X5+VARPAKljkSEfzYjEfiRCAN8j/vLKj+6uGj9INkiRFVLr7ejkEcpbnc9Z8vc+7hoMcXmxj+FRnC5fP1j9+a0j/R9ij/6VED3Uf+Pu0fgfHN87ztCbvVu3757fIaNUaNyKixPjqADbsLsBz47MdGAczA9AeOCDntW/yC4TNXt89hltpC3Cxi9jhQTT2kHmaZd7gRtt7pt8+Phe+tvpe8WXjt/UP4J94H93eBDn

28ePazRl2wk+75F9dJkDpCuvg5+XakKPYf5mdMH9J/hJo1KcKoahSwRcuWpFdrWMCnqFPlsC7gGdAC4n4AHvsp7UV7im34Hg2EAU4CaH3PvQWmYKF+ftB1ue/jdNwWUs8dAEN5MaZ6R0Uirezy5g4JmSFcR4O8jyZ+tn0y/kPwY8BPi0+r3kfchPsfcLD6L8kByfnDpA+yr9cee3Flddu1fZ9cPqd88W6q0ZfgR/hR23ktR82220a5/K0J0tha5L

6NTyUs3f9593fwfgKl4Ee4enI5Yv3c/pbm/t0b/F85bp7+2l1AC3f1mjvfh7/Mvvj2sv7/t374FX89ePy+IgYA1AQgA+oT4izkTyLjAAy6UmN6/wPkVh4qHHwpteqJNKDKvHdKs9eeW5e7fhQ1LiACP38F9hOkbAfavqbWTPzHcSNzwfNx/QWNdsL/9X0feObiUfrf6fzbknBAb2yXUi/wJ7o5QWRGDGTUKr1Y9eX+2tYf/clzvgK9CFrCAMT1MA

pyb4v2SKxDbvjMhUKahTBchti6CWpRWIXbvF37bPqPiod1fhVEoQQpN9AXfC0qchvOATQAbdLFgpRXVDpZzfGbKGxhZMVKBShU5TGxD+hLjSgSjwbaMVnr3hZoGOy0ZWCCW3/MuTapnW6v1XOs/mruAfqRvGvrwtBPnn8rfxzcjj61828T6aXFrpvbPmGis6Y12mxIbuK6s7+RHwR8J3qZ3gBXchmIfLjCPeORFi/qLWOd4iqoRpQ1xePrIEIGQ1

fit1W/44WygQTraZL8SaAORU+oCgBqowgBdAL4BwAOU94/r39uWPa5awU3cVS/8/owGlcVdoQJ4jawsHB+IZ/kU/W5dqLlM/+P/QX4y/NvyzeL3ih8u3nWvc/1G8DXi1+QQXCd2nnsMVMcoEjbgePhzqMbVKMt8Tvj0/cPuX9eywV/YvMkh2r/TfchC1plaxhsrET6F/hm/1skPFR5IBcGZHBWkBsQC5gMyD7/CV02e3d+LsAhgEBMCVQCFDKMHY

Bz6H0gCgBODXJkELsxXyPuZSMIOmhYdLhHqzlfOzouLCerd6s2XFhqA0VLe2HEaG9Y/zf1FPUvHxgvAL8W32IXa/8Fv2RvO/8u3wf/ZdQAyzvXe3IEalW3Pyc+oWBwR0gtBDTbSd9I7zjnBCtnKBAAtVc6XSEfX30DUFVQGFhXskLhFVBkVCQ5BhMHfFisf6AiEnwaWEAMAKCrFnNFyQKpRsJNQEGuXQtwSF4sczIWxFCEahB/z1f0YBg0AUvub4

Zbbk+rbcpv4wo7ZM0B3nk3YQ1B3T/iDGdET08KRFs2zzm/fx9l70W/DP97/15/dG8fn1WfRT4MfFOUYKVTZXIPSIsiHntkcv9Tv0V/HD9qWxLyfko4Nz5KGoDDOw9ADy53PBsYXtAUuyjYSzsfR23PH78xPz+/fc8HO3JEJztjzx6jJ/1P+0vDfk8oJVDgTAA+gBgAZyV44AQLS998f3WKG984MBLQVx9ZWDZ4SCpBZAvsdjxBp1/PQLl1FG5kId

MGUj/fZCdUT0otEQDXb07fVxVaH1svEmcoPzNeHfI8RkIVJoZCHydfAIw6O0fbf/9jvxhtGd8KgMy/MZtVvGqCUbZKvgBHMWgLTV/dYDdKvDwWZjYymWwAZgBptlxmfQAhzWKmQfZk0FOWeKNiTSROAekLNiY9Q2g5cDdHGk0pwBJAdKpUPT/dckBL1k9aKNY1OxTlIECcZhBAp/sMRwxmMvAymUhAr55CQBhAsWh4QPGOJEC/cBRA+sBW+HF2DE

DVHSxA2fBiNgw3fEDtvipoIkDfCA49MkCvnyvWSM4DOwE/J+E9zSNLUEcqN23DE81cX36A/UwnO1pA4QB6QOQ3RkDwQJZAjDcoQPZAyMBOQIRA4XBkQNtwVECBQP0qXKNMQMuObEC8bmA3CUCgZilAtLMZQNJA9D1/3QpAxUDExxZfBS5rVyBVFnMckGclaNB44GIALUQZ8SRJUcYH8BqAAflJABQTCx8vf23JYZA00WGseTA8VVlYHBASmB3yVs

QeiVC5etBU/jLNQ2JU2ieDFwckI3nvQQCBjxSAkL80gKuAgtUbL1FcUcpcrQiDSqQdvwnPMkpwMFNREXs3X0OfBItK/z9PYes6chvvVUkq21QgdewlYFZAKuwnIBbXeWAOZEjeUiA7OhvnAhQi7ySvLi89P3kHAf9gqyb0JoBWAFGAb283APx/T7IcWhscf7wZX17kR+hPLkMIVMplfXnCIZwEYSUIVGBSgNF5E4CTTwS5YQDUgNEAhZ8wP1bAjw

915wF/IG4t1CZqH3c8L2GnOfd+VV0QOdd2FzS/D18/gPO/M+YvPXU4CfBJm2VoM5tkviqWdCD5mzLwYUAsIJfrIT8vvzeJXZsdw3KLFLVq9DQg22gMIIIg7/Nzmy87HVs8R10/MW9Ol1hAKRU9ID9AQMFTwMX/AKB/2lLMKiY200v4NfpssylYNgRaiWVfMkgPLhU4MuJEah5HUd1pvzhvJICr/3m/X8DLgLEA64DwPzofahdc/1IMRtoLyDzqVf

o4PyJvED5OKA8vE+dAAPojX4CtALjvGcNTQQVBaJoz6k60c75qvAyjXs1lQTNBRyDtcESjQ5Y3IJLxSLVqbmUtNUCRP26AjS1egIk/SiD7INVBB3BvIJcgtLFGowmtKH80Gxh/ABdxb3hMUIUVbmwAHlgjIFIAbMcmxT6AN7cxXyZ5Z8gJqHuCSpFQYUt7cwskuBxIXQo5BQY6ZSMT9Tq6ejouAMT1Sp1mfwT/DscL/3hvIL8fwMbAv8CsURQvLS

DbL0iXGNt7T2PIYbAA7yd4BL9x/mpifd5Dv1UA919hwKQgqv8dAJr/IQt2I1MYfBJyCXpzaxBMIGsApd8/gEyPEKAa2HFeSCAPdyv3FM8Lf3jfPcCWc0RLb1oSG2GxIYAhAAeqcJ0IWGj8DoBaaDsBK99M4FJ1fal3LiQtO4NXaj3MAnIOKHerBA1WIgigSeRaGjIjAd4hKyzhctApWBs0OIDqS1GHRWUvwLqdZ28LgNv/f8DwvzGPRzcrl2UbKN

FnDR3eJmFdDV2pVbcqfw2HW29dqT//ND8Z+3PvJzVgAK9fFa9poUvtaI1i0QsbWLR77WqMO8Y+IivbMDQmyjhg/NAipGCSbd53MxDUBtEFgW1hf+06lwQsbxsSjT8zZD4X/iaXIJsS7UO0UJtRb3GA1HhmAHypHYBlICOADoAPfwTzehdXamgie3IWUnP0ADJPqwM4NlxSzBPvdvdmPlBqPe5W3n03Eqsi61hvNGDfH1NPc4C1IOxggaDFn0ahFN

x4ugPsHw9QbRpTSCteBid6eCCJ40HrTQDmYI89fi1hlC28OrwXe2w3YzZOtBpWe2gyNnIAWtk/ZmTxapotWRWAKBYDKk37aFYpwG0dWT9o+3eWNOCnIMDAMKZs4MS+Dtl84LlwQuCn3QfdUuCqYE+/M/Nvvw1AsiCtQO0tcr0f6xy3OR09DlTgzjd04LrggWgG4Nzg475m4OFAe2gi4MdAljcy4NwzLT8mIP/zFKC0zwVRGoBJEwKpP0BMAHjgeg

BN+GlnGoBMAAoAF69j+EjLLQ91SirgN6pTYmS7arAxrAMjGa8y0ENSPw89T0SbUTBr3C/IEHANi3ags/89X1IfA192fw8Lb8sQPyW/QaDAIP7PLNddIPIwbRN9xVeAz/9uq1mELqFGsHRYMoDrIPjg4xsfX2V/blMbJBPAMmUtxw7Ya/ofpFVQYWNcCQxgWdoWoge4PX9sW0lRcitLoJ3Ay38sAIVRLmwIfCrkCYBHw3oALGkhgBXxJyRI3moXez

9/2nLgfHFpY3e1b+UdyHGoU4wPwXRgYUI5CW4sL6tOjweyXxcuVy6g5SCeoNUgvqD1IJxgzP8Iv2azE4B7LwOiAsVV+i8jZykL7Bgnb7NUPy4LNQD0v2Wg0cCFzxnjbL9a/1uAaxASxjzFBBAXKAxtAxg67Bn8eVAYQB04Lv9goAVgP3ELoOSvUMD+/xYQxBEDsU1AaEFCACdBJOhLJA2FCzAKAGj8JrcF/3VKDMDBrC4CCgw292wdHXIajDGNQT

xJ5CavOKBEkXcoDEgxqEPFBPVX9VV9dFNgezdnfV82fxT/I18u+1A/XGCPb2XUBhQzixOMVTB32icvId8O63NEGs9IjBUAr4D0snNgSKJBygQAR4gvoGLeCRBRlB6AdaUM7UEva3ootGQdfKI6sjGiWxCbIKOHeO9wANVJZ6A9BGVVLYoVYAIUfOBhFwINNMg7OmlgMOQgZCrIOOQG2xUfS8cLzxT9FnMQ/GmQ/SBZkM1AeZCqgEWQzUBlkL7sL6

CRWHJpZrBFFBh6PEgizzgIatR0uDR+bp0AXUqQEDQAFRIVbT1r6lVgDb0AMiVYZGCKqwSA49cyHxUghsCkb20Q/2CAIKWffSRgoDUzVqEYlwoPCNg3syMg5BDXgmhIIkhRkLpg+a9knwMbJmCkKxyXam8OYPyXSxtxDHZ4WIMGZF6MZFCj/lRQ2rBwpQxQqHRv7QOhJtEdYQNhbh5NakqAaJDYkPiQ8wBEkIfwZJDUkPthMyBFymXKC2pVyjxjd2

FcHSEoTjgQGGDab7QmykMydApQakzDMIdvajrRCzQzoXxjBpc2HgFvfxtajSyoMEF2l1RXRBFkS1MfTRdKqHRLPtArFwGoJeJ0WB8tEQQfDFkSPtU4WnnCOZAdyC94IwsSzFTSFRDVNSUg2b98UMxg32Cufx0QjICs/3BzUuAmLVGQRmQ4ayl1IUEYIJy4Th8FoKHA2OCRwNAAi78JvgMtdmgNKkFwCfA88RyaR/NHKhtwb2gKQFheUWhiPwHoAL

1JIWTQEY4KDnrAXetUiBktFtCZQDbQrvEO0Nb4LtCS5V7QyyB+0PRWZ90fJj0AEdDa2THQpZsH6XAzV+spWwvzajdyILlbSKDG0MnQwy1IqlbQ22h20JWaTtDVqm7QuXBl0MZoAdCsoCHQs5Yt0JZmUgBx0KSgq5t0G3CQ/r0Y1AFfWUA9SFnIArJclVIAAJFZyGSAUe41aBz7IRDGZCiEPewUcChnItAAAw6zEYQfHiJIQp0ypCK4HdQNWEd9ap

CT/0LLIy9AELUQjNCNEIJQ9t8mwI0glsDSUNFcGsAEexuUSFwJr1MQxD9DSnGNaOCeyysgjlDKgPHApxChC3KgbCBSyAZCeVBmT2IgT2MSoBcgCOVZu1VQKuIq7neIeFczf38rF5Cj3yglEKAap0wAPiArsyafaC0irif0Hu1uYUeXRH5K3z7tUZBW0EbHBuZxrEdRLTgLyUV7Ufhr+BcBCNg+HAmoT8CvYO/AzRDCUL9gzTESUMahVyBCgybgc4

0Ue03dW2QjBgMIYWMMENqJYUETn0ZKSoAkTHl0DNlsWVqpZKRkvniwxJksWUJMLWkfVz3QyOwCoDxIPiskAWgiMjd1wwo3c/M0fU1A4j1tQIj7C800sMSwzLCUsN/QnztitwAw4jN3fjmuHgAUohZxdEtAPH4QZeIlRx0SVYdelT3ieIAZghP1U8wJ7y/4GGpJMHkLAvxW0G09ZKBxMFG1FtBhMWbPeICJ3kSAijChAM8w6jD+oJ8w9pCbgIYwgg

8cgIFJSrB0fmwwpoYewL8Se/h1EHL/ewsWsDxVY4cJiDhMSqlIaVSwl2lXsIkBMWlayhJVGTwIwiEiDoDhPy6A3uD/RxPQwMcz0OZwZ7DkhW9vATc47R0/c89wdUvPXCZmAAMgIP5EhXYAIwBjqzT9C4AckBgAZSAY0E1ndJDdohrsPUVvZBc6KOwRt2/aKswgGFtEaLhxtFmsVvpNyGLMSVg9CgMvWuM1sKGTdzCMYLNPLGCc0OJQ/bChoIYwsy

VYEPNENEhhwmduZIoe6yp3LjgFxy4w2g9qXTuw58hQaHrQl3Mca1VJbMgyNA5xXJ0tUhovMbJWciB1MsgGNRSEAWcDGFLnLcC/524vLatUx3d+M7F1dB4JWCULgAFfBcgDgD2rUWJWrFHbez8esJfYYolo/3QKSxDD8RRVFygbGHADYvMcH3LgHd0BgQGwSb9QEyNPFn9GkOT/WZ9UXT0sQ4t+cKgQxid/cVpcchJ49VAJMc8oxleydzwSoFuw3n

Q9lHFw5CCPiwEw1UlN7FEEFACP1BVQDthL7hExRWA+J3OKIhICwzDkNcQqnx9Q4FVb8FIAGNAjAAMgTK8mgDgAXfBjsQOAIzp9IH0AX5CzLn4kCcJPgV1GY2shINr6cDAnRGqQPyMzZD+GO8gNz3AYCxVCC3Zw4gt0YOx3Dn98U3AQ9IDxAMyAhbdywGDgpJsY0hMQwZD3eEDJBGVXl2sQxaDXPQVw6Ll/gIfFXQDcZXpzHlFOi1tyX2NWQCqgAy

QHuFpgbQQMEm4nYAjLJBuPJ5C7jzUfJhDVFz38IyBMIHMwGNBo6k1AL1cckASAKiwm52JCC4Aovw9wldcHIAPsNKw/AISfBvcrrTpkXYROQjAIDMtsB00bfz9kT0C/LbCqMM7PDE9c0NPw/NDz8NtPe4CbLHh+QCw+jHs0BD9xfwZSIFFEhllw+nd5cKLwxXClf1Vw+cQNJy1SE3U0nlcgMGQMKz6yb4ByCSwrP4B1YEeQwScwkItwumsrcIVROa

4+IASiC4AhgETAMcZJAFGAMJFZyCvSD7c4H1/3fwQdtTJXIHQ/a2Z0Hy1ggSrUWZIuNFUNY94v+HrQKdckJDFYYrsxlWIfXfCqs33ww180J05/Y/DmwO1jejDixBevHHFtbVZhEqUHNAKuGQU/Bkx7FlCAAMzba7VX8JLwlaCVcNQJRTgLlGDsdtgFYCLIYHgC5zLIbCBZ0AZgT2MLJFhAXsk79G0I7JNxD1gI1iCanwF6GBtTgH34ZwBjs1wAZ0

FE8HHsCf8zLh21JP4d71k6RRRdShYiAqE311hIWE94oTVsbRJD52CBVnDbJyujeydGCPrArNCtEO8wtBVfMM6RcoIvuV1iNyhCbwAUIoDkVTtfHz9BwIQg+N18iKVw7QCiiOwNfX4C5zYcdRRVig4VQocYhEMYVMgwdChKPrI0yFN/M3DS72vHOH8Wcz3ZVn0DAE1AI2DUwzgwe4AdCl6MTcoPxkp4CtARsJlpc+xxEj+GE28uAkt7UjcUwQ8uWl

xWEShcfu1NiPWw3FDgEOaQqIij8PT/WIjfC3iIsWAjgAexLe9FPmNdLjxNnxS6NDlNpxr9bxcZfzRrHh8Unw2PfMZ5UmC3aMx9ViiwH58lw3FI3dCkfSNcHhtggRtycMIUuAxfSjcj0Iqw0r0B4KhHAYDrS0+WCUigwOh/EMCroPBJALtwwOoCA4BnSSqAZwAYAGR1blh7r3oAFJA8+k0AewjeYzAkCUIwI0h0dextEg/oG4A9RnhqHRJQxiG/aE

ARe0elaX8AEMT/OPCPBypIyh9QvzYIzSDU8KOAYa8X/1GvKVgzJHkAyeEocQVHEsMvtHdPbIjuCw7BZDRb4z0Xd49ciWUAU4B5HGvaNH9sAB1pQIdi7VV+YJB1flfbcRkc4WkI4ojtGB6iSEsdOHACLJUwSxuAQDRwAjovWIloS0vsfMgTOAl3EEisIg6IrWDkNFeadHgccKygPoBL/Ep5FEsckAk3H0EAT0Jwv8p3tWaHWyRtbREfGFMq90RqHF

pNymNTC/ESHWFjdGUwUnWIlA8tiLrAs4DGHWzQmIjaMLiIvzDzHw3nJmF40XqQd6wuqyEGBYZXtBzIp/Ca0MbI/7xmyL4w8bNy8MSVHTkbEFcgYhDuHHLsZMh2HEskP4i62GBkUmxfi2rYTcDoCMYQm/dOiO1grXRzEGZeAYB9IHUgZMw78EkAQshfjxSQE8CNyLG9apB/tFqJYIEmZAFlfPwhqGUjSXppqBXiQMiT7G6bacU0OXoIm7ltiLvIn4

MLDUfI2Mi6ML8w729hcK2VU8w9502kMtCrjXjRZCRQyMSfemCFrwk7JsjKoCbJCbscEJkI7RhkVF3HAEB5UARYeeM2um/FUqAoUDdjaEt45GrAKmIiEg7w8u9gVXGAHRdqLEudX7dJAFX0RsJRgByQAYAkQLqpA/VlCFwdfCAgoGHSVkcG9zLtEwp+0AGRYC85BQkwFax7YL4oucUBKKdvbnCHyNpIp8j6SL8wze9GH1o4CKBx5G9kNad8Lw8TOG

g3TxS/I78bEKOfN9sVI00omLCBCwnAxTgHgHQrDcC1YCt+OthkyG+0dXCzwGHAOpA8AFTILCAs7zsogwjZUz0XOXR8AB2AKoBMEXwARQhAZ0qySQAckHpYPyjSpCcBA2BAyQx8erAzwBSAfNAvtEccKlNl+RBgEpgARRS7MjR34KQPGydryPrjTnCD8NAQ4D9UqNEo58ijiIYfN8jpuGyndjw0yKhgc2QCrgHkE61aYIAou4jvLwqokCj38McQ+d

9C205PcFgEWEUw7IJUjw3sSHRcICgifQCeT3SHOth+qMHXYFUDOh6AMkwfUC7AXfABgFwAcYBSIl4FZKQM5G59eai+QnCgMLCj9FWojy5oIjtCethUYEGnSNDFEJWsVUNsULOoxKi/H12IrzDecL2w3RC8YILQsJ8WSLabBbQs4ULXPlov/yEI+Io0u3W9Ei9KqJbIl4iTAV6oyFgTe1ELBqJOyPrXFcQsWhiCHMVflQqQJGis91R4T7dpExgAHJ

AdgFnINgBd8BVydoBRgAOAGYo8ERa/ez9Hy2CgBLRvd2fIKZI1FEL8ZTh/rHQKA6kli1CDK9sKpXPeMHAryNrAy/9KMPZonbCiUK5ovNC9EJN9GHV9MU3RX+Jw3VsoSDFxOTpgKWj/qNLwgctaqN0oyR9kJBzeCmUaiPJlVVBg304oKFhuFWB4Rp9rUjaImAiZdwAwhl4KACaAXfBNQGIAfSBldx8hFJo0CInIfAB9IFcA6iiMmDAUOaZISCE0Hz

cyCKP1VaRggQJBTS9eZBCogd4s8NIw8MigEKaQhPDHoyTwgccU8IZI8WBUO35ozec+JAhlVi06iWSXWxx6OlTojSiZaKRtRl0bgALISuwkIGKHPcR3iFB4OldalHzIMxBS7FOUObMbfB1o8EjOl2UAKoBSAEVxA4ARfjeIYgBvKNHuUAcqgDvPdciHCJe0IOE7yx7QU2QwLzFeMKBhjTkUcqRKpHaGEuMJMQhcSAFQahavGSwY8I6ghpD56PjwoJ

c5nxjIvnDuaI6Q9iQFbyNrR15EaiDvU55TNwjnBzwMWHMg1gdxCMFI4Cjj6NAomqjwKJtUDnErECso+KAQgHjkMCc1EGzIexg97FCgfCsqexsQd+j9PxjUDn1SABt0VNQdgFDgfqJNQEwAP0Bvfg2lJ6DbaJ7oknAB0BMKFpBouGhaCRDWGlaoAYcgYAZkDMslEIgxWPCCGMjIxejfg2uo0hjI6J5o8/CZLweogB4EigXqNeZ/nSdfWWxWsCCPKx

C6dwFIxa91KP8jZXCy8KBonvUWok9ANCAUkx6ufMZywEskZIIDUH3uKVgVUBaiPUhfaxkYjR9kNHlQIYAqgAfwLYAZJ2izWchzMBnsPpcX5kNowRDdGN4oJQ1Tb2/4UwpK5nkLN4URHwNnGzJar2IVSxge7TzLUqsTqKDo7qCmCNDolgj5n2cY9gio6ILQ1MCPGIBgW3Ipe0hITvNLsLc8CUkjSmYYxVdLIPWPdhjwmKeIyJjcEN7VeqIpC2CEd4

hilF2RRuI1BmTIY1Iin2hLTRA5YAMkJTDxyKUXauijSLDAzpc7kWcATuiz91A5Uz8BtD9ATUAQWCqATHg/KIFQ1PdQlC1gS2DX6FiDWtRHHFzgEpDCKFQHTfDUd0akMbt4qISlVmjvYPvIvYjOaIOI1ei/MJKvSSj4ikbMQHgXqNYqcOD3yBmLKhBmUO+omOCgKMZkDhiAaIDPKJipnSljOyAmXX8Qhv945GLIVMgwz3YsWFgUmKrAN6A8IFLTSu

isKPuPc69U/V0YUHwUwP0AIAd9IA1EfyIblD6AUgBVJ1qY6GAQFB/SC5QnZwM4StxEHxPxYyNLyPnCeTB4T1TQghdyMLxQkOjkqIxYkSixmLjIteijgC13ECDFPkKcLtxtE1H+ElitlD1nNywj6K2Y2yDVoP2Q2hwYJBBoYmwoS211b9QMgmCJYpRcmErsYhR9SUskdi9lMPaIx5i4CJtXZDRv6MVGTlg2gDNonJA6Ii0HSKRskE7ouhC0wP41BG

gm5g+7K2sRpleAWyhcSG/0CKjWsAzLXpi3qNsYk1jKSIcY4SinGIjo8ZjXGMGvM/wCUXgDV9hWLQKIp19pwhJVY1NbiKpY7Ghs22lozhjkK0zokwE2HCrIGxAa2ESAL7gB1TawXAltBANQUsgIjGrYEKAbJB04VoiGEN0I5Fcmc07wlnM2gBMfHoBZmUIsAR5EwFlAH1ApgGChXQd+fztozqhjUNqYDewztTE1VEgb+BA+E3JYKT8IqEhYIk7gKk

gj/yIfXBiwyM6ggQDg6KGY81iOaMtYttjrWL8wgNN7WIFJf39bREQQvx4IbmSXIpRj9H7zVL9R2NE4cdi06MKInZidKMX4c+wUbDN1VCANwQZCQwZc00MQGuIINAe4X8h/oH3fUJDtwOwoqciY1ELIr/0c7VGAUsjyyIaACrVxgCrIqoA8CN+hGhsaKKUTUZAEum3UYd8G90tSXEhX4wIQ2cZ3q0QIfUpe0CUwAdBIJxKrPLDnH1tyA5QrHFJIyT

Nro3TQ01ioOJ9gi1jW2KxYshiDsISI7LDHDSJg1Rs2ORp4EbAqpGdPIUFDySySRmRPWKqoscD50jZgmzNItE5gsQwAPFU4qTFFMDq5Mswj/h048ng9OPzQLJJlamqXGKgNgVqSUWAKp3Ugc0j7sStIm0jWxU06B0jQ4CdI7VDsMkuBfVDrgWtqQjJ35VRgEeBLCQOuf95kuFlpVyAl1zvGLRAQ4UioeWDCY0Vgl1DUPgjhNWDDDA1g6UQcKOQ0Yg

BlRnv8PiAKACAHOABMAFNorTo4AHR1LJluIOVY2okunwoQVHAViNxLDnhqeAY0VaQ+pzNjdFov6Ai5JRDeAORY6xVbyKSo8ziYOMs4+d122PIYvTQjgE7nJDiiD1AyN7JVt0HfMWiWiR9I2WM+SL2ndZjeH02YnziHEPpY3Zj4Mm+kbQQSeixYDKc3oDbMTCA/sSnVb1QZ1RTkFnEcrVY483DD2J4vAajgVSEACgBZQCPgz8QeYwnXF7QWnlD1e9

dVuO9Iz/BlCEtGdyAwPHhSa2940UY4A9cE9Q7cEVs0uDkgoeiPYOWNVFiPMOYI4hiaMJuo9KijiNWQ8J8gemoQfmVWHww4qMYuoTSKdDAKWOCY77i2GJpY8JjRSPQAeH0J8AdtJEdFw3g3JXjbaBV48QEYt1KlUBV/4kJIP7CVSLKw9+segJxfTUiAf21IyosNeJVwLXitAUawuHDmsKeYjvkjhWBVM7EhAD6AccgSAAfHRB0qgHoARRxt2HS8TJ

M7aPrYE5RYcwilCtAfLQr1BCosWlIdBhd9WNtKeFj7XynnPQ0wiO2LE7i2aOg4sOj9iMu4+DijiKvg+7imYWRwHchOQiPeV1j0lS1QMbsR2O4wjZi5eL+4mTswKIZYiACJCwY4E4BgdQ3aGdAYWBVgIshS3CskZ/Q6ogLgFjiK6P3YtjiRWP/vFnN7SJwA8kIqgCXKR5EEgHUgU7EEWE4FK68D9WrIJWxP7Q0oqtgxrDBcNuBamEl6IV5JIN6TAW

N9uK86aedU+PGnSDidiMz4kZiSGLg4sSijiJa/PFj6Mixac0JS+OX8DYpRZSl4mg9WGNCY37iT6J/bFMBCFFRiYhQepRe4PcRBsl1iEONMh3G0YnMiyGuAHJiEEWCrUe56QBqACkJfkP+MfSB5FXhMAYBzMA4AOz8FuOrICTUgNAB4QnJckMZ5QtQ8E2vxMHRLEPRaZj4YhBuKQTRFvUDohtiIOMGYy/izuKz4zFic+Lv4qmENZ2Dg1oxrRGFox3

oklzF46VhAahv0bzi/+NSHdABTyDaiJyQXEPDYjRA5hmIUNcRiNSISSrBcIFMYGyRSmHgE+Aissj1gX5CqgASQFXRvSWipBOAfvF3wFKIV+N+qL/AMrAEsVMpfANsKYbUy/QfIMbsDYl6ocCMj3DJJIPdDT36Y5gSGCPT4tFihKL7HC7itY154ngSsdSyom3hdHi+cNDiW2ksQhUdnyHo1T4DcyLKowIICONpY9Ojsa1bIhQRgSwzFOuI5ML1gUq

QKDT+AYhJVxDzqM1dG4jrsDCidCJH4ycjRWJZzLfUR7hYgYqBlIEoo5UZGVAfwDyVygn543mt+NXrYfwZ0Yyl7I0ojd3F7HtxHuJComgS7gTXbFaxUWiO4yZUL+MEoxsNr+O54q1juBJ5JYxBzBSWQJsshkRmgnTNbJAGbUqjn8OpYidi6WP4wxvjVSQggH9QmE27gKhQfHiIxFqJjHF0EACxRBFMYDG0QAh0EpNiY1GwAIYA+IFDgA4AuwBqAXm

wH8HswBuQnj2v8cexTF3wEx/QfDDhIVOo3W2/BGu1hwnZyTcR81zQYs9xKS0CYuYSAl12LY5dE8LpaNpDrOIFwhIj82OmY8jBpVX5TcN1SNBTKWuARAhsHIJiv+JCYtSjf+MnYontTEUskXMhdUAVgR+i7shzFYcIBI2PBebtMp1ZAPZgzgEFY4fjkePY4+oTOl2M/TUBTgDgAPiAYzABIfFkBgFX0dSAkoESdFfi1bFiDPK180GMmNRRALwATF/

hgen8ePRQTZX9bGei+APP/FgT1ELM49FjzuOXozCdCRPjI9XljsNspFtBYRJe4oQSi/3IQPnFO2BCoqvi5cNl4k4TMhP8vEjjKgGSCKWBZu1TKVMg/8GcRXtAnJDskUno5wPTnH4A0yA+E55ioJVIAczAP4BztYKE+gHMwWZl44AuAGVi1RlOASQAoByhEz0AKSHhoPvjbRA/oeS8KIRd6ArgTJ2xIMbtFc3KbFGDwOP8EhYTTuLtEjgTYOKs4lx

jruOwMPKcBeNFYX9Q692/IoUFKSErAXV0JBJZEjVdVJQzIPexkgke4QXEmRSXjHrIU5DKfMPVLJDo8SeR0xNenYC0Y0CFPLa0dOE+SfAA+IFs/TABq4D+En34V+LCGK2J7CUMcCv0jyEkCOtwB33/wavsDsChKFMEU+M7E/BjG2IXoohi8RMn6ZPCnRJtYs9skyNbzVgRSSWifEKc59zVsP8gPuJWPfkiZeJ/42vjJBNMRajUmHAt8N7g9BAdIW4

AVxA7YauBQaOKUH2Ni3RHLEkSOL1/nUEiUV3solnM5RiaCZgAPiAogZgBTgC7AW5w/hJqAIOAuiwfEprBhwlaAkcJz9GSbOC1KSCQ/NvcDYn6BStRjuRqwPSsla1A42eiuxP4ogISOeOGYrnjdsMHEq7ibOMZInjtoJKWHWii9CFYtUWjg7znqTkdOZH/I6XjciPw4v6iMhKI4jOjuGNzGcYMw+DBYcWALJGKUMXdpMK1aYOsgZG53LmEucjuYzC

iD2MlEsfjOlwfwCOAAyw6LTCUFgJe0P6NAoDxIdw1l2zcBNgRNSknaINcQDxCtfKto7GZqajIgvFQqAyMlekvAvf4vI1Z4susexIz49gTlhM0krgTbqJ4EtrtuCKBuO8Yj7ntkVbc29xWTA6QqpBQ/AMTv+KZEzCTfOITxcMSKQBphFOUegCGkwjdPgHteID4fSPn5I3ie4LVIvuDKsPN4vF9LeJy3UaTxOJhw/DMmsOubRNjMGxNIzpdHTEuFfN

42gHcY1r8CzGDsU6V5k3RjIcVQoE85TngYcBXie2CH9HfE+aZG+zdRfqxN7E7YD6TOR1WwgCTjOM9g9niucMqkjSTw6K0k3PieBLE9R/jj9ExYXZh1bR6zQShh4DrcA4Tq0J+o44TCOJ4XRc99JFCABGYD6mS+VkBWAAhmHGSJAUHgcAg2BBJk7xx5SABwkiD/WWxfCEclpJ1ApbwnOzxk7GTz6n1I5KDDSJ2k53iyt0QRBRjJACMAd1dQ4HMweg

A+gAfwUYBzMBSQKRUBgGUALN5gILtolsRHGxc6NKtlCDSRdLgTCl1sIiEy0D+GI/Vf6FCMA4CR4CYEvBikTxUk8qTAhKWE4GTs+NCEme0bWKtfV0SmYWSgQ9x24AEI1EShHU2onbVXyzEIxkThuxbEQICsJP+XIiSUuzVgHUleXV3EWFgaewo0SYJSCT7YESt5F3uYvtc6hNCkqCV1OHACHoAvOEyJE6tGfSVdfSAtaSuRaiTg+MIGbUTamCGwMc

JOGz6ofqgcmEvId6t2PEI5F2dfpJvI42S1JKv4s2TOBItk16MeBP77UkTzRB2pGJJgOK0bYQSxaIx8Hejiq26kj2S8e1YsKCD7EPr4rhjzhMU4QAi/IExsL0MdEjYcf4t4IB1QA34woHMQWpBG4l3AQ8TAMIJCdLiSAh9QJfEdYMkAUgBNOi81A4ASAAaAeCUV+Js0IsxtYDLgIGh7snYidmRDykMrOWlbogiAsZVSCKxE6Z8MAxAQoD80/wdE01

8wZPWEyD9RoNf/DqhkJFSIrzwX1zYVLJCP11HkiHlvWOeI0+iEGmRrd7gsIF0YNiNpYBm9IXJtUALgIGQJUyrIRJMBJyFY4KTR+OqfVHhNACjpP0AH8HGASQBv02aQYgBQiDFk1RweAGira+TiJU88R15JelIVPSchK08Bdxwj7gP4jII57jMPXOF7jH1ksDjAJOtEzbC2BL7EqqSQZJqksIT1hKi/PFjfJwW0MeTFuFwvAdiXsxm4cO9cOOr43h

AR5O9khcTP8J71SK8dUBVQbxw7p3BYbSUoVz8gE6CMbBYBEp8ecmokuNiq6LLvNHiWc3OdTQBz5WLEhIAY0H0gAfkgqVIALYAKAGcANgBZbz8om4MGESQBJ/oxwjx8Sy4X5IgEnbifxKOogd4AEm/k98sBR1xEpej8RIgQgOCjiLW/SGTtFHJ4buTFuFiE0ySE2AbsHDkKJwZE9CTPlxCUMeSImIckqeT4MhrYCR83IEwSUQdqFCggJWAShLQgeC

Al2L4Y2EAEEBm4beSvvB2DGKtz6hu0L5Iy8B1pLYAoAFIsd1polPFqHu1/vBwQI6VDKxTqUYM7C0ek3mRjUyVDDsTmaI5wgGSLqP/k1pCClMOIngT+f0f4vixVYFZ0ezRenX3nJLhQjAEseBSTFNOEhvjAePfUEnxxkGQCP0M8SB21RHl+jFckNfkZUEE0CZSP/ST5CgAhAE0gAyAmgBACDoBqFCZIsB93hIr3TcjTylLQJkIPtCaUXMDI6CCSLN

A0rD/0ObhfWxj/MItDOPqQw2SEqNUkwGT5FMbkgcSlFMtkvzCc/xtk84sUoHwTezQQqOdk6iYsxTqUzy9rJJzYYxTECB9kmkYvuFZAJ7g9WmjfHVBmdDZAJCAmFWg8VMgGL2SY/6ANhKR4uiSj2IYkzpc8IEbvHkMCryGAc3QYADhAtms+gAWkNoB3cIW4rNN1qJIPIQRb2DSRTng7ywrQFZihKDyrXKEodHOMEswwXRCIxSTLRLIwmRTTOLkUoI

T0JxCEmxNmVKOI5/8GpIdYvcgK0HAUFBx7Xyp3SeQLmGVHFhjh5NoDBBTRVL9fZrpYgk0EpWFS4D0YCYYyhPBYJrpYWGXkldckzyCk2oSE2IG4oDCvxBnxMmRTPxTfKoB3JXOGQLhZwGdIrUYCzCUIRKBHpxKiR9cQhi8CUPVbEARnILwv+DhQlsdeKLP4rGdzqMiI6MiVhNv42qT1hM8nNlSbeCxaIK0oZwHjR192pMiMc7DPuL83BpTPZKaUxB

TdkLAA7Y9TcGKUNRBthyFCITpiFBnQFqJq4EMQWFgZOlLINyTyen+tehD9u2FYuOSKFOQ0WUAjAHP8ZV1QGMHw91VSwHyPIYBSAFMIkq8n2KhKFowQcFKYD8E84QHAIQVa1AqYIK0Kz34I664LRKyUoNs3Cz/k1P9LlJPw4BTVeXM5Dp0oZWreJ/k2pP3nOET5+QtEoeT91OFU5pTtmNaUn5TKgG6Da0QeWLhIIP0sWCjeeOQfASrgGP1c0yA+fc

woVPd+US9xgB2AIS8gWnVEIkADUF3wKABlIE6AcX58+Kg0vrAUyIOiMBJUFxp/Q1BW7UcCFsSNxjHU6cVG30nU2eczlJnUm/8m5NDUluT1hLuAsBSbLGOiYswzROMxddT952w4zy4EJPpEgVSPlwPU9NTTFLWgtXCO2HACX6ppYELIZCA0YF1aWcB/4nlmLGwaiI4jVhNhNKlnTAAuwD/ZRPAFb0KIBIA6qTidXASHuz5ogtjN8iJRT4BGZFi4Qg

Zu5O8gSxgQagSRYyNvHAP4jowUZ1vqaxj1hyw06rt7GJAkvJSwJJXoiCS/MI21SNT8ISmNCKBUexQcXxi7fUmsFSRk1LWYwVSjFLTUz5SQxO0o7ITKgA7gF3xDYjVgEjUQWEMQYGAv7yGlKu4v7xQA7oMBqDi0ipV7/HFk04BJyAaAK69zMCYUs+V8r1vwR+UIGMLYqbRMWl50SxcyIxK0r69VEixaO7I1E3kQlqCDzD8Eo2TWBMWEh6NHGMAUgk

ShxJ0k8WBgILuU6sRllyeU70TI6H2KXHwPlJFUnzTfWLbI/qINnSIUSyR3+C6DMslZ0DKgZ6BvgF2vK+iJYF/vdVSJyKrUjjiCQmUAHVEjaJyQBoAegH0ADoARTDSQfSAtFlZlO8M/KNYEViJQTyS4O0IuImvYFowvAWUwPQpOKO4YBEiGaIsVNlcGtP5HHDSoyLM0xlTm5P/LIjSdIOXU6mBvQxyo6GVaGPMiNiwr2BSKd2S6NIm0hHSvlMnk5j

TsehXA9/hyen809oN1xBKiFVAbhP3IUsgE5HMQcxhdtMAXOp4/1JP4Ju9MiW0wesIGtyuRHoAf9xdIyBiwPGrEt0RinS4iO0R5rDAIVhpPtFhPPuQSKXvgwA8EJ1CImuSWaNpU85S8NOFHAjS1hKI0kaCDYzabMHRMmFSIj/9v/zo0WhpB5IMUwMSL73PuSbT7JKyE2WiUwHKgb4trGE9AP8UoOzCgUsVCwAHVEiTzpxBYHhwZ0E3aYnSHmM8U5G

iWc2P4DQB9sW8ADoBWgAjgJEl+yF0EWp82dIKzHFS/zwSDcNJSeHFjTB99CAno60Y8pNH4ZM0JdP/fHJTk1wZUkNSfCzDUngSCYP0k/CFlOBJ8BzTQi3V05NFeskhneHSGNKQU4jiZtLXBHWBdWkJsBFgHuDo8VqIe51DeSFdioC740pRE5OIUJ3SWc0xpPhlQ4AiRK8S+IDvHGuJg/jYAIwAvygwvJ9ivcI1YcDBgPk0bbyBQYBvJcAhzQkvsQa

cAeBTBNsck9NOUlPTTNJ5w2XSLNPl0tbUjgFFXC/S3ROrUWmANp05IkLDolHAwWph+2No0sbTcez105/Tj1J9Y09TaomP0KFBaex7JTIcrgGauQblX9CCgKN9ANBxsPABTcIrUiUTyFOPYzpcpyETleOBimKUKFg0gmGUATyV9AB7wtnSYg2q4t09+JHEFfEV/LTxIat4hBCRnJwcMhFcfPfTTgN7EoNToiOP0v8sxRwLQmBCldNugI+4CO2LzCp

T6UN+sbx4pDRG02X9eDIr0r2T9dKm0/bdp2MqAI5j1xBACReMfMDYnUuw8n3INN7tucTck3oxqhNIUytTB9N1o5DQmgASkR/AuwG+hL4B3mLkPZwA1aBjQA4BUDMtUypgAIygIUjIQDxwMj8F1qMqwFZjyoNl9Y9xc603wvFojWLG3f1Sm2Oa0gHT8lIz0hdTVeRFnMcSOkE7gXUZ7NGNTBUdLEG6QBHNd1JCPVSivNKr08eSnaw/w3zS6qL8GWb

tSmB5ybW1UWE0lWdp5uwZgefk7ID1QAEBwDM6XA4AiQFnIe7F1IH9AJkML2L6APbJ8AFbvOlQ2dIECV7RdEHIROxdXtEtiE0YFfTGmNlcDYmbHacUmaLsnZPS65LpUtwyaSMB0q5TsWM6RGGACUTRtaFinlMWY0Vhgp30ILIjKWMMUvgzK9JiM6vTQxLf0mkQZqw/UDNN22AzFckN6ZFWRMtsxOgTkCyQ3KDege4z5rUYCXfAJwDA0v0B/WlrUjb

pNdzPoDeictMxUgageLGPIRxxZkjFDd4EQakdqLR5UWnRaSxDHpV1PX1S56KAkwhjBRyP0lEzJjOUU6Yzak0f46FpprAxhLRTcTLdqOQsLUJ10yIzGlO80g3Sp2Mckz1ABsFkNOdpK21IgfqVtBBkJJkUZbFxDdq4PgBQgTkzUeBP8AYAOQHCdFQp5rk2yR1VMAEwAHu4qqDZ0rtAIZUUwIItHtNi3HmCToirgAGwPOkcBRPiEWJf1U/iyDL3w6d

TcNJaQ9PS6SNP0nkkdYAn3VjR4AVX6F2xnKV2YADIC7Cf0o9S9tyy/NpT7iBWdU7CRUn6lDpAFywMYWR9RAmMQVPcB1UPsUOt+9Njk0nSpRKglfABzMEA8BoJAWgSAFitb4x56A40jgDpoHRjrtNy0+M1LCWKDG3MxQwBqO0pwCFCgbdR7DJagw3IBmJtEwNTTZNAk97pHROB0okSxYC4TMcTqyCvYXOouVOh0nZg/9FGeZsyM1NalOth/yEUIPZ

F7IFnAOuww+iYVRchaiKh0KTpjEBYnNxSY5JSJeiSvFP2k3AAUkFTccUVYzBeSfMhNAF3wDuQeABL3eodehK3MrtA5uzulAqED8jSKOIAVJC1gWIQCfBIGebCMYWcMiIjizOpIzwtdTLLMyzTpjLUrR/iCBMccUXjZKJAPVy9VOCMmcIy0JJtMrYyyTJ2M9GTAaKN0xMgiyFKUJCA5YBBYQdV+yQF3DSily0/6HVprgD1gAEBRd0DM5DQN+FnIeH

UfUDl+OOtiCJ4iZdcDf0fk7RRMwIcIJLgq4FrfYDpHXi1icuSLyHkgvvpV7hzM/8STlNHTH+Tx0zGMlti2LLSo8szpjKOwxgyAxSXEIlFymBxM6XVUOQPFH8z+pM8FeBAiYE6qYUBkvlTIVVsvoApeBoDeAEDSRPj/sPI3L21VSPKwhaSNSMy3QeDDz0qLdKzO8Eys1mS/0M3gkrdWsOm5fcF2AFyQOOs7sl0PQuwI2CzrR+TLSifoER1LDx5hSh

oO7z9/ArhhYzcs6EBG1CUSRUj8VDcwkzTmLNnU6qS5dK8Mhbdme26QgGA0bXZ4LEUg7ES/ejhDD3WMs+9NjPo0+rkFeNy3WQB8tzg9Z9Z11jlwE21Q7S+HSdCGvRC9UH9mADlwYDdUvRC9J5YomnwAdxYwsVUdEWZ/1xXDW6ykRyfQh6y/JkYZWAVC6Ei3PvAEAGA3T/NrrJDtDgAw7VvON6z0vXJCF6yMN2Rs9w5SVk+s76yzbSMdP6zQQNt41s

4MbOIODUFYZyZkB2RW3E4oWaTSIJBw/uCyrK1I3UDrS0hsz4RobIw3WGybcHhsxGymvGJsp6y0bIus4myPrMTAL6yqUB+svGywtn+ssyEubNJWAWz+fw2k7T8zz0d4jmTStz2kqCV94K31J4zmVD6AFiTMAHJkDTJ65AGARUYD9XX5fuRfyH8eWlxVqMnaR1FvyCCokQIqtP6sUXTKSycMozSk/ya07UybzIOmIBTM9LW1TGB4umuiWnhTTKHfAS

z953xGaFgxaXis+0zWRP+XP9sb+k5nIDsRnEgIsDtjcMg7YWdo5JUMjVTUeKH0zpd2VGizTK8jgFcAXPo1zORU9SB7w1SzRDj7PyS6E8hTjJEoZNDw0krUKtQ/9HrKTI06aPrfDIQt7UYsoszpdKoMjwzRRxrLQa8YQCNrNy9HL0WM4Iz8OTGEJpQ1jNQkr7ixLKOs38zcZULAEu5SwGjkaMTSIGwgHGxp9RzwJichQnZGbQRBGLHItOySdMKMj+

ioJSGAdRxA0CQaA2kFokBWA4B+bGcAIkA5QBlk5ViB0HLxF8hHAi83McI3ghsE1oySoiOor/hTN0elFD927LmszuyUqMCsnnjgrO9srgibNKBuYIF8xlggWszLiKjsYIR3tWjFfMiY1CfHRBp6ABW5H1BNQDOdAYBmAHMwWfF1RHgdAizPo3Q+CAACoi2Q9/wZ7MR04Qz0CVfYFli9YG6QdQZKwFNSEHjKYj+qL0MmWLZAPSyY1B0uZIB44GSAPp

dIFllAF1VTPzeaPVpxsgS7Q0pHUUfIbMia4HtUxtQ9hEmmKgSZYwtEY8hwuIlCPqdJFKUk6RTuxN+01wzrzJa028zPbKmM72zBzzuUpcRgYFQYjdTLiLX6bdQbLnDs2Iy2zJkslL53PF0GDOQXfA/UKWAKoFSY1Gwok02sjRA47g7JEhTxRPTsy3DM7KglBCA/t0iYWchAdwVvaKtiG30AbGjzMBAHKRzl5EGmX6o34xDEFPAFWFdqcLDZsMdfX+

zemK0c77SaVIRM1PSSzJCXVEz2tPRMjC88WME8aFguPC5U2/CISA09HjFHHPJM6bTa9LAiAmwjSWegIIlg7DGyLvi9UHwNGxAIMGVgJvSkoB4cgkJ0HIW5LBycHJgAPByCHI5ATABiHKBQmAcwxifoIpDvREaPegR52zSKFP4BkSRTbEgx5JK7GxsO4GcbbkdTqJxhCkjgJLdsoxyPbKB07SSHzMrsZkj7ONIc6NFvoz0grgIj3DrMlLoOSLFo36

8ECDVMngzPNOoc+0yuUPpvD8w6b30oAqEj/jABJxscWlHeBLiW0SS4jWpNgSVQ0+zpRWTfQpjznX0Aa+y5Dzvs2UB15znKc4FIvHNqAwxLakWBIZI86go0Ty5ONGRUF4Ec+DCUOzC0QBbAFrjkqB8zBWDfGyVg3tEvGzdQ4EEeuMw+KB0pzNR4LoBAQFRLAJTL5QIUSQBnWhnxeOAnJBjQbujNzMaHOEgQakdPVIRISAQ0rgJ2ZGGBc0gx4D+GOo

laSXdg52yIyIA/ZtjghNAc1YTTHIIDU4BEyK602yk6NEtMtjCAFBacwCcyUFcfUFyGYPEsiv0WlJr0lBTKgEjErd9XIBFSeORNBIzkD+9pYDLIHqJQeHk5OuYvyHBYRK997IH0sEjZGIJCcYAPpzePNgAHcIOAeOBsBMNooxdXkj7w6o9bcioyNyhvCL93DWJnKBsbRxwWiRGlU0TtFRM7CDAZjwcMnBjfBINk2uT9HIqk+lT3bLHmJ5zCNO9s18

iC+NjRandEyhS6I6i+nX8eV2Tj5xTU3XTSTN9cxjT/XP/4sCJywAtXaRdKEMwgCyQQAma6eKB2HFgEu7IEWAivf6ANq3HMhCzNVKQs9TCDJFjgZckl9Tz6BoBB4nHuBViYACx/EtyCpLuJM2RfhnsfT4FLLj1c/Zh9lOtGdQ1WrzqQvxcp1KAci1zg1Ktc+dT9TO9siSjfDNHssuAQYGhlAbTKNMFkbRR7YK9cw6z+DJRDFmDnHLDEiQBS4HYcEA

IBLBaiLcpCyCuAbCAQVx3IjKwWohACQ/cbJGmcvfx9IFqAVwYLgHtJZn0ubCoUAiYUkFxoyJTqjxECFo8g7GEoPew84TP0CygZCQXqM6UhdOwcVngoi0yhCKAlEMQnUpyUWIoM+ayZdO7stydhV3BzU4BMqPbkmphGzN3KLEUlcwVHLcQdMy04jDy2UNtMy+5sPITg3DzKTOpFCsBbhOOg4u5WRTaoSYYJkDs6RI8RQVo8ssgGPN7IIYBhxkcGQg

BEzApHURJEWhuUKDw33xCGE/FdZ0QctLhi424bQTVIpVEbF24Ygy+rLFC4TJuc7ESyy0P03ty9Xk8M3uzH/1PaI2t2qFGQUhUB4wzIkQSP+AQNILxzPIw/KIymlPbVE6yvMEcmLm5CQC/AAIgAfUnNfI98Xja895ZOvJblTSd9uPyskrDCrON4yU1TeNpk+myLeMZsyotmvJ68/nA+vJh9WqytpP/Qp3jlbO8Rd34EgESQHJAY0GUALYByqXlLaJ

AbCK6AOABlIDgLJTTH7LtqaRlwOmhYNldvIAYMVC05CxPVbrt5wggVLNB2+n14xwJtHPVM5SSynK7ck2T/tICsiYz2LNoM21zstN082yBouG/oVtguVPmPZsAH+QsKa0ywXKw82ez2dxhYLq5zENL/XVAN2LXs7N0LriI8jORChJzQXzzRYFvwbABHiA2lef9Nclk3dFA1KT0IBmB1ii+FDUVpGX/UHx5Uu2PJMeQmJj4bI4CHsmySfaRSIxGEUz

dSpI2wgNS/tLq7HUzgfKCsjizvbNFMiHyg7EVPQIzTY3NrbhgstAmQflSLIOnslHyErOLyYDdevNmqckJJbLus1XAFvO4OA/huvLkdS+E/hy5uYDdZFn5bWDd6PwkAXXyTfNvOA3zCbNSIPXzGwHxA83yAiEt8/F4bfLt8jUEHaM6JSpg3KBP1TFRKZO7gmmzwRxo3OmTqsIhsjDcPfKa8V3zAbNmqRPzSVjm8i3yWvHeef3z8PxgAfjdGINxHDe

D2ZIvPVGlEEWUgSExnABC7HYBzMBqAIgBdgEFkjNRGfQL6XyVJqFQtDSiIMFWKEXtsHRqwIswKOn/0GizDXLPM41xAHJU84ByLOMg80GSvbNtcvWNuLI4AwA8trPmXIR08kmHEEA9avPgrRijPhT0rP1yKTO6ckYYVnShQUQdpWC3c2pBz7FhYDkTdGFBwCahegyj9EnzKgDe+DHjqLCEAfil4sxjMmoAfUFLgWsI44xb8lqhJ2j+jA6Q4UiMPR8

SuNGaJChAN+JV6e8hTjFawUazaCPlYdLR/rBf0LvMfvN0cn7TLzLF8wgcFFPNkmgzlrL7sk6S8WN1sPqc8s08NOGSYLVNQmXD9rPQ/dfyCck386zzsELiMx0zuGTB4mtgYIDjuDV8ziMZkFFTK7EVgMaUcbGlgbTgnk3yM1Qyv1PUMqCU4ol3Ld1oZuO6w9qgaV353PrccSABgsklfzBZqd4FNyBhYzvybBLYEZ8gefIHAc5zGsDY+NUzhfNucrU

zclPGM1rS7zOec1PDTgCmY4dybeFskBgwg7NkoyMYxaLX6POB8uUJMqySwXKoC+gxVJBOsvlkZmj8aLBZPGnbZEU4EbNtwfZoobLXzcyFu2UQAISFsqlJWPiFgguKmMIKWbLXPQswoPFawGo9XHwj80rC5pOKs2mzFpKm85aSZvJy3XwLogv8C1s54gv12RILI5h5EZbyHeO2kkvzO+U6XLTpLuzNAHwBEHWD9TJAqgGyJS9oLVJVcvW59rirPQ8

kQWNDdCNCoSEoRH+D3PJDwg5TPALAVAzjtdP9bRPTvLPCIjuzwPPcMifymVOl821zcWLg8hQhTUVjE6GUn+gt7dw1JrDcC+pTp7IJyG6Sh6O38rpyA3Ox6UshC7zlgPcQ2FT6lThVb+i+4bzk+FVCJRkZb/IkAOsU7gFMfbLBJAqdITUo9FTDfOT0hQghgy0pAamNdawtkZwK7NuAXGwQnIY1X6APIPLhMrBKkozSZv1F8gxzAfMtcyXywHM2Cxy

NKLA6dSYJsQ1SInAdpaS94OIJTgo8071zGKPfGYuNHsLfTDG41TSHoM2hjFidZVeUA5WyLFkKlHTZCnzAOQvvZLkKy8BHHbKzkCzxUSUFvuXOMamzqZN+/M3iCgvpk+vB7+z0DVkL0TQFC7MBOQuYAOOVuQvt4hWz6goRw0vzgVRVEhIBrVWasKwKeIIsXH8Ey4kyhJ2pDcQ0jPjwqz3+IitBif3tRXJszdy4sZQV7MODMQ11M4FbHGOw3RFms0f

zVguRM/ELrXOg821ySHIh8wnICoXHkJ/lDd3H+LMMGuIns5SjWULq8xpSNR218iYhuaHCxYyEAfSwAa6ApFntNF4cThCtoaKC8wsUPM7Yiwoi1R+EKEF+FDEgzCmjUmUK/R2j80HCqsMk/QuhswutoKuhmPT6qfMLKws87NeDC/K/7NjU7mwVREMzpVFKgCPMKRxlVJtRhKCgxKydw0ivbVvo/8D48Mt8ZY1WjPbk2zFcslFCqxOczK3Fd9MxCkz

jRjPuckwLjHP7cqfyiQsQ4x/jNijT+VIiYJGTbGEhESg/XDML/uNOfTdCBQOA3PsKpFjXzNED1gww3L8LN5RywwHFO3ErxLtxEAqyC0bycgpN4sKD5Qu/qabyGZJhHSkAPwv/CisLvwt1C5PtFbIaCl3iWc2p5EP5fgCGAaKTqfL57Ep017lCUDKxPuwJGHBpJQkhhGuzl+T+0RpMtv3145LzJK13CvcK3L0DC8pzKDJAc0MKoPPAc21y7OKjCy9

t2sH7Y3ksLRIVHRNIBkUfw9wK6QsinL9c7II+NUxoNQuNAcM5QRFuWFdD7hCuXFOUxmiUi4kD52TUixmhkwAkBS2dQIqg8cCKCrLKjUKDCPVgivKYhrQvNbSL8QGUivSKGgnUiwyKTz1hwvULVvKVsxqyK7x5sBoBDaMJAacKFqIVffRRfREwTFPBmdESgGCRTzAY6eNpcJXC8sMJFQ1H4Q/0asBKiQCwt+h+kpYKEW0MC12zjAqB80wKTHPDCok

K7uKNMgUJxPCf5eESGBz5kH683ZPIClSiLPIPUl8KJ5MSsl/s0Nw+EJ3BT+1ttFqLbWR5EML0NQXihCeQG+lBdCmTzIrfrcbyYIsm8uCLCgoQiyosuoo5EHqKd+2GAs8Mit31C63UOX1wmUKR3/IWiS+T1nPUnMlAEoFWKSfk/BmVpQAKEGN/wOSC0fhmPLox0F2ExZmp8SMLrdAob6iZqRKT+GwMCrLzT1zbfDALzNJP0wkLG8w3YClDZYkc4h1

jBsDNxaGVAmJWTJtBJIpEsqezkfIacxkJOUJmhALjoXLiNc2AqRzI0Jni7ovsoA64phKei3PhdoTcbUCwebzlgrlz2uJ5czriAm3AdIVyvUIaNUVy8mKdhVH9BHKp8ht09C3UaaBjDosyCUgjRpkwQGxtvyCVYfMZumxCtPQpn+Cvye3IZZWuua/hPLI4i/7z65KBk3LzWkW+i0HyiQvz4vFisQTCGWfcsE0QCiOdHgXSgKSKzgphioHh4fhFI+S

LmcFmi6LdYvTFQVDc5HFNi2Uir6iYaCWKD0Os7YHCWwrpsyaLFQuzCa0sTYoK3NyLNpLqCzyKsIq5k4FV65xqAeOAPaTlnU4BGK2UgcYBz/BxkYWxLSIS7LxIwg3/aKrB9zHnXFrBOjLqiSTBBNF9bXpivpAvM2RS0Apx3T6LqDPli7ALCvIf4nYK0wwY6Xcgn+QBcqpTRhBdEA2AP12IEx4iX9KY0vDzdSC+4Y1pH+mckCCA2EXBwGbtn1IhYcA

SH1N6U5R8ahMECycz45NR4MgBcZFwANNRixP7sXPoo83jgTO1NQDyyOOLSzG7QYs5tMxPmErTB0B8MKYEu62OcjcZURKV7a5zCzLA8/yy8Qvyi88KbXKJCyxlH+JyYVThbfUl1ewKqlNo7SEhN7EbiguNUfKmdSuwDOCwxKshmHCUEPVABnM5EpeJ9OHgDaWBb6L3Yj9SyFKECrVSRAo+nN0Et6CyZNoBNQEEvSNAhgCgAJr4NAHXi/qxDYmhIYN

p1i1rsgANU/hGwQ+K0NI/k4MxfGJH8ziLVPK7s9YKlrIK85dRTgAiEiHywVwVYDWKX4tscr3cVJBBcsvSepIPUpuKf4tvvbv8DVRDfQ/cxOjT+JJU3oCsQT9R4AhNGbccfgoACOf8svBSQIwB43AXIwOBGp3zHGvyY0DW/cuyHCHxpMDwy7XlqVBcimFQtWcZ5+SsiTWTjOxuKNp54SMrA/7IfVNoSqWLETMMc08LHnOqc+8yLApz7NRTjyDb6OI

J3zJfXHwF8uVjXNfyJQTx7YRKaHPIvWqIM5BSeN6BnChACT2sM5GiJeGd9uR7eeSyRGP+AZRKlOH0AUR4Csn0gUIgUkFVWTOTkmId1DoB3zz6C9NAaBxJJdZ9LMUpglPAiSEsSuqRaXHQQuQlZ7nGsZLQr+ABFaNdo8PbcqRTqVOU8uhKx/PtEniLJ/Nvi36LqJPqczb85/C5U9gye80rHPcgoYr3UzXzBPGiSiOzFxJrXAyQUuDXadnhfgEOQ4h

RzJFrGblEibHwxNCA5q0CkseKwnP0IiJzUeFNozAB61kUVSWIoAHjUUIg4TBVgPoBQ4ASrX1cVihRiYM0PPIXkbJzI6DBnU1FMrCm9XwjsSGKYKTEXBPy5BTy+sHuMEmT5km7k1xLUApxC8XzZYpotJhLYey08l0SwrJtff9IG+xMQhZKudGQkY1EaQo18vWKf5EysERLnxU7YQTx9C1GwT1Qjx1hYNEIIeIqgFHkwNB1aN2131MRXT9SJ4u/UmN

QwlN+AAYBRUgpHSHirYjRwcKUjyhCDBBj0MAPuTdEd8lC5UUJ8xlcpYd15sNCDL6txdMPC/6SgwsviiDzxko2ChWLfoqgkh1zSYOmoT+hnlM2kRXyxaLrUIxV1fNnctZLlYjkURryjYtNwe2g5HWPTLllZot7wPmyewusqDlYQvVqmM2KaRA9SkF4t4W9Si2K5ouq+YDcAXzd2INLSbKP44/j7YvVA+aS8gtKsl2K4/KzCsNL8Xg0qSNLAN19Sjg

BY0qqmeNKaplqCjyL6rJaw0cLwAAugeBAdgXlATuD9DEZwLKAsgFNwBkB9ZAYAQKpa5EZJSdBAZEBkZkAfJBEALqA/QF4WMZYVe3dKQdKR0ONhXhZzMBNPSdLh0t4WUJZau3nS2pJR0piuFdLp0syAMdKrqPWADdKoABHSzIBiKMxRPdKD0rp0iRET0sXSkaKigAvSzIAfvXwpQT8rBCHS1dKdtiKslkob0ukeUmNBbz8wd9KQ/gFco5wS7XfSjb

QUpB8EOotd0tVyKdL90sXS8BBiKPNAOjAhrkJAGUBuBiaQH7Eh4E4oGzQ00V3SiiAEMq/KYuYbMOO6FHBUhCyhQkJi5QCUJtLwYE8OHEBhkAvwd9Kj0rBKKxkB0s5AEgASoyYkJjKpwC4US8BXbBIALNZnoBD+KE0VhE4yxUI0sHMwckBRYFIANQdcAAi9NRFgbn2EaTLOcFxIWDc18F/2JDNKgDEy1kAIvSWCXgANMvAIOTL+sA6+ajLwMq6gbd

LQU07OYKgqdDXwLgM0XLlgvjLYcICqLhQuvTnDWHCmW3zMb2Lj+xJAUgBMllhw1zKmAF4ypOVboH2IajL3ZX34BLFuMoQAHzLggH4ytr5GABNHTD0yMuqyMIBggCRHNMITQOAyqiAcPMjIDj0V8gSyxS05Ci0wF0cosu49DbySqBZwMcAoTVPWJnAckGyAcLhENBAwNVJjNFf8MSAgAA
```
%%