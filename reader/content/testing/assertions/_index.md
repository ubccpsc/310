---
title: "Assertions"
weight: 1
---


{{< youtube DCAFxgUXM4I >}}

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
expect(arr).to.contain('c');
expect(arr.indexOf('c') >= 0).to.equal(true);
```

But the error message for first assertion failing is more direct and understandable for the second. While this may not seem important for such a contrived example, for real, complex, failures more specific error messages can greatly simplify the process of understanding why an assertion failed.

```javascript
// Corresponding failures
AssertionError: expected [ 'a', 'b' ] to include 'c'
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

{{< youtube Y0GEftJ5MB0 >}}


[//]: # (#### Assertions and async)
{{% notice tip %}}
Testing asynchronous functions can be challenging as asynchronous code often does not behave as expected at runtime. ***The [Async Cookbook](https://github.com/ubccpsc/310/blob/main/resources/readings/cookbooks/async.md#testAsynchronous) contains many examples of how to test asynchronous code.***
{{% /notice %}}

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
