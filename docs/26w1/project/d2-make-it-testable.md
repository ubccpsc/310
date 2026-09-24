# Deliverable 2: Housekeeping

**Due Friday 16 October, 18:00 · individual · submit on GitHub and PrairieLearn**

## Part 1: Localize Query Handling

The registrar is getting tired of writing complex queries of the form `{ "OR": [ {"IS": { "dept": "math" }}, {"IS": {"dept": "hist"}}] }`.
As a solution, we want to allow users to query using a new `IN` operator which accepts an SKEY and a list of strings that records must exactly match.
For example, `{ "IN": { "dept": ["math", "hist"] }}` selects all sections whose `dept` is exactly `"math"` or `"hist"`.
The list provided must be non-empty and contain only strings.

As you will see, adding this feature directly to the current would require editing duplicated logic across `filterSections` and `filterRooms`.
Instead of worsening this code smell, you are going to do a bit of housekeeping by refactoring these first so you can implement the `IN` operator exactly once.

**1. Pre-Analysis**
Trace `Model.searchV2` and how it calls `filterSections` and `filterRooms`.

Your deliverables:
1. **How similar are these methods?** Generate a diff file that shows the differences in code between `filterSections` and `filterRooms` using the `diff` (MacOS or Linux) or `fc` command (Windows), then describe.
2. **How would you implement `IN`?** Briefly describe the changes you would need to implement `IN` as is (without refactoring).
3. **What type of coupling is this?** Describe the coupling between `filterSections` and `filterRooms` in terms of Degree, Locality, Connascence and type (implicit/explicit) and a brief justification. What *risks* and *difficulties* does this cause?

**2. Refactor**
Now that you have a good idea of the problem, you want to apply a refactoring so you don't have to duplicate the implementation work of `IN`.
Using the diff file from your pre-analysis, you should have an idea of what makes the methods different (and what is the same across them).
*You may choose how to actually implement the centralization of the logic as long as it removes one of the `filterSections`/`filterRooms` functions AND you use polymorphism such that `Room` and `Section` implement a common interface that contains at least 2 shared methods.*

Your deliverables:
1. **A commit hash** that contains your refactoring and nothing else. If you chose to move methods or files around beforehand (e.g. to help readability), please do so in *separate* commits to this one!
2. **Evidence of safety** that the unmodified tests pass *before and after* your refactoring.
3. **Justification:** why did you choose the common interface that you did?


**3. Implement `IN`.** `{ IN: { <SKEY>: string[] } }` matches an entity if its value for `<SKEY>` equals
any string in the array. The array must be non-empty and contain only strings.

Your deliverables:

1. **A commit hash** that contains your implementation and tests for `IN` and nothing else. You must include test cases for each behaviour and for both sections and rooms.
2. **Justification:** How much work was this implementation step compared to the refactoring? Then, discuss the short and long term tradeoffs in terms of *Risks* and *Difficulties*. If you had to modify the query language in the future (e.g. by adding another operation) is it easier in the refactored version or the old version? How often would you expect to do this?


## Part 2: Enable Testing with Fakes

When a facilities dataset is uploaded, the system reads building addresses out of an HTML table and
turns each one into coordinates by calling an external geocoding service.
This violates some of our testability principles because we are not able to test some important behaviours.
In this phase, you will refactor your code to allow us to test these behaviours in addition to writing the tests themselves.
The behaviours you need to write tests for:
1. If the geolocation service is unreachable, then the building should be skipped. (wifi off)
2. If the geolocation service is reachable, then the building should be populated with the lat/lon. (wifi off)
3. A test if the geolocation service is online. (wifi on)

These sound simple, but we have no way to actually test these--at least as the code is currently written!

**Requirements:**
1. You must have one test for each of the behaviours specified above.
2. For the wifi-off tests, you must implement a test double in the form of a *fake* that ascribes to an interface you designed called `IGeoLocator`.
3. `IGeoLocator` may look however you want as long as it allows you to test these behaviours.
4. This design allows you to use DIP to inject either a real `GeoLocator` (at runtime) or a fake `FakeGeoLocator` (at test time), by providing it as a part of the `AppConfig` type. You will need to implement both of these concrete classes.

```typescript
/**
 * Configuration options for the application.
 */
export type AppConfig = {
	readonly datadir: string; // existing
	geolocator: IGeoLocator;  // new!
};
```


**Deliverables:**
1. **Pre-Analysis:** Why are these behaviours hard to test? Use testability terminology like controllability, observability, and/or automatability.
2. **A link** to the commit hash, merged pull request, or code **for each** of the requirements above.
3. **Post-Analysis:** How did using DIP affect the testability concerns from the pre-analysis? How many classes did you have to touch to do this? Is this an acceptable amount? If yes, justify in terms of future cost of change (risk/difficulty). If not, propose a high-level refactoring that would help.
