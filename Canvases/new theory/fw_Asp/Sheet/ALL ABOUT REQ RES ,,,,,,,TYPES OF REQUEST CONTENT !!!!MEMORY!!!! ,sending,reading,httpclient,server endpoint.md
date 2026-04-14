---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
HTTPCLIENT CONTENT TYPES CHEAT SHEET

────────────────────────────────────────────────────────────
1) JsonContent
────────────────────────────────────────────────────────────
Use when:
- You have a .NET object (DTO) and want to send JSON

Client:
- JsonContent.Create(dto)

Content-Type sent:
- application/json

Server (ASP.NET Core):
- [FromBody] MyDto dto

Why use it:
- Cleanest for JSON APIs
- No manual JSON serialization
- Supports JsonSerializerOptions

Good default for:
- Most POST/PUT/PATCH JSON requests


────────────────────────────────────────────────────────────
2) StringContent
────────────────────────────────────────────────────────────
Use when:
- You already have a string payload
  (JSON string, XML string, plain text)

Client:
- new StringContent(payload, Encoding.UTF8, "application/json")
- or "application/xml"
- or "text/plain"

Content-Type sent:
- Whatever you set (important!)
- If not set, default is text/plain (usually not what you want for JSON)

Server (ASP.NET Core):
- JSON string + application/json  -> [FromBody] MyDto
- plain text                      -> read raw body or bind as string

Why use it:
- You already have the exact text payload
- Simple and explicit

Best for:
- Small/medium prebuilt strings


────────────────────────────────────────────────────────────
3) ByteArrayContent
────────────────────────────────────────────────────────────
Use when:
- You already have byte[] in memory

Client:
- new ByteArrayContent(bytes)

Content-Type sent:
- Set it manually (important)
  e.g. application/pdf
  e.g. application/octet-stream
  e.g. image/png

Server (ASP.NET Core):
- Read Request.Body as raw bytes/stream

Why use it:
- You already loaded bytes into memory

Best for:
- In-memory binary payloads
- Small/medium files already in byte[]


────────────────────────────────────────────────────────────
4) StreamContent
────────────────────────────────────────────────────────────
Use when:
- You have a Stream (FileStream, MemoryStream, etc.)

Client:
- new StreamContent(stream)

Content-Type sent:
- Set it manually (important)
  e.g. video/mp4
  e.g. application/pdf
  e.g. application/json

Server (ASP.NET Core):
- Read Request.Body stream

Why use it:
- Better for large payloads
- Avoids loading file fully into byte[]

Best for:
- Large file uploads (raw body)
- Streaming scenarios
- Large JSON when serialized into a stream first


────────────────────────────────────────────────────────────
5) FormUrlEncodedContent
────────────────────────────────────────────────────────────
Use when:
- You need simple key/value form fields (NO files)

Client:
- new FormUrlEncodedContent(dict)

Content-Type sent:
- application/x-www-form-urlencoded

Server (ASP.NET Core):
- [FromForm] LoginRequest request
- [FromForm] string username, [FromForm] string password

Why use it:
- Matches classic HTML form posts
- Common for OAuth/token endpoints

Best for:
- Login/token requests
- Legacy form-style APIs

Important note:
- A normal HTML form submit (without file upload)
  typically uses application/x-www-form-urlencoded


────────────────────────────────────────────────────────────
6) MultipartFormDataContent
────────────────────────────────────────────────────────────
Use when:
- You need to send files
- You may also send extra text fields with the files

Client:
- var mp = new MultipartFormDataContent()
- mp.Add(new StreamContent(fileStream), "file", "photo.png")
- mp.Add(new StringContent("John"), "displayName")

Content-Type sent:
- multipart/form-data (with boundary)

Server (ASP.NET Core):
- [FromForm] IFormFile file
- [FromForm] UploadRequest request (with IFormFile + other fields)

Why use it:
- Standard format for file uploads
- Works like browser file upload forms

Best for:
- File upload endpoints


────────────────────────────────────────────────────────────
7) ObjectContent (Legacy)
────────────────────────────────────────────────────────────
Use when:
- Old ASP.NET Web API codebases (legacy)

Modern replacement:
- JsonContent (for object -> JSON)

Note:
- Usually not used in modern .NET / HttpClient code


────────────────────────────────────────────────────────────
HOW TO CHOOSE QUICKLY
────────────────────────────────────────────────────────────
If you have...
- DTO object           -> JsonContent
- JSON/XML string      -> StringContent
- byte[]               -> ByteArrayContent
- Stream / FileStream  -> StreamContent
- Form fields only     -> FormUrlEncodedContent
- Files (+ fields)     -> MultipartFormDataContent


────────────────────────────────────────────────────────────
SERVER BINDING QUICK MAP (ASP.NET Core)
────────────────────────────────────────────────────────────
application/json
- Client: JsonContent / StringContent(json,...)
- Server: [FromBody] MyDto

application/x-www-form-urlencoded
- Client: FormUrlEncodedContent
- Server: [FromForm] MyFormDto

multipart/form-data
- Client: MultipartFormDataContent
- Server: [FromForm] + IFormFile

application/octet-stream (or other raw binary)
- Client: ByteArrayContent / StreamContent
- Server: Read Request.Body


────────────────────────────────────────────────────────────
LARGE PAYLOAD NOTES
────────────────────────────────────────────────────────────
Large object JSON:
- JsonContent is usually fine
- For tighter allocations:
  SerializeAsync -> MemoryStream -> StreamContent
  (avoids big UTF-16 JSON string)

Large file on disk:
- Prefer FileStream + StreamContent

Large prebuilt string:
- StringContent works, but:
  string is UTF-16 in memory, then encoded to UTF-8 for HTTP ^EEkTSrdh

can use jsoncontent with big object, too, if dont need compression ^aXapbU6S

!!! ^lpOiIUFU

types ^DkHdXKXb

when reading response ^xF3mbIFo

deserializing stream on headers arrive in server indpoint
default behavior ^9rOIuuoM

case 3 ^ySMZfUo2

when deserializing async enumerable ^jiYm63WS

downloading file ^JTS9UVjH

when deserializing json ^lzfD7077

SENDING FILE AS ENCODED IN BASE64 STRING/
BINDING DTO WITH FILE FROM FORM ^TPB5P22M

ADD TO REQUEST MEDIA TYPES  ^fE4YUJ0M

BASE64 STRING ^CYcRdJB0

sream reader ^mnpPRlGv

can be useful too if you want line by line reading somewhere ^D4wUj4FL

SOME READING EXAMPLES WITH BUFFEREND/
NOT BUFFEREND BODY ^xKQ3VXVt

WHAT RESPONSEHEADERSREAD
 GIVES US ^YMW7oJyF

CAVEATS WHEN YOU DONT BUFFER ^NvQpPObL

AND ALSO YOU CANT READASSTRING ON SERVER ENDPOINT,
YOU NEED TO USE THIS ^iYHuuygP

CONDITIONAL BUFFERING ^VdeixKKg

new buffering  sheet 
when you generally buffer full bytes of response using httpclient
when you dont buffer full response and process as stream ^urddyY1A

!!! ^9gzYhslA

Stream Reader vs readasstring ^O3IjxVyS

!!! ^12QiZGrF

!!! ^GozUrUpF

using delegate handler to fix streaming issues + retries ^5Qji9ToB

making request with pipeline.execute ^rXvBPiZo

the pipeline, not handler, you cant use handler for manual execution ^mBwbztld

contenttype headers on
content type
not requestmessage ^8Y2jj52b

need to dispose 
readasstreamasync too ^ZQdCcZLk

readfromjson need responseheadersread too ^BZxScbau

but you buffer bytes in memory ^Wk92shEy

sending json ^9bC3XjKN

memorystream is still better 
that seialize to string ^H0iazLqZ

jsoncontent.create/content-length issue
transfer-encoding: chuncked ^ZFrCbHCd

issue, what jsoncontent can set 
in headers ^vGdAnSjV

request with content-length
without transfer-encoding ^XCe3cJ6H

request with transfer-encoding: chunked ^ww6QHy9i

memorystream fits content-length ^j7YYLRX4

compression and 2 flows ^5gCiOikW

so what is the practical difference
are there difference in bodystream usage? ^l6gd4cqL

crlf ^UqqJB1zh

memorystream + stream content
vs
jsoncontent.create ^UIsd5nbS

!!! ^UR2JNVup

## Embedded Files
02f6f0e70276e974257c4d127fd49fbc136899f5: [[Pasted Image 20260221033615_537.png]]

aa374613be4703cf97192002a8225a9a464d9aeb: [[Pasted Image 20260221033620_131.png]]

0c06e64a8fcf7eee1c78339a7873e2097264c683: [[Pasted Image 20260221033623_192.png]]

3fb15b2ab5174ed7131dd3452247d51e3b318d81: [[Pasted Image 20260221033627_298.png]]

dc39ba02a4230af74f2321bd5321ecbdd750af0c: [[Pasted Image 20260221033631_461.png]]

4efeefd343ea968192dab9461cb99c8686d51ba0: [[Pasted Image 20260221033638_142.png]]

3b62b63f81f6cffdae8df2220040944a74e19190: [[Pasted Image 20260221033644_533.png]]

af7588fa62296a09b703f104e6e17658446b5c3f: [[Pasted Image 20260221033650_368.png]]

72db92725a4857d0a5e935e4e25e235b906e0035: [[Pasted Image 20260221033701_493.png]]

53a89c17e87cdb3bdb1f5a6177e5845658d67e7c: [[Pasted Image 20260221033710_738.png]]

843489ee91c9462d5f216c09a61a906e1c3a41da: [[Pasted Image 20260221033719_970.png]]

73d10150c16a570c27fbd33cc0df8b350dd1dcc4: [[Pasted Image 20260221033728_196.png]]

5b72416282bce8e6a7b692c773cfb1de3cf9d99d: [[Pasted Image 20260221033330_584.png]]

a854a00f83a4cfeaf3a461f4fa143ee1580c6762: [[Pasted Image 20260221033332_775.png]]

f46606cd55ef0bb4a8d3b23188a79dba602ba8e3: [[Pasted Image 20260221033335_484.png]]

4d24af0060c8824e64cbb941b9ba9b01ec830991: [[Pasted Image 20260220025659_088.png]]

606f4408a0dc13b863690748093dc1c31c86f1b0: [[Pasted Image 20260220033057_292.png]]

b2ce8d621fba55cfe65542ce1cbd70e70c550555: [[Pasted Image 20260222011944_840.png]]

b113458eb207c863ff2ab20faf71301df972537a: [[Pasted Image 20260222012000_341.png]]

cd892666f7cb07310d0b615d80bfee3c41d8691f: [[Pasted Image 20260222012002_512.png]]

1f92b9b1d63b12c8709a40f77f495d996820cb0c: [[Pasted Image 20260222012005_112.png]]

a4a8bc0316d1e70e7374cbd149243534ddd3a8d5: [[Pasted Image 20260222012255_605.png]]

1227e053263ec0f6295b5bed4338cc0157e46fb4: [[Pasted Image 20260222012257_696.png]]

24f0ee74b90f18f39542aea71205d9dd2fc64c12: [[Pasted Image 20260222012301_061.png]]

8534de729da9322adc678eb63013ab3daf27c6bd: [[Pasted Image 20260223233326_154.png]]

e3c87ff97f4866bd2fbcadfe37430ff85dc9709f: [[Pasted Image 20260220023234_541.png]]

44a48f25ed6dec5e58add6dd3b9c5421991c2dc5: [[Pasted Image 20260222211741_325.png]]

8ae7208416cb7ff850756a8f47d8768aea0a6829: [[Pasted Image 20260222211744_694.png]]

c827ae6d3906081bb9a378a60a71bc9b44aceb72: [[Pasted Image 20260222211748_387.png]]

344705760e6d2dab566c262a9ef8b965b8040d9b: [[Pasted Image 20260222211751_330.png]]

f6adbe110dec6a4bdd23d2fa389650d7cde75c73: [[Pasted Image 20260222222043_976.png]]

76dfd3410488275ac12f42d0d45ebdbdb9d2befa: [[Pasted Image 20260222222048_446.png]]

9603772b70e0e04fe859c72cdee8e98216e15eb0: [[Pasted Image 20260222222052_150.png]]

419113421d51b1ae331c66e8af7acc7319280142: [[Pasted Image 20260222222056_083.png]]

1a25f32af5066aa694dbbf6903cb591423e13655: [[Pasted Image 20260222222058_430.png]]

43a56ec68a638e9db338e5c23fa2e384e902308b: [[Pasted Image 20260225021522_313.png]]

664cc900be82c61cfb280704e9165dac3ed90956: [[Pasted Image 20260225021525_853.png]]

2fddbbb319414901b5e6ff47953e6b7b25529a1d: [[Pasted Image 20260224010751_851.png]]

2f8ae74c4db42d54378eed79fa930188f0734150: [[Pasted Image 20260224010755_493.png]]

c4cce7431237e5e5cf58311a2872dac486d6abef: [[Pasted Image 20260224010759_130.png]]

8ca1c1ac5ea883f69f705f2aa2e25971129527e9: [[Pasted Image 20260224010802_534.png]]

ec7e4402e7c110d39c4ad9ea1e64c9a32883e58b: [[Pasted Image 20260224010822_450.png]]

87389587fa3e38a91aa0592042a0462f5f5d28fa: [[Pasted Image 20260224010830_986.png]]

62c55639b8dfc810a82ed97a3b59605022a14d59: [[Pasted Image 20260224010835_583.png]]

c758d2c95d8850330b91f8ac576c520a6a1893fa: [[Pasted Image 20260224010839_963.png]]

33ccd0635980e0dadf7d417fc3dc3c9816d6f211: [[Pasted Image 20260224010845_472.png]]

e9397dcc431c08ee185d85303f849d01e2e40e31: [[Pasted Image 20260224010850_789.png]]

51a6f6bfda4e06326bf081d383817b5f8ab7ab2b: [[Pasted Image 20260224010855_350.png]]

911ebc85ceb804dcff3844f15d535851419d1d48: [[Pasted Image 20260224010858_538.png]]

b1eb92b621a8e0615b30bd1e2998f2439e21456b: [[Pasted Image 20260224012012_830.png]]

3c3adde4461e54099f6d630f0feb6a7b82560745: [[Pasted Image 20260224012435_895.png]]

62cfce53b67a1ca49c90cc4fb3d2047d0c5d837c: [[Pasted Image 20260224013819_786.png]]

3c0515f8fad70f4a68f50aed38da8b6bb7f28f21: [[Pasted Image 20260224013823_556.png]]

59ed2fb29c9a87984434ee9bfc7191b6558b9242: [[Pasted Image 20260312232429_401.png]]

f8c871656bff1eddf896fddcac9b4d834d156dbf: [[Pasted Image 20260312232437_189.png]]

a35f4a7bdbbb086c8e19104d97d3a00f605c5a5d: [[Pasted Image 20260312232440_341.png]]

1808accc0111cb08cf5e307fad40b4c975d496b4: [[Pasted Image 20260312232443_454.png]]

c9168805b7359cfcf67df5ca2a23ea504dbe9dc6: [[Pasted Image 20260312232448_894.png]]

cdc4097c7f439a83f0415f80d23c838e5583665e: [[Pasted Image 20260312232454_660.png]]

f39199d8f3ad294e9b822e924f572ab37618ac49: [[Pasted Image 20260312234010_596.png]]

fc42e3a0f31cf980360c31d07541986352a101f4: [[Pasted Image 20260312234018_503.png]]

e364c537a34fcd20ad5dd974f1ae0b346f4ae3c2: [[Pasted Image 20260312234142_198.png]]

9dd50dcc0e197d70239282e1dbbbf766f537bc2e: [[Pasted Image 20260312234144_240.png]]

a5c4a2841ee4a08afa077d8661002543fb6a4e94: [[Pasted Image 20260313000136_882.png]]

003170a71516e9639a94976b0a051d69d5e9b334: [[Pasted Image 20260313000143_928.png]]

889a124fd10aa83595fd618d35a0d9289f9854b0: [[Pasted Image 20260301225033_494.png]]

829326150fd8a3c64602cd81ab46a5437fedba7b: [[Pasted Image 20260301225036_357.png]]

a4219729d41dc4c00c201ab65e2266c0aa2c14c2: [[Pasted Image 20260302003022_929.png]]

2d36297f56a7725c9346a2c5626fbb24a493cce7: [[Pasted Image 20260302002319_895.png]]

af54ccdfe57f9790f4306110bd0012fb68d6f415: [[Pasted Image 20260302002322_808.png]]

f0f0808ea8de7f77884ef79b57e84495c038a396: [[Pasted Image 20260302002327_580.png]]

db8e76c35ce7b250e8475e9f14bda8182b728731: [[Pasted Image 20260302003624_301.png]]

5bd0dfe740d9e5feba622d5306af33a5fcf5897e: [[Pasted Image 20260302003626_953.png]]

c35fa352c0126d5603655f843f3a5180193a930e: [[Pasted Image 20260327055404_672.png]]

87ece5e4383255215193257d6b74eed2f6d18bcd: [[Pasted Image 20260327055408_656.png]]

e5c6a3f0ca8e2fda44b3513b5caf80fe59854b7f: [[Pasted Image 20260401144320_520.png]]

0875f02132ab286b459c18623bef6cf8a9f66f1f: [[Pasted Image 20260411005937_535.png]]

243ea2e732727283c25fba94f084ef25e3fd49c7: [[Pasted Image 20260411005940_202.png]]

77754e4da73bcbd0b097b9911e473c8a241df0a5: [[Pasted Image 20260411005944_187.png]]

85365fa651348f6ae239118cd9ddfac383a2a32c: [[Pasted Image 20260411010112_837.png]]

07ee32802951bb57bedef5361159c0d680b834d3: [[Pasted Image 20260411010214_364.png]]

da7e380b7d410e5059e398d8943e2d9c0a6072b3: [[Pasted Image 20260411010218_979.png]]

7dd5fb053c00ed389847f492437ff434ce57349c: [[Pasted Image 20260411010351_131.png]]

f044ce7f3b69f99d4f1e129ecb62f7a92e721b93: [[Pasted Image 20260411010354_893.png]]

51e5837bcb2074a1ec80ed0f5d7ea52797d4fb30: [[Pasted Image 20260411011924_531.png]]

e616cd37b7b0c51f299634dc74f2a716825b3214: [[Pasted Image 20260411011928_328.png]]

12f4074972911f17c241defe8df396e3b71df80a: [[Pasted Image 20260411011930_813.png]]

fde0da3120c76af04619b993a4db9df1d9fd45de: [[Pasted Image 20260411011933_549.png]]

dd22004fbdfeda18afb3ac246032d2fc56d840f6: [[Pasted Image 20260411011937_010.png]]

03f0b610e0655c818799bab7495578d85c063458: [[Pasted Image 20260411011940_064.png]]

16f6914af1169cb01674b91a9c8c095eed9f2bc2: [[Pasted Image 20260411011943_989.png]]

e0c066115b478f543700bb945db223adbec8e52a: [[Pasted Image 20260411011947_737.png]]

18cb24802ffe01c6a3f6a85fecb67afcff6390dc: [[Pasted Image 20260411011952_477.png]]

ba357a4fe1ebc9f4d088a5dcf3d23ff3a2fdd4cd: [[Pasted Image 20260411012003_078.png]]

529dda103e5fa8146e0cd7f447129b2766029142: [[Pasted Image 20260411012009_570.png]]

36f647bb34a5bee80bd5daab0f8be490153dd7cb: [[Pasted Image 20260411012015_708.png]]

bdd74279027b48178450d82ccbba01307177c152: [[Pasted Image 20260411012024_800.png]]

1637e3ae40c350adfbc64e622db70a804541c1d3: [[Pasted Image 20260411012037_952.png]]

f0f9f33b1e2742423e98bebe397142277f2bfec9: [[Pasted Image 20260411012703_431.png]]

af923f93883c2383c21462e88ea422bcef1430e2: [[Pasted Image 20260411012706_407.png]]

6bc52fc2987ad27a23576dc4719060eead9b4f93: [[Pasted Image 20260411012709_408.png]]

89d73f6ae92b751a7db196da17f2a902c1307483: [[Pasted Image 20260411012714_885.png]]

%%
## Drawing
```compressed-json
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
```
%%