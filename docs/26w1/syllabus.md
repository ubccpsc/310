# Course Syllabus

**CPSC 310 — Introduction to Software Engineering**
2026 Winter Term 1 (September–December 2026) · 4 credits

| Lecture section | Time | Room |
| :--- | :--- | :--- |
| 101 | 3:30–5:00 pm | LSK 201 |
| 102 | 2:00–3:30 pm | LSK 201 |
| 103 | 12:30–2:00 pm | LSK 201 |

Labs are held online — see [Labs](#labs).

**Prerequisites.** All of CPSC 213 and CPSC 221. Credit exclusion: DSCI 310 — CS majors must take
CPSC 310.

## Instructors and Course Staff

| Role | Name | Contact | Office hours |
| :--- | :--- | :--- | :--- |
| Instructor | Nick Bradley | [ncbrad@cs.ubc.ca](mailto:ncbrad@cs.ubc.ca) | *TBD* |
| Instructor | Kyle Chin | [kdchin@cs.ubc.ca](mailto:kdchin@cs.ubc.ca) | Wednesdays @ 2-3pm in ICCS 306 |
| Course Coordinator | Irene Yuan | [cpsc310-admin@cs.ubc.ca](mailto:cpsc310-admin@cs.ubc.ca) | — |
| Teaching Assistants | *(TBD: list or link)* | Via Piazza | In your lab section |

**Who to contact for what.** Use **Piazza** for anything about course content, the project, or lab
assignments — questions there get answered fastest and everyone benefits from the answer. Use the
**Course Coordinator** for academic concessions, accessibility accommodations, and course
administration. Email your **instructor** for anything personal or confidential that doesn't fit
either of the above.

**What TAs do.** TAs run lab tutorials, hold the work-period support in labs, review your project
pull requests from D2 onward, and run team check-ins in the second half of the term. They are your
first point of contact for feedback on project work.

## Course Description

This course will enable you to apply principles of good software design to engineer modern software
systems. Building from concepts in systematic program design and software construction, you will
develop the technical skills necessary to identify and justify design decisions and their impact on
the evolution of large, long-lived systems. We will be learning about the specification, design,
validation, evolution and construction of modern software systems, within the context of socially
and professionally relevant domains such as ethics, intellectual property, and information security.

The course is organized around one question asked at four widening scales: **what will the next
change cost, and why?** See the [course materials overview](./materials/) for how that question
structures the term.

## Learning Outcomes

In this course, you will learn to:

1. Reason about how a codebase's structure influences the cost of changing it.
2. Use abstraction to make changing a system cheaper at increasingly larger scales.
3. Elicit, deconstruct, and refine requirements, and write specifications precise enough to check.
4. Evaluate the socio-technical trade-offs in collaborative software engineering processes.

## Learning Materials

Readings for each lecture are listed on the [unit pages](./materials/) and are available in the [course reader](/textbook/).

You will need accounts on **Piazza** (questions and announcements), **PrairieLearn** (lab assignments
and project questions), **iClicker** (in-lecture participation), **Canvas** (grades), and **GitHub
Enterprise** (project repositories). Sign-in links for all of these are on
the [course home page](./).

You will need a computer capable of running Node.js and a modern editor.

## Course Structure

Learning is only possible by thinking, doing, and reflecting.
This philosophy is backed up by science: the more you practice, the more you learn.
Conversely, the more you offload to AI, the less you learn.
CPSC310 is structured to support this philosophy: all work you do in lecture, lab, or on the project is directly correlated with (or sometimes even exactly the same as) the type of problem you will see on any assessment.
Each problem follows a similar recipe:
1. Analyze the situation using a particular analysis framework.
2. Consider several alternative solutions and their tradeoffs.
3. Implement what you deem to be the best solution.
4. Reflect and discuss the process and results.

Most of our practice is low stakes and marked primarily for completion: meaning, you will get out of the problem as much as you choose to engage with and practice it in earnest.

### Lectures

Lectures take place in person, are not recorded, and your attendance is expected.
Each lecture will contain practice opportunities in the form of interactive activities and iClicker qustions that will be similar to what you will see on assessments.
Thus, active attendance and engagement is crucial for you to receive the learning benefits.
Lecture will not comprehensively cover everything you will be responsible for on an assessment.
Our goal is to give you practice with the underlying core concepts so you can apply them to similar examples.
The course [reader](../textbook/) gives full definitions for topics introduced in lecture.

#### Participation

Every lecture will have **at least two iClicker questions**. Respond to at least one of them and
that lecture is credited.

Questions are graded by **response, not correctness** — a wrong answer costs you nothing. So think
each one through and commit to an answer even when you are unsure; being unsure is exactly when the
question is doing its job. These are your chance to engage with the material at the moment the
concept is trying to stick.

We understand that life happens, and attending CPSC310 may not be the most important thing you have going on:
- Your **four lowest lectures are dropped**. That covers illness, interviews, conflicts, a dead phone battery, and the lecture where the app misbehaves. You do not need to tell us about any of these.
- Your participation mark is `min(1, credited lectures / (total lectures − 4))`, worth **5% of
  your final grade**.
- If you find that attending lecture does not fit your needs, you may request that your 5% participation weight be moved to the final exam instead, making the final worth 45% of your course grade. To do this, email the Course Coordinator by **Friday 18 September,
18:00**. The choice applies to the whole term and cannot be reversed after that date. 

### Labs {#labs}

**Labs are held online**, weekly, starting in week 1, and run in blocks from **Friday to Thursday**.
There are no rooms assigned; join links are on the [course home page](./) and attendance is required.
Each is small, directed, and tied to the lecture of the corresponding week (i.e. lab 3 will cover week 3 material, which will be the same week for friday labs and the prior week for all other labs).

**A lab session** opens with a **tutorial** on material from that week's lectures. You then have a
work period for that week's assignment, with TAs available to answer questions. You are not expected
to finish during the lab although you should be able to make significant progress.

**Deadlines.** Lab assignments are due **by the start of your next lab**, giving you one week to
complete them. Because the deadline is relative to your own section, it falls on a different day
depending on which lab you are registered in. But every section gets the same seven days, and
assignments are released so that no section is disadvantaged by meeting later in the block.

**Marking.**
The purpose of labs is to give you opportunities to practice and clarify misunderstandings with your peers and TAs, not that you get them all correct the first time.
Lab assignments are marked largely for completion and are worth just 10% of your course grade.

The exams are worth
70%, and they ask you to do what the lab assignments ask: take code or a design you have not seen,
say what is wrong with it, and justify what you would change.
**The labs are where you rehearse
that**, with help on hand and very little at stake.
Treat them as practice for the exams rather than
as 10% of your grade and you will be spending your time correctly.


**Late assignments will not be graded**, although the instructional team is happy to answer
questions about them afterwards.

**Your lowest lab mark is dropped.** Because of this, no additional accommodations are granted for
missed labs — see [Academic Concession](#academic-concession).

**From week 8 onward your team also has a check-in** inside the lab block, with a standing agenda:

- What merged since last week
- What is blocked
- Which pull request is open for review

**Plan to work on the project outside the lab slot.** The lab block is taken up by the tutorial, the
week's assignment, and later your team check-in. There is not enough room in it for substantive
project work, and it is not designed to hold any. Once pairs form during the Oct 16–22 lab, you and
your partner will need to arrange your own working time — that is a real scheduling commitment, and
it is worth agreeing on it in the first week you are paired rather than the week D4 is due.

### Project

You will not start from a blank repository. You inherit a working system that already satisfies two
published API versions, and then you are asked to change it.

There are four deliverables; each is equally weighted. The first two are solo, the last two are
completed in pairs. See the [project pages](./project/) for specifications and the
[schedule](./schedule) for dates.

#### Code is necessary but not sufficient

This is the most important thing to understand about how the project is graded, and it is different
from most courses you have taken.

Every deliverable ships **three** artifacts:

1. **The work itself** — code for D1, D2, and D4; a specification for D3
2. **Design rationale** — what you changed, what you rejected, and what it cost
3. **Process evidence** — the pull requests, the commit sequence, the reviews you left, the tests

Each deliverable is assessed on two fronts: what can be checked automatically, and what requires
judgment. A submission that passes every automated check but arrives with no rationale and no
process evidence loses the judgment half. We are assessing your engineering judgment, and judgment
is only visible in the argument you make for your decisions.

This is not busywork. In practice, nobody will ask you whether your code passes — they will ask why
you built it that way, and whether it can absorb the change they want next.

### Assessments

Lectures, labs, and the project are all formative approaches designed to help you learn the course
material. To assess your understanding, you will write two paper-based formal assessments. Both are
invigilated, and no external notes or devices are permitted.

Exams test whether you can apply the course's concepts to material you have not seen before.
Memorizing definitions will not be sufficient: you will need to be able to read and comprehend code, apply concepts, and articulate the tradeoffs you considered.
Expect several kinds of questions, but in
all of them you will be asked to justify your answer, not merely to give it.
Each kind of question will be something similar to what you have practiced in lecture, lab tutorials, lab assignments or the project.
Additional details
about the format of the exams will be provided closer to the exam date.

Because we are assessing what you have learned (not what you can create), these assessments will occur on paper (and notably, without access to AI).


#### Midterm

There is one in-person midterm scheduled for **Thursday October 29th, 19:00–21:00** *(TBD: location)*
covering all content up to and including the end of Week 6 (Thursday, October 15th).

#### Final Exam

The final exam is scheduled by the university and is 2.5 hours in duration. It is cumulative covering all material in the course.

## Grading

| Component | Weight |
| :--- | :--- |
| Participation | 5% |
| Lab assignments | 10% |
| Project | 20% |
| Midterm | 25% |
| Final exam | 40% |

## Policies

### Academic Integrity

The work you submit must be your own, and the evidence trail must show how it came to be. In this
course that has a specific meaning: your commits, pull requests, and rationale are part of the
assessed artifact, not paperwork around it. Submitting code you cannot explain — regardless of where
it came from — is a failure of the assessment even when the code is correct.

Collaboration is encouraged in labs and on Piazza. It is not permitted on individual deliverables
(D1 and D2) beyond discussing concepts. On team deliverables (D3 and D4), work with your partner and
no one else.

Academic misconduct is taken seriously and carries consequences up to and including failure of the
course and notation on your transcript. The official policies are at:

- [UBC policy on Academic Misconduct](https://www.calendar.ubc.ca/vancouver/index.cfm?tree=3,286,0,0)
- [Computer Science Department lab policies and responsibilities](https://my.cs.ubc.ca/docs/collaboration-plagiarism)
- [Computer Science Department Academic Integrity](https://www.cs.ubc.ca/students/undergrad/resources/academic-integrity)

### Use of Generative AI

**You may use generative AI tools on lab assignments and project deliverables at your own risk.** You cannot use them
on the midterm or the final, which are on paper, invigilated, and permit no devices.

**On code.** You remain accountable for what you submit and you must be able to
explain why any change is in your pull request. "The model wrote it" is not an answer to *why is
this here?*, and it is not a defence for a bug. Keep in mind you will be responsible for both reading and writing code on the assessments without AI tools.

**On your reasoning.** Every deliverable asks you to write down what you changed, what you rejected,
and what it cost.
Writing that down is only the output: the true practice of this exercise happens when you do the thinking and reasoning yourself.
We are not looking for a polished piece of writing, we
are looking for evidence of your thinking, communicated clearly.
Using AI to generate your reasoning means you have skipped the practice, and you find out on the midterm whether that
mattered.

**On citation.** Where a tool contributed substantively to a design decision, say so in your
rationale, the same way you would cite any other source you did not arrive at yourself.

### Academic Concession {#academic-concession}

Concessions are considered under UBC's
[Grounds for Academic Concession](https://vancouver.calendar.ubc.ca/campus-wide-policies-and-regulations/academic-concession).
To request one, complete the [concession form](https://ubc.ca1.qualtrics.com/jfe/form/SV_556JGIKU0jaNmLk) by the deadline indicated
below with a description of which assessment the request concerns and the relevant circumstances.

Concessions vary by assessment:

- **Participation:** we are unable to offer concessions for participation — four lectures are already dropped, and you may opt out entirely in the first two weeks. See [Participation](#participation).
- **A missed lab:** we are unable to offer concessions for missed labs — your lowest lab mark is already dropped. See the [lab policy](#labs).
- **A missed project deliverable:** submit the concession form within one week of the deadline. If granted, the weight shifts to the final exam. As the project is cumulative, you will still be expected to make up the work.
- **A missed midterm:** submit the concession form within one week of the midterm. If granted, the weight shifts to the final exam.
- **A missed final:** contact your faculty's advising office to request standing deferred status; you will write the exam at a later date.

### Accessibility and Accommodation

UBC provides appropriate accommodation for students with disabilities and for religious, spiritual,
and cultural observances. If you have a registered accommodation through the
[Centre for Accessibility](https://students.ubc.ca/about-student-services/centre-for-accessibility),
contact the Course Coordinator early in the term so we can arrange it — particularly for the
midterm, where room bookings need lead time.

You can also reach out to the Course Coordinator about anything related to the administration of
the course, concerns, or accessibility-related needs.

### University Values and Policies

UBC provides resources to support student learning and to maintain healthy lifestyles but recognizes
that sometimes crises arise and so there are additional resources to access including those for
survivors of sexual assault. UBC values respect for the person and ideas of all members of the
academic community. Harassment and discrimination are not tolerated nor is suppression of academic
freedom. UBC provides appropriate accommodation for students with disabilities and for religious,
spiritual and cultural observances. UBC values academic honesty and students are expected to
acknowledge the ideas generated by others and to uphold the highest academic standards in all of
their actions.

Details of the policies and how to access support are available
[on the UBC Senate website](https://senate.ubc.ca/policies-resources-support-student-success).

### Respectful Environment

Everyone involved with CPSC 310 is responsible for understanding and abiding by UBC's
[Respectful Environment Statement](http://www.hr.ubc.ca/respectful-environment/).

The Statement of Principle of UBC's Respectful Environment Statement is "The best possible
environment for working, learning and living is one in which respect, civility, diversity,
opportunity and inclusion are valued. Everyone at the University of British Columbia is expected to
conduct themselves in a manner that upholds these principles in all communications and interactions
with fellow UBC community members and the public in all University-related settings."

### Copyright and Licensing

The [course reader](/textbook/) is licensed under
[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0).

All other course material — including but not limited to lecture content, slides, deliverable
descriptions, code implementing the deliverables, assignments, quizzes, exams, and exam solutions —
are private materials for exclusive use by students currently enrolled in CPSC 310. We go to
considerable lengths to make the course an interesting learning experience. This is a great deal of
work, and while future students may be tempted by your solutions, posting them does not do them any
real favours. Please be considerate with these private materials: do not pass them along to others,
do not make your repositories public, and do not post materials to other sites online.
