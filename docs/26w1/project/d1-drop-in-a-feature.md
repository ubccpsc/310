# Deliverable 1 — Drop in a feature

**Due Friday 25 September, 18:00 · individual · submit on GitHub and PrairieLearn**

This is a small and a deliberately open deliverable.
In particular, **there is no prescribed procedure** for how you should approach making the changes.
The goal is to experience first hand what it costs to change an existing system, and to build some
intuition about why change can be hard.

## Before you start

Be sure to read the [Project Overview](./index.md) for the background.
Instructions for getting your environment configured are provided in the first part of Lab 1, and you should complete it before changing any code.
As a reminder, you must be connected to the UBC VPN to successfully run the tests — several tests upload a facilities dataset, and every building address gets turned into coordinates by a geocoding service which is only available on the VPN.

## The change

Buildings currently have an `id`, a `name`, an `address`, and coordinates. Your job is to add one more: an optional
`campus` field.

**The requirement:** `PUT /api/v2/buildings/:buildingId` should accept `campus` in the request body,
treated as an *optional* string. A client that doesn't send one must get the same status code, the
same errors, and the same values for every other field as it always has.

Implementing the requirement completely means:

- **Validation follows the existing convention.** When `campus` is present but isn't a string,
  produce the same `422` shape the other fields produce, with `"expected a string"`. Look at how
  `name` and `address` are handled and do the same thing.
- **`campus` appears everywhere a building is returned**, including the buildings list, a
  single building, and the body returned when a building is deleted.
- **`openapi.yml` describes the new `campus` field.** Add it to the `Building` schema and to the `422`
  validation shape above, matching whatever you decided for how absence is represented. `campus`
  isn't required the way `name` and `address` are, so its entry will look similar but not identical.
  Run `yarn docs:build` and open `openapi.html` to see your changes rendered.
- **The inherited suite stays green.** Your change may cause some existing tests to fail. If that happens,
  fix the assertion, and only the assertion — don't touch a test's setup or intent to make it pass. If nothing breaks, there's nothing
  to do here. Either way, `yarn test` should be green when you're done, same as it was before you
  started. Keep track of anything you had to touch; questions 6, 8, and 9 all ask about it.

Read every question in **What to submit** before you touch the code. Some of them are asking about
decisions you'll make along the way, not just things to report once you're done.

## What to submit

**Everything is submitted through PrairieLearn**, including a link to your pull request.

### In your repository

**1. Your change, working**, on a branch and merged into your `main` **via a pull request**.

**2. At least one test** proving the `campus` value survives a restart.

**3. A pull request description** which focuses on the technical aspects of the change.
It should be three or four sentences written for a reviewer: say what changed, why it changed,
and whether there is any risk or wrinkle worth checking. Point to the main area of the codebase
the reviewer should look at, but do not list every file or function and do not write a step-by-step
changelog.

### In PrairieLearn

**4. The link to your pull request.**

**5. How many files did you have to change?** This is just a number but you'll reflect on what it means below.

**6. Every file and function you touched, and how you found each one.** Searching for keywords? Following a call
chain? Running it and reading the error? Guessing? Include the places you changed something and then
had to change it back — those are the interesting ones.

**7. A trace of one request.** Follow `PUT /api/v2/buildings/:buildingId` from the route registration
to the point where data is written to disk, naming each part it passes through. A numbered list is
fine.

**8. How did you represent "no campus"?** When a building has no campus set, does your response omit
the key, send it as `null`, or something else? Say what you chose and why, and whether it changed
anything elsewhere — a test that broke, or something in `openapi.yml` you had to adjust to match.

**9. Reflection — half a page, in your own words.** Describe in plain language what made this change harder than it should have
been. Say what had to agree with what, what surprised you, and why that made the feature more
work than the change suggests. Do not worry about using precise terminology for this deliverable.

**10. Looking ahead — one paragraph.** If you had 60-90 minutes to make this kind of feature cheaper
next time, what one structural change would you make? Name the part of the code you would change,
how that edit it would make future changes cheaper, and one tradeoff or risk your change introduces.

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded (50%) | The requirement is completely implemented |
| Judgment (50%) | Whether items 3, 6, 7, 8, 9, and 10 are **specific** |

**We are not grading the design quality of your change.** There is no expected shape, no pattern
you were supposed to use, and no penalty for whatever you did. A change that works and is honestly
described gets full marks.

What loses marks is vagueness. *"I edited a few files and it was confusing"* tells us nothing.
*"I added the field to the constructor and the two JSON methods, ran it, and it worked — then I
restarted the server and the value was gone, which sent me to a fourth place I hadn't found yet"* is
a complete answer.

## Why it's shaped this way

This is a setup, and it would be unfair not to tell you.

We picked this feature because the current design handles it badly. You are going to touch more
places than you expect for the amount of code you actually write, and at least a few of you will
ship something subtly broken because two of those places have to agree and nothing checks that they
do.

That experience is the point. Lectures will give you the vocabulary for what you feel, and in D2 you'll
do a comparable job with an actual procedure — and be asked what the procedure bought you.
Neither conversation works if you haven't done this part first, unaided.

So: don't optimize. Don't try to guess the "right" design. Make it work, write down honestly what it
cost you, and keep your notes.
