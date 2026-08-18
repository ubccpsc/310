# Course materials

One question, asked at growing scale: **what will the next change cost?**

A bridge is finished. Software never is — we expect to modify it for as long as anyone uses it, and
usually by people who weren't there when it was written. So the question that matters isn't *does it
work?* but *what will it cost to change this, and why?*

The course moves outward. Each part asks that same question at a wider radius, and what changes
between them is how much you still control.

| Part | Weeks | Scale | What's different |
| :--- | :--- | :--- | :--- |
| [Part 1 — Design in the small](part-01/) | 1–5 | Inside a codebase you own | Every caller is in your diff. Measure a change, name what makes it expensive, repair it safely, make it testable — then name the moves as patterns |
| [Part 2 — Boundaries](part-02/) | 6–7 | At its boundaries | The same discipline at module scale (layers), then at a contract you've published and can no longer move |
| [Part 3 — Requirements & specification](part-03/) | 9–11 | Before the code exists | Where the thing you're building comes from, and how to say what it must do precisely enough to check |
| [Part 4 — Process, CI & DevOps](part-04/) | 12–13 | Across a team | How several people change one codebase without breaking each other, and what has to be automated for that to hold |

**Week 8** belongs to no part. It works one change end to end using everything from parts 1 and 2,
and doubles as the midterm review.

## What's in each part

**[Part 1 — Design in the small](part-01/)** · weeks 1–5 · nine lectures

The cost of change · measuring a change (magnitude and footprint) · cohesion and connascence ·
refactoring as a discipline · polymorphism and LSP · what makes code testable · seams and dependency
inversion · patterns as named combinations of all of it.

You can see everything and change everything, so a mistake is cheap enough to undo. That's what makes
it the right place to learn the vocabulary.

**[Part 2 — Boundaries](part-02/)** · weeks 6–7 · four lectures

Layered architecture · the testing pyramid · API design · evolving a published API.

Apply part 1's seam discipline to whole categories of responsibility and you get layers. Publish an
interface and you lose the ability to fix your callers at all — the interface stops being a draft,
and only the implementation can move.

**[Part 3 — Requirements & specification](part-03/)** · weeks 9–11 · *in progress*

**[Part 4 — Process, CI & DevOps](part-04/)** · weeks 12–13 · *in progress*

## How to use these pages

Each part page carries the **readings** for its lectures, the **learning outcomes** you should be
able to meet, and the **vocabulary** you'll be expected to use precisely — in writing, on the
midterm, and in your project rationale. They're written to be revision surfaces, not just indexes.

**Dates, slides, labs, and deadlines live on the [schedule](../schedule.md).**
