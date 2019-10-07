# TypeScript/JavaScript Notes

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vR0p0y3_R2VIt6CEs5ZTJPFPLCZMTaVCxMcNofnuokKfoIJj9q6s2bHbOZJkXqwP63sLOtriC5r8dsc/pub -->

TypeScript is a language that has object oriented and strong typing features, but compiles down to regular JavaScript.
Since TypeScript is a superset of JavaScript, all JavaScript works as valid TypeScript, though you may need to add some type declarations to keep the compiler happy.
The purpose of this tutorial isn’t to get you fluent in JavaScript, it’s more to set you on the path to being comfortable enough with JavaScript that you’re able to ask the questions you need to teach yourself as you go.
A great resource to get started is <https://learnxinyminutes.com/docs/javascript/>. The TypeScript version can be found at <https://learnxinyminutes.com/docs/typescript/>
A quick skim of this page followed by searching it will cover most of what you need to know for JavaScript syntax and operation.
You can also play around with JavaScript without setting up a whole project at <https://repl.it/languages/javascript>. And for TypeScript <https://www.typescriptlang.org/play/>.

Some things to watch out for:

- **Variables** JavaScript and TypeScript have three ways to declare variables: `var`, `let`, and `const` with different scoping rules. In general, you should use `const` if you are able to initialize the variable when you declare it and you don't need to change it's value. Note that arrays and objects can often be declared using `const` because you change the values (e.g. with `push` and `pop`) but not the underlying container. Otherwise, you should use `let`. Avoid using `var` since it has a larger scope and may not work as you expect.

- **Equality** Use `===` instead of `==` (and `!==` instead of `!=`). The triple equal is strict and does what you expect. Speicifcally, this means that type coersion is not used with triple equal so strings, booleans, and numbers are not compared in ways you do not expect (e.g., you would expect `true === 'true'` to be `false`, and it is; however `true == 'true'` is `true`, which is probably _not_ what you would expect).

- **this** `this` can refrerence different objects than you might expect; this often happens when processing async functions or during callbacks. A complete description can be found [here](https://github.com/microsoft/TypeScript/wiki/%27this%27-in-TypeScript).

- **Loops** JavaScript has three `for`-style loops with subtle differences. The examples are written in TypeScript.
  - `for`

     ```TS
        const arr: string[] = ["a", "b", "c"];
        const obj: {[key: string]: string} = { "key1": "a", "key2": "b", "key3": "c" };

        // Print the values in arr
        for (let i = 0; i < arr.length; i++) {
                console.log(arr[i]);
        }

        // Print the key/value pairs in obj
        const keys: string[] = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
                const key: string = keys[i];
                const value: string = obj[key];
                console.log(key, value);
        }
     ```
  - `for...in`:

     ```TS
        const arr: string[] = ["a", "b", "c"];
        const obj: {[key: string]: string} = { "key1": "a", "key2": "b", "key3": "c" };

        // Prints the array index (e.g. 0, 1, 2. Probably not what you want)
        for (let key in arr) {
                console.log(key);
        }

        // Prints the object's keys:
        for (let key in obj) {
                console.log(key);
        }
     ```
  - `for...of`:

     ```TS
        const arr: string[] = ["a", "b", "c"];
        const obj: {[key: string]: string} = { "key1": "a", "key2": "b", "key3": "c" };

        // Prints the values of arr
        for (let value of arr) {
                console.log(value);
        }

        // INVALID
        for (let value of obj) {
                console.log(value);
        }

        // To get the object values, use
        for (let key in obj) {
                console.log(obj[key]);
        }

        // Or, use
        for (let key of Object.keys(obj)) {
                console.log(obj[key]);
        }

        // Or, use
        for (let value of Object.values(obj)) {
                console.log(value);
        }
    ```

A few notes specific to TypeScript.

- **Union types** If you want a variable to accept more than one type, you can use a `|` to separate each type that should be allowed. For example, if we want to declare an array of numbers or string we would use the declaration: `const arr: number[] | string[] = [];`.
- **Interfaces for objects** For example, if you wanted to specify an object that has string keys with number values, you would do:

    ```TS
        interface Obj {
                [key: string]: number;
        }
    ```
  which would let you create objects like `const obj: Obj = { "key1": 1, "xyz": 2, "abc": -5 }`. Contrast this with

    ```TS
        interface Obj2 {
                key: string;
                value: number;
        }
    ```
  which would only let you create objects like `const obj: Obj2 = { "key": "key1", "value": 1 }`.
