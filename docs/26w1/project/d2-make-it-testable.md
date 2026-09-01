<!--
PER-TERM NOTES — 2026W1. Re-check every item before publishing.

DATES
  Due Fri 16 Oct, 18:00. Must land AFTER the seams/dependency-inversion lecture (wk 4) — step 3
  is the first time students meet the concept, and the whole struggle-then-procedure structure
  collapses if it's taught earlier. Pairs form in the Oct 16-22 lab block, immediately after.

BASE REPO — verified against project_team133, 2026W1
  Target: geocoding, a bare fetch() at App.ts:1077, inside an anonymous arrow inside a
  Promise.all inside `private async extractBuildings(table)` (App.ts:1040). URL prefix is a
  module const `api_pre` at App.ts:774. Response type `CoordResponseFormat {lat?, lon?, error?}`
  at App.ts:768.
  Why this target: there is no object to inject — it's a bare fetch with no seam of any kind,
  buried three layers deep in HTML parsing, so reaching it in a test means running a whole zip
  upload. Extracting it requires identifying the capability first, which is the actual lesson.
  THE SKIP-ON-FAILURE BEHAVIOUR IS SPECIFIED, NOT A BUG. The original spec said "if geolocation
  fails, skip that building and all its rooms." Do not frame it as a defect — the point is that a
  correctly-implemented requirement cannot be demonstrated, which is a better argument for
  testability than bug-hunting is.
  Step 1 is reachable-but-expensive, not impossible: the service 404s on an unknown address, so a
  crafted zip with a bogus address triggers the skip path end-to-end. Reward that, don't penalise
  it. It costs a fixture plus a slow full upload, exercises the whole pipeline rather than the
  decision, and reaches exactly ONE failure mode. Service-down, timeout, and malformed-response
  still require a seam. Grade the "what can you still not reach" answer.
  CORRECTED: the inherited suite DOES exercise this path — it uploads campus.zip with
  kind:"facilities" (85 refs in App.spec.ts), so geocoding runs on every suite run. What's true is
  that nothing ISOLATES it and nothing names it. Step 2 relies on that distinction; don't restore
  the earlier "zero tests" claim.
  CONSEQUENCE: `yarn test` hits the live geocoding service, ~60 calls per campus upload, several
  uploads per run. See RATE LIMIT below — this is unresolved.
  NOTE: api_pre is team-specific (.../project_team133/). Decide whether the course geocoding
  service accepts any path segment or whether this needs rewriting before distribution.

MUTATION TESTING
  Stryker. No config exists in the base repo yet — that is setup work. It MUST be scoped to the
  extracted module; running it over a 2,489-line App.ts against a 12,187-line suite is impractical.
  Taught as tool use in Lab 4 (Oct 2-8), which lands before this deadline. If labs move, check
  that ordering — students must not meet Stryker for the first time here.
  UNVERIFIED: whether the inherited suite genuinely has low mutation detection on the paths
  students will touch. D2's step 5 assumes it does. MEASURE THIS EARLY; if detection is already
  high, the mutant set must be degraded, and that is the one place hand-seeding is unavoidable.

SLOW GEOCODER — the pressure instrument, introduced between D1 and D2
  From D2 onward the course geocoding service adds ~1-2s of latency per request. Narrative for
  students: after D1's traffic the provider throttled us. This is what makes step 1 fail for real.
  LATENCY, NOT A HARD LIMIT, and the distinction matters. A ~100/hr quota would make the INHERITED
  SUITE unrunnable — it uploads campus.zip repeatedly, ~60 geocode calls each, plausibly hundreds
  per `yarn test`. Students would be blocked in D1, weeks before they know what a seam is, with no
  way to fix it. Latency gives identical pressure (one campus upload ~1-2 min, a full suite run
  intolerable to repeat) and CANNOT block anyone, so there are no unfair failures and no appeals.
  Keep a generous hard limit underneath purely as an abuse backstop, set where no honest student
  reaches it.
  D1 must stay fast. The whole point is that the pressure arrives after they've felt the problem.
  Autograder always uses a stub, never the live service.

SUBMISSION MECHANICS
  Same as D1: PrairieLearn is the single surface, PR link as an answer field. This is the diff
  their D3 partner reviews, which is worth telling students — it is a real reader, not a
  hypothetical one.
-->

# Deliverable 2 — Make it testable

**Due Friday 16 October, 18:00 · individual · submit on GitHub and PrairieLearn**

Details will be released after the D1 deadline.

<!--
In D1 you changed this system however seemed right to you. This time you get a procedure.

There is a part of InsightUBC that is close to untestable, and you are going to fix that.

But the fix isn't really the point. **The point is that you'll have worked on this codebase twice, in
two different ways.**

In D1 you had no procedure, so you did the natural thing: found the places that looked relevant and
edited them until it worked, discovering the shape of the change as you went. It got you there. What
it doesn't do is scale — not to a codebase too large to hold in your head, not to a team where
somebody else has to review what you did, and not to a deadline where "it works now" has to survive
the next change.

This time you'll work the way it's done when it's done well: **form a hypothesis about what needs to
change, make the smallest change that would tell you whether you're right, and check before going
further.** Same system, same person, two ways of working.

At the end you'll be asked which bought you what. That question is only answerable because you've now
done both.

## The target

When a facilities dataset is uploaded, the system reads building addresses out of an HTML table and
turns each one into coordinates by calling an external geocoding service. Coordinates matter: they
are what makes it possible to ask how far apart two buildings are.

The inherited suite — all **12,187 lines of it** — does exercise that path. Several tests upload a
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

**Nothing in 12,187 lines of tests demonstrates that it works.** Nobody can show that a building
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

Now the procedure. It starts with a decision, and the decision is yours.

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

## Step 4 — Cut it, in steps that stay green

Do it in moves small enough that you are never more than one revert away from safety. After each one,
run the suite from step 2. Commit when it's green.

**Small isn't the same as purposeful.** Each move should be testing something you believe — *"I think
this call can be replaced by an interface method without anything else noticing"* — and the suite
run is how you find out whether you were right. A sequence of tiny aimless edits is just a slow
version of the same tangle. Know what each step is for before you make it.

That means the extraction is a *sequence*, not an event: introduce the interface, move the code behind
it, thread it through the callers, supply the real implementation at the edge, then write the fake.
Some of those steps leave the system working; some don't compile until the next one lands. Knowing
which is which is the skill.

**Yes, this is slower than just doing it.** Especially now, with every geocoding call costing a
second or two — running that suite is not free, and you will be tempted to batch five changes together
and check once at the end. Resist it. The value of one commit at a time is that you always know what
your next goal is, and you never end up lost in a tangle of half-finished edits with no idea which one
broke things. It feels laborious the first few times and becomes second nature, which is the whole
reason to practise it on something this size.

**One piece of strategy: get your fake working early.** Your loop is slow only while the real service
is still in the path. As soon as the seam exists and a fake can go in, running your tests costs
milliseconds instead of minutes — and every remaining step in your sequence gets cheap. The refactor
pays for itself before you've even finished it. Notice when that happens; it's the most direct
evidence you'll get this term that this stuff is worth doing.

**Your commit history is the evidence.** Not a reconstruction written afterwards — the actual
sequence, with messages that say what each step did.

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

## Step 6 — Find out whether your tests detect anything

**You don't write the mutants.** Stryker generates them — the tool you used in Lab 4. You run it and
read the report.

A mutant is a small automatic change to your production code: an operator flipped, a boundary moved,
a return value swapped. If your tests are worth anything, they fail. If they pass, the mutant
*survived*, and you have found a gap in your suite rather than a bug in your code.

Run it scoped to the code you extracted, not the whole repository — mutation testing is slow, and
the geocoding seam is what you actually changed.

Report your before-and-after numbers and pick two survivors to discuss. For each: is this a real gap
you should close, or is the mutant **equivalent** — a change that doesn't actually alter behaviour,
so no test could possibly catch it? Identifying one equivalent mutant correctly is worth more here
than killing three trivial ones.

**We grade the delta and your reasoning about it, never the raw score.**

## Step 7 — Compare it with D1

Half a page. In D1 you had no procedure and made a change; here you had one and made another.

- What did the procedure buy you that your D1 approach didn't?
- What did it cost?
- Was there a point where you wanted to skip a step? Which one, and what would have happened?

This is not a question about whether the procedure is good. It's a question about two attempts you made
yourself, five weeks apart.

## What to submit

### In your repository

**1. The seam**, with the real implementation and a fake for tests.

**2. Your tests**, which must pass with the network unplugged.

**3. A commit sequence showing the extraction in steps**, with the suite green at each point it could
be.

**4. Separate pull requests, in order: structure, then tests.** The extraction lands on its own,
with the inherited suite still green to prove behaviour didn't move. Your new tests follow. Mixing
them means nobody — including you — can tell whether the refactor was safe or whether the tests were
written to fit whatever it turned into.

**5. A pull request description a reviewer can use.** Someone you haven't met yet is going to read
this: in D3 you'll be paired up, and your partner reviews this diff to help decide whose repository
the two of you carry forward. Write it for them.

### In PrairieLearn

**6. Your step 1 report.** What you tried, how far you got, what it cost, and which failure modes
you still couldn't reach.

**7. Where you cut, and what your interface hides.** Which of step 3's options you took and why you
rejected the others. Then paste the interface: Paste the interface. Then: what does a caller learn about
how geocoding actually works? What could you swap underneath it without any caller noticing?

**8. Your riskiest step.** Which move in your sequence was most likely to break something silently,
and how did you know it hadn't?

> **Thin.** *"Moving the fetch call was the riskiest part but the tests passed."*
>
> **Better.** *"Threading the geocoder through to the callers. The compiler caught most of it, but I'd
> made the parameter optional so nothing forced the call sites to pass one — anything I missed would
> have quietly kept using the real service. I found the gaps by making it required, seeing what broke,
> then deciding whether optional was worth keeping."*

The question is *how you knew*, not which step felt scariest. "The tests passed" is only an answer if
you can say what those tests would have caught.

**9. Mutation results** — before and after, plus your two survivors and what you concluded.

**10. Step 7, the comparison with D1.**

## How this is graded

| Assessed by | What it covers |
| :--- | :--- |
| Autograded | Your suite passes with the network unavailable; mutants run against it; the inherited suites still pass |
| Judgment | The step 1 report, where you cut and what the interface hides, your riskiest step, your mutation reasoning, and the D1 comparison |

Note the first autograded item. It doesn't check that you built a *particular* seam — it checks that
you built one at all, by taking the network away and seeing whether your tests still work. What shape
it takes is your decision, and that part is graded by a human.

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

Question 7 asks what your interface hides. If the honest answer is "nothing, really," you have found
a seam that didn't need to exist.

-->