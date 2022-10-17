# User stories

User stories are lightweight descriptors of features that are often used by engineers to specify software development tasks. Stories provide a concrete description that can be used by various project stakeholders to discuss features, their value, how they can be validated, and their cost. These representations are an easy way to increase cohesion between product owners and engineers and are an effective way to reduce uncertainty within the development process.

#### Format

User stories usually start with one to three sentences that describe the feature being built. The first sentence often takes the format:

> Role - goal - benefit.

This can be expanded to something more like: "As a ```<stakeholder>``` I want ```<function>``` so that ```<value>```." This format directly conveys who the feature is for, what it is to do, and what the value to the user is.

The next part of the story is a series of notes that describes limitations and provides any clarifications that might be necessary to further explain and scope the feature.

One crucial aspect of user stories is their _definition of done_. This provides a specific description of how the story can be validated by both the developer and the product owner to ensure it is completed correctly. In addition to helping the developer create a correct feature, it also helps them to avoid working unnecessarily on extra functionality the stakeholder might not need. <!-- TODO: extra content here -->

Next, any specific engineering notes required can be added to the story.

Finally, an effort estimate is typically attached. While some development teams specifically avoid specifying effort in terms of days, others do this explicitly. If days are being avoided, a notion of points (ranging from 1/2 to ~40) is often used. If engineer-days are used, stories generally range from 0.5 days to 5 days.

A set of guidelines called INVEST is often used to evaluate user stories:

* **I**ndependent: Stories need to be independent and self-contained so they can be reordered and implemented as needed. 
* **N**egotiable: Choosing which stories are performed in the next iteration needs to be a negotiable activity. This also allows the product owner and technical team to ask more questions that flesh out the story and provide greater detail as needed.
* **V**aluable: Being clear about the value of a story is important; most stories are not valuable to all stakeholders, but being able to have this conversation explicitly makes negotiating the relative benefits of various stories possible.
* **E**stimable: If a story lacks sufficient detail to evaluate its feasibility (and how long it will take) more specification work is needed. One of the cornerstones of user stories is they make reasoning about tasks and maintaining schedules tractable; if a story cannot be estimated it will not work in practice.
* **S**mall: User stories tend to describe features that take between half a day and half an iteration in length. Longer stories should be split up to reduce the chance of a story not making it in an iteration and so that future work on the story can be negotiated in the subsequent work period.
* **T**estable: The definition of done is fundamentally important so all stakeholders understand the ways in which the story will be evaluated. This brings quality concerns to the forefront before development even starts and encourages that features be built in a verifiable manner.

#### Example

A short example of a user story is given below:

* As a _prof_, I want to be able to _create_ a repository for a 310 team so they can _start_ working on the project.
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
  * API will be used by user interface in future, keep this in mind when designing API.
* Estimate: 1.5 units.

User stories are not an excuse for writing unclear or incomplete descriptions of tasks; for example, the following are clearly not acceptable user stories:

* Implement ```TeamCreator```.
* Design team creation interface.
* Add extra tests.

### References

* TBD

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
