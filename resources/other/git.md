# <img src="https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png" width="100px" style="vertical-align: bottom"/> Cookbook


All software teams use version control to keep track of and share their technical artifacts. Git is the most commonly used versions control system in use today. While Git is incredibly flexible, it can be challenging to learn to use. Below is a task-oriented list of things you might want to accomplish and a short description of how to accomplish each task. There are a variety of ways to accomplish many of these actions, this description focuses on the simplest common mechanism. The `highlighted text` are commands you can type, but you will need to specify text in `<...>` blocks.

# TOC

* Recipies

 1. [Getting a repo](#clone)
 1. [Receiving work](#pull)
 1. [Adding a file](#add)
 1. [Committing work](#commit)
 1. [Sharing work](#push)
 1. [Listing existing branches](#list)
 1. [Switching to a branch](#switch)
 1. [Moving work into a new branch](#move) 

* [Additional content](#additional)

* [Resources](#resources)

<a name="clone"></a>
## Getting a repo 

Before you can use a repo you need to get a local copy on your machine from the remote server. To do this, you can specify the repo you want checked out.

`git clone git@github.students.cs.ubc.ca:<org>/<repo>.git`

This should work for public repos, but if you are checking out a private repo you may need to configure your username and password.

<a name="pull"></a>
## Receiving work

If there have been updates on your repo (e.g., your teammates have made commits), you can update your local copy with any changes they have shared with the remote server.

`git pull` 

<a name="add"></a>
## Adding a file

Files you create locally on disk need to be explicitly added to Git so they can be tracked. To add a file:

`git add <fileName>`

If you are wondering what files are untracked:

`git status .`

<a name="commit"></a>
## Committing work

After completing work, you need to complete it so the current status of your tracked files can be saved in the repo. To commit the changes you have made to all files at once:

`git commit -a -m "<message>"`

If you just want to commit changes to a single file:

`git commit -m "<message>" <fileName>`

<a name="push"></a>
## Sharing work

So far your commits just exist on your local machine. To share them with others, you will need to upload them to the server:

`git push`

Note: if the server version has been updated since you last received work, you will have to perform a `git pull` before the `git push` will work.

<a name="list"></a>
## Listing existing branch names

Much work in Git takes place on branches. Branches are the right place for _in progress_ development work. When using branches, the main branch is reserved for _completed_ work. This allows multiple people to work independently without overwriting each other's work, although waiting too long between merging a development branch with main increases the chances of merge conflicts. To get a list of branches you can switch to, run:

`git branch -r`

<a name="switch"></a>
## Switching to a branch

If you are in a repo that has not had any changes to it (e.g., no file changes and no commits), you can change cleanly to another branch. If `branchName` exists, you will switch to the branch. If it does not exist, it will be created. Git branch names cannot contain spaces.

`git checkout <branchName>`

<a name="move"></a>
## Moving work into a new branch

If you plan ahead, you can create a new branch before you start new development work with the command below. But if you forget and you have committed work on whatever branch you have checked out in your repo (`main` by default), you may want to move this new work to a new different dev branch. After making some local commits, but before pushing, you can move these commits to a new branch. This can be helpful especially if branch protection is enabled on your repository as you will be unable to `git push` to main in this case.

`git checkout -b <branchName>`

When you try to share this new branch for the first time, you will have to tell your git server what you are doing:

`git push --set-upstream origin <branchName>`

Once this branch is on the git server, you can create a pull request using the GitHub web interface.

---

<a name="additional"></a>
# Additional content

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vRLGZg6A7OvuG-lVngMkQNBkj1V9yOStxGGWtUFUpOXKmTSkBTbU4k_pp8NlXrZlxKnLX1PU3RY58Vm/pub -->

To get started with git you first will have to [download it](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Some quick terminology:

  - A snapshot of your project at a certain point in time is called a _commit_
  - A collection of commits is called a _repository_, or repo for short.
  - When a repo is hosted online somewhere, such as GitHub, that is called that repo’s _remote_.

Below are the essential commands for working with git:

  - `git clone <url>` downloads the repo at the given url into a folder in your current working directory. You can find the URL for a repository by clicking the green "Clone or download" button on the repo’s page. Example: `git clone https://github.com/ubccpsc/310.git` 

  - `git add <file/argument>` stages your changes for commit. After making changes to files in your project, you can stage them (set them to be included in the next commit) by running git add and specifying the files you would like to stage. You have the option to specify single files manually, or use arguments to specify types of files.  Git won’t automatically pay attention to all files in the repo directory, they will have to have been added at some point in the repo history. Examples:

    - Add a single file: `git add myfile.ts`

    - Add all updated tracked files: `git add -u`

  - `git status` displays files that have been staged, modified, etc. as well as information about if your branch is up to date with your remote. You may want to run git status before committing to ensure the files you have added are what you expect (especially if you use `git add -u`).

  - `git commit` actually creates the snapshot of your staged changes and lets you give the snapshot a description, called a commit message. A good commit message is a short, descriptive note about the changes made since the last commit (e.g. “Fix divide by zero exception when getting average”). You can give the message in the same command using the `-m` parameter, otherwise a text editor will launch for you to write your message in. Examples:

    - Commit with message: `git commit -m "Fix divide by zero exception when getting average"`

    - Commit all changes (combines git add -u and git commit into one command): `git commit -a -m "Fix divide by zero exception when getting average"`

  - `git push` sends the commit(s) you've made locally to GitHub. To share changes with your partner (and to see your changes on GitHub) you need to execute this command. 

  - `git pull` gets the changes from GitHub that you don't already have locally. Run this after your partner has run git push.

Lastly, here are some non-essential commands that are good to know:

  - `git log` to view commit history

  - `git checkout <commit/branch>` to change your files to their state in a given commit. Be careful about making any changes when not on the most recent commit. When you go back to your most recent commit, changes you made may be lost if you were working on a commit that isn't the head of a branch.

  - `git diff` to compare currently added files to last commit

  - `git diff <oldCommitId> <newCommitId>` to compare two commits

  - `git reset` to unstage files previously staged with `git add`

  - `git reset --hard` to unstage added files AND undo all changes since last commit. Warning! This means it will change the actual files currently saved on your computer back to the state they were in the last commit you made. Make sure you want to do this.

A quick/concise note on merge conflicts. If git is unable to merge the two branches automatically, it will mark the area where the conflict occurred. It will modify the offending file to look like:

```
<<<<<<< HEAD
// Code from one branch
=======
// Code from the other branch
>>>>>>> branch-a
```
Your job is to pick which version of the code you want (or write a new version if you wish), and then delete the other version(s) and the start/end markers, before finally adding and committing that file. There may be more than one conflict like this per file. WebStorm and VSCode have built-in conflict resolution tools, but it is best to avoid merge conflicts by communicating with your partner and pushing/pulling changes often.

---

<a name="resources"></a>
### Additional Resources

This is just a lightweight resource that looks at the main ways you will probably interact with git during this course. Many more comprehensive resources and interactive tutorials can be found online.

  - [https://www.atlassian.com/git/tutorials/what-is-version-control]()
  - [https://try.github.io/levels/1/challenges/1]()
  - [https://learngitbranching.js.org/]()





