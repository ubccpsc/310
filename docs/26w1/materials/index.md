# Course materials

One question, asked at growing scale: **what will the next change cost?**

A bridge is finished. Software never is — we expect to modify it for as long as anyone uses it, and
usually by people who weren't there when it was written. So the question that matters isn't *does it
work?* but *what will it cost to change this, and why?*

The course moves outward. Each unit asks that same question at a wider radius, and what changes
between them is how much you still control.

| Unit | Weeks | Scale | What's different |
| :--- | :--- | :--- | :--- |
| [Unit 1 — Design in the small](unit-01/) | 1–5 | Inside a codebase you own | Every caller is in your diff. Measure a change, name what makes it expensive, repair it safely, make it testable — then name the moves as patterns |
| [Unit 2 — Boundaries](unit-02/) | 6–7 | At its boundaries | The same discipline at module scale (layers), then at a contract you've published and can no longer move |
| [Unit 3 — Requirements & specification](unit-03/) | 9–11 | Before the code exists | Where the thing you're building comes from, and how to say what it must do precisely enough to check |
| [Unit 4 — Software process](unit-04/) | 12–13 | Across a team | How several people change one codebase without breaking each other, and what has to be automated for that to hold |

**Week 8** belongs to no unit. It works one change end to end using everything from units 1 and 2,
and doubles as the midterm review.

## What's in each unit

**[Unit 1 — Design in the small](unit-01/)** · weeks 1–5 · nine lectures

The cost of change · measuring a change (magnitude and footprint) · cohesion and connascence ·
refactoring as a discipline · polymorphism and LSP · what makes code testable · seams and dependency
inversion · patterns as named combinations of all of it.

You can see everything and change everything, so a mistake is cheap enough to undo. That's what makes
it the right place to learn the vocabulary.

**[Unit 2 — Boundaries](unit-02/)** · weeks 6–7 · four lectures

Layered architecture · the testing pyramid · API design · evolving a published API.

Apply unit 1's seam discipline to whole categories of responsibility and you get layers. Publish an
interface and you lose the ability to fix your callers at all — the interface stops being a draft,
and only the implementation can move.

**[Unit 3 — Requirements & specification](unit-03/)** · weeks 9–11 · five lectures

Where requirements come from · ethics and intellectual property · information security ·
specification and modeling.

Units 1 and 2 handed you a target. This one asks where the target comes from and what bounds it —
because a requirements mistake is priced in everything downstream, not just in refactoring.

**[Unit 4 — Software process](unit-04/)** · weeks 12–13 · four lectures

CI and integration · how teams coordinate · process metrics · GenAI and where the cost moves.

Everything before this you could have done alone. Once several people change one codebase, the
expensive thing is the interference between changes — which shows up in no single diff.

## How to use these pages

Each unit page carries the **readings** for its lectures, the **learning outcomes** you should be
able to meet, and the **vocabulary** you'll be expected to use precisely — in writing, on the
midterm, and in your project rationale. They're written to be revision surfaces, not just indexes.

**Dates, slides, labs, and deadlines live on the [schedule](../schedule.md).**
