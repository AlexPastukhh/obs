
### Kampf
1 Breaks 
- 1 Boilerplate breaks with no external thoughts not connected with what i really want
- 2 Thoughts only about what i really want but not too much thoughts 
- 3 Imagine the wishing result 
-  Just watch and do boilerplate, + some thoughts on what you really want 
2 Imagine ideal result 
- If it is what you really want, then breaks restrictors:
	- 1 No doubts, and fears. This should be done, result should be yours already
	- 2 No energy save regime 
	- 3 Low sensibility
	- 4 Challenge, competition
3 brain should be a good tool 


Претворение в жизнь сценария в котором ты удовлетворен результатом, накопление результатов для удовлетворения всем накопленным потом

Фокус только на этом, особенно эмоциональный 

Просто реализуем сценарий в котором остаемся довольны, проходим сквозь страх, хуях. упрощаем, следуем самому грамотному алгоритму 


### Class
1 Responsibility
- Accounted for associated units of behavior, have properties and methods implementing that associated units of behavior
- **Must be sure that there wont be a situation where another class will be created that have unit of behaviour that this class  have**
2 Name
- Tells client is it what he want or not
**Design**
3 Encapsulated
- Prevent violation of invariants(properties always in right state and methods cant be used wrong)
- User restricted from implementation details and only have access to what he need as units of behavior(visible behavior)
4 Either Controller or Buisness logic(tall or wide)
### Method
1 Behavior
- 1 Accounted for one unit of behavior
- 2 **Must be sure that there wont be a situation where another method will be created that have unit of behaviour that this method  have**
2 Name
- 1 Tells client is it what he want or not
- 2 Tells everything what method does and what it need to work right
3 **Design** (inside method)
- 1 Either tall either many collaborators(Either Controller or Buisness logic)
- 2 Everything is clear, if some logic prevails, then move it in separate method
- 3 Even if everything is clear, if some logic doesnt belongs only to this method and can be reused, then move to separate place  to no violate DRY
- 4 Treat another methods like blackboxes, dont depend on implementation details
### Component
1 Responsibility 
- Check if component contains closely related  logic and accounted for one unit of components behavior
- Will there be a situation where you need to create component wich behavior this component has, and not just this behavior
2 Name
- Tells client is it what he want or not
3  Encapsulated
- Prevent violation of invariants(properties always in right state and methods cant be used wrong)
- User restricted from implementation details and only have access to what he need as units of behavior(visible behavior) 
	- **Exposes or Provides only needed data and methods**
	- typed props, emits,models,slot props
4 Either independent shared or dependent buisness logic 


# Test
#### Problems:
#### 1 You need to be sure that sut provides expectable behavior - At the creation of sut - After refactoring

After refactoring
###### 1 Testing Observable behavior

 **Refactoring means changing implementation not the functionallity
- 1 You should test interface behaviour, not implementation
- 2 tests must perceive sut like black-box 
**Resistance to refactoring is a low count of *False positive* results
- It is not such important at the beginning of the project as when the codebase grows
**Protection against regressions and resistance to refactoring contribute to test accuracy

2 Mocking 
- Only to check observable behavior
- Only for inter-system communications that cross application boundary

3 Stubbing 
- Only hard-to-manage dependencies

#### 2 You need execute tests after every change of codebase
 1 You need tests to be fast
 - Keep code either complex or with many dependencies
 2 You need to stub hard-to-manage dependencies
#### 3 You need readable tests and maintainable tests
**Maintainablitity means:
![[Pasted image 20241004211024.png]]
1 Naming
2 Helper functions and classes 
3 Base class
4 Value Objects
5 Keep code either complex or with many dependencies
6 No if statements 
7No multiple a's
![[Pasted image 20241005035131.png]]
8 Use more readable tools

