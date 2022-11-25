# MV*

Patterns are rarely used in isolation. MVC is a widely used meta-pattern that employs several other design patterns. Learning how MVC works is important for understanding how many common UI frameworks were designed. MVP and MVVM, two more recent modifications to MVC, are increasingly common in practice as they provide enhanced testability and decrease the amount of boilerplate code required in web and mobile application development.

### MVC

Model View Controller (MVC) was first popularized with the Smalltalk-80 language. MVC was created to help developers think about how to decouple responsibilities within Smalltalk applications. This guidance has proven so successful that it has been widely adopted by many modern UI frameworks. 

Since interfaces change more frequently than their backend data models and business logic, it is helpful for front-end development to be more decoupled from other development activities. This is especially important once front-end and back-end tasks are being performed by different teams (which is common given the particular skills required for each). By decoupling views and logic, MVC enables front-end teams (including designers) to work independently from the rest of the team. MVC splits responsibilities into three broad groups: the model, the view, and the controller.

###### Model

The model is the programmatic representation of the application's data. While the model does not typically know how to display itself, it often contains functionality for persisting (and loading) itself from permanent storage, along with the ability to validate its correctness (and ensure it does not get put in an inconsistent state). Using concrete model objects eases program comprehension tasks by allowing interfaces for the model elements to be well documented. Model objects are typically subjects in the observer pattern.

###### View

The View is primarily responsible for rendering the Model for presentation to the user. Users interact with and manipulate the view in order to change the model. The view does not itself store data or maintain state and is often updated independently from the Controller or the Model. Views often declare an interface allowing different Views to work for the same task (e.g., a DesktopView and a MobileView). The View acts as the Observer for the subject models in the observer pattern.

###### Controller

The Controller contains the main application logic for the system and binds the View to the Model. The Controller mediates how the Model is updated when the user performs actions in the View. Controllers are typically tightly bound to the View interface. While the controller often feels like it is just passing data between the View and the Model, it is extremely important that all application logic be placed here instead of the View to ensure that alternate implementations of the View interface have the same runtime behaviour. This also enables Controller test effort to be amortized across all views.

MVC topology:

<img src="./figures/patterns_mvc.png" width="512px" alt="mvc">

At runtime, MVC works as follows (for a user View update).

1. The View notifies the Controller of the change.
1. The Controller modifies the Model as required.
1. The Model, which is the subject in the observer pattern, notifies all of its observers that it has changed.
1. The View, acting as the observer in the pattern, receives the notify event. Since MVC typically uses a pull-based observer pattern it then queries the Model object to understand the nature of the change and updates itself as required.

Below is a simple MVC example that clarifies that multiple view options are available to the controller (although typically only one of them is bound at a time).

<img src="./figures/patterns_mvc-example.png" width="640px" alt="mvc">

MVC has two primary drawbacks.

1. Views tend to get out of control (MVC's derisive nickname is _MassiveViewController_) because it is often easiest to put functionality within the view (instead of in the Controller). This leads to huge views and anemic controllers. Heavy views are also harder to test than heavy controllers because view logic tends to get mixed up with display logic, forcing error-prone UI-based testing approaches to be used instead of more traditional unit tests which would typically be sufficient for the controller alone.
1. Every component talks to every other component. This is especially apparent with the Model: if it is meaningfully changed all components will need to be updated. This lack of isolation has a negative impact on the maintainability and extensibility of the system. 

That said, MVC does enable:

1. Collaborative views; many views can render the same model in their own unique way.
1. Enhanced maintainability due to the ease with which new views can be added (if existing views have kept their logic in the Controller).
1. Team splitting by enabling designers, UX, and front-end teams to concentrate their work in the Views.
1. Enhanced testability by trying to isolate application logic within the controller.

### MVP

Model View Presenter (MVP) was popularized by Google and was heavily used within its GWT framework (and has subsequently been extended to many other web-based UI frameworks). The primary difference in MVP from MVC is that the Model is isolated from the View, and Views are more stringently minimal in MVP than in MVC to enhance testability and avoid heavyweight views.

###### Model

The Model is relatively unchanged between MVP and MVC, except that it often uses an [event bus](https://github.com/google/guava/wiki/EventBusExplained) to communicate with the rest of the system. Using an EventBus allows for more fine-grained observation and makes it easier to debug update notifications at runtime.

###### View

The view is significantly simpler in MVP than MVC. Most notably, the view _never_ sees Model objects. This means that the Presenter _must_ mediate all View/Model interactions. Another important difference is that the View only deals with primitive types (e.g., Number and String (and arrays of Number and String) in TypeScript). This is for two reasons:

1. Since the View only sends/receives primitive types it is hard to put complex logic in the view, this ensures that the Presenter is the main location for all program logic.
1. Views become correspondingly similar and are often validated 'correct by inspection' since they are just rendering primitive types.
1. Finally, since the view only gets primitives, the Presenter has to mediate its interaction with the View using primitive types which are easy to ```assert``` or ```expect``` with traditional unit testing frameworks.

###### Presenter

Presenters in MVP play the role Controllers were always meant to play in MVC: that is, they _actually_ contain all of the application logic. Presenters tend to be complex, but are easily unit tested given the nature of the communication path with the View. Together with a mock view, the Presenters can often be tested with traditional unit testing approaches without requiring a fake UI to be spun up (e.g., the MockView can just be a regular object, it does not need access to the DOM or any other window-specific features).

The View and Presenter interfaces are tightly bound to each other; this is because each needs to know the public interface of the other to enable communication. 

```typescript
// sample view/presenter interface
public interface IView {
	public setPresenter(p: IPresenter);
	public showMain();

	public interface IPresenter {
		public onCancel();
		public onAction(action: String);
		public createView(): IView;
	}
}
```

<img src="./figures/patterns_mvp.png" width="512px" alt="mvp">

A more typical MVP design is shown below. In this example, ```ViewPresenter``` and ```OutlinePresenter``` each have one View associated with them (but this view could be set to any of the available options, depending on the runtime circumstance). Updates to the controller are optionally mediated by an ```EventBus```, while the ```AppController``` is responsible for dynamically starting and stopping the Presenters and configuring the View each Presenter is bound to (```AppController``` often listens to lifecycle event queues from the ```EventBus```).

At runtime, MVP works as follows (for a user View update).

1. The View notifies the Presenter of the change; the data passed between the View and Presenter consists only of method calls with primitive parameter types.
1. The Presenter modifies the Model as required.
1. The Model, which is the subject in the observer pattern notifies all of its observers that it has changed.
1. The EventBus (or the Presenter, if an EventBus is not being used), acting as the observer in the pattern, receives the notify event. 
1. The Presenter determines how the View should be updated and refreshes it as required, although again only with primitive values.

<img src="./figures/patterns_mvp-example.png" width="640px" alt="mvp">

Compared to MVC, MVP is more testable, and minimizes bloated views. Also while MVP still uses the observer to track changes to the Model, the EventBus makes it easier to keep track of updates within the system (as does the fact that the views are not receiving these updates directly). MVP's main downside is that the views tend to contain a lot of boilerplate primitive code that just updates UI widgets with values and calls methods within the Presenter in response to user actions. 

### MVVM

Model View ViewModel is the most recent in this line of popular extensions to MVC. MVVM further cements the connection between the view and its controller by considering them a single unit. Unlike MVP though, the View typically uses [data binding](https://msdn.microsoft.com/en-us/library/ms752347(v=vs.110).aspx#Anchor_1) to allow data values to automatically update UI representations. This greatly decreases the amount of boilerplate code written by the developer. 

In MVVM the ViewModel acts more like the Presenter in MVP and contains most of the application logic for the system, where the ViewController instead focuses on preparing data in a way that is amenable for data binding (and responding to user-driven events appropriately).

<img src="./figures/patterns_mvvm.png" width="512px" alt="mvvm">

<!--
TODO: add data binding example here
-->

### References

* Short [overview](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html) from the creator of MVC.

* Succinct [rationale](http://www.teehanlax.com/blog/model-view-viewmodel-for-ios/) for MVVM.

* MVP [document](http://www.wildcrest.com/Potel/Portfolio/mvp.pdf).

<!-- 
other links:
http://www.teehanlax.com/blog/model-view-viewmodel-for-ios/
-->

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
