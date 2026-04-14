/*
==============


need to treat every micro prob suitable for framework
=
need to write ations like functions
=
need  to do best effort,without headbreaking 
==============
check yourself,didnt you forget edgecase?invariant?cleanup?some loop assertion?
=
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
(NEED : to take some test input and create some needed output, write invatians
make sure that you have understood them

1 ASK WHAT DO YOU NEED TO CHANGE, WHAT YOU SHOULDNT CHANGE,
IF YOU HAVE BUILT ACT ALG - ASK WHAT IT CHANGED, WHAT IT SHOULD CHANGE.
WHAT IT UNCHANGED, BUT DO YOU REALLY NEED THIS UNCHANGED?
2 ITERATE OVER EACH INPUT AND OUTPUT VALUE AND ASK WHY IS IT HERE?
SHOULD IT BE LIKE THIS?
3 TRY TO EXPLAIN INVARIANTS TO SOMEONE ELSE IN YOUR HEAD
THEN: need to create some state that represent/handles all of it 
and choose a way of processing input)





=(CHECK YOUSELF)

______________________________________________________________________________

VARIANTS OF PROCESSING SEQUENCE,INPUT + THE WAY TO PROCESS 1 STEP:
=
1 2 2 4 5 3 2 1 
=(!!@@variant that describes the whole test case, for another case we can copy paste another framework@@!!)



=(CHECK YOUSELF)
HOWSTEPCANLOOK:
=



=(CHECK YOUSELF)

STATE:
=
(need to create some state that represent/handles all of INVARIANTS AND METRICS)
1 2 2 4 5 3 2 1 
(can add related rules here like you added check yourself to the end)



=(CHECK YOUSELF)

POSSIBLE ACTIONS 
==
CASES
=



=(CHECK YOUSELF)

ANOTHER CASES 
=(
    1 if you have rule, imagine cases when it is wrong,or what outcome do you need from your 
    rule?
    2 when you dont need to process a step? when you do need to porocess a step? 
    3 can you simplify the problem? remove all variants of steps that dont actually mean to iterate over possible variants that make sense(example with water problem where toiterate over variants that make sense mean to change only the min value from 2 values on ends)
    4 when you can stop processing?
    5 check cases with min values)



(CHECK YOUSELF)

WHAT ALG ACTUALLY NEEDED HERE 
 ==
(can add related rules here like you added check yourself to the end) 



=(CHECK YOUSELF)

TYPES OF ACTIONS AND RULES 
==
(  
1
	when introducing some approach need to justify it,
	what it does?
	how it changes state?
	what is the state if you will do all steps but without current approach?
	maybe you already have everything for your steps?
2
	if you have some problem, mb you need to ask yourself what causes it?
	maybe it is one of your previous steps that is unneccesary?

	so need to get rid of unsuccessful steps before 
	trying something else

3
	when you are in limbo you need to assert that you are 
	leaving this state at some point eventuallly 
	(ASSERT LOOPS AND IN PLACE THINGS WITH TEMP)
) 

V1:

=(CHECK YOUSELF)
NEED TO TEST EVERY FUCHING RULE, EVERY, AND WHEN YOU GOT SOME RULE, YOU NNNEEED
TO IMAGINE SITUATION WHEN IT IS ACTUALLY BETTER TO DO THE OPPOSITE OF WHAT THE RULE
SAYS,
YOU NEED TO DO THIS
![[Pasted image 20260214190951.png]]


WHAT FEELS INTUITIVE/BENEFITIAL
=
=(can add related rules here like you added check yourself to the end)



=(CHECK YOUSELF)




*