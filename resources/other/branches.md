# Git Branching

Chances are, this is what your commit history looked like for your C0 repository.

![Working on a single branch](./images/branch-main.png)

<sub><sub>This is a list of commits over time. Each dot is a single commit.</sub></sub>

Now let's try that for C1.
```
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'git @github.students.cs.ubc.ca:CPSC310-20XXW-T0/project_team000.git'
```

Oh! That's right; for C1 the `main` branch is protected, meaning you can't push to it directly.
So naturally you and your partner make a branch named `develop` and just work off of that.

![Working on a single development branch](./images/branch-develop.png)

You get two commits in before

```
<<<<<<< HEAD
function ourProcess(): boolean {
=======
function ourProcess(seed: number): void {
>>>>>>> develop
```

A _merge conflict_! You and your partner, both in active development, have stepped on each other's toes.

Annoying as they are, you really should consider yourself lucky. You've pulled changes that your partner made,
and can see exactly how your changes don't work with your partner's changes.
It would be much worse if the side effects of some function hidden away in your `Util` class changed while you were none-the-wiser. It's unlikely you were reading every commit that your partner made!

This calls for a slightly more sophisticated Git branching model.

## (Modified) Git Flow

If you didn't already guess, we think you should use more than one branch. Branching has a few key advantages:
#### You won't break _the_ build.
Everyone relies on the `main` branch, and it always needs to be working. If the shared branch stops working, this impedes the velocity of your collaborators, as they can't test their work nor isolate their issues.
Under our Git flow model, your partner should always be confident in pulling the latest features from the `main` branch, and you have a place to experiment and break things without affecting others.
#### _Your_ build won't break.
Working on a single branch, when you try to push you're forced to pull the latest changes from the origin. After the pull, your code stops working! Suddenly you're pulled away from your original task that you were half-way through and instead you're just trying to integrate someone else's changes.
Working on your _own_ branch you have the safety to iterate in isolation, and only pull in your partner's features when you want them.

### The Life Cycle of a Branch

#### Create

![Creating a branch](./images/branch-create.png)

A branch typically exists tied to one feature or issue. So let's say we are working on the issue
> \#12 Implement listDatasets

Let's create a new branch named `feature/list-datasets`
```
$ git checkout main
$ git pull                              # Make sure we're up to date with main
$ git checkout -b feature/list-datasets # Create a new branch with a descriptive name
```

#### Iterate

![Working on a branch](./images/branch-iterate.png)

Make your changes and commit them to your branch as you did to `main` in C0, only now on `feature/list-datasets`.
Don't forget to make [meaningful commit messages](./writing_useful_commit_messages.md)!

```
$ git add src
$ git commit -m "#12 Implemented listDatasets stub"
$ git push --set-upstream origin feature/list-datasets # Only done the first time
```

#### Pull Request (Iterate More)

![Making a Pull Request](./images/branch-pull-request.png)

Once your feature is complete, go to GitHub, click Pull Requests, and create a new pull request for your partner to [review](./code_review.md).

> Implement listDatasets #17

The pull request page is a space for you and your partner to discuss the changes that have been made and suggest further changes required before an approval.
It is normal for this to require more changes! That doesn't mean your code was bad the first time. It just means it's even better with two sets of eyes on it.

#### Merge

![Merging a branch](./images/branch-merge.png)

After you have an approval from your partner and all your tests pass, merge your pull request.

> Merge pull request

Done! Now don't forget to delete the branch on GitHub and on your machine.
> Delete branch

```
$ git branch -d feature/list-datasets
```

### Branches in Concert

When you have more than one branch in active development, you would expect `main` to get updated with new features while you are still working on your own branch.
This requires one extra step for making sure your features play nice with the other ones.

#### Integrate

![Pulling from main](./images/branch-integrate.png)

After the **Iterate** step but before the **Pull Request** step, merge the new commits on `main` into your branch.
This gives you a chance to test your feature's integration with anything your partner (or you on another branch) has added to `main`.
This also allows you to build, lint, and test your code _exactly_ as it will look like on `main`.

```
$ git checkout feature/list-datasets
$ git pull origin main
```
Then of course commit and push the merge to `feature/list-datasets`.

### Notes

Note on branch chaos: having too many branches is a code smell. Having all your features distributed across too many branches is a perfect recipe for being stuck in a very long period of integration and debugging. Features should build on each other as much as possible,
so try to keep no more than three active branches between you and your partner, and don't forget to delete  your branches after they merge.

Note on remote branches: sometimes you'll want to checkout a branch that isn't in your local reposity, but exists on the remote. For example, when you're in the middle of reviewing your partner's code and want to run the tests on your machine. This command will copy to your local reposity and check out the remote branch `hotfix/remove-dataset`.
```
$ git checkout --track origin/hotfix/remove-dataset
```


## Further Reading
- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

---
[![](../readings/figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Braxton Hall](https://braxtonhall.ca/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
