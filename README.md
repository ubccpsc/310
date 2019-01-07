<img src="https://www.ugrad.cs.ubc.ca/~cs310/2018w2/logo.png" width="256px" alt="CPSC 310 Software Engineering">

# UBC CPSC 310 - Software Engineering

#### Waitlist: [See Here](#waitlist)

#### Note: Expect frequent updates to this page as the course progresses.

<!--
#### Please login to [here](https://github.ugrad.cs.ubc.ca/) using your CS Ugrad Id/Password by 1400 on the Friday of the first week of class; this is required so we can provision your d0 repository for you to use in lab during the second week of class.
-->

#### This is a development-heavy four-credit course. Plan your timetable accordingly. If you are not familiar with TypeScript, please start looking at it now.

## About the labs

This is a pair-programming course: If you want to work with someone specific for your [project](project/README.md), be sure that both of you register for the _SAME_ lab section. We do not have the ability to move people around between labs; please either monitor the SSC for space in your preferred lab sections, move to another lab with space, or find a partner in the lab you are registered in. Teams **must** be firm by the time of your lab the week of the add/drop deadline. If you do not have a partner, it is your responsibility to notify the TA in lab that week so you can be paired up. If you do not have a partner at the end of your lab that week, you will not be able to complete the project (40% of your final grade). Finding a partner is **your** responsibility and is key to your having a great term, please take the time to do this right.

## Overview

The world runs on software and CPSC 310 is all about taking the skills and knowledge you learned in [CPSC 210](https://sites.google.com/site/ubccpsc210/) (Software Construction) and extending your abilities to design and build non-trivial software systems. The course will involve a significant challenging [project](project/README.md) that we will start working on in the first lecture and will continue to evolve until the last week of class; do not underestimate the engineering effort this project will require.

The lecture time slot will be highly interactive and will involve working with your project partner (and sometimes teaming up with other groups as well). Only the first and last lecture slots of the course will be 'traditional' lectures. Tuesday lectures will be activity-driven to reinforce the materials from each week's readings and videos. Thursdays lectures will focus on tying the lecture material to the course project. One important implication of this is that all course material will be fully covered in the videos, readings, and project. You can base your Tuesday attendance on your own assessment of your mastery of the material for that week. For Thursdays, your can decide if you need to come based on how the project is progressing. Your attendance in lecture has no bearing on your participation grade, as long as you submit your weekly reflection (which is submitted online).

Each module will have reading materials and videos posted online; no slides will be posted. In-class material will be designed to support the readings, not replace them, and will not be available electronically. We have chosen to take a reading-based approach for this course instead of a slide-based approach to enable more class time to be available for hands-on activities while still providing a comprehensive reference of the background materials for the course.

Some of the topics we will cover in 310 this term include:

* Software specifications
* Agile development
* High and low-level design (this is the primary course focus)
* Automated testing
* Refactoring
* Information security
* REST
* Async development

## Course Goals

Our primary goal in this course is to help you learn how to design and build non-trivial modern software systems. This requires [deliberate practice](http://expertenough.com/1423/deliberate-practice) and experience. Being able to effectively build real systems depends upon flexibility in domain, abstraction, tools, languages, frameworks, and environments. To this end, the project has been tightly integrated with the course materials and will involve a significant development effort.

The course [project](project/README.md) embodies an experiential learning environment: we have constrained several aspects to mimic the kinds of reasonable constraints you would likely encounter on a real team. As with real systems, requirements will seem clear at a high level, but will provide broad latitude for how you implement them. Your choices of languages and frameworks have also been fixed. It is expected you will _not_ be familiar with these; being able to quickly learn and adapt to different toolsets is a fundamental skill in modern development. Finally, our use of [AutoTest](project/AutoTest.md) can be considered a form of acceptance testing, which is an industry norm used to validate that software performs as expected.

CPSC 310 will be a challenging course that we have designed to integrate many of the ideas and concepts from your prior courses in order to help you to learn how to apply them to engineering modern software systems.

### Getting help

By far the most effective mechanism for *content and exam help* is to actually attend and participate in lectures. While the videos are available, the literature strongly shows that skipping class has a strong negative impact on grades, one that watching videos alone cannot compensate for [[Edwards & Clinton 2018](https://link.springer.com/article/10.1007/s10734-018-0275-9)].

For *[project](project/README.md) / language help*, there will be at least 24 hours of labs and 24 hours of TA office hours per week. TA office hours closer to the deadline are likely to be _much_ busier than others (which may not be attended at all); to accommodate this we have scheduled most of the office hours prior to deadlines, but seeking help at other times and in your lab will likely be less busy.

## Project

The [project](project/README.md) is an integral part of this course. **The project will be difficult and time consuming**. Projects will be completed in pairs (everyone *must* have a partner, and you must work with the same partner for the duration of the term). Your partner needs to be in the same lab section as you. The project will proceed in 5 2-3 week sprints; the requirements for each sprint is detailed in a deliverable document. You should expect the project to take ~6 hours / week / person (13 weeks * 2 people * 6 hours = 156 hours). It is extremely important you not leave project deliverables until the last moment. It is impossible to stress strongly enough how important this is; 36h over three weeks is no problem, but over a weekend is *impossible*. These time estimates are based on effective effort, if you are multitasking or just randomly trying to cobble something together without a plan or tests, the project may take much longer.

The project will rely heavily on self-learning. The course content is necessarily broad to provide coverage that will be applicable to *most* software development projects. It is important to remember that the project is a *single* software project that will utilize only a subset of the in-class material; the lectures will not serve as a tutorial for the project, it is expected that you will have to use your own creativity to reason about the project requirements, design a solution, and build and validate it yourself.

The intent of this project is to give you the opportunity to concretely apply the course concepts on a real system, but with fewer constraints than were possible in CPSC 210. At the same time, the system does have _some_ constraints to simulate a real system specified by real clients. A strong test emphasis reinforces the importance (and difficulty) of building high-quality software in practice.

Engineers use automated test suites to validate that their software is working as expected. We will evaluate your project deliverables similarly using [AutoTest](project/AutoTest.md). In addition to AutoTest, each team member will be independently asked a small number of questions in the lab to assess their understanding of the solution. While it is reasonable for team members to be more knowledgeable about different parts of the system, it is expected that you will understand your entire solution at a high level and be able to provide specific in-depth insight to some meaningful components of your solution.

See the [full project description](project/README.md) for complete details about the project, the lab, project grading, and finding partners.


## Project Sprints

Each deliverable has a deadline; we have also added a one week grace period for and final submissions if needed. Full TA support will be given to any group prior to the deadline; during the grace period, priority will be given to struggling teams or groups working on the next deliverable. (D0 is exempt from this schedule and has only one final deadline)

During the grace week, TAs will only help groups with AutoTest scores below 80%. In the three days prior to the final submission date, only groups with less than 50% AutoTest scores will be helped. We encourage all groups to submit by the deadline, the final submission date is really only for those groups who need a little more time for polish. Regardless of your grade, your TAs will always help you during *your own* lab section; this restriction applies only to Piazza, Office Hours, and labs other than your own.

Also, be aware that waiting until the last minute will greatly degrade AutoTest latency; while you can expect to receive results in < 5 minutes for the majority of the term, this has historically been much slower on the last day:

<img src="readings/figures/autotest_latency.png" width="320px" alt="AutoTest Latency">

Note: Even when AutoTest is heavily loaded your requests are queued and processed in turn; the timestamps we use for the deadline comes from the GitHub push event, not when AutoTest is able to process the request or when the commit was made locally.

* [Deliverable 0](project/Deliverable0.md) This will be an individual deliverable and will be graded before the Add/Drop date. You should aim to exceed 70% on this deliverable if you want to succeed at the project.

* [Sprint/Deliverable 1](project/Deliverable1.md) The first project deliverable will be extremely challenging; it is important that you start working on this early.

* [Sprint/Deliverable 2](project/Deliverable2.md) 

* [Sprint/Deliverable 3](project/Deliverable3.md)

* [Deliverable 4/Project Quality Check](project/Deliverable4.md). There is nothing to submit for this deliverable. It will be computed on the version of your code as it exists at the Sprint 3 deadline (*not* the commit associated with the Sprint 3 maximum). 

## Grading

To pass the course and receive credit you must achieve a passing grade on *both* the overall project grade and the overall exam grade. Sample exams are available through the CSSS.

The project grade component is weighted as follows (these weightings may change):

| Project Component				| Proportion |
| :--			 				    | :-- |
| Deliverable 0 (d0)			| 20 %	|
| Project Sprint 1 (d1)			| 20 %	|
| Project Sprint 2 (d2)			| 20 %	|
| Project Sprint 3 (d3)			| 20 %	|
| Project Quality Check	 (d4)	| 15 %	|
| Progress Reports					| each is a 0/1 multiplier over entire deliverable |
| Study Topic Form Submissions					| 5% |

The exam component is weighted as follows:

| Exam Component			| Proportion 	|
| :--			 			| :-- 			|
| Midterm Exam			| 30 %	|
| Final Exam				| 70 %	|

The final grade for the course will be computed as follows:

`final grade = (project grade * .5) + (exam grade * .5)`

<!--- The easiest way to think about this is that the project grade acts as a multiplier on your exam grade. Given the way the project is configured with AutoTest, in past terms we have found the project median to exceed 95%. Any content from the course videos, readings, lectures, and project is examinable. -->

The weekly deliverable reports are *mandatory*.  These are required for your deliverable submissions (see the grade rubric in the deliverable description for more detail of those). These surveys will be due at 11pm on Mondays; no extensions can be given (this is later to allow you to comment on your finished deliverable as it will be after the deadline).

## Participation

Participation marks are given for submitting study topic forms. These can be submitted any time before the end of the semester. There are 8 of them, and they are each worth 1 point up to 5 points. These forms also act as midterm and final study problems. These are the only practice problems you will be given. Feel free to source other stuff from CSSS if it is there.


## Policies

<a name="waitlist"></a>
### Waitlist

To maximize certainty around getting access to 310 this term, the [CS advisors](https://www.cs.ubc.ca/students/undergrad/resources/academic-advising) will over-enroll the course by moving as many people as they can from the waitlist into the lecture after the first day of class; only the advisors have the ability to make changes to the class list. At this point, the class composition will be frozen for the rest of the term. There will likely be some natural movement of people leaving the course before the add/drop date, but this will just drop our total size back towards capacity rather than the over-enrolled state we will be in after the first lecture.

<!---
There is extremely high demand for this course this term. If you are on the waitlist and wish to join the class, please come to the front after **EVERY** class to sign in. Those students who have signed into every class by September 16 will be forwarded to the advisors who will insert students into available spots by the add/drop deadline. This does not guarantee you will be admitted, but without signing in every class you will not be eligible. Students on the waitlist should not form groups with students who are already enrolled in case your whole group does not make it into the course this term. Unfortunately, the instructor is not able to override class seat assignments or the waitlist itself.

If you are on the waitlist you should still attend and sign into a lab section so you understand what is happening in the course, and so you do not miss out on the lab attendance marks.
--->
### Late Submissions

The project late policy is described [here](project/README.md#late-policy).

### Accommodation

Lab attendance is mandatory so you have time to meet with your partner. If you must miss a lab, please notify your TA directly
If you are sick and unable to write the midterm, please contact Reid as soon as possible -- provide medical documentation.
Students who miss the midterm or final exam due to illness should consult the Faculty of Science Policy on missed exams. Students who do not have sufficient standing during the term may not qualify for academic concession if they miss the final.
Students who require dispensation based on their unique circumstances should refer to the [UBC policy on Academic Concessions](http://www.calendar.ubc.ca/vancouver/?tree=3,48,0,0).
Phones, tablets, calculators, translators, and all other electronic devices are prohibited on desks during exams. They must be turned off and placed in your bag or on the ground. Students who need exam accommodation must make an official request to the [Access and Diversity Office](https://students.ubc.ca/about-student-services/access-diversity).

### Derivative Code

Each student is responsible ensuring the code in all of their repositories is their own and is not derived from other students in the class, from past student solutions, or other code resources online. This policy is bidirectional: whether you copied some other code, or your code was copied, the penalties are the same.

***All*** teammates are responsible for all commits made to their repositories and for any sharing of their code with other groups. We carefully examine all commits using automated analyses and the course staff carefully manually examine every case of derivative code and only assess penalties when we are certain that the code derives from, or has been derived within, another repository.

The penalty for using (and/or providing) code to another group is to receive a 0 on the deliverable associated with the violation. Since the project is cumulative, you will also have to reimplement your system to ensure that no future violations take place. ***All*** partners are responsible for their team's code and every team member will be assessed the penalty: how you collaborate as a team is your responsibility, we recommend you work closely together so you are aware of the provenance of all of your team's code. If you receive a 0, you do not need to contact us, you are free to just remedy the problem (aka reimplement your solution) and move forward with subsequent deliverables. 

If you do wish to appeal our findings and believe your code is your own and was not provided to any other group, you can contact the course instructors and we can launch the appeal process. This process is much more formal and may be managed through the dean's office as they have official processes for adjudicating academic misconduct, which is the most common UBC-level policy pertaining to using (or providing) derivative code.

It is straightforward to avoid violating this policy:

* Always make sure your work is your own.
* Never look at or copy at another team's solution, either from this term or past terms. 
* Do not share your code with other teams or post your solution online (see the [License](#License) below).

### Academic Misconduct

The official policies for Academic Misconduct can be found at the following links:

* [UBC policy on Academic Misconduct](http://www.calendar.ubc.ca/vancouver/index.cfm?tree=3,54,111,959)
* [Computer Science Department Lab policies and responsibilities](https://www.cs.ubc.ca/our-department/administration/policies/collaboration)
* [Computer Science Department Academic Integrity](https://www.cs.ubc.ca/students/undergrad/resources/academic-integrity)

### Respectful Environment

Everyone involved with CPSC 310 is responsible for understanding and abiding by UBC's [Respectful Environment Statement](http://www.hr.ubc.ca/respectful-environment/).

The Statement of Principle of UBC's Respectful Environment Statement is "The best possible environment for working, learning and living is one in which respect, civility, diversity, opportunity and inclusion are valued. Everyone at the University of British Columbia is expected to conduct themselves in a manner that upholds these principles in all communications and interactions with fellow UBC community members and the public in all University-related settings." More details can be found on the department's [resource page](https://www.cs.ubc.ca/students/undergrad/resources/equity-inclusion-wellness).

### License

The readings for this course are licensed using [CC-by-SA](https://creativecommons.org/licenses/by-sa/3.0/). However, it is important to note that the deliverable descriptions, code implementing the deliverables, exams, and exam solutions are considered private materials. We go to considerable lengths to make the project an interesting and useful learning experience for this course. This is a great deal of work, and while future students may be tempted by your solutions, posting them does not do them any real favours. Please be considerate with these private materials and not pass them along to others, make your repos public, or post them to other sites online.


<!---

### Archived bits

#### First Lecture Links

* [Sample Repository](https://github.com/rtholmes/cpsc310starter) for in class use.
* ~~[Entrance Survey](https://goo.gl/forms/0G3o369xPqRSmThI3) Please let us know what you want out of CPSC 310!~~
--->
