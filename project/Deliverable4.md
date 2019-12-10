# Project Quality Check (d4)

Software systems are long-lived. As such, it is typically unacceptable for old code to just stop working because new features have been added. To account for this, we will wrap up your project by running a complete regression test suite against your project code.

The Deliverable 4 test suite comprises of:

* The [Deliverable 1](Deliverable1.md) AutoTest suite (to check for regressions).
* The [Deliverable 2](Deliverable2.md) AutoTest suite (to check for regressions).
* A private AutoTest suite for Deliverable 1, Deliverable 2, and Deliverable 3 (to evaluate overall quality).

This will be automatically executed against your _graded_ `d3` commit. There will be no exceptions to this. As you work through Deliverable 1, 2, and 3, it is your responsibility to make sure that you have not introduced any regressions.

Note: We will not run the D3 AutoTest suite since there won't be any regressions there as this check happens on the same day your D3 code is due. Also note: this is an opportunity to make up marks for tests you originally failed in D1 and D2 so making those work is still beneficial for your final project grade, even if they were not done by the original deliverable due date.

Your score for the deliverable will be strictly on pass rate:

```number of passed tests / total number of tests```

If your code does not compile, times out, or uses too much memory forcing the grading container to exit, a score of 0 will be assessed.  Coverage will _NOT_ be considered, the quality check will purely be about functional correctness, we will not even run your private test suites. This deliverable should not require any work on your behalf, but it is crucial that you keep on top of your repos and make sure you do not have any major regressions before the due date. This date will be absolutely firm.

If you received a retrospective multiplier other than 1 for D1 or D2, or were assessed for academic misconduct for one of those deliverables, that same multiplier will be applied to the portion of D4 associated with the tests for your non-1 multiplier deliverable.

This deliverable is worth 7.5% of your final grade (15% of your project grade).

### About the private tests

The goal of the private tests is to evaluate the robustness of your approach and to make sure your solution is actually 'high quality' rather than just a series of hacks to pass the tests. These tests will be private and you will not see the test descriptions or know why your implementation passed or failed them. That said: our goal is for teams to do well on these; we will monitor _all_ private tests and only include test cases where at least 70% of teams pass the test case (this is a lower threshold, I would predict the median score for the whole private test suite will exceed 90%).
