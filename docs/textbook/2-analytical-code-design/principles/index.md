---
weight: 4
title: "Design Principles"
---

Design principles are high level guidelines that can help ensure our designs are robust in the face of defect fixes and feature additions. There are a great many design principles, here we only address a small subset of those. One thing to keep in mind is that these principles are not absolute: sometimes you will violate them, but if you do, you should be careful to do so in a considered manner.

## Designing for evolution

Designing systems in a flexible manner is crucial, given that all successful systems evolve over time. Making intentional decisions about the coupling within our system and cohesion between program elements can help guide us towards ensuring that our designs are amenable to future evolution and defect fixing.

<Youtube id="gkCIOUbu81o" />


## Tools

To help us design for evolution (and enable us to improve our code's coupling, cohesion, and testability) we rely on several tools within our programming languages.

### Abstraction

<Youtube id="HW_b8S2rD4o" />

Abstraction is the fundamental technique used by software engineers to be able to manage the complexity of their systems. Abstraction enables engineers to focus on the _key_ information for a given task while eliding unnecessary detail. (e.g., a UX designer might focus on UI flows, but would not reason about backend cryptographic protocols). The 'right' abstraction will vary from task to task. The most high-level and common kinds of abstractions relate to control and data abstraction.


#### Data abstraction

Data abstraction is the process of explicitly separating the abstract properties of a data type and its concrete implementation. The primary benefit of data abstraction is that it enables client code to be oblivious of the underlying implementation of a data type allowing it to be upgraded and improved without impacting client code.

For example, a ```Vector``` in Java is implemented using an array, but the JDK authors could choose to change this implementation (say to a linked list) without impacting client programs. A Java ```HashMap``` is stored as an array of linked lists. In both cases, client code can be oblivious of the underlying implementation as long as they understand the behaviour of the methods provided by ```Vector``` and ```HashMap```. 

Here is a concrete example of data abstraction from [CPSC 210](https://sites.google.com/site/ubccpsc2102015s2/schedule/ubc-cpsc-210-robust-classes.pdf?attredirects=0&d=1):

```typescript
// Creates a new team.
// Requires: A non-empty and unused name.
// Modifies: Team database.
// Effects:  Returns whether a team was created.
public createTeam(name: string):boolean {...}
```

By explicitly describing the data the method requires, modifies, and its side effects, client code can be completely oblivious of the underlying implementation used by ```createTeam(..)```. What we are really trying to do in this example is define the method's contract, that is its preconditions (expects), postconditions (provides), and invariants (must always be true). Correctly and adequately documenting these abstractions is important because state-based errors are a common source of difficult-to-diagnose faults in modern systems that type systems provide little defence against.

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

```asm
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

### Decomposition

<Youtube id="R3qWYSa2OyU" />

Decomposition is the process of taking a complex high-level entity and splitting it into more manageable smaller pieces. One of the main goals during decomposition is to make simple tasks simple while ensuring that exceptional tasks are still possible. There are many kinds of decomposition strategies (e.g., based around program units, algorithms, subsystems, etc.) but the most general (and common) is top-down decomposition. 

In top-down composition a description is broken up into pieces starting at the top and working to greater level of detail. Initially this will mean that many important details will be represented by 'black boxes' (which can represent systems, modules, or any other relevant level of abstraction) that can be filled in in the future through either further decomposition of the box or by providing final details of what the piece does. Working top-down is a great way to have global awareness about the full system but can be challenging once terminal boxes develop constraints that necessitate revisiting prior decisions.

An alternative (also common) approach is working bottom-up. In this way decisions can be made about leaf nodes that can be composed into the final overall system. This approach is great when you have concrete details about the team implementing the system (e.g., because you can have them make the most relevant decisions for their team right away). A downside of bottom-up approaches is they often lack the global overview which can lead to inconsistencies and extraneous focusing on details early in the design stage.

<!-- LOWTODO: add decomposing user stories here 
#### Example: Decomposing user stories
-->

<!-- MEDTODO: decomposition levels -->

### Information hiding 

<Youtube id="f6H2w874TKc" />

Software engineers often talk about abstraction in terms of _information hiding_.  Information hiding was first proposed by David Parnas in 1972 as a means for separating the parts of the program that are most likely to change from those parts that are more static. Information hiding is a high-level motivation for APIs: by describing the expected behaviour of the API you can "hide" the implementation behind it. 

Information hiding is a specific, common, and important form of abstraction that intentionally seeks to identify 'that which varies' from 'that which stays the same'. This is important, because all abstractions in code come with a cost: trying to understand a system with unnecessary abstractions can add complexity and difficulty, while balancing this complexity against trying to evolve a system lacking necessary abstractions is a challenging task.


### Encapsulation

<Youtube id="aPTqsdbyhcQ" />

Encapsulation is related to information hiding and is practiced most concretely in object-oriented programming languages like Java, C#/C++, TypeScript, etc..  Encapsulation is concerned with delineating the contractual interface with its implementation. The most common language feature for supporting encapsulation is the interface whereby the interface describes the public contract an object will provide and the concrete class describes the implementation of the interface (along with any supporting private methods and fields).

### Constant change

<Youtube id="a-vT-01x4TI" />

As Jeff Dean noted in his [WSDM 2009 Keynote](http://static.googleusercontent.com/media/research.google.com/en//people/jeff/WSDM09-keynote.pdf) it is important to recognize the parameters that lead to the abstractions you choose will change over time, and often by many orders of magnitude. The right design for one system will probably be different at 10X load or 100X load. While it can be tempting to try to design for the 'end game' there are high real costs associated with premature optimization. In his talk, Jeff advocates designing for 10x load with the expectation that a rewrite would be required at 100x load. While one could view this process as wasteful, an alternative viewpoint is that in the time between 10x and 100x you will learn things about your system you would not have known in advance (and would thus not solve your 100x problem from the start anyway).

Thinking about change is also related to encapsulation in that thinking concretely about what parts of the system are likely to change in the short and medium terms are more likely to lead to useful and valuable abstraction layers than taking an 'anything can change' view to design.

### References

* Original [information hiding](http://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf) paper.



## Design Symptoms
<Youtube id="_Eb5bAgpgQg" />
<!-- TODO: cognitive dimensions -->

<!-- TODO: describe levels -->

<!-- TODO: include design guidance and symptoms -->
<!-- rigidity, fragility, immobility, viscosity, complexity, repetition, opacity -->

## SOLID

Design principles provide guidelines to help us reason about specific properties within our designs. It might be tempting to treat design guidelines as rules, but that is not their intent: designs will often contravene well-established guidelines; in fact, many guidelines themselves are often in tension with one another forcing engineers to think about their systems to determine which principles are more important to their system. 

There are many catalogues of design principles. While some of these are broadly applicable, others will be unique to specific domains. One of the most commonly-used catalogs are the SOLID design principles.

### Single responsibility

<Youtube id="QQ26-dkzEdM" />

As systems grow it becomes harder to understand them, fix defects within them, and add new features to them. The single responsibility principle says:

> A software module should do one thing and do it well.

One reason this becomes problematic as systems grow is that it often seems easier to add code to an existing module than to create a new module from scratch. This means that code gets added in places where it might not fit well and this mismatch can make the module harder to evolve.

Many design patterns have been explicitly crafted to encourage designs that adhere to the single responsibilty principle. For example:

* Strategy pattern: In this pattern, modules encapsulate algorithms; this means we create modules that _only_ implement a specific algorithm.

* Command pattern: This pattern separates the notion of an action that can be performed from its implementation. This results in small modules that only provide the features needed for a specific action.

* State pattern: Systems often depend differently according to their internal state. Rather than having large modules that need to reason globally about all states, this pattern encapsulates the behaviours for a single state in a single module resulting in smaller, more targetted code.

### Open/closed

<Youtube id="815hXPR_kHo" />

The open/closed principle states that modules should be:

> Open to extension but closed to modification.

This principle encourages software engineers to design their code that is more amenable to future change. Specifically, the open/closed principle encourages engineers to think explicitly about what parts of their systems should enable future feature additions and which parts of the system should not. This distinction is important, because extension points typically add abstraction to a system which makes them harder to understand. We might want to explicitly inhibit some kinds of extensions as well due to negative performance or security implications. By explicitly planning for future extension, new features can be added in a way that does not cause existing code to be modified.

This design principle is explicitly supported by most design patterns as these predominantly describe explicit extension points (e.g., by adding new strategies, states, commands, decorators, observers, etc.) that can be extended while existing code remains oblivious to the new features.

One of the biggest challenges with this principle is knowing _when_ to enable extension; this usually takes explicit discussions with system stakeholders to reason about the explicit costs and benefits of such an extension mechanism.

One common code smell for violating the open/closed principle are `instanceof` or `typeof` checks within the code. These checks mean that if a system is extended with a new feature, client code will probably need to be updated as well so that the type checks also check for the new features. This is one of the primary reasons to be wary of this kind of runtime type checking. <!-- private super fields -->


### Liskov substitution

<Youtube id="8UG6P1a8rKg" />

The Liskov substitution principle says:

> Any object can be interchanged with any other object that has the same parent type. 
 
For a complete coverage of this design principle. Since this has been covered in prior courses, we will not discuss it further here, but you are encouraged to watch [Elisa Baniassad's video](https://www.youtube.com/watch?v=j6jbTMpZkWQ) for a more complete description.

### Interface segregation

<Youtube id="x_9QJ83oj2k" />

The interface segregation principle says:

> Clients should not be forced to depend on interfaces they do not use.

This principle exists because as we evolve our systems we often do so by adding new methods to our interfaces rather than by creating new ones to succinctly capture the added feature additions. This principle can be thought of as applying the single responsibility principle to interfaces (instead of to classes) as it really pushes us to design our interfaces to be as small and well-focused as possible.

### Dependency inversion

<Youtube id="BJr2yG-Hn7g" />

The dependency inversion principle says:

> Classes should depend on abstractions, not implementations.

This principle helps engineers to design implementations that are as decoupled from one another as possible. This usually happens by injecting an interface between the two concrete classes and having the classes take dependencies on the interface instead. While this might seem like a small difference, it means that if you wanted to reuse one of the classes you would also only have to reuse the interface rather than the concrete class and all of its concrete dependencies.

When we refactor an existing system to encourage extensibility, we often do it through dependency inversion. Specifically, we introduce a new interface and make the existing code implement the interface. This makes the post-refactor code both easier to reuse and extend.

[//]: # (## References)

