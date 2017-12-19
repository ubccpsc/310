# Deliverable 0: TBD

<!--
## Getting the starter code
To be provisioned a repo for this deliverable, you have to log in to [GitHub Enterprise](https://github.ubc.ca) with your CWL. It takes about a day for us to provision the repository after which you will get an email with a link to the repo. Please login as soon as possible so that you have your repo for the second lecture.

## Grading
This will be an individual deliverable (the only one in the project). It is worth 10% of your final grade. We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own. Your work is automatically graded everytime you _push_ to GitHub with the command `git push`. Your grade will be the maximum grade you received from all submissions (commits in git terminology) made before the hard deadline (TBD). While we compute your grade on every submission, you will only be able to request to see your grade once every 12h hours. You can request your grade by mentioning `@autobot` in a commit comment. Refer to [AutoTest.md](AutoTest.md) for additional details. 

You cannot use any library package that is not already specified in package.json. Your implementation must be in TypeScript and must compile without error.

## Requirements
For this deliverable, you will read the [Deliverable 1](Deliverable1.md) specification, extract detailed requirements, and then turn the requirements you identified into a set of tests. Specifically, you will be writing unit tests for the three methods of the `InsightFacade` class in `./src/controller/InsightFacade.ts`. DO NOT modify any files under the `src/` directory -- you are only writing unit tests under the `test/` directory. 

Your grade on this deliverable is simply the number of lines of code of our reference solution that your tests cover relative to our test suite (which covers 75% of the reference solution). Thus, your grade = your coverage / our coverage * 100%. If _any_ of your tests pass when given invalid/unexpected results, this indicates that your tests are ineffective (i.e. they always pass regardless of behaviour of the code under test, which is the default behaviour) and you will receive a grade of 0. The starter code contains an invalid "implementation" of the D1 spec so all of your tests should **fail** when you run them locally.

You should be strategic when writing your tests so that you maximize coverage with as few tests as possible. Since the methods in InsightFacade handle complicated logic, you will need to cleverly construct a set of inputs that causes all of the logic in the method to be executed. These tests will form the basis of your personal test suite for the remainder of the project. 

Because you have no way of checking how much of the reference solution your are covering on your local computer, you will need to rely on [AutoTest](AutoTest.md) to determine your progress. This service is rate limited so you will want to **start early**.

## Writing tests
We will be using the [Mocha Test Environment](https://mochajs.org/) with [Chai Expectations](http://chaijs.com/api/bdd/) for testing. Below are the two tests given in the starter code. They are functionally equivalent but use different language features. You should pick the style you are comfortable with and use it consistently when writing your tests.

While the tests may seem intimidating (largely due the asynchronous nature of the methods we are testing), you will mostly be able to copy and paste tests, only having to make small changes. Also, you can read through the resources in the next section and come to the tutorial during the second lecture.

```JS
    it("Should add the courses dataset", function () {
        const id: string = "courses";
        const path: string = datasets[id];

        // Start reading the file that contains our data...
        return TestUtil.readFileAsync(path).then(function (content: Buffer) {
            // once the file has been read, we can add it to our InsightFacade... 
            return insightFacade.addDataset(id, content.toString('base64')).then(function (response: InsightResponse) {
                // once the dataset has been added, we can check the return value of the addDataset is as expected.
                Log.test("Response from addDataset was " + JSON.stringify(response));
                expect(response.code).to.equal(204);  // Note the status code
            });
        }).catch(function (err: any) {
            TestUtil.reportError(err);
            expect.fail();
        });
    });
```

```JS
    it("Should add the courses dataset again", async () => {
        const id: string = "courses";
        const path: string = datasets[id];

        try {
            // Wait here until the file that contains our data has been read...
            const content: Buffer = await TestUtil.readFileAsync(path);
            // Then, wait here until we get the response from addDataset...
            const response: InsightResponse = await insightFacade.addDataset(id, content.toString('base64'));
            // Finally, we can check that the result is as expected.
            Log.test(`Response from addDataset was ${JSON.stringify(response)}`);
            expect(response.code).to.equal(201);  // Note the status code
        }
        catch (err) {
            TestUtil.reportError(err);
            expect.fail();
        }
    });
```

## Resources
  - [Git Tutorial](../resources/git.md)
  - [TypeScript/JavaScript Tutorial](../resources/typescript.md)
  - [Asynchronous Development Tutorial](../resources/async.md)
  - [Promises Tutorial](../resources/promises.md)

-->


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