---
weight: 2
title: "Change Difficulty"
---


Cost of change gave us a model for how to reason about the difficulties and risks of evolving code.
But how do we describe the sources of these costs in actual code?
What features of our code make it so we incur these costs?

### Coupling

<Youtube id="I9rEvxiWF9I" />

Coupling is a property that indicates the strength of connections between different program elements. Strong coupling is problematic because it negatively influences the evolvability and maintainability of a program. There are several reasons for this:

* Coupled code makes it easier for errors in one part of the system to propagate to other unrelated parts of the system.

* Coupling increases the degree to which a single bug fix or feature addition is scattered across the codebase.

* Code that is tightly coupled is much harder to reuse independently than code which is loosely coupled.

* It is harder to understand a source code element that is coupled to other elements because individual elements cannot be considered (and understood) in isolation.

We can measure coupling between two groups of code along the following attributes:
- **Degree:** How many connections there are between the groups.
- **Locality:** How far away the groups are from each other.
- **Strength (Connascence):** How strong the bonds are.

 Connascence type | Two things must agree on | Example |
| --- | --- | --- |
| **Name** | What something is called | A method or class name (e.g. `findUserById`). Updates to the method name mean all uses must also change to use the new name. |
| **Type** | The shape of the data | A type signature or shape of the data. If the type changes (e.g. to add a new required field) then all callers must ensure field exists in their call. |
| **Value** | A specific literal | The app hard-codes the string `"pending"` in several places, including validation, reporting, and UI labels. If the status is renamed to `"in-review"`, every location must change in sync or the system shows inconsistent behaviour. "Magic numbers" are a special case of connascence of value with number-type values. |
| **Position** | Argument order | A helper like `createInvoice(customerId, startDate, endDate, total, tax)` is used by several modules. If one caller swaps `total` and `tax`, the code still compiles and tests may pass, but invoices are calculated with the wrong values. |
| **Algorithm** | A computation done the same way | One class encodes the encrypted data using one algorithm means any consumer class must decode it using the same algorithm. |

Notes on connascense based on [here](https://practicingruby.com/articles/connascence) which contains more explanations and examples.

#### Example

```typescript
function mysteriousOperation(x: number, y: number) {
    return x - y;
}

function inverseOperation(x: number, y: number) {
    return mysteriousOperation(x, y);
}
```

In this example, `mysteriousOperation` and `inverseOperation` are coupled with a connascence of *Position*: when `inverseOperation` calls `mysteriousOperation`, it must specify `x` and `y` in a particular order to receive the expected output.
If `mysteriousOperation` changed it's return to `return y - x`, then `inverseOperation` would have to change the position of the arguments it supplies in its call.
Two things to note:
1. This is an *implicit* coupling, since the compiler wouldn't catch the error (since both are number types). It would fail silently at runtime!
2. There are other levels of connascence present here too (for example, they must agree on the *name* `mysteriousOperation`). However, the strongest connascence is of *position*, so that is the most significant one.

#### Risks & Difficulties
Coupling puts the developer at risk of missing necessary updates to coupled code.
This is especially dangerous if a coupling is implicit.
For example, the use a specific "magic" value across the codebase requires that the developer finds every usage of the magic number and updating them.

Coupling incurs difficulties the larger its degree and locality: the larger the degree, the more locations a developer must read and/or write with each change.
For example, the explicit coupling of calling an object's method in 20 locations across the codebase means that an update to the method's signature means going to each of the 20 locations, reading the code to decide how to make the change, and making the change.

#### Addressing Coupling

It is important to remember that any non-trivial system _requires_ that there be some coupling between elements. The goal is not to eliminate it but to make the coupling be as loose as possible. There are three primary ways to decrease the coupling between program elements:

* **Minimize the number of interfaces (Degree) between elements**: The more interfaces two program elements need to share, the more tightly they are coupled to each other. 

* **Minimize the distance between interfaces (Locality) between elements**: If coupling exists between elements in entirely different systems, consider extracting shared code into a common library that can be independently used in each system.

* **Minimize the complexity of interfaces (Connascence )**: Moving from a connascence of Algorithm to a connascence of Type means that coupled code just needs to adhere to a new type--not fully reimplement an algorithm--to properly evolve. This makes the cost of each change must cheaper.

<!-- * **Avoid control flow coupling**: It can often be convenient to pass objects that control the flow of computation within another element.  While this is ok if the element being passed is some type of data structure, it can be more problematic if the control flow is being influenced by simple control flow flags (e.g., some kind of `boolean` flag that takes one program path over another). -->

<!-- The flow chart below can be helpful for reasoning about the coupling between program elements. One thing to note is that not all coupling is equally detrimental: coupling elements by simple data types is less problematic than coupling them through global variables (common coupling) or internal field access (content coupling).

![Coupling flowchart](coupling_flow.png) -->

<Youtube id="QZAacpnjVVg" />

<!-- TODO: describe levels -->

### Cohesion

<Youtube id="oMJNS6mvhQU" />

Cohesion is a property that indicates how focused our program elements are on performing a single complete task. This is best thought of in terms of classes in object-oriented design. In this space, cohesion measures how well the elements within a class belong together. Classes with low cohesion are responsible for a wide variety of tasks; these classes are harder to reason about because they often have many competing concerns within their implementation that might conflict. This can cause maintenance problems because changes to fix one defect within a class might actually be by design for another feature provided by the class. The larger a class grows in scope, the more likely this kind of problem is to be encountered.

Cohesive classes generally have a small set of private fields that make sense to the majority of the public methods within the class; if there are fields within the class that are only used by a small fraction of the public methods it may be a sign that the functionality provided by those methods and the private field may not be cohesive with the overall functionality of the class.

Since cohesive classes are smaller, they lead to a proliferation of classes within a system. While this might make it harder to find the right class within the system, it greatly eases how hard it is to understand that class and simplifies any future bug fixes or feature additions that may be required.

We measure cohesion between pairs of groupings of code (e.g. lines, blocks, methods).
Each pair may contain 
*bindings* -- or how a pair of concepts is related by *data*, *logic*, and/or *timing*.

The table below shows TypeScript examples of code that is related by different *Binding*s:

| Binding | Example | Explanation |
| --- | --- | --- |
| Data | `const subtotal = price * quantity; const total = subtotal + tax;` | line 2 uses data from the previous line |
| Logic | `if (user.isAdmin) { grantAccess(); } else { denyAccess(); raiseAlarm() }` | `denyAccess()` and `raiseAlarm()` are grouped by the same logic |
| Order | `const total = subtotal + tax; if(total > 100) console.log("big total");` | `total` needs to be calculated before, so the conditional is evaluated correctly |

Using these properties helps us reason about which code should be grouped together, and which code can be extracted apart.

#### Risks & Difficulties
Code with low cohesion *risks* having edits affecting seemingly unrelated code.
If the method you are editing addresses five tasks but you are editing just one of them, you risk interfering with the other four tasks as well.

Similarly, low cohesion indueces *difficulties* by forcing the developer to read lots of code to understand where to make a change.
You have probably experienced this before if you have seen a class that is hundreds of lines of code long and could not find where you actually needed to make your edit!

#### Example

```typescript
function f(x: number) {
    let y = 0;                 // (1)
    if (x > 100) {             // (2)
        y += 5;                // (3)
        console.log("woohoo"); // (4)
    }
    return y;                  // (5)
}
```
In this example, lines 1 and 2 are bound by:
- Data: No. Line 1 uses `y` only, and Line 2 uses `x` only.
- Logic: Yes. Both lines are invoked whenever `f` is called.
- Ordering: No. Looking at just these two lines, it does not matter what order they are invoked. However, Lines 1 and 3 *do* have an ordering binding.

**Exercise for home**: For each pair of lines, determine which cohesion bindings they hold!

<!-- The flow chart below can be used to reason about the kind of cohesion within a design. As with the coupling flow chart above, some kinds of cohesion are better than others. Thinking about the cohesiveness of our program elements can help us to understand when further decomposition of our designs might be helpful and will also motivate the organization of our program elements into their most appropriate subsystems.


![Cohesion flowchart](cohesion_flow.png) -->

<Youtube id="gkCIOUbu81o" />



## Design Symptoms
<Youtube id="_Eb5bAgpgQg" />
<!-- TODO: cognitive dimensions -->

<!-- TODO: describe levels -->

<!-- TODO: include design guidance and symptoms -->
<!-- rigidity, fragility, immobility, viscosity, complexity, repetition, opacity -->
