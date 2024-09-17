# Pull Requests Cookbook

In collaborative software projects, in order for code to be accepted into the codebase, it typically needs to be developed in and assessed through a process. For this project (and for many others) this happens through opening a **pull request**, and undergoing **code review** by your collaborator(s).

## Opening a Pull Request
A pull request contains the commits that you wish to check in to the codebase, and serves as a forum to discuss the changes, give feedback, and iterate until the changes are ready. Ideally, a pull request will contain the changes for exactly one purpose, whether that purpose is a feature, a bug fix, additional tests for a function, or documentation.

### How to open a pull request
Github has great documentation on [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#about-pull-requests) and [how to create them](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request), and [how to request a review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review)!

### How to write a pull request
A well-structured PR guarantees clarity, completeness, and key congruence with project goals, hence quality collaboration. Efficiently writing PR means one's code will be understood, reviewed well, and integrated with ease into the code base. A great PR must be clear, concise, and comprehensive enough to bring context to your collaborators. A Pull Request Template generally provides guidelines on how to submit PRs by prompting contributors to describe the kind of change, the motives behind it, the tests conducted, and the focus of attention. These formats enhance peer review quality and are especially helpful for inexperienced developers in collaborative software projects.

#### Template

```
# Pull Request Template

## Issue Reference
Link to the relevant issue number. **Example:** "Addresses # (Insert Issue number here)"

---

## What?
**Concise description** of the change made. **Example:** "Implemented backend API for dataset retrieval."

---

## Why?
**Reason for the change**. **Example:** "This completes the required functionality for the dataset management system."

---

## How?
**Brief technical explanation** of the change. **Example:** "Refactored the API service to handle dataset retrieval with caching to improve performance."

---

## Type of Change (choose one)

- [ ] 🐛 Bug fix (addresses a defect)
- [ ] ✨ Feature (adds new functionality)
- [ ] 🧹 Chore (refactor, cleanup, documentation, etc.)
- [ ] ⚠️ Breaking change (incompatible with an existing interface)
- [ ] ✅ Test (adds or updates tests)

---

## Testing
List any automated tests added and provide a summary of test results or screenshots/logs, if applicable.  

---

## Points of Emphasis (Optional)
Highlight any specific areas where you would like focused feedback from reviewers. **Example:** "Please focus feedback on the caching implementation and API response handling."

---

## Checklist
- [ ] Code builds successfully (`yarn build`)
- [ ] Code is formatted correctly (`yarn prettier:fix`)
- [ ] Tests pass (`yarn test`)
- [ ] PR description aligns with code changes
- [ ] Self-review completed (optional but recommended)
- [ ] Documentation updated, if required

```

#### Example 1: Feature Implementation & Refactor
```
# Pull Request Template

## Issue Reference
Addresses #3 

---

## What?
Implemented `Filter` and `Query` data models:
- **Filter Model:** Added a data model for `Filter`, including various filter types (e.g., `IsFilter`, `GtFilter`) organized in a recursive tree structure.
- **Query Model:** Added a data model for `Query`, supporting JSON input parsing and section filtering through the `applyQuery` function.
- **Helper Functionality:** Introduced helper functions in `Section.ts` to retrieve specific section fields via enumerations.

---

## Why?
This change adds essential functionality to support filtering and querying of sections, completing the core logic for data filtering and manipulation in the backend.

---

## How?
- Refactored the `Filter` and `Query` models to work with a tree-based structure for complex filtering operations.
- Added unit tests to ensure the accuracy of the filtering and querying logic.
- Integrated this functionality with existing section fields and helper methods.

---

## Type of Change (choose one)

- [ ] 🐛 Bug fix (addresses a defect)
- [x] ✨ Feature (adds new functionality)
- [x] 🧹 Chore (refactor, cleanup, documentation, etc.)
- [x] ✅ Test (adds or updates tests)

---

## Testing
Tests added for `Filter` and `Query` models in the following files:
- `Filter.spec.ts`: Comprehensive unit tests for each filter type, including edge cases (e.g., wildcard support).
- `Query.spec.ts`: Unit tests for query construction and validation logic.
- Tests have full coverage and pass successfully.

---

## Points of Emphasis (Optional)
Please focus on:
- The recursive structure of the `Filter` class and its handling of complex filter conditions.
- The performance of the `applyQuery` method, particularly with larger datasets.

---

## Checklist
- [x] Code builds successfully (`yarn build`)
- [x] Code is formatted correctly (`yarn prettier:fix`)
- [x] Tests pass (`yarn test`)
- [x] PR description aligns with code changes
- [x] Self-review completed (optional but recommended)
- [ ] Documentation updated, if required

---

### Notes:
This implementation does not yet include the `performQuery` method; that will be added in a future PR.
```

#### Example 2: Query and Section Generation Fixes


```
# Pull Request Template

## Issue Reference
Addresses #16

---

## What?
Implemented the `performQuery` method, integrated the Query data model with the Database class, fixed the section generation logic, and enhanced the ordering query tests.

---

## Why?
To complete the integration of query functionality and address issue #16, ensuring the correct generation and ordering of sections.

---

## How?
Refactored the `performQuery` method to utilize the Query data model, retrieve datasets from the Database, and apply the query logic to sections. Adjusted the section generation logic, including casting fields like `Year` and `Uuid`, and validated specific fields for proper query results.

---

## Type of Change (choose one)

- [x] 🐛 Bug fix (addresses a defect)
- [x] ✨ Feature (adds new functionality)
- [x] 🧹 Chore (refactor, cleanup, documentation, etc.)
- [x] ✅ Test (adds or updates tests)
- [ ] ⚠️ Breaking change (incompatible with an existing interface)

---

## Testing
Updated integration tests to verify the ordering of query results. Added validation for `Year` and `Uuid` fields in generated sections and ran all tests to ensure functionality aligns with the specification. The performance of the tests is approaching the 10-second timeout limit, requiring monitoring.

---

## Points of Emphasis (Optional)
Please focus on the section generation logic and performance impacts due to the additional `_pair.zip_` operation during tests. The changes to the ordering logic for sections using unique columns should also be reviewed.

---

## Checklist
- [x] Code builds successfully (`yarn build`)
- [x] Code is formatted correctly (`yarn prettier:fix`)
- [x] Tests pass (`yarn test`)
- [x] PR description aligns with code changes
- [x] Self-review completed (optional but recommended)
- [x] Documentation updated, if required
```



## Code Review
Code review is a two-way street that serves two primary purposes:

1. **Maintaining a high standard of code:** While linters, other static analysis tools, and automated testing help uphold a standard, higher level quality factors like design, readability, and composability are opinionated and require collaborators to weigh in. Code review serves to manually ensure any accepted code is top-notch!
2. **Knowledge sharing:**  Code review is a great learning opportunity for both the reviewer and reviewee. A reviewer gets to learn about (potentially) new parts of the codebase and new implementation tricks, while a reviewee receives invaluable feedback about their code, and maybe even some alternative techniques they could use to solve the problem at hand.

### How to do a code review
Lots of literature exists online, but we will point you to Google's guidance:

* [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
* [How to write your code review comments](https://google.github.io/eng-practices/review/reviewer/comments.html)
* [How to respond to your code review comments](https://google.github.io/eng-practices/review/reviewer/pushback.html)

These serve as a general guide, so you should adapt and use what works best for you and your collaborators.

Once again, Github has great documentation on [how to view the proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request), and [how to leave a comment in your code review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/commenting-on-a-pull-request)!
