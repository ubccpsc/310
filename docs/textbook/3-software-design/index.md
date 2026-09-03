---
archetype: "chapter"
weight: 4
title: "Software Design"
---

Software design is a key translational step in the software development process. During design, requirements are transformed into a format that can be implemented directly. More concretely, the input to the design process is a list of requirements and the output is a set of classes, methods, and fields that must be implemented. 

The design process is highly iterative, but can often be thought of as two broad activities:

* **Low Level Design:** While high level design can be thought of as identifying key subsystems, abstractions, and relationships, the low level design process defines the concrete public interfaces, classes, and methods that will be needed to build the system. Design patterns are often applied during the low level design process to ensure the design will be amenable to future evolution.

* **High Level Design:** During high level design the key architecture, abstractions, and relationships required to build the system are identified. This often involves evaluating different ways the system might need to evolve in the future and evaluating the relative merits of alternative architectural decisions. The decisions made in high level design guides the low level design process. Many design principles and properties can also be captured at a high level and broadly influence both high level and low level design.

We went over some core principles of low-level design in our analytical code design unit.
In this unit, we apply those fundamental analyses to larger design patterns and module-level API architecture.
