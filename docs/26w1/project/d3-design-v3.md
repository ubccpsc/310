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
