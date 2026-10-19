# Deliverable 3

**Due Friday 6 November, 18:00 · pairs · submit on GitHub and PrairieLearn**

In this deliverable you will work with a partner to prepare your team's codebase for the next version of InsightUBC (v3), which you will build in D4. There are two parts:

1. **Choose a codebase** (together): compare your D2 repositories and decide what you will use going forward.
2. **Prepare for v3:** refactor the facilities (2A) and geolocation (2B) code. For groups of three, one member will add geolocation caching (2C).

Each partner leads one of 2A and 2B, and in groups of three the third member leads 2C. The lead writes
that part's code, opens its pull requests, and answers its questions in DELIV3. Each lead also reviews
the other's pull requests before they are merged (see [Working as a team](#working-as-a-team)). Submit
DELIV3 on PrairieLearn once per group.

## 1. Choose a codebase

You will need to the decide which parts of each of your D2 repositories you will incorporate into your new team repo. Before you choose, walk each
other through your own repo: what your common interface for `Rooms` and `Sections` describes and why you gave it the methods you did,
and what your tests would catch if a later change broke search.

Then compare your repositories on the same two points:

- **The common interface.** What does each one describe? What would a third kind of dataset cost in
  each: which files would change, and how many places would have to agree?
- **The tests.** Which behaviours does each suite check that the other doesn't? Both parts of this
  deliverable are refactors that must not change behaviour, so these tests are your safety net.

You don't have to take everything from one repository. Your team repository starts with the course's
configuration files. To adopt a codebase, make a branch in it, copy in `src/`, `test/`, and `openapi.yml`
from the repository you're keeping (not its `.git` folder), and open a pull request for your partner to
review. Bring in anything else from the other repository, such as its tests, the same way.

As soon as that pull request is merged, request feedback from the bot on `main` (`@310-bot #d3`; see
[Grading](#grading)). Before you've changed anything, the 2A and 2B sections will fail, which is
expected, but any regressions are bugs you've inherited from D1 or D2. Regressions count against your D3
score whether or not they're new, so fix them first. They're also gaps in the safety net your refactors
depend on.

Submit in DELIV3, Part 1:

1. **Comparison:** how do your repositories differ in their common interface and in their tests? Point
   to specific files and functions in each, and use equivalence classes to refer to tests as appropriate.
2. **Decision:** what did you carry forward from each repository, and why? If you brought anything
   across, link the pull request.

## 2. Prepare for v3

Before you start writing code, create a plan as a GitHub issue.
It will help you coordinate the work with your partner, and it's what your D3 plan check-in is graded
on (see [Weekly check-ins](#weekly-check-ins)). A useful plan covers:

- **Who does what.** Who leads each part, and who reviews it.
- **Order.** 2A and 2B both change the facilities dataset processing code (`BuildingsDataset`): 2A
  changes how it stores buildings, and 2B how it locates them. Decide which goes first, or how you'll
  work at the same time without conflicts.
- **Steps.** Break each part into a checklist of steps small enough to be a commit or two. The
  steps will be the path that you will take to satisfy the requirements.
- **Dates.** When each pull request should be ready for review. Leave time for the review and the
  follow-up commits (and plan around the midterm).

Update your plan if it changes as you start implementing the requirements.

### 2A. Restructure facilities

v3 will need to look up facilities data, such as where a building is, without going through everything
else `Model` does. Right now the only way to get at it is through `Model`, which also handles requests,
stores files, and processes datasets, so v3 would depend on all of it. Restructure the buildings and rooms
code so that v3 has something smaller to depend on, without changing any behaviour.

Courses and sections have already been split into routers, controllers, services, and repositories
(`src/routers/`, `src/controllers/`, `src/services/`, `src/repositories/`). That is one way to do it,
but it isn't perfect and you are free to choose a different split. Beyond the requirements below, we
won't grade the structure you choose, but we will grade how well you reason about it.

**Requirements:**

1. **Out of `Model`.** Buildings and rooms must not be declared, stored, or managed in `Model` or
   `App.ts`. Additionally, `App.ts` must not register the buildings and rooms routes itself. `App.ts` may still
   create your pieces, connect them, and mount a router, and search may still use rooms, but only through
   your new code. Facilities dataset processing (`BuildingsDataset`) can stay where it is, but it must read
   and write buildings through your new code, not through `Model`.
2. **Requests and storage apart.** Apart from `App.ts` and `index.ts`, `fs` and `express` must not both appear in the imports for the same file, for any file in `src/` (they are different boundaries!). Keep the names `Building` and `Room` (as classes, interfaces, or types),
   and declare them in files that import neither (hint: use DIP).
3. **Ready for v3.** There must be a function or method, outside any file that imports `express`, that takes
   a building id and returns its coordinates.
4. **Test at the boundary.** Separating request handling from business logic means you can test these business logic rules without making a HTTP
   API request. Write tests that call your building and room code directly, not through the HTTP API, one for
   each of these rules:
   - a building's coordinates are found by its id, and an unknown id finds nothing (requirement 3);
   - putting a building that already exists replaces it and drops its rooms;
   - deleting a building also deletes its rooms;
   - a room can't be added to a building that doesn't exist.
5. **No change in behaviour.** All existing tests must still pass.

Most of this restructuring is moving code. A single pull request will be hard for your partner to review. We suggest creating three pull requests, though you can divide the work differently:

- **Move.** Move code without changing it, for example `Building` and `Room` into their own files. Nothing
  should behave differently, so this is quick to review. VS Code's **Move to a new file** refactoring
  (select the class, then press `Ctrl+.` or `Cmd+.`) moves the code and fixes the imports for you.
- **Restructure.** The routes, request handling, rules, and storage (requirements 1 and 2).
- **Boundary.** Requirements 3 and 4.

Each description should say what changed and why (see [Working as a team](#working-as-a-team)), and your
partner's review should respond to it, not only to the diff.

Submit in DELIV3, Part 2A:

1. **Pre-analysis** (before you change any code):
   - **Current dependencies:** what does the facilities code depend on, and what depends on it? Which of
     those dependencies would make it hard to change or use from v3? Are there tangling, scattering, or testability concerns?
   - **Plan:** the pieces you intend to split it into, what each is responsible for, and which way the
     dependencies between them point. A sketch of the dependency graph is fine.
2. **A link to one merged pull request for 2A**, the one that best shows how you work, with your
   partner's review on it.
3. **Post-analysis:**
   - **Design:** the structure you ended up with, how it differs from your plan and why, and its pros and
     cons, including at least one requirement you can think of that is harder after refactoring than
     before it.
   - **Sharing:** courses, sections, buildings, and rooms all read `limit` and `offset`, check them, and
     build the same not-found errors. Does your facilities code share that with courses and sections, or
     keep its own? Why?
4. **Where the code lives now.** Give these as permalinks to the lines on `main` after the merge, so we
   can check your answers by clicking:
   - **Request trace:** follow `PUT /api/v2/buildings/:buildingId` from where its route is registered to
     where the building is written to disk, as you did in D1, with a permalink for each step. Then add a
     permalink to where facilities dataset processing stores the buildings it loads. How does it compare
     with your D1 trace?
   - **Ready for v3:** the function or method from requirement 3. What does it depend on, and what would
     v3 have to depend on to call it?
   - **Boundary tests:** your requirement 4 test for each rule. Where is the boundary between requests
     and your rules, and what did writing these tests show about it? Was anything hard to test without a
     request or a running app?

### 2B. Put geolocation behind an interface

Uploading a facilities dataset calls an external geolocation service for each building (step 6 of
`POST /api/v2/datasets`). Because that call is buried in the dataset processing code, these behaviours
can't be tested:

1. If geolocation fails for a building, that building and its rooms are skipped.
2. If it succeeds, the building gets the `lat` and `lon` the service returned.
3. If it fails for some buildings, the rest of the dataset still loads.

**Requirements:**

1. Declare an interface `IGeoLocator`, designed however you like. Dataset processing must depend only on
   this interface.
2. Implement `GeoLocator`. It must call the existing service URL with the built-in `fetch`, and it must
   be the only code in `src/` that calls `fetch`.
3. Add an optional `geolocator?: IGeoLocator` to `AppConfig`. `createApp({ datadir })` must still work,
   using a `GeoLocator`.
4. Implement `FakeGeoLocator` in `test/`, and use it to write one test for each behaviour above. These
   tests must go through the HTTP API, like the existing tests.
5. Write one test in `test/online/` showing that `GeoLocator` returns coordinates for a known address.
   All other tests must pass with no network access.

Submit in DELIV3, Part 2B:

1. **Pre-analysis** (before you change any code): why are these behaviours hard to test? Use testability
   terms such as controllability, observability, and automatability.
2. **A link to one merged pull request for 2B**, the one that best shows how you work, with your
   partner's review on it.
3. **Post-analysis:** how did depending on `IGeoLocator` (DIP) address the problems in your
   pre-analysis? How many classes did you touch, and is that acceptable in terms of future cost of
   change? If not, propose a refactoring that would help.

### 2C. Cache geolocation (groups of three only)

The team that runs the geolocation service has noticed that every facilities upload sends a request for
every building, even when the same campus was uploaded minutes earlier.

1. Add caching as a decorator: a `CachingGeoLocator` that implements your `IGeoLocator`, wraps another
   `IGeoLocator`, and forwards to it.
2. Once an address has been located successfully, later requests for it are answered from the cache
   without calling the wrapped geolocator. Failures are not cached.
3. Each app returned by `createApp` has its own cache, which starts empty. `createApp({ datadir })` uses
   a `CachingGeoLocator` around a `GeoLocator`.
4. Cached entries expire: an address cached more than 24 hours ago is located again, and the new answer
   is cached.
5. Test it without the network, including expiry. Your tests can't wait 24 hours, so you'll need a way
   to control time in them.

This builds on 2B's `IGeoLocator`, so agree on the interface with 2B's lead early.

2C isn't autograded, but once your code declares `CachingGeoLocator`, the bot's feedback has a 2C section
that checks requirements 2 and 3 (it doesn't count toward the autograded score).

Submit in DELIV3, Part 2C:

1. **A link to one merged pull request for 2C**, the one that best shows how you work, with a partner's
   review on it.
2. **Tests:** permalinks to the tests that show requirements 2 and 3, and a link to the bot's feedback on
   your merged commit.
3. **Expiry:** a permalink to the test that shows a cached entry is evicted after 24 hours. How does the
   test control time?
4. **The interface:** what did your `IGeoLocator` make easy or hard about adding the cache?
5. **The test double:** what kind of test double did you use to test it, and why that kind?

## Working as a team

How you work together is part of this deliverable. We don't prescribe a process, but your repository
has to show the following.

- **Issues.** Plan your work as GitHub issues in your team repository, one for each week, and keep
  them up to date as you work (see [Weekly check-ins](#weekly-check-ins)).
- **Commits.** Commit in small steps, each doing one thing, with a message that says what changed and
  why. When refactoring, each step should leave the tests passing. A pull request that is one large
  commit doesn't meet this requirement.
- **Pull requests.** Each of 2A, 2B, and 2C is merged through its own pull request(s). Its description
  says what changed, why, and how you tested it, and links its issue. Before you ask for a
  review, get the bot's feedback on the pull request's latest commit (see [Grading](#grading)). In DELIV3
  you link one pull request for each part: pick the one that best shows how you work.
- **Reviews.** Your partner reviews each pull request before it is merged, with at least one comment on
  the diff about the design. The author responds to every comment, either with a follow-up commit or
  with a reply explaining why not.

### Weekly check-ins

From the Oct 23–29 lab until D4 is due, your team meets with your TA for about 15 minutes in each lab.
The check-in runs on what's in your repository, not on what you remember. You share your screen and
show us GitHub. Everyone on the team attends and speaks for their own work.

Each deliverable has two graded check-ins:

| Lab | Check-in | Graded on |
| :--- | :--- | :--- |
| Oct 23–29 | D3 plan | Your plan issue from Part 2: a checklist with a name on every item, opened before lab, covering who, order, steps, and dates. |
| Oct 30–Nov 5 | D3 process | The same issue, kept up to date: done items link to the work that did them, and changes to the plan are recorded. |
| Nov 13–19 | D4 plan | Your D4 plan issue, as for D3. |
| Nov 20–26 | D4 process | As for D3. |

L1J: your Oct 29 lab is cancelled for the midterm, so your D3 plan check-in is on Oct 22.

The process check-in is graded on whether your issues connect to your work, not on how much of it is
done.

**Before each lab:**

1. **Update last week's issue.** Tick what's done and put the pull request or commit next to it
   (you can type `#12` or paste a commit hash and GitHub will create a link). For anything not done, comment on why:
   it's blocked, the plan changed, or it took longer than expected.
2. **Open this week's issue.** List the coming week's work as a checklist, with a `@name` on every
   item, carry over what didn't get done, and link last week's issue. GitHub shows when an issue was
   opened, and one opened during the check-in doesn't count as a plan.

**As you work,** mention the issue in commit messages and pull request descriptions (`Part of #12`, or
`Closes #12` when it finishes the issue). Each mention appears on the issue's timeline, so the history
builds itself.

**In the check-in,** your TA will ask you to:

- show this week's issue, with each of you saying which items are yours and what you'll do first (at a
  process check-in, this is what's left before the deadline);
- open the issue you showed last time and click through from a ticked item to the work that did it;
- show what merged since the last check-in, what is blocked, and which pull request is waiting for
  review and who is reviewing it.

Only what is on GitHub counts. If you agreed on something in a call or a chat, write it in the issue.

### Examples of good process artifacts

**Weekly issues.** This is last week's issue, updated before lab:

```markdown
Week of 30 Oct · previous: #5

- [x] Agree on IGeoLocator's signature (@ana, @raj): see comment below
- [x] FakeGeoLocator and the three skip/keep tests (@raj): #8
- [x] Review #8 (@ana)
- [ ] Move Building and Room out of App.ts (@ana): started in #9, carried over to #11
      because #8 changed the code it moves

Blocked: nothing.
```

**Commit messages.** "fix", "D3 stuff", and "address review" don't say anything. Compare:

```text
Extract the geolocation request into GeoLocator

Dataset processing still constructs GeoLocator directly; injecting it
through AppConfig comes next. No behaviour change.
```

**Pull request descriptions.** Write for a reviewer who hasn't seen your plan:

```markdown
Closes #4.

**What:** Dataset processing now asks an IGeoLocator for coordinates instead of calling fetch.
**Why:** The skip-on-failure behaviours couldn't be tested without the network.
**Testing:** Three new tests use FakeGeoLocator; test/online/ has one against the real service.
**Open question:** Should a failed lookup be undefined or an error? I chose undefined; see GeoLocator.ts.
```

**Review comments.** "LGTM" says nothing, and a comment about naming or formatting is fine but isn't a
design comment. A design comment names a consequence and suggests an alternative or asks a question:

> `locate` returns the service's raw response, so dataset processing still has to know the service's
> error format, and so does the fake. Could it return coordinates or `undefined` instead?

## Grading

This deliverable is 50% autograded and 50% manually graded.

- **Autograded (50%).** As in D2, your highest-scoring commit on `main` before the deadline is the one that counts.
  Request feedback with `@310-bot #d3`. The autograder checks:
  - 2A requirements 1 and 2, and 2B requirements 1–3;
  - that your tests outside `test/online/` pass offline;
  - that existing behaviour still works, including the buildings and rooms endpoints and the three
    behaviours in 2B.

  The feedback has a section for each of 2A and 2B (and 2C, unscored, for groups of three), so each lead
  can see how their part is doing.

  **Get feedback before you merge.** The bot runs on any commit, not only on `main`, but it doesn't respond
  to comments on a pull request. To check a pull request before merging it, open its **Commits** tab, click
  the latest commit, and comment `@310-bot #d3` at the bottom of that page (see [AutoTest](./autotest.md)).
  Only commits on `main` count toward your grade.
- **Manually graded (50%).** Your DELIV3 answers; the pull request you link for each part, with its
  commits and review (see [Working as a team](#working-as-a-team)); and 2C for groups of three. Your D3 plan and process
  [check-ins](#weekly-check-ins) count as part of this.
