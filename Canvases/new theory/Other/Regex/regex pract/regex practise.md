---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
Regex.Replace(str,@"^(\d{2})/(\d{2})/(\d{4})$","$3-$1-$2") ^sySJZOUR

Regex.Match(str,
    @"^
    (25[0-5]  |
    2[0-5]{2} |
    1[0-9]{2} |
    [1-9][0-9] |
    [0-9]
    .){3}
    25[0-5]  |
    2[0-5]{2} |
    1[0-9]{2} |
    [1-9][0-9] |
    [0-9]
    
    $") ^rWEbz2XJ

if(Regex.Match(str,@"^\d{9}$")){
    Regex.Replace(str,@"^(\d{3})(\d{2})(\d{4})$","$1-$2-$3")    
} ^2pTCAJs8

Regex.Match(str,@"^{0-8}$") ^SQ6SdI3k

Regex.Replace(str,@"^(<\w+>)*(\w*)(</\w+>)*$","$2") ^jWfOKVIw

Password
    @"^(?=.*[A-Z].*[0-9].*[@!#$%^&*()/|\\]).{8,}$" ^o9y3erjE

Regex.Match(@"^(?=.*[A-Z].*[0-9]).{8,}$") ^eJByOyD8

Regex.Replace(@"^<[^>]*>$","") ^2FFihOO9

Regex.Replace(@"^$","") ^kmETnKpj

In js ^s4C2stcm

Regex.Replace(@"^<()$") ^ES3vbkwJ

@"\$[0-9,\.]+" ^rz4dJRsh

/^([$€₽](?:[1-9]{1,3},)*[0-9]{3}(\.[0-9][1-9])?|[$€₽][1-9][0-9]{0,2}(\.[0-9][1-9])?)$/ ^ZIzDtrcO

@"(?<=#)[^\s]+" ^34ar23BM

lookarounds ^J7YIqEV3

(?=.*\d) takes char or nothing and checks if behind it are some digits
when need to extract
\w(?=\.ru) - matches with something before .ru

 ^neEYV0s9

"^\d{4}\s(?:\d{13})|(?:\d{16})$" ^lUYSDroD

@"^\d{4}\s(?:\d{13}|\d{16})$"
// Or without non-capturing group:
@"^\d{4}\s(\d{13}|\d{16})$" ^FEyZOgpa

When need | need to take this into () ^64mGdAxG

or repeat whole shit with anchors ^gXZu3yJl

@"^\d{4}\s\d{13}$|^\d{4}\s\d{16}$" ^r38d2DXJ

@"^\d{4}\s(?:\d{13}|\d{16})$"
// Or without non-capturing group:
@"^\d{4}\s(\d{13}|\d{16})$" ^3xZSvrLZ

When need | need to take this into () ^aOsysGfq

@"^\d{4}\s\d{13}$|^\d{4}\s\d{16}$" ^1Jd7OjmQ

or repeat whole shit with anchors ^Wh0Xpf44

 @"(?<=")[^""]+(?="\s*:)"; ^Jrs1MGwO

Regex.Replace(@"[A-Z]","") ^n1GduVtu

Regex.Replace(str,@"(\b\w+\b)\s(?=\1\b),"") ^9J2piMMG

Cant reference group that wasnt declared yet ^YRQPEsb5

to keep the first word need to match both and replace with jst first
Regex.Replace (@"(\b\w\b)\s\1","$1") ^anlpRTv6

const logs = [
  '127.0.0.1 - john [10/Oct/2023:13:55:36 -0700] "GET /api/users HTTP/1.1" 200 2326',
  '192.168.1.5 - - [10/Oct/2023:13:55:40 -0700] "POST /api/login HTTP/1.1" 401 341',
  '10.0.0.3 - admin [10/Oct/2023:13:56:01 -0700] "GET /admin/dashboard HTTP/1.1" 200 5123',
  'Invalid log entry here',
  '203.0.113.195 - jane [10/Oct/2023:13:56:23 -0700] "DELETE /api/users/42 HTTP/1.1" 204 0'
];

// Extract: IP, user, timestamp, method, endpoint, status, bytes
var ipPattern = "((?(?1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9]).){3}
                                    (?1[0-9]{2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9]))";
car namePattern = $"(?<={ipPattern}.*-\s)(\b\w\b)";
var timePattern = "(?<=[)(?[1-9]|[1-2][0-9]|3[0-1])/[A-Za-z]{3}/20[2-9][0-9]:(?[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]";
var codePattern = "-\d{4}(?=])";
var methodPattern = "(?<=")\b[A-Z]\b(?=\s/)";
var endpointPattern = $"(?<=\s{methodPattern})(?/[a-z]*)+";
var statusPattern = "$(?<={endPointPattern}.*)\b[1-5][0-9]{2}\b";
var bitPattern="(?<=\s)\d$";
var fullPattern = $"({ipPattern}|{namePattern}|{timePattern}|{codePattern}|{methodPattern }|{endpointPattern }|{statusPattern}|{bitPattern})";
foreach(log in logs){
    var matches = Regex.Matches(log,fullPattern);
    foreach(match in matches){
        var ip =match.Groups[0]
        etc...     
}
}


 ^u8FIfiXv

can use named group on what you want to capture if you can afford to capture full length of 
what before and what you want ^XFfEltKF

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>.

var minSecPat="[0-5][0-9]";

var dateMonthPat = "^(?<dateMonth>\b\w{3})";
var dateDayPath ="(?<dateDay>[1-9]|[1-2][0-9]|3[0-1])";
var dateTimePat= $"(?<dateTime>(?:[0-1][0-9]:|2[0-3]:){minSecPat}:{minSecPat})";


var processPat = "(?<process>\w+/(?:\w+/)*\w+)(?=[\w+])";
var processAndProcIdPat = "\b(?<host>\w+)\s{processPat}[(?<processId>\d+)]";
var dTPat= $"{dateMonthPat}\s+{dateDayPath}\s+{dateTimePat}";

var queueIdPat = "(?<=:)\s+(?<queueId>[A-Z0-9]+)(?=:)";
var emailPat = "[a-z\.0-9]+@[a-z].[a-z]"
var fromToPat = "\s (?<direction>from|to)=<(?<emailAddress>)>"






 ^AMAnKRWp

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>. ^mJMJOBaW

give best regex for email ^G05ex6SO

Copilot said: "Best" depends on your goals. Matching every ^9azWoW3S

"Best" depends on your goals. Matching every RFC-valid address with a single regex is possible but impractical and hard to maintain; for most real-world uses you want a practical, safe regex plus extra checks (length limits, DNS/MX lookup or confirmation email). Below are three options (practical, stricter with length checks, and a Unicode-aware variant) plus usage notes and a short JS example. ^j0iSpxQE

1 Simple, pragmatic (good for client-side/quick checks) Use when you want to catch obviously-bad strings but don’t need to accept every edge-case allowed by RFC 5322: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/ ^q1y43eJ9

Notes: ^RCPIBki8

Allows common local-part characters (letters, digits, . _ % + -). ^0gucoJae

Requires a domain with at least one dot and a 2+ letter TLD. ^JYeKwbg8

Easy and fast, but allows consecutive dots in local-part and some invalid domain forms. ^eVLMNDrI

2 Practical + stricter (enforces length limits, forbids leading/trailing/consecutive dots in local part) This is a stronger, production-ready single-regex approach: ^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)@[A-Za-z0-9-]+(?:.[A-Za-z0-9-]+).[A-Za-z]{2,}$ ^U4iKKaWo

Explanation: ^eYqh8eMG

(?=.{1,254}$) — overall max length 254 characters (common practical limit). ^JXLKAkiP

(?=.{1,64}@) — local-part max 64 characters (practical enforcement). ^BQaZmHU6

[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)* — local-part: starts with alnum, special chars not repeated/consecutive or at ends. ^x8OrYLd7

Domain: labels of letters/digits/hyphens, final TLD of 2+ letters. ^TC1FWYsc

3 Unicode (EAI) — allow internationalized local-part and domain labels (use in environments that support Unicode-aware regex) Use the Unicode property escapes; requires a regex engine with \p{…} and the u flag (e.g., modern Node.js / browsers): /^(?=.{1,254}$)(?=.{1,64}@)[\p{L}0-9]+(?:[._%+-][\p{L}0-9]+)@[\p{L}0-9-]+(?:.[\p{L}0-9-]+).[\p{L}]{2,}$/u ^pdSQAguh

Notes: ^LCAhm5bU

\p{L} matches any Unicode letter so names/scripts beyond ASCII are accepted. ^jDF3N9RW

Still enforces the same structure and length rules. ^vk0hlViV

4 RFC 5322 (theoretical completeness) There is a monstrous RFC 5322–compliant regex that accepts many rarely-used syntaxes (quoted strings, comments, etc.). It works but is long, hard to read, and can be unsafe (catastrophic backtracking if not used carefully). I generally do not recommend using the full RFC regex unless you really need to accept every edge-case. ^WY7VtsGu

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>.

var minSecPat="[0-5][0-9]";

var dateMonthPat = "^(?<dateMonth>\b\w{3})";
var dateDayPath ="(?<dateDay>[1-9]|[1-2][0-9]|3[0-1])";
var dateTimePat= $"(?<dateTime>(?:[0-1][0-9]:|2[0-3]:){minSecPat}:{minSecPat})";


var processPat = "(?<process>\w+/(?:\w+/)*\w+)(?=[\w+])";
var processAndProcIdPat = "\b(?<host>\w+)\s{processPat}[(?<processId>\d+)]";
var dTPat= $"{dateMonthPat}\s+{dateDayPath}\s+{dateTimePat}";

var queueIdPat = "(?<=:)\s+(?<queueId>[A-Z0-9]+)(?=:)";
var emailPat = "(?<emailAddress>[A-Za-z0-9]+[._+-%]?[A-Za-z0-9]@[A-Za-z0-9].[A-Za-z0-9]{2,})"
var fromToPat = $"\s (?<direction>from|to)=<{emailPat}>"

var statusPat = (?<status>(?<=status=)\)

var processBasedPat = "(?<process>(?:\w+/)+(?<processType>/qmgr|/smtp|/cleanup)[\d+])";
var proccessMatch =Regex.Match(string,provessBasedPath)
var processType = processMatch.Success ? processMatch.Groups["processType"]:null
if(processType is null){throw new Exception()}
switch(processType)
{
 case "qmgr":
    statusPat = qmgrStatusPat;
case "smtp":
    statusPat = smtpStatusPat;
case "cleanup":
    statusPat = cleanupStatusPat;
}

var pattern = $"{dTPat}|{queueIdPat}|{}|{}|{}|{}|{}|{}|{}|"


 ^DOhk7hGi

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>.
lets say it can be qmgr smtp or cleanup process and they have such structure ^O4jm752V

^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)@[A-Za-z0-9-]+(?:.[A-Za-z0-9-]+).[A-Za-z]{2,}$ ^DloktnW0

fixed version but ^d6jxV6wJ

here actually need / ^6UIt2WwA

\[d+\] ^eaPMkKX6

## Embedded Files
07f63f83139c1f45e955169e1373610d26f5788c: [[image_7144.png]]

6030f43ce3464b2354f14bef173cc150ebe346a5: [[image_7145.png]]

b0c2262f9214960440db8d9f1e249a74597bdc54: [[image_7146.png]]

f1bffc34793af49cd38074eeee3f715b2a019a4c: [[image_7147.png]]

424096db23435d186d8db34905bc9b1b88fcf3f8: [[image_7148.png]]

0eb9c5f522c75861f10e232ea113fd7a7591fd77: [[image_7149.png]]

fa6e1378e3ac3cdcba3de460c0461c7d2ace34f6: [[image_7150.png]]

f23b841e249affeb0cc77cbc3e1182dc46f26522: [[image_7151.png]]

d1404d6b9df2ff577e4e50f6eb784bbff120678e: [[image_7152.png]]

394e727b76d3b34692ed5f61488d07efb5b996dc: [[image_7153.png]]

95f5c0c7e6a60b3ef4671f83b4de4bd6054bdbda: [[image_7154.png]]

bd09296a14c076b200ae2269e6dd189bbe884365: [[image_7155.png]]

635ef978132c1652e417644c681bf4199a131f8f: [[image_7156.png]]

2ea7e8a56cc2f1b29f25b05f044642ba35c664e8: [[image_7228.png]]

aab837209a4b804cd33d3106a06e59f1ff09f8f4: [[image_7229.png]]

275ef90a16e59a75d50c1589674585f8ed7d78a1: [[image_7230.png]]

331462d9db588ace5b923c2a3547150546331401: [[image_7231.png]]

f852c57153f77d9304d0413bd66820fd34e66357: [[image_7232.png]]

be037d9f27a4e61209cde152779f0c02e5a9ccc7: [[image_7233.png]]

1e46c47e59a05c0ac0d030ffdf549d014fb9ba55: [[image_7272.png]]

8e9d9b89b051809fb5df21dbfdd9bd8898e169dd: [[image_7273.png]]

2c69f5dd5b56733249dc2427dac8cc77364a7e2c: [[image_7274.png]]

9a79c94f6597dbd45a7e0890ce47b91c3d15da79: [[image_7275.png]]

24bd3d6f430befb91c27ef5ad06431e79be94840: [[image_7276.png]]

5ccc6a98fb33f358dc6735781060b49cbe21d380: [[image_7277.png]]

42736459b996927bf88e9240911799a511d80999: [[image_7285.png]]

73ba5e122d31c0d0f68acbb9f31be4b9e0ec71a3: [[image_7297.png]]

83c271a338e747b97b53100609229b685792febf: [[image_7298.png]]

7210a5e6933930f70db22b779586d1bf01e2bce6: [[image_7338.png]]

42a23e8e43a9f1107120fbd25afafcaafb651523: [[image_7339.png]]

6d249bed977a64ace8adc3afcbbbbce70e9a39f8: [[image_7394.png]]

a3d60ff8b2123cb2c58c322437ce41516a8d445c: [[image_7427.png]]

b52d17abe49583513cbd267b9f54fa09ca12e5f9: [[image_7435.png]]

b129f6ea2472573d4c1c1b1c5d671f95b9111498: [[image_7438.png]]

325171c729732cb654c3b60686004857e634595f: [[image_7470.png]]

ef92a4a4e6ef7fa38209bb8fcb9552cfc1fe4c73: [[image_7471.png]]

9716526ff67b1ed5234b1b935bdfd27988d2f006: [[image_7472.png]]

24c1563456689494d7ed449f920a776cabf63265: [[image_7473.png]]

5c93ec7f688e586d157776bf86b0d82e522663de: [[image_7474.png]]

b04bcc6bcc3932967d4f478b0991bc5c6db403c9: [[image_7475.png]]

4acd64be0477dec0dd197f90d58765afde846d15: [[image_7476.png]]

3cda8b53a68ab48c8aea112a4a0312766b69bdc3: [[image_7570.png]]

dadc185c54f81eb8767a92b12ac934c862817106: [[image_7571.png]]

aea8f45a6c26f3a219c0f497d816631c9b16abc6: [[image_7684.png]]

02a3f9aa64c510218e4e008e820569714442d76e: [[image_7685.png]]

daea062f3f8c5358314d46a182b919631ff20c08: [[image_7686.png]]

6fcdf00532f93259a68fb91756459192c18fd441: [[image_7687.png]]

13ed5eb4915e112ef26674c5e98b9b3aaedf7185: [[image_7922.png]]

%%
## Drawing
```compressed-json
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
```
%%