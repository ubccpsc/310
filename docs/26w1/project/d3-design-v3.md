<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES
  Due Fri 6 Nov, 18:00. Pairs form in the Oct 16–22 lab block (Lab 6, which also covers code review).
  Spans the midterm (Thu 29 Oct), so this is the LIGHT paired one. D4 is the heavy one.

SHAPE
  Part 1 adoption decision → Part 2 two code streams, one led by each partner, each reviewing the
  other's PR → Part 3 v3 HTTP spec. Facilities layering was dropped for pairs (refactoring fatigue;
  copying the courses layers is mostly mechanical) and kept only as 2C for groups of three. Layering
  decisions move to D4, on new code.

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
  - Add to each pair repo, from project-resources/implementation/d3-reference: src/v3/contract.ts (from
    src/v3/), and src/v3/index.ts and test/contract/examples.json (from starter/). The handout points at
    these for the exact rules, so they must exist before it is published.
  - 5–7 more worked scenarios in examples.json (3 so far). The reference suite runs every example, so
    `yarn test:d3-reference` in implementation/ checks them against the rules.
  - Optional: a local `yarn spec:check` for students (the grader's CheckOpenApiV3 as a script), so the
    spec checks aren't only visible through the bot.

BUILT (project-resources, D3Grader; weights out of 100, Regression subtractive)
  - Seam 35: CheckGeoSeam (IGeoLocator declared and implemented by GeoLocator; fetch only inside
    GeoLocator; GeoLocator named only in its own file, App.ts, index.ts; optional AppConfig.geolocator
    typed IGeoLocator).
  - Offline 15: group's tests minus test/online/ and test/contract/, with fetch always failing. The
    starter suite has exactly one network-dependent test (Test 97g), so this mostly checks that the
    group's own fake-based tests really use the fake.
  - TestsValidate 17.5 / TestsCheck 17.5: test/contract/ against the reference v3 with 13 + 12 mutants;
    full credit at 80% killed. The reference returns results in a fixed non-natural order, so
    order-dependent tests fail at baseline (and are reported by title as wrong expectations).
  - Spec 15: CheckOpenApiV3, 11 structural checks of /api/v3 (replaces yarn docs:lint: redocly isn't in
    the grading image). The starter's own v1 courses and v2 operations pass all of them.
  - Regression up to -20: test/d3 (six geolocation checks with fetch replaced; all pass on the starter)
    plus D2's regression suite.
  - Repo prefixes for d3/d4 are a guess ("project_", "team_"); confirm with Classy.

GROUPS OF THREE (~5–6 teams; DELIV3 has groupMaxSize 3)
  The third member leads 2C, facilities layering, graded manually. It collides with 2A (the geolocation
  call sits in the facilities parsing code in types.ts); the handout tells them to agree on an order.
  PL needs a third role with submit permission on the 2C questions. In D4 the third member leads
  Stream C, ranking candidates.

OPEN
  - Split of the autograded 50%.
  - Students can't run contract tests against a working implementation until D4. Option: ship a
    compiled reference as a dev dependency.

CONTRACT (summary; the canonical copy, with the rules as doc comments, is
project-resources/implementation/d3-reference/src/v3/contract.ts, copied verbatim into project-starter)

  export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  export interface TimetableEntry {
    section: string;  // "CPSC 310 101"
    days: Day[];
    start: string;    // "HH:MM", 24-hour
    end: string;
    building: string; // building id, "ICCS"
  }
  export interface TimetableDoc { entries: TimetableEntry[] }
  export interface Coordinates { lat: number; lon: number }
  export interface BuildingLocations { coordinatesOf(buildingId: string): Coordinates | undefined }
  export type Violation =
    | { kind: "clash"; day: Day; sections: [string, string] }
    | { kind: "unreachable"; day: Day; from: string; to: string }
    | { kind: "unknown-building"; section: string; building: string };
  export function distanceKm(a: Coordinates, b: Coordinates): number; // haversine, R = 6371 km
  export type Problem =
    | "missing" | "wrong-type" | "empty" | "bad-time" | "no-days" | "unknown-day"
    | "repeated-day" | "end-not-after-start" | "duplicate-section";
  export interface ValidationProblem { path: string; problem: Problem }

  src/v3/index.ts:
  export function validateTimetable(doc: unknown): ValidationProblem[];
  export function checkTimetable(doc: TimetableDoc, buildings: BuildingLocations): Violation[];

  validateTimetable rules:
  - Paths look like "entries[2].days[1]"; the document itself is "".
  - Root not a plain object (null, array, primitive) → only { "", wrong-type }.
  - entries missing → only { "entries", missing }; not an array → only { "entries", wrong-type }.
    An empty entries array is valid.
  - An entry that isn't a plain object → { "entries[i]", wrong-type }; its fields aren't checked.
  - section, building, start, end: missing → missing; not a string → wrong-type. section and building
    "" → empty. start/end not exactly two digits, colon, two digits with hours 00–23 and minutes
    00–59 → bad-time (so "9:30", "24:00", "12:60", " 09:30" are all bad-time).
  - days: missing → missing; not an array → wrong-type; [] → no-days. Per element: not a string →
    { "entries[i].days[j]", wrong-type }; not one of Mon–Fri (case-sensitive) → unknown-day; same as
    an earlier element → repeated-day (on each later occurrence).
  - end-not-after-start on "entries[i].end", only when start and end are both valid times.
  - duplicate-section on "entries[i].section" for each entry whose (valid) section equals an earlier
    entry's.
  - Extra fields are ignored at every level.
  - Every problem exactly once, in no particular order.

  checkTimetable rules:
  - Precondition: validateTimetable(doc) returns []. Otherwise unspecified.
  - Overlap: both meet that day and each starts before the other ends (10:00 end / 10:00 start don't).
  - Clash: one per pair of entries per day they overlap; sections in alphabetical order.
  - Back to back: on a day, A then B if A ends at or before B starts and no other entry that day starts
    in [A.end, B.start).
  - Unreachable: for each back-to-back pair with both buildings known, walking minutes =
    distanceKm * 12; violation if walking > gap; from = A, to = B. Same building always reachable. No
    tests within a few seconds of the threshold.
  - Unknown building: one per entry whose building isn't a key; still checked for clashes, skipped for
    reachability.
  - Every violation exactly once, in no particular order.

EXAMPLE (first entry of examples.json; checked by hand)
  Buildings: DMP 49.26125,-123.24807 · BUCH 49.26826,-123.25468 · ICCS 49.26114,-123.24872
  (DMP–BUCH 0.92 km / 11.0 min, BUCH–ICCS 0.90 km / 10.8 min, DMP–ICCS 0.05 km)
  Entries:
    CPSC 310 101  Tue Thu  09:30–11:00  DMP
    ENGL 110 001  Tue Thu  11:00–12:30  BUCH
    STAT 251 101  Tue      12:00–13:00  ICCS
    MATH 200 102  Thu      12:45–13:30  ICCS
    PHIL 220 001  Fri      14:00–15:00  FRDM
  Expected:
    unreachable Tue CPSC 310 101 → ENGL 110 001
    unreachable Thu CPSC 310 101 → ENGL 110 001
    clash Tue [ENGL 110 001, STAT 251 101]
    unknown-building PHIL 220 001 FRDM
  Thu ENGL → MATH reachable (15 min gap, 10.8 min walk). Tue CPSC → STAT not back to back (ENGL
  starts in between).
-->

# Deliverable 3

**Due Friday 6 November, 18:00 · pairs · submit on GitHub and PrairieLearn**

Details will be released after the D2 deadline.

<!--

The AMS has asked for v3:

> Every term, some students end up with two classes at the same time, or with ten minutes to cross
> campus between Buchanan and ICCS. They want something that will *check* a timetable before they
> commit to it, and somewhere to keep the two or three options they plan.

In this deliverable you prepare the codebase for v3 and specify its API. You will build it in D4.
Each partner leads one of 2A and 2B, and reviews the other's pull request on GitHub, commenting on the
design, before it is merged. In groups of three, the third member leads 2C. Submit DELIV3 once per
group.

## 1. Choose a codebase

Compare your D2 refactors and choose one repository to carry forward. Push its `main` to your pair
repository. Focus on design, not style: what does each common interface describe, what would a third
kind of dataset cost, and how many places must agree for a change to be correct?

Submit in DELIV3, Part 1:

1. **Which repository you adopted**, and what it does better and worse than the other. Point to specific
   files and functions in both.

## 2. Prepare for v3

### 2A. Put geolocation behind an interface

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
   All other tests must pass with no network access. Existing tests that need the real service can
   simply move to `test/online/`; you don't need to convert them to your fake.

Submit in DELIV3, Part 2A:

1. **Pre-analysis** (before you change any code): why are these behaviours hard to test? Use testability
   terms such as controllability, observability, and automatability.
2. **A link to the merged pull request**, with your partner's review on it.
3. **Post-analysis:** how did depending on `IGeoLocator` (DIP) address the problems in your
   pre-analysis? How many classes did you touch, and is that acceptable in terms of future cost of
   change? If not, propose a refactoring that would help.

### 2B. Test timetable validation and checks

`src/v3/index.ts` declares two functions, which you will implement in D4. Write their tests now.

- `validateTimetable(doc)` reports everything that makes a submitted document malformed: missing
  fields, wrong types, bad times, unknown or repeated days, an entry that doesn't end after it starts,
  and duplicate sections.
- `checkTimetable(doc, buildings)` reports what's wrong with a well-formed timetable. The timetable names
  buildings only by id; `buildings` is a `BuildingLocations` that looks up a building's coordinates. In D4
  you'll back it with InsightUBC's facilities data; in your tests, pass a fake. A check reports:
  - **clash:** two entries overlap on a day they both meet;
  - **unreachable:** two back-to-back entries are too far apart to walk between at 5 km/h;
  - **unknown-building:** `buildings` doesn't know an entry's building.

We fix these types and signatures so we can test your rules and your tests automatically; everything
else is yours. The exact rules are in the doc comments in `src/v3/contract.ts`, and
`test/contract/examples.json` has worked examples.

Requirements:

1. Put your tests in `test/contract/`, importing only from `src/v3/`. Call the functions directly.
2. Don't depend on the order of the results.
3. Only call `checkTimetable` with documents that `validateTimetable` accepts.

These tests fail against the stub until D4. AutoTest reports how many of them pass against our
implementation.

Submit in DELIV3, Part 2B:

1. **A link to the merged pull request**, with your partner's review on it.
2. **Partitions:** the partitions and boundaries your tests cover for each rule of `validateTimetable`
   and `checkTimetable`.

### 2C. Layer facilities (groups of three only)

Courses and sections have been split into routers, controllers, services, and repositories. Buildings,
rooms, and facilities datasets still live in `Model.ts`. Move them into the same layers, without
changing any behaviour. 2A changes the same dataset processing code, so agree with its lead on an order
before you start.

Submit in DELIV3, Part 2C:

1. **A link to the merged pull request**, with a partner's review on it.
2. **Layers:** how did you divide the facilities code between the layers, and where did a choice
   between two layers come up?

## 3. Specify v3

Add v3 to `openapi.yml` under `/api/v3`, covering:

1. Saving, reading, replacing, deleting, and listing timetables under an owner, such as a student number.
2. Checking a timetable.

Request bodies carry the timetable document from the contract unchanged. Everything else is yours to
design: the paths, the responses, the status codes, the ids, and the errors. Follow the conventions of
the existing specification (pagination, links, error bodies, status codes) and state any departures.

The existing API doesn't settle two decisions:

- Is a check an operation, like `POST /api/v2/search`, or a resource with an id you can fetch later?
- Does a check accept a document, the id of a saved timetable, or both?

You will build what you specify now, so make it complete enough that someone else could build it.
Every operation needs its parameters, its request schema, and every status code it can return, each
with a response schema and an example. Describe the behaviour precisely, including the errors.
`422: "Invalid timetable"` is too vague. The problems `validateTimetable` reports are your `422` cases:
say how your response reports each one.

`yarn docs:lint` must pass. The autograder also checks the structure of your v3 operations: a summary or
description on each, declared path parameters, a schema and an example for every request body and response
(other than `204`), examples that match their schemas, errors in the existing error shape, and a `422` on
every operation that takes a request body.

Submit in DELIV3, Part 3:

1. **A link to the merged pull request.**
2. **Operation or resource:** which did you choose, and what would have made the other answer right?
3. **Document, id, or both:** what does your check accept, and what did you give up?
4. **Conventions:** three conventions your v3 follows, citing where each appears in the existing
   specification, and every departure, with its reason.
5. **Versioning:** by the versioning rules from lecture, is v3 a major, minor, or patch change, and what
   would make it major? (Multiple choice, one try.)

## Grading

This deliverable is 50% autograded and 50% manually graded.

- **Autograded (50%).** As in D2, your highest-scoring commit on `main` before the deadline counts.
  Request feedback with `@310-bot #d3`. The autograder checks:
  - 2A requirements 1–3;
  - that your tests outside `test/online/` pass offline;
  - your 2B tests, against our implementation and versions of it with small bugs introduced;
  - the structure of your v3 specification (Part 3);
  - that existing behaviour still works, including the three behaviours in 2A.
- **Manually graded (50%).** Your DELIV3 answers, your pull request reviews, whether your specification
  is complete enough to build from, and 2C for groups of three.
-->
