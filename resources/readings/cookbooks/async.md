# Async Cookbook

Working with asynchronous code can be challenging. This cookbook provides concrete examples of many different kinds of asynchronous calling mechanisms you may encounter. The cookbook assumes you have previously looked at the [Async Reading](TBD) which provides a higher-level view of async challenges.

## TOC

* [Top tips](#tips)
* [Setting](#setting)
* [Calling async methods](#callingAsync)
    * [Single async call](#single)
        1. [With callbacks](#singleCallback)
        1. [With promises](#singlePromise)
        1. [With async/await](#singleAsync)
    * [Sequential async calls](#sequential)
        1. [With callbacks](#sequentialCallback)
        1. [With promises](#sequentialPromise)
        1. [With async/await](#sequentialAsync)
    * [Parallel async calls](#parallel)
        1. [With callbacks](#parallelCallback)
        1. [With promises](#parallelPromise)
        1. [With async/await](#parallelAsync)
        1. [With hybrid promises and await](#parallelHybrid)
* [Testing async methods](#testAsync)
    1. [With callbacks](#testCallback)
    1. [With promises](#testPromise)
    1. [With async/await](#testAsync)
* [Other async challenges](#other
    * [Wrapping a callback in a promise](#wrapCallback)

<a name="tips"></a>
### Top tips

Async programming can be deceptively tricky. There are four main traps you should be aware of:

* Async code often doesn't behave as you might expect when you run it. The easiest way to get a handle on how your code is executing is either with the debugger or with logging statements (e.g., before, during, and after calls).

* Errors can be harder to detect. Be sure to always check your async code in failing conditions (e.g., by intentionally inducing failure) to ensure errors are handled appropriately.

* With callbacks and other anonymous functions, the `this` variable often does not point to the object you think it does. Using _arrow notation_ (e.g., `() => { .. }`) is the easiest way to deal with this, although there are many other approaches.

* Working with many async tasks at once (e.g., `Promise.all` or `for await`) can sometimes obscure whether your code is waiting for one async task to complete before staring the next. This can unexpectedly degrade program performance.

<a name="setting"></a>
### Setting

These examples below all rely on the [MathJS](http://api.mathjs.org) REST library. We have developed two asynchronous methods for calling the MathJS endpoint:

```typescript
public async calcAsync(expression: string): Promise<string>
```

```typescript
public calcCB(expression: string, 
              callback: (err: string, result: string) => void
              ): void
``` 

For all examples below, you can assume you have access to a field called `private math: MathJS` that provides both methods declared above. Additionally, a string expression (e.g., `300+10`) is provided in the `exp` variable.

<a name="callingAsync"></a>
## Calling async methods

Calling asynchronous methods requires more care than synchronous methods because the method does not return as you might normally expect.

For instance, the simplest example of an async method is `setTimeout`:

```typescript
console.log(' before');
setTimeout( () => {
  console.log(' during');
  }, 0);
console.log(' after');
```

While reading this code from top to bottom, you might expect it to print ` before during after`, at runtime it actually prints ` before after during`. This is because the `setTimeout` method is asynchronous and does not execute its anonymous callback until after `console.log(' after');` has executed.

Three predominant mechanisms exist for executing asynchronous work in Typescript: callbacks, promises, and async/await. Each have their benefits and drawbacks.

---

<a name="single"></a>
### Single async call

All three mechanisms work well for making a single async call, although callbacks are the most verbose, and async/await are the most visually similar to synchronous code.

<a name="singleCallback"></a>
#### With callbacks

Callbacks were the original mechanism in Typescript for completing asynchronous work. 

```typescript
this.math.calcCB(exp, (err: string, result: string) => {
  if (err) {
    console.log("singleCallback - ERROR; err: " + err);
  } else {
    console.log("singleCallback - done; result: " + result);
  }
});
```

The second parameter to `calcCB` is a callback: this is a method that is called by the math `calcCB` when it is done asynchronously computing the calculation. The callback takes two parameters: `err` and `result`. By convention, callback-based code returns an error parameter first that can be checked for errors, and returned results as subsequent parameters.

<a name="singlePromise"></a>
#### With promises

If a Promise settles successfully, it calls its `then` function; if an error is encountered, the promise settles by calling its `catch` function.

```typescript
this.math.calcAsync(exp).then( (result) => {
    console.log("singlePromise - done; result: " + result);
}).catch( (err) => {
    console.log("singlePromise - ERROR; err: " + err);
});
```

While both the `.then` and `.catch` function are optional, the result of the async call cannot be retrieved without including `.then`, and difficult-to-diagnose errors can arise if `.catch` is omitted as the promise will silently fail.

<a name="singleAsync"></a>
#### With async/await

The async/await version of the code _almost_ looks like synchronous code. Only two differences exist: first, the `await` keyword specifies that the code following the call depends on the result and computation should be yielded until the async method has completed. Second, while not shown below, methods using the `await` keyword must be declared `async` in their method declaration.

```typescript
try {
    const result = await this.math.calcAsync(exp);

    console.log("singleAsync - done; result: " + result);
} catch (err) {
    console.log("singleAsync - ERROR; err: " + err);
}
```

---

<a name="sequential"></a>
### Sequential async calls

It often arises that several async calls need to be used to complete a single task. While the calls themselves are async, organizing them into a synchronous sequence so the output of an earlier call can be used in a subsequent call is often needed.

<a name="sequentialCallback"></a>
#### With callbacks

As the number of asynchronous callbacks increase, the difficulty in dealing with them grows. The code below provides a glimpse of 'the pyramid of doom' where nested callbacks create deep indentation structures that are error-prone and hard to debug.

```typescript
this.math.calcCB(exp, (err: string, result: string) => {
    if (err) {
        console.log("sequentialCallback - ERROR; err: " + err);
    } else {
        this.math.calcCB(result + "*10", (err: string, result: string) => {
            if (err) {
                console.log("sequentialCallback inner - ERROR; err: " + err);
            } else {
                console.log("sequentialCallback inner - done; result: " + result);
            }
        });
        console.log("sequentialCallback - done; result: " + result);
    }
});
```

<a name="sequentialPromise"></a>
#### With promises

One of the greatest strenghths of promises is to enable async calls to be marshalled into easier-to-understand sequences of actions. While the code below shows only two nested calls to `calcAsync`, these could be interspersed with any number of other async calls as well. Errors are handled with `catch` clauses, and these clauses can occur at any point in the sequence; errors will always be handled by their 'next' `.catch` clause.

Note in this example, the `return` is crucial for the second `calcAsync` call for the promise chain to maintain its flat structure.

```typescript
this.math.calcAsync(exp).then((result) => {
    console.log("sequentialPromise - done; result: " + result);

    return this.math.calcAsync(exp + "*10");
}).then((result) => {
    console.log("sequentialPromise inner - done; result: " + result);
}).catch((err) => {
    console.log("sequentialPromise - ERROR; err: " + err);
});
```

<a name="sequentialAsync"></a>
#### With async/await

As with the single async call example, async/await provide the cleanest mechanism for writing async calls.

```typescript
try {
    let result = await this.math.calcAsync(exp);
    console.log("sequentialAsync - done; result: " + result);
    
    result = await this.math.calcAsync(exp + "*10");
    
    console.log("sequentialAsync inner - done; result: " + result);
} catch (err) {
    console.log("sequentialAsync - ERROR; err: " + err);
}
```

---

<a name="parallel"></a>
### Parallel async calls

Another common use case is when many independent parallel jobs need to be executed. This may arise when reading or writing many different file-based or network-based resources.

<a name="parallelCallback"></a>
#### With callbacks

Parallel callbacks are extremely hard to manage, especially when there are an unknown number of them at runtime (the examples below for promises and async/await are handling four jobs). Just don't write them with traditional callbacks, you'll live a happier and more fruitful life for this choice.

<a name="parallelPromise"></a>
#### With promises

`Promise.all` is used for exactly this case: this Promise takes a  list of async tasks, waits for them to all complete (or fail), and then settles itself.

This is different to prior async calls. Note that `jobs.push` is pushing the unsettled Promise objects returned by `calcAsync` onto a standard list. 

The `.then` clause of the `Promise.all` call is triggered when the jobs have completed (the `.catch` clause is triggered on error in any of the jobs).

```typescript
let jobs = [];
let total = 1;
const opts = [11, 20, 30, 40, 51];

// create a list of asynchronous work
for (const o of opts) {
    jobs.push(this.math.calcAsync(o + "+" + (o + 1)));
}

// wait for all asynchronous work to finish
Promise.all(jobs).then( (jobResults) => {
    for (const result of jobResults) {
        // each result is the settled value from the Promise
        total += Number(result);
    }

    console.log("parallelPromises done; total: " + total);
}).catch( (err) => {
    // handle error
    console.log("parallelPromises - ERROR: " + err);
});
```

<a name="parallelAsync"></a>
#### With async/await

While using the `for await` construct feels appealing as it helps the code look as close to the synchronous version as possible, this mechanism is prone to two shortcomings. First, it is extremely common to make mistakes that can result in the code running sequentially instead of in parallel. Second, the `try..catch` does not reliably catch errors that may arise if any of the async jobs fail (this is not true for normal `await` calls, only for `for await`).  Fortunately, a [hybrid](#parallelPromiseAwait) of these two approaches can address both of these shortcomings.

```typescript
let jobs = [];
let total = 1;
const opts = [11, 20, 30, 40, 51];

// create a list of asynchronous work
for (const o of opts) {
    jobs.push(this.math.calcAsync(o + "+" + (o + 1)));
}

try {
    // wait for all asynchronous work to finish with await
    const jobResults = await Promise.all(jobs);
    for (const result of jobResults) {
        // each result is the settled value from the Promise
        total += Number(result);
    }
    
    console.log("parallelHybridPromises done; total: " + total);
} catch (err) {
    // handle error
    console.log("parallelHybridPromises - ERROR: " + err);
}
```


<a name="parallelPromiseAwait"></a>
#### With hybrid await and Promise.all

Fortunately, both promises and async/await can be combined to strike a nice balance of understandability and reliability. Here `Promise.all` is used to wait for all work to be done, but rather than handling `.all` being done using a `.then` or `.catch`, we are using `await` which also enables us to use the standard exception handling mechanisms for errors.

```typescript
try {
    let jobs = [];
    const opts = [11, 20, 30, 40, 51];
    let total = 1;

    // create a list of asynchronous work
    for (const o of opts) {
        // jobs.push(this.math.doStringyMath(o + "+" + (o + 1)));
        jobs.push(this.math.calcAsync(o + "+XXX" + (o + 1)));
    }
    
    // wait for all asynchronous work to finish
    const jobResults = await Promise.all(jobs);
    for (const result of jobResults) {
        // each result is the settled value from the Promise
        total += Number(result);
    }

    console.log("parallelAwait done; total: " + total);
} catch (err) {
    // handle error
    console.log("parallelAwait - ERROR: " + err);
}
```

---

<a name="testAsync"></a>
## Testing async methods

TBD

<a name="testCallback"></a>
### Testing callbacks 

TBD


<a name="testPromise"></a>
### Testing promises 

TBD

<a name="testAsync"></a>
### Testing promises 

TBD

<a name="other"></a>
## Other async challenges

TBD

<a name="wrapCallback"></a>
### Wrapping callback in a promise

TBD



<!--# Previous material-->

<!-- Adapted from  https://docs.google.com/document/d/e/2PACX-1vQMzNGsO0Q8Dx5HliXrOWPHfZOEcuMiaqNRFN9fkDJdwZnEcsNeaI47bjsWr_qDWttBF-zoZ6G3TwNR/pub -->

<!--
Asynchronous development requires different programming idioms than synchronous development. This deliverable requires the execution of a series of asynchronous tasks: specifically, you will be writing code that reads JSON from URLs. Reading from a URL is an asynchronous task in Typescript/Javascript!

There are many idioms you can find online that can validly accomplish this task, including nested callbacks, or async/wait, but for this course you will use _Promises_. As you will learn in tutorial, a **Promise** is an object that is returned by a call to an asynchronously run method (like getting data from a file). Making an asynchronous call might look like this:

```typescript
let didItWork: Promise<any> = doAsyncTask();
```

In the above code, we are capturing the Promise returned by `doAsyncTask` in the variable `didItWork`.

The `Promise` object has a method called **`.then`** that is called back once the asynchronous task is completed successfully (fulfilled). The `.then` method takes one parameter: the method to call upon completion of the async task. You may remember passing functions from CPSC110, or if you played around with lambdas in Java. This code might look similar to this:

```typescript
didItWork.then(yay);    // yay is the method that will run when
                        // didItWork fulfills
```

The `Promise` object also has a **`.catch`** method, which also takes one parameter -- also a function.  That function is called if the promise is rejected (in the case that it failed).

```typescript
didItWork.catch(boo);   // boo is the method that will run when
                        // didItWork is rejected
```

These can be chained together to catch both cases:

```typescript
didItWork.then(yay).catch(boo); //that’s because .then()
                                // ALSO returns a Promise!
```

One note is that the functions you pass to then or catch take one parameter, which will essentially be what the result of the promise is (this will be more clear in practice). The `Promise` class has a static method called **`.all`** that takes an array of promises. Not surprisingly, `.all` also returns a promise: The `.then` parameter function would only be called once all the promises in the array are fulfilled. If any of the promises are rejected, then `Promise.all` will also reject.

Also note that you can give then and catch anonymous functions as well:

```typescript
didItWork.then(function(result) {
        console.log(result);
});
```

It’s not only out of the box asynchronous tasks that return promises. Your code can create promises too. You can call the `Promise` constructor, passing in a function that takes two parameters (one is the fulfilment method, the other is the rejection method). The body of that function then contains the logic for fulfilling or rejecting the asynchronous task being performed.

```typescript
let myPromise: Promise<any> = new Promise<any>(function(yessss, noooooo) {
   if (thingStatus === 'good') yessss(1);
   else noooooo(1);
});
```

You will see code examples of simple cases in tutorial, and upon those you can build your solution for the project!

As you’ve probably worked out, the value of yessss and noooooo are bound to the function parameters passed into `.then` and `.catch` respectively. So given the code below, `successFoo` would be called when yessss was called, and `failureFoo` would be called when noooooo was called:

```typescript
myPromise.then(successFoo).catch(failureFoo);
```
-->

## Resources

* [Avoiding Async Hell](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513)