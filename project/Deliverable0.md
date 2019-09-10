# Deliverable 0: TDD Individual Deliverable


Test-driven development (TDD) is one [modern technique](../readings/Process.md#tdd) for building software. As the name suggests, engineers write tests for every requirement in the specification _before_ they create the implementation. This makes it much easier to ensure the final product has at least a base level of testing.

In terms of the course project, adopting TDD will ensure you understand all the requirements of the specification before getting buried in the details of your implementation. This is important because implementing code that doesn't meet the requirements _will_ increase the amount of work you need to do for the project.

In this deliverable you will be reading a specification and writing a set of tests against that spec. To evaluate the completeness of your test suite for the spec we will execute your suite against our own system to measure how well your tests [cover](../readings/Testing.md#coverage) our implementation.

## Getting the starter code

You need to log in to [GitHub Enterprise](https://github.students.cs.ubc.ca) with your CWL account to view and clone your repo (you should have also been emailed a link). For this course, you will be using Git to manage your code. A description of how to use Git is given in our brief [Git Tutorial](https://github.com/ubccpsc/310/blob/master/resources/other/git.md). Before starting, ensure that you have prepared your computer according the [setup guide](https://github.com/ubccpsc/310/blob/master/resources/other/setup.md) (also found in the README of your provisioned repo).

## Requirements

For this deliverable, you will read the [Deliverable 1](Deliverable1.md) specification, extract detailed requirements, and then turn the requirements you identified into a set of tests. Specifically, you will be writing unit tests for the four methods of the `InsightFacade` class in `./src/controller/InsightFacade.ts`. You should not modify any files under the `src/` directory.

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
See the provided example queries already included to get a sense of the JSON structure.
As you add more valid JSON files to `files/queries` you'll see that the number of tests that are run increases which is a sign that things are working as expected.

You can also feel free to make tests that don't use these provided stuctures when making your tests, for example if you think of a scenario that you don't feel is easy to test using our starter code.

There is a [reference UI](https://cs310.students.cs.ubc.ca/ui/index.html) to help with generating query test results.

## Getting your grade

This will be an individual deliverable (the only one in the project). It is worth 10% of your final grade. We will check for [copied code](https://github.com/ubccpsc/310/blob/2019sept/README.md#derivative-copied-code) on all submissions so please make sure your work is your own. Your project is only graded after you _push_ to GitHub with the command `git push` and invoke AutoTest on the branch/commit you want evaluated. Your grade will be the maximum grade you received from all grading requests (commits in git terminology) made before the hard deadline. <!-- While we compute your grade on every submission, --> You will only be able to request AutoTest to grade a commit once every 12h hours; you can request this by mentioning `@autobot` in a commit comment. Refer to [AutoTest.md](AutoTest.md) for additional details.

You cannot use any library package that is not explicitly specified in package.json. Your implementation must be in TypeScript and must compile without error.

## Resources

- [Git Tutorial](https://github.com/ubccpsc/310/blob/master/resources/other/git.md)
- [TypeScript/JavaScript Tutorial](https://github.com/ubccpsc/310/blob/master/resources/other/typescript.md)
- [Asynchronous Development Tutorial](https://github.com/ubccpsc/310/blob/master/resources/other/async.md)
- [Promises Tutorial](https://github.com/ubccpsc/310/blob/master/resources/other/promises.md)

## FAQ

**Q. Lots of this is new to me (especially TypeScript), how should I get caught up?**

A. I would start with taking a look at the resource files first, and the links inside them. 
Google as always is an excellent resource, as most things used in this course are fairly popular and well documented. 
And don't worry, we expect much (if not most) of this to be new, and that's factored in to the challenge of the initial assignments.

 

**Q. I've logged in to GitHub, but don't have a repo?**

A. Make sure to logged into [github.students.cs.ubc.ca](github.students.cs.ubc.ca) with your csid, not [github.com](github.com) or [github.ubc.ca](github.ubc.ca). Repo provisioning is done in batches. If you still don't have a repo then, please make a Piazza post with your csid. 
Also take a look at your profile and see if you see the CPSC310-2019W-T1 organization, you may have a 'team' (of one) in that owns the repo.

 

**Q. I'm currently not able to register in a lab, what should I do?**

A. If there's no lab that doesn't conflict with your schedule that has space, you will need to talk to academic advising to have them put you into a lab. 
In the meantime for the first week, you should go to a lab even if you are not registered in it.

 

**Q. How should I format my tests?**

A. You can use the async/await syntax like in the bootstrap,
```typescript
it("Should do something", async () => {
    let response: type;
    try {
        response = await insightFacade.methodName(params);
    } catch (err) {
        response = err;
    } finally {
        expect(response).to.deep.equal(expectedValue);
    }
});
```
or you can return the promise created by your function call, and use appropriate expect statements in the `then()` and `catch()` blocks. For example:
```typescript
it("Should do something", () => {
    return insightFacade.methodName(params).then(function (response: type) {
        expect... /* OR */ expect.fail() // Depending if it was supposed to resolve or reject
    }).catch(function (response: type) {
        expect... /* OR */ expect.fail() // Depending if it was supposed to resolve or reject
    });
});
```
 
**Q. How should I create expected output for performQuery?**

A. You can use your [reference UI](https://cs310.students.cs.ubc.ca/ui/index.html) and copy the result output.

**Q. My coverage on the bot just dropped significantly, but is good locally?**

A. In almost all cases, this means you have a zip file locally that you didn't commit but reference in your spec file. 
When the bot tries to load it an error will be thrown, and none of your queries will be run.

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
