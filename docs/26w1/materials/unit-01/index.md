# Unit 1 — Design in the small

**Weeks 1–5.** Reading code you didn't write, naming what's wrong with it, and changing it without
breaking it.

This unit explores how to measure cost of change, identify code elements that contribute to it, and how to evolve code to make change easier.

## Lectures

| Lecture | What it answers | Readings |
| :--- | :--- | :--- |
| The cost of change | Why does change cost anything? | [What is Software Engineering](/textbook/0-introduction/) · [Analytical Code Design](/textbook/2-analytical-code-design/) |
| Measuring a change | How big was that change — and which dimension actually hurts? | [Cost of Change](/textbook/2-analytical-code-design/cost-of-change/)|
| Cohesion & connascence | What belongs together, and what kind of agreement makes change hard? | [Change Difficulty](/textbook/2-analytical-code-design/change-difficulty/) |
| Refactoring as a discipline | How do I change it safely? | [Refactoring](/textbook/2-analytical-code-design/refactoring/) |
| Polymorphism & LSP | When is it safe to substitute one thing for another? | [Design Principles](/textbook/2-analytical-code-design/principles/) *(SOLID)* |
| What makes code testable | Why does code resist testing? | [Testability](/textbook/2-analytical-code-design/testability/) |
| Test doubles & dependency inversion | How do I test something I didn't construct? | [Testability](/textbook/2-analytical-code-design/testability/) · [Design Principles](/textbook/2-analytical-code-design/principles/) *(SOLID)* |

Slides are posted on the [schedule](../../schedule.md) as we go.

## By the end of this unit you can

**Measure a change**

- Describe a change in terms of **magnitude** and **footprint**, given a diff, and say why footprint
  is the expensive dimension
- Identify code smells in real code — scattered changes, divergent changes, feature envy

**Name what you found**

- Identify the factors that determine how cohesive code is
- Use the three axes of coupling — strength, degree, locality — to describe how two pieces of code
  are related and how that affects cost of change
- Identify five kinds of connascence (name, type, value, position, algorithm) in unfamiliar code 

**Make it testable**

- Given a class and a test, determine its **controllability** and **observability**.
- Apply dependency inversion to enable test doules (mocks and fakes)
- Adapt code to be able to easily use mocks and fakes to address testability concerns

**Safely evolve code**

- Use a meticulous process to minimize errors when evolving code
- Articulate how testing enables this process
