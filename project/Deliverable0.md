# Deliverable 0: TDD Individual Deliverable

### Final Submission: September 17 @ 1800

Test-driven development (TDD) is one [modern technique](../readings/Process.md#tdd) for building software. As the name suggests, engineers write tests for every requirement in the specification _before_ they create the implementation. This makes it much easier to final product has at least a base level of testing.

In terms of the course project, adopting TDD will ensure you understand all the requirements of the specification before getting buried in the details of your implementation. This is important because implementing code that doesn't meet the requirements _will_ increase the amount of work you need to do for the project.

In this deliverable you will be reading a specification and writing a set of tests against that spec. To evaluate the completeness of your test suite for the spec we will execute your suite against our own system to measure how well your tests [cover](../readings/Testing.md#coverage) our implementation.

## Getting the starter code

You need to log in to [GitHub Enterprise](https://github.ugrad.cs.ubc.ca) with your ugrad account **ASAP** so that we can provision your repo after lecture on Sept 6. Also for Sept 7, ensure that you have prepared your computer according the [setup guide](../resources/setup.md) (also found in the README of your provisioned repo).

Once your repo has been created, you'll receive an email with a link to clone your repo. For this course, you will be using Git to manage your code. A description of how to use Git is given in our brief [Git Tutorial](../resources/git.md).

## Requirements

For this deliverable, you will read the [Deliverable 1](Deliverable1.md) specification, extract detailed requirements, and then turn the requirements you identified into a set of tests. Specifically, you will be writing unit tests for the three methods of the `InsightFacade` class in `./src/controller/InsightFacade.ts`. You should not modify any files under the `src/` directory.

Your grade will be computed using the following formula which is explained below:
> 0.8 * (coverage percentage)^2 + 0.2 * percentage of valid tests

As you can see, your grade for this deliverable is largely based on how much of the reference solution your tests cover. Because it can be relatively easy to cover up to 80% of the reference implementation but difficult to cover all 100%, the percentage of covered lines will be squared when computing your grade. To ensure that you write effective tests (tests that have proper asserts that are actually checked), some of your grade will based on the percentage of tests that pass and fail as expected. Specifically, your tests should fail when you run them locally against the invalid implementation of InsightFacade provided in the starter code but pass when run against a valid implementation on [AutoTest](AutoTest.md). Note that in this project, _tests pass by default_ if you don't include or check assertions in your tests. Therefore, you must make sure you have explicitly defined asserts for every code path in every test and that the asserts check the correct conditions. These tests will form the basis of your personal test suite for the remainder of the project.

Because you have no way of checking how much of the reference solution your are covering on your local computer, you will need to rely on AutoTest to determine your progress. This service is rate limited so you will want to **start early**.

## Developing your deliverable

We will be using the [Mocha Test Environment](https://mochajs.org/) with [Chai Expectations](http://chaijs.com/api/bdd/) for testing. You should add additional tests to `test/InsightFacade.spec.ts` and execute them with `yarn test`. Since `InsightFacade` is not correctly implemented in the starter code, any tests you add should **_FAIL_**.

To fully test the `addDataset` method, you'll need to generate additional zip files with differing content.
We recommend you place all of your test zip files in `test/data` and follow the test structure already in place in `InsightFacade.spec.ts`.
Specifically, you can add your additional zip files to the `datasets` object and then test `addDataset` against each of your zip files by duplicating the "Should add the courses dataset" test.

When writing tests for the `performQuery` method, you will find that the tests have a common structure: define a query to test and the corresponding results and check that `performQuery` returns the correct results for the given query.
To simplify this process (and to ensure that `InsightFacade.spec.ts` file doesn't become cluttered) we have included the ability to define test queries and results in separate files.
These files are used to automatically generate tests that check whether the query returns the correct results.
Thus, in addition to writing tests in `InsightFacade.spec.ts` using `it()`, you can also write tests for `performQuery` by creating new json files in `test/queries`.
See the two examples `q1.json` and `q2.json` already included to get a sense of the JSON structure (which is explicitly defined in `query.schema.json`).
As you add more valid JSON files to `files/queries` you'll see that the number of tests that are run increases which is a sign that things are working as expected.

## Getting your grade

This will be an individual deliverable (the only one in the project). It is worth 10% of your final grade. We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own. Your project is automatically graded every time you _push_ to GitHub with the command `git push`. Your grade will be the maximum grade you received from all submissions (commits in git terminology) made before the hard deadline (Sept 17). While we compute your grade on every submission, you will only be able to request to see your grade once every 12h hours. You can request your grade by mentioning `@autobot` in a commit comment. Refer to [AutoTest.md](AutoTest.md) for additional details.

You cannot use any library package that is not explicitly specified in package.json. Your implementation must be in TypeScript and must compile without error.

## Resources

- [Git Tutorial](../resources/git.md)
- [TypeScript/JavaScript Tutorial](../resources/typescript.md)
- [Asynchronous Development Tutorial](../resources/async.md)
- [Promises Tutorial](../resources/promises.md)

<!-- D1 coverage for reference solution (can be deleted)
  50 passing (8s)

-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
All files              |    70.66 |    71.57 |       68 |    70.66 |                |
 src                   |    83.33 |      100 |       80 |    83.33 |                |
  Util.ts              |    83.33 |      100 |       80 |    83.33 |             30 |
 src/controller        |    82.62 |    73.74 |    87.67 |    82.62 |                |
  DatasetController.ts |    65.52 |    50.72 |    75.76 |    65.52 |... 298,299,307 |
  InsightFacade.ts     |    98.08 |      100 |      100 |    98.08 |             89 |
  QueryController.ts   |       91 |    85.37 |    96.77 |       91 |... 288,327,348 |
 src/rest              |    11.11 |        0 |        0 |    11.11 |                |
  RouteHandler.ts      |    10.87 |        0 |        0 |    10.87 |... 83,84,85,87 |
  Server.ts            |    11.43 |        0 |        0 |    11.43 |... 93,96,97,98 |
-----------------------|----------|----------|----------|----------|----------------|
-->
