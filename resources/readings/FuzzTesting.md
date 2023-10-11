# Automated testing

Testing is a laborious and error-prone process. The idea behind automated testing is to automated some aspects of the test *writing* process. One automated testing strategy that is popular in industry is called fuzz testing, or fuzzing.

# Fuzz testing

Fuzz testing concerns itself with programmatically generating inputs to a system/code under test (SUT/CUT) in a way that uses some elements of randomness. Some fuzzing strategies are black-box. This means that they require no information about the SUT. Most advanced fuzzing strategies, however, are grey-box or glass-box. These strategies use feedback about the execution of the SUT, such as code coverage, to improve their input generation process.

Fuzzing is often used to test a simple specification of the SUT: that the system does not crash. That is, fuzzing is used to find segmentation faults or other types of runtime errors. Additional specifications are necessary for fuzzing to check more advanced types of correctness properties, such as whether or not the SUT computes the right value.

At the high level, fuzzing (1) generates an input, (2) executes the SUT with the generated input, (3) observes if the SUT has crashed, and (4) if the SUT did not crash, fuzzing goes back to step (1).

In what follows we describe three black-box fuzzing approaches: random fuzzing, generator-based fuzzing, and mutational fuzzing.

#### Random fuzzing

Random fuzzing involves choosing inputs completely at random. Usually the SUT requires that the input is of a particular type, like a string or an integer. In this case, random fuzzing will choose a well-typed random input.

An advantage of random fuzzing is that it is simple to implement. Also, random fuzzing can generate unexpected inputs -- those that exercise paths in the code that are unlikely to be exercised in practice by users.

A disadvantage of random fuzzing is that the generated inputs may be *too* random. For example, when fuzzing a program like an XML parser, random fuzzing is unlikely to generate strings that are valid XML. As a result, on programs that require highly structured inputs (like XML), random fuzzing is unlikely to reach code logic beyond the input validation stage.

#### Generator-based fuzzing

Generator-based fuzzing is an approach to improve on random fuzzing. This approach requires that a developer writes an input generator that generates inputs that are (1) random, and (2) valid for the SUT.

For example, to test an XML parser, the developer can write a generator to output random XML structures. The resulting XML structures may have random tags, random amount of nesting, etc. But, because they would be valid XML, they would exercise more new paths in the XML parser than would be exercised with random fuzzing.

A challenge with generator-based fuzzing is that a developer must write code for an effective input generator. If the developer writes a generator that is overly constrained and generates a limited number of inputs, then fuzzing with the generator would have limited reach in the SUT.

More broadly, generator-based fuzzing is an example of an input/test generation technique that relies on knowing the input specifications of the SUT. Other techniques in this space include property-based testing and grammar-based fuzzing. For example, property-based testing is like generator-based fuzzing, but typically with richer assertions in the SUT.


#### Mutational fuzzing

Mutational fuzzing is another approach to improve on random fuzzing. With mutational fuzzing a developer defines *mutations*, which are operations that transform one input into another, slightly different input. For string-like inputs, a set of standard mutations can be applied, such as insert-char, delete-char, and duplicate-char. These mutations can then be applied to a seed input that is a valid input to a SUT to generate more inputs that are both valid and invalid (e.g., valid XML and invalid XML inputs).

For example, given a seed string like ```<bar>f</bar>```, a duplicate-char mutation may produce a string like ```<baar>f</bar>``` (invalid XML). On the other hand, an insert-char mutation may produce a string like ```<bar>ff</bar>``` (valid XML).

A challenge with mutational fuzzing is selecting a seed input to mutate. This seed is often an example of an input that a user would provide, or it is an input extracted from a human-written test.

Another challenge with mutational fuzzing is defining the set of mutations and a policy to determine whether and how often mutations can be applied on top of one another.

Note: be careful and do not confuse mutational fuzzing with mutation testing. These are unrelated concepts.

### Resources

* [The fuzzing book](https://www.fuzzingbook.org/) contains runnable examples and explains the various types of fuzzing.


---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Ivan Beschastnikh](https://www.cs.ubc.ca/~bestchai/)
