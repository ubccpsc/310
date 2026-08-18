<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES
  Due Fri 25 Sep, 18:00. Must land AFTER the footprint vocabulary lecture (wk 2) so the
  reflection isn't asking for terms students don't have yet, and EARLY enough that a stuck
  student is visible with most of the term left to act on it.

BASE REPO — anything here breaks if the repo changes
  Feature: add `campus` to buildings. Chosen because it costs ~10 lines across 8 sites in
  App.ts: PUT handler (~124), Model.setBuilding (~549), validateBuildingParams (~2390),
  Building constructor (~1633), getJSONLinks (~1643), getJSONFull (~1657),
  getJSONForDelete (~1668), buildBuilding (~1679).
  The trap is buildBuilding: getJSONFull doubles as the on-disk format (~211), so a student
  who misses it has a feature that works until the server restarts. Requirement 4 exists to
  force that discovery. If you change repo or feature, re-verify the trap still exists.
  Also repo-specific: port 4321, `frontend/` dir told to ignore, yarn script names.

SUBMISSION MECHANICS
  Single surface: PrairieLearn, with the PR link as an answer field. Rationale is split by
  audience — PR description carries only what a code reviewer needs (short, professional
  register); inventory/trace/reflection go to PL where they can be rubric-graded with written
  feedback. At ~400 individual submissions, TAs grading in GitHub is the thing to avoid.
  Q5 ("how many files?") is deliberately a NUMBER, not prose: it feeds the week-2 lecture,
  which opens on the cohort's own distribution rather than asking the room to shout guesses.
  Keep it numeric even if the feature changes.
  No inline PR review at D1 — nothing here is graded on design quality, and inconsistent TA
  commenting across 400 students is a fairness problem. Code review starts at D2.

PLATFORM
  "post on Piazza" — update if the course changes forum.
-->

# D1 — Drop in a feature

**Due Friday 25 September, 18:00 · individual · submit on GitHub**

You've inherited a working system. Somebody else built it, it passes its tests, and it satisfies two
published API versions. Now you have to change it.

This is a small deliverable and a deliberately open one. **There is no prescribed procedure.** Add the
feature however seems right to you — we will come back to this exact experience in D2 with one, and
compare.

## Before you start

The repository is a real CPSC 310 submission from a previous term, anonymized. It is not a reference
solution and it is not a model of good design; it is a system that works.

```bash
yarn install
yarn build      # compiles and checks formatting
yarn test       # the inherited test suite — it should be green before you touch anything
yarn start      # serves on http://localhost:4321
```

Two notes. `yarn build` runs a formatting check, so run `yarn prettier:fix` if it complains. And
ignore the `frontend/` directory — it isn't part of this course.

**Get the inherited suite green before you change a line.** If it isn't green on a fresh clone,
post on Piazza before doing anything else.

## The feature

Buildings currently have an `id`, a `name`, an `address`, and coordinates. Add one more field:
**`campus`**.

Specifically:

1. **`PUT /api/v2/buildings/:buildingId` accepts `campus` in the request body.** It is a required
   string, exactly like `name` and `address`.
2. **Validation matches the existing convention.** A missing `campus` produces the same `422` shape
   the other fields produce, with `"required but missing"`; a non-string produces
   `"expected a string"`. Look at how `name` and `address` are handled and do the same thing.
3. **`campus` appears everywhere a building is returned** — the buildings list, a single building,
   and the body returned when a building is deleted.
4. **It survives a restart.** Set a campus, stop the server, start it again, read the building back.
   The value is still there.

Nothing about v1 or v2's existing behaviour may change. The inherited test suite must still pass.

## What to submit

**Everything is submitted through PrairieLearn**, including a link to your pull request. One place,
one deadline.

### In your repository

**1. The feature, working**, on a branch and merged into your `main` **via a pull request**.

**2. One test** proving the campus value survives a restart. Just one.

**3. A pull request description a reviewer could actually use** — what changed, why, and anything
you'd want a reviewer to look at. Three or four sentences, in the register you'd use at work. This
is not where your reflection goes; nobody writes half a page about their feelings in a PR.

### In PrairieLearn

**4. The link to your pull request.**

**5. How many files did you have to change?** A number.

**6. Every file and function you touched, and how you found each one.** Search? Following a call
chain? Running it and reading the error? Guessing? Include the places you changed something and then
had to change it back — those are the interesting ones.

**7. A trace of one request.** Follow `PUT /api/v2/buildings/:buildingId` from the route registration
to the point where data is written to disk, naming each part it passes through. A numbered list is
fine. About a page.

**8. Reflection — half a page, in your own words.** What made this change harder than it should have
been? Use plain language. You will not be graded on terminology, and you have not been taught any
yet. Describe what happened to you.

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded | The feature meets all four requirements; the inherited v1/v2 suite still passes |
| Judgment | Whether items 3, 6, 7, and 8 are **specific** |

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

That experience is the point. Lectures will shortly give you the vocabulary for what you're about
to feel, and in D2 you'll do a comparable job with an actual procedure — and be asked what the
procedure bought you. Neither conversation works if you haven't done this part first, unaided.

So: don't optimize. Don't try to guess the "right" design. Make it work, write down honestly what it
cost you, and keep your notes.
