# Deliverable 2: Make it testable

**Due Friday 16 October, 18:00 · individual · submit on GitHub and PrairieLearn**

## Part 1: Localize Query Handling

The registrar is getting tired of writing complex queries of the form `{ "OR": [ {"IS": { "dept": "math" }}, {"IS": {"dept": "hist"}}] }`.
You have decided that you can simplify the query using a new `IN` operator which accepts an SKEY and a list of words that should match exactly.
For example, `{ "IN": { "dept": ["math", "hist"] }}`.

Adding it directly to the current would require editing duplicated logic across `filterSections`,
`filterRooms`, and `Model.searchV2`. Instead:

**1. Extract.** Pull the WHERE/OPTIONS/TRANSFORMATIONS handling currently inline in
`Model.searchV2` (and duplicated between `filterSections`/`filterRooms`) out behind:

```ts
export class QueryValidationError extends Error {}

export interface IQueryEngine<T> {
  filter(where: unknown, data: T[]): T[];
  run(query: unknown, data: T[]): unknown[];
}
```

`run` takes the query and the entities for one domain — sections or rooms, never both — and returns
the rows `Model.searchV2` sends back. `Model.searchV2` may keep only its request-shape checks
(`kind`, `query` presence); everything else must go through `run`.

`filter` is the piece `searchV1` and `searchV2` already share today, both calling `filterSections`/
`filterRooms` directly. `searchSectionsV1` never had `TRANSFORMATIONS`, only ever supported a string
`ORDER`, and reports column-mixing mistakes differently — it doesn't fit `run`'s contract and
shouldn't be forced through it. Have `searchSectionsV1` call `filter` in place of its current
`filterSections`/`filterRooms` call, and leave its own COLUMNS/ORDER handling exactly as it is.

On invalid input, `filter` and `run` throw `QueryValidationError`, with `message` set to exactly the
text that must reach the client (the same strings the inherited suite already checks for — "Unknown
key in COLUMNS", "Cannot mix course_offerings and facilities fields in one query", and so on).
`Model` catches `QueryValidationError` and passes `.message` into the existing `errorBadRequest`
response; anything else thrown is a bug, not a validation failure, and should propagate. Neither
method may signal failure by returning a value — an empty result and a rejected query must not look
the same.

Whether you split projecting out further, how you structure your own internals, whether the class is
generic — your call.

Implement it as `export class QueryEngine<T> implements IQueryEngine<T>` in `src/QueryEngine.ts`.
The class must be constructible with no required arguments (`new QueryEngine()`) — we construct it
directly to grade `run`, without knowing anything else about how you built it.

**2. Add `IN`.** `{ IN: { <SKEY>: string[] } }` matches an entity if its value for `<SKEY>` equals
any string in the array. The array must be non-empty.

**Requirements:**

- The inherited test suite stays green since you're relocating behaviour, not changing it. `IN` is the
  only new behaviour.
- WHERE-handling must leave `filterSections`/`filterRooms` entirely — both `searchSectionsV1` and
  `searchV2` call `filter` instead. `searchV2`'s OPTIONS/TRANSFORMATIONS handling must leave
  `Model`/`App.ts` too, replaced by a call to `run`. `searchSectionsV1`'s own COLUMNS/ORDER handling
  is unaffected.

**Graded on:** the inherited suite still passing, and `IN` working — checked by calling
`IQueryEngine` directly, not only through the HTTP layer.

### Getting started

There are many ways that you can 

1. **Feel the shape of the problem first.** Sketch how you'd add `IN` to `filterSections`/
   `filterRooms` as they stand today. Notice how many places it touches.
2. **Replace the operator chain with a lookup table.** Each operator becomes one entry instead of
   one `if`/`else if` branch:

   ```ts
   type OperatorHandler<T> = (args: unknown, entities: T[]) => T[];

   const handlers: Record<string, OperatorHandler<T>> = {
     NOT: (args, entities) => {
       const inner = dispatch(args, entities); // recurses through the same table
       return entities.filter((e) => !inner.includes(e));
     },
     // AND, OR, LT, GT, EQ, IS: yours
   };
   ```

   `NOT` is shown because it's the smallest combinator and the one idea worth seeing once: a
   combinator calls back into the same table it's registered in. `AND`/`OR` follow the same shape.
3. **Add `IN` as one more entry.** If step 2 is done, this is small. If it isn't, this is where
   you'll feel it.
4. **Move COLUMNS/ORDER/TRANSFORMATIONS out of `Model.searchV2`** into whatever finishes `run`.

## Part 2: Enable Testing with Mocks

When a facilities dataset is uploaded, the system reads building addresses out of an HTML table and
turns each one into coordinates by calling an external geocoding service, inline, with no seam —
nothing outside the call can supply a different implementation, which is why it can't be tested
without a live network.

Extract the geocoding call behind an interface designed around what the caller needs (turning an
address into coordinates), not around today's mechanism (an HTTP request). Provide two
implementations: the real one, and a fake usable in tests. Your interface must state what happens
when geocoding fails — throws, returns nothing, or an explicit failure value — and both
implementations must honour that choice identically.

**Requirements:**

- The inherited suite stays green throughout since you are simply restructuring the code. If you
  notice something behaving wrong, leave it and note it in your PR rather than changing it.
- Your own tests must pass with your wifi turned off.
- Your tests must demonstrate: a building whose address fails to geocode is skipped, and its rooms
  are skipped with it.
- Your tests must also cover the failure contract you decided on for your interface (service
  unreachable, slow, or returning something malformed) — not just the one failure case the original
  spec named.
- Your fake must fail the same way your real implementation does; a fake that always succeeds while
  the real implementation can fail makes your tests meaningless.

<!--
There is a part of InsightUBC that is close to untestable, and you are going to fix that.

You've now worked on this codebase twice: once in D1 with no procedure at all, and now with the
seams and dependency-inversion material from lecture in hand. This deliverable asks you to put that
to use — extract the untestable part behind an interface, get it under test with the network
unplugged, and land the result as a clean, reviewable diff. What's graded is mostly the outcome: do
your tests actually pass without the network, and could a reviewer follow what you did.

You'll close with a short comparison to D1 — not because the process itself is the point, but
because you now have two honest attempts at the same codebase and it's worth noticing what changed.

## The target

When a facilities dataset is uploaded, the system reads building addresses out of an HTML table and
turns each one into coordinates by calling an external geocoding service. Coordinates matter: they
are what makes it possible to ask how far apart two buildings are.

The inherited suite — all **12,146 lines of it** — does exercise that path. Several tests upload a
facilities dataset, and geocoding runs every time. So it is covered, in the sense that somebody would
notice if it stopped working entirely.

What it has no test for is anything *specific*. Not one test isolates geocoding from the zip handling
and HTML parsing around it, and not one test verifies what happens when geocoding **fails** — even
though that behaviour was explicitly required. That second gap is where you're going to start.



## Step 1 — Try to verify a requirement

The team that built this system was handed a specification. Part of it read:

> Response format: `{ lat?: number; lon?: number; error?: string }` (you get either lat/lon or error,
> not both). **Handle failed requests gracefully: if geolocation fails, skip that building and all
> its rooms.**

They implemented it. Find the geocoding call in `App.ts` and you'll see the condition that does it —
coordinates present and no error, or the building never gets added. That is the requirement, working
as specified.

**Nothing in 12,146 lines of tests demonstrates that it works.** Nobody can show that a building
with an unresolvable address is skipped, or that its rooms go with it. The requirement is met, and
unverifiable.

**Your task, time-boxed to 30 minutes.** Write a test proving that a failed geocoding lookup skips
the building — **without changing any production code.** Set a timer.

Some of you will get something to work. It's a reasonable challenge and there is a route through.
The interesting question isn't whether you manage it; it's what it costs you and where it stops. So
when the timer goes, write down:

- What did you try, and how far did you get?
- What did the attempt cost — in setup, in runtime, in things you had to build to make it possible?
- **What can you still not reach?** The service failing for one address is one way this breaks.
  What about the service being unreachable, timing out, or returning a body with neither
  coordinates nor an error? Which of those can you trigger, and which can't you?

That last question is the one that matters, and it's the one step 3 answers.

Worth knowing before you start: the geocoding service is now slow — after the traffic it took during
D1 the provider throttled us, and every address costs a second or two — so a dataset upload takes
minutes, and running it repeatedly is unbearable. That isn't a bug you can fix by trying harder. It's
a property of a design that reaches the network from the middle of a parsing routine.

Do this step first. Everything after it is an answer to something you found here, and it doesn't land
if you skip ahead.

## Step 2 — Know your safety net

You are about to restructure code you didn't write. Before you do, work out what will tell you if
you break it.

You already have the answer: **the inherited suite is your characterization suite.** Somebody else
wrote it, it records what this system currently does, and it is green right now. Find the tests that
actually exercise the path you're about to change — a facilities dataset upload will do it — and run
them. That's your baseline, and it must still be green when you're finished.

Notice what it can and can't tell you. Those tests go through the whole upload: reading the zip,
parsing HTML, geocoding, building the response. So when one goes red after your refactor, it tells
you *something* broke, not *what*. That's the difference between a net and a diagnosis, and it's a
large part of why the next step is worth doing.

If you spot behaviour that looks wrong while you're reading — an address that fails silently, a
building quietly dropped — **leave it alone** and note it in your pull request. You are not fixing
behaviour in this deliverable. A refactor that also fixes a bug is a refactor nobody can review.

## Step 3 — Decide where to cut

Now the actual decision, and it's yours to make.

A **seam** is a place where you can change what code does without editing it in that place. The
geocoding call has no seam: it happens directly, inline, with nothing outside able to supply a
different implementation. That is why step 1 failed.

So you're going to put one in. But *where* is genuinely open, and the options give you different
systems:

- **Around the call itself.** Extract only the network request. Smallest change, and the surrounding
  method keeps every other job it currently has.
- **Around the capability.** Extract "turn an address into coordinates" — the request, the response
  handling, and the decision about what a failure means. Larger change, but the thing you extract
  makes sense on its own.
- **Wider still.** The method holding this call also parses HTML and validates buildings. You could
  separate those concerns while you're in there.

Each is defensible; the third is also the one most likely to run away with your week. **Write down
which you chose and why before you start cutting** — you'll be asked, and deciding afterwards isn't
the same thing.

What that looks like:

> **Thin.** *"I extracted the geocoding into its own class to improve modularity and separation of
> concerns."*
>
> **Better.** *"I cut around the capability rather than just the fetch call. Extracting only the
> request would have left the decision about what a failure means inside `extractBuildings`, and that
> decision is the behaviour I most want to test. I didn't go wider and pull the HTML parsing out too:
> that's a second change, I couldn't verify both at once, and I'd rather ship one thing I can defend.
> Noting it as debt."*

The difference isn't length or polish. The first names a pattern. The second names a **reason**, a
**rejected alternative**, and a **thing deliberately not done**.

## Step 4 — Cut it

Work incrementally enough that you're never more than a step or two from a green suite, and commit
when it's green. You don't need to narrate every micro-move — what's graded is the result: a clean
diff, and tests that pass with the network unplugged.

**One thing worth doing early: get your fake working as soon as the seam exists.** Your loop is
slow only while the real service is still in the path — once a fake can stand in for it, running
your tests costs milliseconds instead of minutes, and everything remaining gets cheap to check.
Notice when that happens; it's the most direct evidence you'll get this term that this is worth
doing.

Define the interface around what the calling code *needs*, not around how geocoding happens to work
today.

**The interface is the graded design decision.** Consider these two:

```ts
interface IGeocoder { httpGet(url: string): Promise<Response>; }
interface IGeocoder { locate(address: string): Promise<Coordinates>; }
```

They are not equivalent. One of them forces every substitute — including your test fake — to pretend
to be a web request. The other can be satisfied by a lookup table in three lines. Ask yourself the
test that separates them: **could you implement this a completely different way?** If your interface
would make an in-memory implementation awkward, it is describing a mechanism rather than a need.

Get this right and something later in the term will be easy. Get it wrong and it will be expensive,
in a way you'll be able to measure.

**Your interface also has to say what happens when things go wrong, and here you're on your own.**
The original specification covered exactly one failure: an address the service can't resolve, which
gets skipped. It said nothing about the service being unreachable, timing out, or returning a body
with neither coordinates nor an error — and if you go looking, you'll find the current code doesn't
really decide either. Those cases reject out of the middle of a parsing routine and become whatever
the caller happens to do with them.

So decide, and write it down as part of the interface:

- When the service can't be reached, does your interface **throw**, return **nothing**, or return
  something that represents failure explicitly?
- Is "this address doesn't resolve" the same kind of answer as "the service is down"? They mean very
  different things to a caller.
- Whatever you choose, **your fake has to behave the same way.** A fake that always succeeds while the
  real implementation throws is a false claim about your own contract, and your tests will pass while
  telling you nothing.

There is no right answer here and we are not looking for a particular one. We're looking for a
decision you made deliberately, stated in the interface, and honoured by both implementations.

**Your tests must run with the network unplugged.** That's the bar, and it's the one thing about the
seam we check mechanically — how you achieve it is your design decision.

## Step 5 — Write the tests you couldn't write

Now write the tests that step 1 couldn't reach.

Start with the specified behaviour: a building whose address doesn't resolve is skipped, and its
rooms go with it. That's the requirement nobody could demonstrate. Demonstrate it.

Then test the contract **you** decided on in step 4 — what your interface promises when the service is
unreachable, or slow, or returns something malformed. These aren't tests of the original
specification, because the original specification never said. They're tests of the design decision you
just made, which is exactly why they're worth having: a contract nobody tests is a contract nobody is
keeping.

Your fake is a **claim about the real thing**. If the real service returns an error for an unknown
address and your fake always succeeds, your tests will pass while telling you nothing. Make the fake
behave like the real implementation, including when the real implementation fails.

## Step 6 — Compare it with D1

A few sentences. You've now made a change to this system twice — once with nothing to go on but
your own judgment, once with lecture material and an interface in hand.

What was actually different this time — not "did I follow a procedure," but what changed in how
confident you were that it worked, how fast you could tell if something broke, or what a reviewer
could get out of your diff.

## What to submit

### In your repository

**1. The seam**, with the real implementation and a fake for tests.

**2. Your tests**, which must pass with the network unplugged.

**3. A clean commit history for the extraction.** The suite should be green at points along the way;
we're not grading the sequence itself, just the result.

**4. Three separate pull requests, in order: the search warm-up, then structure, then tests — each
merged by you.** The warm-up is its own small, self-contained fix. The extraction lands on its own
after that, with the inherited suite still green to prove behaviour didn't move. Your new tests
follow. Mixing structure and tests together means nobody — including you — can tell whether the
refactor was safe or whether the tests were written to fit whatever it turned into.

There's no review step at this stage, and nobody is waiting to approve any of these before you
merge them — only what's on `main` when you submit gets graded. A pull request left open, however
good, is work nobody will see.

**5. A pull request description a reviewer can use.** Someone you haven't met yet is going to read
this eventually: in D3 you'll be paired up, and your partner reviews this diff — after the fact, to
help decide whose repository the two of you carry forward, not before you're allowed to merge it
now. Write the description for them, but don't wait for them.

### In PrairieLearn

**6. Links to your three pull requests** — search warm-up, structure, tests.

**7. Your step 1 report.** What you tried, how far you got, what it cost, and which failure modes
you still couldn't reach.

**8. Where you cut, and what your interface hides.** Which of step 3's options you took and why you
rejected the others. Then paste the interface. What does a caller learn about how geocoding actually
works? What could you swap underneath it without any caller noticing?

**9. Your riskiest step.** Which move was most likely to break something silently, and how did you
know it hadn't?

> **Thin.** *"Moving the fetch call was the riskiest part but the tests passed."*
>
> **Better.** *"Threading the geocoder through to the callers. The compiler caught most of it, but I'd
> made the parameter optional so nothing forced the call sites to pass one — anything I missed would
> have quietly kept using the real service. I found the gaps by making it required, seeing what broke,
> then deciding whether optional was worth keeping."*

The question is *how you knew*, not which step felt scariest. "The tests passed" is only an answer if
you can say what those tests would have caught.

**10. Step 6, the comparison with D1.**

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded | The search warm-up works; your suite passes with the network unavailable; the inherited suites still pass |
| Judgment | The step 1 report, where you cut and what the interface hides, your riskiest step, and the D1 comparison |

Note the network-unavailable check specifically. It doesn't check that you built a *particular*
seam — it checks that you built one at all, by taking the network away and seeing whether your tests
still work. What shape it takes is your decision, and that part is graded by a human.

## On the amount of writing

You may get the code working in an afternoon and then spend longer explaining it. That is deliberate,
and it's worth knowing why rather than resenting it.

The code you write here is worth very little on its own — it's one seam in one system you'll never
touch again after December. What transfers is the judgment: knowing where to cut, knowing what a
step is testing, knowing that a contract has to say what happens when things fail. None of that is
visible in a diff. The only way anyone can tell whether you have it — including you — is if you say
it out loud.

There's a second reason. The midterm asks the same kind of question this deliverable does: here is
some code, what's expensive about it, what would you change, why that and not the alternative. Every
answer you write here is practice for that, done while you have the code in front of you and time to
think. It is considerably cheaper than trying to acquire the same fluency the week before the exam.

## One way to overdo this

The failure mode for this deliverable is **injecting everything.** Having just learned that seams
exist, it is tempting to put an interface in front of every collaborator you can find, and ship a
design with more indirection than the one you started with.

A seam costs something: a file to open, a name to learn, one more hop between reading code and
knowing what runs. Add one when an axis is actually failing and you have a reason to care — you need
to run without the network, or a second implementation genuinely exists, or the dependency is likely
to change for reasons outside your control.

Question 8 asks what your interface hides. If the honest answer is "nothing, really," you have found
a seam that didn't need to exist.

-->