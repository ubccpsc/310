# Project — InsightUBC

The project is where this course's ideas meet a system you didn't write: it exists to teach you to
work confidently in unfamiliar code, to judge a design by what the *next* change to it will cost, to
get untestable code under test, and to design an interface other people can safely depend on.

InsightUBC is not trivial, and it has a history — one that explains most of what you'll find when you
open the repository. That background, and where the project is headed, are set out below.

Deadlines, weights, and policies are in the [syllabus](../syllabus.md); the
[schedule](../schedule.md) shows how each deliverable lines up with lectures and labs.

## The system

**InsightUBC** is an internal service built for the Decision Support team in the UBC Registrar's
Office. It exists so that administrators and researchers can ask questions about how the university
actually runs, and get answers from data rather than from anecdote:

- Which departments are consistently running oversubscribed sections?
- What did grade distributions in first-year courses look like before and after a curriculum change?
- We need a room for a 200-seat class on the south side of campus — what are the options?

None of that is answerable by hand. The course offering data comes from the PAIR team and covers
years of historical sections; the facilities data covers every building and room on campus. The
service ingests both and exposes them through a REST API that other teams inside the university
build against.

It has shipped twice:

- **v1** introduced datasets and course offerings — courses, their sections, and search over them.
- **v2** added facilities. Buildings, rooms, geocoded locations, and search that spans both kinds of
  data.

The full specification for InsightUBC can be found <a href="/310/26w1/project/spec.html" target="_blank">here</a>.

## How you got it

The previous team built it.

They were students, they built it across a single term against fixed deliverable deadlines, and they
delivered. Their submission satisfied the spec and passed the grading suite.
By the only measure anyone applied at the time, they did the job.

Then the term ended, and they left.

You are the next team. Nobody is going to walk you through it, the original authors are not
available to answer questions, and the Registrar's Office would like to know when v3 is ready.

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
requirements that arrive after the design is set.

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

The Registrar's Office wants **v3**, and you're going to design and build it. But you don't start
there, because you can't responsibly change a system you don't understand.

The term runs in four moves:

**First, you find out what you're dealing with.** [D1](d1-drop-in-a-feature.md) asks for one small
feature, added however seems right to you. No procedure, no guidance. The point is to learn what
changing this system actually costs, in your hands, before anyone hands you vocabulary for it.

**Then you get it under control.** [D2](d2-make-it-testable.md) points at a part of the system that
reaches out to the network, which makes it close to untestable — and which the inherited test suite
never touches. You'll fix that, this time with a procedure, and then find out whether the tests you
wrote actually detect anything.

**Then you design v3.** Two groups want the same kind of thing. Students want to know whether a
proposed timetable actually works — whether the sections clash, and whether it's physically possible
to cross campus in the ten minutes between them. The Registrar wants to know whether a draft term
schedule works — whether any room is double-booked, or any class assigned somewhere it doesn't fit.
Both are asking InsightUBC to check something another system produced. You'll pair up and turn those
requests into a specification.

That job is harder than it sounds. The existing API has conventions — about error shapes,
pagination, links, and status codes — that nobody ever wrote down as rules; you have to read them
out of the <a href="/310/26w1/project/spec.html" target="_blank">specification</a> and then apply them to a domain their authors
never imagined.

**Then you build it** — without breaking v1 or v2, whose consumers did not agree to be disrupted
because you wanted a cleaner design.

Inherit, understand, stabilise, specify, deliver. Done in miniature over thirteen weeks, that
sequence is most of what the first years of a software job actually look like.
