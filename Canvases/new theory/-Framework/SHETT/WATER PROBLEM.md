---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
==TEST CASE==
1 2 2 4 5 3 2 1
==============
GATHERING INFO
==============


IDEAS,FAMILIAR PATTERNS,HINTS:
=
=(
what state you can have at any snapshot
what is the turning point/the point at which you want to 
be or what you can even check and what it can mean for your goals

can you simplify input
can you prearrage some state before you start processing input?
can you simplify your problems, split into multiple of familiar problems)

:

=(CHECK)

METRICS/INVARIANTS 
=
1 2 2 4 5 3 2 1
==(can add related rules here like you added check yourself to the end)



=(CHECK YOUSELF)
!!@@ need to create some state that represent/handles all of it 
and choose a way of processing input@@!!
______________________________________________________________________________

VARIANTS OF PROCESSING SEQUENCE,INPUT + THE WAY TO PROCESS 1 STEP:
=
1 2 2 4 5 3 2 1 
=(!!@@variant that describes the whole test case, for another case we can copy paste another framework@@!!)

processing from both ends with all counts calculated because we need max length and after we find it we can short circuit 
without porocessing unnecessary shit 

HOWSTEPCANLOOK:
=



//// i can preallocate dictionary also 
=(CHECK YOUSELF)

STATE:
=
1 2 2 4 5 3 2 1 
==(can add related rules here like you added check yourself to the end)

count of even 2 
count of odd 3 
and some counts of those distincts in a form of dictionary digit/count 

=(CHECK YOUSELF)

POSSIBLE ACTIONS 
==
1 2 2 4 5 3 2 1     2even 3 odd 
1 2 2 4 5 3 2       same -1 len
2 2 4 5 3 2       2even 2 odd -1 len
=(CHECK YOUSELF)
==ANOTHER CASES ==
=(
    if you have rule, imagine cases when it is wrong,or what outcome do you need from your rule?
    when you dont need to process a step? when you do need to porocess a step? 
    can you simplify the problem? remove all variants of steps that dont actually mean to iterate over possible variants that make sense(example with water problem where toiterate over variants that make sense mean to change only the min value from 2 values on ends))

1 5 5 5 5 2 2 4 5 5 7 9 3 5  2eve 4odd
==v12==
5 5 5 5 2 2 4 5 5 7 9 3 5 what if equal
//... (can cont later) can remove dots when cont
// =(CHECK YOUSELF)
5 5 5 5 2 2 4 5 5 7 9 3   if equal then remove the one after which we have the one that leads to removal or if eq again then choose the least length decrease 
5 5 5 5 2 2 4 5 5 7 9 same count len -3 
=(CHECK YOUSELF)
 ==WHAT ALG ACTUALLY NEEDED HERE
==(can add related rules here like you added check yourself to the end) 

1 5 5 5 5 2 2 4 5 5 7 9 3 5
1 5 5 5 5 2 2 4 5 5 7 9 3  same count 
1 5 5 5 5 2 2 4 5 5 7 9 odd 3 
1 5 5 5 5 2 2 4 5 5 7 same count len - 3 
SO THE SAME OUTCOME

=(CHECK YOUSELF)

TYPES OF ACTIONS AND RULES 
==
==(can add related rules here like you added check yourself to the end) 

start ++
end --
v1 if the num is the one that count is bigger 
v12 and it leads to decreasing of the count  
v123 and if equal then remove the one after which we have the one that leads to removal or if eq again then choose the least length decrease 
and if both from number that is lower - remove the one that doesnt lead to removal or 
if both lead or dont lead then check next and make fuching decision
=(CHECK YOUSELF)


WHAT FEELS INTUITIVE/BENEFITIAL
=
=(can add related rules here like you added check yourself to the end)

to remove odds so we can have same count of odds and evens as fast as possible 
because we have metric - max subarray length
=(CHECK YOUSELF) ^FTPDKXLJ

## Embedded Files
be15443bea66e4a72868d2e41ead7cdd999c3d8a: [[image_8661.png]]

1c5d76171a88703b31b7a188efd87b89a7d05707: [[Pasted Image 20260216193432_776.png]]

4ff3a7dec3b6d0caa28455787055743dae8d2ad9: [[Pasted Image 20260216193435_507.png]]

%%
## Drawing
```compressed-json
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
```
%%