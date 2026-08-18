# AutoTest

AutoTest is our system for evaluating your projects on GitHub, and serves as the "client" for the project when run on the `master` branch (which generates your grade), and as a smoke test suite when run on other development branches.

## Note for D0

This page largely applies to the project after D0. During D0, there is no difference between branches, or penalties for regressions. Additionally feedback is much simpler, with just the number of tests that ran and a score.

### Local test suites

AutoTest is not meant to be a replacement for testing your code locally with your own test suites. The smoke test suite provided is primarily to give you confidence that your code is being executed correctly on our platform. The full suite on `master` should be treated as your client, and you definitely don't want to rely on them to do all your testing for you!

### AutoTest suite

The AutoTest suite contains a variety of integration tests to validate your implementation, and is broken into two components, a public suite and a private suite. The public suite will be shown on `master`, and a subset of the public suite serves as the smoke tests on development branches. The private suite is only used for generating grades and is not shown at any point.

### Submitting to AutoTest

You will be able to submit your assignment for validation on `master` only once every 12 hours (per person). AutoTest will return information on how you are doing on various features of your project, but not specific test details. Due to this and the rate limiting, it is _highly_ recommended you extend your project test suite to make your code as robust as possible before merging to the `master` branch.

AutoTest is invoked using a bot on GitHub. If you make an ```@autobot``` comment on a commit in GitHub the bot will be invoked. Test results will be reported back to the same commit when the test is complete. Some notes to keep in mind:

* Only commits on `master` are graded. Commits on development branches are not graded.

* If your code does not cleanly compile or lint (e.g., ```yarn build```), AutoTest will not run the rest of the commit and it will not be graded. This will not use your 12hr submission.

* If a test times out it will be counted as failed. To be safe about not hitting this timeout, try and ensure no individual test takes more than about 5 seconds to run locally in your personal test suite.

* AutoTest will run your code on all pushes, regardless of if you call it. This means that you may get messages/emails about build failures even if you don't call the bot. Sometimes when the processing queue is long, you may get emails about old pushes, this is fine and won't affect your most recent work.

* The only timestamp AutoTest trusts is the timestamp associated with a `git push` event. This is the timestamp that will be used for determining whether a commit was made before a deadline (this is because commit timestamps can be modified on the client side, but push timestamps are recorded on the AutoTest server itself). Make sure you push before any deadline and know that any pushes after the deadline (even if some commits within that push appear to come from before the deadline) will not be considered.

We will monitor test suite executions to ensure that our tests are correct; if we encounter a problem we will post to the class forum.

### AutoTest tips

Your AutoTest submission may fail for the following reasons:

* Exceeding 5 minutes of total execution time. This should not happen, but if it does it is probably because you either have an infinite loop somewhere or are not settling your promises.
* Producing more than 5 MB of output to the standard output. It is easy to generate 100s of MB of output; please think carefully about the logging statements your code is making.
* Depending on invalid dependencies. If your code uses libraries it shouldn't, it will fail. We do not run ```yarn install``` for your code, instead we copy the approved set of libraries to your target project. The approved list of dependencies can always be found in the `package.json` file in the repository we provision for you.
* Importing modules is case sensitive in Linux. (e.g., ```import jszip = require('JSZip');``` will work on Windows and probably OS X but for it to work on Linux you need ```import jszip = require('jszip');```). That said, you probably shouldn't need to use `require` at all (e.g., `import * as parse5 from "parse5";` should be all you need). 
* AutoTest will only work on the repositories we provision; it will _not_ work on forked repos.
* Files from the `./src/` directory of the starter code are missing.

### Submitting your solution

Your final grade will always be based on the highest graded commit on `master` branch of your repository made prior to the deadline, regardless of when your final submission to the AutoTest suite took place.


---
[![](/images/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
