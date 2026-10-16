<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES
  Due Fri 6 Nov, 18:00. Pairs form in the Oct 16–22 lab block (Lab 6, which also covers code review).
  Spans the midterm (Thu 29 Oct), so this is the LIGHT paired one. D4 is the heavy one.
  2C is a Decorator (wk 5), so it's taught before D3 is due.

SHAPE
  Part 1 adoption decision → Part 2 two behaviour-preserving refactors, one led by each partner, each
  reviewing the other's PR: 2A restructuring facilities, 2B geolocation behind IGeoLocator. Groups of three
  add 2C, a caching decorator around IGeoLocator (moved here from D4).

  The timetable contract tests (old 2B) and the v3 HTTP specification (old Part 3) moved to D4, along
  with the CONTRACT and EXAMPLE notes; see the parked block at the end of d4-build-it.md.

  This reverses the earlier call to keep facilities layering for groups of three only (refactoring
  fatigue; copying the courses layers is mostly mechanical). The reason to bring it back: v3 in D4 needs
  building coordinates (checks) and room seat counts (Scheduling Services), and once facilities is
  restructured it has something to depend on instead of Model.

  Beyond 2A's requirements, the structure is NOT graded, only the reasoning about it. Layers haven't
  been taught explicitly (dependency direction has), so the handout points at the courses slice as one
  option, not a template.
  Graded: the pre-analysis (current dependencies + plan) in DELIV3, the design explanation in the PR
  description, and the review discussion on it. Behaviour preservation is covered by Regression.
  2A requirements 1–4 are a floor so the code can't stay as it is, stated in terms of dependencies and
  names already in the code (express, fs, buildings.json, Building, Room, Model), not layers. The courses
  slice already meets 2–3. Dropped from the earlier CheckFacilitiesLayers idea: "no express-importing
  file imports an fs-importing one" (that's the controller→service→repository rule, too close to
  prescribing layers). Requirement 4 is the v3 seam: D4's BuildingLocations adapter calls it.
  Requirements 2–3 and the "outside express" part of 4 are static checks (TypeScript compiler API, like
  CheckGeoSeam). Requirement 1 is mostly static: no `class Building`/`Room`/`BuildingsDataset` in
  App.ts, and no buildings.json there. Until built, TAs check them from the PR (a grep each).
  Could reuse the same check in D4 for "routes stay thin, persistence doesn't leak upward" on v3 code.

  2A and 2B collide: the geolocation call is in the facilities processing code (BuildingsDataset in
  the starter's App.ts; wherever the adopted D2 repo moved it). The handout tells them to agree on an
  order. Either order works; 2B first means 2A moves code that already depends on IGeoLocator.

  If D2 turns out too easy: remove the three deprecated v1 endpoints (POST /api/v1/datasets,
  GET /api/v1/datasets/{id}, POST /api/v1/search). Small code change; the starter's App.spec.ts has
  ~57 refs to /api/v1/datasets and ~200 to /api/v1/search, mostly delete-or-replace-with-404.

REQUIRES (not yet built)
  - Pair repo provisioning: one partner pushes their D2 main into a new pair repo. No cross-repo
    permissions needed: Part 1 has no GitHub review (students share D2 code however they like, as in
    previous terms); code review happens on the Part 2 PRs inside the pair repo.
  - Confirm Classy's branch protection on pair repos requires an approving review before merge
    (GitHub already blocks approving your own PR). The handout asks for "a review on it" and grades the
    review's design comments, which an approval alone doesn't give.
  - Sync DELIV3 and check in PL that student-formed groups, auto-assigned roles, and zone canSubmit
    behave as expected (uses the newer `groups` schema). The old D3 questions are parked in
    questions/26w1/project/deliverable4/.
  - "Before you change any code" for the 2A and 2B pre-analyses: TAs compare the PL submission time
    with the first commit on the PR branch.
  - Lab check-ins for issues, in the lab blocks after pairs form (Lab 6 is where the first issue gets
    opened): the TA asks to see this week's new issue and walks through an earlier one's history. Add to
    those lab handouts and TA notes; decide whether it counts toward the lab grade.
  - TA rubric for "Working as a team", deliberately coarse (met / partly / not), per PR:
      commits: small steps with messages that explain, not one large commit;
      description: what / why / testing, linked issue;
      review: at least one design comment on the diff (not only naming or formatting);
      response: every comment answered by a commit or a reply; no self-merge, no force-push after review.
    The GitHub PR timeline shows all of this, so it's quick to check.
  - Regression has no buildings/rooms CRUD coverage yet (only test/d3 geolocation + D2 search). 2A
    moves all of that code, so add a hidden v2 buildings/rooms suite.

BUILT (project-resources, D3Grader; weights out of 100, Regression subtractive) — REWEIGHT
  - Seam 35: CheckGeoSeam (IGeoLocator declared and implemented by GeoLocator; fetch only inside
    GeoLocator; GeoLocator named only in its own file, App.ts, index.ts; optional AppConfig.geolocator
    typed IGeoLocator).
  - Offline 15: group's tests minus test/online/ and test/contract/, with fetch always failing. The
    starter suite has exactly one network-dependent test (Test 97g), so this mostly checks that the
    group's own fake-based tests really use the fake.
  - Regression up to -20: test/d3 (six geolocation checks with fetch replaced; all pass on the starter)
    plus D2's regression suite. This also covers 2A's "no behaviour change".
  - Moved to D4: TestsValidate 17.5 / TestsCheck 17.5 (contract tests vs reference + 13/12 mutants) and
    Spec 15 (CheckOpenApiV3). That leaves 50 of the old 100 here.
  - Repo prefixes for d3/d4 are a guess ("project_", "team_"); confirm with Classy.

GROUPS OF THREE (~5–6 teams; DELIV3 has groupMaxSize 3)
  The third member leads 2C, caching geolocation. It depends on 2B's IGeoLocator, so it can't merge
  before 2B. PL has a "2C lead" role (0–1 members) that submits the 2C zone. In D4 the third member
  leads Stream C, ranking candidates.

  The cache is per app and in memory, and failures aren't cached.

  2C is NOT autograded: the bot gets only the repo and commit (ContainerInput has no team info, and
  containerConfig.custom is per deliverable), and pulling per-repo results out of the grader DB afterwards
  is a pain. TAs grade it in PL from the PR and the linked tests.

  Scoring trios: PL caps at maxPoints, and in the 2026W1 config maxPoints is 20 while the zones sum to 22
  (2C is 2), so as configured 2C is slack for trios, not extra required work. Either rescale the ~5–6
  trios by hand at the end (earned / (maxPoints + 2C points); PL's instance score edit should do it), or
  accept 2C as the third member's share rather than extra credit. Past terms gave trios the same work
  as pairs, so this hasn't come up before.

OPEN
  - Autograded/manual split. With the contract tests and spec checks gone, consider 40/60 like D2.
-->

# Deliverable 3

**Due Friday 6 November, 18:00 · pairs · submit on GitHub and PrairieLearn**

In this deliverable you prepare your team's codebase for the next version of InsightUBC (v3), which
you will build in D4. There are two parts:

1. **Choose a codebase** (together): compare your D2 repositories and decide what to carry forward.
2. **Prepare for v3:** two refactors that must not change behaviour, 2A (restructure the facilities
   code) and 2B (put geolocation behind an interface), plus 2C (cache geolocation) for groups of three.

Each partner leads one of 2A and 2B, and in groups of three the third member leads 2C. The lead writes
that part's code, opens its pull requests, and answers its questions in DELIV3. Each lead also reviews
the other's pull requests before they are merged (see [Working as a team](#working-as-a-team)). Submit
DELIV3 once per group.

## 1. Choose a codebase

You each have a D2 repository, and you will carry one codebase forward. Before you choose, walk each
other through your own: what your common interface describes and why you gave it the methods you did,
and what your tests would catch if a later change broke search.

Then compare your repositories on the same two points:

- **The common interface.** What does each one describe? What would a third kind of dataset cost in
  each: which files would change, and how many places would have to agree?
- **The tests.** Which behaviours does each suite check that the other doesn't? Both parts of this
  deliverable are refactors that must not change behaviour, so these tests are your safety net.

You don't have to take everything from one repository. Push the `main` of the one whose code you want
to keep to your team repository. If another has something worth keeping, such as its tests, bring it
across in a pull request.

Submit in DELIV3, Part 1:

1. **Comparison:** how do your repositories differ in their common interface and in their tests? Point
   to specific files and functions in each.
2. **Decision:** what did you carry forward from each repository, and why? If you brought anything
   across, link the pull request.

## 2. Prepare for v3

Before anyone writes code, plan the work together and write the plan down as your first GitHub issue.
We won't grade it, but it's the cheapest place to find out that you disagree, and it can be the issue
you show your TA in your next lab (see [Working as a team](#working-as-a-team)). A useful plan
covers:

- **Who does what.** Who leads each part, and who reviews it.
- **Order.** 2A and 2B both change the facilities dataset processing code. Decide which goes first, or
  how you'll work at the same time without conflicts, for example by agreeing on `IGeoLocator` before 2A
  moves the code that calls it.
- **Steps.** Break each part into a checklist of steps small enough to be a commit or two. The
  requirements say what has to be true at the end; the steps are how you get there.
- **Dates.** When each pull request should be ready for review. Leave time for the review and the
  follow-up commits, and plan around the midterm.

Expect the plan to change. When it does, update the issue rather than starting a new one: an issue
whose history shows what you learned is more useful than one that was right the first time.

### 2A. Restructure facilities

v3 will need to look up facilities data, such as where a building is, without going through everything
else `Model` does. Right now the only way to get at it is through `Model`, which also handles requests,
stores files, and processes datasets, so v3 would depend on all of it. Restructure the buildings, rooms,
and facilities datasets code so that v3 has something smaller to depend on, without changing any behaviour.

Courses and sections have already been split into routers, controllers, services, and repositories
(`src/routers/`, `src/controllers/`, `src/services/`, `src/repositories/`). That is one way to do it,
but it isn't perfect and you are free to choose a different split. Beyond the requirements below, we
won't grade the structure you choose, but we will grade how well you reason about it.

Requirements:

1. **Out of `Model`.** Buildings, rooms, and facilities datasets are no longer declared, stored, or
   processed in `Model` or `App.ts`. `App.ts` may still create your pieces and connect them, and search
   may still use rooms, but only through your new code.
2. **Storage in one place.** Exactly one file in `src/` reads and writes the stored buildings
   (`buildings.json`).
3. **Requests and storage apart.** Apart from `App.ts` and `index.ts`, no file in `src/` both imports
   `express` and imports `fs`. The files that declare `Building` and `Room` import neither.
4. **Ready for v3.** There is a function or method, outside any file that imports `express`, that takes
   a building id and returns its coordinates. Write one test that calls it directly rather than through
   the HTTP API.
5. **No change in behaviour.** All existing tests still pass.

Explain your design in the pull request description: the structure you ended up with, how it differs
from your plan and why, and its pros and cons, including at least one thing it makes harder. Your
partner's review should respond to that explanation, not only to the diff.

Submit in DELIV3, Part 2A:

1. **Pre-analysis** (before you change any code):
   - **Current dependencies:** what does the facilities code depend on, and what depends on it? Which of
     those dependencies would make it hard to change, or to use from v3, and which way does each point?
   - **Plan:** the pieces you intend to split it into, what each is responsible for, and which way the
     dependencies between them point. A sketch of the dependency graph is fine.
2. **A link to the merged pull request**, with your design explanation in its description and your
   partner's review on it.
3. **Ready for v3:** a link to the function or method from requirement 4. What does it depend on, and
   what would v3 have to depend on to call it?

### 2B. Put geolocation behind an interface

Uploading a facilities dataset calls an external geolocation service for each building (step 6 of
`POST /api/v2/datasets`). Because that call is buried in the dataset processing code, these behaviours
can't be tested:

1. If geolocation fails for a building, that building and its rooms are skipped.
2. If it succeeds, the building gets the `lat` and `lon` the service returned.
3. If it fails for some buildings, the rest of the dataset still loads.

Requirements:

1. Declare an interface `IGeoLocator`, designed however you like. Dataset processing must depend only on
   this interface.
2. Implement `GeoLocator`. It must call the existing service URL with the built-in `fetch`, and it must
   be the only code in `src/` that calls `fetch`.
3. Add an optional `geolocator?: IGeoLocator` to `AppConfig`. `createApp({ datadir })` must still work,
   using a `GeoLocator`.
4. Implement `FakeGeoLocator` in `test/`, and use it to write one test for each behaviour above. These
   tests go through the HTTP API, like the existing tests.
5. Write one test in `test/online/` showing that `GeoLocator` returns coordinates for a known address.
   All other tests must pass with no network access.

Submit in DELIV3, Part 2B:

1. **Pre-analysis** (before you change any code): why are these behaviours hard to test? Use testability
   terms such as controllability, observability, and automatability.
2. **A link to the merged pull request**, with your partner's review on it.
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
4. Test it without the network.

This builds on 2B's `IGeoLocator`, so agree on the interface with 2B's lead early.

Submit in DELIV3, Part 2C:

1. **A link to the merged pull request**, with a partner's review on it.
2. **Tests:** links to the tests that show requirements 2 and 3.
3. **The interface:** what did your `IGeoLocator` make easy or hard about adding the cache?
4. **The test double:** what kind of test double did you use to test it, and why that kind?

## Working as a team

How you work together is part of this deliverable. We don't prescribe a process, but your repository
has to show the following.

- **Issues.** Plan your work as GitHub issues in your team repository. Before each lab, open an issue
  for the work you'll do in the coming week, with the work broken into a checklist and a name on each
  item. In lab, your TA will ask you to show it, and to walk through the history of an earlier one.
- **Commits.** Commit in small steps, each doing one thing, with a message that says what changed and
  why. When refactoring, each step should leave the tests passing. A pull request that is one large
  commit doesn't meet this requirement.
- **Pull requests.** Each of 2A, 2B, and 2C is merged through its own pull request(s). Its description
  says what changed, why, and how you tested it, and links the issue it closes.
- **Reviews.** Your partner reviews each pull request before it is merged, with at least one comment on
  the diff about the design. The author responds to every comment, either with a follow-up commit or
  with a reply explaining why not.

### What good looks like

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

- **Autograded (50%).** As in D2, your highest-scoring commit on `main` before the deadline counts.
  Request feedback with `@310-bot #d3`. The autograder checks:
  - 2B requirements 1–3;
  - that your tests outside `test/online/` pass offline;
  - that existing behaviour still works, including the three behaviours in 2B.
- **Manually graded (50%).** Your DELIV3 answers, your pull requests, commits, and reviews (see
  [Working as a team](#working-as-a-team)), the design explanation on your 2A pull request, and 2C for
  groups of three. Issues are checked in lab.
