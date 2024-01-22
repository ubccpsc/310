# Pull Requests Cookbook

In collaborative software projects, in order for code to be accepted into the codebase, it typically needs to be developed in and assessed through a process. For this project (and for many others) this happens through opening a **pull request**, and undergoing **code review** by your collaborator(s).

## Opening a Pull Request
A pull request contains the commits that you wish to check in to the codebase, and serves as a forum to discuss the changes, give feedback, and iterate until the changes are ready. Ideally, a pull request will contain the changes for exactly one purpose, whether that purpose is a feature, a bug fix, additional tests for a function, or documentation.

### How to open a pull request
Github has great documentation on [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#about-pull-requests) and [how to create them](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request), and [how to request a review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review)!

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
