# Project — InsightUBC

The project is where this course's ideas meet a system you didn't write: it exists to teach you to
work confidently in unfamiliar code, to judge a design by what the *next* change to it will cost, to
get untestable code under test, and to design an interface other people can safely depend on.
InsightUBC is not a trivial codebase and has a history and will force you to engage with a real system with real imperfections.

Deadlines, weights, and policies are in the [syllabus](../syllabus.md); the
[schedule](../schedule.md) shows how each deliverable lines up with lectures and labs.

## The system

**InsightUBC** is an internal service built for the Decision Support team in the UBC Registrar's
Office. It exists so that administrators and researchers can ask questions about how the university
actually runs from actual data.

- Which departments are consistently running oversubscribed sections?
- What did grade distributions in first-year courses look like before and after a curriculum change?
- We need a room for a 200-seat class on the south side of campus — what are the options?

The *course offering* data comes from the PAIR team and covers
years of historical data about classes, enrolments, and grades; the *facilities* data covers every building and room on campus. The
service ingests both and exposes them through a REST API that other teams inside the university
build against.

It has shipped twice:

- **v1** introduced datasets and course offerings — courses, their sections, and search functionality over them.
- **v2** added facilities. Buildings, rooms, geocoded locations, and search that spans both kinds of
  data.

The full REST API specification for InsightUBC can be found <a href="/310/26w1/project/spec.html" target="_blank">here</a>.

## How you got it
A real team of students built this initial InsightUBC system across a single term against fixed deliverable deadlines.
Their submission satisfied the spec and passed the grading suite.

Then the term ended, and they left.

You are the next team. Nobody is going to walk you through it, the original authors are not
available to answer questions, and the Registrar's Office would like to know when v3 is ready!

## Why the code is the way it is

You will open this repository and find things that make you wince. Before you conclude the previous
team was careless, understand what actually produced it, since the same forces will be acting on
you.

**They were measured on whether it worked.** Every deliverable asked whether the endpoints returned
the right answers. None of them asked whether the next change would be cheap. So when a deadline got
close — and they always do — the rational move was to make it work, and design lost every time it
competed with shipping.

**v2 was bolted onto a system designed for v1.** The original code was built for courses and
sections. Facilities arrived later, with a different shape and a different data source, and it got
added to a structure that hadn't anticipated it. That is the normal life of a successful system:
New requirements often arrive *after* an initial design has been set.

**They started a cleanup and ran out of term.** In their last deliverable the previous team was asked
to improve the design without changing behaviour. They got through the courses and sections slice —
you'll find it split into routers, controllers, services, and repositories — and then time ran out.
Everything else still lives where it always did, in one very large file.

So the repository you're inheriting has a split personality: one part that has been through a
refactor, and one part that hasn't. **Do not assume the refactored part is the target to copy.** It
has real problems of its own, and before long you'll be able to say precisely what they are.

This is what inherited code looks like. Not a disaster, not a model — a working system carrying the
fingerprints of every deadline that shaped it.

## Where this is going

The Registrar's Office wants **v3**, and you're going to design and build it!

**First, you find out what you're dealing with.** [D1](d1-drop-in-a-feature.md) asks for two small
features that will help you get acquainted with the codebase. The point is to experience and reflect on what
changing an inherited software system actually costs.

**Then you get it under control.** D2 points at a part of the system that
reaches out to the network (making it difficult to test) which the inherited test suite
does not test. You'll fix that by changing your system to be testable and then add the missing tests.

**Then you design v3.** D3 and D4 require you and a partner to put the software into the real world by considering 
(sometimes vague) requirements from stakeholders, transforming them into a specification, and then
implementing the software to match.

That job is harder than it sounds. The existing API has conventions that nobody ever wrote down as rules. You will have to read them
out of the <a href="/310/26w1/project/spec.html" target="_blank">specification</a> and then apply them to new requirements
that the initial design could not handle.

**Then you build it** — without breaking v1 or v2!
