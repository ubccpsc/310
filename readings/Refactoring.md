# Refactoring

Refactoring is the process of improving on the implementation of an existing design by restructuring the source code to alleviate existing shortcomings and ease future development. Conceptually, refactoring tasks do not change the semantics of the program (e.g., add new features or fix defects) but instead make the code more amenable to future feature additions and defect fixes. Most refactoring operations consolidate duplicate code, reduce coupling, move elements to make them more cohesive, or otherwise improve the understandability and maintainability of the system.

Development teams often think of refactorings as a mechanism for paying technical debt. Technical debt is a metaphor for thinking about how development decisions can influence the long-term viability of a software system. The technical debt metaphor acknowledges that while quick and cheap solutions are often attractive (and the right thing to do), they accrue debt in the overall maintainability of the system by degrading or obfuscating the original design. Technical debt often triggers developers to think about refactoring in one of three main situations:

* When adding a new feature is much harder than expected.
* When fixing a bug (that should be cohesive) requires changes that are scattered across the system.
* When performing a code review for a simple feature/defect that requires complex changes that are hard to understand.

These all represent changes that _should_ be easy but turns out to be difficult. The technical debt metaphor encourages longer-range thinking about system health while allowing the quick path to be taken sometimes when it is deemed to be worth the future risk. 

Refactoring is a risky activity: the internal structure of the system is being changed (sometimes drastically) without adding any new features or fixes. From a customer's perspective this means refactoring is all risk and no reward as the direct beneficiaries of a refactoring are usually only the development team itself. Effective testing is crucial for being able to confidently perform refactorings. The typical refactoring process looks like the following:

1. Identify the property of the code you want to improve and the transformations required to solve the problem.
1. Run the test suite to ensure the system is fully working before the change (sometimes saving the output/logs of the test suite can also be helpful).
1. Perform the refactoring.
1. Run the full test suite again and ensure the system is functioning the same as before the refactoring.

Beyond customer risk there are other negative consequences for performing a refactoring:

* Refactorings can impair existing developer mental models of the system (wide-ranging refactorings can impact many people) and can make the system harder to understand if they add new abstraction layers.
* Refactorings are expensive since they take developer time that could otherwise be spent developing new features.
* It is easy to get carried away when refactoring (similar to the second-system effect) in that instead of a simple refactoring a developer can engage on a refactoring campaign that can become much larger than ins necessary to provide the original intended benefits.

One way to avoid extraneous refactorings is to think about the 'rule of three'. This says that the first time you add a new feature you just do it the simplest way you can. The second time you need to make the same kind of change you do it again (but you cry inside and make a mental note of the duplicate change). The third time you encounter the same change you refactor. This prevents preemptive refactoring which can sometimes make the system harder to understand, even if it makes it easier to extend in the future (this can be thought of as just-in-time abstraction).

Most development environments provide extensive support for refactoring tools. The degree of support depends on the language and is generally best for statically typed languages (like Java and C#) as it makes it easier for the IDE to find all relevant program locations for making a change. While IDE support is great, and you should use it, in practice the most commonly used refactoring tool is for rename refactoring; most other refactorings end up being undertaken manually (usually due to a lack of knowledge about the tools, but often because of the perception that the tools do not actually save that much time).

### Refactoring list

Martin Fowler has documented the most common refactorings in his comprehensive [book](http://www.martinfowler.com/books/refactoring.html). While he details dozens of these, some of the most common refactorings are:

* Rename (class/field/method).
* Move (class/field/method).
* Extract class/interface/method.
* Push down/pull up field/method.
* Replace magic number/string with constant.
* Replace inheritance with delegation.

We will discuss some of these more concretely below in the context of how they can improve program structure.

# Code smells

XXX

### References

* Technical Debt: http://martinfowler.com/bliki/TechnicalDebt.html

---
![] (figures/CCSA.png "Creative Commons: Attribution-ShareAlike") [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
