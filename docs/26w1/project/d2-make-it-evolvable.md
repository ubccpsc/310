# Deliverable 2: Housekeeping

**Due Friday 16 October, 18:00 · individual · submit on GitHub and PrairieLearn**


The registrar is getting tired of writing complex queries of the form `{ "OR": [ {"IS": { "dept": "math" }}, {"IS": {"dept": "hist"}}] }`.
As a solution, we want to allow users to query using a new `IN` operator which accepts an SKEY and a list of strings that records must exactly match.
For example, `{ "IN": { "dept": ["math", "hist"] }}` selects all sections whose `dept` is exactly `"math"` or `"hist"`.
The list provided must be non-empty and contain only strings.

As you will see, adding this feature directly to the current would require editing duplicated logic across `filterSections` and `filterRooms`.
Instead of worsening this code smell, you are going to do a bit of housekeeping by refactoring these first so you can implement the `IN` operator exactly once.

**1. Pre-Analysis**
Trace `Model.searchV2` and how it calls `filterSections` and `filterRooms`.

Your deliverables:
1. **How similar are these methods?** Generate a diff file that shows the differences in code between `filterSections` and `filterRooms` using the `diff` (MacOS or Linux) or `fc` command (Windows), then describe: of the lines marked as different, what exactly in each line is different?
2. **How would you implement `IN`?** Briefly describe the changes you would need to implement `IN` as is (without refactoring).
3. **What type of coupling is this?** Describe the coupling between `filterSections` and `filterRooms` in terms of Degree, Locality, Connascence and type (implicit/explicit) and a brief justification. What *risks* and *difficulties* does this cause?

**2. Refactor**
Now that you have a good idea of the problem, you want to apply a refactoring so you don't have to duplicate the implementation work of `IN`.
Using the diff file from your pre-analysis (1.1), you should have specifics on what makes the methods different (and what is the same between them).
*You may choose how to actually implement the centralization of the logic as long as it:

1. Results in only one `filterX` function that is called for both `Rooms` and `Sections`
2. Uses polymorphism abiding by the DIP such that `Room` and `Section` implement a common interface. This common interface must contain at least 2 shared methods, based on the analysis of common/differing code from 1.1.

Your deliverables:
1. **A link to a merged pull request** that contains your refactoring and nothing else. If you chose to move methods or files around beforehand (e.g. to help readability), please do so in *separate* commits to this one!
2. **Evidence of safety** that the unmodified tests pass *before and after* your refactoring.
3. **Justification:** why did you choose the common interface that you did?


**3. Implement `IN`.** `{ IN: { <SKEY>: string[] } }` matches an entity if its value for `<SKEY>` equals
any string in the array. The array must be non-empty and contain only strings.

Your deliverables:

1. **A link to a merged pull request** that contains your implementation and tests for `IN` and nothing else. You must include test cases for each behaviour and for both sections and rooms.
2. **Justification:** How much work was this implementation step compared to the refactoring? Then, discuss the short and long term tradeoffs in terms of *Risks* and *Difficulties*. If you had to modify the query language in the future (e.g. by adding another operation) is it easier in the refactored version or the old version? How often would you expect to do this?
