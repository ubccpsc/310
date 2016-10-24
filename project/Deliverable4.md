# Deliverable 4: insightUBC UI

#### NOTE: These requirements subject to change; we are posting them early so you can have a preview of what is to come in the final deliverable (which has a pretty tight timeline). The spec will be firm by the Deliverable 3 due date (or earlier).

[Deliverable 1](Deliverable1.md) built a query engine to answer queries about UBC course sections. [Deliverable 2](Deliverable2.md) extended the query engine to aggregate answers about actual courses. [Deliverable 3](Deliverable3.md) extended the query engine to support details about course spaces on campus. Ultimately you have built a robust backend for quickly and flexibly querying a diverse dataset. This is a great foundation, but is not especially useable.

This deliverable will take advantage of this backend and using it for building an interface that can be used to perform meaningful tasks. You can use *any* frameworks you want (React, Angular, OnsenUI, jQuery), but are not required to use any frameworks if you want to work in pure JavaScript/TypeScript. You can also incorporate any online APIs you wish to use.

Your code should reside in ```src/rest/public``` and ```src/rest/views```. The code can be written in any language you want, as long as the UI renders in the browser and is backed by your REST backend. You cannot hard-code any of the data from your backend in your code, it should all be dynamically retrieved using queries to the ```POST``` endpoint (or any other endpoints you may add to your REST server). 

## Tasks

The key intent of these tasks is to provide a simple and intuitive UI for invoking your REST backend and for displaying data from it. It is not appropriate to ask users to write/view your query language, but other than this restriction you are free to develop whatever UI you would like.

1) **Course explorer (20%):** provide a usable interface for interacting with the ```courses``` dataset. It should be possible to query sections by various properties:

* Section size
* Department
* Course number
* Instructor
* Title

It should also be possible to explore various courses to see courses with the highest/lowest average, most sections, most passes, and most fails. These should be filterable by department, course number, course titles, and size thresholds.
	
2) **Room explorer (20%):** provide a usable interface for interacting with the ```rooms``` dataset. It should be possible to query rooms by various properties:

* Building name
* Room number
* Room size
* Room type
* Furniture type
* Location (e.g., distance from a given building)

3) **Room scheduling (40%):** provide a usable interface for scheduling specific courses into specific rooms. This is a hard problem, so your approach should use some heuristic to find a good schedule, rather than trying to find the 'best' one.

For example, given all CPSC courses and all rooms in DMP and PHARM where each course needs to be either in a 1h block MWF or a 90min block T/Th, what is the best schedule that can be made? Note: courses should start being scheduled at 8am and should be over before 5pm. If multiple sections of a course are being offered, they cannot be held concurrently (e.g., if there are two sections of 310 they cannot occur in different rooms but at the same time). 

The 'quality' of a schedule is determined by the fraction of classes that need to be scheduled outside 8am to 5pm. The 'size' of course should be determined by the number of pass + fail students in its largest section. The number of sections that need to be scheduled should be the number of sections in the last available year (2014) divided by three and rounded up to the nearest integer (aka if the number was 0 it should be 1, if it was 2.1 it should be 3).

Answering this kind of query will likely require multiple queries to your REST backend. Along with the potential schedule for each used room in your schedule result, you should also display the 'quality' measure and a list of the courses, their # of sections, and expected sizes.

As a reminder, the inputs should be:

* A list of courses (filterable by department and course #).
* A list of rooms (filterable by building name or distance from a building).

4) **Novel exploration (20%):** This final UI will be used to perform some novel task of your choosing. This task should use your REST endpoints (and any other data you need) to perform an _interesting_ and _useful_ task that would otherwise be difficult to perform manually. 


## Assessment

Each of the four above tasks have their values attached to the descriptions. Your solution will be demoed to the TA, but there should also be instructions in a file called ```UI.md``` that explain how to build and launch the UI (these do not need to be long, but should describe the required steps). 

Marks will be based on completeness (aka can your UI perform the listed functionality in a usable way). The final task will additionally be evaluated in terms of novelty.


