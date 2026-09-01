<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES
  Due Fri 6 Nov, 18:00. Pairs form in the Oct 16–22 lab block (the one straight after D2).
  This deliverable deliberately spans the midterm, so it is the LIGHT paired one. If the
  midterm moves, re-check that the heavy deliverable still isn't the one crossing it.

SPEC-DEPENDENT — verified against insight-ubc-v2.spec.yml, 2026W1
  Exactly three endpoints carry `deprecated: true`: POST /api/v1/datasets (~34),
  GET /api/v1/datasets/{id} (~197), POST /api/v1/search (~652). The whole "why is this a
  major version" argument rests on those three. RE-CHECK IF THE SPEC IS REGENERATED.
  Everything under /api/v1/courses is NOT deprecated and is meant to stay.
  Also verified: v1 courses and v2 buildings trees are convention-identical (same pagination
  envelope, same links shape, same $ref'd NotFoundError/ValidationError). The "infer the house
  style" work depends on that consistency actually holding.

TUNABLE CONSTANTS
  Walking speed 5 km/h, straight line. Chosen so feasibility is arithmetic, not routing.

REQUIRES (not yet built)
  Two example documents (student timetable, draft term schedule) + 8-10 worked scenarios with
  ground-truth answers. Publish the scenarios; students who can self-diagnose don't appeal.
  Unresolved: where section enrolment comes from for the overflow rule.
  Also: a v3 skeleton YAML + the validator command, both handed out in the Oct 23-29 lab, which
  carries the OpenAPI tutorial. That lab is the ONLY place the mechanics are taught before this is
  due - the specification lectures land Nov 17, eleven days after. If the lab moves, this breaks.

GRADED ON SOMETHING NOT YET TAUGHT
  "Complete enough to build from" is assessed here; Specification & modeling teaches it later. That
  ordering is deliberate (struggle, then procedure - the spec swap collects on it). It does mean the
  handout owes students a completeness bar to aim at, in the weak-vs-strong contrast form D1 and D2
  use. Not yet written.
-->

# Deliverable 3 — Design v3

**Due Friday 6 November, 18:00 · pairs · submit on GitHub and PrairieLearn**

Details will be released after the D2 deadline.

<!--
You are going to specify a new major version of InsightUBC. **You will not implement any of it** —
that's [D4](d4-build-it.md). This deliverable produces a document that another team could build
from, and a set of decisions you can defend.

## Finding a partner

Pairs form during the **Oct 16–22 lab block**, with someone in your own lab section. Register with
your TA.

You will both bring a working repository out of D2, and you have to carry exactly one of them
forward. **Read each other's before you decide.**

Each of you reviews your partner's D2 pull request on GitHub, leaving comments inline on the diff.
This is the first time you'll see someone else's solution to a problem you just solved yourself, and
it is the whole basis for the adoption argument you submit below — *"we kept mine"* with no evidence
is not an argument.

**What to look for**, since we haven't taught review process yet — you already have the vocabulary,
so use it:

- Where is the seam, and does the interface describe a *need* or a *mechanism*?
- What would it cost to add a second caller with a different reason for wanting the same capability?
- Which of the two of you has fewer places that must agree for a change to be correct?
- What did they do that you didn't think of?

**Comment on design, not style.** Formatting is not worth a reviewer's attention, and "I'd have done
this differently" is only useful with a reason attached. Assume competence; ask questions rather than
issuing instructions.

## The brief

Two requests have landed with the Decision Support team in the same month.

**From the AMS:**

> Students build their timetables by hand every term, and every term some of them end up with two
> classes at the same time, or with fifteen minutes to cross campus between a lecture in ICCS and one
> in Buchanan. The registration tool already produces a draft timetable — what students want is
> something that will *check* it before they commit. And most of them plan two or three options
> before deciding, so they'd like to keep those around.

**From Scheduling Services:**

> The term schedule isn't produced by one system. Departments submit their own section requests, we
> assign rooms centrally, and then it gets patched by hand for weeks — a room goes out of service, an
> instructor swaps a slot, a department splits a section in half. By the time we publish, nobody can
> say with confidence that the whole thing still holds together, and every year something ships
> broken: a room booked twice in the same hour, a class of 200 in a room that seats 60, an instructor
> timetabled in two buildings at once. We'd like to submit the merged draft and get back a list of
> everything wrong with it.

Neither group wants InsightUBC to *build* a schedule. Both have a system that produces one already.
What they want is something that will tell them what's wrong with it.

That's the whole brief. It is deliberately written the way requests actually arrive — in terms of
what someone wants, not in terms of endpoints. **Turning it into a specification is the deliverable.**

### What is fixed

Two documents arrive from other systems, so their shape is not yours to choose. Both are given with
this deliverable, along with a set of worked examples.

- **A student timetable** lists entries, each naming a section, the days it meets, its start and end
  times, and the building it meets in.
- **A draft term schedule** lists assignments, each naming a section, a room, the days it meets, and
  its start and end times.

Four definitions are also fixed, so that every pair's system can be checked against the same
scenarios:

- **Two entries clash** if their times overlap on any day they share.
- **A timetable is reachable** if, for every pair of entries a student attends back to back on the
  same day, the walking time between their buildings fits in the gap. Assume 5 km/h in a straight
  line between building coordinates.
- **A room is double-booked** if two assignments put different sections in it at overlapping times.
- **An assignment overflows** if the section's enrolment exceeds the room's seat count.

Everything else — the endpoints, the request and response shapes, what a "violation" looks like,
which status codes you use, how a saved timetable is identified — is yours to design.

### What v3 does not do

**There is no authentication, and v3 is not adding any.** InsightUBC has never had user accounts;
v1 and v2 don't authenticate anybody, and building an identity system is not what this deliverable
is about.

So the owner identifier on a saved timetable is a **claim, not a credential.** The system takes the
caller's word for who they are. Anyone who supplies a given student number can list, read, and
change that student's timetables.

Say that out loud in your specification rather than leaving it implicit, and be precise about what
it means:

- An identifier that's hard to guess is **not** access control. It stops a timetable being *found*;
  it does nothing to stop it being *read* by anyone who obtains it.
- Knowing *who* a caller claims to be (identification) is a different thing from having *checked*
  it (authentication), which is a different thing again from deciding *what they may do*
  (authorization). v3 does the first only.

Being able to state exactly what your system doesn't protect is part of designing it, and we'll
come back to it in lecture.

If enforced ownership interests you, it's on the extension menu below — and note that even there,
you are designing the model, not shipping real authentication.

### What you must cover

Your v3 specification must describe:

1. **Saved timetables** — creating, reading, changing, deleting, and listing the timetables kept
   under a given owner. The owner is a plain identifier supplied by the caller, like a student
   number; see *What v3 does not do* above.
2. **Checking a student timetable** — reporting clashes and reachability problems.
3. **Validating a draft term schedule** — reporting double-bookings, overflows, and instructor
   conflicts. This one does not need to be stored; Scheduling Services submits a draft and wants an
   answer.
4. **One extension of your choice**, from the list below.

### The design decision we will be looking for

Requirements 2 and 3 are both "take a document, return everything wrong with it." They overlap —
both care about times overlapping — and they differ, in what they're given and what counts as a
problem.

**Do they share machinery, or not?** One validation service or two? A common shape for a violation,
or a different one for each? The overlap check written once, or twice?

There is no right answer here, and we are not looking for a particular one. We are looking for a
decision you made deliberately and can defend — including "we duplicated it on purpose, and here's
why that was cheaper than the abstraction."

### Choose one extension

Each is about a week of work in D4 and each forces a different design question. Pick on the basis of
which question you'd rather argue about.

| Extension | The design question it forces |
| :--- | :--- |
| **Ranking candidates** | A student submits several timetables and wants the one with the least walking. How do you express ranking, and what happens to ties? |
| **Time-window preferences** | How do you express a constraint like "nothing before 10am" in a request without inventing a query language? |
| **Timetable comparison** | Is a diff a resource, or an operation on two resources? |
| **Sharing & access** | If ownership were enforced rather than asserted, what would change? Design the model — who may read, who may edit, how a timetable gets shared — not a production auth system |
| **Alternate sections** | Given a clash, what could replace it? Suggestions are a list, so: ordering, limits, and pagination, all over again |

## Why this is a new major version

Adding endpoints doesn't break anybody, and by the versioning rules from lecture that makes it a
*minor* change.
So if all v3 did was add scheduling, `v2.1` would be the honest label.

Two things make it major. First, **v3 removes what v2 deprecated** — `POST /api/v1/datasets`,
`GET /api/v1/datasets/{id}`, and `POST /api/v1/search`. Each has a v2 counterpart and the migration
is just a change of URL, but a consumer who ignored the deprecation notice gets a 404 the day v3
ships. Easy to migrate and breaking are not the same property. Deprecation is a promise that
something will stop working; a major version is where that promise comes due.

Second, and worth separating carefully: **`/api/v1` and `/api/v2` are not semantic versions.** They
are paths — a way of serving two contracts side by side so consumers migrate on their own schedule.
`MAJOR.MINOR.PATCH` describes how much a contract changed. The two mechanisms are related but
different, and conflating them is why this question feels slippery.

Note also what is **not** deprecated: everything under `/api/v1/courses` is live, supported, and
staying. Read the specification rather than assuming that "v1" means "obsolete."

## The conventions you're inheriting

Read the specification carefully before designing anything, because it is more consistent than it
first appears. It documents both live contracts in one document — `/api/v1` and `/api/v2` are served
side by side, not one after the other — and the courses tree and the buildings tree use the same
pagination envelope, the same `links` shape, the same status codes for the same situations, and
literally the same error schemas.

**Nobody wrote those conventions down as rules.** Part of your job is to work out what they are,
state them explicitly, and then apply them to a domain — scheduling — that the original authors
never considered.

Where the existing conventions genuinely don't answer a question your design raises, you decide, and
you say that you decided. Departing from precedent is allowed; departing from it silently is not.

**One question the house style does not settle, and you will have to.** Almost every endpoint in the
existing API manipulates a stored thing: `GET`, `PUT`, and `DELETE` over courses, sections,
buildings, rooms. Two endpoints don't — `POST /datasets` and `POST /search` both take a document and
do something with it.

Checking a timetable is the second kind. So is it an operation, in the style of `POST /search`? Or
is a check a *resource* — something you create, that has an identity and a result you can fetch
later?

This is a question about what the client needs, not about REST trivia: **does anyone ever need to
look at a past check again?** Answer that and the shape follows.

We are not grading which one you pick. We're grading whether you can say **what would have made the
other answer right** — *"we made it an operation; we'd have made it a resource if the check were
expensive enough to run asynchronously, or if anything else needed to refer to a past result."*
Naming the condition that would flip a decision is most of what design judgment is.

**A second one, where no answer is free.** Students want to check a timetable *before* they commit
to it, and they also keep two or three saved ones they'll want checked. So does your check accept a
submitted document, the id of a saved timetable, or both?

Both is tempting, and it leaves you with two paths computing the same answer — you know by now what
that costs. Document-only means you can't check something you already saved without sending it
again. Id-only means you have to save before you can find out whether it's any good. Pick, and say
what you gave up.

Whichever way both of these go, the argument belongs in your departures.

We don't lecture on REST conventions, so here is the baseline underneath all of this — you'll find
the existing specification already obeys every line:

- Resources are plural nouns; identifiers go in the path, not the query string.
- `GET` never changes anything. `PUT` with the same body twice leaves the same result as once.
- `200` for a successful read, `201` when you created something, `204` when there's nothing to
  return, `404` when the thing doesn't exist, `422` when the request was well-formed but its
  contents were invalid.
- Errors have the same body shape at every endpoint, and collections are paginated the same way
  everywhere.

We are **not** grading you on REST trivia. We're grading whether your specification is complete,
consistent with what it extends, and defensible — and in D4, on the design of the code behind it.

## What to submit

**1. Adoption review** — half a page, plus a link to each of the two reviews you left on each
other's D2 pull requests. Which repository you're carrying forward, what the adopted one does
better, what it does worse, and what you're fixing first. Cite what you found in review.

**2. Convention inventory** — the house style, written down. Pagination, error bodies, link
structure, naming, and which status code means what. Cite where in the existing specification you
found each one.

**3. Departures** — every place your v3 design does *not* follow the inherited convention, with the
reason. Include the resource-versus-operation decision above. If there are no other departures, say
so; that's a legitimate answer.

**4. The specification** — a complete OpenAPI document for v3: every path, every schema, every
status code, including the error cases. **It must validate.**

Authoring the document and running the validator are covered in lab, with a skeleton to start
from. Have that skeleton validating before your first team check-in — discovering the tooling the
night before is an avoidable way to lose marks on this.

**5. Extension choice**, with a sentence on why.

**6. The sharing decision** — a paragraph on requirements 2 and 3. What, if anything, do your two
validators have in common in your design, and why did you draw the line there?

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded | Your OpenAPI document parses and validates |
| Judgment | The adoption review, the convention inventory, the departures, the sharing decision, and whether the specification is complete enough to build from |

**The failure mode to avoid:** designing v3 "properly" from scratch. A pair that invents its own
error shape, its own pagination, and its own link style has produced a system with two ways of doing
everything and no reason for either. Matching the house style beats a better-in-isolation
alternative, and we grade the argument, not the aesthetics.

You will build exactly what you specify here. Choose accordingly.
-->