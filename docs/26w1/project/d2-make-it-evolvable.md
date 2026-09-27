# Deliverable 2

**Due Friday 16 October, 18:00 · individual · submit on GitHub and PrairieLearn**

The registrar is getting tired of writing complex queries of the form `{ "OR": [ {"IS": { "dept": "math" }}, {"IS": {"dept": "hist"}}] }`.
As a solution, we want to allow users to query using a new `IN` operator which accepts an sfield and a list of strings that records must match exactly (no wildcard matching).
For example, `{ "IN": { "dept": ["math", "hist"] }}` selects all sections whose `dept` is exactly `"math"` or `"hist"`.

As you will see, adding this feature directly to the current code would require editing duplicated logic across `filterSections` and `filterRooms`.
Instead of adding to the duplication, you are first going to refactor the two functions so you can implement the `IN` operator in exactly one location.

**Note:** This deliverable is meant to be completed in order, across three PrairieLearn assessments that are all due at the deadline above.
First complete DELIV2.1 (Section 1, Pre-Analysis), since it will help guide your refactor. Then strengthen the test suite, do the refactor, and complete DELIV2.2 (Section 2). Finally, implement `IN` and complete DELIV2.3 (Section 3).

## 1. Pre-Analysis

Trace `Model.searchV2` and how it calls `filterSections` and `filterRooms`.

Submit in DELIV2.1:

1. **How similar are these methods?** Generate a diff file that shows the differences in code between `filterSections` and `filterRooms`, then describe: of the lines marked as different, what exactly in each line is different? To generate the diff:
   1. Copy the whole `filterSections` function (from `function filterSections(` to its closing `}`) into a new file `sections.ts`, and the whole `filterRooms` function into `rooms.ts`.
   2. From the directory containing those files, run `git diff --no-index --output=filter-refactor.diff sections.ts rooms.ts`. Lines starting with `-` are only in `filterSections`, and lines starting with `+` are only in `filterRooms`.
   3. Commit `filter-refactor.diff` to the root of your repo (you can delete `sections.ts` and `rooms.ts`).
2. **How would you implement `IN`?** Briefly describe the changes you would need to make to implement `IN` as is (without refactoring).
3. **What type of coupling is this?** Describe the coupling between `filterSections` and `filterRooms` in terms of Degree, Locality, Connascence, and type (implicit/explicit) with a brief justification.
4. **Should you refactor first?** Compare and contrast two options: implementing `IN` directly (as in 1.2) versus refactoring first. What *risks* and *difficulties* does each option carry, both now and for future changes?

## 2. Refactor

Now that you have a good idea of the problem, you want to apply a refactoring so you don't have to duplicate the implementation work of `IN`.
Using the diff file from your pre-analysis (1.1), you should have specifics on what makes the methods different (and what is the same between them).
Your job here is to actually carry out the refactor.
You may choose how you will centralize the logic, as long as it meets these requirements:

1. **One filter function.** `filterSections` and `filterRooms` are replaced by a single function that evaluates a `WHERE` clause for both rooms and sections. Every search (including the v1 search endpoint) uses this one function.
2. **A common interface.** Declare an interface (or abstract class) that *both* `Room` and `Section` explicitly `implements` (or `extends`). It must have at least 2 methods, chosen from your analysis in 1.1: the things that differ between `filterSections` and `filterRooms` should become methods that each class implements in its own way.
3. **The filter function depends on the interface, not the classes (DIP).** The filter function should work with records only through your interface; it should not refer to `Room` or `Section` directly.

Keep the class names `Room` and `Section` (you may move them to other files), and keep `createApp` exported from `src/App.ts` and callable as `createApp({ datadir })`.

Submit in DELIV2.2:

1. **Strengthened tests.** The existing tests are your safety net for this refactor. However, only one existing test (`Test 25v`) checks that a comparison operator (`LT`, `GT`, `EQ`, or `IS`) in `WHERE` rejects a key from the *other* kind of dataset. Before you start refactoring:
   - Add tests similar to `Test 25v` that cover each comparison operator for both kinds of dataset. Commit them to `main` (directly or through a pull request) so that your refactoring pull request itself does not touch `test/`. Submit a link to the commit or pull request that added them.
   - Briefly explain what your refactor could have broken without these tests failing.
2. **A link to a merged pull request** that contains your refactoring and nothing else. If you choose to move methods or files around first (e.g. to help readability), do so in *separate* commits within this pull request, before the commits that change the filter logic. This pull request must not modify anything in `test/`, and must not contain any code for the `IN` operator.
3. **Justification:** why did you choose the common interface that you did?
4. **Implications:** Your refactored filter function is now used by both the v1 and v2 search endpoints. What will this mean for the v1 search once you implement `IN`? Briefly explain whether you think this is a problem, and why.

## 3. Implement `IN`

The syntax is `{ "IN": { <sfield>: string[] } }`, and `IN` behaves as follows:

- A record matches if its value for `<sfield>` is exactly equal (case-sensitive) to at least one string in the array. Duplicate strings in the array are allowed.
- Unlike `IS`, `IN` does no wildcard matching: `*` is treated as an ordinary character.
- `IN` works on every sfield of both `course_offerings` and `facilities`, and can be nested inside `AND`, `OR`, and `NOT` like any other filter.
- The search responds with `400 Bad Request`, error `"Invalid query"`, and message `"IN must be an object with one sfield and a non-empty array of strings"` when:
  - the value of `IN` is not an object, or does not have exactly one key;
  - the key is not a valid sfield (e.g., an unknown key or an mfield);
  - the value for the key is not an array, is an empty array, or contains a non-string element.
- If the key is a valid sfield of the *other* kind of dataset (e.g., `name` in a `course_offerings` query), the search responds with `400 Bad Request` and the existing message `"Cannot mix course_offerings and facilities fields in one query"`, exactly as for the other filters.

Submit in DELIV2.3:

1. **A link to a merged pull request** that contains your implementation, tests, and documentation for `IN` and nothing else. Merge this pull request only *after* your refactoring pull request (2.2).
   - **Tests:** include test cases for each behaviour above. Your tests must exercise the HTTP API (`POST /api/v2/search` using `supertest`, as in the existing tests) rather than calling internal functions directly, so that they test the behaviour users see.
   - **Documentation:** update the `POST /api/v2/search` description in `openapi.yml` (the v1 search does not need to change):
     - add `IN` to the query grammar (EBNF);
     - briefly document how `IN` operates, including that it does not support wildcards;
     - add the new `IN` error message to the `400` response's list of messages.
2. **Reflection:** Looking back at your predictions in 1.2 and 1.4, was the refactor worth it? Compare how much work implementing `IN` took with how much work the refactor took. Did anything turn out easier or harder than you expected? Would your answer change depending on how often the query language is likely to change in the future?

## Grading

This deliverable has both autograded and manually graded components: 40% autograded and 60% manually graded.

- **Autograded (40%).** Every commit you push to the `main` branch of your repo is automatically graded, and your highest-scoring commit before the deadline is used as your final grade. To request feedback on a commit, enter the following in the commit comment: `@310-bot #d2`. Be sure to read the full details of the [autograder](./autotest.md). In particular, note that the number of times you can request feedback is limited each day.

  The autograder checks that `IN` behaves as specified in Section 3, that your refactor meets Section 2 requirements 2 and 3, and that `openapi.yml` documents `IN` in the query grammar and error messages. It also deducts marks if your changes break existing search behaviour. For the refactor and documentation checks, the feedback tells you specifically what is missing.

- **Manually graded (60%).** Your answers on PrairieLearn (DELIV2.1, DELIV2.2, and DELIV2.3) and the other deliverables above will be graded by the TAs after the deadline.
