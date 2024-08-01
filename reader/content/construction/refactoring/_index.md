---
title: "Refactoring"
weight: 3
---

{{< youtube bHKyMxvZFXY >}}

Refactoring is the process of improving on the implementation of an existing design by restructuring the source code to alleviate existing shortcomings and ease future development. Conceptually, refactoring tasks do not change the semantics of the program (e.g., add new features or fix defects) but instead make the code more amenable to future feature additions and defect fixes. Most refactoring operations consolidate duplicate code, reduce coupling, move elements to make them more cohesive, or otherwise improve the understandability and maintainability of the system. Refactoring is one mechanism used to handle emergent design: as a system evolves, we learn more about what kinds of abstractions are most appropriate. Through refactoring we can incorporate these emergent abstractions into a system's design.

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

## Kinds of Refactors

Martin Fowler has documented the most common refactorings in his comprehensive [book](http://www.martinfowler.com/books/refactoring.html). While he details dozens of these, some of the most common refactorings are:

* Rename (class/field/method).
* Move (class/field/method).
* Extract class/interface/method.
* Push down/pull up field/method.
* Replace magic number/string with constant.
* Replace inheritance with delegation.

<!---
We will discuss some of these more concretely below in the context of how they can improve program structure.
-->

For example, the code below evolved from being just about printing a value to also computing it. To address this, the developer decided to refactor it so the method has a more specific responsibility and performs an extract method refactoring; before the code looked like this:

```typescript
public printOwing() {
    printBanner();
    let owing = 0;
    for (const t of this.tasks) {
        owing += t.getValue();
    } 
    // print details
    Log.info("amount: " + owing);
}
```

After, a private method ```getOwing``` has been extracted and ```printOwing``` has been simplified to:

```typescript
public printOwing() {
    printBanner();
    // print details
    Log.info("amount: " + this.getOwing());
}

private getOwing() {
    let owing = 0;
    for (const t of this.tasks) {
        owing += t.getValue();
    }
    return owing;
}
```

In another instance, a developer realizes upon adding a new feature (```CourseProcessor```) that it shares similar structure to another existing feature and having both complicates the client code.

```typescript
class RoomsParser {
    public parseRooms(id: string, zip: JSZip) {
        // ...
    }
}

class CourseProcessor {
    public processCourses(id: string, zip: JSZip) {
        // ...
    }
}
```

To simplify the client the developer performs three refactorings. First they perform an extract interface refactoring. Then they add a return type to `parse`, and finally they perform a rename refactoring on `CourseProcessor`:

```typescript
interface IParser {
    parse(id: string zip: JSZip): boolean;
}

class RoomsParser implements IParser {
    public parse(id: string, zip: JSZip): boolean {
        // ...
    }
}

class CourseParser implements IParser {
    public parse(id: string, zip: JSZip): boolean {
        // ...
    }
}
```

## Code Readability
{{< youtube TZ7mfKJa7Sw >}}


## Code smells

{{< youtube oqqaDaQ3m24 >}}

In order to be useful, software must:

* Accomplish its purpose.
* Afford change.
* Be understandable.

Code smells are properties of code that are often symptoms of specific code deficiencies. In particular, smells often make it hard for the code to be understood by future developers, which in turn makes the code harder to evolve and change. Smells often arise as code evolves: as defects are fixed and new features are added, the original design of the code can be obfuscated, and new additions can introduce additional coupling and be less cohesive to the code that was there before.

Code smells often refer to structural deficiencies within a codebase that makes the code harder to reason about and evolve. While most smells are encountered as structural inhibitors to change, non-structural challenges that make the code hard to understand are also considered smells. Regardless of the source, code smells are often considered one form of technical debt. Smells are never absolute: they are usually informally identified and are sometimes not signs of poor code (e.g., highly generic library and framework code often violate many smells). 

At their core, code smells highlight properties of code that could be detrimental to:

* Debugging.
* Understanding.
* Quality.

Specific smells often match up with refactorings that are best able to resolve them; for this reason, smells and refactorings are often discussed in tandem. Some common smells are listed below, along with the _refactorings_ that are often used to resolve them.

* **Duplicated code**: This represents one of the most common code smells and is identified by code being duplicated throughout the system (these duplicates are often called code clones). If the duplicates take place in the same class, an _extract method_ refactoring can be used to have all copies in the class use the same single implementation. If the code is in related classes, a _push up_ refactoring can move the method into a common supertype. If the duplicate code is in unrelated classes, a more complex analysis is often needed. While clones are usually code smells, some valid reasons for cloning have been identified in the literature, so care is needed when considering how to address these. 

* **Long method**: The single responsibility principle specifies that a method should do one thing and do it well. When methods get too long, it is a sign that feature creep has caused the method to become less focused. While thresholds are hard to set, fitting the code on one screen is a simple rule of thumb (although one that can be legitimately broken).  As with duplicate code, _extract method_ refactorings are often used to split up these methods, as could _extract class_ if functionality is to be delegated to another class. Research has shown that shorter methods (e.g., under 24 lines of code) are more amenable to evolution.

* **Large class**: As with long method, large class captures classes that have grown beyond their original mandate. _Extract class_ and _extract method_ refactorings are often used in these cases.

* **Long parameter list**: Methods that take large numbers of parameters are hard to understand and are again often symptomatic of code that is doing too much. These methods can either be split, or one can _introduce parameter object_ to better capture and enforce the parameters for the method.

* **Divergent change**: While working on code it is often observed that many independent changes involve modifying a specific code element; this is known as a divergent change. This signals that one class or method has become much more important than it should have (perhaps has become a god class). Divergent changes are one symptom that a class is taking on more than one responsibility, as such _extract class_ refactorings are frequently used to split a class into two or more independent classes. If the new classes are kinds of the original class, the new classes may be subtypes of the original class, but more commonly the new classes are parts of the original class, enabling delegation to be used instead.

* **Shotgun surgery**: Opposite to divergent change, shotgun surgery arises when simple coherent changes require broad changes across a system. These are sometimes called delocalized or scattered changes. Such smells are often a symptom of poor cohesion. Shotgun surgery is most commonly addressed by _move method_ and _move field_ refactorings that can move existing functionality into classes where they can be more cohesive.

* **Feature envy**: This is a broader code smell that occurs when a method is in the wrong class. Like many of the prior smells, it is most commonly resolved with _extract method_ refactorings. Law of Demeter violations commonly signal feature envy smells. The Law of Demeter states that a program component should have limited information about other components in the system. These violations are usually easy to spot and arise when a function 'reaches into' another function to tell it how to behave. For example, if a method called `db.getResults().sort().print()`, not only does it know about `db` but it also needs to know about the return types to `getResults()` and `sort()` in order to call methods on them. The most straight forward way to avoid Law of Demeter violations is to not call methods on objects returned by another method.

* **Others**:  The _middle man_ smell occurs when a method does not do anything itself but just ends up delegating all work to another class. This smell frequently arises after refactorings that move functionality to other methods but the original base method remains (and just calls the new methods, rather than updating all callers).

Software is built iteratively over a long period of time. Even good past design decisions will need to be updated as requirements change or the environment changes. Smells are just one way to identify such problems, and refactorings are only one way (although a common one) to improve the structure of a system.

## References

* Martin Fowler's [technical debt](http://martinfowler.com/bliki/TechnicalDebt.html) discussion.