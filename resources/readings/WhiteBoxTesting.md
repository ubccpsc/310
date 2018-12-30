# White box testing

Most common white box testing approaches leverage coverage to help engineers understand which portions of their systems have or have not been tested.

### Coverage

When evaluating the quality of the system we really want insight into how well the system performs its expected tasks and how robustly it responds to unexpected inputs and situations. Unfortunately, measuring this kind of property meaningfully is impossible, so developers often ask a simpler question:

> Does the test suite test the whole system?

Since the system code is supposed to both perform the expected operations and handle unexpected ones, coverage can make sure we are testing both of these aspects of the system. At its core, all coverage tools measure the proportion of the system that is executed by the test suite. Coverage has two properties in particular that make it appealing:

1. It is relatively cheap to compute. In contrast to reasoning about expected and unexpected behaviours, a coverage tool simply needs to track which parts of a program have executed when the test suite is executing.

1. It is actionable. Developers can look at the output of a coverage report, find the parts that are not currently covered by the test suite, and decide how to act upon this information in a straightforward way.

There are many flavours of coverage that are used in practice, here we describe three of them:

* **Statement**: This measures the fraction of the statements of the code that are executed. Statement and line coverage are both the simplest forms of coverage. Statement coverage considers every statement within the system.

* **Decision**: Decision (and branch) coverage checks to make sure that all branching options within the system are executed. For example, decision coverage checks whether both true and false branches of ```if``` statements are executed by the test suite. Decision coverage only measures those program points where execution can take divergent paths within the system.

* **Modified Condition (MCC)**: MCC coverage checks all program entry and exit points along with every combination of decisions within a program. 

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

The code has 60% statement coverage (lines 2, 4, 6), 50% decision coverage (only the false branches of the decisions on lines 2 and 4) and 25% MCC coverage. The following suites would provide 100% coverage for each of the different coverage criteria:

```typescript
// 100% statement coverage
eval(0, true, true);

// 100% decision coverage
eval(0, true, true);
eval(0, false, false);

// 100% MCC coverage
eval(0, true, true);
eval(0, false, false);
eval(0, true, false);
eval(0, false, true);
```

The stronger the coverage criteria, the more stringently we can say the code was covered by the test suite. The greatest shortcoming of coverage however is that while it clearly shows that the suite _executes_ the code under test, it does not show that the code under test is _correct_. This can be clearly seen by our tests above, none of them check that the output from ```eval``` is correct for the inputs given. It is extremely important to keep this shortcoming in mind when thinking about coverage because ultimately we really do care about the correctness of the system over how comprehensively a test suite might execute it.

<!--
### References


On misusing coverage:
http://docplayer.net/102363-How-to-misuse-code-coverage.html

great atlee talk:
https://livestream.com/itmsstudio/events/6919492/videos/147823325?t=1485444595837
-->

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
