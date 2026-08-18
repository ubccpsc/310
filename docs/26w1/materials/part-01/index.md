# Part 1 — Design in the small

**Weeks 1–5.** Reading code you didn't write, naming what's wrong with it, and changing it without
breaking it.

A bridge is finished. Software never is — we expect to modify it for as long as anyone uses it, and
usually by people who weren't there when it was written. So the question that matters isn't *does it
work?* but **what will the next change cost?**

This part answers that at the smallest scale, where every caller is still in your diff. You can
see everything, you can change everything, and you can fix every call site in the same pull request.
That's a luxury — part 2 takes it away — but it's the right place to learn the vocabulary, because
here a mistake is cheap enough to undo.

It makes cost of change **measurable** first, then does something about it.

## Lectures

| Lecture | What it answers | Read before |
| :--- | :--- | :--- |
| The cost of change | Why does change cost anything? | *TBD* |
| Measuring a change | How big was that change — and which dimension actually hurts? | *TBD* |
| Cohesion & connascence | What belongs together, and what kind of agreement makes change hard? | [Design Principles](/textbook/high-level-design/principles/) *(cohesion only)* |
| Refactoring as a discipline | How do I change it safely? | [Refactoring](/textbook/construction/refactoring/) |
| Polymorphism & LSP | When is it safe to substitute one thing for another? | *TBD* |
| What makes code testable | Why does code resist testing? | [Testability](/textbook/testing/testability/) |
| Seams & dependency inversion | How do I get control of something I don't construct? | *TBD* |
| Patterns: Adapter & Composite | What does polymorphism buy at a boundary you don't own? | [Design Patterns](/textbook/low-level-design/design-patterns/) |
| Patterns: Factory & Decorator | What does delegation buy once it goes through an interface? | [Design Patterns](/textbook/low-level-design/design-patterns/) |

Slides are posted on the [schedule](../../schedule.md) as we go.

## By the end of this part you can

**Measure a change**

- Describe a change in terms of **magnitude** and **footprint**, given a diff, and say why footprint
  is the expensive dimension
- Draw a dependency graph for a slice of a system, where an edge means "these must change together"
- Name the footprint smells — shotgun surgery, divergent change, feature envy, onion surgery — and
  point at an instance of each in real code

**Name what you found**

- Use the three axes of coupling — strength, degree, locality — to describe how two pieces of code
  are related
- Identify five kinds of connascence (name, type, value, position, algorithm) in unfamiliar code,
  and say how to weaken one
- Say whether a module is cohesive, and what it would take to make it more so

**Change it safely**

- State what "behaviour-preserving" actually requires, and why it's the hard word in the definition
  of refactoring
- Write a characterization test, and explain why encoding a known bug in one is the correct move
- Use delegation to fix a cohesion problem, and say what moved and why
- Convert a switch-on-type into polymorphism, and say which coupling axis that improved
- State LSP as a contract rule — *require no more, promise no less* — and name four ways a subtype
  can violate it
- Explain technical debt in terms of cost of change, and why an incomplete migration can be the
  right call if it's recorded

**Make it testable**

- Given a class and a test, determine its **controllability**, **observability**, and
  **isolatability**
- Fix an observability failure by returning a value instead of logging it, and an isolatability
  failure by extracting the unit you actually want to test
- Define a **seam**, and say why an interface with one implementation constructed inline isn't one
- Reverse a dependency by introducing an interface, and say which side should own it
- Design an interface around the *need* rather than the *mechanism*
- Name the kinds of test double, say which testability axis each buys back, and say what a test
  proves once a collaborator has been replaced — and what it doesn't
- Say when **not** to add a seam

**Compose the moves**

- Explain a design pattern as a named combination of principles you already know, rather than as a
  recipe
- Given a pattern, identify the specific conditional or duplicated check that disappears from
  calling code
- Recognise a pattern used for its own sake, and name the failure mode that creates

## Vocabulary

You'll be expected to use these precisely, in writing, on the midterm and in your project rationale.

cost of change · magnitude · footprint · dependency graph · shotgun surgery · divergent change ·
feature envy · onion surgery · coupling (strength, degree, locality) · connascence (name, type,
value, position, algorithm) · cohesion · refactoring · behaviour-preserving · characterization test ·
technical debt · delegation · polymorphism · apparent vs. actual type · Liskov Substitution
Principle · precondition · postcondition · invariant · ravioli code · controllability ·
observability · isolatability · seam · dependency inversion · constructor injection · test double ·
stub · mock · over-isolation · Single Responsibility Principle · Open/Closed Principle · Adapter ·
Composite · Factory · Decorator

## Where this is going

By the end of week 5 you can diagnose a design, repair it safely, and test the result — all inside a
codebase you own completely. [Part 2](../part-02/) asks what changes when you don't.
