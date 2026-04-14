---

excalidraw-plugin: parsed
tags: [excalidraw]

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
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
```
%%