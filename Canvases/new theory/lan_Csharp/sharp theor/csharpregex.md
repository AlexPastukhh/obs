---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
!!! ^tJhaEjxV

And we need multiline because without it $ will match the end of the entire string, 
not the end of line and if we will encounter stringwithout special chars but with 
spaces at the end, we will replace from this space to the end of entire input ^vgX3NF5j

!!! ^EbCoysQt

!!! ^lh92mhRE

!!! ^o6OftGXb

!!! ^k4ytogQK

Cant reference group that wasnt declared yet ^gdmqku3u

to keep the first word need to match both and replace with jst first
Regex.Replace (@"(\b\w\b)\s\1","$1") ^tjljFUwA

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


 ^7Qf82QML

can use named group on what you want to capture if you can afford to capture full length of 
what before and what you want ^qvMztdRc

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






 ^VAyQylTr

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>. ^QoBgYzQf

give best regex for email ^bHV0SYE6

Copilot said: "Best" depends on your goals. Matching every ^kH0BaXvL

"Best" depends on your goals. Matching every RFC-valid address with a single regex is possible but impractical and hard to maintain; for most real-world uses you want a practical, safe regex plus extra checks (length limits, DNS/MX lookup or confirmation email). Below are three options (practical, stricter with length checks, and a Unicode-aware variant) plus usage notes and a short JS example. ^SZCUmrdc

1 Simple, pragmatic (good for client-side/quick checks) Use when you want to catch obviously-bad strings but don’t need to accept every edge-case allowed by RFC 5322: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/ ^e5qv9eol

Notes: ^pzLBdA8j

Allows common local-part characters (letters, digits, . _ % + -). ^E1t7Qg0W

Requires a domain with at least one dot and a 2+ letter TLD. ^HxAvIfj4

Easy and fast, but allows consecutive dots in local-part and some invalid domain forms. ^DIeYGl0u

2 Practical + stricter (enforces length limits, forbids leading/trailing/consecutive dots in local part) This is a stronger, production-ready single-regex approach: ^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)@[A-Za-z0-9-]+(?:.[A-Za-z0-9-]+).[A-Za-z]{2,}$ ^nWbctygx

Explanation: ^8ZcXk3aA

(?=.{1,254}$) — overall max length 254 characters (common practical limit). ^ZL5OfeJs

(?=.{1,64}@) — local-part max 64 characters (practical enforcement). ^b7j3ZZZr

[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)* — local-part: starts with alnum, special chars not repeated/consecutive or at ends. ^lEJnMtGz

Domain: labels of letters/digits/hyphens, final TLD of 2+ letters. ^pNSTW9ll

3 Unicode (EAI) — allow internationalized local-part and domain labels (use in environments that support Unicode-aware regex) Use the Unicode property escapes; requires a regex engine with \p{…} and the u flag (e.g., modern Node.js / browsers): /^(?=.{1,254}$)(?=.{1,64}@)[\p{L}0-9]+(?:[._%+-][\p{L}0-9]+)@[\p{L}0-9-]+(?:.[\p{L}0-9-]+).[\p{L}]{2,}$/u ^EphZt3gD

Notes: ^2U5bFW9U

\p{L} matches any Unicode letter so names/scripts beyond ASCII are accepted. ^aLupJPoc

Still enforces the same structure and length rules. ^mRQjgyCx

4 RFC 5322 (theoretical completeness) There is a monstrous RFC 5322–compliant regex that accepts many rarely-used syntaxes (quoted strings, comments, etc.). It works but is long, hard to read, and can be unsafe (catastrophic backtracking if not used carefully). I generally do not recommend using the full RFC regex unless you really need to accept every edge-case. ^S33dqHov

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


 ^EOerKbXI

Jan 12 11:22:01 mail postfix/qmgr[2011]: 6A7D91C0A: from=<alice@example.com>, size=1234, nrcpt=1 (queue active)
Jan 12 11:22:03 mail postfix/smtp[2022]: 6A7D91C0A: to=<bob@example.org>, relay=mail.example.org[198.51.100.2]:25, delay=2.1, delays=0.1/0.01/0.5/1.49, dsn=2.0.0, status=sent (250 OK)
Jan 12 11:23:00 mail postfix/cleanup[2033]: 7B8E02B3F: message-id=<202501121122@mail.example.com>
Extract: date/time, process, queue_id, from (or to), size, relay, status, message-id Difficulty: Medium Hint: queue_id is hex-like sequence followed by ":"; use that as anchor. Email addresses are enclosed in <>.
lets say it can be qmgr smtp or cleanup process and they have such structure ^PkTemRYb

^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)@[A-Za-z0-9-]+(?:.[A-Za-z0-9-]+).[A-Za-z]{2,}$ ^sdKICTUB

fixed version but ^Jk4FDzXW

here actually need / ^A72kHN7n

\[d+\] ^pwk6aHWx

## Embedded Files
f049ea8c53d7e67bfd0610ad4eca1928686cb40c: [[image_7783.png]]

ec3e97e9b1ba07d1f6c4b0c408524ee388b85483: [[image_7785.png]]

1373f4e6e48d1c94c4e22b1bff8effbe38b6f88a: [[image_7786.png]]

f9ce4d484f586d194ffd30659a635a9e1ac39d89: [[image_7787.png]]

374366d54995292eefcc8101fd0f505ef8e9d32c: [[image_7789.png]]

260938a5e984332c703f590b588bf71edde2fa42: [[image_7790.png]]

2f8f1549bdeaeccc3e102cc8b56bb981effb00b8: [[image_7773.png]]

656b85dbe4ce8e629434b3cbd3e19e0229cac829: [[image_7774.png]]

d3c0f3f455b23b1d4a317a09954b3da705aad4cd: [[image_7775.png]]

05b7f554b21511e8dfad2922177c4d7d7a5f001b: [[image_7776.png]]

05d0f97625e5b6fea591920b476313f3b9554f60: [[image_7777.png]]

40730ce14d226fb6afe0fae3d46b2cdec91fd9fb: [[image_7778.png]]

07e21896d1f6d56822fefd96c619f9acf3702c08: [[image_7779.png]]

9dbd42ef8d349fff0fce30ae05666e7fc595d383: [[image_7780.png]]

f23205f3c5b681ff49f888f78c706ac16a86df63: [[image_7781.png]]

d560ae0b299f8417d20f7027fe5ef56fbeda52fc: [[image_7782.png]]

9e56ac59ed8accf1bec0029a39538b6e83cc8504: [[image_7784.png]]

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

%%
## Drawing
```compressed-json
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

S0/AD4QFSnFSeTrhALCmzgEACzgIAA==
```
%%