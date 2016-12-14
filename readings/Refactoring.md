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

<!---
We will discuss some of these more concretely below in the context of how they can improve program structure.
-->

For example, the code below evolved from being just about printing a value to also computing it. To address this, the developer decided to refactor it so the method has a more specific responsibility and performs an extract method refactoring; before the code looked like this:

```typescript
public printOwing() {
	printBanner();
	var owing = 0;
	for (var t of this.tasks) {
		owing += t.getValue();
	} 
	//print details
	Log.info(“amount: " + owing);
}
```

After, a private method ```getOwing``` has been extracted and ```printOwing``` has been simplified to:

```typescript
public printOwing() {
	printBanner();
	//print details
	Log.info(“amount: " + this.getOwing());
}

private getOwing() {
	var owing = 0;
	for (var t of this.tasks) {
		owing += t.getValue();
	}
	return owing;
}
```

In another instance, a developer realizes upon adding a new feature (```CourseProcessor```) that it shares similar structure to another existing feature and having both complicates the client code.

```typescript
class RoomsParser {
	public parseRooms(zip: JSZip) {
		// ...
	}
}
class CourseProcessor {
	public processCourses(id: String, zip: JSZip) {
		// ...
	}
}
```

To simplify the client the developer performs an extract interface refactoring to change the code to:

```typescript
interface IParser {
	public parse(id: String zip: JSZip) {
		// ...
	}
}

class RoomsParser implements IParser {
	public parse(id: String, zip: JSZip) {
		// ...
	}
}

class CourseProcessor implements IParser {
	public parse(id: String, zip: JSZip) {
		// ...
	}
}
```

# Code smells

Code smells are symptoms of specific code deficiencies. Given that code quality can often be hard to quantify, but can be often be identified by 'feel', smells give names to often encountered structural deficiencies. Smells are never absolute: they are usually informally identified and are sometimes not signs of poor code (e.g., highly generic library and framework code often violate many smells). At their core, code smells highlight properties of code that could be detrimental to:

* debugging
* understanding
* quality

Specific smells often match up with refactorings that are best able to resolve them; for this reason, smells and refactorings are often discussed in tandem. We will discuss several of these below:

* **Duplicated code**: This represents one of the most common code smells and is identified by code being duplicated throughout the system. If the duplicates take place in the same class an _extract method_ refactoring can be used to have all copies in the class use the same single implementation. If the code is in related classes a method can be pushed up into a common supertype. If the duplicate code is in unrelated classes, a more complex analysis is often needed.

* **Long method**: The single responsibility principle specifies that a method should do one thing and do it well. When methods get too long, it is a sign that feature creep has caused the method to become less focused. While thresholds are hard to set, fitting the code on one screen is a simple rule of thumb (although one that can be legitimately broken).  As with duplicate code, _extract method_ refactorings are often used to split up these methods, as could _extract class_ if functionality is to be delegated to another class.

* **Large class**: As with long method, large class captures classes that have grown beyond their original mandate. _Extract class_ and _extract method_ refactorings are often used in these cases.

* **Long parameter list**: Methods that take large numbers of parameters are hard to understand and are again often symptomatic of code that is doing too much. These methods can either be split, or one can _introduce parameter object_ to better capture and enforce the parameters for the method.

* **Others**: While working on code it is often observed that most changes involve modifying a specific code element; this is known as a _divergent change_ and signals that one class has become much more important than it should have (perhaps has become a god class). Another example is identified by simple coherent changes requiring changes across a system; in these case _shotgun surgery_ may be required to finish the task which is often the sign of poor system cohesion. Finally, _feature envy_ occurs when a method uses other classes more than it uses its own which often suggests that the method is in the wrong place.

Software is built iteratively over a long period of time. Even good past design decisions will need to be updated as requirements change or the environment changes. Smells are just one way to identify such problems, and refactorings are only one way (although a common one) to improve the structure of a system.

### References

* Martin Fowler's [technical debt](http://martinfowler.com/bliki/TechnicalDebt.html) discussion.

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)