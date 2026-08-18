# Course Syllabus

This course will enable you to apply principles of good software design to engineer modern software systems.
Building from concepts in systematic program design and software construction, you will develop the technical skills necessary to identify and justify design decisions and their impact on the evolution of large, long-lived systems.
We will be learning about the specification, design, validation, evolution and construction of modern software systems, within the context of socially and professionally relevant domains such as ethics, intellectual property, and information security.

## Learning Outcomes

In this course, you will learn to:

1. Evaluate software engineering processes used to build modern industrial-calibre systems by justifying their benefits and tradeoffs.
2. Elicit, deconstruct, and refine functional requirements and quality attributes such that they are described succinctly, completely, and precisely.
3. Devise and justify high- and low-level designs to support a given set of requirements and in support of future evolutionary needs.
4. Iteratively derive implementations of a design of reasonable complexity incorporating emergent design implications, and applying code-level restructuring for the sake of facilitating changes.
5. Carry out the implementation of a design incorporating ethical and security implications of code-level choices and software process and methodological approaches.
6. Independently acquire and apply modern and unfamiliar technology and language stacks.
7. Validate systems using both black-box and glass-box approaches to reason about, and improve the quality of a software system.

## Grading

| Component | Weight |
| --------- | ------ |
| Lab Assns | 10%    |
| Project   | 20%    |
| Midterm   | 30%    |
| Final     | 40%    |

**In-class participation** earns up to a **5% bonus on your final exam grade**, to a maximum grade of 100%. See [Participation](#participation) below for how it is calculated.

## Course Components

### Lectures

Lectures will take place in-person and will not be recorded.

Attending lecture is important for both your own benefit and for the benefit of the classroom community. Many lectures will have opportunities for active learning where you will be able to exchange ideas and learn from your peers. To prepare for lecture, you should complete the readings listed on the [part page](schedule.md) for that week. Slides will be posted before each lecture.

#### Participation

Every lecture will have **at least two iClicker questions**. Respond to at least one of them and that lecture is credited.

Questions are graded by **response, not correctness**. They are your opportunity to engage with the material at the moment the concept is trying to stick, so a real attempt is worth more to you than a safe one — but a wrong answer costs you nothing.

- Your **four lowest lectures are dropped**. That covers illness, interviews, conflicts, a dead phone battery, and the lecture where the app misbehaves. You do not need to tell us about any of these.
- You earn credit regardless of which section you attend.
- The bonus is `5 × min(1, credited lectures / (total lectures − 4))`.

### Labs



take place on Zoom
We will drop your lowest mark. No additional accomodations will be granted.
Lab assignments are due 

Labs meet weekly starting in week 1.

**Weeks 2–8 — individual assignments.** Each is small, directed, and due **Sunday at 18:00**. The lab that week is your work period for it, and the assignment is released the preceding Friday so every section has the same amount of time regardless of which day your lab meets.

Each session opens with a **tutorial** on material covered in lecture. 
You will then have time to work through the weekly assignment. TA's will be available to answer questions. ou will be able to 


**Weeks 9–13 — team sessions.** Once teams form, labs become working time on your team's sprint. Each team also has a scheduled check-in inside the lab block with a standing agenda:

- What merged since last week
- What is blocked
- Which pull request is open for review

Attendance is expected from week 2 onward. If you must miss a lab in the team half, post an issue to your team repo beforehand outlining what you have completed and what remains.

### Project

You will not start from a blank repository. You inherit a working system that already satisfies two published API versions, and then you are asked to change it.

Each deliverable is equally weighted.

See the [roadmap](./schedule) for the full schedule.

#### Code is necessary but not sufficient

This is the most important thing to understand about how the project is graded, and it is different from most courses you have taken.

Every deliverable ships **three** artifacts:

1. **Code** — feature-scoped pull requests, with commits relevant to the feature
2. **Design rationale** — what you changed, what you rejected, and what it cost
3. **Process evidence** — the pull requests, the commit sequence, the specification, the tests

A submission that is functionally correct but arrives with no rationale and no process evidence will land in the lower band. We are assessing your engineering judgment, and judgment is only visible in the argument you make for your decisions.

This is not busywork. In practice, nobody will ask you whether your code passes — they will ask why you built it that way, and whether it can absorb the change they want next.

#### Use of AI tools

Use whatever tools you find useful. The assessed artifact is your **reasoning and its provenance**: you are accountable for explaining every design decision in your own words, and for the evidence trail showing how the code came to be.

If you cannot explain why a change is in your pull request, it does not matter which tool produced it.

### Assessments

Lectures, labs, and the project are all formative approaches desgined to help you learn the course material.
To assess your understanding of the material, you will write two paper-based formal assessments.
The exams will be invigilated and no external notes or devices will be permitted.

#### Midterm

There is one in-person midterm scheduled for **Thursday October 29th, 7--9PM** (location to be posted in the schedule) that covers all content up to and including the end of Week 7 (Thursday, October 22nd).

Questions will be the same shape as those in lab and the reflection questions in the project: you are shown code and asked to identify a design problem, propose a change, and justify it.
Memorizing definitions will not be sufficient; recognizing a problem in unfamiliar code will be.

#### Final Exam

The final exam is scheduled by the university and is 2.5 hours in duration.
It is cumulative, with an emphasis on material covered in Week 8 onwards.
Questions will be similar in style as the midterm.

## Policies

### Accommodations

Accommodations will only be considered under UBC's [Grounds for Academic Concession](https://vancouver.calendar.ubc.ca/campus-wide-policies-and-regulations/academic-concession).
If you have a request for accomodation on these grounds, please contact the Course Coordinator at cpsc310-admin@cs.ubc.ca.

When contanting the course coordinator, please describe which assessement you are requesting an accomodation for and include the relevant circumstances.
Note that concessions vary depending on the assessment:

- If you **miss a lab:** we are unable to offer accomodations for missed labs. Please refer to the [lab policy](#labs) for additional information.
- If you **miss a project deliverable:** contact the course coordinator within one week of the deadline. If a concession is granted, it will be to shift the weight of the deliverable to the final exam. As the project is cumulative, you will be expected to make up the missing work.
- If you **miss the midterm:** contact the course coordinator within one week of the midterm. If a concession is granted, it will be to shift the weight of the midterm to the final exam.
- If you **miss the final:** reach out to your faculty's advising office to request standing deferred status; you will write the exam at a later date.

You can also reach out to the course coordinator for anything related to the administration of the course, concerns, or accessibility-related accommodations.

### Academic Conduct

The official policies for Academic Misconduct can be found at the following links:

- [UBC policy on Academic Misconduct](https://www.calendar.ubc.ca/vancouver/index.cfm?tree=3,286,0,0)
- [Computer Science Department Lab policies and responsibilities](https://my.cs.ubc.ca/docs/collaboration-plagiarism)
- [Computer Science Department Academic Integrity](https://www.cs.ubc.ca/students/undergrad/resources/academic-integrity)

#### Respectful Environment

Everyone involved with CPSC 310 is responsible for understanding and abiding by UBC's [Respectful Environment Statement](http://www.hr.ubc.ca/respectful-environment/).

The Statement of Principle of UBC's Respectful Environment Statement is "The best possible environment for working, learning and living is one in which respect, civility, diversity, opportunity and inclusion are valued. Everyone at the University of British Columbia is expected to conduct themselves in a manner that upholds these principles in all communications and interactions with fellow UBC community members and the public in all University-related settings."

#### License

The textbook for this course is licensed under [CC-by-SA](https://creativecommons.org/licenses/by-sa/3.0). All other course material including, but not limited to, lecture content, slides, checkpoint descriptions, code implementing the checkpoints, assignments, quizzes, exams, and exam solutions are private materials for exclusive use by students currently enrolled in CPSC310. We go to considerable lengths to make the course an interesting learning experience. This is a great deal of work, and while future students may be tempted by your solutions, posting them does not do them any real favours. Please be considerate with these private materials and not pass them along to others, do not make your repos public or post materials to other sites online.