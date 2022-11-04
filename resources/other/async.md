# Async Cookbook

## TOC

* Setting
* Calling async methods
	* Single async call
	    1. With callbacks
	    1. With promises
	    1. With async/await
	* Sequential async calls
	    1. With callbacks
	    1. With promises
	    1. With async/await
	* Parallel async calls
	    1. With callbacks
	    1. With promises
	    1. With async/await
* Testing async methods
	* TBD

<a href="#setting"></a>
### Setting

These examples... TBD
 
# Previous material

<!-- Adapted from  https://docs.google.com/document/d/e/2PACX-1vQMzNGsO0Q8Dx5HliXrOWPHfZOEcuMiaqNRFN9fkDJdwZnEcsNeaI47bjsWr_qDWttBF-zoZ6G3TwNR/pub -->

Asynchronous development requires different programming idioms than synchronous development. This deliverable requires the execution of a series of asynchronous tasks: specifically, you will be writing code that reads JSON from URLs. Reading from a URL is an asynchronous task in Typescript/Javascript!

There are many idioms you can find online that can validly accomplish this task, including nested callbacks, or async/wait, but for this course you will use _Promises_. As you will learn in tutorial, a **Promise** is an object that is returned by a call to an asynchronously run method (like getting data from a file). Making an asynchronous call might look like this:

```TS
let didItWork: Promise<any> = doAsyncTask();
```

In the above code, we are capturing the Promise returned by `doAsyncTask` in the variable `didItWork`.

The `Promise` object has a method called **`.then`** that is called back once the asynchronous task is completed successfully (fulfilled). The `.then` method takes one parameter: the method to call upon completion of the async task. You may remember passing functions from CPSC110, or if you played around with lambdas in Java. This code might look similar to this:
```TS
didItWork.then(yay);    // yay is the method that will run when
                        // didItWork fulfills
```

The `Promise` object also has a **`.catch`** method, which also takes one parameter -- also a function.  That function is called if the promise is rejected (in the case that it failed).
```TS
didItWork.catch(boo);   // boo is the method that will run when
                        // didItWork is rejected
```

These can be chained together to catch both cases:
```TS
didItWork.then(yay).catch(boo); //that’s because .then()
                                // ALSO returns a Promise!
```
One note is that the functions you pass to then or catch take one parameter, which will essentially be what the result of the promise is (this will be more clear in practice). The `Promise` class has a static method called **`.all`** that takes an array of promises. Not surprisingly, `.all` also returns a promise: The `.then` parameter function would only be called once all the promises in the array are fulfilled. If any of the promises are rejected, then `Promise.all` will also reject.

Also note that you can give then and catch anonymous functions as well:
```TS
didItWork.then(function(result) {
        console.log(result);
});
```

It’s not only out of the box asynchronous tasks that return promises. Your code can create promises too. You can call the `Promise` constructor, passing in a function that takes two parameters (one is the fulfilment method, the other is the rejection method). The body of that function then contains the logic for fulfilling or rejecting the asynchronous task being performed.
```TS
let myPromise: Promise<any> = new Promise<any>(function(yessss, noooooo) {
   if (thingStatus === 'good') yessss(1);
   else noooooo(1);
});
```

You will see code examples of simple cases in tutorial, and upon those you can build your solution for the project!

As you’ve probably worked out, the value of yessss and noooooo are bound to the function parameters passed into `.then` and `.catch` respectively. So given the code below, `successFoo` would be called when yessss was called, and `failureFoo` would be called when noooooo was called:

```TS
myPromise.then(successFoo).catch(failureFoo);
```

## Resources

* [Avoiding Async Hell](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513)
