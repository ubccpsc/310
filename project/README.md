# Project: insightUBC

UBC is a big place, and involves a large number of people doing a variety of tasks. The goal of this project is to provide a way to perform some of the tasks required to run the university and to enable effective querying of the metadata from around campus. This will involve working with courses, prerequisites, past course averages, room scheduling, and timetable creation.

To enable you to focus on the key abstractions, data models, and algorithms, this project will remove most UI concerns; we will provide a reference interface that will connect to your system using network requests. The project will represent a 'full stack' web development project using [Node](https://nodejs.org). You are free to use Javascript, Typescript, or CoffeeScript for your project, but the packages and libraries you use will be strictly limited.

Each project deliverable will be marked using an automated private test suite; you will have access to a public automated test suite as well. While the public test suite will enable you to test that your project conforms to the interface of the private suite, it will be insufficient to gage how complete your solution is. You are encouraged to create a private fork of the public test suite and extend it yourself to further validate each deliverable. Additional details are available on the [AutoTest](project/AutoTest.md) page.

## Teams

The vast majority of software is written by development teams. Even within large organizations, 'feature teams' usually comprise of a small set of developers within a larger team context. We will be working in pairs this term. Your partner must be in the same lab section as you; if you want to work with someone who is in another section, one of you will have to transfer lab sections.

Your partner selection is ***extremely*** important; be sure to carefully make this choice as you will be responsible for working as a team for the remainder of the term. You must use the same partner for the duration of the project. If do not have a team organized after the first lecture, please go to your lab and find a partner there. Everyone should have partners by Sept 16 (the end of the first week of labs). 

If you are registered in the class, please do not form a team with students on the waitlist as if they may not make it into the class by the add/drop date. Also: the first deliverable is due very early, so the sooner you finalize your team, the sooner you can get started.

## Deliverables

1. [Deliverable 1](Deliverable1.md) (Due October 3 @ noon)

1. [Deliverable 2](Deliverable2.md) (Due October 24 @ noon)

1. [Deliverable 3](Deliverable3.md) (Due November 7 @ noon)

1. [Deliverable 4](Deliverable4.md) (Due November 28 @ noon)

## Language and Environment

Your project will have to be JavaScript ES5 compatible; you can write it in either pure JS, CoffeeScript, or TypeScript (we will use TypeScript in lecture). The language you choose as a team is up to you so choose wisely. The course staff may not have experience with your language choice so it will be up to you to problem solve language-specific issues.

All development will take place on Github. You will need a Github account; we will create the repository for your group after the course add/drop date. Being familiar with git is essential; please take a look at the 'getting started' part of the [Atlassian Git Introduction](https://www.atlassian.com/git/tutorials/what-is-version-control) before the first lab.

## Allowable packages

The packages and external libraries (aka all of the code you did not write yourself) you can use are limited. The packages below, and the packages they require, are all you are permitted to use. It is notable that a database is **NOT** permitted to be used; the data in this course is sufficiently simple for in-memory manipulation using the features built into the programming language. Essentially if you are typing ```npm install``` it is probably not permitted.

* [typescript](https://www.npmjs.com/package/typescript)
* [coffeescript](https://www.npmjs.com/package/coffee-script)
* [restify](https://www.npmjs.com/package/restify)
* [jszip](https://www.npmjs.com/package/jszip)

## Repositories

All development will take place in Github repositories that we will create for you in a private organization for the course. You will be automatically added to your repo after you have specified your groups in your lab section in the first week. Repositories will only be created for teams where both students are registered in the course; this list will finalize on Sept 20, so if you are on a waitlist you might need to wait until then to specify your team and have a repository created.

That said, instructions will be given in your labs during the first week so you can start working effectively on the first deliverable before the repositories are ready.

## Assessment

Each deliverable will evaluated in two ways:

* [AutoTest](AutoTest.md) validation (functional completeness).
* Oral questions in lab (design validation).

The weighting of these criteria will vary from deliverable to deliverable. The best way to maximize your AutoTest grade is to:

1. Create a private fork of the public AutoTest suite to run locally on your machine (as you can run this as often as you wish). 

1. Do a test submit with AutoTest to make sure you at least pass the public tests when we run it on our infrastructure.

1. Extend your fork of the public suite with additional tests that more comprehensively test your code against the project requirements.

1. When you believe your suite to be effective, submit it to be run against the private suite. Remember: you can only submit to the private suite once every 12 hours!

For the oral questions, make sure both teammates have a clear understanding of how the system works at a high level (the major components, data structures, design decisions, and algorithms). Each team member should also be able to clearly describe their individual technical contributions to the deliverable. The answers to the oral questions may be used as traditional marks, or as a scaling factor on your AutoTest score (e.g., if you get 80% from AutoTest and 50% from the oral questions because it was clear you did not contribute effectively to the deliverable, your deliverable grade would be 40%). 

Each deliverable will be worth 10% of your final grade. Attendance will be tracked in each lab and will be worth up to 10% of your final grade. Finally, your final project will be executed against the private test suite from all four deliverables; this will be worth 10% of your final grade.

## Labs

Lab attendance is mandatory for both team members each week as you will be meeting with the TAs to have a scrum meeting and to discuss your progress.

One a deliverable description has been released, each team will create a milestone schedule, called ```MilestoneX.md``` in the root of their project directory. This file will detail your milestones, one for each week, for the deliverable. Each milestone should clearly state what you plan to accomplish that week. The TAs will review your progress with you with respect to your milestone description each week.

## Bootstrap Implementation

We have created a bootstrap project for you but you will not be able to access it until during the first week of labs. The project will make sure you have your tools and environment correctly configured for our reference UI and for AutoTest.


