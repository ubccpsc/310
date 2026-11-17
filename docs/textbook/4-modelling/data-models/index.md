---
weight: 1
title: "Data Modelling"
---

After brainstorming and enumerating scenarios, the next step in our modelling journey is to create a data model that will support the scenarios.
Persistent data is a essential to enable real-world software because real-world software solves problems that persist across time.
Software is not just a one-use script that you use and throw away!

### Data Requirements

Our end goal is to be able to represent and compute any state, relationship, and rule that is a part of any of our scenarios.
Before we create any sort of diagram for our data model, it is usually helpful to figure out what is the minimal information that we actually need.
Take this scenario:

>**Given:**
> - Section is full
> - Waitlist is not full
> - Student is not enrolled
> - Student is not on the waitlist
> 
> **When:**
> - Student joins the waitlist
> 
> **Then:**
> - Student is at the end of waitlist

Informally, what we need from our data to compute `Waitlist is full` is:
- Waitlist's capacity
- How many students are currently on the waitlist

We can do the same for each other given/when/then to determine the full scope of data requirements.
Some will provide different and new requirements. For example, our *Then* of `Student is at the end of the waitlist` would require not just which students are on the waitlist, but what *order* students are on the waitlist as well.


## Data Models
The purpose of a data model is to represent the state from all scenarios using a single unified view.
Data models are still in the problem domain (the client's language) so need to be implementation agnostic.
This means we cannot make assumptions about how the data are stored and represented, or what language features or data structures we may use.
Keeping data modelling language-agnostic keeps us (as engineers) from making technology choices in favour of focusing on what matters (understanding the requirements, and if/how they can be represented).
Technology choices like databases or programming language are better left later in the process.

### So, what is a data model?
There are many ways of doing data modelling.
For CPSC310, we are doing a simplified version of an Entity Relationship Diagram (ERD).
The CPSC310 data model encompasses the following:

- **Entities:** an abstraction that represents instances of a thing. Entities are an abstraction contains properties that each instance has.
- **Properties:** primitive values (strings, numbers, booleans) that are attributes of each entity.
- **Relationships:** Formed between entities with references and annotated with the kind of relationship. Each side of the relationship has a *cardinality*, or the number of things that are associated on each side of the entity. For example, for a relationship between a Bicycle and Wheel, the cardinality would be 1 bike to 2 wheels.

We also want to encode rules in our data model. A **Rule** is usually a limit, condition, or consequence in the scenarios that isn't inherently captured by the data model.
Some of the most common rule types are:
- **Derived**: a rule that is attached from a piece of data that is separate from its representation (for example, a due date is a property of an entity, but its enforcement is a derived rule).
- **Bound**: a rule that is bound to an entity, property, or relationship. For example, the cardinality of a relationship or a minimum of a numerical property.
- **Conditioned**: a rule that restricts two entities, properties, or relationships together. For example, a student must only be one of not enrolled, on the waitlist, or enrolled in the course.

Rules are generally a precursor to implementation: they are similar to the behaviours we will need to express as methods, routes, and/or validations in our implementation.
<!-- TODO: add examples and pictures for each -->

### Testing Data Models
We need to apply our scenarios to our data model to test if it is actually sufficient for our requirements.
Usually this happens as we are buildling out our data model, but it is worth doing a final sanity check too.
Check the *Given* and *Then* sections of all scenarios: every phrase must appear as something in the model.
If we cannot do this for every scenario, then our data model is insufficient and we need to revise it!
