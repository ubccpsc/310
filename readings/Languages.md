# Programming Languages

Programming languages define the vocabulary used to encode our ideas about what a computer should do in a format that a computer can understand. Programming languages represent the second half of the programming problem; that is, they define a format that the computer can understand:

> The process of transforming a mental plan of desired actions for a computer into a representation that can be understood by the computer. [Jean-Michel Hoc and Anh Nguyen-Xuan]

Programming languages have two main goals:

1) To provide a format that is understandable to humans as they encode their intent for the desired behaviour of a program; and

2) To provide a format that can be unambiguously understood by automated tools enabling the language to be transformed into more compact executable representations.

These two constraints are often in opposition to one another. There is a tension between making a programming language easy to read and understand by developers and making it imprecise for machine analysis and transformation. 

### Language properties

Syntax and semantics define the form and meaning of programming languages. The syntax of the language defines the grammar (tokens) and the legal order that these tokens can be used in valid programs. [EBNF](https://en.wikipedia.org/wiki/Extended_Backus-Naur_Form) is often used to define the legal syntax of a language precisely. In contrast to syntax, the semantics of the language capture the actual meaning of the ordered tokens. Some statements can be syntactically valid while being semantically meaningless (e.g., ```if (foo === foo)``` will always be true and has no semantic value, while still being syntactically correct).

Beyond syntax, developers frequently use small patterns, or idioms, that are common to a language. Examples for [JavaScript](http://javascript.crockford.com/style2.html), [TypeScript](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines), or [Java](http://c2.com/cgi/wiki?JavaIdioms) are provided for reference. Following common idioms, along with code style (like those enforced by linters for any programming language), and code conventions make it easier for people to understand and read your code. This is particularly important for large code bases as it helps make the code more consistent, easing navigation and program understanding tasks.

There is also an important distinction to be made between the static representation of a system (aka its source code) and the dynamic representation of a system (aka its runtime state and behaviour). This distinction is important because it is often not obvious from the source code how the code will execute at runtime (for example due to different code paths being invoked due to polymorphism). Another way to think of this is during debugging: while you can pause execution on a single breakpoint and get a view of the program at that instant in time, the true dynamic behaviour of a program is an aggregation of _all_ program states across all executions. This is one of the main challenges making understanding bug reports difficult.


### Learning new languages

While languages come in all shapes and sizes (e.g., strongly typed, weakly typed, dynamically typed, statically typed, functional, object-oriented) at their core they each try to satisfy the two main goals listed above. Although learning a new programming language can seem like a daunting task, languages all come from common pedigrees that make it easier to try to understand at a high level how the new language corresponds to your existing one.  This [great image](https://paradigmeprogrammation.files.wordpress.com/2013/05/paradigmsdiagrameng108.jpg) shows the conceptual lineages of many popular programming languages and can be helpful to recognize how similar many languages are in practice.

Being able to quickly self-learn new languages is a fundamental skill for all software engineers. Language choices are infrequently made, which means the vast majority of teams you join will already be using a set language that you will not have control over choosing (and may even be an internal language that has not been released). 

Consider the following three snippets:

#### Java
```java
public boolean isSplit(String input) {
	this.lastString = input;

	String[] parts = input.split(",");
	for (String s : parts) {
		System.out.println(s);
	}
	return parts.length > 0;
}

```

#### TypeScript
```typescript
public isSplit(input: string): boolean {
	this.lastString = input;

	let parts = input.split(",");
	for (var s of parts) {
		console.log(s);
	}
	return parts.length > 1;
}
```

#### JavaScript
```javascript
isSplit(input) {
	this.lastString = input;

	let parts = input.split(",");
	for (var s of parts) {
		console.log(s);
	}
	return parts.length > 1;
}
```

In these examples we can see that there are far more commonalities between these methods than differences. JavaScript is an untyped language, Java is a strongly typed language, and TypeScript augments JavaScript with type checking; even with these large underlying differences their syntax (and in this case even semantics) are nearly identical.


### References

* Gerald Sussman's [role of programming](https://www.youtube.com/watch?v=arMH5GjBwUQ) talk.

* A practical [article](https://www.siliconrepublic.com/enterprise/typescript-programming-javascript) on some TypeScript benefits in practice.

* Why you should learn [a new language](http://blog.cleancoder.com/uncle-bob/2016/09/01/TheLurn.html) every year.

---
![] (figures/CCSA.png "Creative Commons: Attribution-ShareAlike") [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
