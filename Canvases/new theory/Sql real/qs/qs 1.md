---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
how regex in sql server works, how to find something that is at the
start of the string or at the start of any word  ^7uZgxwTf

what it does ^5sK9QeN6


when need to conditionally select some shit and
in conditions there are some  aggr funct ^LutT0E0w

when you dont need division by null
what to do ^gomGUW1M

what prevents in sql for using indexes and makes query very
slow ^RQnjNWK5

qq ^lIhI4y5c

what is the order of sql exec ^ibaadKVx

how to find what custokmer has bought
all products if you have 
cust and prod tables ^zrDvYc6h

can you use aggr funcs with on,
what are workarounds ^6p98scxZ

        qq ^1TQKMycW

how filter based on if some value 
is in some list of values or in some columns ^Dt9Gkmlz

ANY ^42LdoLur

SOME = ANY ^VfxjaND1

how to flter with conditions to some values
or values in some column ^5aGAbnya

EXISTS ^L43lR5Xz

SELECT ID,NAME
FROM TAB1 AS T
WHERE EXISTS (
SELECT 1
FROM TAB2 AS T1
WHERE T.NAME = T1.NAME) ^8FvC7i1g

filter based on existense of 
some record in some tables row
with some condition toward what we 
filtering noew ^F5fDWk03

can ways above do the same ?

what are caveats with nulls ^RO7sATgV

qq ^gscawnAA

ways to return record with some max value ^8WM4H3to

which is better for perf ^qwdLy9Gg

how to return 2 rows instead of 2 cols ^oX8LStln

how rank denserank and rownumber work ^on9i4Tto

how to get substring from pos to the end in
sql server ^nTZttXIB

need to specify alias for outer table in exists for this to work ^S5dl3iQa

what is the exists caveat with alias ^eoMAADWg

working but not very efficient(normal but a lot of unnecessary lag leads created) ^GYT8dcFw

how to do better? ^J9YpNOzR

qq ^HdVhz6s1

!!!! ^rvQtArj9

    UNION  NOT ONLY REMOVES DUPLICATES THAT 
ARE IN BOTH TABLES  
IT REMOVES ALL DUPLICATES

SO CTE2 HAD A LOT OF DUPLICATES 
AND AFTER I ADDED GROUP BY 
THIS QUERY BECAME FASTER ^32DjCeHa

how union duplicate removing works
when it can make query slower(for reason) ^WBYsouhM

WHEN YOU NEED TO FIND SOME COLUMNS VALUE 
AND YOU HAVE CONDITION  -  THAT WITH CERTAIN ANOTHER COMUNS VALUE 
THE VALUE THAT YOU NEED TO FIND IS EQUAL TO SOME CONSTANT 

YOU NEED TO FIND VALUE WHEN THIS COMDITION DOESNT APPLY 
WITH SUBQUERY THAT WILL RETURN NULL IF FOR CPECIDIC ID YOU DIDNT 
DINS VALUE
AND USE COALESCE TO REPLACE NULL WITH CONSTQANT 

CAN DO EVEN IF YOU HAVE MULTIPLE CONSTANTS  ^wmwBC2Gq

if you have condition that with on col val 
another has some default value and you now 
need in yoiur query to find this value and 
you can do case but you need to run exist in it
and then just take in then the value with same
conditions you wrote in exists

what is better approach? ^aWEPQTb7

[21000] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Subquery returned more than 1 value. This is not permitted when the subquery follows =, !=, <, <= , >, >= or when the subquery is used as an expression. (512) (SQLExecDirectW) ^PaIIUQhQ

how to return null when there is no data that 
you needed to query
2 approaches ^YBICl7iG

[21000] [Microsoft][ODBC Driver 17 for SQL Server][SQL Server]Subquery returned more than 1 value. This is not permitted when the subquery follows =, !=, <, <= , >, >= or when the subquery is used as an expression. (512) (SQLExecDirectW) ^ysm7Dh0u

what is this? ^Kng5GaP3

12 30 ^sno75kX0

wheb have offset use fetch next
when dont use fetch first or toop ^PgQ8f38G

sql pagination
how to kind of skip records 
or take some records

how with percents

what if you need all records on border ^NS9NUv8B

what is outer apply and what is even that  ^6kIIVm5l

qq ^5ItJgLFI

how to delete row with duplicate emails ^xvPc2yTu

what if no matching results for inner join
left join ^xpvCQ07G

can use between in sql server ^Xph3KUfy

way to telll that some date lower that one and bigger
than other ^lkb1Mv3s

SELECT 
s.user_id,
COALESCE(ROUND(1.00*(SELECT COUNT(action) 
FROM Confirmations 
WHERE action='confirmed' AND user_id =s.user_id)
/
NULLIF((SELECT COUNT(action) 
FROM Confirmations 
WHERE user_id =s.user_id),0),2),0.00) as confirmation_rate 
FROM Signups as s
GROUP BY s.user_id ^vdhQNyfz

what is better ^hZSBxzT4

whats faster? ^YVIhB40w

WITH cte as (SELECT CASE WHEN from_id<to_id THEN from_id ELSE to_id END as person1 ,
CASE WHEN from_id<to_id THEN to_id ELSE from_id END as person2,
duration
FROM Calls)
SELECT person1,person2,COUNT(duration) as call_count,SUM(duration) as total_duration
FROM cte
GROUP BY person1,person2
ORDER BY person1
 ^bNNbDA9R

But can do  ^Oywhmlfo

SELECT 
    CASE WHEN from_id < to_id THEN from_id ELSE to_id END as person1,
    CASE WHEN from_id < to_id THEN to_id ELSE from_id END as person2,
    COUNT(*) as call_count,
    SUM(duration) as total_duration
FROM Calls
GROUP BY 
    CASE WHEN from_id < to_id THEN from_id ELSE to_id END,
    CASE WHEN from_id < to_id THEN to_id ELSE from_id END ^7MAC1b4Q

what is better ^BOFhqfgV

using isnull not only for 
nul div handling 
you have some sit when if 
null you have default value ^5r9vaEOA

better approach ^24yF9FJ9

if you have some dates and you need to get one date 
and date that right after anothre , how to do it, what is 
the syntax ^ZCHQL5lO

if you have some
calculation with 2 col values
 and one column value can be null and 
then you should replace it with some 
const value, how to do that 

what nullif and is null actualy do ^ym2KA3Y7

how to find difference in  day months years 
between 2 dates ^bXqg8zlx

WHAT IS APPLY ^OgkfdxGK

qq ^iKLgUQvd

0.3 ^XBSoFvPs

1 ^aJsChQJ1

always look for simplle join over subquery or computations on each row  ^poMm6DTD

WITH AggData AS (
    -- Step 1: Pre-aggregate
    SELECT
        Product,
        Region,
        Quarter,
        SUM(SalesAmount)  AS TotalSales,
        COUNT(*)          AS SalesCount,
        AVG(SalesAmount)  AS AvgSales
    FROM Sales
    GROUP BY Product, Region, Quarter
),
Unpivoted AS (
    -- Step 2: Convert metrics into rows
    SELECT
        Product,
        Region,
        Quarter,
        Metric,
        Value
    FROM AggData
    UNPIVOT
    (
        Value FOR Metric IN (TotalSales, SalesCount, AvgSales)
    ) u
),
PrepForPivot AS (
    -- Step 3: Build pivot column names
    SELECT
        Product,
        Region,
        CONCAT(Quarter, '_', Metric) AS PivotCol,
        Value
    FROM Unpivoted
)
-- Step 4: Pivot to final report
SELECT
    Product,
    Region,
    [Q1_TotalSales],
    [Q1_SalesCount],
    [Q1_AvgSales],
    [Q2_TotalSales],
    [Q2_SalesCount],
    [Q2_AvgSales]
FROM PrepForPivot
PIVOT
(
    MAX(Value)
    FOR PivotCol IN (
        [Q1_TotalSales],
        [Q1_SalesCount],
        [Q1_AvgSales],
        [Q2_TotalSales],
        [Q2_SalesCount],
        [Q2_AvgSales]
    )
) p
ORDER BY Product, Region;
 ^MwzGCPp1

PIVOT ^IrO9tRSp

CAN BE USED WITHOUT
PURPOSE,JUST TO SATISFY
PIVOT SYNTAX ^rXcrVbO6

WE CANT DO MULTIPLE AGG IN PIVOT/UNPIVOT,
SO CAN DO THEM BEFORE ^RNUvqVrM

PIVOT/UNPIVOT
SYNTAX, 

MULTIPLE AGGR ^1yZlMY0J

need to order by some expression 
need to compute column from window func result ^1hAg9B8K

can order by expression
+ can get column value
from expr including 
results of window func ^12uztZJp

YEAR VS DATEPART VS FORMAT ^jPfZAOjE

when select on column like this without from - you return one value
so subquery cant reeturn more that one 
so neet top or shit ^3pe1bE7M

2 ^6HN045vl

3 ^gl4LNbgO

what is outer apply and what is even that  ^8mwfcpF9

qq ^meyXMVJ1

0702 ^c23tMM2c

used join to avoid some subqueries per row etc ^iNlhYKb2

but for previous or this kind of stuf 
you need to use Lag()
 ^nS9obfva

window func run after where, so if 
you need to filter based on window func result
wrap in subquery  ^UfCTcHtc

also dont need to do self join
 ^N5eTKwWq

10 ^Cew8yJze

when need to find some rows with condition and with consecutive ids ^kFp1HZ6X

when need to find middle row ^bUDIrmJB

how to check if 2 rows with condition exists

how to find rows with condition and consecutive ids 
how to find middle row when you need 3 consec id 
 ^0xcCuaTc

11 ^ga0IK5V1

finding best combination of seniors and juniors hired with sum salary limit
with max possible seniors and then max pos jun ^OroDFMFe

12 ^BNHyrJk5

14 ^NV6Hk1YG

CONCAT MULT ROWS ,STUF ,STRINGAGG SHEET


CASEINSENS SHEET ^OANGQIvn

22 ^3LuMgKE0

24
 ^HcRTMOBE

coalesce returns first non null value ^hxchcEWL

06 ^mnwMMqO4

14 ^GidzdZh8

openjson ^hUiyDs8B

16 ^iIIEjPym

apply comparison ^ahXjNJlT

examples od usage openjson ^Xgwjlf9J

new way ^xC5pN8n6

23 ^XXfXhaaO

## Embedded Files
64aff557e487d6575c4dea792a5384c6e294df7e: [[image_7604.png]]

c3b4463789716aa2d2c381327e2d0d843f2bc477: [[image_6675.png]]

7895c5a21c80d54c7c9f96048af69eb52da36f1e: [[image_6707.png]]

998b476b12766d625c2af91470848aeaad0c4cbc: [[image_6722.png]]

0e880a74b00d71c464e87c841bc413b3addbc895: [[image_7533.png]]

931b00348e55fdae68418b1649a726ab69cb6b15: [[image_6767.png]]

7c1a127838cf14d9107392b23ec40d7861054bf9: [[image_8334.png]]

cb90c222be853165cff6c1e5d53af860276b640c: [[image_6881.png]]

0edc6abe7b3268e71f9edbd6a84d9000d567960a: [[image_8335.png]]

e9ef3511e8eb559275562229320becf229c342b5: [[image_7226.png]]

69a44ccb76dd83da5eea108b0994222a5ccfccb7: [[image_7410.png]]

bbf6b0be96d0484d6124a25b6f5fc4e88fe17559: [[image_7343.png]]

afbe2c1de0f8ee4a991d948dab0ba330240d2383: [[image_7439.png]]

fcecc0c7e366948ae5ac8172319ced082e66d429: [[image_7460.png]]

b7b5b5472624e292eff260f5dfaf10ea4f274ff7: [[image_7480.png]]

cb7b11caf4bbe9fa9b8eeab641c4296277150e11: [[image_7481.png]]

7ea7f9a270e97f9eafa0b0fbf8743e8ccc14581c: [[image_7532.png]]

0629ac2cb89769bca6aaa555e7b0f613c0cc0f42: [[image_7534.png]]

8b5299b5f97475f24e10a05353cf3efac95d99e8: [[image_8336.png]]

fcf2bbc0d3af113e37d68e1c62e3085b19453d92: [[image_7887.png]]

6e7e4d6900462b18fa2f11c7330bbe83a0293883: [[image_7889.png]]

e84f4fef84255814a64348341eb225468c3a0fa3: [[image_7890.png]]

355d77d28c12f85c85d6c063dd0fc03b6f7a57a4: [[image_7891.png]]

73a2722adb8b8d7e75382a3b5aaf2a76e48765c1: [[image_7892.png]]

3bf19f6c2105d49b0464d921825546160e2e07f4: [[image_7893.png]]

61275801109b39d8f37ef6f0dd1f3321809a9d1e: [[image_7894.png]]

2a518d3d3e97a62590afa67a7256dcd217f7322b: [[image_7895.png]]

38fc7561ce0a0543766988da692bc3b7d5d2ddde: [[image_7896.png]]

641cdff77cbcbffa140a939b9c70a4f99e37341a: [[image_7897.png]]

828c65794139a49e28f228e15ae2ab93dc7131f6: [[image_7898.png]]

a6234b4912ca25087d3a66b45090be72a90fab9e: [[image_7899.png]]

3823f61413afb23639b1461935a42e2929fca81d: [[image_7900.png]]

5852754f584735b6ecc1d7beb287cf2999df3fef: [[image_7901.png]]

e25e43a27b66d62b51fab664536d449d81c07d46: [[image_7902.png]]

fd792d11056c72ec7d926b384f03e67b88a63c24: [[image_7903.png]]

b8d4c2252c673bf9a39d4375bb63a85970a9fe4c: [[image_8337.png]]

6b35c1bbe1bd65d6f14ff9ea6b26dd8457594d83: [[image_8352.png]]

f6ed07d4d3e71ff8f4ddc46739fad8a32803ef55: [[image_8084.png]]

5a1bcb854d192b2b8cb77eca08231daf91e80d81: [[image_8088.png]]

1f308790205ed8b469c0e5e73d5022add684dfb7: [[image_8394.png]]

ccb4b59327d57fa04e443976e5db8c3a80ed97a0: [[image_8395.png]]

a35260085b839dba0cedf78d6005c9ac06ed6cfe: [[image_8396.png]]

1d95d115b75c78702d432f6b3dc0d6ce24a407f2: [[image_8390.png]]

4a3feadffdf7b84e5bcd48ce29a6913248739485: [[image_8391.png]]

897fdc8f18c19844a37be260e66c7d4293e918cb: [[image_8392.png]]

5a4ef88bcf430d8cfe1647f05498b6a660eb702d: [[image_8393.png]]

38d4976b764ea66e18f09806053d584deff532d3: [[image_8430.png]]

e4fe7215b06ab881dc1c2bd3358ea3d9106bccbb: [[image_8433.png]]

c704b586034339cc92178eb2bb00a076ca622261: [[image_8477.png]]

b08466a28c9fde7067735b822ac4ab556918778e: [[image_8508.png]]

a32f6255bc5a69f782565b285344acccbd39ffbe: [[image_8509.png]]

80869f799ac3e55f600d1e16f9d2ce51d6f08421: [[image_8721.png]]

c85d3144b2e60284ea2cc4007a35c3208b8290d2: [[image_8820.png]]

bbcf29f9b242eba30d13482423faf8615eb9ccc3: [[image_8821.png]]

299fa889a81d369239507026eeb293e89582d872: [[image_8822.png]]

9f66ee9613c572e53414ba0c9b35e205742fa38b: [[image_8823.png]]

f548fa1f9ccc82fe1152e7d37798a4d9db501ed6: [[image_8824.png]]

8bf7ad4adfa732c3b5b1915dfd4ee4771e07ab05: [[image_8825.png]]

0df05831978e8129d2fedb03aeebde6105f13893: [[image_8826.png]]

d2c661302c1a107a9de9f5910d9cc0e1300b58d5: [[image_8650.png]]

08caaa926c59f675680bd83c7e242b2de50156d2: [[image_8652.png]]

8172b3aafabe8dc9c07054af19c744a091a2e96a: [[image_8653.png]]

60d662bc9d91ca2c535a2da4c851ea6e4b81f53e: [[image_8654.png]]

2a5f3d7dcbec27c57308b57d874c370fad79965b: [[image_8655.png]]

a211ec281d9f8eddb32f72a40a8bf5db695fd031: [[image_8656.png]]

0a09333e8f1d838106d2fa506e29b30acfec4aca: [[image_8657.png]]

8fe4b8bc35cbf17833d122317e2f662815289e6b: [[image_8658.png]]

3cb34f47c5cbaa95f3b7d79fedd56dcf5603dcdf: [[image_8908.png]]

117a3446578f6b2d0aceb0f6963fc9301120b49c: [[image_8909.png]]

ff1d16c1335583dbfdd5bd493e735e327ddaf76a: [[image_8910.png]]

fbb25e3e73b60ebd0284553cbcdd67483a895bd6: [[image_8911.png]]

2fe99613313c84b8650c391f0820da3a69eaf984: [[image_8912.png]]

0ddc4c51ec81c922d0c57403a35d80dfb28c11bf: [[image_8913.png]]

a7e28bc4dc36ca9a97b26e0070e686e934f4488d: [[image_8914.png]]

30fbb0bd5f06f5753f9e3ed7550e06174427f71f: [[image_8915.png]]

49c3846df324d0e229421e0d7bc500ee9045c1d4: [[image_9217.png]]

f374caa7640ef021416ae92a46dcd813eca60dba: [[image_9218.png]]

ea65b5b4d98aff4817ef8b617d88a42a4b06b985: [[image_9219.png]]

32f1976d30c273a9642626916d07942767893188: [[image_9220.png]]

c7a357385edb14e60a4cfeecd2142e34beef2532: [[image_9221.png]]

900560585be72fb76ba7e2ff5b012ccca11b62de: [[image_9222.png]]

9d5c89fd8ecd75345ea14f90d366fb5c888fe333: [[image_9223.png]]

a47af7133652e7afb38fe679bcb334450f729884: [[image_9224.png]]

1f3fb0af790b8717492688a5ef450e346d190e30: [[image_9225.png]]

602df430f44e35dcbaf4aa597cfda8dbd829da34: [[image_8992.png]]

d13944d1079ba4cbf61151a3a88e12213541b6c4: [[image_8993.png]]

66e13cbb3dda317e7b7cc58da8fc1cd0b5140534: [[image_8994.png]]

27011e195c843dd4735730bca478652e511b12d5: [[image_9338.png]]

73a17cbd4fc578fa9bcea2f9e97a4858079e9412: [[image_9339.png]]

8f6c5f7092e408a49fde02f4e36d6418bf8a6843: [[image_9340.png]]

4bd07d5372c0a4a9da65f9aa284967a2feacf7b9: [[image_9341.png]]

4d70c47c879596a1805367fee613ca73f3b58328: [[image_9342.png]]

fdf283796a022c4d9a47c412fe7d7a4c2813bef6: [[image_9343.png]]

a51a5585da5b001783fcba2048b9c1894cd23d65: [[image_9345.png]]

7db9104ace52303406b9db1d2c0ce27effa5e22b: [[image_9565.png]]

4385065168799243583edfcc20e4ed4098179ec2: [[image_9437.png]]

17143f4f2e73e4916960b006f090cdeef2bb8d73: [[image_9438.png]]

e2fbfdfd7f6abcfa4765007052b267bc4a1fa3c2: [[image_9513.png]]

acd66a88c65d83abae77d0342478335f6e2ec4e3: [[image_9514.png]]

99ed5fdf6be2685fe786286dc5a1c4d2889fd033: [[image_9515.png]]

77bf896f63e0a94ce59636af2975863d61755998: [[image_9516.png]]

98b0a47fd69511eb441b5803bc017d3cf5b6c41c: [[image_9518.png]]

8c2ad42f5103858029409bb34c54fd654969001c: [[image_9519.png]]

e3ccee9d0df883c5155a1e2da27e66f6169fdeb6: [[image_9520.png]]

b6cb15fbf72321900ac6c883c4474ee8b9a4c192: [[Pasted Image 20260220204516_336.png]]

cad98f66999130c2aba9d68664659c4c2d31b7e4: [[Pasted Image 20260220204519_638.png]]

8720c6e14571e19199bc2be707eada4269ce8a0c: [[Pasted Image 20260220204521_964.png]]

eafee3e1921630568f2bcecb9b24d72602589b21: [[Pasted Image 20260220204523_728.png]]

aff1a0b4a2700fde8de65d2af458424d545b0df2: [[Pasted Image 20260220204525_422.png]]

c6c159e0da88696f0b1979a350750678d931c6fa: [[Pasted Image 20260220204527_014.png]]

d1e2fca4ea124f2287d214380b2cb9f7b3c6ab34: [[Pasted Image 20260305011242_683.png]]

5575da661cc57963dd62b08746022d70713e1a30: [[images/newimages/image_9706.png]]

87a646872018a9b07ac061f9ff8a330ddf67a2fb: [[images/newimages/image_9707.png]]

%%
## Drawing
```compressed-json
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
```
%%