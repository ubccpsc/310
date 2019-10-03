# Git Tutorial

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vRLGZg6A7OvuG-lVngMkQNBkj1V9yOStxGGWtUFUpOXKmTSkBTbU4k_pp8NlXrZlxKnLX1PU3RY58Vm/pub -->

Git is a form of version control. The purpose of version control is to help manage changes to a project as it grows over time, and aid coordinations on teams working on the same source code. To get started with git you first will have to [download it](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Some quick terminology:
  - A snapshot of your project at a certain point in time is called a _commit_
  - A collection of commits is called a _repository_, or repo for short.
  - When a repo is hosted online somewhere, such as GitHub, that is called that repo’s _remote_.

Now, here are the essential commands for working with git:
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

For more git resources, here are two interactive tutorials:
  - https://www.atlassian.com/git/tutorials/what-is-version-control
  - https://try.github.io/levels/1/challenges/1


Git also has branches which help organize code changes. Atlassian's [tutorial](https://www.atlassian.com/git/tutorials/using-branches) does an execellent job of describing how branches works however, it does not cover handle merge conflicts (i.e. code that has been changed in both the HEAD commit and the merging commit). If git is unable to merge the two branches automatically, it will mark the area where the conflict occurred. It will modify the offending file to look like:
```
<<<<<<< HEAD
// Code from one branch
=======
// Code from the other branch
>>>>>>> branch-a
```
Your job is to pick which version of the code you want (or write a new version if you wish), and then delete the other version(s) and the start/end markers. There may be more than one conflict like this per file. WebStorm has a built-in conflict resolution tool, but it is best to avoid merge conflicts by communicating with your partner and pushing/pulling changes often.
