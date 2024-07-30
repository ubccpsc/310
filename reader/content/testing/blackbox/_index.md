---
linkTitle: "Black Box"
title: "Black Box Testing"
weight: 4
---


Black box testing approaches are used when the tester does not have (or is electing not to use) any knowledge about the implementation of the system under test. Instead of deriving test cases by examining the implementation as in glass box testing, in black box testing the tester uses the specification for the code under test and validates that the output is correct (according to the specification) for a given set of inputs.

There are a variety of black box testing approaches that are used in practice:

* **Boundary value analysis (BVA)**: Most functions can take an unbounded number of inputs. BVA seeks to identify which of those are most valuable to test. The intuition behind this process is that inputs at the *boundary* of an input domain are more likely to be problematic than those that are not. 

  For example, when testing a numeric input that accepts values `1..10`, natural inputs outside the boundary would include `0` and `11` while natural inputs within the boundary could include `1` and `10`. BVA can also be applied to more complex types, such as dates with specified formats (e.g., `YYYY-MM-DD`). Similarly, BVA can also take place on objects. For example: 
   ```typescript
	 const user: {
	   username: string;
	   password: string;
	 }
   ```
   Where `username` and `password` have specific restrictions on what inputs are valid. {{< youtube IRQU_fHKUa0 >}}

* **Equivalence class partitioning (ECP)**: While testing at the boundaries is useful and often uncovers subtle defects, it is also useful to test more commonly expected inputs to ensure that the code under test is behaving as expected. As with boundary value analysis, equivalence class partitioning seeks to decrease the input space from all possible inputs to a reasonable subset of inputs. To do this, inputs are decomposed into *classes*, and testers ensure that at least one input from each class is validated.  

    For the numeric function that takes a values `1..10` in the BVA paragraph above, the classes for this input would be `[n < 1, 1 < n < 10, n > 10]`. While there are similarities to BVA, the focus on ECP is not to test explicitly at the boundaries but to choose a reasonable value from each partition (e.g., `[-5, 5, 15]` for this example). Usually testers will consider values using both ECP and BVA simultaneously to ensure broad coverage of the input space without making a strong distinction between the two. Additional detail about the two most common ECP strategies are given below in [Input partitioning](#input) and [Output partitioning](#output). {{< youtube ttAAsNSPiXw >}}

* **State transition testing**: This kind of black box testing requires the tester to identify the states, or modes, the program will assume at runtime, determine how the program flows between these states, and then test that the program behaves as expected during these transitions.

    For example, imagine a system for an electronic lock. Such as system would have two natural states: `open` and `closed`. The only valid transition from `closed->open` is through the provisioning of a valid credential, while `open->closed` may happen when the door is closed or after some timeout. In state transition testing, each behaviour is validated through explicit test cases.
 
* **User acceptance testing**: Finally, use case testing / user story testing is a form of black box testing that tries, as much as possible, to simulate user interaction with the system. While use case testing often validates the *happy path* where the most common and expected inputs are validated to ensure the system behaves as expected. Use case tests though can also simulate both *untrained and adversarial* users to try to exercise the system in ways these users might as well in an effort to ensure both expected and unexpected use cases are handled in a way that makes sense from a user's perspective.

	Use case testing is similar to a customer validating a user story by evaluating the definitions of done for a story in a sprint review. In this way use case testing and user story testing form a kind of user acceptance test.

<a name="input"></a>
## Input partitioning

{{< youtube 5PtxXnwyU3Y >}}

Input partitioning is a black box testing technique that strives to find value partitions for a function based on the inputs for the function.

The main idea behind input partitioning is to group the input space of a function into equivalence classes, which are distinct sets of inputs derived from the specification of the function. These groups are usually chosen based on the function's input parameters. We then ensure that each equivalence class is validated at least once. A few examples of input partitioning are shown below:

### Example 1

```typescript
/**
 * Returns the PNE ticket price for the corresponding age.
 * 
 * REQUIRES: age is a natural number
 * EFFECTS:  if age < 5, return 0
 *           if age >= 5 and age < 19, return 20
 *           if age >= 19 and age < 65, return 40
 *           if age >= 65, return 15
 */
function getTicketPrice(age: number): number {
    // implementation hidden
}
```

Testing the entire input space for the function above is unreasonable, given that there are an unbounded number of natural numbers to evaluate. Instead, input partitioning can be used to decompose the input space according to the specification. There are 4 groups of natural numbers that the specification defines, and the equivalence classes can be generated as 0-4, 5-18,
19-64, and 65+. A comprehensive test suite for these equivalence classes would have a test case that tests a value 
between 0 and 4, 5 and 18, 19 and 64, and a value greater than 65 to ensure the correct value is returned for each.

### Example 2

```typescript
/**
 * Returns the square root if the input number is a perfect square. 
 * Throws a NotPerfectSquareError if input number is negative or is not a perfect square.
 */
function getPerfectSquareRoot(input: number): number {
    // implementation hidden
}
```

Examining the specifications above, we can partition the input space into three equivalence classes: positive numbers that are
a perfect squares, positive numbers that are not perfect squares, and negative numbers. An example test suite would be the test cases 16 (positive perfect square), 10 (positive number that is not a perfect square), and -5 (negative number).

### Example 3

```typescript
enum Player {
    A, B
}

/**
 * Returns whether the given player is allowed to move with the given speed.  
 * Player A can only have a positive speed (moving right) and 
 * Player B can only have a negative speed (moving left).
 */
function isValidDirection(player: Player, speed: number): boolean {
    // implementation hidden
}
```

Creating equivalence classes for functions with multiple inputs requires combining the classes for each individual input. There are 2 input classes for `player` (A, B) and 2 classes for `speed` (positive number, negative
number). The final step is combining the sets to arrive at four test cases, as each input class is assigned another input class. The test cases {A, positive number}, {A, negative number}, {B, positive number}, {B, negative number} are obtained for this example function, covering the input partitions.

### Strengths

* Input partitioning is a black box testing technique, which means that the implementation of the function is not required to validate its behaviour. Not only does this make this technique more flexible, but it can also avoid confirmation biases that can occur when constructing test cases for code you authored or have viewed.
* Although input partitioning is a black box approach, it provides a systematic means to derive inputs that are likely to correspond to different code blocks within an implementation.
* For many functions, the input space could be very large, or even infinite. Input partitioning simplifies these large domains into a more approachable set of inputs.

### Caveats

* Input partitioning is dependent on the specification. If the specification is incomplete or the implementation deviates from the specification, the inputs chosen by input partitioning may miss important cases that should be tested.
* Sometimes the inputs to a function are less interesting than the outputs; in these cases, output partitioning may be a better choice.
* Defects often arise at the boundaries of partitions. Input partitioning is often combined with boundary value analysis to cover these cases more comprehensively.
  
<a name="output"></a>
## Output partitioning 

{{< youtube 0yvHDKI-DSA >}}

Similar to input partitioning, output partitioning provides a mechanism for a developer to systematically explore a domain of inputs for a function. In contrast to input partitioning though, these inputs are driven by the outputs of a function. Although input partitioning is more commonly used than output space partitioning, output partitioning allows the tester to analyze the function from a different perspective, which is often useful when the output of a function is more interesting than its inputs.

### Example 1

```typescript
/**
 * Turns a number of seconds into a 24 hour time format.
 *
 * REQUIRES: 0 <= seconds < 86400
 *
 * EFFECTS: returns a string of the format "HH:MM:SS:, where H,M,S are digits.
 * 	           if H==0, return string format "MM:SS"
 *	           if H==0 && M==0, return string format "SS"
 */
function timeAfterSeconds(seconds: number): string {
    // implementation hidden
}
```

The input specification for this function is relatively straightforward (e.g., there is one partition as the number of seconds is bound by the REQUIRES clause) resulting in single input partition [0, 86399]. In contrast, there are several output partitions:

* Output string has format "HH:MM:SS"
* Output string has format "MM:SS"
* Output string has format "SS"

To test these three output partitions, the tester needs to derive inputs to achieve the given output; this extra step is one reason why output partitioning is slightly more complicated than input partitioning (although this step is trivial for this example).

### Example 2

```typescript
/**
 * Given a start time and a finish time (both in seconds), return the speed of a 100 meter short distance run. Throw an exception if startTime < finishTime.
 *
 * REQUIRES: startTime, finishTime >= 0
 * 
 */
function speedOfShortDistance(startTime: number, finishTime, number): number {
    // implementation hidden
}
```

The inputs to these functions are just both non-negative numbers. But the outputs add the constraint about `finishTime` being later than `startTime`. While this could result in two output partitions, one valid and one testing this extra output constraint, it would not be unreasonable to also validate the case where `startTime` and `finishTime` are equal. Although this _should_ be treated the same as the already-validated error case, it would certainly be worth validating. NOTE: combining output partitioning with boundary value analysis would have also surfaced this condition.

### Strengths

* The greatest strength of output partitioning is that it focuses tests on observable outputs. This is a strength because users of a function expect the kinds of outputs they observe to be correct.
* Output partitioning can encourage a developer to approach their tests in a different way than input partitioning alone which can lead to a better diversity of test cases while still staying within a reasonable number of test cases.

### Caveats

* Functions usually have fewer outputs than inputs (simplistically a function has a single output value and can have many input parameters). This usually drives testers to explore 'easier' input space more thoroughly than the output space (although it should be noted that the complexity of the output space is often underestimated, and the 'single' return value could in fact be a complex object or side effecting operation).
* The effort required to derive inputs to achieve a given output is often challenging. This can be especially observed in erroneous situations (e.g., an output behaviour dictates how a system should behave when disk space is exhausted, but actually testing this can be hard).

  
---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)


