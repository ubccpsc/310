# AutoTest

AutoTest is a mechanism for validating your project deliverables. It uses _exactly_ the same mechanism to validate your code as most industrial teams use: automated testing. In our case we are using the [Mocha Test Environment](https://mochajs.org/) with [Chai Expectations](http://chaijs.com/api/bdd/) for unit tests and [IcedFrisby](https://www.npmjs.com/package/icedfrisby) for integration tests. Automation is a cornerstone of continuous integration practices which enable teams to quickly and confidently evolve their software systems while retaining trust in its operability.

While we will evaluate your code with a private suite, you should also create a personal suite to validate your code yourself.

### Personal suite

The personal suite exists for three main purposes: 

* To provide a way for you to ensure your code passes the tests _you_ think are important from the deliverable specification.

* To provide a way for you to debug your code in a repeatable way.

* To enable you to test your deliverable repeatedly without incurring the rate limiting mechanism of the private test suite.

### Private suite

The private suite exists for one purpose:

* To comprehensively validate the functionality of your system. 

The private suite will contain dozens of tests that will test both regular and exceptional behaviours. The private suite has two levels; in the first level we will execute your code with the dataset we gave you. In the second level we will use a new dataset to ensure you have not hard-coded shortcuts into your solution to pass the suite with the provided data set. You will get much more feedback about the first level tests than the second level tests.

### Testing your own code

The private suites is an *integration* suite; that is they test your code only from the public InsightFacade and REST endpoints provided by your app. While you can create integration tests with your personal suite, you can also create unit tests. Unit tests will be much faster and easier for you to diagnose incorrect behaviours in your code. 

Unit tests are also the best way to run your system without invoking the whole REST server and invoking your system with curl. If you just want to test one specific method or class, this is the way to do it.

Learning how to write effective test cases takes time and practice. It is best to think about both common cases, so you can ensure your code works correctly, and edge cases, so you can make sure your code handles failures correctly and gracefully. You can be sure that the private suite will execute a wide variety of tests, just as a real customer would if they were actually using your code in production. Careful test suite construction is required to check and validate that your program behaves correctly. While the suite has obvious utility for the current deliverable, it will also act as a regression suite as you proceed through the course. Since this is a project, it is expected that the tests from all deliverables continue to pass on your final submission.

### Submitting to AutoTest

You will be able to submit your assignment for validation against the private test suite only once every 12 hours. The private suite will return limited information about the failures it encounters. Since this suite is rate limited, it is highly recommended you extend your project test suite to make your code as robust as possible before testing it against the private suite. There is no downside for submitting your deliverable to the private suite though, so you should make sure you do it at least once.

AutoTest is invoked using a bot on GitHub. If you make a ```@autobot``` comment on a commit in GitHub the bot will be invoked. Test results will be reported back to the same comment when the test is complete. Some notes to keep in mind:

* For the bot to be invoked, the commit must be on a branch in a configured repository. These will be configured as soon as all repos are set for the course.

* If your code does not cleanly compile (e.g., ```yarn build```), AutoTest will say that the 'tests failed to execute'.

* If a test times out it will be 'skipped'. Your pass rate will be calculated as: ```pass / (pass + skip + fail)```. To be safe about not hitting this timeout, try and ensure no individual test takes more than 5 seconds to run locally in your personal test suite.

* Autobot will run your code on all commits, regardless of if you call it. This means that you may get messages/emails about build failures even if you don't call the bot. Sometimes when the processing queue is long, you may get emails about old commits, this is fine and won't affect your most recent commits.

We will monitor test suite executions to ensure that our tests are correct; if we encounter a problem we will post to the class forum.

### AutoTest tasks

1. AutoTest first tries to build your code. If this fails, it will notify you via your GitHub commit.
1. If the code compiles, it then runs your own unit test suite. <!-- For any test that fails, AutoTest will return the standard output from your tests. This is extremely helpful to diagnose problems that work on your own development machine but not the AutoTest server.--> Using your own tests is the best way to diagnose your own code, so this remains the best way to validate the quality of your solution.
1. While running your tests, we also collect coverage information about how your tests cover your solution. A coverage summary is included in your output as well.
1. Finally, AutoTest runs the private test suite against your code. Only limited information about test failures is returned to you; these will not be sufficient for diagnosing your problems (for this you should rely on your own diverse set of tests). Some tests may be witheld and only run for calculating your final grade. For this reason, it is important to consider fixing the AutoTest failures that are shown as a necessary, but not sufficient, step for ensuring a high mark. An AutoTest run only counts against your 12 hour limit if it returns results at this step of the process.

AutoTest may fail for the following reasons:

* Exceeding 5 minutes of total execution time. This should not happen, but if it does it is probably because you either have an infinite loop somewhere or are not settling your promises.
* Producing more than 5 MB of output to the standard output. It is easy to generate 100s of MB of output; please think carefully about the logging statements your code is making.
* Depending on invalid dependencies. If your code uses libraries it shouldn't, it will fail. We do not run ```yarn install``` for your code, instead we copy the approved set of libraries to your target project. The approved list of dependencies can always be found in the [bootstrap repo](https://github.com/CS310-2017Jan/bootstrap/blob/master/package.json).
* Importing modules is case sensitive in Linux. (e.g., ```import jszip = require('JSZip');``` will work on Windows and probably OS X but for it to work on Linux you need ```import jszip = require('jszip');```). That said, you probably shouldn't need to use `require` at all (e.g., `import * as parse5 from "parse5";` should be all you need). 
* AutoTest will only work on the repositories we provision; it will _not_ work on forked repos.

### Submitting your deliverable

Your final deliverable will always be the state of the master branch of your repository at the deadline, regardless of when your final submission to the AutoTest suite took place.


---
[![](../figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
