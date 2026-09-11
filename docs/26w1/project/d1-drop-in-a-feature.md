# Deliverable 1: Drop in a feature

**Due Friday 25 September, 18:00 · individual · submit on GitHub and PrairieLearn**

This is a deliberately open deliverable.
In particular, **there is no prescribed procedure** for how you should approach making the changes.
The goal is to experience first hand what it costs to change an existing system, and to build some
intuition about why change can be hard.

## Before you start

Be sure to read the [Project Overview](./index.md) first!
Instructions for getting your environment configured are provided in the first part of Lab 1, and you should complete it before changing any code.
As a reminder, you must be connected to the UBC VPN to successfully run the tests — several tests upload a facilities dataset, and every building address gets turned into coordinates by a geocoding service which is only available on the VPN.

## Request 1: Adding `campus`

Buildings currently have an `id`, a `name`, an `address`, and coordinates. Your job is to add one more: an optional
`campus` field. This requires you to modify three parts of the existing codebase:

1. Parse the campus field (currently all `"vancouver campus"`) from the header of each building's `.htm` file. It may not appear in all of the files, so is not a required field. This change needs to be implemented in the `POST /api/v2/datasets` endpoint when a facilities dataset is uploaded.
2. Support modifying each building's `campus` field via the `PUT /api/v2/buildings/:buildingId` endpoint.
3. Allow users to search by `campus` via the `POST /api/v2/search` endpoint.

Finally, you must add tests that specifically test each of the three features.

Implementing these requirements completely means that `campus` appears and can be used just like any other existing building field, except that it is optional instead of required.
Additionally, you must update `openapi.yml` documentation to the `Building` schema and all the above endpoints, and ensure that all existing tests still pass.

Read the questions in the reflection section before you touch the code. Question 3 in particular asks about the process you used to identify the locations in your code that you had to change.

## Request 2: Implementing aggregation

The previous team *almooooooost* finished the aggregation implementation of the `POST /api/v2/search` querying endpoint.
They finished the validation and tests for validation, but ran out of time before they could finish the actual aggregation code implementation and its tests.
Your task here is to implement aggregation so it satisfies the spec as described in the `openapi.yml` specification for `POST /api/v2/search`. You will want to test that your implementation works as specified.
Hint: there is one specific method you will need to implement!

## Reflection

Submit a reflection on PrairieLearn by answering the following questions:

**1. A trace of one request.** For example, follow `PUT /api/v2/buildings/:buildingId` from the route registration
to the point where data is written to disk, naming each part it passes through. A numbered list is
fine.

**2. How did you represent "no campus"?** When a building has no campus set, does your response omit
the key, send it as `null`, or something else? Say what you chose and why, and how it affected the other features of Request 1.

**3. For your changes to the `PUT /api/v2/buildings/:buildingId`, identify each class and function you touched, and how you found each one.** Searching for keywords? Following a call
chain? Running it and reading the error? Guessing? (or even, **gasps**, AI?). You can also include the places you changed something and then
had to change it back.

**4. Write a short reflection on the changes you had to make to the `PUT /api/v2/buildings/:buildingId` endpoint.**
Describe what aspects of the existing code made these changes harder than they should have been.
Say what had to agree with what, what surprised you, and why that made each feature more work than the initial change would have suggested.
Compare those changes with the ones you had to make for request 2.
Were they easier or harder to implement? Why or why not?

## Grading

This deliverable has both autograded and manully graded components, each worth 50% of your grade.

- The code you submit for Request 1 and 2 will be autograded. Every commit you push to the `main` branch of your repo is automatically graded, and you highest scoring commit before the deadline is used as your final grade.
- Your reflection will be manually grdaed by the TAs on PrairieLearn after the deadline.

<!--

### In PrairieLearn

Submit each of the following for each of the four pull requests corresponding to the above features:

**4. Links to your pull requests** (whichever one carries the bulk of your work if you ended
up with more than one).

**5. How many files did you have to change?** This is just a number but you'll reflect on what it means below.

**6. Every class and function you touched, and how you found each one.** Searching for keywords? Following a call
chain? Running it and reading the error? Guessing? (or even, **gasps**, AI?) Include the places you changed something and then
had to change it back — those are the interesting ones.

**7. A trace of one request.** For example, follow `PUT /api/v2/buildings/:buildingId` from the route registration
to the point where data is written to disk, naming each part it passes through. A numbered list is
fine.

Finally, you will submit one longer reflection total:

**8. How did you represent "no campus"?** When a building has no campus set, does your response omit
the key, send it as `null`, or something else? Say what you chose and why, and whether it changed
anything elsewhere — a test that broke, or something in `openapi.yml` you had to adjust to match.

**9. Reflection — half a page, in your own words.** Using the analysis you did in the prior steps, describe what made these changes harder than they should have
been. Say what had to agree with what, what surprised you, and why that made each feature more
work than the initial change would have suggested. Was request 1 easier or harder to do than request 2? Why or why not? Do not worry about using precise terminology for this deliverable.

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded (50%) | The requirements are completely implemented |
| Judgment (50%) | Whether items 3, 6, 7, 8, 9, and 10 are **specific** |

**We are not grading the design quality of your change.**
The goal of this deliverable is get experience working in an unfamiliar codebase and being able to describe why you made the changes you did. For written answers, be specific and describe exactly what you did.
-->
<!-- What loses marks is vagueness. *"I edited a few files and it was confusing"* tells us nothing.
*"I added the field to the constructor and the two JSON methods, ran it, and it worked — then I
restarted the server and the value was gone, which sent me to a fourth place I hadn't found yet"* is
a complete answer. -->
<!-- 
## Why it's shaped this way

We picked this feature because the current design handles it badly. You are going to touch more
places than you expect for the amount of code you actually write, and at least a few of you will
ship something subtly broken because two of those places have to agree and nothing checks that they
do.

That experience is the point. Lectures will give you the vocabulary for what you feel, and in D2 you'll
do a comparable job with an actual procedure — and be asked what the procedure bought you.
Neither conversation works if you haven't done this part first, unaided.

So: don't optimize. Don't try to guess the "right" design. Make it work, write down honestly what it
cost you, and keep your notes. -->
