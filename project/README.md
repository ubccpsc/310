# Project: insightUBC

UBC is a big place, and involves a large number of people doing a variety of tasks. The goal of this project is to provide a way to perform some of the tasks required to run the university and to enable effective querying of the metadata from around campus. This will involve working with courses, prerequisites, past course averages, room scheduling, and timetable creation.

To enable you to focus on the key subsystems, data models, and algorithms, this project will abstract away most UI concerns; we will provide a reference interface that will connect to your system using network requests. The project will represent a 'full stack' web development project developed using Node. You are free to use Javascript, Typescript, or CoffeeScript for your assignments, but the packages and libraries you use will be strictly limited.

Each project deliverable will be marked using an automated private test suite; you will have access to a public automated test suite as well. While the public test suite will enable you to test that your project conforms to the interface of the private suite, it will be insufficient to gage how complete your solution is. You are encouraged to create a private fork of the public test suite and extend it yourself to further validate each deliverable. Additional details are available on the [AutoTest](project/AutoTest.md) page.

## Teams

The vast majority of software is written by development teams. Even within large organizations, 'feature teams' usually comprise of a small set of developers within a larger team context. We will be working in pairs this term. If you cannot find a partner, we will pair you with someone in the class once the class list has been finalized (although if you should *really* try hard to find a partner you would work well with on your own). You must use the same partner for the duration of the project. It is important that you choose your partner carefully as you will heavily rely on them throughout the term. 

## Deliverables

1. [Deliverable 1](Deliverable1.md) (Due September 26 @ 1800)

1. [Deliverable 2](Deliverable2.md) (Due October 17 @ 1800)

1. [Deliverable 3](Deliverable3.md) (Due November 7 @ 1800)

1. [Deliverable 4](Deliverable4.md) (Due November 28 @ 1800)

## Language and Environment

Your project will have to be JavaScript ES5 compatible; you can write it in either pure JS, CoffeeScript, or TypeScript (we will use TypeScript in lecture). The language you choose as a team is up to you so choose wisely. The course staff may not have experience with your language choice so it will be up to you to problem solve language-specific issues.

## Allowable packages

The packages and external libraries (aka all of the code you did not write yourself) you can use are limited. The packages below, and the packages they require, are all you are permitted to use. It is notable that a database is **NOT** permitted to be used; the data in this course is sufficiently simple for in-memory manipulation using the features built into the programming language. 

* [typescript](https://www.npmjs.com/package/typescript)
* [coffeescript](https://www.npmjs.com/package/coffee-script)
* [restify](https://www.npmjs.com/package/restify)
* [jszip](https://www.npmjs.com/package/jszip)

## Assessment

Each deliverable will evaluated in two ways:

* [AutoTest](AutoTest.md) validation (functional completeness).
* Oral questions in lab (design validation).

The weighting of these criteria will vary from deliverable to deliverable. The best way to maximize your AutoTest grade is to:

1. Create a private fork of the public AutoTest suite to run locally on your machine (as you can run this as often as you wish). 

1. Do a test submit with AutoTest to make sure you at least pass the public tests when we run it on our infrastructure.

1. Extend your fork of the public suite with additional tests that more comprehensively test your code against the project requirements.

1. When you believe your suite to be effective, submit it to be run against the private suite. Remember: you can only submit to the private suite once every 12 hours!

For the oral questions, make sure both teammates have a clear understanding of how the system works at a high level (the major components, data structures, design decisions, and algorithms). Each team member should also be able to clearly describe their individual technical contributions to the deliverable.


