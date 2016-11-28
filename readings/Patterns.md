# Design patterns

Design patterns are ways of structuring software to solve specific evolutionary problems. Every design pattern tries to improve upon some aspect of [design principles](Design.md).

Design patterns leverage existing design knowledge to enhance a system's ability to respond to future changes. Although it is easy to think about the pattern itself as the most important part of applying a design pattern, in practice the most important task is actually _thinking_ about what properties of the system are improved by the design pattern; this enables reasoning about both the strengths and weaknesses of the design in the face of some evolutionary task.

While design principles are a nice way to think about the mechanics of what each design pattern entails, sometimes it is more helpful to think about them from a lower level. At their core, all design patterns try to do one or more of the following:

* ***Encapsulate what varies***: By encapsulating what varies, the designer can try to ensure that appropriate abstractions are present in the system to ease future changes. 

* ***Design to interfaces***: Coupling classes through interfaces instead of concrete classes reduces the dependencies between classes, easing reusability and extensibility.

* ***Favour composition over inheritance***: While inheritance is great when only one aspect of the system varies, when changes demand more than one point of variability inheritance starts to suffer (or may not even be possible in languages that only support single inheritance). By leveraging composition, variations can be handled through delegation.

Blindly forcing design patterns into inappropriate contexts is often worse than the code without the pattern applied. This is because most patterns work through additional abstraction layers which can make the system harder to understand and maintain. 

Below we will describe a number of design patterns from a high level. For more details, a vast collection of resources can be found online.

### Observer

The observer design pattern enables one-to-many relationships between objects to be easily captured in code. The pattern also enables these relationships to be dynamically modified. The primary benefit of the pattern is that subjects that are being observed remain oblivious of the objects that are watching their changes. 

This pattern has one major design choice that needs to be made: whether the observers are _pushed_ the specific changes made to the subjects or whether they have to _pull_ them. In the push model, the subject calls ```notify``` with some representation of a change (e.g., in our example the ```notify``` call might be accompanied with the ball's position). This model assumes the Subject can always know the right data to send with the update.

In the pull model, the ```notify``` call is instead accompanied by the Subject itself (e.g., in ```Ball::stateChanged()``` there would be a call ```this.update(this);```). This enables the Observers to query the Subject to understand how it has changed, but requires that the Observers also know about the Subject's interface.

The ```Subject``` class often implements the add/remove/notify methods directly, but could itself extend a more generic base class that provides these features (e.g., the Java ```Observable``` class).

In the example below, the ```Ball``` remains unaware of the number, or composition, of the observers that are watching its updates. Whether one player is playing haki sack or 22 players and 3 refs are involved in a full game, the ball is oblivious. 
The example below uses the pull model: the ```notify``` call includes the ```Subject``` object so changes can be pulled.

<!--
Game analogy
http://www.codeproject.com/Articles/12183/Design-Your-Soccer-Engine-and-Learn-How-To-Apply-D

<img src="./figures/patterns-observer.png" width="512px" alt="observer diagram">
-->

<img src="./figures/patterns_observer-example.png" width="512px" alt="observer diagram">


### Strategy

The Strategy design pattern enables encapsulation of algorithms. This lets client programs depend on the algorithmic interface without having to depend (or know about) the concrete underlying implementation being used. This allows new algorithms to be easily defined and added to a system without changing any client code.

The strategy pattern is often used to avoid subclassing the client. In our example below, you could imagine ```Client``` being extended by ```CelsiusStrategy```, ```KelvinStrategy```, and ```FahrenheitStrategy```. While this would work, it would mean that ```Client``` would have to be changed to add a new form of temperature conversion. The pattern also supplants the even simpler approach whereby the code would have a series of conditional statements to choose the right temperature multiplier (which would also require ```Client``` changes to extend):

```
if (tempScheme === 'C') {
	...
} else if (tempScheme === 'F') { 
	...
} else if (tempScheme === 'K') {
	...
} else {
	...
}
```

In general, strategies are fairly constant at runtime (e.g., the concrete type of the underlying strategy will not frequently (or ever) change once it has been set). 

<!---
go with temperatures:

http://www.codeproject.com/Articles/13229/Implementing-Observer-Strategy-and-Decorator-Desig


<img src="./figures/patterns-strategy.png" width="512px" alt="strategy diagram">
-->

<img src="./figures/patterns_strategy-example.png" width="512px" alt="strategy diagram">


### State

XXX

<!--
From: https://jklunder.home.xs4all.nl/elisa/part05/Design%20Patterns/State.html

also cool: http://gameprogrammingpatterns.com/state.html

<img src="./figures/patterns-state.png" width="512px" alt="state diagram">
-->

<img src="./figures/patterns_state-example.png" width="512px" alt="state diagram">


### Facade

XXX

<!--
<img src="./figures/patterns-facade.png" width="512px" alt="facade diagram">
-->

Before:
<img src="./figures/patterns_facade-example_before.png" width="512px" alt="facade diagram">

After:
<img src="./figures/patterns_facade-example_after.png" width="512px" alt="facade diagram">

### Decorator

XXX

<!--
<img src="./figures/patterns-decorator.png" width="512px" alt="facade diagram">
-->

When life was simple:

<img src="./figures/patterns_decorator-example_a.png" width="320px" alt="decorator diagram">

When adding one more feature would kill the team:

<img src="./figures/patterns_decorator-example_b.png" width="512px" alt="decorator diagram">

Leveraging composition to save Christmas:

<img src="./figures/patterns_decorator-example_c.png" width="512px" alt="decorator diagram">

### Composite

XXX

<!--
<img src="./figures/patterns-composite.png" width="512px" alt="composite diagram">
-->

<img src="./figures/patterns_composite-example.png" width="320px" alt="composite diagram">

### Visitor

XXX

<!--
<img src="./figures/patterns-visitor.png" width="512px" alt="visitor diagram">
-->

<img src="./figures/patterns_visitor-example.png" width="512px" alt="visitor diagram">

<!--
Dropped due to lack of time:

### Command

<img src="./figures/patterns-command.png" width="512px" alt="command diagram">

<img src="./figures/patterns-command-example.png" width="512px" alt="command diagram">


### Builder

<img src="./figures/patterns-builder.png" width="512px" alt="builder diagram">

<img src="./figures/patterns-builder-example.png" width="512px" alt="builder diagram">
-->



### References

* XXX

* Repository of [many design patterns](https://github.com/torokmark/design_patterns_in_typescript) implemented in TypeScript.

---
![] (figures/CCSA.png "Creative Commons: Attribution-ShareAlike") [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
