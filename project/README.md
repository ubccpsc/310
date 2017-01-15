# Project: insightUBC

UBC is a big place, and involves a large number of people doing a variety of tasks. The goal of this project is to provide a way to perform some of the tasks required to run the university and to enable effective querying of the metadata from around campus. This will involve working with courses, prerequisites, past course averages, room scheduling, and timetable creation.

This will be a full stack web development project split into four sprints. The first three sprints are server-side development using [Node](https://nodejs.org). The fourth sprint is client-side development using the UI frameworks of your choosing. A fifth deliverable will also happen, but does not have dedicated time allocated to it because it is an aggregation of the first three sprints. 

Development will be done with TypeScript and the packages and libraries you use will be strictly limited (for the first three sprints). If you do not know TypeScript, you are encouraged to start investigating the language soon. Its syntax is extremely similar to Java so it should be relatively easy to transition to given your prior experience. It is important to note we will spend very little time in lecture and lab teaching this language; you will be expected to learn it on your own time.

Three of the five sprint deliverables will be marked using an automated test suite. The feedback you will receive from this suite will be limited. To succeed at the project you will need to create your own private test suite to further validate each deliverable. Additional details are available on the [AutoTest](AutoTest.md) page.

## Teams

The vast majority of software is written by development teams. Even within large organizations, 'feature teams' usually comprise of a small set of developers within a larger team context. You will work in pairs for this project. Your partner must be in the same lab section as you; if you want to work with someone who is in another section, one of you will have to transfer lab sections.

Your partner selection is ***extremely*** important; be sure to make this choice carefully, as you will be responsible for working as a team for the remainder of the term. You must use the same partner for the duration of the project, no changes will be permitted. If do not have a team organized after the first lecture, please go to your lab and find a partner there. Everyone should have partners by the end of the first week of labs (the end of the second week of the course). 

<!--
If you are registered in the class, please do not form a team with students on the waitlist as if they may not make it into the class by the add/drop date. Also: the first deliverable is due very early, so the sooner you finalize your team, the sooner you can get started.
--->

## Deliverables

Sprint 0 is an individual activity to help you get acquainted with TypeScript and AutoTest. Sprints 1-5 will be part of your project.

1. Sprint 0 - [Deliverable 0](Deliverable0.md) 

1. Sprint 1 - [Deliverable 1](Deliverable1.md) 

1. Sprint 2 - [Deliverable 2](Deliverable2.md) 

1. Sprint 3 - [Deliverable 3](Deliverable3.md) 

1. Sprint 4 - [Deliverable 4](Deliverable4.md) 

1. Sprint 5 - [Deliverable 5](Deliverable5.md) 

## Language and environment

Your project will have to be written in TypeScript. While it might seem daunting to learn a new language on your own, the fluid nature of software systems requires that you get used to quickly learning new languages, frameworks, and tools. The syntax of TypeScript is extremely similar to Java itself, which you should have used in 210. Google will be your friend for this project, as there are _thousands_ of free tutorials and videos that can help you with this technology stack. TypeScript has many great resources, but the [TypeScript Handbook](http://www.typescriptlang.org/docs/handbook/basic-types.html) or the [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html) would be good places to start. If you are starting from scratch, it is really important that you do not just read a bunch of code but actually **write** some. The [TypeScript Playground](http://www.typescriptlang.org/play/index.html) or a [JavaScript REPL](https://repl.it/languages/javascript) can be a lightweight way to do this.

All development will take place on GitHub. You will need a GitHub account (but feel free to create a throw away or anonymous account for this course, if that makes you more comfortable); we will create the repository for your group after the first week of labs have finished. Being familiar with Git is essential; please take a look at the 'getting started' part of the [Atlassian Git Introduction](https://www.atlassian.com/git/tutorials/setting-up-a-repository) before the first lab if you are not familiar with Git. A shorter, less formal, [guide](http://rogerdudler.github.io/git-guide/) is also available.

## Allowable packages

The packages and external libraries (aka all of the code you did not write yourself) you can use for the project are limited. The packages below, and the packages they require, are all you are permitted to use. It is notable that a database is **NOT** permitted to be used; the data in this course is sufficiently simple for in-memory manipulation using the features built into the programming language. Essentially if you are typing ```npm install``` it is probably not permitted.

* [typescript](https://www.npmjs.com/package/typescript)
* [restify](https://www.npmjs.com/package/restify)
* [jszip](https://www.npmjs.com/package/jszip)
* [parse5](https://www.npmjs.com/package/parse5)
* [mocha](https://www.npmjs.com/package/mocha)
* [chai](https://www.npmjs.com/package/chai)

## Repositories

All development will take place in GitHub repositories that we will create for you in a private organization for the course. You will be automatically added to your repo after you have specified your groups in your lab section in the first week. Repositories will only be created for teams where both students are registered in the course; this list will finalize after the first week of labs, so if you are on a waitlist you might need to wait until then to specify your team and have a repository created.

<!--
That said, instructions will be given in your labs during the first week so you can start working effectively on the first deliverable before the repositories are ready.
-->

## Assessment

Each deliverable will evaluated in three ways:

* [AutoTest](AutoTest.md) validation (functional completeness).
* Private test coverage.
* Oral questions in lab (deliverable retrospective).

The weighting of these criteria will vary from deliverable to deliverable. The best way to maximize your AutoTest grade is to:

1. Write your own local tests tests that comprehensively test your code against the project requirements. These tests can be run as often as you want and are the best way to debug your code.

1. Invoke AutoTest frequently to ensure you have not introduced regressions into your code. Remember: you can only submit to the private suite once every 12 hours!

You do not need to submit your code on the deliverable deadline; we will automatically pull your code from the master branch at the due date and run the tests against it. The state of your main branch at the moment the deliverable is due is your responsibility.

The deliverable retrospective will assign individual marks to each teammate to make sure both teammates contributed fairly to the deliverable outcome. Each teammate should have a clear understanding of how the system works at a high level (the major components, data structures, design decisions, and algorithms). The answers to the oral questions will be used as a scaling factor on your AutoTest score (e.g., if you get 80% from AutoTest and 50% from the oral questions because it was clear you did not contribute effectively to the deliverable, your deliverable grade would be 40%). 

These oral questions will take place in labs the week the deliverable was due; if you do not attend this lab, you will receive 0% for the deliverable. Also, submitting your contribution file by the deliverable due date is required; without this you will also receive 0%. Being an effective teammate involves both technical contribution _and_ teamwork; if one team member 'shuts out' the other from contributing to the project, this can also have a detrimental influence on both multipliers. Teammates should be courteous to one another by keeping open lines of communication, and by pulling their weight while ensuring that others have the opportunity to pull theirs too.

Deliverables 1-4 will also require you to add a deliverable contribution file to your repository for each teammember. If you do not do this, your retrospective multiplier will be 0. It is also extremely important to ensure you are committing code to your repository, if you do not commit anything, the TA will not know that you actually did any work.

Each deliverable will be worth 10% of your final grade. Only Deliverable 0 is completed individually, all other deliverables must be completed in teams.

<!--- Course participation will be worth 10% of your final grade. Finally, your final project will be executed against the private test suite from all deliverables we run AutoTest against (to check for regressions from prior deliverables). --->

* Deliverable 0: 10%
* Deliverable 1: 10%
* Deliverable 2: 10%
* Deliverable 3: 10%
* Deliverable 4: 10%
* Deliverable 5: 10%

We will be running [Measure of software similarity (MOSS)](https://theory.stanford.edu/~aiken/moss/) on all deliverable submissions. Any projects that contain code derived from other projects that we have not provided will receive 0% on that deliverable.

## Late policy

It is possible to submit a team-based AutoTest deliverable (D1, D2, & D3) 'late' for partial marks. D0, D4, and D5 cannot be submitted late. Appeals for late marks must be made by the Deliverable 4 deadline; a form for submitting late deliverables will be TBD. Late deliverables will be subject to the following penalty:

* 1 deliverable late: 40% (e.g., D1 by D2, D2 by D3, or D3 by D4).
* 2 deliverables late: 50% (e.g., D1 by D3, D2 by D4).
* 3 deliverables late: 60% (e.g., D1 by D4).

Late deliverables can only increase the test passing rate, the retrospective multipliers and test coverage rate from the original deliverable will still be used. The # of deliverables late depends on the timestamp of the commit you ran you deliverable against (the # of deliverables late increments after each deliverable deadline). An online form will be added later for you to request a late submission.

<!---
To apply for the late policy, please fill out the [late deliverable request](https://goo.gl/forms/9P4DBfXBBhuPHTqM2) form by the Deliverable 4 deadline.

## Labs

Lab attendance is mandatory for both team members each week as you will be meeting with the TAs to have a scrum meeting and to discuss your progress (10% / 12 labs === ~0.8% / lab). You must specify your project group by the end of the second lab. 
--->

<!---
Both team members must sign into [ClassPortal](http://skaha.cs.ubc.ca:8020) to register their Github users. IMPORTANT: both team mates must be registered in the course and registered in the same lab section.
--->

<!---
* ***First Lab:*** Since we won't have projects fully configured yet, the first lab will be more directed than the others this term. Full details can be found in [Lab1.md](Lab1.md).

* ***Subsequent labs:*** Full details about what to do in each lab after the first week can be found in [LabN.md](LabN.md).
--->

<!--
## Bootstrap implementation

We have created a bootstrap project for you but you will not be able to access it until during the second week of labs, after you have specified your project team. Once the project is configured, Github should send you email inviting you to your team's repository.
-->

