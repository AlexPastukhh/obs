---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
efcore can materialise objecteven if all of its columns are null
the fact that you have ? for  your fullname  in client can be not enough 
so its better to do the shit excplicitly  ^c0kjjFkq

hascheck constraint ^4gF6J8uJ

navigation ^OxyaPTDJ

owned isrequired ^v67LJYwZ

need to add somewhere, to some general dbcontext mapping sheet mb ^0WpCJGfm

shadow prop usage ^SXfHzoG7

reduce cpu and everything for reads ^S0xpbk7p

Attach ^VTYOQ7Ui

how to save yourself 
from sit when someone make 2 parallel requests
to create acc with same email  ^gVEFcpkI

better to have isrequired false too ^TEtEzY36

complex types ^W52zn9Il

nullable relationships ^Jx36p6kt

what to avoid in ctors,
would ef use parameterless ctor by default? ^K9K0J6sJ

ctors wont run when ef materializes entities? ^z4GnbSIA

1 if not default id - marks as unchanged 
2 if need to modify - attach then modify or mark modified excplicitly
3 if adding new entity with detached in some prop - need to attach that detached 
to avoid adding existing but detached 
4 when updating entity with detached - detached will be modified need to override savexchanges or 
config so model  ^lUmZsTqo

identity map pattern ^BfunBqZt

so in writes we potentially can do some shit when we fetch 
something while having something that we have fetched already and 
mb have changed?

dont think so, sounds like shit


load and find more about explicitness and debugging

or when you allow partial loading in writes, chat gpt forces this shit actively

can i do this for projections in reads? hard to imagine

it more just to know that if you have some nested/ multiple methods
that for some reason can fetch instead of continue to modify that was already
fetched - then you can use find everywhere ^YlFQcxkI

loadasyn + autoinclude ^rhyurbOi

concurrency in db  commands
isrowversion isconcurrencytoken ^ooM3u4HQ

dbcontext about transactions strategies ^w3jMSOTi

so i have some scenarios when i may need some 
transaction or when i may think that i need them

1 when i query something from db, look at it and chose to change it
but at the same time i may have another request that 
changes the same thing

dont need manual transaction, can configure rowversion or 
isconcurencytoken and ef will throw exceptions

2 when i have multiple queries to get data 

may need transaction with isolationlevel snapshot

3 when i have some possible nesting of methods that mutate 
queried entity and each may call savechanges
one savechanges succeds another fails and we get inconsistency

need to wrap everything in one transaction with any isolatoin level but usually with default

4 when i have some database.executesql  or other like dbset.executeupdate (that is
linq based but everything else like executesql) - they all dont care about savechanges 
so if i want them to be in a traqnsaction i need to create transaction

Retries

5 if i have some buisness rule with automatic concurrency conflict resolution
i need to catch exception for concurrency and then get entry, load db data 
and try again, but only for automatic shit + need to have right isolation level so i will be 
able to inspect db changes from that isolation 

6 enableautomaticretryonfailure - retry the whole delegate,isolation level doesnt matter
need to wrap with createexecutionstrat executeasync or executeintransactionasync for 
veryfies that db has been changed when we lost conn and cant say if transaction was succ of not ^zPBLIRBY

about transactions isolation level for atomicity ^767Jqpov

some onmodel creat hshit ^fNPUYpng

so rep shit ^P5nXf5Nx

entities shit ^YWI9XZ0W

transactions ^goV10KNR

use asnotrackingwithidentityresolution for ef core reads by default? ^nIeGtS1h

when useful ^07T9ZtwP

asnotrackkingwithidentityresolution ^9bm9GDrb

can do partial inits only 
for projections for read, 
write need encapsulation, 
and invariants

also cant return the domain model 
with partial init even for reads, because
if will lie about yourself being valid domain model
with all data present ^M64cxYDu

partial init antipatter ^pQvyTUwT

can we have exhaust check? ^wX0JJeqW

db exceptions ^TTZ4n8gw

retry exception ^28I2qJHC

pos concurrency automatic,
not user view driven 
retry logic ^MnL5l3L1

have  entries in 
dbupdateconcurex

can getdatabasevalues
with etag

and then update how you needed ^B44QZ4g3

!!!! ^MVOgVvwC

!!!! ^cUQLEwfJ

!!!! ^R9JJU8NQ

Executeasync ^HTjTqocs

executeasync without transaction
when just need to retry with some app
logic like get current time ^SKXSZmHR

!!! executeasync without transaction is possible when we dont have multiple 
writes and the state that we need to rollback ^ds6uhh4b

IF THERE IS NO LOGIC
AFTER WE CATCH AND ROLLBACK

SO WE DONT STRICTLY NEED
MANUAL ROLLBACK

BECAUSE WITH USING

THERE WILL BE A ROLLBACK
ON DISPOSAL ^JKsOyTCy

ABOUT ROLLBACKS ^snSPmt6j

EXECUTEINTRANSACTIONASYNC ^WfVKEXKS

EXECUTEASYNC
WITH NEW CONTEXT
PER RETRY PATTERN ^FnxnOuIX

PLAIN TRANSACTION WITH 
BEGINTRANSACTION ^H2w9u5DB

CAN WE JUST WRAP THE SAVECHANGES(FALSE) AND RETRY THE PROBLEMATIC 
PARTS WITHOUT CLEARING MODIFIED STATES?

SO WHEN WE CANT DO EVERYTHING OUTSIDE OF RETRY, 
WE CANT JUST USE SAVECHANGES(FALSE), WE NEED SOME KIND OF
WRAPPING THEE WHOLE UNIT OF WORK ^8gFVLT0p

PROBLEMS WITH REUSING SAME DBCONTEXT ^7gzrEDF0

IMPLEMENTATION ^vxUhp2L1

DO I NEED TO DISPOSE
EXECUTION STRATEGY? ^ZpYlyxjE

transaction patterns ^vZeimrf6

normal executeasync will retry when it see ambiguous outcome
so if operation is not idempotent it may be dangerous ^1RNd7QFT

reading your own uncommited changes ^dRMdYpma

db/sql shit ^5SciPPvL

when we have grandchild of only one collection of parent
we will get rows like this, so there wont be null because 
another child doesnt have collection,
 ^dVcZasl8

how row looks like when some
collection items have their own collection ^x2mWzr17

formula to compute
rows count ^vGpnlwWR

ABOUT CPU/MEMORY USAGE 
FROM TRAKING ^GEbiwZ0T

MEMORY OVERHEAD WITH IDENTITY RESOL
COMPARED WITH ASNOTRACKING AND TRACKING ^6k9ct6Qu

FULL ORIG VALUES SAVING
VS JUST IDENTITY ^OujJJ150

db invariant handling
strategies ^mbY8FD54

isolation level like
serializable can help sometimes
too, but like some addition and
desing choice not replacement for
db constraints ^mp9qwpEY

when both trans need to have isolation 
serializable 
to keep invariants ^QTJvaQpL

!!! ^UhLq8GEV

!!! ^O0yvNIzT

primary key ^5OXpuUZe

unique index ^qqPq5nYT

alternate key ^aDZAr0VF

foreign key ^VbsSPGfA

not null ^wHAxId89

check constraint ^pvZpJX7o

indexed view ^PXN5cPU0

custom db error from stored proc ^CRMPq4qQ

trigger ^SaPzwJQN

filtered unique index ^8rO4KvZb

unique index on comp column ^NfBdGRLa

how to know which
check constraint failed ^KLPxdsTS

is custom dberr limited to storproc ^o1m3ZGq5

native declarative
constraints ^evHn08vC

about some transaction/isolation
/repo tweaks for keeping invariants ^ErDRDrt1

transaction + just returning
error result on some db level 
error codes ^07LNrp1X

transaction + handling db level
error codes with savepoints ^xkpNz6ac

can know which constraint has failed ^kChVrcDh

transaction rules + db 
level defense impl examples ^F2vrNWou

examples of handling db level shit ^2KG3DGlc

about code of sqlserver that are retryable by 
default or not ^DIrmVOiC

there are a lot of transient error codes and 
if you want someting specific- you should i this  ^jDGTRAig

!!!! ^kJfAhs8c

when you write in snapshot transaction
and the data that you ve read was changed
you will get exception with 3960 ^caSMTG1G

so it can happen with 
readcommitted(on example most likey it)
and/or with serializable ^VoOjjjZK

547 check constraint ^VE3Yo1aV

547 foreign key ^cNUKUGr3

cases with 547 ^BahApA5Z

cases with 2601 ^e3gvGFNp

cases with 2627 ^G2VsN5SY

ef core/ code mapping
547,2601, 2627 ^G0wMdCeS

just like with primary key but with commposite key ^Lpun3ERM

1205 transaction deadlock ^gY4h6ymI

1222 transaction lock timeout ^t8UDEhFg

3960 snapshot write,but 
state is inconsistent ^NgSJ2jec

-2 execution timeout ^1HuybwbB

515 buisness failure, insert null
into nonnullable ^z80crFxv

different sql server error codes, what can do with each ^0but83Rw

2601 and 2627
buisness failures ^iUIN1MQT

unique index
 ^XirLcJBV

primary key
alternate key (unique constraint) ^EDrFU9ka

547 buisness failure ^eKlPyeJh

helper ^t0Khhl2X

summary ^2bxkX3li

do we have some specific db exception]
for connection drop? ^dOAqKOcD

we have exception types based on the actoin , not the type of problem
like exception during update ^jBJGD30S

alternate key sheet ^voYMUkTp

coposite key sheet ^Ssojl8j4

## Embedded Files
7e221f768884ec140c888dd2a0743497d3c6ec58: [[image_7485.png]]

5152f87defad976c9dd3ee14756ef28ee32a6574: [[image_9213.png]]

3945d0f1d71dd0bdb3cb1faa44bbea3b98c0035b: [[image_9271.png]]

55ea344509b1cac8eab294a42109f6936a6e8b2e: [[image_8445.png]]

1e229933ef928389bc29b7e08afe9972e834b1ff: [[image_8446.png]]

8a232da43012177f003bd2cac088142de3549bcd: [[Pasted Image 20260310065811_471.png]]

a67f713acec88461f5025b56f8ff356744568f30: [[Pasted Image 20260310070040_279.png]]

5f5db5c14f14f8f2229c24570125d93c44fdc31f: [[Pasted Image 20260310070043_360.png]]

1256f47477dd6f49f7961a168e4bc32fa7affded: [[Pasted Image 20260310070047_529.png]]

e64cf873106e91b8131fc21f7c82b43755606ed9: [[Pasted Image 20260310070050_762.png]]

3dc7a29628084e374f8250cf75dfe35a028f5916: [[image_8028.png]]

62853cad31d530ef58e80a97804cb298b795a3c5: [[image_8029.png]]

0f7c82eb0bec02dfc86af922257a53526a4ccf7c: [[image_8030.png]]

9f752fd7b7e8a9c2414c7e769e05e46fee6a55df: [[Pasted Image 20260317040126_083.png]]

9be28189df2434f3546cf4174c7bd08a89b95b9f: [[Pasted Image 20260317040129_583.png]]

dfe76f5f7c139b6c8d4be2a2408d2c252aac81fd: [[Pasted Image 20260317040135_391.png]]

8d6946160e8d6fae504a054f47ec06e48b97fd8f: [[Pasted Image 20260317040139_421.png]]

deb7e62c3fe6139054d5ee0347b8701300674f10: [[Pasted Image 20260317040151_557.png]]

685f8e9fda815431c2bf94170023f5da0f8a83f0: [[Pasted Image 20260321015341_798.png]]

548433edd76615620625f9eef1e01a840ad33277: [[Pasted Image 20260321015346_234.png]]

064840baae85fdbca51e7262310dab5aab2349a6: [[Pasted Image 20260321015349_443.png]]

2e1caff84a4b3178d0d7c8e1c8b94ec40640a55d: [[Pasted Image 20260321015352_721.png]]

4538d60710a3dffc240a4b71beb39cd039c107cf: [[Pasted Image 20260321003503_472.png]]

bc91d60828e809f6f6912a7f8135900d5770015c: [[Pasted Image 20260321003508_629.png]]

e42dcdf3236026efc2ab2a5f140f254438ebc6ab: [[Pasted Image 20260321003512_849.png]]

946177ff2792c9ea96f6de3ed0b56e6c40936f4f: [[Pasted Image 20260321003435_131.png]]

354939e8d711e4357a48a491dd3910fc58ad5f50: [[Pasted Image 20260322213034_413.png]]

5e335b4ef189aa60a3a99594deae30f73b88a348: [[Pasted Image 20260322213137_040.png]]

1b74640858f7eede262744d40f1dd43b3a2a5cc7: [[Pasted Image 20260322213139_880.png]]

af19e8920a19689612c61ac88e733822736f2419: [[Pasted Image 20260320074628_621.png]]

27e0fafb7d1dd39ad64edc5438ff329d5a637ded: [[Pasted Image 20260320074633_092.png]]

31d62e0a787f927257864cfe55f7d0b3c267c8a3: [[Pasted Image 20260320074635_593.png]]

07d0c9bb3c5a467c780b0f613c12c3e674f4ac3e: [[Pasted Image 20260320074637_754.png]]

f5a69d20bc55a391997a61bb78f7c73b64aaac8e: [[Pasted Image 20260320074640_909.png]]

0e5b2c9aff1b36026f880b36a533c32519359072: [[Pasted Image 20260320074644_741.png]]

691ce63670c573632306077fd985abe8a79cf054: [[Pasted Image 20260320074651_022.png]]

ac404adaa82d93827686a2a6fe617389f48e3ee9: [[Pasted Image 20260320074656_184.png]]

7f7dafd9fefedd4b605034e67f3b2ae00150d9a6: [[Pasted Image 20260320074704_177.png]]

e3704b53e4028549ffea767beb54d99d4d85d70d: [[Pasted Image 20260320074711_287.png]]

2175a4a601a6018b498319898b0c9d0d68e07b2f: [[Pasted Image 20260320074719_342.png]]

810b517d3a83149a422a3176c0d2b7a7dbd03a48: [[Pasted Image 20260320220534_154.png]]

4f85a4e72bc4203abba590b7d6516fbdb45ba18a: [[Pasted Image 20260320220539_116.png]]

3edaef3497bb5e79e529e96ee786e7cefca5d89b: [[Pasted Image 20260320220542_060.png]]

1607e83e8f409ebd387ca95b3c92f969325c74d6: [[Pasted Image 20260320220544_456.png]]

b074625c295b62694e1a57554c75389cde79a177: [[Pasted Image 20260320220547_916.png]]

0dc36252297a06db0078a475ab4864173854cb77: [[Pasted Image 20260323221224_374.png]]

119679e20cbced03fb1e7006f8c4986131a0a55f: [[Pasted Image 20260323221227_702.png]]

3710ca8272c1f3d9c6a7d4c590e992559504cb75: [[Pasted Image 20260324024301_271.png]]

4e35b1cbc9934429c0cd8079ae69a2a49dd4ca29: [[Pasted Image 20260324024309_195.png]]

b7164244ce7dec37e2e2e5c83a86e10438119523: [[Pasted Image 20260324024312_987.png]]

a9bd2293fc248ae07c1173e461985575a8632271: [[Pasted Image 20260324024316_229.png]]

05e414e028c1b1d6bcf153369b0749a86442e877: [[Pasted Image 20260403043105_228.png]]

be97b0c8b5b2d0e172a660b68ab319bf1f567d37: [[Pasted Image 20260403043109_975.png]]

75c8a8c2fe0408b09f303c6a5d18507692fd706d: [[Pasted Image 20260403043112_947.png]]

2252a4c4afcbe8a8e28a05d968b23522b3d8aa09: [[Pasted Image 20260403043116_386.png]]

eb072cdd8b55fe760879fe34f3b04b621f5fcd97: [[Pasted Image 20260403043557_730.png]]

16669395cb0b63e0e7f40d871b74ea04330e9fa3: [[Pasted Image 20260403043600_629.png]]

f79556b4d71305bb2cc0fdfff4aea1c5141d7545: [[Pasted Image 20260403043613_353.png]]

a42c0c4aade351c6fd6c251b8056286ec1da1a0a: [[Pasted Image 20260403043617_008.png]]

bf9f234ad6f9b9f73af8bc6e1621f262b3d485a5: [[Pasted Image 20260407202731_923.png]]

ea9b1ba7b6f2f42383727cdb84acf62e626b01bd: [[Pasted Image 20260407202800_263.png]]

5310695bc807bc358ff8825f8491328c73b00fa7: [[Pasted Image 20260407202803_094.png]]

bb49429aea16ad3f59958d55982439b9cdde6838: [[Pasted Image 20260407202806_828.png]]

601cdc59fb0c11b77b018bf66636ca145c9dfcad: [[Pasted Image 20260407202809_768.png]]

9d4a455012eff14657aed945c9fae193bdfd025f: [[Pasted Image 20260408015159_859.png]]

2e2d51d95b61fb8d55c0fb8ed825b8c28e637008: [[Pasted Image 20260408015202_840.png]]

4cd8371579deb26afb0534d69dcdb3e8553be900: [[Pasted Image 20260408015210_197.png]]

0d177ffd07147af7d35f411413d5ee02822e0ea7: [[Pasted Image 20260408015213_892.png]]

f367e6bcc82f14862f2cdb78ca47b669e18b51b8: [[Pasted Image 20260408015445_252.png]]

877655b6a177556a35046276fee9bbae7e74eada: [[Pasted Image 20260408015454_524.png]]

3ca00b42d1139d34a32caaf1a63434244730e4bd: [[Pasted Image 20260408015500_117.png]]

4a2c92a25d549d3c2623a2ad97e74cc90359c2a1: [[Pasted Image 20260406235539_016.png]]

f3edcfaf7e1519eb1c2b542c712bcde7bb95447c: [[Pasted Image 20260407211124_861.png]]

4623b891f0a16f93e0637db61166317eab844d0e: [[Pasted Image 20260407211128_153.png]]

fe1486e91e35a886fbe7450149b6e9e053004cac: [[Pasted Image 20260407211131_942.png]]

d550926c13cf8102ecd2b49bb3ce64e0cac389c9: [[Pasted Image 20260407212417_338.png]]

0fb94e67d26d805b17cb414b783b58a021cdc8ed: [[Pasted Image 20260407212433_712.png]]

931e9dbc593f52b100ed575a4ca580761dca02e4: [[Pasted Image 20260407212547_157.png]]

348a9ce611afb7ef5891271295ef2db92af3507f: [[Pasted Image 20260407212552_234.png]]

7eb8d340a090b9af9f503af2e1be6e230aedc12f: [[Pasted Image 20260407212555_012.png]]

ff7e8e9193daf574380ea265ef9628049f83c9ec: [[Pasted Image 20260407212557_729.png]]

c71d585f1cb0b6a3192e6b0f06d74ab5d2f0ee07: [[Pasted Image 20260407212602_524.png]]

6ed006ed5230961f402c030fb2d40379a2ce465a: [[Pasted Image 20260407212728_462.png]]

a44192fc9c50c9153cd49cf9f56712039bfe0e14: [[Pasted Image 20260407212731_364.png]]

d9734d27aa74a06e820c034bf5f22b9aff86375c: [[Pasted Image 20260407212734_307.png]]

537f6d09ce654a79764ee0fc9e0e211a9f0f51c4: [[Pasted Image 20260407212737_090.png]]

61128fcc375b1750a8f5dbe4ebacc1ff40bb9ae5: [[Pasted Image 20260407212740_958.png]]

1c28ee08dd405e859b092cfe7b3089274ed7babd: [[Pasted Image 20260407212911_857.png]]

52983015a0c68b1f228be0fa43acc6f9e68b1040: [[Pasted Image 20260407212915_195.png]]

c615edd7e496b935a5b1764b9ac2e8d7d7d14984: [[Pasted Image 20260407212918_184.png]]

6d8a2eabcb60d4c24d13d055afd578f8c003fc6f: [[Pasted Image 20260407212921_793.png]]

c9a33930dc60eebe73f5e1f75a6bf65a6c5a99c1: [[Pasted Image 20260407214748_542.png]]

fd3966a0287969575952edde5015848654c78835: [[Pasted Image 20260407214752_641.png]]

bad6c7925d615c11a373c37d523aa6d4fcc06900: [[Pasted Image 20260407214756_334.png]]

04a6014d7ef5b407ba1c4182d148514ec315537f: [[Pasted Image 20260407214759_677.png]]

a986417d9ce80d2710290c2608e97f2b1d5d23ae: [[Pasted Image 20260407214802_715.png]]

22dbb748f8b8579bf7dea394d8d385440bc9cd45: [[Pasted Image 20260407214959_816.png]]

81e06c3726ff52dca6e8c9957be26b126fd843a4: [[Pasted Image 20260407220304_969.png]]

2a8eabcdc070e60b22d5b2b0d17ef3e42fdf4560: [[Pasted Image 20260407220309_005.png]]

cfc56d6d5fe530c9ffd13f7e3251d9f05b59b58a: [[Pasted Image 20260407220312_395.png]]

8434b9c8e69db98975660828962aaa3776e6c92d: [[Pasted Image 20260407222342_486.png]]

d223cab8c7771558dacd9836231ea17d341cc0e6: [[Pasted Image 20260407222345_858.png]]

f2b09cfc37478b6c85fba6c622e7e796aecfb590: [[Pasted Image 20260401125959_613.png]]

b032ff969a896252785444a85adf5aa6e1c6c3d6: [[Pasted Image 20260401130002_942.png]]

8efec378b42830e1f70b871bbf904f7397fe26b0: [[Pasted Image 20260408185744_188.png]]

a875e1cb09ca7aa9390973adfc32df337cdcf4ae: [[Pasted Image 20260408203010_410.png]]

9fd89ce950fa9217d3c8ac8a2af70b7e2653df09: [[Pasted Image 20260408203128_494.png]]

d2a985b66b9bc2051e4ef406201f7e9af1526755: [[Pasted Image 20260408203131_069.png]]

a9718d5f9e22112d0fd7b4abcf471189c32eb916: [[Pasted Image 20260408203134_069.png]]

0799677a32a0967ba47e077f42d7b528f6041d8a: [[Pasted Image 20260409160412_514.png]]

a98e9278ac8e50d3f5c5902ddf9179ce5bebdaf5: [[Pasted Image 20260409160415_438.png]]

66caf78b735692c0b9a9bdb7ea0671bf76d65255: [[Pasted Image 20260409160418_811.png]]

93da91318994692ad5c0b347a53e3ab58a4eb5e9: [[Pasted Image 20260409160423_754.png]]

405ad969feea89655bce939e1c55683ce69661fe: [[Pasted Image 20260409160427_876.png]]

869534ad717d35cb3cb9cbd2c46e758ca5efe080: [[Pasted Image 20260409160431_729.png]]

ec5b64ce1905c9fdfc7f7aaafdcf7fb33e3a4fba: [[Pasted Image 20260409160435_425.png]]

d553a7c9e7a77205cf5b2bd1ddda20fc0b0da3a0: [[Pasted Image 20260409200501_752.png]]

258a97a7b80868eca93b967be3beaac53c65f983: [[Pasted Image 20260409201609_765.png]]

29b6d919c667115de7edfb84c4ffcd144c5be0bf: [[Pasted Image 20260409201846_274.png]]

311adeeccb0495c6f8e43fb25302bb5f33e1c5d2: [[Pasted Image 20260409202108_794.png]]

8abf6e47abe267cc571895bfd9ed6f231366db70: [[Pasted Image 20260409202118_800.png]]

cb1d7ba6c5b2979bf76a99f4c4b649cfad6a53e7: [[Pasted Image 20260409202121_885.png]]

b5c7eccce43a73df5d4b01d31694da7f95783c97: [[Pasted Image 20260409205617_818.png]]

ea94868227f781a7bf2bd0855a93cab1f6894469: [[Pasted Image 20260409205621_997.png]]

ed165b54366b9f7b6cffc1d8b9a3464b8e9a2b06: [[Pasted Image 20260409205624_830.png]]

66b9657a8d525c5f361ea3dfbf5d0fcf1204bbcf: [[Pasted Image 20260409205639_425.png]]

bd571a53a567f195912e5aa63968d84ada5f30ac: [[Pasted Image 20260409205642_606.png]]

6f47651fc3439846d05c7770a15e4f4cbad31efb: [[Pasted Image 20260409205645_977.png]]

83f3ab625d3825a3dee0f658b0a77d3a360961ba: [[Pasted Image 20260409205650_289.png]]

18161063f2c49a1327df5a18985c4f552f9c2b88: [[Pasted Image 20260409205655_454.png]]

4524185a34e7042611adc8f06333b2f1d905d43d: [[Pasted Image 20260409205700_735.png]]

84ace0cfa581370e336b63118319d89bf6bd7fd0: [[Pasted Image 20260409205707_868.png]]

b69e3c968959b27b2ea3ad82c2fcb54e47a13294: [[Pasted Image 20260409210636_632.png]]

5101fe19f06164d1a3fae074ceb8648e4ab98d2b: [[Pasted Image 20260409210639_493.png]]

1a115239dde9096ccfce7f4eb21847636e7bed46: [[Pasted Image 20260409210642_101.png]]

b912609b7be7294297e108a7a55b5484ff34b7ed: [[Pasted Image 20260409210644_750.png]]

a95c74020e610e2958ee1d6c3959b1647f8a61e9: [[Pasted Image 20260409210702_060.png]]

2e0968ea95999d7523638a7b4c3ea330087c3fd8: [[Pasted Image 20260409211221_547.png]]

c00ab039d3dece29b26717557e821185eddc3a6f: [[Pasted Image 20260409211226_048.png]]

fc9c52224cbfef64e7e81244076a92ec849b7aed: [[Pasted Image 20260409211326_563.png]]

9fd2c489b8911ef80cd9dd7cf651d5adffb439d4: [[Pasted Image 20260409211330_821.png]]

9eabad13a0de46355cfd1dc5456aa73b61cfda91: [[Pasted Image 20260409211344_620.png]]

4f69727662373cf6cc879b235a5dc44992ebb609: [[Pasted Image 20260409211348_637.png]]

767d2cf3e805c865228e7e8ca541bb435f47873b: [[Pasted Image 20260409211355_542.png]]

5a5dba24a6a2f31800c4d4b465e818cfbd7db6aa: [[Pasted Image 20260409211359_957.png]]

fb54d4b88ab8b7ce7889c7cca7140c8bf4107b29: [[Pasted Image 20260409212137_233.png]]

6da431e11bc4f7516d645fb1d089d86b8d324ef3: [[Pasted Image 20260409212140_952.png]]

70c159cac9b6a504887a34c5add43ed9d039a621: [[Pasted Image 20260409212143_940.png]]

91dffdc834d7adca6f0e80c498287744994c872c: [[Pasted Image 20260409212147_785.png]]

2e16d8e83a732b42045a59f9624975b51e55061e: [[Pasted Image 20260409212157_310.png]]

62ca23d639d5d3c6d5af7cc55174b4af8b5bb7e2: [[Pasted Image 20260409212202_241.png]]

8e0d1bab52aa1e5f2dbbaec1fda76d8838138e77: [[Pasted Image 20260409212207_070.png]]

53559e9dd425e45993b21e2dd9255f356c623506: [[Pasted Image 20260409212233_663.png]]

3bcfb73a80c282184074225a5e1962224e053e0a: [[Pasted Image 20260409212240_563.png]]

7f38906d9589ffcf4291e7471930a2ac4c271208: [[Pasted Image 20260409212246_958.png]]

51d9638065fc062a1df7433d888507bd9deba5a1: [[Pasted Image 20260409212252_451.png]]

cbb001351576474d3576dd3a7202bfd7f9d674ec: [[Pasted Image 20260409200505_167.png]]

cb77662926e4ecaa7766c8dbc3787857f6c934f1: [[Pasted Image 20260409200514_464.png]]

7a37587b90b3c6eb3d65f1344377b25e0594850e: [[Pasted Image 20260409200519_253.png]]

945bd04fece2e2e8acd9b64d822707042ce63f89: [[Pasted Image 20260409200529_121.png]]

10c96e91fe9dd9091c091a006f3f700d36f24414: [[Pasted Image 20260409200535_968.png]]

93a32d214ffe28362406b2eb794b3e2a93124593: [[Pasted Image 20260409200540_244.png]]

e677551dda02b8b38cbed5066994590db087b23f: [[Pasted Image 20260409200547_170.png]]

33f12760fa4cf7c397b05c0bdd1e6bb09c7c7690: [[Pasted Image 20260409200634_817.png]]

8ace8a759baf6fd1e48d527855ae3989a7f41214: [[Pasted Image 20260409200637_674.png]]

6035a2e8864a48a25d4bc8dbb6940de835b52e64: [[Pasted Image 20260409195432_083.png]]

de2836a30436dda18f8ee8f82585faddebd17a3f: [[Pasted Image 20260409195438_743.png]]

8597afc46c8e8e95b01caa1eb792b2d756460ed7: [[Pasted Image 20260409215559_096.png]]

03920fabdb08397de6a394f0cd2809fa20671b66: [[Pasted Image 20260409215602_708.png]]

60d7aa74dca283419076b9ec9352761bc78e8d19: [[Pasted Image 20260409215615_269.png]]

af034c161dd8d6c16b390446a26c7f4bc56c5bae: [[Pasted Image 20260409215619_481.png]]

20c0221ff8dc014a8b5b2dffde47231d888efe97: [[Pasted Image 20260409215624_002.png]]

f877a208bd923c1e494438e22eb1979df79a434e: [[Pasted Image 20260409215629_465.png]]

025e723719a329e82ae3553ff4d39468efee0e61: [[Pasted Image 20260409215639_978.png]]

45ee8f8d5e57f3cf7cdab07b152ebac793ee9e81: [[Pasted Image 20260409215645_027.png]]

38d5ec11ba2ce22380b2e4450ba5624fd6869e0a: [[Pasted Image 20260409215653_090.png]]

606a85e578bbce9d90620876d7e47f8682b3df6d: [[Pasted Image 20260409220451_846.png]]

d7dbb7cb8e67a6f46505b2e717122108baf9905c: [[Pasted Image 20260409220455_201.png]]

320b1057d4b8a048177c1b50e6fc2593f265c636: [[Pasted Image 20260409220458_792.png]]

41e4f03b108ad489351c0bc7ec52e6f1a02c883f: [[Pasted Image 20260409220501_604.png]]

c962910bd2691d0e2536cc07b80d5e360183a8b2: [[Pasted Image 20260409220504_587.png]]

022cfbdb75ab24dde4bc403f1cbda6989a9d665b: [[Pasted Image 20260409220507_850.png]]

3560ed7645d2c58b2aedcaa2b257769c499f8e85: [[Pasted Image 20260409220511_662.png]]

a665a9bb35415e718a54313a742584a28bf8c9fe: [[Pasted Image 20260409220928_100.png]]

cfe9addf3daa7faa9b75fdf8fc42e8232b1b7d59: [[Pasted Image 20260409220936_853.png]]

3e113f6aa71055f8bde387e1a8b992087e2f5780: [[Pasted Image 20260409221152_532.png]]

bb2c695afedd4834ff452303fca07edc2b93a746: [[Pasted Image 20260409221205_166.png]]

559a760156e9cadfe0c63ae02efb025d55299569: [[Pasted Image 20260409221209_034.png]]

7050caa680610135a2d9e49c7a7f0e538c37a5aa: [[Pasted Image 20260409221228_709.png]]

74db9077c8f26c78639cc282b8303d54ceb120d5: [[Pasted Image 20260409221240_434.png]]

2d650d5b91bb7f071a0673b8dd54a1953a4e7afd: [[Pasted Image 20260409221308_059.png]]

17a062fdb036793f1999a0a0f8117e0a013a59a7: [[Pasted Image 20260409221340_311.png]]

c4a67f1e0ae51f8adfe8fcd59655e8ecef2cbaef: [[Pasted Image 20260409221357_487.png]]

b855296309f514c0ab4770b7883176a8bec266c4: [[Pasted Image 20260409221412_580.png]]

36e55b6d7d0e3cf130dc8bc7d1c341769d3bdc81: [[Pasted Image 20260409222252_649.png]]

ac9498e41bf25c7169abed02e038ac9a98f1dfdc: [[Pasted Image 20260409222256_631.png]]

cb30db85b7af997359d9b8176f2e93435d68ed14: [[Pasted Image 20260409222259_522.png]]

6cad9c9963618616f15373c1204fc36a8c888d78: [[Pasted Image 20260409233432_973.png]]

d9906bbae7b0f1462e73d1666ac1d936ee41e513: [[Pasted Image 20260409233801_784.png]]

34dfadf165997bbf26a9f2cb309a16b64f3c9518: [[Pasted Image 20260409233806_520.png]]

251d07068c5e76442e1f9cf29e5d192443377ed3: [[Pasted Image 20260409233809_913.png]]

87d19190d751113a5cfbf6a45ea521b8a1bee222: [[Pasted Image 20260409233813_319.png]]

c04634a9d0502ed3166b85b6762571e65b288cb0: [[Pasted Image 20260409233817_106.png]]

34ac93d4ad9e5c16dcc59d524d1ce6944c374665: [[Pasted Image 20260409233820_207.png]]

33404c3ba1fbdebcaef7c87b5c1d5cc11aab7429: [[Pasted Image 20260409233824_777.png]]

ed03f9568397a9d8a028767d196f56ddd6e598ca: [[Pasted Image 20260409233833_985.png]]

f43c47286387284ddac2dddec326603d9aba3e43: [[Pasted Image 20260409233845_621.png]]

bc83a30be99163ff78b5ca605dbdfb6245f742c5: [[Pasted Image 20260409233851_315.png]]

6d40a5edcf8bfa287a38e8026bc4bc3f97272648: [[Pasted Image 20260409233855_311.png]]

223b5e49ebe5219dcc2d8710b51a7f2245dd9d64: [[Pasted Image 20260409233859_174.png]]

8a5e9e7b51cba77bd8d87e7024d7961037a8b5bc: [[Pasted Image 20260409233904_602.png]]

d35424fae34602c48f4402627443d9a07ddda026: [[Pasted Image 20260409233909_891.png]]

968ab84dc7c55087beb881a81c0b1fba3108af28: [[Pasted Image 20260409233916_557.png]]

a93827718d8c339b86b77bb21090103e803eb297: [[Pasted Image 20260409233932_695.png]]

6c647b1fecb294b96b64b9a8669267c2885e6943: [[Pasted Image 20260409233938_506.png]]

df145a8eecc0255ad9686eff48f913fae884de7d: [[Pasted Image 20260409233946_990.png]]

2add72c59a966fa9e89f33145230d360b0d0ad94: [[Pasted Image 20260409233953_439.png]]

bed65369c86708f4758053f98037e1ac6666c813: [[Pasted Image 20260409234001_269.png]]

9ffa92ffde484701e9825e6c5b40fb3b6263b5dc: [[Pasted Image 20260409234010_363.png]]

1de4ad879908e8746075a11dc61a6f2a1b896f1b: [[Pasted Image 20260410043029_946.png]]

8f6983f4472fad7f6afe6b7f5953b70e5ba2af45: [[Pasted Image 20260410043254_080.png]]

%%
## Drawing
```compressed-json
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=
```
%%