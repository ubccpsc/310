# Unit 2 — Layers & interfaces

**Weeks 6–7.** Applying design principles to modules and systems instead of classes.

[Unit 1](../unit-01/) worked inside a codebase you own completely. Every interface you built —
every seam, every pattern — had a caller you could still reach: if the shape turned out wrong, you
refactored it and fixed every call site in the same pull request.

This unit takes that away, in two steps. First at **module scale**: define boundaries by examining the seams of abstraction we according to our analysis techniques from Unit 1.
Then at the **system boundary**: publish an API,
and the callers become teams you'll never meet, running code you can't see, on a schedule you don't
control.

## Lectures

| Lecture | What it answers | Readings |
| :--- | :--- | :--- |
| Patterns: Adapter & Composite | What does polymorphism buy at a boundary you don't own? | [Design Patterns](/textbook/3-software-design/design-patterns/) |
| Patterns: Factory & Decorator | What does delegation buy once it goes through an interface? | [Design Patterns](/textbook/3-software-design/design-patterns/) |
| API change severity & versioning | How do you change a promise without breaking it? | [Safe Versioning](/textbook/3-software-design/versioning/) |
| API design | What is an API, and what do you lose the moment it's published? | [APIs](/textbook/3-software-design/apis/) · [REST Architecture](/textbook/1-construction-basics/rest/) |
| The testing pyramid | Given real layers, which one should a test actually run through? | [Testing Pyramid](/textbook/3-software-design/testing-pyramid/) |
| Layered architecture | What do you get when the same moves are applied everywhere? | [Design Principles](/textbook/2-analytical-code-design/principles/) |

Slides are posted on the [schedule](../../schedule.md) as we go.

## By the end of this unit you can

**Compose the moves**

- Explain a design pattern as a named combination of principles you already know, rather than as a
  recipe
- Given unfamiliar code, identify the Unit 1 problems and update the code to address them.


**Choose where to test**

- Characterise a test as unit, integration, or end-to-end, and justify the label by what's real and
  what's doubled
- Compose a test suite that balances automatability with completeness by choosing the correct relative amount of each test type.

**Design an API**

- Identify the differences between an API and an internal interface
- Apply cohesion, coupling, and testability principles at the API boundary to design a usable and maintainable API.

**Change it without breaking anyone**

- Given a code change to an API, identify how severe it is
- Encode change severity in terms of semantic versioning
- Implement techniques to reduce change severity

**Design in layers**

- Apply the dependency inversion principle to define an appropriate layer in software.
