# UBC CPSC 310: Introduction to Software Engineering

### 2019 Winter Term 1 (both sections)

<!--
#### This is a development-heavy four-credit course. Plan your timetable accordingly. If you are not familiar with TypeScript, please start looking at it now.
-->

## Start-of-Term Info

### Course request forms, waitlists, etc.:

Unfortunately, we cannot sign course registration forms and have no knowledge or control over the class composition or waitlists. If you have any questions about registration, please contact the [CS advisors](https://www.cs.ubc.ca/students/undergrad/resources/academic-advising). The waitlists will be frozen on **Friday, September 6** and no additional students will be added to the course.

For admin-related questions, please contact: `cpsc310-admin@cs.ubc.ca` to ensure a timely and accurate response. This is the same procedure as for first and second year CS classes.

### About the labs:

**No labs during the first week of class:** labs start the second week (e.g., Sept 10-13).

This is a pair-programming course: If you want to work with someone specific for your project, be sure that both of you register for the _SAME_ lab section. We do not have the ability to move people around between labs; please either monitor the SSC for space in your preferred lab sections, move to another lab with space, or find a partner in the lab you are registered in. Teams **must** be firm by the time of your lab the week of the add/drop deadline. If you do not have a partner, it is your responsibility to notify the TA in lab that week so you can be paired up. If you do not have a partner at the end of your lab that week, you will not be able to complete the project (40% of your final grade). Finding a partner is **your** responsibility and is key to your having a great term, please take the time to do this right.

### Cheating:

**IMPORTANT: DO NOT CHEAT ON THE PROJECT.** Don't copy code from others or the web. Don't share code. Concrete details are [given below](#derivative-copied-code). Both you and your partner will receive 0 points for any shared or copied code (from both the team that copied, **and** the team that was copied from). Make sure every line of code you commit is either provided by us, or written by you (or your partner). Cases will be referred to the dean and students have been suspended for copying in past terms.

## CPSC 310 Overview

The world runs on software and CPSC 310 is all about taking the skills and knowledge you learned in [CPSC 210](https://sites.google.com/site/ubccpsc210/) (Software Construction) and extending your abilities to design and build non-trivial software systems. The course will involve a significant challenging [project](project/README.md) that we will start working on in the first lecture and will continue to evolve until the last week of class; do not underestimate the engineering effort this project will require.

The lecture time slot will be highly interactive and will involve working with your project partner (and sometimes teaming up with other groups as well). Only the first and last lecture slots of the course will be 'traditional' lectures. Tuesday lectures will be activity-driven to reinforce the materials from each week's readings and videos. Thursdays lectures will focus on tying the lecture material to the course project. One important implication of this is that all course material will be fully covered in the videos, readings, and project. You can base your Tuesday attendance on your own assessment of your mastery of the material for that week. For Thursdays, your can decide if you need to come based on how the project is progressing. Attendance in lecture has no bearing on your participation grade, as long as you submit your weekly reflection (which is submitted online).

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

CPSC 310 will be a challenging course that we have designed to integrate many of the ideas and concepts from your prior courses in order to help you to learn how to apply them to engineering modern software systems. The official course learning outcomes (CLOs) for CPSC 310 are:

1. **Evaluate software engineering processes** used to build modern industrial-calibre systems by justifying their benefits and tradeoffs.

1. **Elicit, deconstruct, and refine** functional requirements and quality attributes such that they are described succinctly, completely, and precisely.

1. **Devise and justify high- and low-level designs** to support a given set of requirements and in support of future evolutionary needs. 

1. **Iteratively derive implementations** of a design of reasonable complexity incorporating emergent design implications, and applying code-level restructuring for the sake of facilitating changes.

1. **Carry out the implementation** of a design incorporating ethical and security implications of code-level choices and software process and methodological approaches.

1. **Independently acquire and apply** modern and unfamiliar technology and language stacks.

1. **Validate** systems using both black-box and white-box approaches to reason about, and improve the quality of a software system.


## Contact

#### Instructor:

* Section 101: [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
  * T/Th @ 1230-1400 in MATH 100
* Section 102: [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
  * T/Th @ 1700-1830 in SWNG 221

#### Administrivia:

For admin-related questions (questions about late surveys/deliverables, illness, exam accomodations, etc.), please contact: `cpsc310-admin@cs.ubc.ca`. This will help us get you the right answer to administrative questions as quickly as possible. This procedure is the same as for CPSC 110, 210, etc.

#### TAs:

* Lucas Zamprogno (GTA)
* Tim Straubinger (GTA)
* Syed Ahmad (GTA)
* Junze Wu (GTA)
* Ada Li
* Annie Wang
* Arash Haj
* Braxton Hall
* Chi Duong
* Eishan Lawrence
* Harman Gakhal
* Ivan Zhang
* James Yoo
* Kenny Kwan
* Noa Heyl
* Oscar Tu
* Will Zhang
* Yilan Yan
* Yvonne Li

*TA Office Hours*:

| Date/Time		  | Location | TA 	   	|
|---		      |---		 |--- 		|
| Mon 1100 - 1300 | ICCS 015 | Ada, James
| Mon 1400 - 1600 | ICCS 015 | Braxton, Kenny
| Mon 1600 - 1800 | ICCS 015 | Braxton, Yvonne
| Tue 1400 - 1600 | DLC      | Eishan Lawrence
| Wed 1100 - 1300 | DLC      | Ada
| Thu 1300 - 1500 | DLC      | Eishan
| Fri 1000 - 1200 | ICCS 015 | Arash, Yilan
| Fri 1200 - 1400 | ICCS 015 | Ada, Harman
| Fri 1400 - 1600 | ICCS 015 | Yvonne, Chi
| Fri 1600 - 1800 | ICCS 015 | Harman, Noa

### Piazza

[Piazza](https://piazza.com/ubc.ca/winterterm12019/cpsc310/home) has been configured for this term. Please see the instructor in person in class if you want to discuss course materials; only TAs will monitor Piazza. Please be mindful of our [Derivative Code](#Derivative-Code) policy with respect to sharing or using other student's code. It is _extremely_ helpful if your Piazza name corresponds to your name in the SSC in the advent we need to help you with a problem with your project, repositories, or grades.

When posting to Piazza please be sure to include a link to your team's GitHub repository so the TAs can find your group's code in order to help you more effectively. Also, when asking TAs about failing tests in particular, the TAs will often want to see your own test for similar cases (usually this will take several tests) so you can demonstrate to them why you think your code is correct.

### Getting help

By far the most effective mechanism for *content and exam help* is to actually attend and participate in lectures. While the videos are available, the literature strongly shows that skipping class has a strong negative impact on grades, one that watching videos alone cannot compensate for [[Edwards & Clinton 2018](https://link.springer.com/article/10.1007/s10734-018-0275-9)].

For *[project](project/README.md) / language help*, there will be at least 24 hours of labs and 24 hours of TA office hours per week. TA office hours closer to the deadline are likely to be _much_ busier than others (which may not be attended at all); to accommodate this we have scheduled most of the office hours prior to deadlines, but seeking help at other times and in your lab will likely be less busy.

## Schedule

This is a high-level overview of what the course will be about. Expect this list to change, although we will commit to freezing the schedule and videos for each upcoming week by the end of the previous Thursday so you will be able to watch the correct videos and complete the survey for that week.

| Week					| Topic & Readings 	| Survey |
|---					|---					|--- |
| Week 0: Sept 2		| [Introduction](https://github.com/ubccpsc/310/blob/master/resources/readings/Introduction.md) [Languages](https://github.com/ubccpsc/310/blob/master/resources/readings/Languages.md) |  Week 0 Survey- Expired |
| Week 1: Sept 9		| [Testing](https://github.com/ubccpsc/310/blob/master/resources/readings/Testing.md) | Week 1 Survey - Expired |
| Week 2: Sept 16	| [Process & Agile](https://github.com/ubccpsc/310/blob/master/resources/readings/Process.md), [Teamwork](https://github.com/ubccpsc/310/blob/master/resources/readings/Teamwork.md), & [Async](https://github.com/ubccpsc/310/blob/master/resources/readings/Async.md) | Week 2 Survey - Expired |
| Week 3: Sept 23	| [Specifications](https://github.com/ubccpsc/310/blob/master/resources/readings/Specifications.md) & [User Stories](https://github.com/ubccpsc/310/blob/master/resources/readings/SpecificationsUserStories.md) | [Week 3 Survey](https://ubc.ca1.qualtrics.com/jfe/form/SV_1EQ4M3g9FbtEB9z) - Due Sept 23 @ 0800 |
| Week 4: Sept 30	| [Testability & Assertions](https://github.com/ubccpsc/310/blob/master/resources/readings/TestabilityAssertions.md), [White Box Testing](https://github.com/ubccpsc/310/blob/master/resources/readings/WhiteBoxTesting.md) | Week 4 Survey - TBD |
| Week 5: Oct 7		| High Level design: <ul><li>[High-level design](https://github.com/ubccpsc/310/blob/master/resources/readings/HighLevelDesign.md) </li><li>[Technical Representations](https://github.com/ubccpsc/310/blob/master/resources/readings/Representations.md)</li><li>[APIs](https://github.com/ubccpsc/310/blob/master/resources/readings/API.md)</li></ul> | D1 Survey - Oct 7 @ 1900 (Mandatory!) - TBD | 
| Week 6: Oct 14		| High-level design: <ul><li>[Design principles](https://github.com/ubccpsc/310/blob/master/resources/readings/DesignPrinciples.md)</li></ul> | Week 6 Survey - TBD |
| Week 7: Oct 21		| Midterm (Tuesday in class) & High-level design (Thurs) | Week 7 Survey - TBD |
| Week 8: Oct 28		| [Low-level design](https://github.com/ubccpsc/310/blob/master/resources/readings/LowLevelDesign.md) | D2 Survey - Oct 28 @ 1900 (Mandatory!) - TBD |
| Week 9: Nov 4		| <ul><li>[Low-level design](https://github.com/ubccpsc/310/blob/master/resources/readings/LowLevelDesign.md)</li><li>[MV*](https://github.com/ubccpsc/310/blob/master/resources/readings/MVStar.md)</li></ul> | Week 9 Survey - TBD  |
| Week 10: Nov 11	| [InfoSec](https://github.com/ubccpsc/310/blob/master/resources/readings/Security.md), IP, & Ethics | Week 10 Survey - TBD |
| Week 11: Nov 18	| [REST](https://github.com/ubccpsc/310/blob/master/resources/readings/REST.md) | D3 Survey - Nov 18 @ 1900 (Mandatory!) - TBD |
| Week 12: Nov 25	| Construction, [Automation](https://github.com/ubccpsc/310/blob/master/resources/readings/Automation.md), & [Refactoring](https://github.com/ubccpsc/310/blob/master/resources/readings/Refactoring.md) | Week 12 Survey - TBD |
| | Final exam @ TBD  | CSSS has practice exams |

It is expected that you will watch the videos for a week prior to class. This will greatly increase your understanding of what will be happening in lecture and make it much easier for you to participate in any hands-on activities we will be doing. The videos below will be annotated with their week (W0, W1, etc.) once we know when each should be watched to prepare for lecture that week.

NOTE: The videos below are ordered conceptually, although course constraints cause us to do many topics out of order (so you can use them in the project, etc.), so make sure you check the full list to make sure you have covered all the videos for a given week. A more conceptually-coherent view of these resources is [also available](https://github.com/ubccpsc/310/blob/master/resources/README.md).

Course Videos
--------

W0: [Course Introduction](http://www.youtube.com/watch?v=3tXzYUVQlrM)  
W0: [Capstone Project Overview](http://www.youtube.com/watch?v=NQCyiD-Fh9Q)   
<!-- [Running Example Introduction](http://www.youtube.com/watch?v=S4GEa6JMo4I) -->
Process
-------

W2: [Why Process?](http://www.youtube.com/watch?v=dtK561i_wX4)  
W2: [Waterfall](http://www.youtube.com/watch?v=1pQ9-BNTvgs)  
W2: [Spiral](http://www.youtube.com/watch?v=Zq6EXTSzf84)  
W2: [Extreme Programming](http://www.youtube.com/watch?v=axcRa3YoCQ0)  
W2: [Test Driven Development](http://www.youtube.com/watch?v=Ux9QMfEK9Eg)  
W2: [Scrum](http://www.youtube.com/watch?v=mjphDWlRQ2c)  

Specification
-------------

W3: [Introduction to Specifications](http://www.youtube.com/watch?v=1rqWeAQ8onI)  
W3: [Requirements Process](http://www.youtube.com/watch?v=7r9vXTSSTVc)  
W3: [Requirements Properties](http://www.youtube.com/watch?v=9z9T0dxMLJU)  
W3: [Requirements Elicitation](http://www.youtube.com/watch?v=PGuPVkNeqJQ)  
W3: [Additional Requirements](http://www.youtube.com/watch?v=mUQOuglR6ss)  
W3: [Validating Requirements](http://www.youtube.com/watch?v=H4V_lwuznVY)  

### User stories

W3: [User Stories](http://www.youtube.com/watch?v=Y7E56dD7Jxw)  
W3: [INVEST Guidelines](http://www.youtube.com/watch?v=fqknLz6rdGE)  
W3: [User Story and INVEST Example](http://www.youtube.com/watch?v=3b63NxSCxPw)  
W3: [Decomposing User Stories: Part 1](http://www.youtube.com/watch?v=qDpfRXGwbG0)  
W3: [Decomposing User Stories: Part 2](http://www.youtube.com/watch?v=mKAPOzwK_wM)  
W3: [Decomposing User Stories: Part 3](http://www.youtube.com/watch?v=1E-9qzKi1Fc)  
W3: [Decomposing User Stories: Part 4](http://www.youtube.com/watch?v=d8zp_-RZNOo)  
W3: [Decomposing User Stories: Part 5](http://www.youtube.com/watch?v=1ZPPmmXE_wM)  

Testing
-------

W1: [Why Test?](http://www.youtube.com/watch?v=Uamo4Ej0tWk)  
W1: [Terminology](http://www.youtube.com/watch?v=WKrvx7qCUDI)  
W1: [Properties of Tests](http://www.youtube.com/watch?v=ll1k3Pks3ZA)  
W1: [Kinds of Tests](http://www.youtube.com/watch?v=_Th3f9vks_w)  
W1: [Unit and System Properties](http://www.youtube.com/watch?v=x2DWjxDiOQo)  
W1: [Red Green Refactor](http://www.youtube.com/watch?v=v0q1MKhSQVM)  

### Black Box Testing

W1: [Equivalence Class Partitioning](http://www.youtube.com/watch?v=ttAAsNSPiXw)  
W1: [Input Partitioning](http://www.youtube.com/watch?v=5PtxXnwyU3Y)  
W1: [Output Partitioning](http://www.youtube.com/watch?v=0yvHDKI-DSA)  
W1: [Boundary Value Analysis](http://www.youtube.com/watch?v=IRQU_fHKUa0)  
W1: [Assertions](http://www.youtube.com/watch?v=DCAFxgUXM4I)  
W1: [Assertions Example](http://www.youtube.com/watch?v=Y0GEftJ5MB0)  

### White Box Testing

W4: [Introduction to Coverage](http://www.youtube.com/watch?v=iujQEm9oono)  
W4: [Line and Statement Coverage](http://www.youtube.com/watch?v=SC7R-QixRaU)  
W4: [Branch and Path Coverage](http://www.youtube.com/watch?v=YBiHn5vgKnM)  
W4: [Coverage Wrap-Up](http://www.youtube.com/watch?v=2EBi66DYF5w)  

### Testability

W4: [Introduction to Testability](http://www.youtube.com/watch?v=jwL1vkl-CoY)  
W4: [Controllability](http://www.youtube.com/watch?v=y0zrTdDuYv0)  
W4: [Observability](http://www.youtube.com/watch?v=CJhJibMCTUM)  
W4: [Isolateability: Part 1](http://www.youtube.com/watch?v=Z93-c4ngxGw)  
W4: [Isolateability: Part 2](http://www.youtube.com/watch?v=NMuhE-XnFe8)  
W4: [Automatability](http://www.youtube.com/watch?v=Q83W5zH8LUY)  
W4: [Testability Wrap-Up](http://www.youtube.com/watch?v=d2WjviF50HA)  

High-Level Design
-----------------

W5: [Introduction to Abstraction](http://www.youtube.com/watch?v=HW_b8S2rD4o)  
W5: [Structured Programming](http://www.youtube.com/watch?v=lfzQcwWAh18)  
W5: [Decomposition](http://www.youtube.com/watch?v=R3qWYSa2OyU)  
W5: [Encapsulation](http://www.youtube.com/watch?v=aPTqsdbyhcQ)  
W5: [Information Hiding](http://www.youtube.com/watch?v=f6H2w874TKc)  
W5: [Constant Change](http://www.youtube.com/watch?v=a-vT-01x4TI)  

### Design representations

W5: [Technical Representations](http://www.youtube.com/watch?v=6LoW1iu05z4)  
W5: [Diagrams](http://www.youtube.com/watch?v=Y4oyXMt1cAw)  
W5: [Views](http://www.youtube.com/watch?v=2v3IBQr5Yvw)  
W5: [Static Vs. Dynamic](http://www.youtube.com/watch?v=0jes604qWfE)  
W5: [Deployment Diagrams](http://www.youtube.com/watch?v=MX7XzEUVc4Y)  
W5: [State Machine Diagrams](http://www.youtube.com/watch?v=XaacVyfZ3ds)  

### API Design

W5: [Introduction to APIs](http://www.youtube.com/watch?v=HxevR6dZfH8)  
W5: [High Level API Design](http://www.youtube.com/watch?v=c7yYrjt6Db4)  
W5: [Low Level API Design](http://www.youtube.com/watch?v=OqXw62LWEos)  
W5: [API Design Process](http://www.youtube.com/watch?v=mdiP6xO51w0)  
W5: [API Usability](http://www.youtube.com/watch?v=2rSTWAZxTns)  
W5: [API Platforms and Summary](http://www.youtube.com/watch?v=1nQyHE1uMXE)  

### Coupling & Cohesion

W6: [Coupling: Part 1](http://www.youtube.com/watch?v=I9rEvxiWF9I)  
W6: [Coupling: Part 2](http://www.youtube.com/watch?v=QZAacpnjVVg)  
W6: [Cohesion: Part 1](http://www.youtube.com/watch?v=oMJNS6mvhQU)  
W6: [Cohesion: Part 2](http://www.youtube.com/watch?v=gkCIOUbu81o)  

### Design principles

W6: [Design Guidance and Symptoms](http://www.youtube.com/watch?v=_Eb5bAgpgQg)  
W6: [Single Responsibility Principle](http://www.youtube.com/watch?v=QQ26-dkzEdM)  
W6: [Open/Closed Principle](http://www.youtube.com/watch?v=815hXPR_kHo)  
W6: [Liskov Substitution Principle](http://www.youtube.com/watch?v=8UG6P1a8rKg)  
W6: [Interface Segregation Principle](http://www.youtube.com/watch?v=x_9QJ83oj2k)  
W6: [Dependency Inversion Principle](http://www.youtube.com/watch?v=BJr2yG-Hn7g)  

Low-Level Design
----------------

W8: [Introduction to Low Level Design](http://www.youtube.com/watch?v=wJ-xnK9O-nU)  
W8: [Design Patterns Overview](http://www.youtube.com/watch?v=BHFk5yt_DEs)  
W8: [Singleton](http://www.youtube.com/watch?v=V_WbZClazDw)  
W8: [Strategy](http://www.youtube.com/watch?v=1MJ_Lj8mebU)  
W8: [State](http://www.youtube.com/watch?v=uB4OQ4Am3Rw)  
W8: [State and Strategy](http://www.youtube.com/watch?v=Ccpg656MUxE)  
W9: [Facade](http://www.youtube.com/watch?v=MdMaHrKQBsU)  
W9: [Decorator](http://www.youtube.com/watch?v=la2Jzb8jmqo)  
W9: [MVC](http://www.youtube.com/watch?v=regs2s8HMi4)  
W9: [MVP](http://www.youtube.com/watch?v=3ULFKSXeLM8)  
W9: [MVC and MVP](http://www.youtube.com/watch?v=O-__G6CKICk)  

Construction
------------

W12: [Introduction to Construction](http://www.youtube.com/watch?v=z-Q2CIfshcw)  
W12: [Non-Structural Properties: Readability](http://www.youtube.com/watch?v=TZ7mfKJa7Sw)  
W12: [Static Analysis and Linters](http://www.youtube.com/watch?v=QKK9XAdleFg)  
W12: [Automation](http://www.youtube.com/watch?v=HMtyshK3LNU)  
W12: [Code Smells](http://www.youtube.com/watch?v=oqqaDaQ3m24)  
W12: [Refactoring](http://www.youtube.com/watch?v=bHKyMxvZFXY)  

### REST

W11: [REST Development: Part 1](http://www.youtube.com/watch?v=Y8AYxFgwmJk)  
W11: [REST Development: Part 2](http://www.youtube.com/watch?v=Aoms-MrqW3g)  
W11: [REST Development: Part 3](http://www.youtube.com/watch?v=JiojH8HfUps)  

### Languages & Concurrency

W0: [Programming Language Introduction](http://www.youtube.com/watch?v=U-ihh6bsDz4)  
W2: [Introduction to Concurrency and Asynchronous Development: Part 1](http://www.youtube.com/watch?v=T__CJfXswbA)  
W2: [Introduction to Concurrency and Asynchronous Development: Part 2](http://www.youtube.com/watch?v=ZyiLFip7nqk)  
W2: [Introduction to Concurrency and Asynchronous Development: Part 3](http://www.youtube.com/watch?v=xwSUBY2tIm4)  

### Information Security

W10: [Information Security Introduction](http://www.youtube.com/watch?v=PprrpG7S3gc)  
W10: [Information Security: Understanding](http://www.youtube.com/watch?v=PmpkftNf5IA)  
W10: [Information Security: Analysis](http://www.youtube.com/watch?v=r0Hb_cqd5Dw)  
W10: [Information Security: Mitigation Part 1](http://www.youtube.com/watch?v=TbqJfiFUM2g)  
W10: [Information Security: Mitigation Part 2](http://www.youtube.com/watch?v=mZ3_8wjqxFI)  
W10: [Information Security: Validation](http://www.youtube.com/watch?v=97pHO22Frpc)  
W10: [Information Security Summary](http://www.youtube.com/watch?v=E2ybKiecj2I)  

Ethics
------

W10: [Ethics Introduction](http://www.youtube.com/watch?v=ZuQm5GJfADY)  
W10: [Ethics: Privacy](http://www.youtube.com/watch?v=2QblEuD_M-c)  
W10: [Ethics Summary](http://www.youtube.com/watch?v=hgYVHXpwmpk)  

Intellectual Property
------

W10: [Intellectual Property Introduction](http://www.youtube.com/watch?v=DtEqlRIJpuU)  
W10: [Intellectual Property: Trade Secrets](http://www.youtube.com/watch?v=1W-DN4hJcWw)  
W10: [Intellectual Property: Trademarks](http://www.youtube.com/watch?v=Rawb58IY4pw)  
W10: [Intellectual Property: Copyright](http://www.youtube.com/watch?v=4lTI_Uk0zUs)  
W10: [Intellectual Property: Patents](http://www.youtube.com/watch?v=hBclvEPWXjo)  
W10: [Intellectual Property: Licenses](http://www.youtube.com/watch?v=3uW9_AGtRVg)  
W10: [Intellectual Property Summary](http://www.youtube.com/watch?v=7bcDEDn9CeM)


Labs
-----

**There will not be any labs during the first week of class.**

If you are on the waitlist, please attend any lab that works for you until you are able to get in the course. Lab sections must be finalized by the add/drop date. If you have course conflicts in your schedule that prevent you taking labs with available seats, please talk to the [CS advisors](https://www.cs.ubc.ca/students/undergrad/resources/academic-advising); unfortunately the course staff is not able to control who is in the lab or lecture.

| Lab | Time 		 | TAs
| :-- |:-- 		 | :--
| L1N | Tue 0900-1100	 | Yilan, Will
| L1M | Tue 1530-1700	 | Harman, James
| L1E | Tue 1700-1900	 | Annie, Will, Eishan
| L1H | Wed 0900-1100	 | Kenny, Oscar, Yilan
| L1B | Wed 1100-1300	 | Annie, James, Noa
| L1D | Wed 1300-1500	 | Braxton, Arash, Oscar
| L1C | Wed 1500-1700	 | Braxton, Yvonne, Noa
| L1G | Thu 1030-1230	 | Ada, Harman, Junze
| L1F | Thu 1400-1600	 | Arash, Chi, Annie
| L1J | Thu 1700-1900	 | Will, Chi, Eishan
| L1K | Fri 0900-1100	 | Kenny, James
| L1L | Fri 1100-1300	 | Oscar, Annie
| L1A | Fri 1400-1600	 | Arash, Kenny, Oscar
| L1P | Fri 1600-1800	 | Will, Yvonne, Chi

You will not have to specify your team until the week of Sept 16. Both team members will be required to attend each lab. During the week each deliverable is due, lab attendance will be verified by the TAs during the Oral Question process; absence will result in a grade of 0 for the deliverable.

#### TA Office Hours

**There will not be any office hours during the first week of class. Also, these hours are all subject to change, always check back here!**

In addition to the 12 hours of labs per week, there are also ~12 hours of TA office hours per week. These have been clustered later in the week, but some are available on each day, to better meet anticipated demands.

<!--
To simplify scheduling, all lectures, office hours, and labs will be kept up to date on the following:
### [Lecture/Lab/Office Hour Calendar](https://calendar.google.com/calendar/embed?src=nd7ha4c6bmar00p19mddks4508%40group.calendar.google.com&ctz=America%2FVancouver)
-->

## Project

The [project](project/README.md) is an integral part of this course. **The project will be difficult and time consuming**. Projects will be completed in pairs (everyone *must* have a partner, and you must work with the same partner for the duration of the term). Your partner needs to be in the same lab section as you. The project will proceed in 5 2-3 week sprints; the requirements for each sprint is detailed in a deliverable document. You should expect the project to take ~6 hours / week / person (13 weeks * 2 people * 6 hours = 156 hours). It is extremely important you not leave project deliverables until the last moment. It is impossible to stress strongly enough how important this is; 36h over three weeks is no problem, but over a weekend is *impossible*. These time estimates are based on effective effort, if you are multitasking or just randomly trying to cobble something together without a plan or tests, the project may take much longer.

The project will rely heavily on self-learning. The course content is necessarily broad to provide coverage that will be applicable to *most* software development projects. It is important to remember that the project is a *single* software project that will utilize only a subset of the in-class material; the lectures will not serve as a tutorial for the project, it is expected that you will have to use your own creativity to reason about the project requirements, design a solution, and build and validate it yourself.

The intent of this project is to give you the opportunity to concretely apply the course concepts on a real system, but with fewer constraints than were possible in CPSC 210. At the same time, the system does have _some_ constraints to simulate a real system specified by real clients. A strong test emphasis reinforces the importance (and difficulty) of building high-quality software in practice.

Engineers use automated test suites to validate that their software is working as expected. We will evaluate your project deliverables similarly using [AutoTest](project/AutoTest.md). In addition to AutoTest, each team member will be independently asked a small number of questions in the lab to assess their understanding of the solution. While it is reasonable for team members to be more knowledgeable about different parts of the system, it is expected that you will understand your entire solution at a high level and be able to provide specific in-depth insight to some meaningful components of your solution.

See the [full project description](project/README.md) for complete details about the project, the lab, project grading, and finding partners.


## Project Sprint Schedule

Each deliverable has a deadline; we have also added a one week grace period for and final submissions if needed. Full TA support will be given to any group prior to the deadline; during the grace period, priority will be given to struggling teams or groups working on the next deliverable. (D0 is exempt from this schedule and has only one final deadline)

During the grace week, TAs will only help groups with AutoTest scores below 80%. In the three days prior to the final submission date, only groups with less than 50% AutoTest scores will be helped. We encourage all groups to submit by the deadline, the final submission date is really only for those groups who need a little more time for polish. Regardless of your grade, your TAs will always help you during *your own* lab section; this restriction applies only to Piazza, Office Hours, and labs other than your own.

* September 16 @ 1800: ([Deliverable 0](project/Deliverable0.md)) This will be an individual deliverable and will be graded before the Add/Drop date. You should aim to exceed 70% on this deliverable if you want to succeed at the project.

* September 30 (Oct 7 @ 1800 final sub): [Sprint 1](project/Deliverable1.md) The first project deliverable will be extremely challenging; it is important that you start working on this early.

* October 22: Midterm (sample midterms are available through the CSSS)

* October 21 (Oct 28 @ 1800 final sub): [Sprint 2](project/Deliverable2.md) 

* November 11 (Nov 18 @ 1800 final sub): [Sprint 3](project/Deliverable3.md)

* November 25: [Project Quality Check](project/Deliverable4.md). There is nothing to submit for this deliverable. It will be computed on the version of your code as it exists at the Sprint 3 deadline (*not* the commit associated with the Sprint 3 maximum). 

Please be aware that waiting until the last minute will greatly degrade AutoTest latency; while you can expect to receive results in < 5 minutes for the majority of the term, this has historically been much slower on the last day:

<img src="https://raw.githubusercontent.com/ubccpsc/310/master/resources/readings/figures/autotest_latency.png" width="320px" alt="AutoTest Latency">

Note: Even when AutoTest is heavily loaded your requests are queued and processed in turn; the timestamps we use for the deadline comes from the GitHub push event, not when AutoTest is able to process the request or when the commit was made locally.

## Grading

To pass the course and receive credit you must achieve a passing grade on *both* the overall project grade and the overall exam grade. Sample exams are available through the CSSS.

The project grade component is weighted as follows:

| Project Component				| Proportion |
| :--			 				   	| :-- |
| Deliverable 0 (d0)			| 20 %	|
| Project Sprint 1 (d1)			| 20 %	|
| Project Sprint 2 (d2)			| 20 %	|
| Project Sprint 3 (d3)			| 15 %	|
| Project Quality Check	 (d4)	| 15 %	|
| Participation					| 10 %	|

The exam component is weighted as follows:

| Exam Component			| Proportion 	|
| :--			 			| :-- 			|
| Midterm Exam			| 30 %	|
| Final Exam				| 70 %	|

The final grade for the course will be computed as follows:

`final grade = (project grade * .5) + (exam grade * .5)`

The easiest way to think about this is that the project grade acts as a multiplier on your exam grade. Given the way the project is configured with AutoTest, in past terms we have found the project median to exceed 95%. Any content from the course videos, readings, lectures, and project is examinable.

## Participation

Participation marks are given for submitting timely status reports for the lecture component of the class. With the exception of Week 0, these reports **MUST** be submitted before class and will require watching the videos for that week. These reports are intended to be short; we will use them to tailor the activities during the week based on your comments. Each of the 10 reports is worth 0.5% (totalling 5% of your final grade if you submit all 10). We will not tally this grade until the end of the term so it is your responsibility to make sure you have done these by their deadlines (the forms will be deactivated afterwards) and to keep track of your own participation grade. These surveys will be due at 0800 on Mondays; no extensions can be given. Surveys will be posted by mid-day on Friday and are unlikely to be posted before the last lecture of the week is over (just so the survey can reflect where we are in the course in case we need to make any adjustments).

The three deliverable reports are not part of your participation report but are instead required for your deliverable submissions (see the grade rubric in the deliverable description for more detail of those). These surveys will be due at 1900 on Mondays; no extensions can be given (this is later to allow you to comment on your finished deliverable as it will be after the 1800 deadline).

## Policies

<a name="waitlist"></a>
### Waitlist

To maximize certainty around getting access to 310 this term, the [CS advisors](https://www.cs.ubc.ca/students/undergrad/resources/academic-advising) will over-enrol the course by moving as many people as they can from the waitlist into the lecture after the first day of class; only the advisors have the ability to make changes to the class list. At this point, the class composition will be frozen for the rest of the term (**nobody will be moved from the waitlist into the course after the first week of class**). There will likely be some natural movement of people leaving the course before the add/drop date, but this will just drop our total size back towards capacity rather than the over-enrolled state we will be in after the first lecture.

### Late Submissions

The project late policy is described [here](project/README.md#late-policy).

### Accommodation

Lab attendance is mandatory so you have time to meet with your partner. If you must miss a lab, please notify your TA directly
If you are sick and unable to write the midterm, please contact Reid as soon as possible -- provide medical documentation.
Students who miss the midterm or final exam due to illness should consult the Faculty of Science Policy on missed exams. Students who do not have sufficient standing during the term may not qualify for academic concession if they miss the final.
Students who require dispensation based on their unique circumstances should refer to the [UBC policy on Academic Concessions](http://www.calendar.ubc.ca/vancouver/?tree=3,48,0,0).
Phones, tablets, calculators, translators, and all other electronic devices are prohibited on desks during exams. They must be turned off and placed in your bag or on the ground. Students who need exam accommodation must make an official request to the [Access and Diversity Office](https://students.ubc.ca/about-student-services/access-diversity).

### Derivative (Copied) Code

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
