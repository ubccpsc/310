# Glass box testing

Most common glass box testing approaches leverage coverage to help engineers understand which portions of their systems have or have not been tested. While glass box testing approaches are more commonly used than black box approaches, they can suffer from _confirmation bias_ in that by looking at an implementation, you are more likely to make similar assumptions as the author of the code being tested and miss important test cases. This bias can be helpful though if you are striving for high-coverage in a system you wish to be a reliable indicator for a regression suite as it enables you to be more confident that you are testing all behaviours currently handled by an implementation to ensure they continue to behave similairly as the code evolves.

### Coverage

When evaluating the quality of the system we really want insight into how well the system performs its expected tasks and how robustly it responds to unexpected inputs and situations. Unfortunately, measuring this kind of property meaningfully is impossible, so developers often ask a simpler question:

> Does the test suite test the whole system?

Since the system code is supposed to both perform the expected operations and handle unexpected ones, coverage can make sure we are testing both of these aspects of the system. At its core, all coverage tools measure the proportion of the system that is executed by the test suite. Coverage has two properties in particular that make it appealing:

1. It is relatively cheap to compute. In contrast to reasoning about expected and unexpected behaviours, a coverage tool simply needs to track which parts of a program have executed when the test suite is executing.

1. It is actionable. Developers can look at the output of a coverage report, find the parts that are not currently covered by the test suite, and decide how to act upon this information in a straightforward way.

There are many flavours of coverage that are used in practice, here we describe four of them:

* **Line**: Line coverage measures the fraction of lines of code that are executed by a set of test cases. When calculating line coverage the denomiator reflects _executable_ lines; these include function definions (for parameter assignment), and implicit returns (if applicable) while excluding whitespace, comments, and lines containing only charaters that do not actually execute (e.g., braces).

* **Statement**: This measures the fraction of the statements of the code that are executed. Statement coverage is slightly stronger than line coverage in that it requires all statements on a line to be executed to satisfy the coverage condition.

* **Branch**: Branch coverage ensures that both conditions of all branch points are executed by the test suite. For example, branch coverage measures whether both true and false branches of ```if``` statements are executed by the test suite. 

* **Path**: A more stringent form of coverage ensures that all program _paths_ are exercised. This almost always requires more test cases than branch coverage as we need to evaluate not only the true/false branches of every conditional, but also every combination of paths between all conditional outcomes.

For example, given the test and code snippet below:

```typescript
1: eval(x: number, c1: boolean, c2: boolean): number {
2:  if (c1)
3:    x++;
4:  if (c2) 
5:    x--;
6:  return x;
7: }
```

And the following test: 

```typescript
1:	eval(0, false, false);
```

The code has 67% line and statement coverage (lines 1, 2, 4, 6 are covered while lines 3 and 5 are not), 50% branch coverage (only the false branches of the ```if``` statements on lines 2 and 4 are covered), and only 25% of possible program paths are covered. The following suites would provide 100% coverage for each of the different coverage criteria:

```typescript
// 100% line coverage
eval(0, true, true);

// 100% statement coverage
eval(0, true, true);

// 100% branch coverage
eval(0, true, true);
eval(0, false, false);

// 100% path coverage
eval(0, true, true);
eval(0, false, false);
eval(0, true, false);
eval(0, false, true);
```

The stronger the coverage criteria, the more stringently we can say the code was covered by the test suite. The greatest shortcoming of coverage however is that while it clearly shows that the suite _executes_ the code under test, it does not show that the code under test is _correct_. This can be clearly seen by our tests above, none of them check that the output from ```eval``` is correct for the inputs given. It is extremely important to keep this shortcoming in mind when thinking about coverage because ultimately we really do care about the correctness of the system over how comprehensively a test suite might execute it. This is one of the main reasons why why defects are frequently found in code that is covered by the test suite: specifying and checking assertions of correctness on code is often harder than deriving the inputs required to cover it in the first place.

<!--
TODO: Mutation testing
### Mutation testing
-->

### References


* It can be easy to over-rely on coverage as a measure of test effectiveness. Brian Marick has written a great essay on [How To Misuse Code Coverage](http://www.exampler.com/testing-com/writings/coverage.pdf) that talks about many of these pitfalls.

* Jo Atlee has a long-form talk on [detecting and resolving software errors](
https://livestream.com/itmsstudio/events/6919492/videos/147823325?t=1485444595837) that provides additional insight into how coverage is just one piece of a comprehensive testing strategy.

* Walmart Labs has a nice post on how to interpret coverage reports to [address coverage shortcomings](https://medium.com/walmartlabs/do-you-have-100-code-coverage-10c09a44832b) with straigthforward code examples.

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
