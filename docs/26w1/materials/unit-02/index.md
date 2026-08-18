# Unit 2 — Layers & interfaces

**Weeks 6–7.** What happens to the same discipline when the boundaries get big enough to have names
and consequences.

[Unit 1](../unit-01/) worked inside a codebase you own completely. Every interface you built —
every seam, every pattern — had a caller you could still reach: if the shape turned out wrong, you
refactored it and fixed every call site in the same pull request.

This unit takes that away, in two steps. First at **module scale**: apply week 4's seam discipline
consistently, to whole categories of responsibility instead of one collaborator, and you get layers —
which is what the courses slice of the project repo has been the whole time, and finally explains why
week 1's two slices carried such different prices. Then at the **system boundary**: publish an API,
and the callers become teams you'll never meet, running code you can't see, on a schedule you don't
control.

That last step is the one that changes the rules. **The interface stops being a draft.** From then on
only the implementation can move — and a layer boundary is exactly what lets it.

## Lectures

| Lecture | What it answers | Read before |
| :--- | :--- | :--- |
| Layered architecture | What do you get when the same moves are applied everywhere? | [High-Level Design](/textbook/high-level-design/) |
| The testing pyramid | Given real layers, which one should a test actually run through? | [Software Testing](/textbook/testing/) |
| API design | What is an API, and what do you lose the moment it's published? | [APIs](/textbook/high-level-design/apis/) · [REST Architecture](/textbook/construction/rest/) |
| Evolving a published API | How do you change a promise without breaking it? | [APIs](/textbook/high-level-design/apis/) *(versioning only)* |

Slides are posted on the [schedule](../../schedule.md) as we go.

## By the end of this unit you can

**Design in layers**

- Define a layer, and say what makes a group of classes belong to the same one
- State the dependency rule, and explain it as dependency inversion applied repeatedly rather than
  as a separate idea
- Read a layered slice and say which layer a given piece of logic *belongs* in, versus where it
  currently lives
- Use Adapter, Factory, Decorator, and Strategy to implement a layer boundary, not just to describe
  one
- Redraw a layered stack as a hexagon — name the ports the business logic defines and the adapters
  that satisfy them from outside — and say why that's the same dependency rule, not a different one

**Choose where to test**

- Characterise a test as unit, integration, or end-to-end, and justify the label by what's real and
  what's doubled
- Say why the pyramid is a *pyramid* — why there are necessarily more of one kind than another —
  rather than an arbitrary ratio
- Choose the right level for a specific behaviour, and say what a wrong choice would cost you on the
  testability axes
- Recognise that a suite with the right shape may still prove nothing

**Design an API**

- Say what makes an API different from an internal interface — specifically, what you lose the
  ability to do once it's published
- Apply cohesion at the boundary: say what makes a resource focused on one thing, and name the smell
  when it isn't
- Decide what an API exposes and in what shape, using information hiding and connascence — and say
  why connascence of type or weaker is the target at a boundary
- Reframe controllability and observability as properties of a good *API*, not just a good test

**Change it without breaking anyone**

- Classify a change to an API as breaking or non-breaking, and justify it from the consumer's side
- Explain why a version bump is an LSP claim, and what it means for that claim to be false
- Name at least three techniques for shipping a change without breaking existing consumers
- Explain why breaking changes are avoided even when they'd produce a cleaner design — as a
  footprint argument rather than an unexamined rule

## Vocabulary

layer · dependency rule · hexagonal architecture · port · adapter · unit test · integration test ·
end-to-end test · testing pyramid · API · published contract · resource · information hiding ·
backward compatibility · breaking change · semantic versioning (major, minor, patch) · Hyrum's Law ·
deprecation

## Where this is going

Unit 1 gave you the tools; this unit scaled them up to a boundary you can't take back. What
neither unit asked is where the requirements came from in the first place, or how a team changes
one codebase without breaking each other. That's the second half.
