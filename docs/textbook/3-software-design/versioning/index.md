---
weight: 2
title: "Safe Versioning"
---

Up to this point, we have talked about how to design code in a way that is easy to modify: but what happens if we have code that we *cannot* modify?
Once you have released an API, clients will start using it and you will be beholden to its promised functionality and may not be able to change it in the way that you want to.
This is why the preious chapter (API design) is so important: if we design our APIs is a way that fits our clients needs by having high cohesion with their needs and exposes functionality in a way that has low coupling, then we will more easily be able to make changes without affecting our agreement.
However, software is always evolving, and inevitably an API will need to change over time.
This chapter is about how to determine the severity of a change in terms of how it will impact an API agreement, and how to actually implement a change to minimize the client impact.

## Change Severity

Consider the following API and client code:

```typescript
// API Code
class Library {
    checkout(book: Book, duration: number) {...}
}
// Client Code
const days = 7;
const vpl = new Library();
vpl.checkout(prideAndPrejudice, days);
```

and the following premise: we want the client to instead be allowed to specify `duration` in terms of weeks, days, and hours instead of just as days.

### Major changes
One possible solution is to replace `duration` to a `Duration` type (`{weeks: number, days: number, hours: number}`).
This would break all of our clients' code at compile time (since it no longer typechecks).
We call this type of change a major or *breaking change*:

```typescript
// API Code
class Library {
    checkout(book: Book, duration: Duration) {...}
}
// Client Code
const days = 7;
const vpl = new Library();
vpl.checkout(prideAndPrejudice, days); // Breaks!
```

There are other ways to make a breaking change. For example, we could change the behaviour of `checkout` without changing its signature by internatlly treating `duration` as a number of `weeks` instead of the original meaning (`days`).
This is an even worse way to make this change, since our clients will not even know until they run their code!
In general, we want to avoid making breaking changes to avoid forcing our clients from having to repeatedly change their code to accommodate our poor engineering choices!


### Minor changes
We can make this `duration` change without forcing our clients to change their code by preserving backwards compatibility:

```typescript
// API Code
class Library {
    checkout(book: Book, duration: number | Duration) {...}
}
// Client Code
const days = 7;
const vpl = new Library();
vpl.checkout(prideAndPrejudice, days); // Still works!!
vpl.checkout(farenheit451, {weeks: 1, days: 3, hours: 0}); // Also works!
```

This way, our clients can continue using the old version, OR they can adopt the new version. Either way, the functionality is preserved.
This type of change to our API is called a *minor change*, since it adds new functionality in a backwards compatible way.
Clients can choose to opt into the new functionality or continue without any required code updates.
Minor changes can also include functionality that is enabled by default so long as it does not force the client to change their code, such as minor performance optimizations and new methods or exposed functionality.
Here are some other ways to implement the change in backwards compatible ways.
By introducing a new method:

```typescript
// API Code
class Library {
    checkout(book: Book, duration: number) {...}
    checkoutSpecific(book: Book, duration: Duration) {...}
}
```

or by introducing a new parameter with a default:
```typescript
// API Code
class Library {
    checkout(book: Book, duration: number, durationType: string = "days") {...}
}
```

### Patch changes
Patch changes are also backwards compatible changes, but are for smaller updates such as minor defect fixes or optimizations.
For example, if `checkout` was initially throwing an unexpected error for any `duration` less than 0 and we fixed that bug, this could be considered a *patch change*.
Crucially, a defect fix *could* be considered a breaking change if clients become used to its behaviour: for example, if `duration` was being treated by library code as a off-by-one in all cases, then clients may have been correcting for it and may now have their code broken with the fix.

### Other changes
Not all changes are major, minor, or patch changes. Any code change that does not impact clients (for example, a refactoring) has no client impact.

## Semantic Versioning
One way to release release APIs safely is to release them as packages that clients can download and then use in their code.
This is how package libraries like `npm` work.
To release new versions and communicate the change severity of each version, each package's version is named in a scheme called *semantic versioning*.
Each version name contains three numbers: `Major.Minor.Patch`.
For example, 3.8.1 has a major version of 3, a minor version of 8, and a patch version of 1.
If a subsequent release contains only small defect fixes and the team decides to release a new version, then the new version would increment the patch version number only:`3.8.2`.
A version number is increased by the most severe change included in the code update, and results in zero-ing out all the lower version numbers.
For example, if a new release included a breaking change, a minor change, and a defect fix, then the new semantic version would be `4.0.0`.
Semantic versioning allows clients to quickly understand if they can adopt an API update or how many changes they would need to do so.

## REST Versioning
Another method of software reuse is via REST APIs.
Versioning REST APIs is usually done in completely backwards compatible ways because it is more difficult to maintain multiple live API versions in production.
If any critical breaking changes need to be made, teams will typically deploy a completely new version of the API with the old one still running, and then eventually sunset the old version:

1. First, only the current version `/checkout` exists
2. Then, both the current version `/checkout` and the new version `/v2/checkout`
3. `/checkout` is marked as deprecated and clients are encouraged to switch to the new version.
4. Once all clients change their code to work with the new version, then `/checkout` is deprecated and removed

As a result, seasoned engineers will always serve their APIs with a `/v1` prefix to start with, which allows easy subdomaining for future breaking changes.

Safe versioning may happen at smaller levels too: for example, by providing a `/checkoutSpecific` endpoint that clients may opt into (instead of renaming or modifying the `/checkout` endpoint directly) or by providing optional parameters as well.


### References
https://semver.org/
