# Low level design

While high level design principles (like an emphasis on low coupling and high cohesion) provide broad guidance while considering design decisions, lower level design is about deriving concrete designs that can be directly implemented in programming languages. To accomplish this, low level design relies on more specific design guidance, although this guidance can be easily associated with the [high level design](readings/DesignPrinciples.md) principles that they codify. Three commonly used low level design principles are:

* _Encapsulate what varies_: A central low level design goal is to identify parts of the system prone to future modification, likely to need future extension, or could be reused in other contexts and encapsulate them to ease these future tasks.
* _Design to interfaces_: Coupling to concrete elements is the primary inhibitor to the above encapsulation; by designing our systems around interfaces, evolving or replacing concrete implementations becomes much more tractable.
* _Favour composition over inheritance_: While it is tempting in object-oriented languages to reuse functionality through inheritance, this means types must extend other concrete classes. While inheritance is a powerful tool and is often the best mechanism for a problem, composition and delegation is frequently a better choice for supporting long-term evolvability.

One of the most commonly used mechanism for creating low level designs are design patterns. While catalogs of software design patterns are relatively young (e.g., the Gang of Four published their [seminal work](http://tinyurl.com/yxzjjmng) on this subject in 1999), the power of using patterns for understanding diverse sets of data have been widely understood. For example, in Christopher Alexander's et. al.'s seminal book [_A pattern language_](https://en.wikipedia.org/wiki/A_Pattern_Language) on architectural patterns, the authors note that:

> “At this final stage, the patterns are no longer important: the patterns have taught you to be receptive to what is real.”

This is notable because it emphasizes that the important part of the pattern is not the pattern itself, but the commonly occurring problem the pattern solves or the commonly desired benefit the pattern imparts through its use. By focusing on these problems/benefits we are able to understand the key design problem we are trying to solve, rather than being distracted by the mechanism used to solve them.

Blindly forcing design patterns into inappropriate contexts is often worse than the code without the pattern applied. This is because most patterns work through additional abstraction layers which can make the system harder to understand and maintain. 

## Sub-topics

* [Design patterns](https://github.com/ubccpsc/310/blob/master/resources/readings/DesignPatterns.md)
* [MV*](https://github.com/ubccpsc/310/blob/master/resources/readings/MVStar.md)

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)


