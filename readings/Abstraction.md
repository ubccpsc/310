# Abstraction

So now we’re getting into the design part of the course. (you might note we’re following waterfall in that respect: from specs to design)
The most tool available to architects and designers is abstraction.
* This is all about focusing on the _key_ information for a given task while eliding unnecessary detail. (e.g., a UX designer might focus on UI flows, but would not reason about backend cryptographic protocols).
* The ‘right’ abstraction will vary task to task.
https://en.wikipedia.org/wiki/Abstraction_(software_engineering)

Abstraction: Focusing on essential details while suppressing extraneous information for a given task.


In SE you will most also hear this with the terms ‘information hiding’ and ‘encapsulation’. 
Information hiding was first proposed by David Parnas in 1972; this can be thought of as the basic rationale behind APIs: by describing the expected behaviour of the API you can “hide” the implementation behind it.
Encapsulation is related to information hiding and is practiced most concretely in OO programming languages like Java, C#/C++, or TypeScript.  This is all about interfaces, polymorphism, and member visibility.


#### Data abstraction

So let’s take a concrete look at an example of data abstraction from 210:
By explicitly describing what data the method requires, modifies, and what effects it returns, the API consumer can ignore the internal implementation.
Really this is all about defining the contract of the class, that is its preconditions (expects), postconditions (provides), and invariants (must always be true).
Recognizes that state-based errors are incredibly difficult to manage; type system usually can’t protect you against these.


XXX

```typescript
// Creates a new team.
// Requires: A non-empty and unused name.
// Modifies: Team database.
// Effects:  Returns whether a team was created.
 public createTeam(name: string):boolean {...} 
```

XXX

#### Control abstraction

One of the major benefits of modern programming languages is that they provide an abstraction layer between the developer expressing themselves and how a machine will interpret and execute their instructions. Abstracting away how the code will execute is called *control abstraction* and was one of the early advances in software engineering productivity (as described by Fred Books in [No Silver Bullet](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)). An easy way to think about control abstraction is that it allows an engineer to consider *what* they are doing without becoming overwhelmed with *how* they are going to do it.

It is easy to take control abstraction for granted, but the difference between the following Java and Assembler snippets demonstrates the benefit of this abstraction layer (example from [Beyond Java](http://www.beyondjava.net/blog/java-programmers-guide-assembler-language/)):

Java:

```java
a = b + 1;
b = c + 2;
c = a + 3;
```

Assembly:

```assembly_x86
mov     r11d,2h                   
mov     r10,7d56d18b0h            
add     r11d,dword ptr [r10+78h]  
mov     r9d,dword ptr [r10+74h]   
mov     dword ptr [r10+74h],r11d  
mov     r11d,r9d                  
inc     r11d                      
mov     dword ptr [r10+70h],r11d  
add     r9d,4h                    
mov     dword ptr [r10+78h],r9d   
```

Dijkstra coined the term 'structured programming' to describe language constructs that are designed to allow developers to express their programs using logical blocks of code that execute in sequence with control statements for choosing which blocks execute and subroutines so programs can be more meaningfully decomposed.

Language constructs are continually evolving to enable developers to better focus on their task intent instead of worrying about underlying execution context. JavaScript promises are one such example as it allows sequences of asynchronous operations to be developed without resorting to nested callbacks and written in a way that mimics synchronous method calls.

```typescript
// Manages team creation flow
// Defers to other methods for operations
makeTeam(teamName: string, memberName: string) {
  var that = this;
  // create team
   that.createTeam(teamName).then(function (teamId) { // createTeam is async
  // add member
  return that.addMember(teamId, memberName); // addMember is async
}).then(function (success) {
  // ...
}).catch(function (err) {
  // ...
});
}
```

### Encapsulation

XXX


### References

* https://sites.google.com/site/ubccpsc2102015s2/schedule/ubc-cpsc-210-robust-classes.pdf?attredirects=0&d=1


