<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES — the whole scope warning is calendar-derived, so recount it every term
  Due Fri 27 Nov, 18:00. Fall break was Mon-Wed 9-11 Nov, taking three days out of week 10,
  which is where "roughly two and a half working weeks" comes from. If the break moves or
  disappears, recount and rewrite that sentence rather than leaving a stale number.
  Demos run in the Nov 27-Dec 3 lab block — i.e. starting the same day it's due, so demos are
  formative by construction. Friday sections demo a few hours before the deadline.

SCALE — 2026W1 was ~200 pairs
  Demos at 10 min/pair is ~33 TA-hours against ~40 hours of lab capacity in that block, and
  only fits because demos run alongside Lab 8. There is no slack; the 10 minutes has to be
  enforced. Recompute if enrolment changes.

SCOPE LEVER
  The chosen extension is the thing that overruns. It replaced an earlier "one non-functional
  change" requirement. If the term is short, cut here first.

REQUIRES (not yet built)
  Contract-test harness: validate their OpenAPI, then exercise their implementation against
  their own spec. Must be runnable by students before the deadline — at this scale, pre-deadline
  self-checking is what keeps regrade requests manageable.
-->

# D4 — Build it

**Due Friday 27 November, 18:00 · pairs · submit on GitHub**

Build the v3 you specified in [D3](d3-design-v3.md). Don't break v1 or v2 doing it.

This is the largest deliverable in the course, and it spans the fall break — you have roughly two
and a half working weeks. Plan on that number, not on "three weeks."

## What to build

**1. v3, as you specified it.** Saved timetables can be created, read, changed, deleted, and listed.
A student timetable can be checked for clashes and reachability. A draft term schedule can be
validated for double-bookings, overflows, and instructor conflicts. Plus the extension you chose in
D3.

Your implementation must match **your own specification** — the paths, the schemas, the status
codes, the error bodies. If you find while building that a decision from D3 was wrong, you may
change it, but then the specification changes too and you say so in the retrospective. What you may
not do is let the code and the document quietly drift apart.

**2. Reachability, properly.** For every pair of back-to-back entries, decide whether the walk fits
in the gap. This needs building coordinates. You already have a capability that turns an address
into coordinates — the one you put behind an interface in D2.

**3. The sharing decision, executed.** In D3 you decided whether your two validators share machinery.
Build what you decided. If you find while building that the decision was wrong, change it — and say
so in the retrospective, because "we thought we could share the overlap check and discovered the two
cases wanted different things" is a better answer than either design on its own.

**4. Every feature merged through review.** No PR merged by its own author. Your partner reviews
it first, on the diff, with comments that engage the design rather than the formatting — and the
author responds in follow-up commits rather than silently force-pushing. This is part of the process
evidence, and it is the same discipline you used to decide whose repository you were adopting in D3.

**5. The dependency rule holds.** Routes stay thin. Domain logic doesn't live in a router, and
persistence doesn't leak upward. This is the part of the deliverable most directly connected to what
the course has been teaching, and it's weighted accordingly.

**6. v1 and v2 still work.** The inherited suites pass, unchanged. Their consumers did not agree to
be disrupted because you wanted a cleaner design.

**7. Retrospective** — two pages, grounded in evidence from your repository rather than impressions.

## About that D2 interface

Reachability calls the geocoding capability from a completely different direction than D2 did, for a
completely different reason.

If the interface you designed in D2 describes a **need** — *give me coordinates for this address* —
this will take you an afternoon. If it describes a **mechanism** — *make this HTTP request and hand
me the response* — you are about to find out what that cost, because your new caller doesn't want to
make an HTTP request; it wants to know where a building is.

Either way, **say so in the retrospective**. A pair that writes *"our interface leaked the transport
and it cost us here, here, and here"* has understood something that a pair who guessed right may not
have. Honest failure is marked the same as success here; only vagueness loses marks.

## Retrospective

Two pages. Ground every claim in something we can look at — a commit, a pull request, a diff.

- **The seam.** How did D2's interface hold up under a caller it wasn't designed for? What would you
  change about it now?
- **The specification.** Where did the design you wrote in D3 turn out to be wrong, and how did you
  find out? Building against your own spec is the first time most people discover what specifying
  actually involves.
- **The two validators.** Did the sharing decision from D3 survive contact with the code? What
  would you do differently?
- **The conventions.** Did the house style you inherited fit scheduling, or did you have to depart
  from it? Were the departures you predicted in D3 the ones you actually made?
- **Footprint.** Pick one change you made during D4 and describe how far it spread. Compare it
  honestly with what the same kind of change cost you in D1.

That last question is the one the whole term has been building toward. Answer it with numbers.

## How this is graded

| | |
| :--- | :--- |
| Autograded | Your implementation conforms to **your own** D3 specification; the inherited v1 and v2 suites still pass |
| Judgment | Whether the code behind your endpoints reflects the design principles from the course, plus the retrospective |

Note what the autograder is doing: it reads the specification *you* wrote and checks that your
system does what *you* said it would. There is no hidden reference implementation to match. You
designed v3 freely — you just have to mean what you wrote.

A conformance check will be available to run against your repository before the deadline. Use it
early; a specification and an implementation drift apart faster than you expect.

## Demos

Your pair will walk a TA through **one design decision** during the Nov 27–Dec 3 lab block. Not a
product demo — a design conversation. Pick a decision you can defend: why that seam, why you departed from
the inherited convention there, why your two validators do or don't share code. Expect to be asked what you
rejected.

Ten minutes. Both of you talk.

## Scope warning, in earnest

Fall break takes three days out of week 10, and you'll be starting to revise for the final while
this is running. The extension you picked in D3 is the piece most likely to run over.

**Ship a complete core with a working extension rather than an ambitious core with a broken one.**
If something has to give, tell us in the retrospective what you dropped and why — a deliberate,
documented cut is an engineering decision and is graded as one. Silent incompleteness is not.
