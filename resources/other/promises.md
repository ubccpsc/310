# Promises Tutorial

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vTCJJ5hV2L5xBNRP4K6EL7D8Ai-2m4KWzgmRu_Z4DzSI-U-V-IhbrpDhZPrLzPdq6l4n101iCQDOT4J/pub -->

_Note: Most code samples are written in JavaScript._

When a function is asynchronous, or async, it runs outside of the normal control flow of your program. You can think of it being set aside to run as "to do whenever possible". Some async operations may be dependant on resources outside of your system, such as when making requests from an external server. You won’t know when the function will return, but that doesn’t mean you don’t still need the result.

Below is a very simple async program:
```JS
/*
setTimeout is a very simple async function. It takes two parameters, the first is a callback function, the second is a time in milliseconds. After that much time, it executes the callback
*/
function toDo() {
  console.log("I'm running now!");
}
// Note is is toDo, not toDo() as that would pass the result of calling toDo
console.log("Before setTimeout");
setTimeout(toDo, 1000);
console.log("After setTimeout");
```

If you run the [interactive version](https://repl.it/@lucasz/Simple-async-example), you will see that the output on the right doesn’t match the order that the statements were written in on the left because `setTimeout` waits one second before calling `toDo`. You can also see that the program ended before it printed (the green `=> undefined` is the final return value).

Callbacks have a few major drawbacks that are inconvenient to manage:
  - Error handling gets very cumbersome as you can’t throw errors, they have to be passed around as parameters and explicitly checked
  - Code structure can get very disorganized and hard to follow visually
  - Waiting until a set of asynchronous operations are complete is difficult

Enter Promises, what you’ll be working with a lot during this course. Promises are objects designed to help developers manage async operations. You can think of them as a box around some other code that is going to run. The `Promise` constructor takes a function with two parameters, `resolve` and `reject`\*. By default, a promise is in a pending state. You can then resolve the promise (in the case of the operation succeeding), or reject the promise (in the case of the operation failing). When a promise resolves or rejects, it does so with a value, usually either a result or an error message, similar to when a function returns.

A promise has two important methods, `then()` and `catch()`. Both take one parameter, a callback function that itself takes one parameter. When a promise resolves or rejects with a value, that value will be passed as the parameter to the callback function. If the function resolved, `then()` is called. If the function rejected, `catch()` is called.
Promises can be also be chained together so you can do things like "Once A is finished, then do B, then do C".

Okay, let's look at some code examples. We'll start with promises that don't have any asynchrony involved, just to get a feel for their syntax. You are highly encouraged to mess with the code a little and see what changes. Add logs, change promises, just to get a feel for it.

[Making some promise objects](https://repl.it/@lucasz/Making-a-new-Promise)

[Using then() and catch() to access values when a promise is done](https://repl.it/@lucasz/Accessing-promise-values)

[Chaining promises together and getting a final result](https://repl.it/@lucasz/Chaining-promises). One thing you'll notice here is that `somePromise.then(...)` itself is a promise! This is what enables the chained `.then()` calls.

[A promise with asynchrony, note the execution order](https://repl.it/@lucasz/Actually-async-promises)

Alright, now for where things get really useful. Often there will be multiple async operations you want to do, but coordinating them is difficult. The `Promise` class has a static method `all()`, which takes an array of promises as input, and returns a promise. Once all the promises in the array have resolved, `Promise.all()` resolves, and the value is an array of each of the values the promises resolved with. If any of the promises in the array rejects, `Promise.all()` will reject with that value. Again, this should be clearer with [an example](https://repl.it/@lucasz/Promiseall).

This should be the bulk of what you need to get started with promises. Really the best way to understand how they work is to work with them yourself, so playing with the links provided is a great way to learn. Also having log statements in your promises is great for visualizing execution flow when you’re getting used to them.

Lastly, the only thing that changes in TypeScript is if a function returns a promise, you will need to specify what the function’s resolved value’s type is.
```TS
public doThing(): Promise<number> {}
```
Note that if you are rejecting, you do not need to reject with the same type.

\* Technically the parameters can take any name. By convention this is usually resolve and reject, or fulfill and reject. Here we use resolve.
