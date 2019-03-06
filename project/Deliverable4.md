# Project Quality Check (d4)

Software systems are long-lived. As such, it is typically unacceptable for old code to just stop working because new features have been added. To account for this, we will wrap up your project by running a complete regression test suite against your project code.

On the Deliverable 3 final due date, the master branch of your repo will be run against:

* The [Deliverable 1](Deliverable1.md) AutoTest suite (to check for regressions).
* The [Deliverable 2](Deliverable2.md) AutoTest suite (to check for regressions).
* A private AutoTest suite for D1/D2 (to evaluate overall quality).

IMPORTANT: this will run against the last commit to the master branch at the deadline. There will be no exceptions to this. It is your responsibility to make sure that this commit works.

Note: We will not run the D3 AutoTest suite since there won't be any regressions there as this check happens on the same day your D3 code is due. Also note: this is an opportunity to make up marks for tests you originally failed in D1 and D2 so making those work is still beneficial for your final project grade, even if they were not done by the original deliverable due date.

Your score for the deliverable will be strictly on pass rate:

```number of passed tests / total number of tests```

Any code that does not compile will count towards the total number of tests (and obviously the passing count will be 0 for those tests). Any tests that skipped will also count towards the total number of tests. Coverage will _NOT_ be considered, the quality check will purely be about functional correctness, we will not even run your private test suites.

This deliverable should not require any work on your behalf, but it is crucial that you keep on top of your repos and make sure you do not have any major regressions before the due date. This date will be absolutely firm.

If you received a retrospective multiplier other than 1 for D1 or D2, that same multiplier will be applied to the portion of D4 associated with the tests for your non-1 multiplier deliverable.

This deliverable is worth 7.5% of your final grade (15% of your project grade).

### About the private tests

The goal of the private tests is to evaluate the robustness of your approach and to make sure your solution is actually 'high quality' rather than just a series of hacks to pass the tests. These tests will be private and you will not see the test descriptions or know why your implementation passed or failed them. That said: our goal is for teams to do well on these; we will monitor _all_ private tests and only include test cases where at least 70% of teams pass the test case (this is a lower threshold, I would predict the median score for the whole private test suite will exceed 90%).
