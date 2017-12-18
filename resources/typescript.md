# TypeScript/JavaScript Tutorial

<!-- Adapted from https://docs.google.com/document/d/e/2PACX-1vR0p0y3_R2VIt6CEs5ZTJPFPLCZMTaVCxMcNofnuokKfoIJj9q6s2bHbOZJkXqwP63sLOtriC5r8dsc/pub -->

TypeScript is a language that has object oriented and strong typing features, but compiles down to regular JavaScript. Since TypeScript is a superset of JavaScript, all JavaScript works as valid TypeScript, though you may need to add some type declarations to get it to play nice with your TypeScript.
Now, the purpose of this tutorial isn’t to get you fluent in JavaScript, it’s more to set you on the path to being comfortable enough with JavaScript that you’re able to ask the questions you need to teach yourself as you go.
Since at this point you will know programming fundamentals, and JavaScript isn’t wildly different from languages you should have used before, the main hurdle will be syntax. For this, here’s a wonderfully straightforward resource: https://learnxinyminutes.com/docs/javascript/
A quick skim of this page followed by searching it will cover most of what you need to know for JavaScript syntax and operation. Want to play around with JavaScript without setting up a whole project? Try https://repl.it/languages/javascript, type some code on the left, hit run, and see the output (returned value and logs) on the right.
Now, some quick tips on things that can catch some people:
JavaScript has a nice for loop syntax:
        for(var x in thing) {}
        The thing to watch out for here is there are two possible keywords: of, and in.
If thing is an array and you use in, x will be set to the index of each item in the array. If you use of, x will be set to the value of each item.
If thing is an object and you use in, x will be set to a key from the object. Using of isn’t valid at all here, and you will get an error.
The for(var i = 0; i < n; i++) syntax you are likely used to is also still an option.
You can get a list of the properties an object with the function Object.keys(). While the function Object.values() does exist, it is very new, and will likely not work with our test suite! This means it could work on your end but fail on ours, so please avoid it.
Variables in JavaScript (and also TypeScript) can be declared with var or let. There is a difference: Var scopes to the function, but let scopes to a block. This means in a loop like for(var x in thing) var would still be defined and initialized outside the loop once it ends. If you did for(let x in thing), x would not be defined outside of the loop
Using === over == is highly recommended (!== and != are the not equivalents). This shows up in the learnxinyminutes link but it’s worth repeating. 2 === “2” is false, 2 == “2” is true. A situation where this will cause a bug may be unlikely, but it would be very hard to track down.
On to TypeScript. Conveniently, there is a wonderful page for this too! https://learnxinyminutes.com/docs/typescript/
This one focuses on the differences between TypeScript and JavaScript, and is much smaller. The points to focus on:
The syntax for type declaration for variables and functions
Not shown is multi option types. If something could be a number or an array of numbers you could say let numThing: number | Array<number>;
Earlier it was mentioned that JavaScript is valid TypeScript. However if you paste some JavaScript into an existing TypeScript project, the compiler may complain about the types. To compensate, you may need to add on type definitions.
Interfaces
Not shown is a way to define object interfaces with generic properties. This means you can do something like:
        interface Thing {
                [key: string]: number | string;
}
This means an object that implements the Thing interface will always have keys that are strings, which will have values that are either numbers or strings.
If you get the error: Index signature of object type implicitly has an 'any' type, consider making an interface for that object.
Since you can use interfaces like types (let person: Thing = ...), you can also use them inside other interface declarations.
Classes
You can export classes without them being inside modules. You can see an example of this in the d0 bootstrap repo.
You can also export interfaces, so you don’t need to declare them multiple times to use them across files. You can do so like:
        import {Thing} from “./filename”;
Classes can be similarly imported like:
        import ClassName from “./filename”;
There is also a playground at https://www.typescriptlang.org/play/ if you want to try something outside your project

