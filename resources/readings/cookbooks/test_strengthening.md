# Test Suite Strengthening

Improving your test suite so that it better captures the specification is key to building software that properly reflects its purpose. This cookbook goes through a small worked example of how to use some [black box testing](BlackBoxTesting.md) techniques to strengthen your test suite!

## Example Specification
Write a Typescript function `power` that raises a number `x` to the `n`th power. If any of the inputs is invalid, it should throw an `Error`.


## Equivalence Class Partitioning (ECP)

### Input Partitioning Analyss
#### Existing Test Suite
```javascript
expect(power(2, 3)).to.eq(8);
expect(power(2, -1)).to.eq(0.5);
```
#### Analysis
Looking at our existing test suite, we note two input partitions:

* positive number greater than 1 for `x`, positive number greater than 1 for `n`
* positive number greater than 1 for `x`, negative number for `n`

There are many tests that will *NOT* actually improve our test suite--namely, the ones that pull from these existing input partitions, e.g.:
```javascript
expect(power(4, 10)).to.eq(1048576);
```
which is a positive number greater than 1 for `x`, and a positive number greater than 1 for `n`.

Instead, we should systematically find classes that are different than the ones we have, and then generate a test for each:

* negative number less than -1 for `x`, positive and even number for `n`
* negative number less than -1 for `x`, positive and odd number for `n`

```javascript
expect(power(-2, 3)).to.eq(-8);
expect(power(-2, 4)).to.eq(16);
```

Now we've added two more tests, and have covered two more input equivalence classes!

### Output Partitioning Analyss
```javascript
expect(power(2, 3)).to.eq(8);
expect(power(2, -1)).to.eq(0.5);
expect(power(-2, 3)).to.eq(-8);
expect(power(-2, 4)).to.eq(16);
```
Looking at our new test suite, we note three output partitions:
* positive integer greater than 1 (8 and 16)
* positive number between 0 and 1 (0.5)
* negative integer less than 1 (-8)

Note that despite being in two different input partitions, test cases 1 and 4 are in the *same output partiiton*. This is why using multiple techniques for test suite strengthening is important!

Like in our input partitioning analysis, we want to think of new output partitions that are fundamentally different than what our existing test suite covers:
* 0
* 1
* `Error`

```javascript
expect(power(0, 4)).to.eq(0);
expect(power(2, 0)).to.eq(1);
expect(power(2, "three")).to.throw(new Error('n is not a number!'));
```

## Final Test Suite
After performing our input and output partitioning analyses, we end up with a much stronger test suite!

```javascript
// original tests
expect(power(2, 3)).to.eq(8);
expect(power(2, -1)).to.eq(0.5);

// new tests
expect(power(-2, 3)).to.eq(-8);
expect(power(-2, 4)).to.eq(16);
expect(power(0, 4)).to.eq(0);
expect(power(2, 0)).to.eq(1);
expect(power(2, "three")).to.throw(new Error('n is not a number!'));
```

These tests now cover the following input partitions:
* positive number greater than 1 for `x`, positive number greater than 1 for `n`
* positive number greater than 1 for `x`, negative number for `n`
* negative number less than -1 for `x`, positive and even number for `n`
* negative number less than -1 for `x`, positive and odd number for `n`
* zero for `x`, non-zero for `n`
* non-zero for `x`, zero for `n`
* non-numeral for `n`

...and the following output partitions:
* positive integer greater than 1 (8 and 16)
* positive number between 0 and 1 (0.5)
* negative integer less than 1 (-8)
* 0
* 1
* `Error`

While this test suite is stronger than before, I'm sure you can find many more!

### Challenge
Use input or output partitioning analysis to find at least 3 more equivalence classes!
