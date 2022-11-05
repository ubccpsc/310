# Async Cookbook

## TOC

* [Setting](#setting)
* [Calling async methods](#callingAsync)
    * Single async call
        1. [With callbacks](#singleCallback)
        1. [With promises](#singlePromise)
        1. [With async/await](#singleAsync)
    * Sequential async calls
        1. [With callbacks](#sequentialCallback)
        1. [With promises](#sequentialPromise)
        1. [With async/await](#sequentialAsync)
    * Parallel async calls
        1. [With callbacks](#parallelCallback)
        1. [With promises](#parallelPromise)
        1. [With async/await](#parallelAsync)
* Testing async methods
    1. With callbacks
    1. With promises
    1. With async/await
* Other async challenges
    * Wrapping a callback in a promise

<a href="#setting"></a>
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

<a href="#callingAsync"></a>
## Calling async methods

Calling asynchronous methods requires more care than synchronous methods because the method does not return as you might normally expect.

For instance, the simplest example of an async method is `setTimeout`:

```typescript
console.log('a');
setTimeout(function() {
  console.log('b');
  }, 100);
console.log('c');
```

While reading this code from top to bottom, you might expect it to print `a b c`, at runtime it actually prints `a c b`. This is because the `setTimeout` method is asyncronous, and does not execute until after `console.log('c');` has executed.

Three predominant mechanisms exist for executing asynchronous work in Typescript: callbacks, promises, and async/await. Each have their benefits and drawbacks.

---

### Single async call

All three mechanisms work well for making a single async call, although callbacks are the most verbose, and async/await are the most visually similar to syncronous code.

<a href="#singleCallback"></a>
#### With callbacks

Callbacks were the original mechanism in Typescript for completing asyncronous work. 

```typescript
this.math.calcCB(exp, (err: string, result: string) => {
  if (err) {
    console.log("singleCallback - ERROR; err: " + err);
  } else {
    console.log("singleCallback - done; result: " + result);
  }
});
```

The second parameter to `calcCB` is a callback: this is a method that is called by the math `calcCB` when it is done asyncronously computing the calculation. The callback takes two parameters: `err` and `result`. By convention, callback-based code returns an error paremeter first that can be checked for errors, and returned results as subsequent parameters.

<a href="#singlePromise"></a>
#### With promises

When a Promise settles, it calls its `then` function (if successful) and its `catch` function if an error is encountered.

```typescript
this.math.calcAsync(exp).then( (result) => {
    console.log("singlePromise - done; result: " + result);
}).catch( (err) => {
    console.log("singlePromise - ERROR; err: " + err);
});
```

While both the `.then` and `.catch` function are optional, the result of the async call cannot be retrieved without including `.then`, and difficult-to-dianose errors can arise if `.catch` is omitted as the promise will silently fail.

<a href="#singleAsync"></a>
#### With async/await

The async/await version of the code _almost_ looks like syncronous code. Only two differences exist: first, the `await` keyword specifies that the code following the call depends on the result and computation should be yielded. Second, while not shown below, methods using the `await` keyword must be declared `async` in their method declaration.

```typescript
try {
    const result = await this.math.calcAsync(exp);
    console.log("singleAsync - done; result: " + result);
} catch (err) {
    console.log("singleAsync - ERROR; err: " + err);
}
```

---

### Sequential async calls

<a href="#sequentialCallback"></a>
#### With callbacks

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

<a href="#sequentialPromise"></a>
#### With promises

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

<a href="#sequentialAsync"></a>
#### With async/await

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

### Parallel async calls

<a href="#parallelCallback"></a>
#### With callbacks

Parallel callbacks are extremely hard to manage, especially when there are an unknown number of them at runtime (the examples below for promises and async/await are handling four jobs). Just don't write them with traditional callbacks, you'll live a happier and more fruitful life for this choice.

<a href="#parallelPromise"></a>
#### With promises

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

<a href="#parallelAsync"></a>
#### With async/await

This looks great, but isn't. Error handling does not work like you think it will.

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


<a href="#parallelPromiseAwait"></a>
#### With hyrbid await and Promise.all

Fortunately, both promises and async/await can be combined to strike a nice balance of understandability and realiability. Here `Promise.all` is used to wait for all work to be done, but rather than using a `.then` or `.catch`, we are using `await` which also enables us to use the standard exception handling mechanisms for errors.

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
    for await (const result of jobs) {
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

* Testing async methods
    1. With callbacks
    1. With promises
    1. With async/await
* Other async challenges
    * Wrapping a callback in a promise



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
