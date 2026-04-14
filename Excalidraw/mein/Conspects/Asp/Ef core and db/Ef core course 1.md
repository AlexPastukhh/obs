---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
Application services and controllers 

1 Have many dependencies but little complexity
2 Dont have buisness logic(dont make decisions 
based on domain rules)
3 Prepare everything for domain models 
and may ask domain models if they can execute 
based on those domain rules

public void WithdrawMoney(decimal amount)
{
    if (!_atm.CanDispenseMoney(amount))
        return ;
     _atm.DispenseMoney(amount)
}
public void DispenseMoney(decimal amount)
{
    if (!CanDispenseMoney(amount))
        throw new InvalidOperationException();

}

(3.1 from encr)
Their execution flow goes as follows:

1 Prepare all information needed for a
 business operation: load participating entities from 
the database and retrieve any 
required data from other external sources.

2Execute the operation. The 
operation consists of one or more 
business decisions made by the domain model. Those 
decisions result in either changing the model’s state, 
generating some artifacts (amountWithCommission
 value in the sample above), or both.

3Apply the results of the operation to the 
outside world. ^7RJMZEme

Domain model 



1 Observable behavior and impl details
- Dont expose impl details and things that client 
doesnt need

2 isolation and fullness
- Full isolation from external layers
 
3 preserving violation of invariants
- private setters
- hidden methods 
- validation inside value objects
 
4 aggregates are in scope with their entities and 
value objects
 ^HGAWmdRy

Domain Services
1 have dependecies that domain models cant have 
2 make decisions based on domain rules ^K4DO0kaB

Ef conre and ddd

1 Encapsulation and Separation of concerns

Encapsulation - model cant be in inconsistant state

1 hiding info
2 bundling data and operations together (providing a single entry point 
for some behavior, client doesnt need to communicate with many properties to 
get information and then call a method on that information)



 ^kFrlrqfL

Separation of concerns - is a sinle responsibility principle at architectural level


- Violation of soc is ok when one of concerns is not a big deal(validation in 
dto(data container + validation))















Encapsulation should be applied to all your code
- Public api
- Bundling data and operations 

Probably dont need parameterless ctor(it needed when constructor accepts nav props)
ef core matches params in ctor with prop names

1 private setters and readonly fields by deafault in domain models
2 In value objects no setters cause they are immutable 

3 Start as few modification apis as possible




Always try to reduce number of relationships in your domain model


Domain layer - persistance ignorant(only domain,not applic and others)

Use navigation properties instead of ids, domain model should be aware
only of its own id

Build domain model as close as possible to what you'd built 
in a scenario where there is no need to persist models data 



















Antipattern of partitial loading, use eager or better lazy loading and only in writes
Eager Loading - 
Always load entity with all its relationships from db (using include)






























                                                        N+1 is when you need to do many call to db




















Identity map pattern - entities stores in a local cache
 after retrieving from db(within transaction)





























Where 2L is an id of long(either ef throw an exception)
linq extension methods populate local cache 
but dont retrieve the data

"Use linq extension methods only when you need to retrieve more than one entity"
- ??
Find let to use identity map pattern, use find if want one entity from db
(maybe need to check performance of find quering to db)


Can have ids of T if you have id of different types, no need to overcomplicate things prematurally


Client code should use == operator and domain shtuka will make a decision on how it should
be compared





































Can do above to avoid complainings about unused ctor























ToList() ensures that collection will remain unchanged even if client cast IReadOnlyList 
to List

Modeling Api good practise: return most specific type while maintain all invariants
IReadOnlyList  and IEnumerable maintain invariants but IReadOnlyList  provides more fun-
ctionality to the client code(for instance it has count prop)


Try to use ubiqutious (buisness) language,especially  in domain, 
for example EnrollIn not AddEnrollment

























Ef core can bind backing field of enrollments automatically
But this is how it can be done:































In one to many relationships one side is almost always responsible for creating and 
deleting many side, Student here is aggregate root and enrollment is internal to aggregate
entity
To add or remove from such collection you should use special methods EnrollIn, UnEnroll





















DbSet also wasnt added for non aggreate entity:























There is  a problem in ef 3 (dont know about later versions) that 
you need explicitly load backing fields(in enhibermate no such issue)

























Above showed how in this implementation ef core loades data only on get, when nhibernate
do this on method calling the collection


There are two approaches :
1 use include, but it is bad with Identity map pattern because if entity in cash
you  will still make anther call to db
2 use find and explicitly load collection, but it will make two calls at first

Vladimir recommend 2 approach cause those calls are east to understand and debug



























Generally when working with ef core you dont need repositoriess but in such cases
of additional complexity of retrieving data from db or saving it you can create one 
(no repositories,
he said no repositories...)





And dont do read from navigation prop and write to backing field



















The only reason why we do such segregation is because of persistance logic and this is 
kinda violation of separation of concerns 
Do this lastly with lack of options 

Still need the unit of work, so dbcontext posidit





































At Deletion of element from colletion of related entities, ef core by default sets key 
of principal(one end(student)) to null, but enrollments in this case and often many end
entities dont make sense without aggregate and (? students id in enrollment table? is not
nullable(so it is by default not null i guess))














Now we tell ef core to delete enrollment from the database when it is deleted from 
enrollments collection






















TYPE RESTRICTIONS ON MAPPING OF BACKING FIELDS

Nav prop and bf should be of the same type 
























































Tells that it works with simple properties like email(my case) but not with complex like 
references to other domain classes(maybe it will work with primitive types)




REMEMBER THAT IN ADD AND DELETE SCENARIOS STUDENT as aggregate root is
responsible to delete and add, 













































Here we got enumeration pattern that let us to avoid additional calls to db when there
are static count of courses, that doesnt changes a lot















Her





But if we registering a student an adding some entities that were not get from db
- ef core doesnt track those entities and they are in Added state, like new entities,
but all courses already in db and ef core throws an exception







































Can use Attach method instead of add, attach() will check ids of objects, and 
if id has default value, then object(entity) will be marked as added, 
if it has some value, then it will be marked as unchanged















And we not inserting id manually, ef core does this 















ADD:














Attach:










Update:










Update method updates unchanged entities in db, it lead to unnessecary calls to db


























































You shouldnt modify objects outside of dbcontext they originated from, get info from dto
validate and parse it, and then get object from db and then modify

Cached objects like course is exception, you should never modify such objects

















 And the only use of Update method is when you modify objects outside of db context they 
were retrieved from,this is antipattern. Exception may be some long-running background process

Can use repository to hide implementation of changing entitys data in db 



























Named just Save,not after existing methods names,to avoid confusion



EDITING ATTACHED ENTITY WITH DETACHED ENTITY

When assigning detached entity to attached ef core marks detached entity as modifies

















Can manually mark entity as unchanged into controller but it leads to violation of separation of 
concerns,



can do :
1 mark detached entitys props as unchanged by default









If there was more props, should mark them all
But entity will be marked as modified still, even if ef core doesnt do anything
2 Override savechangesAsync and mark Course to be unchanged before every transation commit












































MAPPING VALUE OBJECTS
Value objects are immutable, so you check for their validity only in creation, their state cant
be changed
It make sense to wove as much buisness logic to value objects as possible


































CONVERSION




















SOME PROBLEMS:

If Email value object is null in db, ef core wont call create factory method and just return null
It leads to impossibility to wrap with Option monad a nullable thing

MAIN PROBLEM:
If email in db is nullable, then property Email (vo) should be nullable, and we want to wrap it 
with Maybe<>(Option<>) bu Maybe<> is struct, if we set email to be nullable in db, then 
we get an exception of receiving unexpected null from db 

MAYBE it was changed, here this and another possible changes:







































Need to use virtual keyword








In 3 version, ef treats owned entities as regular entities, and adds a shadow
id of owner property

Value objects make sense only to keep in the same table with the owner
There is another problems with this:















Can add copy() method to assign value of onw owned entity to another





Possible alternative impl:




















Adding nav property of suffix to name(suffix is enumeration entity)
Below wont work cause ef core tries to map suffix id to shadow prop Name_SuffixId
But it doesnt exist














You need to declare shadow nullable prop(cause suffix is mandatory) and assign it to 
column name of NameSuffixId  and then specify foreignKey 







And because Suffix is enumeration type, it is detached when you use it 
for student name creation, for that, you need to do the same, what was done
with course, but when there are more than one enumerations, its easier to 
override SaveChanges() method than mark every property in all enumerations
as unchangable 

You can create statuc collection of enumeration types in db context class and 
in loop mark all those types as unchanged in SaveChanges()















































































Creating interface which goal is just to flag domain event






















Should define collection of Domain events inside aggreagate root base or entity base class
aggregate root can be usefull when it is not obvious what entity is the aggregate, but usually
it is

Also add method to raise events inside aggregate class, and method to delete them:


















d












 ^GBJIMCTA


 ^r6UEre7b

Creating interface which goal is just to flag domain event
Events can contain immutable types, events themselves are immutable ^XdERr8LF

Implementation with message bus: ^GooIFt3R

Dispatch can be needed also to log some events ^3dkj7sII

Use overriden savechanges() to get all entities that tracked by context and 
dispatch their events, and then clear internal collections ^bBlYcc9P

With handlers:
 ^fHLyNEQ9

There is a static class that gets all handlers in the assembly and apply handle method
to each domain event  ^afi3s2JH

There is also an event listener that dispathes events after commiting changes to db ^Wy6WXJTj

Many to many relationships can be presented as intermediate table with keys of both entities
and with its own primary key, to simplify work with this table ^pu07iLkz

If intermediate table has additional information, it make sense to treat it as another internal
to aggregate entity  ^dFSAOwjW

Exception: if another entity contains a lot of information  ^nh0RePbD

FORGO LAZY LOADING FOR SOME SCENARIOS ^MaTINmxs

fIXED: 
1 NOW CAN USE COMPLEX PROPERTY FOR VO AND NO NEED FOR COMPLEX SQL AND 
COPY() METHOD TO COPY  ^0eKINHAm

Can use either attributes or onmodelcreting config ^WcdTto22

FIXED-> ^VeEbcNqI

FIXED-> ^8kJmgfCe

Whar ro do? ^srqw5mu0

4 Encapsulation and separation of concerns
    1 Hide collections inside domain models with IReadonlyList and behind backing fields ^wTG3xXSD

It will work fine with: ^rf0MOH5C

But you can excplicitly: ^vz1Dl0ZP

But you cant use lazy loading, because ef lazy loads on get of property, not on access
to backing field, so you need to excplititly load collections with backing fields(as usual)
In such cases of some persist-layer-logic you can use repositories ^zWNg9XN5

1 use private setters and readonly fields in domain models by default
use no setters in value objects

2 dont do partitial loading


do either lazy loading or eager loading(when you cant do lazy or when performance 
significant and increases significantly)

There can be n+1 problem with lazy loading and with eager loading you may dont need
all information to load, but these problems occurs only in reads not in writes

In reads there is no possibility of data inconsistency so it is not ddd zone
you can use sql or dapper ^gC1bhlxf

3 Use Identity map pattern

Use Find() method to check cash before doing calls to db

 ^8XGmlO8c

5 use Enumeration pattern 

If you have some enum-like entities in db, you can get them one time and save in cache ^T9bw1Y7U

Remember that in one-to-many relationships one end responsible for adding and deletiong 
many end, you need to make unidirectional relationships to avoid violation of invariants ^ZxvcTMz1

When you will use these cached entities to ADD NEW ENTITIES, they will be 
marked as detached and then as added and you will get an exception like you 
are trying to insertexisting entity,so   ^ZhM4FXi3

Use Attach() instead of Add() and Update() ^CuyS1mi0

Dont modify entities out of dbcontext they were originated from
it is an antipattern, so enumerators you should not modify ^g9csZcIf

Such scenarios are another reason to hide some pers-layer logic inside repository ^3yaXlPzJ

When you will try to assign detached entity to one that being tracked, you will get detached 
entity marked as modified and there will be a sql query(additional call to db) ^oTfXPlZ1

  Use complex properties to map value objects with more than one field ^fqyyVLVe

At Deletion of element from colletion of related entities, ef core by default sets key ^pqXQMMzP

of principal(one end(student)) to null, but enrollments in this case and often many end ^jbbG5Hrw

entities dont make sense without aggregate and (? students id in enrollment table? is not ^5L7jY1Be

nullable(so it is by default not null i guess)) ^Vtcnv4KE

Can use either attributes or onmodelcreting config ^oWufdnye

6 Map Value objects ^oYz0hWDq

Use property to map single field value object ^8uSxBjCp

With owned property you needed to declare shadow property in
order to add nav property to value object, ^VBgarDtn

7 In ont to one make sense to merge into entity and value object ^nJSg6H5B

8 In many to many no need of intermediate tables ^qJd7Am7c

Complex types cant be nullable, so need to use owned types until ef 10
Owned types cant be reused by entities so no Money shared value object ^vLusMuy8

## Embedded Files
5560ca46ea087992b1c9e97678f25c569a82182d: [[image.png]]

1a01e7c323a7a0d9047608eba35843a877847e2a: [[image_0.png]]

000311b4198ab1f09ecbed400983062c4c3972a1: [[image_1.png]]

51efac4814a8b49a410ce225ac9333312eb3e7a2: [[image_2.png]]

6d0de840b21b24f23a515fada51e49fc14ccfd09: [[image_3.png]]

8717b98d108b090ffbd71b2c43fb7b4b806b45a6: [[image_5.png]]

1bf28f50dfcfd7ddc1057260f81073dabb3c2964: [[image_6.png]]

2448da00bc6b3e432c0c43e5e508f6a11f71494a: [[image_7.png]]

d4026b7bd84260e18352f80e8d9a16b5a1f6ca2f: [[image_8.png]]

8802ea7684521d6c0b1b83333dead2827c932f8f: [[image_4.png]]

3c577ff2a01456056b942882005c192856ca6e86: [[image_9.png]]

6577312308c026f6251cce8170aa6d336d6f969d: [[image_10.png]]

7082d27a92dcf0b65b9a503d439778ea21f428f8: [[image_11.png]]

6224d5db42c27ece4181599c75beefefcdda3d24: [[image_12.png]]

56748e317079c60a32baaa294d573f8fe6fce3bd: [[image_13.png]]

5de83b7a55c713344771e19de2418c6978800007: [[image_15.png]]

8b0f14a968732c161bfafc7f5bc7390ff4eacc4e: [[image_17.png]]

2088175148a9f65354bfbd6cfdc8d425679e78b0: [[image_18.png]]

78a3a39620085aa2a130ba6e45bb52bdcb45f3f9: [[image_19.png]]

ae35ec55b9c9688550f929fb6009af7f80dea19d: [[image_20.png]]

4c81294dcdced2d8ca4f2635228332f3748e10d4: [[image_21.png]]

56f3b95a8815a33ca2a3af79c496414af9cb3dbb: [[image_22.png]]

32b9b1bfb07bcd881dfc435c43d8320068e16f3f: [[image_23.png]]

c0f396dd1ec3649e1341ac0623eae405d4dc8bdf: [[image_24.png]]

e4a56c77eedbcd62fd701c22992bca0f18cfb988: [[image_25.png]]

52c8f0ac0599551f8ba88b42c89165b4ea1532fe: [[image_26.png]]

95627b33e5e882ed49bdf35641f46b3c8bfc46ce: [[image_27.png]]

954c89367ff7fe74ff34002bbc0651ad26af7dcd: [[image_28.png]]

2f498f8510905c4c2a570f4301d214d35886772b: [[image_29.png]]

b09324785f2cdd40a8bf2a111cb38841574a3dca: [[image_30.png]]

655efe866561e84590b739bd43cab5b3a9e20e7b: [[image_31.png]]

dfc2cc32b67851b773e19f52b285ea9efafbe91e: [[image_32.png]]

c6579b04f6cd260ff259341f745a311bcd814351: [[image_33.png]]

3d7891931d89d0856fc79d0f7bdb8915954462d2: [[image_34.png]]

1fd842702ec6de08d09d55fc298e3bccf765d7cc: [[image_35.png]]

a5b33e17958498d71b0490ff35e5dfc6b2721c83: [[image_36.png]]

d1aa6ca1acaa22c4e96ee1fdcd4b5f151cc68d4a: [[image_37.png]]

23d0102f84f4123a5eae586b6f5f8edb1c119633: [[image_38.png]]

3d28088707b5b5576bccdd84451ba9b7825d206b: [[image_39.png]]

c71be910059cde90420dce7f6ab588c0e04859d4: [[image_40.png]]

f26bea4e7516e33fea8f9c3bd6d3de5b8d9a4099: [[image_41.png]]

08423529086295fcaec815774eb26f35c4b6bc58: [[image_42.png]]

c477c0f1676fa91e93281df231ff2b1f115424af: [[image_43.png]]

b28b0a857bc1bf12237b9f1ec4174ee451cc0ffa: [[image_44.png]]

88ee740b8a8989578f5d282fa9663b0d6fdfa0b5: [[image_45.png]]

024d5a78005b0f3d1722295afc265d7bc9d6d978: [[image_46.png]]

c268336801689a53267e51c2a0f1bcc44cf9d7db: [[image_47.png]]

46afa80304bd739f677af8fc2f54009ceb683f20: [[image_48.png]]

f4116f347151547fc0e9b1dfa85be0112bf352c5: [[image_49.png]]

f0e301ded83cb2ba9b2633a6c746fe55037ca0bd: [[image_50.png]]

b286a29e3ab926946a374e0aa63ff42cc9d8fd1b: [[image_51.png]]

53c32aa6f82cc21dd1c0118b37cc2b255ddfc25f: [[image_52.png]]

944e85ba0da99f371295486632bdf6d3558a5131: [[image_53.png]]

31f548cfafc885c3a8681053ddc68648c4acbfae: [[image_54.png]]

f2b020ad316353c3bb50f56d25fd1a8fe5e88810: [[image_55.png]]

17157a9505072d1884f266cd85e0388986d51325: [[image_56.png]]

0f5f2c8ea3d3e08d078b89e1dedba760f4f901d6: [[image_57.png]]

891262a09aec05bb7d71e07cf5a1371246967741: [[image_58.png]]

dd306f2c7ffc674d8367d0b8806200df7037af45: [[image_59.png]]

04a41ecde67e8f3745869488d49b6c09656be5f6: [[image_60.png]]

bde826d717a455c066dd5dfaf32f5a70724ff698: [[image_61.png]]

cbd4184d43944c3daebb211e230a91efdcfb8ef1: [[image_62.png]]

0940df43ce553fc4f8d11c8bbe50414eb13b9c28: [[image_63.png]]

28cd2f0001f214d929579b077971d557be12d4e1: [[image_64.png]]

9b728e0f46c9fdcb5d0e2d6ec4b88c5bebaab2c1: [[image_65.png]]

5b9f28c39b76ec7776ef490b000b797b1dd0a9ed: [[image_66.png]]

3ac0872801f63f5a6ebf2d76b410487d4780960d: [[image_67.png]]

8fbd70d90e9112a3ec40176202c1346d55039239: [[image_68.png]]

e85ae46f2cf0845791d887ac9b7ac21eda08987b: [[image_69.png]]

68eb1447bc15fbb680a70374a999e820fec9ba10: [[image_70.png]]

a0e3fea3787721eb5e0f63974d540b68d3393e67: [[image_71.png]]

eb97d2d03c7ffe09dd3a4220abd9f0c75b65733e: [[image_72.png]]

f0fad30db964098f98f90379b7912d888af4612a: [[image_74.png]]

18ad91544fc87e788d4d577a86fcc23e47250fe5: [[image_76.png]]

c402a0cccdd5d2cbc38137f9c7c830f95c0f1c0d: [[image_77.png]]

989408922aefa45b953882a69457740d0381a4f0: [[image_78.png]]

df934f108a7d1b8eb0ee6282aed2514fd6f21996: [[image_79.png]]

7aa3c3e7c1fa5394545ccb5891bb143710343d70: [[image_80.png]]

6e369b9789b3d5ef8cf3d6bf9f138214dca04f64: [[image_81.png]]

00c7ac2c4de84ca97bed1b86561aba282fd69167: [[image_82.png]]

b2459da0db07ed8455edc12a880146cba0b97de4: [[image_83.png]]

d90726231b010db5632e10628499d42a2e29e2ed: [[image_84.png]]

97b2d5a4b133f4b65adeb8587c8f646323377bf2: [[image_85.png]]

9624dc1d13f05255fd44f646ce25d1babba19fd2: [[image_86.png]]

738f290770fe0382fa183536e231363417a5dea9: [[image_87.png]]

f8967a321f0dc5c558fc1ba31fde9d1bf9f187ff: [[image_88.png]]

dc68cba4a037e39cc144dd29830eb96a5783472d: [[image_89.png]]

9200dbaa8dacf28305f1810fd9562a03c0c45cee: [[image_90.png]]

9b5d61bc3486612d2a554f59cb27389f82525033: [[image_91.png]]

9ed90caf5a5428e667fe0e7ead9b1c4bad9c64b2: [[image_92.png]]

ff681d10b9695187cd121ca6b9111c84f7b2472e: [[image_93.png]]

bc18e19808bf32794da8639f465d2bb3d4f9b97a: [[image_94.png]]

920a2f5287bbbf1df41e63e81d8b08c228717a09: [[image_95.png]]

f1d0ecc7ca78bf64406143080353e830bbedde57: [[image_96.png]]

bcc17faee3d6711c265c115644b501d8f78174fc: [[image_97.png]]

0e32828522aac7978f617d298c8514fe74e8a6a2: [[image_98.png]]

4db994cb0167212fa74ae209030c4f33cca0e9a8: [[image_99.png]]

0cfb40367c9e162c43cc134141bf2cba3571eae4: [[image_100.png]]

842fb703256fc118f0f2b428159e3239fae6ab55: [[image_101.png]]

ac0569a729ebff37ab1bba12f900e0460ca87371: [[image_102.png]]

3abd272399d605b136b8226b98d9687522bd81ae: [[image_103.png]]

4e684189d476b6994af494f9adcceb88a2504169: [[Pasted Image 20260317041422_441.png]]

77f6dafe18766f2f576353676b5edc01dcf92241: [[Pasted Image 20260317041425_037.png]]

889f13a78cc5ce87b5063ecb90b99ccdc97a727f: [[Pasted Image 20260317041431_534.png]]

5a8e00976624cf3c059ebedd2b8cf866acc121f8: [[Pasted Image 20260317041435_907.png]]

%%
## Drawing
```compressed-json
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
```
%%