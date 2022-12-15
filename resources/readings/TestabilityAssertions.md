# Testability

When designing software we commonly think to support quality attributes such as usability or security, but an under-appreciated quality attribute is _testability_. Testability is a quality attribute that does not affect how the system performs its functional requirements, but instead influences how amenable the system itself is to being tested. 

In order to be successful, a test needs to be able to execute the code you wish to test, in a way that can trigger a defect that will propagate an incorrect result to a program point where it can be checked against the expected behaviour. From this we can derive four high-level properties required for effective test writing and execution. These are controllability, observability, isolateablilty, and automatability.

It is often necessary to restructure software that has not been written in a testable way to make it possible to validate a system effectively; this commonly happens when units within the code take on more than one responsibility or when features become scattered across a codebase. One of the biggest advantages of Test-Driven Development (TDD) is that by writing your tests first you are able to ensure that your system is structured in a testable way.

#### Controllability

Tests dynamically execute the system. If the system/code under test (SUT/CUT) cannot be programmatically controlled, an automated test cannot be written for it. There is often a controllability tradeoff between what code it is *possible* to write a test for and what code it is *efficient* to write a test for. For example, if you build a large system that embeds all of its logic tightly with its interface it can be impractical to validate how the system works without writing UI-tests, which are error prone and expensive. In practice, one of the most common mechanisms for improving the controllability of code is to add additional parameters to methods or constructors, both to enable dependencies to be more easily varied and to allow more expressive or complete inputs to be sent to a method.

#### Observability

Sometimes the CUT can be invoked by a test but its outcome cannot be observed. For example, if a defective method mutates some external inaccessible object but does not return a value. Often these can be resolved by returning data to the caller that might otherwise just been passed further down a call chain. One surprising challenge when considering observability is determining what values are correct and what values are erroneous. While this sounds simple, this is the root cause of the old saying "That's not a bug, it's a feature!"; at their core these are often caused by imprecise, incomplete, or contradictory specifications.

#### Isolateability

Being able to isolate a fault within the code under test is crucial to be able to quickly determine what has caused a failure so it can be resolved. This is challenging in large modern systems due to the number of (often third party) dependencies software systems have. For example, if a data access routine fails is it the logic in the routine or is it a failure in the underlying database? At its simplest level, isolateability can be increased by decomposing larger functions into smaller more self-contained functions that can be tested independently.

Sometimes code will have complex dependencies, requiring isolation through simulation. In simulation-based environments code dependencies are _mocked_ or _stubbed_ whereby they are replaced with developer-created fake components that take known inputs and return known values (e.g., a ```MockLoginRejectController```) would always return false for a ```login(user, pass)``` without needing to check a user store, database, or external system. In this way the developer can test their code that uses ```login(..)``` and ensure it handles the false case correctly without fear that a bug in the real login controller may return an incorrect or inconsistent value. In addition to isolation, mocking also greatly increases performance and makes components less prone to non-determinism as the result being returned is usually fixed and not dependent on some external complex computation. Mocking can also make it possible to test program states that would otherwise be hard to trigger in practice (for instance if you want to test a situation where a remote service is down you can have a ```MockTimeoutService``` that just does not respond to requests).

#### Automatability

The above properties all aim to support making it possible to automate the execution of the test suite. Suites that can run without human intervention are much more likely to be executed than those that must be manually performed. They are also more likely to be run after a system has been released in the form of a regression suite to ensure that a system continues to execute as expected. All systems exist within organizations, even if the software does not change, external dependencies, libraries, frameworks, and computing infrastructure will which will require continuous validation of even deployed systems. The economic benefits or automation are also clear: even if it takes 5 hours to configure an automated test case that can be performed in 30 minutes, the suite will break-even (in terms of time) after only 10 test iterations. Automated suites can be run online as changes are made to a system, after every commit, nightly, or weekly, depending on the needs of the system. These suites also provide global visibility of the state of the system; if the suite has been 'green' for a week a team might feel more comfortable about deploying it than for a system whose suite has been failing for the same period of time.

#### Summary

The four properties of testability are not commonly considered on their own. While observability and isolatability are the two properties that matter the most (e.g., can I _detect_ that a fault exists, and if so, _where_ exactly in my code is it), these properties are not enough in practice. If you have an isolateable unit but you cannot control it (which usually means being able to pass in key dependencies (e.g., by dependency inversion) or values (e.g., input/output partitioning)) to trigger the fault, then being isolated does not matter, because you cannot trigger the behaviour you want to observe. 

Consequently, isolateability without controllability is not very useful. Similarly, controllability alone also is not enough because large flexible functions may enable many specific behaviours to be triggered, while still being hard localize failures within due to their size or the scale of the external dependencies such a large function may invoke. Automatability is the least commonly considered testability property because automatability could be considered shorthand for code that is _programmatically controllable_. 

More details about testability can be found in [Bob Binder's](http://robertvbinder.com/wp-content/uploads/rvb-pdf/talks/GTAC-2010-Binder-Testability.pdf) GTAC [talk](https://www.youtube.com/watch?v=1keyEiJHqPw). [Miško Hevery](https://www.youtube.com/watch?v=XcT4yYu_TTs) has a cool walkthrough video of live coding a refactoring to enable a simple system to be more testable. A nice collection of [testability links](http://stackoverflow.com/a/2085988/3133691) have been compiled on StackOverflow.


# Assertions

A key skill when creating automated unit tests is evaluating the _correctness_ of the code under test. While a compiler can validate the syntax of a program, a test suite is required to ensure its runtime behaviour matches its specification. Assertions are the primary piece of machinery used to evaluate correctness within automated unit test suites. Given that [jUnit](http://junit.org/) was one of the early (and still most popular) unit testing frameworks, it is unsurprising that many modern frameworks provide features similar to jUnit's [assertion features](https://github.com/junit-team/junit4/wiki/Assertions) for evaluating program outputs.

There are several high-level models to consider when structuring tests; two of the most widely used are:

* [Four-Phase Tests](http://xunitpatterns.com/Four%20Phase%20Test.html): This model is supported by default by jUnit and its variants. The four phases correspond to 1) setting up the testing environment; 2) executing the code under test; 3) evaluating the output of the CUT; and 4) tearing down the testing environment.

<!--
* [Arrange, Act, Assert](http://xp123.com/articles/3a-arrange-act-assert/): This model focuses on creating small, highly descriptive, unit tests. While the model has similar steps to the above technique, 3A espouses small tests over large ones.
-->

* [Give-When-Then](https://github.com/cucumber/cucumber/wiki/Given-When-Then): This model was developed by the behavioural driven programming ([BDD](https://dannorth.net/introducing-bdd/)) community which strives to create 'executable specifications' through unit tests that use descriptive strategies for nesting and naming. Tests are structured from some _given_ state, where the system's configuration is understood. The key action of the test is the _when_; this is often described in the test name using plain language (e.g., ```it('should be able to parse a document that has UTF-16 characters')```). The _then_ step involves observing the output to ensure its correctness. Expect/Should-style assertions (such as those used by the [Chai library](http://chaijs.com/api/bdd/)) are also often used by the BDD community as they enable extremely descriptive assertion statements.

#### Chai's Expect/Should Assertions

The Chai expect library provides a rich set of assertions that can be used to check for correctness. While traditional assertions are supported, e.g.,

```javascript
expect('myName').to.equal('myName');
expect(1).not.to.equal(2);
```

Chai also includes support for more advanced checking:

```javascript
expect(obj).to.deep.equal({ key: 'value' }); // check large object
expect(42).to.be.a('number'); // check type
expect([ 42, 97, 102 ]).to.have.length.above(1); // check array properties
expect([1, 2, 3]).not.to.include.members([1, 4]); // checks set membership
```

One benefit of the using the specific assertion forms above is that they easy to read and understand. For example, even without comments, the intent of the following Given-When-Then test doing is straightforward to comprehend:

```javascript
describe('Check math constants', function() {
  it('Math.PI should be close enough to the correct value', function() {
    expect(Math.PI).to.be.closeTo(3.14, 0.025);
  });
});
```

Additionally, assertion failures are easier to understand when specific assertion forms are used. For example, the following two assertions perform exactly the same check:

```javascript
// Equivalent assertions
expect(arr).to.contain(’c’);
expect(arr.indexOf(’c’) >= 0).to.equal(true);
```

But the error message for first assertion failing is more direct and understandable for the second. While this may not seem important for such a contrived example, for real, complex, failures more specific error messages can greatly simplify the process of understanding why an assertion failed.

```javascript
// Corresponding failures
AssertionError: expected [ ’a’, ’b’ ] to include ’c’
AssertionError: expected false to equal true
```

<!--
TODO: show all the assertions for a simple function
TODO: how to write good assertions links
-->

It is often best to have each behaviour tested as independently as possible. This eases debugging because a change that breaks a behaviour will be easy to isolate as it will only have broken one test and not a handful. It also eases program evolution because changing a behaviour will not require modifications to lots of different tests. 

When creating our tests we can break down the behaviours we are testing in three ways:

* Normal conditions: The normal conditions represent the way we expect the code to be used.
* Unexpected conditions: The unexpected conditions arise when the code is used in unexpected ways.
* Boundary conditions: All programs consume input; by testing boundary values we can ensure our program will successfully operate with the breadth of inputs the program might encounter. 

Ultimately each test should compare an expected value against the actual value produced by the code under test. One easy way to keep code easy to read is to make this explicit within the test, for example:

```javascript
describe('Check math constants', function() {
  it('Math.PI should be close enough to the correct value', function() {
    const expected = 3.1415;
    const actual = Math.PI;
    expect(actual).to.be.closeTo(expected, 0.025);
  });
});
```

#### Assertions and async

Testing asynchronous functions can be challenging as asynchronous code often does not behave as expected at runtime. ***The [Async Cookbook](https://github.com/ubccpsc/310/blob/main/resources/readings/cookbooks/async.md#testAsynchronous) contains many examples of how to test asynchronous code.***

<!--
#### Assertions and async

TODO: talk about handling async in test cases

// not declared as async, need to return the promise
before(() => {
    syncFunction();
    return asyncFunction().then(() => asyncFunction()); // both complete before queries
})

// declared async, can await
before(async () => {
    syncFunction();
    await asyncFunction(); // completes before next line
    await asyncFunction(); // completes before queries
})

// can return multiple w/ promise.all
before(() => {
    syncFunction();
    return Promise.all([
        asyncFunction(), // completes before queries (but maybe after next line)
        asyncFunction(), // completes before queries (but maybe before prev line)
    ]);
})

// can await multiple w/ promise.all
before(async () => {
    syncFunction();
    await Promise.all([
        asyncFunction(), // completes before queries (but maybe after next line)
        asyncFunction(), // completes before queries (but maybe before prev line)
    ]);
})
-->

### Resources

* Concrete example showing how to increase [isolation](http://anzorb.com/unit-tests-102-isolating-your-code-with-mocks-and-stubs/) with mocks and stubs.

* Some best and worst [practices](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/) for writing unit tests.

* Great article on [testability](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters).



---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
