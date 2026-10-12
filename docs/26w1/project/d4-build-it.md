<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES — the scope warning is calendar-derived, so recount it every term
  Due Fri 27 Nov, 18:00. Fall break is Mon–Wed 9–11 Nov, taking three days out of week 10, which is
  where "roughly two and a half working weeks" comes from. If the break moves, recount and rewrite.
  Demos run in the Nov 27–Dec 3 lab block, i.e. starting the day it's due, so demos are formative by
  construction. Friday sections demo a few hours before the deadline.
  The specification lecture (Nov 17) lands inside this deliverable, which is why the Scheduling
  Services spec is written here rather than in D3.

SCALE — 2026W1 was ~200 pairs
  Demos at 10 min/pair is ~33 TA-hours against ~40 hours of lab capacity in that block, and only fits
  because demos run alongside Lab 10. The 10 minutes has to be enforced.

SHAPE
  Stream A: AMS (saved timetables + check, built from their D3 spec). Stream B: Scheduling Services
  (new brief, spec'd and built here). Together: the overlap-sharing decision and a caching decorator
  around IGeoLocator. The extension menu from earlier drafts is gone; the Scheduling Services brief
  replaces it.

  The D3 geolocation seam pays off in two ways, neither a contrived "second caller": (1) testing v3
  end to end needs buildings at controlled coordinates, offline, which is exactly what FakeGeoLocator
  gives (controllability again, and the existing end-to-end tests offer no model for it); (2) the
  caching decorator (Decorator, wk 5) is easy if IGeoLocator describes a need and awkward if it
  describes a mechanism. PUT re-geocoding was considered and dropped as contrived.

GROUPS OF THREE (~5–6 teams)
  The third member leads Stream C, ranking candidates: no contract, graded manually. Chosen over the rest
  of the old extension menu because it reuses Stream A's store and walking rules and forces real design
  questions (ties, clashes, pagination). Fallback: timetable comparison. Alternate sections is not
  feasible (course_offerings has no meeting times). PL needs a third role for the Part 4 questions.

SCOPE LEVER
  Stream B is the thing to cut if the term is short: drop it and the sharing decision goes with it.
  Next cut: instructor conflicts.

REQUIRES (not yet built)
  - Contract additions in src/v3/contract.ts and src/v3/index.ts (reproduced below; keep in sync).
  - Reference implementation of validateSchedule, plus mutants (the validateTimetable and
    checkTimetable references and mutants already exist from D3). Shuffle result order, as in D3.
  - Hidden tests for the contract.
  - Hidden caching tests through createApp({ datadir }) with globalThis.fetch stubbed and counting:
    uploading the same facilities dataset twice in one app sends no second request for addresses that
    succeeded; failed addresses are requested again; a new app starts with an empty cache.
  - Offline run of the student suite minus test/online/ (same as D3).
  - A short TA procedure for "routes match the spec": pick two operations from the pair's openapi.yml,
    find the supertest test for each, check status codes and body shape against the spec.
  - 6–8 published worked scenarios for validateSchedule, in the D3 format.

DECIDED
  - Enrolment comes from the draft schedule (each assignment carries it), not from course_offerings.
  - The contract fixes only the rules (validateTimetable, checkTimetable, validateSchedule and their
    types). Storage of saved timetables is not in the contract: it ties into students' D3 decisions
    (ids, what a check accepts). Saving/reading/listing/persistence is graded manually via their HTTP
    tests. With less autograded, consider moving D4 to 40/60 like D2.
  - The cache is per app and in memory, and failures aren't cached. Per app so hidden tests in one
    process don't leak cached addresses into each other.
-->

# Deliverable 4

**Due Friday 27 November, 18:00 · pairs · submit on GitHub and PrairieLearn**

Details will be released after the D3 deadline.

<!-- DRAFT: remove this comment wrapper to publish.

Build v3. There are three parts:

1. **Stream A, saved timetables and checks:** build the API you specified in D3.
2. **Stream B, validating a term schedule:** a second request has arrived. Specify it and build it.
3. **Together:** decide what the two validators share, and put a cache in front of the geolocation
   service.
4. **Stream C, ranking candidates (groups of three only):** specify and build a ranking of a student's
   saved timetables.

As in D3, each of you leads one stream. This time, **every pull request is reviewed by your partner
before it is merged**, and neither of you merges your own (see [Working as a pair](#working-as-a-pair)).

This is the largest deliverable in the course, and it spans the fall break, so you have roughly two and
a half working weeks. Plan on that number, not on "three weeks."

The PrairieLearn assessment for this deliverable (DELIV4) has one part for each section below, plus a
retrospective. Submit it once per group.

## The contract grows

We will add the following to your pair repository. As before, don't modify `src/v3/contract.ts`.

In `src/v3/contract.ts`:

```typescript
export interface Assignment {
	section: string; // e.g. "CPSC 310 101"
	room: string; // a room id, e.g. "DMP_110"
	days: Day[];
	start: string; // "HH:MM", as in TimetableEntry
	end: string;
	enrolment: number;
	instructors: string[];
}

export interface DraftSchedule {
	assignments: Assignment[];
}

/** How many seats rooms have. Backed by the facilities data in the running system; a fake in tests. */
export interface RoomCapacities {
	/** The seat count of the room with this id, or undefined if the room isn't known. */
	seatsOf(roomId: string): number | undefined;
}

export type ScheduleViolation =
	| { kind: "double-booked"; room: string; day: Day; sections: [string, string] }
	| { kind: "overflow"; section: string; room: string }
	| { kind: "instructor-conflict"; instructor: string; day: Day; sections: [string, string] }
	| { kind: "unknown-room"; section: string; room: string };
```

In `src/v3/index.ts`, alongside `validateTimetable` and `checkTimetable`:

```typescript
export function validateSchedule(draft: DraftSchedule, rooms: RoomCapacities): ScheduleViolation[];
```

You may split the implementation across as many files as you like, but these exports must stay in
`src/v3/index.ts`.

## 1. Saved timetables and checks (Stream A)

1. **Implement `validateTimetable` and `checkTimetable`.** Your D3 contract tests should now pass.
2. **Implement the endpoints from your D3 specification.** How saved timetables are stored is yours to
   design; they must survive a restart. A check needs building coordinates, which already live in the
   facilities data. How your v3 code gets them, without reaching into the parts of the codebase that
   were never layered, is part of the design.

## 2. Validating a term schedule (Stream B)

A second request has arrived, from Scheduling Services:

> The term schedule isn't produced by one system. Departments submit their own section requests, we
> assign rooms centrally, and then it gets patched by hand for weeks: a room goes out of service, an
> instructor swaps a slot, a department splits a section in half. By the time we publish, nobody can
> say with confidence that the whole thing still holds together, and every year something ships
> broken: a room booked twice in the same hour, a class of 200 in a room that seats 60, an instructor
> timetabled in two buildings at once. We'd like to submit the merged draft and get back a list of
> everything wrong with it.

Nothing is stored. Scheduling Services submits a draft and wants an answer.

### What counts as a violation

`validateSchedule` assumes `draft` is well formed: times and days as for timetables, `enrolment` a
non-negative integer, no two assignments with the same `section`, and no instructor listed twice in one
assignment. *Overlap* means the same as for timetables.

- **Double-booked.** There is one `double-booked` for each pair of assignments in the same room and each
  day on which they overlap. `sections` is in alphabetical order.
- **Overflow.** There is one `overflow` for each assignment whose `enrolment` is greater than its room's
  seat count. A full room is not an overflow.
- **Instructor conflict.** There is one `instructor-conflict` for each instructor, each pair of
  assignments that both list them, and each day on which those assignments overlap. `sections` is in
  alphabetical order.
- **Unknown room.** There is one `unknown-room` for each assignment whose room isn't known to `rooms`
  (`seatsOf` returns undefined). That assignment is not checked for overflow, but it is still checked for double-booking and
  instructor conflicts.

The result contains every violation exactly once, in no particular order. As with `BuildingLocations` in
D3, `rooms` is backed by the facilities data in the running system; in your tests, pass a fake.

### Requirements

1. **Specify it.** Add the endpoint (or endpoints) to `openapi.yml` under `/api/v3`, to the same
   standard as D3: same house style, complete enough to build from, departures stated. The request body
   carries `DraftSchedule` exactly as given.
2. **Implement `validateSchedule`** and write contract tests for it in `test/contract/`, under the same
   rules as in D3.
3. **Implement the endpoint** on top of it.

## 3. What the validators share, and caching (together)

### The sharing decision

Clashes, double-bookings, and instructor conflicts all ask the same question: *do these two things
overlap on a day?* Beyond that the two validators differ: what they are given, what counts as a problem,
and what they report.

Do they share machinery or not? One overlap check or two? A common internal representation of a
violation, or one for each? Because you each lead one validator, you will have to agree.

There is no right answer, and we are not looking for a particular one. We are looking for a decision you
made deliberately and can defend, including "we duplicated it on purpose, and here's why that was
cheaper than the abstraction." If you change your mind partway through, say so. "We shared the overlap
check and then discovered the two cases wanted different things" is a better answer than either design
on its own.

### Caching geolocation

The team that runs the geolocation service has noticed that every facilities upload sends a request for
every building, even when the same campus was uploaded minutes earlier.

1. Implement `CachingGeoLocator`, which implements your `IGeoLocator` and wraps another one.
2. Once an address has been located successfully, later requests for it are answered from the cache
   without calling the wrapped geolocator. Failures are not cached.
3. Each app returned by `createApp` has its own cache, which starts empty. `createApp({ datadir })` uses
   a `CachingGeoLocator` around a `GeoLocator`.
4. Test it without the network.

## 4. Ranking candidates (Stream C, groups of three only)

The AMS has a follow-up:

> Most students plan two or three timetables before deciding. Given their saved options, they'd like to
> know which one involves the least walking.

Specify and build an endpoint that takes an owner's saved timetables and returns them ordered by total
walking time, using the same walking rules as `checkTimetable`. There is no contract for this one: the
definition of total walking time and everything about the request and response are yours to decide,
including:

- how ties are ordered;
- how timetables with clashes or unknown buildings are ranked;
- whether a ranking is an operation or a resource, and how pagination applies to it.

Specify it in `openapi.yml` to the same standard as D3, and test it through the HTTP API. Stream C
depends on Stream A's store and walking times, so write the specification first and agree with Stream
A's lead on what you need from their code.

## Working as a pair

- **Every feature is merged through review.** Your partner reviews each pull request on the diff, with
  comments about the design rather than the formatting. The author responds in follow-up commits rather
  than by force-pushing. No pull request is merged by its own author.
- **Routes stay thin.** Domain logic doesn't live in a router, and persistence doesn't leak upward. This
  is the part of the deliverable most directly connected to what the course has been teaching, and it is
  weighted accordingly.
- **v1 and v2 still work.** Their consumers did not agree to be disrupted because you wanted a cleaner
  design.
- **Code and specification agree.** If you find while building that a D3 decision was wrong, you may
  change it, but then `openapi.yml` changes too and you say so in the retrospective. Don't let the code
  and the document quietly drift apart.

Tests go in two places:

- **`test/contract/`:** tests that call the contract directly. We run these against our own
  implementation, as in D3.
- **Anywhere else:** tests for your v3 endpoints, through the HTTP API with `supertest`. Every v3
  operation in your specification needs at least one. TAs use these to check that your routes do what
  your specification says.

As in D3, everything outside `test/online/` must pass with no network access. A check needs buildings at
known coordinates, so its tests will need to upload facilities data with coordinates you choose.

## Submit in DELIV4

**Part 1 and Part 2:** links to the merged pull requests for each stream, with the reviews on them.

**Part 3:**

1. **The sharing decision** (a paragraph). What do your two validators have in common in the code, and
   why did you draw the line there? Link to the code.
2. **The cache.** What did your `IGeoLocator` make easy or hard about adding it? What kind of test
   double did you use to test it, and why that kind?

**Part 4 (groups of three only):**

1. **Links to the merged pull requests** for Stream C.
2. **Ranking decisions:** how did you handle ties, clashes, and unknown buildings, and what would have
   made you decide differently?

**Retrospective** (two pages at most). Ground every claim in something we can look at: a commit, a pull
request, a diff.

- **The seam.** How well did your D3 `IGeoLocator` and `FakeGeoLocator` support testing your v3
  endpoints? What would you change about them now?
- **The specification.** Where did your D3 design turn out to be wrong or incomplete, and how did you
  find out?
- **The validators.** Did your sharing decision survive contact with the code? What would you do
  differently?
- **The conventions.** Were the departures you predicted in D3 the ones you actually made?
- **Footprint.** Pick one change you made during D4 and describe how far it spread. Compare it honestly
  with what the same kind of change cost you in D1. Answer with numbers.

## Demos

During the Nov 27–Dec 3 lab block, your pair walks a TA through **one design decision**. This is not a
product demo but a design conversation. Pick a decision you can defend: why that seam, why you departed
from a convention there, why your validators do or don't share code. Expect to be asked what you
rejected.

Ten minutes. Everyone talks.

## Grading

This deliverable is 50% autograded and 50% manually graded.

- **Autograded (50%).** Graded on every push to `main`, as before. Request feedback with
  `@310-bot #d4`. The autograder checks:
  - `validateTimetable`, `checkTimetable`, and `validateSchedule`, against our own tests;
  - caching, by counting the requests that reach our own fake geolocation service;
  - your `test/contract/` tests, against our implementation with small bugs introduced;
  - that your tests outside `test/online/` pass offline;
  - `yarn docs:lint`;
  - existing v1 and v2 behaviour.
- **Manually graded (50%).** Whether your routes match your specification, whether the code behind them
  follows the dependency rule, the sharing decision, your reviews of each other's pull requests, your
  DELIV4 answers, the demo, and Stream C for groups of three.

## Scope warning, in earnest

Fall break takes three days out of week 10, and you'll be starting to revise for the final while this is
running.

**Ship a complete Stream A and a working Stream B rather than two ambitious, broken ones.** If something
has to give, tell us in the retrospective what you dropped and why. A deliberate, documented cut is an
engineering decision and is graded as one. Silent incompleteness is not.
-->
