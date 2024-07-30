---
title: "User Stories"
---

User stories are lightweight descriptors of features that are often used by engineers to specify software development tasks. Stories provide a concrete description that can be used by various project stakeholders to discuss features, their value, how they can be validated, and their cost. These representations are an easy way to increase cohesion between product owners and engineers and are an effective way to reduce uncertainty within the development process.

## Format

User stories usually start with one to three sentences that describe the feature being built. The first sentence often takes the format:

> Role - goal - benefit.

This can be expanded to something more like: "As a `<stakeholder>` I want `<function>` so that `<value>`." This format directly conveys who the feature is for, what it is to do, and what the value to the user is.

The next part of the story is a series of notes that describes limitations and provides any clarifications that might be necessary to further explain and scope the feature.

One crucial aspect of user stories is their _definition of done_. This provides a specific description of how the story can be validated by both the developer and the product owner to ensure it is completed correctly. In addition to helping the developer create a correct feature, it also helps them to avoid working unnecessarily on extra functionality the stakeholder might not need. 

Next, any specific engineering notes required can be added to the story. Engineering notes are often used to capture key interactions of the feature with other parts of the system, constraints the implementer must keep in mind, and other domain knowlege that may be required from other teams. These notes are often crucial to understand the effort required to implement a story. The Role-Goal-Benefit and Definition of Done are the two most important parts of a User Story and are written in the _problem domain_; that is, they are written from the client (and user's) perspective. They are specificaly NOT written in the _solution domain_, which is an engineering-forward view into how the story will be implemented, although the Engineering notes are always written from this perspective. 

Finally, an effort estimate is typically attached. While some development teams specifically avoid specifying effort in terms of hours or days, others do this explicitly. When 'points' are used, these are typically equated to developer-hours for a task. The Fibonacci sequence is often used when assigning a point value to stories to reflect the fact that the larger the story the worse we will probably be at estimated it. For instance, with the sequence `1, 2, 3, 5, 8, 13, 21, 34, 55, 89` we believe we can differentiate between a one-hour task and a two-hour task pretty well, but we acknowledge that differentiating between large stories that will take over a week (e.g., 55 or 89) is much harder, which is why larger gaps exist. _Planning poker_ is sometimes used whereby during point estimation team members will be given cards with the Fibonacci values on them and will simultaneously reveal their estimate of a task's point value; any discrepancies can then be discussed.

A set of guidelines called INVEST is often used to evaluate user stories:

* **I**ndependent: Stories need to be independent and self-contained, so they can be reordered and implemented as needed. 
* **N**egotiable: Choosing which stories are performed in the next iteration needs to be a negotiable activity. This also allows the product owner and technical team to ask more questions that flesh out the story and provide greater detail as needed.
* **V**aluable: Being clear about the value of a story is important; most stories are not valuable to all stakeholders, but being able to have this conversation explicitly makes negotiating the relative benefits of various stories possible.
* **E**stimatable: If a story lacks sufficient detail to evaluate its feasibility (and how long it will take) more specification work is needed. One of the cornerstones of user stories is they make reasoning about tasks and maintaining schedules tractable; if a story cannot be estimated it will not work in practice.
* **S**mall: User stories tend to describe features that take between half a day and half an iteration in length. Longer stories should be split up to reduce the chance of a story not making it in an iteration and so that future work on the story can be negotiated in the subsequent work period.
* **T**estable: The definition of done is fundamentally important so all stakeholders understand the ways in which the story will be evaluated. This brings quality concerns to the forefront before development even starts and encourages that features be built in a verifiable manner.

## Example

A short example of a user story is given below:

* As a _prof_, I want to be able to _create_ a repository for a 310 team, so they can _start_ working on the project.
* Notes: Inputs: team name, initial repo, team member GitHub ids.
* Definition of done:
  * Single command will take params and complete task.
  * Success should be programmatically verifiable.
  * Unit tests to check for error handling for org, team name, and members.
  * Integration test will ensure compatibility with the GitHub API.
  * Script-based tests will be provided for the command line aspects of the feature.
* Engineering notes: 
  * Must integrate with existing ```GitHubManager```
  * Any constants that would need to be changed must be stored in ```config.js```.
  * API will be used by user interface in the future, keep this in mind when designing API.
* Estimate: 1.5 units.

User stories are not an excuse for writing unclear or incomplete descriptions of tasks; for example, the following are clearly not acceptable user stories:

* Implement `TeamCreator`.
* Design team creation interface.
* Add extra tests.

## References

* TBD

