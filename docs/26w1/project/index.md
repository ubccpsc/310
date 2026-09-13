# The Project: InsightUBC

Most real development work involves understanding and modifying code you did not write yourself.
You will spend the term practicing these skills inside an existing codebase for a system called InsightUBC.

## The system

**InsightUBC** is an internal service built for the Decision Support team in the UBC Registrar's Office (okay, not really, but it helps having a believable domain).
It exists so that administrators and researchers can ask questions about how the university actually runs from actual data.

- Which departments are consistently running oversubscribed sections?
- What did grade distributions in first-year courses look like before and after a curriculum change?
- We need a room for a 200-seat class on the south side of campus — what are the options?

The *course offering* data comes from the PAIR team and covers years of historical data about classes, enrolments, and grades; the *facilities* data covers every building and room on campus.
The service ingests both and exposes them through a REST API that other teams inside the university build against.

It has shipped twice:

- **v1** introduced datasets and course offerings which included courses, their sections, and search functionality over them.
- **v2** added facilities which included buildings, rooms, geocoded locations, and search that spans both kinds of
  data.

The full REST API specification for InsightUBC can be found <a href="/310/26w1/project/spec.html" target="_blank">here</a>.

## The codebase

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
to improve the design without changing behaviour. They managed to split courses and sections into distinct layers (routers, controllers, services, and repositories) but then ran out of time to organize the rest of the app.

So the repository you're inheriting has a split personality: one part that has been through a
refactor, and one part that hasn't. This is what inherited code looks like. Not a disaster, not a model — a working system carrying the fingerprints of every deadline that shaped it.

## What you'll work on during the term

The Registrar's Office wants **v3**, and you're going to design and build it!

**First, you find out what you're dealing with.**
[D1](d1-drop-in-a-feature.md) asks for two small features that will help you get acquainted with the codebase.
The point is to experience and reflect on what changing an inherited software system actually costs.

**Then you will make it testable.**
D2 will have you refactor parts of the system to make it more testable.
The system currently relies solely on integration tests to verify endpoint behaviour.
They can tell you something broke, but not where.
Some are also slow and flaky because they depend on an external web service.
You'll add unit tests and mocks to make further development faster and less risky.

**Then you design v3.**
D3 will require you and a partner to put the software into the real world by considering (sometimes vague) requirements from stakeholders, transforming them into a specification, and defining a definition of done for the work.

**Finally, you'll build it.**
D4 has you implement your spec within the existing system, working collaboratively with your partner through PR authoring and review. You'll demonstrate that your work satisfies the definition of done, including functional correctness and quality attributes, and demo a feature while answering questions about how it was implemented.
