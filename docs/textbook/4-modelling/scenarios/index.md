---
weight: 0
title: "Scenarios"
---

Let's say you're helping UBC to build a new course registration system with the following requirements:

> Each section has a fixed number of seats. Once it's full, students can join the section's waitlist, which holds at most 50 students. A student can't join the waitlist for a section they're already enrolled in, and can't join the same waitlist twice. Students can leave the waitlist whenever they like, and can check their position on it at any time.
>
> When a seat frees up, the first student in line is offered it and has 24 hours to accept. If they accept, they're enrolled and come off the waitlist. If they decline, or let the offer expire, they come off the waitlist and the seat goes to the next student in line.
>
> The same student is often waiting for several sections at once.

Our end goal is to turn the requirements that this text represents into a working piece of software (one that UBC can use).
This process involves many steps, but the first of which is understanding what *scenarios* we actually need to build our system to handle.

## Anatomy of a Scenario

Scenarios are concrete examples of the requirements in action. 
Each one describes what the system should do in a specific situation using three parts:
- **Given:** the state of the system before the action
- **When:** an action an actor (e.g., a user) performs
- **Then:** the state of the system after the action

Writing scenarios helps reveal ambiguous or missing requirements and suggest the data we will need eventually need to model in our system.

### Example Scenario
**Given:**
- Section is full
- Waitlist is not full
- Student is not enrolled
- Student is not on the waitlist

**When:**
- Student joins the waitlist

**Then:**
- Student is at the end of waitlist

### Writing a Good Scenario
You may notice a few quirks about how we wrote the scenario:
1. We stayed in the *problem domain*, by describing what should happen in client terms instead of how it would be built.
2. We used *words directly from the requirements* (e.g "waitlist," "offer", "enrolled", instead of synonyms. Each clause described a subject simply as having or not having, or being or not being something.
3. We used *consistent order of state elements* in the Given/When/Then, so the differences between each scenarios stood out.
<!-- 4. We *covered the space*, work through every valid starting state. Being systematic helps find edge cases. -->
4. We *kept it short* by declaring what is true, not the steps to get there.

## Covering All Scenarios
After writing one good scenario, be systematic to come up with all the scenarios to cover the domain of the requirements. 
Enumerate all possible actors, and all the possible actions they can take.
Then, list out all the possible *Given*s and take time to come up with the *Then*s according to the requirements you were given.
Some cases might be clear, but more than you expect will have some amount of ambiguity.

As natural language artifacts, requirements can never state every possible rule.
However, the process of thinking about new scenarios helps uncover incomplete or underspecified behaviours, or hidden assumptions in the text.

For example, in the scenario above, we assumed that the student is placed *at the end of the waitlist*.
However, re-reading the requirements text, this is not necessarily part of the requirements (even if we intuitively interpret it to be true that students should join the waitlist from the back).
Is this a problem with our scenario? Or a problem with the requirements?

One formal way of expressing this is that there are multiple valid *Then*s for one *Given/When* pair. All of these are technically "valid" according to our interpretation of the requirements:
- *Then*: Student is on the waitlist
- *Then*: Student is first on the waitlist
- *Then*: Student is at the end of the waitlist

When an incomplete or underspecified behaviour is uncovered, it is important to revisit the requirements (and the people who produced them) to clarify: what should the behaviour actually be?
This is why requirements engineering is an iterative process.
Requirements are difficult to elicit, and there are many scenarios that you cannot forsee until you actually think through them!
It is vital to uncover as many of these as possible so the software system we end up building properly fits what the clients need.
