<img src="readings/figures/310logo.png" width="256px" alt="CPSC 310 Software Engineering">

# UBC CPSC 310 - Software Engineering
September 8, 2016 -> December 1, 2016 (```2016T1```)

## Third Lecture

* You should be able to see your project repo and public repo in the [Github org](https://github.com/orgs/CS310-2016Fall/). If you can't it is because you either have not signed up fully on ClassPortal (aka with two team mates both of whom have signed in) or because you have not accepted an email from GitHub.

* If you don't have a group yet, you must organize one this week. Sign up on [ClassPortal](http://skaha.cs.ubc.ca:8020); please use a non-mobile version of Chrome, Firefox, or Edge (we're working on it). 


## Waitlist: [See Here](#waitlist)

### Course details still in flux; expect to encounter inconsistencies in these materials.

Before the first class (whether you are on the waitlist or are registered):

* Make sure you have a Github account
* Please go over the Sept 8 reading and project documents 
* Bring your laptop to class (it will not always be needed, but will be helpful the first class)

## Overview

The world runs on software and CPSC 310 is all about taking the skills and knowledge you learned in [CPSC 210](https://sites.google.com/site/ubccpsc210/) (Software Construction) and extending your abilities to design and build non-trivial software systems. The course will involve a significant challenging project that we will start working on in the first lecture and will continue to evolve until the last week of class; do not underestimate the engineering effort this project will require.

Classes will be highly interactive and will involve working with your project partner (and sometimes teaming up with other groups as well). Each module will have reading materials posted online (rather than slides); most of the in-class material will be designed to support the readings, not replace them, and will not be available electronically. The readings should be done *before* class or the in-class discussion and activities may not make sense.

We have chosen to take a reading-based approach for this class instead of a slide-based approach to enable more class time to be available for hands-on activities while still providing a comprehensive reference of the background materials for the course. 

Some of the topics we will cover in 310 this term include:

* REST & Async Programming
* Software Specifications
* Agile Development
* Design (this is the primary course focus)
* Refactoring
* Information Security

## Contact

#### Instructor: [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)

#### TAs:

* Giovanni Viviani
* Nick Bradley
* Rodriguo Silva de Araujo
* Arthur de Sousa Marques
* Stewart Grant
* Nam Giang
* Dylan Dong

### Piazza

[Piazza](https://piazza.com/ubc.ca/winterterm12016/cpsc310) has been configured for this term. Please be mindful of the UBC Academic Misconduct Policy with respect to posting project solutions on Piazza.

## Schedule

#### Lecture: 

Thursdays 1700-2000, [PHARM 1101](https://www.google.ca/maps/place/UBC+Faculty+of+Pharmaceutical+Sciences/@49.2615914,-123.2486782,17z/data=!4m21!1m15!4m14!1m6!1m2!1s0x548672cbc595e6a1:0xab34e40e58012409!2sICICS+Computer+Science,+2366+Main+Mall,+Vancouver,+BC+V6T+1Z4!2m2!1d-123.2488201!2d49.2611817!1m6!1m2!1s0x548672c8e6d17b6b:0x2f4024c0ac3282d9!2sUBC+Faculty+of+Pharmaceutical+Sciences,+Pharmaceutical+Sciences+Building,+Wesbrook+Mall,+Vancouver,+BC+V6T+1Z3!2m2!1d-123.243277!2d49.262386!3m4!1s0x0000000000000000:0x2f4024c0ac3282d9!8m2!3d49.2623861!4d-123.2432771)

This list is a rough guide only. Readings will likely be updated even after class has completed.

| Date        | Topic                         | Readings |
| :--         |:--                            | :-- |
| Sept 8      | Course & Project Intro        | [Syllabus](README.md), [Introduction](readings/Introduction.md), [Project Description](project/README.md) |
| Sept 15     | Languages & Testing           | [Programming Languages](readings/Languages.md), [Testing/Testability](readings/Testing.md), [AutoTest](project/AutoTest.md) |
| Sept 22     | APIs, REST, Async             | [APIs & REST](readings/API.md) |
| Sept 29     | Agile & User Stories          | TBD   |
| Oct 6       | Specifications                | TBD   |
| Oct 13      | Technical Communication       | TBD   |
| Oct 20      | Design                        | TBD   |
| Oct 27      | Design                        | TBD   |
| Nov 3       | Design                        | TBD   |
| Nov 10      | Refactoring & Tradeoffs       | TBD   |
| Nov 17      | Class *might* be cancelled    | TBD   |
| Nov 24      | Information Security          | TBD   |
| Dec 1       | Wrap-up                       | TBD   |

#### Labs:

Note: there will not be any labs during the first week of class.

| Lab Section | Time           | Room        | TAs                    |
| :--         |:--             | :--         | :--                    |
| L1E         | Tue; 1700-1900 | ICICS 008   | Rodrigo, Nick          |
| L1B         | Wed; 1100-1300 | ICICS 008   | Nam, Nick              |
| L1D         | Wed; 1300-1500 | ICICS 008   | Arthur, Dylan          |
| L1G         | Th; 1030-1230  | ICICS 008   | Nam, Arthur            |
| L1F         | Th; 1400-1600  | ICICS X350  | Rodrigo, Stewart       |
| L1A         | Fri; 1400-1600 | ICICS 008   | Dylan, Stewart         |

Both team members will be required to attend each lab. 

#### TA Office Hours

We are sorting the details out now, full details will be up this week.

| Time             | Room            | TA          |
| :--              | :--             | :--         |
| Mon; 1600-1700   | X341            | Nam         |
| Tues; 1600-1700  | X151            | Dylan       |
| Wed; 1600-1700   | X151            | Arthur      |
| Th; 1600-1700    | X139            | Rodrigo     |
| Fri; 0900-1000   | X150 - Table 2  | Nick        |
| Fri; 1600-1700   | X150 - Table 3  | Stewart     |

## Project

The project is an integral part of this course. **The project will be difficult and time consuming**. Projects will be completed in pairs (everyone *must* have a partner, and you must work with the same parter for the duration of the term). Your partner needs to be in the same lab section as you. You should expect the project to take ~6 hours / week / person (13 weeks * 2 people * 6 hours = 156 hours). It is extremely important you not leave project deliverables until the last moment.

The intent of this project is to give you the opportunity to concretely apply the course concepts on a real system, but with fewer constraints than were possible in CPSC 210. At the same time, the system does have _some_ constraints to simulate a real system specified by real clients. A strong test emphasis reenforces the importance (and difficulty) of building high-quality software in practice.

See the [full project description](project/README.md) for complete details about the project, the lab, project grading, and finding partners.

#### Project Assessment

Engineers use automated test suites to validate that their software is working as expected. We will evaluate your project deliverables similarly using [AutoTest](project/AutoTest.md).

In addition to AutoTest, each team member will be independently asked a small number of questions in the lab to assess their understanding of the solution. While it is reasonable for team members to be more knowledgable about different parts of the system, it is expected that you will understand your entire solution at a high level and be able to provide specific in-depth insight to some meaningful components of your solution.

## Deliverable Schedule


* October 3: Project [Deliverable 1](project/Deliverable1.md)

* October 20: Midterm (sample midterms are not available)

* October 24: Project [Deliverable 2](project/Deliverable2.md)

* November 7: Project [Deliverable 3](project/Deliverable3.md)

* November 28: Project [Deliverable 4](project/Deliverable4.md)

## Grading

* Midterm 10%
* Project 60% 
* Final 30%

To pass the course and receive credit you must achieve a passing grade on *both* the project and the final exam. Sample midterm and final exams will not be available.

## Course Goals

This is the first offering of a new version of CPSC 310 and will likely differ from past instances of the course. Our primary goal with this course is to help you learn how to create non-trivial software systems from an abstract set of requirements. This requires intentional practice and experience. Being able to effectively build real systems depends upon flexibility in domain, abstraction, tools, languages, frameworks, and environments. To this end, the project has been tightly integrated with the course materials and will involve a significant development effort.

The course project embodies an experiential learning environment: we have constrained several aspects to mimic the kinds of reasonable constraints you would likely encounter on a real team. As with real systems, requirements will seem clear at a high level, but will probably lack some important details. Your choices of languages and frameworks have also been fixed. It is expected you will _not_ be familiar with these; being able to quickly learn and adapt to different toolsets is a fundamental skill in modern development. Finally, our use of AutoTest can be considered a form of acceptance testing, which is an industry norm used to validate that software performs as expected.

While CPSC 310 will be a challenging course, we hope it will integrate many of the ideas and concepts from your prior courses and help you to learn how to apply them in modern software systems.


## Policies

<a name="waitlist"></a>
### Waitlist

There is extremely high demand for this course this term. If you are on the waitlist and wish to join the class, please come to the front after **EVERY** class to sign in. Those students who have signed into every class by September 16 will be forwarded to the advisors who will insert students into available spots by the add/drop deadline. This does not guarantee you will be admitted, but without signing in every class you will not be eligible. Students on the waitlist should not form groups with students who are already enrolled in case your whole group does not make it into the course this term. Unfortunately, the instructor is not able to override class seat assignments or the waitlist itself.

If you are on the waitlist you should still attend and sign into a lab section so you understand what is happening in the course, and so you do not miss out on the lab attendance marks.

### Late Submissions

All project deliverables must be submitted on time. Late submissions cannot be accepted.

### Accommodation

Lab attendance is mandatory. If you must miss a lab, please notify your TA directly; your overall project mark will reflect your participation.
If you are sick and unable to write the midterm, please contact Reid as soon as possible -- provide medical documentation.
Students who miss the final exam due to illness should consult the Faculty of Science Policy on missed exams. Note that students who do  not have sufficient standing during the term may not qualify for academic concession if they miss the final.
Students who require dispensation based on their unique circumstances should refer to the UBC policy on Academic Concessions.
Cell phones, calculators, translators, and all other electronic devices are prohibited on desks during exams. They must be turned off and placed in your bag or on the ground. Students who need exam accommodation must make an official request to the Access and Diversity Office.

### Academic Conduct

Each student is responsible for understanding and abiding by the University and Departmental policies on academic conduct. Specifically:

* [UBC policy on Academic Misconduct](http://www.calendar.ubc.ca/vancouver/index.cfm?tree=3,54,111,959)
* [Computer Science Department Lab policies and responsibilities](https://www.cs.ubc.ca/our-department/administration/policies/collaboration)

### Respectful Environment

Everyone involved with CPSC 310 is responsible for understanding and abiding by the University's Respectful Environment Statement.

The Statement of Principle of UBC's Respectful Environment Statement is "The best possible environment for working, learning and living is one in which respect, civility, diversity, opportunity and inclusion are valued. Everyone at the University of British Columbia is expected to conduct themselves in a manner that upholds these principles in all communications and interactions with fellow UBC community members and the public in all University-related settings."


### Archived bits 

#### First Lecture Links

* [Sample Repository](https://github.com/rtholmes/cpsc310starter) for in class use.
* ~~[Entrance Survey](https://goo.gl/forms/0G3o369xPqRSmThI3) Please let us know what you want out of CPSC 310!~~

