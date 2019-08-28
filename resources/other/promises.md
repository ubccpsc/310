# Promises Tutorial

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vTCJJ5hV2L5xBNRP4K6EL7D8Ai-2m4KWzgmRu_Z4DzSI-U-V-IhbrpDhZPrLzPdq6l4n101iCQDOT4J/pub -->

_Note: Some code samples are written in JavaScript._

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

If you run the [interactive version](https://repl.it/@lucasz/Simple-async), you will see that the output on the right doesn’t match the order that the statements were written in on the left because `setTimeout` waits one second before calling `toDo`. You can also see that the program ended before it printed (the green `=> undefined` is the final return value).

Callbacks have a few major drawbacks that are inconvenient to manage:
  - Error handling gets very cumbersome as you can’t throw errors, they have to be passed around as parameters and explicitly checked
  - Code structure can get very disorganized and hard to follow visually
  - Waiting until a set of asynchronous operations are complete is difficult

Enter Promises, what you’ll be working with a lot during this course. Promises are objects designed to help developers manage async operations. The `Promise` constructor takes a function with two parameters, `fulfill` and `reject`\*. By default, a promise is in a pending state. You can then resolve the promise to be either fulfilled (in the case of the operation succeeding), or rejected (in the case of the operation failing). When a promise resolves it resolves with a value, usually either a result or an error message, similar to when a function returns.

A promise has two important methods, `then()` and `catch()`. Both take one parameter, a callback function that also takes one parameter (this will get passed the value the promise resolved with). If the function fulfilled, `then()` is called. If the function rejected, `catch()` is called.

Now, [here’s how that looks](https://repl.it/@lucasz/Synchronous-Promise) with a promise that doesn’t involve any asynchrony. Try changing how `a` is declared to trigger an error. Note that once a promise resolves, how it resolves cannot be changed. [See here](https://repl.it/@lucasz/Resolving-locks).

So far all we’ve done is make synchronous code more complicated. Now let’s use the fact that the promise waits to resolve before calling `then()` or `catch()` to [Promise-ify a callback](https://repl.it/@lucasz/Promise-ify).

Also note that `then()` and `catch()` return promises themselves, which means you can chain them together. [Here](https://repl.it/@lucasz/Reject-from-in-a-then) you can see the second promise rejects, which gets caught by the catch at the bottom.
You can also return and throw values from within callbacks to modify what gets returned: [Example](https://repl.it/@lucasz/Returnthrow-in-callbacks)

Alright, now for where things get really useful. Often there will be multiple async operations you want to do, but coordinating them is difficult. The `Promise` class has a static method `all()`, which takes an array of promises as input, and returns a promise. Once all the promises in the array have fulfilled, `Promise.all()` fulfills, and the value is an array of each of the values the promises fulfilled with. If any of the promises in the array rejects, `Promise.all()` will reject with that value. Again, this should be clearer with an [example](https://repl.it/@lucasz/Actual-Promiseall).

This should be the bulk of what you need to get started with promises. Really the best way to understand how they work is to work with them yourself, so playing with the links provided is a great way to learn. Also having log statements in your promises is great for visualizing execution flow when you’re getting used to them.

Lastly, the only thing that changes in TypeScript is if a function returns a promise, you will need to specify what the function’s fulfill value’s type is.
```TS
public doThing(): Promise<number> {}
```
Note that if you are rejecting, you do not need to reject with the same type.

\* Technically the parameters can take any name. By convention this is usually resolve and reject, or fulfill and reject. We will be using fulfill and reject when talking about them.

## Using async/await syntax
Now that you have an understanding promises, let's see how we can accomplish the same thing using async/await syntax. First, you must define your function with the `async` keyword:

```TS
async function doSumAsync(filesWithNumbers: string[]): Promise<number> {...}
```

Inside of the function you can use the `await` keyword which causes the program to wait until the promise either resolves of rejects:
```TS
async function addOneV1(): Promise<number> {
  const filesWithNumbers: string[] = ["file1", "file2", "file3"];
  const sumPromise: Promise<number> = doSumAsync(filesWithNumbers);
  const sum: number = await sumPromise;

  return sum + 1;
}

async function addOneV2(): Promise<number> {
  const sum: number = await doSumAsync(["file1", "file2", "file3"]);
  
  return sum + 1;
}
```

In the above example, if the promise rejects, an exception will be thrown. Let's handle that like we did before with a catch. Note under the async/await syntax, exceptions are handled synchronosly, just like normal expections:
```TS
async function addOneV3(): Promise<number> {
  let sum: number = 0;

  try {
    sum = await doSumAsync(["file1", "file2", "invalidFile"]);
  } 
  catch (err) {
    console.log("Oops! There was a problem computing the sum.");
  }

  return sum + 1;
}
```

Finally, we can mimic `Promise.all` by calling an async function before `await`ing it:

```TS
async function readNumberFileAsync(path: string): Promise<number[]> {...}

async function doSumAsync(filesWithNumbers: string[]): Promise<number> {
  let sum: number = 0;
  const numbers: number[] = [];
  const promises: Promise<number[]>[] = [];
  
  // create an array pf promises
  for (let file of filesWithNumbers) {
    promises.push(readNumberFileAsync(file));
  }

  // wait for each promise to resolve
  for (let file of promises) {
    numbers.push.apply(numbers, await file);
  }

  // use the resolved values
  for (let numArr of numbers) {
    for (let num of numArr) {
      sum += num;
    }
  }
  
  return sum;
} 
```

Alternatively, we can use a combination of `await` and `Promise.all` which is likely what you'll want to use in your project (if you choose to use the async/await syntax):
```TS
async function readNumberFileAsync(path: string): Promise<number[]> {...}

async function doSumAsync(filesWithNumbers: string[]): Promise<number> {
  let sum: number = 0;
  let numbers: number[] = [];
  const promises: Promise<number[]>[] = [];
  
  // create an array pf promises
  for (let file of filesWithNumbers) {
    promises.push(readNumberFileAsync(file));
  }

  numbers = await Promise.all(promises);

  // use the resolved values
  for (let numArr of numbers) {
    for (let num of numArr) {
      sum += num;
    }
  }

  return sum;
}
```

Note: to Promise-ify a function, you will still need to explicitly use the Promise object as described before.
