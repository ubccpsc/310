# Unit 3 — Requirements & specification

**Weeks 9–11.** *(Draft — outcomes and vocabulary to follow.)*

Units 1 and 2 assumed you already knew what to build. Every exercise handed you a target and asked
what the change would cost. This unit removes that assumption and asks the prior question: **where
does the target come from, and what are you allowed to build?**

That question has a cost-of-change answer too, and it's the most expensive one in the course. A
design mistake is priced in refactoring. A requirements mistake is priced in everything downstream
of it — you build the wrong thing correctly, and no amount of clean design saves you. So the unit
starts with the decision that governs all the others: **how much do you commit to up front?**

Then it works outward through the constraints. What you're *permitted* to build is bounded before
you write anything: by ethics, by licensing, by what the system must guarantee about the data it
holds. Only once those are on the table does it become worth saying precisely what the thing does —
precisely enough that someone else could check it.

## Lectures

| Lecture | What it answers | Read before |
| :--- | :--- | :--- |
| Where requirements come from | How much do you decide up front — and what does deciding early cost? | [Software Process](/textbook/8-unplaced/process/) · [User Stories](/textbook/8-unplaced/process/user-stories/) |
| Ethics & IP | Who does this affect, and what are you permitted to build with? | [Ethics](/textbook/8-unplaced/ethics-security/ethics/) · [Intellectual Property](/textbook/8-unplaced/ethics-security/ip/) |
| Information security | What must the system guarantee, and to whom? | [Information Security](/textbook/8-unplaced/ethics-security/security/) |
| Specification & modeling | How do you say what it must do precisely enough to check? | [Specifications](/textbook/8-unplaced/process/specifications/) · [Technical Representations](/textbook/9-deprecated/representations/) |
| *Specification is Right* | Can you tell a good specification from a plausible one? | — |

Slides are posted on the [schedule](../../schedule.md) as we go.

## The shape of the unit

**Commit late, but commit.** The waterfall-versus-agile argument is usually taught as a history
lesson. It isn't one — it's a live disagreement about *when* a requirement stops being negotiable,
and both answers cost something. Fixing requirements early makes them expensive to change; leaving
them open makes everything downstream provisional. You'll be asked which cost you're buying.

**Constraints are requirements you didn't choose.** Ethics, licensing, and security aren't a
compliance appendix bolted on at the end. They bound the solution space before design starts, which
is exactly why they sit here rather than in a final-week wrap-up. A library you can't legally ship
and a guarantee you can't actually make are both requirements failures, discovered late.

**Precision is the deliverable.** A specification isn't a longer description — it's a description
someone can disagree with. The last two lectures are about getting to that, and then about telling
the difference between a specification that constrains behaviour and one that merely sounds like it
does.

## Where this is going

You now know what to build and what bounds it. [Unit 4](../unit-04/) asks the last question left:
what happens when it isn't just you building it.
