# AutoTest

AutoTest is a mechansim for validating your project deliverables. It uses _exactly_ the same mechanism to validate your code as most industrial teams use: automated testing. In our case we are using the [Mocha Test Environment](https://mochajs.org/) with [Chai Expectations](http://chaijs.com/api/bdd/) for unit tests and [IcedFrisby](https://www.npmjs.com/package/icedfrisby) for integration tests. Automation is a cornerstone of continuous integration practices which enable teams to quickly and confidently evolve their software systems while retaining trust in its operability.

For each project deliverable there will be two AutoTest components: the public suite and the private suite. 

### Public Suite

The public suite exists for three main purposes: 

* To ensure your system conforms to the high level API specification expected for the deliverable.

* To provide a convenient bootstrap mechanism for you to extend for more in-depth testing of your code.

* To enable you to test your deliverable repeatedly without incurring the rate limiting mechanism of the private test suite.

### Private Suite

The private test suite is a superset of the public suite and exists for one purpose:

* To comprehensively validate the functionality of your system. While the public suite may only test a small fraction of the required functionality, the private suite will contain dozens of tests that will test both regular and exceptional behaviours.

### Testing Your Own Code

Both the public and private suites are *integration* tests; that is they test your code only from the public REST endpoints provided by your app. Your project repository will also be configured for *unit* tests; it will be much faster and easier for you to diagnose incorrect behaviours in your code with your unit test suite. You are encouraged to enhance your unit test suite as you work on the project as it will greatly increase your chances of passing the AutoTest integration tests.

Unit tests are also the best way to run your system without invoking the whole REST server and invoking your system with curl. If you just want to test one specific method or class, this is the way to do it.

Learning how to write effective test cases takes time and practice. It is best to think about both common cases, so you can ensure your code works correctly, and edge cases, so you can make sure your code handles failures correctly and gracefully. You can be sure that the private suite will execute a wide variety of tests, just as a real customer would if they were actually using your code in production. Careful test suite construction is required to check and validate that your program behaves correctly. While the suite has obvious utility for the current deliverable, it will also act as a regression suite as you proceed through the course. Since this is a project, it is expected that the tests from all deliverables continue to pass on your final submission.

### Submitting to AutoTest

You will be able to submit your assignment for validation against the private test suite only once every 12 hours. The private suite will return limited information about the first failure it encounters. Since this suite is rate limited, it is highly recommended you extend your project test suite and, optionally, the public suite, to make your code as robust as possible before testing it against the private suite. There is no downside for submitting your deliverable to the private suite though, so you should make sure you do it at least twice: once after you pass the public suite the first time (to ensure your high level interfaces are correct), and once before the deadline.

AutoTest is invoked using a bot on GitHub. If you make a ```@CPSC310bot``` comment on a commit in GitHub the bot will be invoked. Test results will be reported back to the same comment when the test is complete. Some notes to keep in mind:

* For the bot to be invoked, the commit must be on the master branch in a configured repository. These will be configured as soon as all repos are set for the course.

* If your code does not cleanly compile (e.g., ```npm run build```), AutoTest will say that the 'tests failed to execute'.

* If a test times out (we use a 30s timeout per-test) it will be 'skipped'. Your pass rate will be calculated as: ```pass / (pass + skip + fail)```. 

We will monitor test suite executions and will re-order the suites from time to time (although not more than once per day). We will do this so 'easier' tests execute before 'harder' ones. 

### Submitting Your Deliverable

Your final deliverable will always be the state of your repository at the deadline, regardless of when your final submission to the AutoTest suite took place.


---
![] (../readings/figures/CCSA.png "Creative Commons: Attribution-ShareAlike") Reid Holmes
