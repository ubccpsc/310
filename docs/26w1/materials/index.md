# Course materials
Software is always growing:we expect to modify it for as long as anyone uses it.
Our units address this problem at different spheres in modern software engineering: in low level code design, high level software architecture, then reaching into the real world of requirements and how the software itself is built.


| Unit | Weeks | Scale | What's different |
| :--- | :--- | :--- | :--- |
| [Unit 1 — Design in the small](unit-01/) | 1–5 | Inside a codebase you own | Every caller is in your diff. Measure a change, name what makes it expensive, repair it safely, make it testable.  |
| [Unit 2 — Layers & interfaces](unit-02/) | 6–7 | At its boundaries | The same discipline at module scale (layers), then at a contract you've published and can no longer move |
| [Unit 3 — Requirements & specification](unit-03/) | 9–11 | Before the code exists | Where the thing you're building comes from, and how to say what it must do precisely enough to check |
| [Unit 4 — Software process](unit-04/) | 12–13 | Across a team | How several people change one codebase without breaking each other, and what has to be automated for that to hold |


## What's in each unit

**[Unit 1 — Design in the small](unit-01/)** · weeks 1–4 ·

The cost of change · measuring a change (magnitude and footprint) · cohesion and connascence ·
refactoring as a discipline · polymorphism and LSP · what makes code testable · seams and dependency
inversion · patterns as named combinations of all of it.

You can see everything and change everything, so a mistake is cheap enough to undo. That's what makes
it the right place to learn the vocabulary.

**[Unit 2 — Layers & interfaces](unit-02/)** · weeks 5–7 ·

Layered architecture · the testing pyramid · API design · evolving a published API.

Apply unit 1's seam discipline to whole categories of responsibility and you get layers. Publish an
interface and you lose the ability to fix your callers at all — the interface stops being a draft,
and only the implementation can move.

**[Unit 3 — Requirements & specification](#)** · weeks 9–11

Where requirements come from · ethics and intellectual property · information security ·
specification and modeling.

Units 1 and 2 handed you a target. This one asks where the target comes from and what bounds it —
because a requirements mistake is priced in everything downstream, not just in refactoring.

**[Unit 4 — Software process](#)** · weeks 12–13

Continuous integration · how teams coordinate · process metrics · GenAI and where the cost moves.

Everything before this you could have done alone. Once several people change one codebase, the
expensive thing is the interference between changes — which shows up in no single diff.
