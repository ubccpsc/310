# Black box testing

Black box testing approaches are used when the tester does not have (or is electing not to use) any knowledge about the implementation of the system under test. Instead of deriving test cases by examining the implementation as in white box testing, in black box testing the tester uses the specification for the code under test and validates that that the output is correct (according to the specification) for a given set of inputs.

There are a variety of black box testing approaches that are used in practice:

* `Boundary value analysis (BVA)`: Most functions can take an unbounded number of inputs. BVA seeks to identify which of those are most valuable to test. The intuition behind this process is that inputs at the *boundary* of an input domain are more likely to be problematic than those that are not. 

 For example, when testing a numeric input that accepts values `1..10`, natural inputs outside the boundary would include `0` and `11` while natural inputs within the boundary could include `1` and `10`. BVA can also be applied to more complex types, such as dates with specified formats (e.g., `YYYY-MM-DD`). Similarly, BVA can also take place on objects. For example: 
 
 ```typescript
user: {
   username: string, 
   password: string
}
 ```
  where `username` and `password` have specific restrictions on what inputs are valid.

* `Equivalence class partitioning (ECP)`: While testing at the boundaries is useful and often uncovers subtle defects, it is also useful to test more commonly expected inputs to ensure that the code under test is behaving as expected. As with boundary value analysis, equivalence class partitioning seeks to decrease the input space from all possible inputs to a reasonable subset of inputs. To do this, inputs are decomposed into *classes*, and testers ensure that at least one input from each class is validated.  

 For the numeric function that takes a values `1..10` in the BVA paragraph above, the classes for this input would be `[n < 1, 1 < n < 10, n > 10]`. While there are similarities to BVA, the focus on ECP is not to test explicitly at the boundaries but to choose a reasonable value from each partition (e.g., `[-5, 5, 15]` for this example). Usually testers will consider values using both ECP and BVA simultaneously to ensure broad coverage of the input space without making a strong distinction between the two.

* `State transition testing`. This kind of black box testing requires the tester to identify the states, or modes, the program will assume at runtime, determine how the program flows between these states, and then test that the program behaves as expected during these transitions.

 For example, imagine a system for an electronic lock. Such as system would have two natural states: `open` and `closed`. The only valid transition from `closed->open` is through the provisioning of a valid credential, while `open->closed` may happen when the door is closed or after some timeout. In state transition testing, each of these behaviours are validated through explicit test cases.
 
* `Use case testing`: Finally, use case testing is a form of black box testing that tries, as much as possible, to simulate user interaction with the system. While use case testing often validates the *happy path* where the most common and expected inputs are validated to ensure the system behaves as expected. Use case tests though can also simulate both *untrained an adversarial* users to try to exercise the system in ways these users might as well in an effort to ensure both expected and unexpected use cases are handled in a way that makes sense from a user's perspective.

<!--
INPUT / OUTPUT Partitioning here
-->

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)


