# Unit 4 — Software process

**Weeks 12–13.** *(Draft — outcomes and vocabulary to follow.)*

Everything so far you could have done alone. Every technique in Units 1 through 3 assumed a single
person holding the whole picture, deciding when to refactor, where the boundary goes, what the spec
says. This unit removes that assumption too.

Once several people change one codebase, the expensive thing stops being any individual change and
becomes **the interference between changes**. Two correct edits that don't compose. A branch that
was fine on Monday and unmergeable by Friday. A review that arrives after the work has moved on.
None of these are design failures — the design might be excellent — and none of them show up in a
single diff. They're properties of how work flows.

So this unit is about the machinery teams use to keep that flow cheap, and then about how you'd know
whether it's working.

## Lectures

| Lecture | What it answers | Read before |
| :--- | :--- | :--- |
| Continuous integration | Why does a branch get more expensive the longer it lives? | [Automation](/textbook/8-unplaced/process/automation/) |
| How teams coordinate | How does work actually move through a team in a week? | [Software Process](/textbook/8-unplaced/process/) |
| Process metrics | How would you know whether any of this is working? | *TBD* |
| GenAI & where the cost moves | If writing code gets cheap, what gets expensive? | *TBD* |

Slides are posted on the [schedule](../../schedule.md) as we go.

## The shape of the unit

**Integration is the whole point of CI.** Continuous integration doesn't mean "the tests run on your
pull request" — it means integrating continuously, and the automation exists to make that safe.
Branch lifetime is the variable that matters: the longer two people work apart, the more the merge
costs, and no tooling repeals that. This is Unit 1's cost-of-change argument applied to time rather
than to code.

**Ceremony is a means, not the subject.** You'll have been running a version of this for a month by
week 12 — your team check-ins have a standing agenda, which is a standup whether or not anyone called
it one. The lecture names what you've been doing, then asks what it's for. Sprints, retrospectives,
and backlogs are worth exactly as much as the feedback they generate.

**Measure the flow, not the output.** Velocity is the obvious thing to count and it's a trap: it's
gameable, it doesn't compare across teams, and it measures how much you produced rather than whether
producing it helped. The better question is how long a change takes to get from your head to
production, and how often it comes back. Unit 1 taught you to measure a single change by its
magnitude and footprint — this is the same instinct at team scale, and your own pull requests from
four deliverables are the data.

**And then the ground moves.** Generated code is cheap to produce and no cheaper to understand,
review, or change. That doesn't remove the cost of change; it relocates it — onto review, onto
comprehension, onto everything this course has been about. Which is why this lecture is last.

## Where this is going

Nowhere — this is the end of the course. Which makes it worth saying what the arc was.

You started by pricing a change inside a single class, where every caller was in your diff. Then at
a boundary you'd published and could no longer move. Then before the code existed at all, where the
mistake is cheapest to make and most expensive to keep. And now across a team, where the cost isn't
in any one change but in how they interfere.

Same question, four times, at a wider radius each time: **what will the next change cost, and why?**
