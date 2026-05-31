1 why i dont need value comparer for mutable owned entities
2![[Pasted Image 20260217050629_629.png]] how to create one
3 ![[Pasted Image 20260222232718_876.png]]
![[Pasted image 20260531051610.png]]
4 ne ponyal 
![[Pasted Image 20260319235830_111.png]]
need to think about nesting in polly like that 

whe nsomeything has multiple retries or hedge attempts
and we put something inside - we wrap each retry with one bulhead 
and all retries affect bulkhead
5 
1 if not default id - marks as unchanged 
2 if need to modify - attach then modify or mark modified excplicitly
3 if adding new entity with detached in some prop - need to attach that detached 
to avoid adding existing but detached 
4 when updating entity with detached - detached will be modified need to override savexchanges or 
config so model 
![[Pasted Image 20260322213137_040.png]]
![[Pasted Image 20260322213139_880.png]]
![[Pasted Image 20260322213034_413.png]]

