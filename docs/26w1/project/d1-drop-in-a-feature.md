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

WARM-UP CHANGE — new for 2026W1; verify with the same care as the campus trap
  The starter ships with `GET /api/v2/buildings/:buildingId/rooms` REMOVED — both the route
  registration (~142) and `Model.getRooms` (~602). Its ~20 tests in App.spec.ts are removed
  too, so a fresh clone is green and the starter doesn't advertise the deletion. THE
  AUTOGRADER KEEPS THEM.
  Why this endpoint. Model.getBuildings (~498) survives as a near-exact template: same
  validateGetParams, same {total, limit, offset, items} envelope, same getJSONLinks mapping,
  and getBuildingById (~532) twelve lines below supplies the 404 block. Imitation is a
  COMPLETE strategy here and is not one for campus, which is the entire reason the two are
  paired. It is tested as itself and is a fixture for nothing, so removal doesn't cascade.
  The frontend calls it at frontend/public/index.html:1093, so the symptom is visible: click
  a building, no rooms.
  Collides with nothing: Lab 1 traces DELETE and uses PUT/GET-by-id; D2's target is geocoding
  in extractBuildings. One repo variant serves both.
  ORDER MATTERS. The endpoint goes first, while students still don't know the codebase. If
  campus goes first, the endpoint is cheap partly through familiarity and question 8's
  comparison is confounded.
  Removing both impls but leaving the route would be a compile error, which hands over the
  location. Remove both so it compiles clean and fails as a 404.
  Q5 now collects TWO numbers. The week-2 lecture opens on the paired distribution.
  KNOCK-ON: Lab 1 project-intro quotes "469 tests" and an App.spec.ts insertion point at
  ~10896. Recount both after the deletion.

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

# Deliverable 1 — Drop in a feature

**Due Friday 25 September, 18:00 · individual · submit on GitHub and PrairieLearn**

You've inherited a working system. Somebody else built it, it passes its tests, and it satisfies the
spec. Now you have to change it.

This is a small and a deliberately open deliverable.
In particular, **there is no prescribed procedure** for how you should approach making the changes.
The goal is to experience first hand what it costs to change an existing system, and to build some intuition about why change can be hard.

## Before you start

The repository is a real CPSC 310 submission from a previous term, anonymized. It is not a reference
solution and it is not a model of good design; it is a system that works.

::: warning You need the UBC VPN to run the tests
Several tests upload a facilities dataset, and every building address gets turned into coordinates
by a geocoding service hosted on the UBC network. That service is unreachable from the open
internet, so **connect to the UBC VPN before running `yarn test`** — otherwise those tests hang and
then fail with timeouts and socket errors, and nothing about the failure will mention the network.
:::

```bash
yarn install
yarn build      # compiles and checks formatting
yarn test       # the inherited test suite — it should be green before you touch anything
yarn start      # serves on http://localhost:4321
```

**Get the inherited suite green before you change a line.** If it isn't green on a fresh clone,
post on Piazza before doing anything else.

## The change

Buildings currently have an `id`, a `name`, an `address`, and coordinates. Add one more field:
**`campus`**.

Specifically:

1. **`PUT /api/v2/buildings/:buildingId` should accept `campus` in the request body.** It should be treated as an *optional*
   string. A request that doesn't send one must behave exactly as it does today.
2. **Validation should match the existing convention.** When `campus` is present but isn't a string,
   produce the same `422` shape the other fields produce, with `"expected a string"`. Look at how
   `name` and `address` are handled and do the same thing.
3. **`campus` should appear everywhere a building is returned** including the buildings list, a single building,
   and the body returned when a building is deleted.
4. **It should survive a restart.** Set a campus, stop the server, start it again, read the building back.
   The value is still there.

Importantly, **v1 and v2 behaviour must not change.** A client that doesn't send `campus` gets exactly what it
got before, which is why the field is optional: making it required would break every existing
caller.

Some inherited tests will fail anyway. A handful of them assert the *exact* shape of a building
response, so they break the moment a field is added — even though no real consumer would notice.
**You may update those assertions, and only those.** Keep track of which ones you had to touch;
question 8 asks about it.

## What to submit

**Everything is submitted through PrairieLearn**, including a link to your pull request.

### In your repository

**1. Your change, working**, on a branch and merged into your `main` **via a pull request**.

**2. One test** proving the `campus` value survives a restart.

**3. A pull request description** which focuses on the technical aspects of the change.
It should be three or four sentences written for a reviewer: say what changed, why it changed,
and whether there is any risk or wrinkle worth checking. Point to the main area of the codebase
the reviewer should look at, but do not list every file or function and do not write a step-by-step
changelog.

### In PrairieLearn

**4. The link to your pull request.**

**5. How many files did you have to change?** This is just a number. We'll be talking about the implications in lecture.

**6. Every file and function you touched, and how you found each one.** Searching for keywords? Following a call
chain? Running it and reading the error? Guessing? Include the places you changed something and then
had to change it back — those are the interesting ones.

**7. A trace of one request.** Follow `PUT /api/v2/buildings/:buildingId` from the route registration
to the point where data is written to disk, naming each part it passes through. A numbered list is
fine.

**8. Reflection — half a page, in your own words.** Describe in plain language what made this change harder than it should have
been. Say what had to agree with what, what surprised you, and why that made the feature more
work than the code size suggests. Do not worry about using precise terminology for this deliverable.

**9. Looking ahead — one paragraph.** If you had 60-90 minutes to make this kind of feature cheaper
next time, what one structural change would you make? Name the part of the code you would change,
how that edit it would make future changes cheaper, and one tradeoff or risk your change introduces.

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded (50%) | The feature meets all four requirements; the inherited v1/v2 suite still passes |
| Judgment (50%) | Whether items 3, 6, 7, 8, and 9 are **specific** |

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
