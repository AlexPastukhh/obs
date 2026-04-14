##### Dependencies:
![[Pasted image 20241004042010.png]]

**Unit test :**
- Verifies a single unit of behavior or an interface contract
- Does it quickly
- And does it in isolation from other tests
**Integration test :**
does the opposite but mocks third-party-services
![[Pasted image 20241003231800.png]]
**Classicists**
- mocks only shared among tests dependecies and out-of-process third-party services
**Mockists:**
- mocks everything
![[Pasted image 20241004041634.png]]

**AAA**
- Can create base class for entities to compare returned object to expected one
- avoid repeating a's (in integration test there could be cases where you connectiong multiple tests in one to do more quickly, especially if arranges flows to one from another)
- no if statements in tests
- teardown fase can be in private method (maybe constructed into integration test base class)
integration test base class with db and dispose method in 3 chapter 
- can remove comments with aaa if there are no spaces inside those sections'
- Can start from assertions if doing tdd
**Naming**:
- Describe a unit of behaviour, a fact that is true (without should be , without unneccessary words) from the side of the client  ==The only exception to this guideline is when you work on utility code. Such code doesn’t contain business logic—its behavior doesn’t go much beyond simple auxiliary functionality and thus doesn’t mean anything to business people==
public void User_passing_an_existing_name_cant_register
without returns badrequest or smth that describes implementation
- Even if test class named after some class which method being executed, this class is just an entrypoint to some behaviour
- SUT should be named as *sut*
- dont include sut name into test name 

**Reusing test fixtures between tests**
- Create private methods for repeating or volatile test setups(==if setup is needed for multiple test classes then you can create object mother ==)
- High coupling between tests is an anti-pattern
- Constuctors for setup diminishes test readability

**Parameterized tests**
- keep positive and negative cases in one test only if it self-evident for what case what inputs stands, if not , extract positive behaviour into seperate test 
- if behaviour is too complicated - dont use parameters
- Use [MemberData] to create input parameters with datetimenow
![[Pasted image 20241003233434.png]]
or it wont work
**Use Fluent Assertions**


### **The four pillars of a good unit test


**What are good Tests:**
- Find bugs
- High resistance to refactoring
- working fast
- Easy to maintain

**The more code being executed in test, more chance that test will find bug

**Refactoring means changing implementation not the functionallity
- You should test interface behaviour, not implementation
- tests must perceive sut like black-box 
**Resistance to refactoring is a low count of *False positive* results
- It is not such important at the beginning of the project as when the codebase grows
**Protection against regressions and resistance to refactoring contribute to test accuracy

**Maintainablitity means:
![[Pasted image 20241004211024.png]]


- **You can always max maintanability and resistance to refactoring 
- **But you should choose between *Fast feedback* and *Ability to find bugs* 
![[Pasted image 20241004004019.png]]
![[Pasted image 20241004004110.png]]
**Exploring well-known test automation concepts**:


![[Pasted image 20241004004509.png]]
- End-to-End tests should be passed in areas where you definitely dont want to see any bug and after all other tests

Exception :
- If your application is simple CRUD and no complex logic - your pyramid is a rectangle without endtoend and with same count of integration and unit tests(because unit tests are more valuable testing complex logic but integration tests is still important)
- If application is an API without user interface and with one external dependency (db) you can do more endtoend tests and they will be fast
- **End to end differ from integration with entry point - they need application to be hosted somewhere imitating environment in which users actually can access your application via network 
- **Integration tests mosty run on local or isolated environment

NEPONELNOOK :
![[Pasted image 20241004010958.png]]
Maybe about excersising all possible branches of code


### **Mocks and test fragility
This chapter covers 
- Differentiating mocks from stubs 
- Defining observable behavior and implementation details 
- Understanding the relationship between mocks and test fragility 
- Using mocks without compromising resistance to refactoring


##### Mocks and Stubs
- Mock is a test double used in outcome interactions with sut, which are the part of ending result of interface method
- Stub is a test double used in income interactions with sut which are some settings of nessecary data and part of implementation
###### Never Assert stubs

SOME shisics
![[Pasted image 20241004015857.png]]
#### Observable behavior vs. implementation details
Ideally, the system’s public API surface should coincide with its observable behavior, and all its implementation details should be hidden from the eyes of the clients. Such a system has a well-designed API (
![[Pasted image 20241004022051.png]]
![[Pasted image 20241004022122.png]]
Here observable behavior is interface in my previous terms 
Implementation should be private and only for-user-methods are visible

- User should achieve his goal with one method call, or there is a leak of implementation details
- 
##### Encapsulation - prevent invariants violation(invariant is smth that should be true all the time)
To achieve encapsulaton:
- Bundle data with functions that operates with this data
- Hide implementation detailes from user providing only those methods that he needs


*You cannot trust yourself to do the right thing all the time—so, eliminate the very possibility of doing the wrong thing*

#### The relationship between mocks and test fragility
##### Hexagonal architecture
![[Pasted image 20241004031153.png]]
##### Goals of hexagonal arch:
- **To** separate concerns of application layer and domain layer, Where domain contains buisness logic(the-how's) and application layer manage request from client (the-what's)
	- **Domain layer** is responsible only for buisness logic(the-how's)
	- **Application services responsibility**   to adapt the domain layer by translating the incoming requests into operations on domain classes and then persisting the results or returning them back to the caller.(+is communicating with external applications and retrieving data from the database)The application services shouldn’t contain any business logic.
- **To** separeate concerns you should isolate domain layer so he cant maintain different services as application layer does. Domain class only depends on other domain classes
- **To** manage External applications calls through application layer, no one has access to domain directly

*Each layer of your application exhibits observable behavior and contains its own set of implementation details*
#### Intra-system vs. inter-system communications

![[Pasted image 20241004034732.png]] 
NOTE Intra-system communications are implementation details; inter-system communications are not.


**Inter-system communications should be mocked and examined in tests because they are the part of  interface funtionality**
Remember that refactoring doesnt change functionality so if external calls included into method, they will be always remaining after refactoring

![[Pasted image 20241004041548.png]]


![[Pasted image 20241004042213.png]]
![[Pasted image 20241004042347.png]]
- Not all shared dependencies must be mocked - if shared dependency not out of process you can initialise it befort every test
- Not all out of process dependencies should be mocked - only when they are the part of visible behavior(interface contract)
![[Pasted image 20241004043017.png]]

(But you can use stubs to get data you need for test,just dont verify calls)
(no you cant, you need test db only in integration tests,thus you need to use real db)

## Styles of unit testing

**This chapter covers**  
- Comparing styles of unit testing  
- The relationship between functional and hexagonal architectures  
- Transitioning to output-based testing

![[Pasted image 20241004223723.png]]
   ![[Pasted image 20241004223752.png]]
   ![[Pasted image 20241004223850.png]]
   ![[Pasted image 20241004223943.png]]


## Refactoring toward valuable unit tests

**This chapter covers**  
- Recognizing the four types of code  
- Understanding the Humble Object pattern  
- Writing valuable tests



![[Pasted image 20241004224113.png]]
Chapter 4 covered the topic of recognizing a valuable test using the four attributes: protection against regressions, resistance to refactoring, fast feedback, and maintainability. And chapter 5 expanded on the most important one of the four: resistance to refactoring

![[Pasted image 20241004231909.png]]
![[Pasted image 20241004231928.png]]
![[Pasted image 20241004231802.png]]
![[Pasted image 20241004231830.png]]

![[Pasted image 20241004231138.png]]


You need :
- Keep code either complex or with many dependencies
- In controller or in any layer you should have a button to do some stuff without diving into implementation details or at least a couple of buttons
- All tools should be encapsulated so client cant press button to break everything or dont press button and break everything
![[Pasted image 20241005021607.png]]
domain events later 



![[Pasted image 20241005021933.png]]
![[Pasted image 20241005022016.png]]
(can write precondition for more readability)
![[Pasted image 20241005022249.png]]


# Integration testing

## Why integration testing?

This chapter covers 
- Understanding the role of integration testing  
- Diving deeper into the Test Pyramid concept  
- Writing valuable integration tests

![[Pasted image 20241005022808.png]]
![[Pasted image 20241005023049.png]]
![[Pasted image 20241005023246.png]]
![[Pasted image 20241005023218.png]]

You dont need to do integration tests of edge cases that immediatedly become noticable,maybe on first run 
![[Pasted image 20241005025828.png]]

![[Pasted image 20241005024154.png]]

##### Which out-of-process dependencies to test directly


![[Pasted image 20241005024311.png]]
![[Pasted image 20241005024324.png]]

![[Pasted image 20241005024431.png]]

Dont do shared database, A better way to do the integration is via an API (for synchronous communications) or a message bus (for asynchronous communications).

But if some tables from your database already accessible for another application, you need to treat those tables as unmanages dependencie and use mocks 
![[Pasted image 20241005024952.png]]
What if you can’t use a real database in integration tests?

![[Pasted image 20241005025321.png]]

![[Pasted image 20241005025434.png]]

![[Pasted image 20241005025521.png]]
![[Pasted image 20241005025536.png]]

END TO END 
![[Pasted image 20241005030304.png]]
![[Pasted image 20241005030322.png]]
![[Pasted image 20241005034814.png]]
![[Pasted image 20241005034839.png]]
![[Pasted image 20241005034852.png]]

![[Pasted image 20241005034946.png]]
![[Pasted image 20241005035030.png]]

![[Pasted image 20241005035226.png]]
![[Pasted image 20241005035152.png]]
![[Pasted image 20241005035131.png]]
Use logs with parameters because this logs are "structured",can be converted in many types and more easy to read


## Mocking best practices
This chapter covers  
- Maximizing the value of mocks 
- Replacing mocks with spies 
- Mocking best practices

![[Pasted image 20241005040035.png]]



![[Pasted image 20241005040114.png]]
![[Pasted image 20241005040142.png]]



![[Pasted image 20241005202236.png]]

![[Pasted image 20241005202256.png]]

![[Pasted image 20241005204923.png]]
![[Pasted image 20241005204359.png]]
In unit tests you shouldnt use mocks because unit tests cover buisness logic with no interactions with out-of-process,inter-system dependecies, but you should mock only unmanaged dependencies, thus you dont need to use mocks in unit tests



Mocking only types that you own 
![[Pasted image 20241005204458.png]]
![[Pasted image 20241005213632.png]]
## Testing the database

This chapter covers  
- Prerequisites for testing the database  
- Database testing best practices  
- Test data life cycle  
- Managing database transactions in tests
 
#### Prerequisites for testing the database  

![[Pasted image 20241005205430.png]]

##### Keeping the database in the source control system(git)
![[Pasted image 20241005205953.png]]
![[Pasted image 20241005210202.png]]


Reference data(userType,adress,country,all stuff that you cant modify with your application,and on wich your regular data has foreign keys)is part of your database schema


![[Pasted image 20241005212151.png]]

Dont use comparison tools for changes of db.Use migrations.
![[Pasted image 20241005212219.png]]

#### Database transaction management


##### Managing database transactions in production code

![[Pasted image 20241005231742.png]]

![[Pasted image 20241005231754.png]]
![[Pasted image 20241005231808.png]]


![[Pasted image 20241005231831.png]]
![[Pasted image 20241005231844.png]]

##### Managing database transactions in integration tests

![[Pasted image 20241005231146.png]]
![[Pasted image 20241005231203.png]]
![[Pasted image 20241005231216.png]]
![[Pasted image 20241005231925.png]]
![[Pasted image 20241005231947.png]]
![[Pasted image 20241005232017.png]]
![[Pasted image 20241005232029.png]]

![[Pasted image 20241005234922.png]]

![[Pasted image 20241005234641.png]]
![[Pasted image 20241005234943.png]]
![[Pasted image 20241005234955.png]]
![[Pasted image 20241005235313.png]]
![[Pasted image 20241005235327.png]]
![[Pasted image 20241005235346.png]]
![[Pasted image 20241005235402.png]]
![[Pasted image 20241005235613.png]]
![[Pasted image 20241005235629.png]]
![[Pasted image 20241005235642.png]]
![[Pasted image 20241005235658.png]]

![[Pasted image 20241006000258.png]]
![[Pasted image 20241006000311.png]]
![[Pasted image 20241006000332.png]]
![[Pasted image 20241006000353.png]]
![[Pasted image 20241006000413.png]]
![[Pasted image 20241006000424.png]]
![[Pasted image 20241006000438.png]]
Time in assertions can be different than in the act,so there is 3 options:
1. Ambient context(Anti-pattern)
Ne ponel tam nu ladno coroche