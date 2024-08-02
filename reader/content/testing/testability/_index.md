---
title: "Testability"
weight: 2
---

{{< youtube jwL1vkl-CoY >}}

When designing software we commonly think to support quality attributes such as usability or security, but an under-appreciated quality attribute is _testability_. Testability is a quality attribute that does not affect how the system performs its functional requirements, but instead influences how amenable the system itself is to being tested. 

In order to be successful, a test needs to be able to execute the code you wish to test, in a way that can trigger a defect that will propagate an incorrect result to a program point where it can be checked against the expected behaviour. From this we can derive four high-level properties required for effective test writing and execution. These are controllability, observability, isolateablilty, and automatability.

It is often necessary to restructure software that has not been written in a testable way to make it possible to validate a system effectively; this commonly happens when units within the code take on more than one responsibility or when features become scattered across a codebase. One of the biggest advantages of Test-Driven Development (TDD) is that by writing your tests first you are able to ensure that your system is structured in a testable way.

### Controllability

{{< youtube y0zrTdDuYv0 >}}

Tests dynamically execute the system. If the system/code under test (SUT/CUT) cannot be programmatically controlled, an automated test cannot be written for it. There is often a controllability tradeoff between what code it is *possible* to write a test for and what code it is *efficient* to write a test for. For example, if you build a large system that embeds all of its logic tightly with its interface it can be impractical to validate how the system works without writing UI-tests, which are error-prone and expensive. In practice, one of the most common mechanisms for improving the controllability of code is to add additional parameters to methods or constructors, both to enable dependencies to be more easily varied and to allow more expressive or complete inputs to be sent to a method.

### Observability

{{< youtube CJhJibMCTUM >}}

Sometimes the CUT can be invoked by a test but its outcome cannot be observed. For example, if a defective method mutates some external inaccessible object but does not return a value. Often these can be resolved by returning data to the caller that might otherwise just been passed further down a call chain. One surprising challenge when considering observability is determining what values are correct and what values are erroneous. While this sounds simple, this is the root cause of the old saying "That's not a bug, it's a feature!"; at their core these are often caused by imprecise, incomplete, or contradictory specifications.

### Isolateability

{{< youtube Z93-c4ngxGw >}}

Being able to isolate a fault within the code under test is crucial to be able to quickly determine what has caused a failure so it can be resolved. This is challenging in large modern systems due to the number of (often third party) dependencies software systems have. For example, if a data access routine fails is it the logic in the routine or is it a failure in the underlying database? At its simplest level, isolateability can be increased by decomposing larger functions into smaller more self-contained functions that can be tested independently.

Sometimes code will have complex dependencies, requiring isolation through simulation. In simulation-based environments code dependencies are _mocked_ or _stubbed_ whereby they are replaced with developer-created fake components that take known inputs and return known values (e.g., a ```MockLoginRejectController```) would always return false for a ```login(user, pass)``` without needing to check a user store, database, or external system. In this way the developer can test their code that uses ```login(..)``` and ensure it handles the false case correctly without fear that a bug in the real login controller may return an incorrect or inconsistent value. In addition to isolation, mocking also greatly increases performance and makes components less prone to non-determinism as the result being returned is usually fixed and not dependent on some external complex computation. Mocking can also make it possible to test program states that would otherwise be hard to trigger in practice (for instance if you want to test a situation where a remote service is down you can have a ```MockTimeoutService``` that just does not respond to requests).

{{< expand title="Code Example" >}} {{% youtube NMuhE-XnFe8 %}} {{< /expand >}}

### Automatability

{{< youtube Q83W5zH8LUY >}}

The above properties all aim to support making it possible to automate the execution of the test suite. Suites that can run without human intervention are much more likely to be executed than those that must be manually performed. They are also more likely to be run after a system has been released in the form of a regression suite to ensure that a system continues to execute as expected. All systems exist within organizations, even if the software does not change, external dependencies, libraries, frameworks, and computing infrastructure will which will require continuous validation of even deployed systems. The economic benefits or automation are also clear: even if it takes 5 hours to configure an automated test case that can be performed in 30 minutes, the suite will break-even (in terms of time) after only 10 test iterations. Automated suites can be run online as changes are made to a system, after every commit, nightly, or weekly, depending on the needs of the system. These suites also provide global visibility of the state of the system; if the suite has been 'green' for a week a team might feel more comfortable about deploying it than for a system whose suite has been failing for the same period of time.

### Summary

{{< youtube d2WjviF50HA >}}

The four properties of testability are not commonly considered on their own. While observability and isolatability are the two properties that matter the most (e.g., can I _detect_ that a fault exists, and if so, _where_ exactly in my code is it), these properties are not enough in practice. If you have an isolateable unit, but you cannot control it (which usually means being able to pass in key dependencies (e.g., by dependency inversion) or values (e.g., input/output partitioning)) to trigger the fault, then being isolated does not matter, because you cannot trigger the behaviour you want to observe. 

Consequently, isolateability without controllability is not very useful. Similarly, controllability alone also is not enough because large flexible functions may enable many specific behaviours to be triggered, while still being hard localize failures within due to their size or the scale of the external dependencies such a large function may invoke. Automatability is the least commonly considered testability property because automatability could be considered shorthand for code that is _programmatically controllable_. 

More details about testability can be found in [Bob Binder's](http://robertvbinder.com/wp-content/uploads/rvb-pdf/talks/GTAC-2010-Binder-Testability.pdf) GTAC [talk](https://www.youtube.com/watch?v=1keyEiJHqPw). [Miško Hevery](https://www.youtube.com/watch?v=XcT4yYu_TTs) has a cool walkthrough video of live coding a refactoring to enable a simple system to be more testable. A nice collection of [testability links](http://stackoverflow.com/a/2085988/3133691) have been compiled on StackOverflow.


### Resources

* Concrete example showing how to increase [isolation](http://anzorb.com/unit-tests-102-isolating-your-code-with-mocks-and-stubs/) with mocks and stubs.

* Some best and worst [practices](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/) for writing unit tests.

* Great article on [testability](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters).

