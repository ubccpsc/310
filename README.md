<img src="readings/figures/310logo.png" width="256px" alt="CPSC 310 Software Engineering">

# UBC CPSC 310 - Software Engineering
January 4, 2017 -> April 5, 2017 (```2016T2```). These are the official resources for both sections.

## This is a development-heavy four-credit course. Plan your timetable accordingly. If you are not familiar with TypeScript, please start looking at it now.

## About the labs

This is a pair-programming course: If you want to work with someone specific for your project, be sure that both of you register for the _SAME_ lab section. We do not have the ability to move people around between labs; please either monitor the SSC for space in your preferred lab sections, move to another lab with space, or find a partner in the lab you are registered in. Teams **must** be firm by the time of your lab the week of Jan 16. If you do not have a partner, it is your responsibility to notify the TA in lab that week so you can be paired up. If you do not have a partner at the end of your lab that week, you will not be able to complete the project (50% of your final grade). Finding a partner is **your** responsibility and is key to your having a great term, please take the time to do this right.

## Waitlist: [See Here](#waitlist)

### Course details still in flux; expect to encounter inconsistencies in these materials.

## Overview

The world runs on software and CPSC 310 is all about taking the skills and knowledge you learned in [CPSC 210](https://sites.google.com/site/ubccpsc210/) (Software Construction) and extending your abilities to design and build non-trivial software systems. The course will involve a significant challenging project that we will start working on in the first lecture and will continue to evolve until the last week of class; do not underestimate the engineering effort this project will require.

Classes will be highly interactive and will involve working with your project partner (and sometimes teaming up with other groups as well). Each module will have reading materials posted online (rather than slides); most of the in-class material will be designed to support the readings, not replace them, and will not be available electronically. The readings will contain the core content we will discuss in class but will not contain the concrete hands-on activities, you will need to come to class to participate in the activities for them to be beneficial.

We have chosen to take a reading-based approach for this class instead of a slide-based approach to enable more class time to be available for hands-on activities while still providing a comprehensive reference of the background materials for the course. 

Some of the topics we will cover in 310 this term include:

* REST & Async Programming
* Software Specifications
* Agile Development
* Design (this is the primary course focus)
* Refactoring
* Information Security

## Course Goals

This is the second offering of a new version of CPSC 310 and will likely differ from instances of the course from prior years. Our primary goal with this course is to help you learn how to design and build non-trivial modern software systems from an abstract set of requirements. This requires [deliberate practice](http://expertenough.com/1423/deliberate-practice) and experience. Being able to effectively build real systems depends upon flexibility in domain, abstraction, tools, languages, frameworks, and environments. To this end, the project has been tightly integrated with the course materials and will involve a significant development effort.

The course project embodies an experiential learning environment: we have constrained several aspects to mimic the kinds of reasonable constraints you would likely encounter on a real team. As with real systems, requirements will seem clear at a high level, but will probably lack some important details. Your choices of languages and frameworks have also been fixed. It is expected you will _not_ be familiar with these; being able to quickly learn and adapt to different toolsets is a fundamental skill in modern development. Finally, our use of [AutoTest](project/AutoTest.md) can be considered a form of acceptance testing, which is an industry norm used to validate that software performs as expected.

While CPSC 310 will be a challenging course, we hope it will integrate many of the ideas and concepts from your prior courses and help you to learn how to apply them in modern software systems.


## Contact

#### Instructors:

* [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/) (January 4 - Feb 23) 
* [Gail Murphy](https://blogs.ubc.ca/gailcmurphy/) (February 27 - March 3)
* [Elisa Baniassad](https://www.cs.ubc.ca/people/elisa-baniassad) (March 6 - April 5) (Office Hours TBD)

#### TAs:

* Giovanni Viviani (GTA)
* Nick Bradley (GTA)
* Rodrigo Araujo (GTA)
* Felix Grund (GTA)
* Bang Wen (Bowen) Su
* Chia-Chen (Timothy) Chu
* Katharine Cavers
* Fabian Tam
* Lucas Zamprogno
* Zixuan Yin
* Man Kit (Andy) Yeung
* Junze Wu
* Theodore Lau
* Ryan Koon
* Daniel Choi
* Joanne Chen
* MoHan Zhang

### Piazza

<!--
Piazza will be used but has not been configured.
-->

[Piazza](https://piazza.com/ubc.ca/winterterm22016/cpsc310) has been configured for this term. Please be mindful of the UBC Academic Misconduct Policy with respect to posting project solutions on Piazza. It is _extremely_ helpful if your Piazza name corresponds to your name in the SSC in the advent we need to help you with a problem with your project, repositories, or grades.

### Getting help

For *project / language help*, there will be 24 hours of labs and 12 hours of TA office hours per week. TA office hours later in the week are likely to be _much_ busier than those earlier in the week; to accommodate this we have scheduled 8 of the 12 hours on Thursday and Friday, but seeking help on Monday / Tuesday / Wednesday and in lab are less likely to be busy. For *course content help*, we will also schedule Prof office hours, but these are TBD. Piazza will also be available for both course content and project assistance.

## Schedule

#### Lectures: 

* 201: MWF 0900-0950: [PHARM 1201](https://www.google.ca/maps/place/UBC+Faculty+of+Pharmaceutical+Sciences/@49.2615914,-123.2486782,17z/data=!4m21!1m15!4m14!1m6!1m2!1s0x548672cbc595e6a1:0xab34e40e58012409!2sICICS+Computer+Science,+2366+Main+Mall,+Vancouver,+BC+V6T+1Z4!2m2!1d-123.2488201!2d49.2611817!1m6!1m2!1s0x548672c8e6d17b6b:0x2f4024c0ac3282d9!2sUBC+Faculty+of+Pharmaceutical+Sciences,+Pharmaceutical+Sciences+Building,+Wesbrook+Mall,+Vancouver,+BC+V6T+1Z3!2m2!1d-123.243277!2d49.262386!3m4!1s0x0000000000000000:0x2f4024c0ac3282d9!8m2!3d49.2623861!4d-123.2432771).
* 202: MWF 1400-1450: [SWNG 121](https://www.google.ca/maps/place/West+Mall+Swing+Space/@49.2627197,-123.2548329,18.12z/data=!4m5!3m4!1s0x548672ca7f5f71c1:0x5594f7f497661f04!8m2!3d49.2627865!4d-123.2543814).


<!---
Thursdays 1700-2000, 
--->

This list is a week-by-week guide only. Readings will likely be updated even after class has completed. Schedule extremely subject to change

| Week        | Topic & Readings |
| :--         |:--                                          |
| Jan 2       | [Course Intro](readings/Introduction.md), [Languages](readings/Languages.md) |
| Jan 9       | [Async](readings/Async.md), [Testing](readings/Testing.md), [Teamwork](readings/Teamwork.md) |
| Jan 16      | [Assertions](readings/Testing.md#assertions), [Project](project/README.md), [Automation](readings/Automation.md), [APIs](readings/API.md) & [REST](readings/REST.md) |
| Jan 23      | [User Stories](readings/Specifications.md#user-stories), [Process, Agile](readings/Process.md) |
| Jan 30      | [Specifications](readings/Specifications.md) |
| Feb 6       | [Abstraction](readings/Abstraction.md),  [Technical Representations](readings/Representations.md) |
| Feb 13      | [Information Security](readings/Security.md) |
| Feb 20      | Reading Week: No Class or Office Hours |
| Feb 27      | Midterm |
| Mar 1       | Intellectual Property [Slides-2up](http://www.cs.ubc.ca/~murphy/cpsc310-2016w2/CPSC310_IP_2016W2.pdf) |
| Mar 3       | Industry Lecture |
| Mar 6       | Design |
| Mar 13      | Design |
| Mar 20      | Design |
| Mar 27      | Refactoring,  Code Smells |
| Apr 3       | TBD & Wrap-up |
| Apr 28 | Final Exam @ 0830 (location TBD) |

#### Labs:

**There will not be any labs during the first week of class.**

| Lab 	| Time				| Room			|
| :-- 	|:-- 				| :-- 			| 
| L2G	| Mon 1000-1200	| ICICS 008	|
| L2J	| Mon 1700-1900	| ICICS 008	|
| L2N	| Tue 0930-1130	| ICICS 008	|
| L2A	| Tue 1330-1530	| ICICS 008	|
| L2H	| Tue 1530-1730	| ICICS 008	|
| L2C	| Wed 1000-1200	| ICICS 008	|
| L2K	| Wed 1200-1400	| ICICS 008	|
| L2E	| Wed 1600-1800	| ICICS 008	|
| L2B	| Thu 1030-1230	| ICICS 008	|
| L2F	| Thu 1700-1900	| ICICS 008	|
| L2M	| Fri 1100-1300	| ICICS 008	|
| L2D	| Fri 1500-1700	| ICICS 008	|

Both team members will be required to attend each lab. 

#### TA Office Hours

**There will not be any office hours during the first week of class. Also, these hours are all subject to change, always check back here!**

In addition to the 24 hours of labs per week, there are also ~12 hours of TA office hours per week. These have been clustered later in the week, but some are available on each day, to better meet anticipated demands.


|Time						| TA				| Room |
| :--						| :--				| :-- |  
|Monday @ 1600-1700		|Daniel Choi		| ICCSX139 |  
|Tuesday @ 0900-1000	|Man Kit (Andy) Yeung | X150 - Table 3 |
|Tuesday @ 1200-1300	|Chia-Chen (Timothy) Chu | X150 - Table 4 |
|Wednesday @ 1200-1300	|Man Kit (Andy) Yeung | ICCSX241 |
|Wednesday @ 1600-1700	|Zixuan Yin		| X150 - Table 4 |
|Thursday @ 0930-1030	|Joanne Chen		| X150 - Table 4 |
|Thursday @ 1300-1400 	|Katharine Cavers | X150 - Table 1 |
|Thursday @ 1400-1500	|Bang Wen (Bowen) Su | ICCSX337 |
|Thursday @ 1500-1600	|Lucas Zamprogno	| X150 - Table 1 |
|Thursday @ 1600-1700	|Fabian Tam		| X150 - Table 1 | 
|Friday @ 0800-0900		|Theodore Lau		| ICCSX151 |
|Friday @ 1000-1100		|Junze Wu			| X150 - Table 2 |
|Friday @ 1200-1300		|MoHan Zhang		| X150 - Table 1 |
|Friday @ 1700-1800		|Ryan Koon + Theodore Lau | X150 - Table 3 |


## Project

The project is an integral part of this course. **The project will be difficult and time consuming**. Projects will be completed in pairs (everyone *must* have a partner, and you must work with the same parter for the duration of the term). Your partner needs to be in the same lab section as you. The project will proceed in 5 2-3 week sprints; the requirements for each sprint is detailed in a deliverable document. You should expect the project to take ~6 hours / week / person (13 weeks * 2 people * 6 hours = 156 hours). It is extremely important you not leave project deliverables until the last moment. It is impossible to stress strongly enough how important this is; 36h over three weeks is no problem, but over a weekend is *impossible*. These time estimates are based on effective effort, if you are multitasking or just randomly trying to cobble something together without a plan or tests, the project may take much longer.

The project will rely heavily on self-learning. The course content is necessarily broad to provide coverage that will be applicable to *most* software development projects. It is important to remember that the project is a *single* software project that will utilize only a subset of the in-class material; the lectures will not serve as a tutorial for the project, it is expected that you will have to use your own creativity to reason about the project requirements, design a solution, and build and validate it yourself.

The intent of this project is to give you the opportunity to concretely apply the course concepts on a real system, but with fewer constraints than were possible in CPSC 210. At the same time, the system does have _some_ constraints to simulate a real system specified by real clients. A strong test emphasis reenforces the importance (and difficulty) of building high-quality software in practice.

See the [full project description](project/README.md) for complete details about the project, the lab, project grading, and finding partners.

#### Project Assessment

Engineers use automated test suites to validate that their software is working as expected. We will evaluate your project deliverables similarly using [AutoTest](project/AutoTest.md).

In addition to AutoTest, each team member will be independently asked a small number of questions in the lab to assess their understanding of the solution. While it is reasonable for team members to be more knowledgable about different parts of the system, it is expected that you will understand your entire solution at a high level and be able to provide specific in-depth insight to some meaningful components of your solution.

## Project Sprint Schedule


* January 16: Sprint 0 ([Deliverable 0](project/Deliverable0.md))

<!-- 3 weeks -->

* February 6: Sprint 1 ([Deliverable 1](project/Deliverable1.md))

<!-- 3 weeks -->

* February 27: Sprint 2 ([Deliverable 2](project/Deliverable2.md)) 

* February 27: Midterm (sample midterms are not available)

<!-- 2 weeks -->

* March 13: Sprint 3 ([Deliverable 3](project/Deliverable3.md))

<!-- 2 weeks -->

* March 27: Sprint 4 ([Deliverable 4](project/Deliverable4.md))

* March 27: Sprint 5 ([Deliverable 5](project/Deliverable5.md))

## Grading

To pass the course and receive credit you must achieve a passing grade on *both* the project and the final exam. Sample midterm and final exams will not be available.

| Component		| Proportion 	| 
| :--			   	| :-- 			|
| Project 		| 60 %			|
| Midterm Exam	| 10 %			|
| Final Exam		| 30 %			|

## Policies

<a name="waitlist"></a>
### Waitlist

We are going to overenroll both sections of the course on the first day and purge the waitlist. If you are not in the course on the first day, you will not be able to join later in the term. This is to enable group formation during the first week, rather than waiting until the add/drop date.

<!---
There is extremely high demand for this course this term. If you are on the waitlist and wish to join the class, please come to the front after **EVERY** class to sign in. Those students who have signed into every class by September 16 will be forwarded to the advisors who will insert students into available spots by the add/drop deadline. This does not guarantee you will be admitted, but without signing in every class you will not be eligible. Students on the waitlist should not form groups with students who are already enrolled in case your whole group does not make it into the course this term. Unfortunately, the instructor is not able to override class seat assignments or the waitlist itself.

If you are on the waitlist you should still attend and sign into a lab section so you understand what is happening in the course, and so you do not miss out on the lab attendance marks.
--->
### Late Submissions

The project late policy is described [here](project/README.md#late-policy). Only Deliverables 1, 2, and 3 can be submitted late. Deliverable 4 and 5 cannot be late.

### Accommodation

Lab attendance is mandatory. If you must miss a lab, please notify your TA directly; your overall project mark will reflect your participation.
If you are sick and unable to write the midterm, please contact Reid as soon as possible -- provide medical documentation.
Students who miss the midterm or final exam due to illness should consult the Faculty of Science Policy on missed exams. Students who do not have sufficient standing during the term may not qualify for academic concession if they miss the final.
Students who require dispensation based on their unique circumstances should refer to the [UBC policy on Academic Concessions](http://www.calendar.ubc.ca/vancouver/?tree=3,48,0,0).
Phones, tablets, calculators, translators, and all other electronic devices are prohibited on desks during exams. They must be turned off and placed in your bag or on the ground. Students who need exam accommodation must make an official request to the [Access and Diversity Office](https://students.ubc.ca/about-student-services/access-diversity).

### Academic Conduct

Each student is responsible for understanding and abiding by the University and Departmental policies on academic conduct. Specifically:

* [UBC policy on Academic Misconduct](http://www.calendar.ubc.ca/vancouver/index.cfm?tree=3,54,111,959)
* [Computer Science Department Lab policies and responsibilities](https://www.cs.ubc.ca/our-department/administration/policies/collaboration)

### Respectful Environment

Everyone involved with CPSC 310 is responsible for understanding and abiding by UBC's [Respectful Environment Statement](http://www.hr.ubc.ca/respectful-environment/).

The Statement of Principle of UBC's Respectful Environment Statement is "The best possible environment for working, learning and living is one in which respect, civility, diversity, opportunity and inclusion are valued. Everyone at the University of British Columbia is expected to conduct themselves in a manner that upholds these principles in all communications and interactions with fellow UBC community members and the public in all University-related settings."

### License

The readings for this course are licensed using [CC-by-SA](https://creativecommons.org/licenses/by-sa/3.0/). However, it is important to note that the deliverable descriptions, code implementing the deliverables, exams, and exam solutions are considered private materials. We go to considerable lengths to make the project an interesting and useful learning experience for this course. This is a great deal of work, and while future students may be tempted by your solutions, posting them does not do them any real favours. Please be considerate with these private materials and not pass them along to others, make your repos public, or post them to other sites online.


<!--- 

### Archived bits 

#### First Lecture Links

* [Sample Repository](https://github.com/rtholmes/cpsc310starter) for in class use.
* ~~[Entrance Survey](https://goo.gl/forms/0G3o369xPqRSmThI3) Please let us know what you want out of CPSC 310!~~
--->

