(Note: This page is under editing, and will be until this note is removed - details may change)

# Deliverable 4: insightUBC UI

[Deliverable 1](Deliverable1.md) built a query engine to answer queries about UBC course sections. [Deliverable 2](Deliverable2.md) extended the query engine to aggregate answers about actual courses. [Deliverable 3](Deliverable3.md) extended the query engine to support details about course spaces on campus. Ultimately you have built a robust backend for quickly and flexibly querying a diverse dataset. This is a great foundation, but is not especially useable.

This deliverable will take advantage of this backend and using it for building an interface that can be used to perform meaningful tasks. You can use *any* frameworks you want (React, Angular, OnsenUI, jQuery), but are not required to use any frameworks if you want to work in pure JavaScript/TypeScript. You can also incorporate any online APIs you wish to use.

Your code should reside in ```src/rest/public``` and ```src/rest/views```. The code can be written in any language you want, as long as the UI renders in the browser and is backed by your REST backend. You cannot hard-code any of the data from your backend in your code, it should all be dynamically retrieved using queries to the ```POST``` endpoint (or any other endpoints you may add to your REST server). 

## Tasks

The key intent of these tasks is to provide a simple and intuitive UI for invoking your REST backend and for displaying data from it. It is not appropriate to ask users to write/view your query language, but other than this restriction you are free to develop whatever UI you would like (although building some kind of faceted search UI will probably easiest).

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
* Location (distance from a given building)

3) **Room scheduling (40%):** provide a usable interface for scheduling specific courses into specific rooms. This is a hard problem, so your approach should use some heuristic to find a good schedule, rather than trying to find the 'best' one.

For example, given all CPSC courses and all rooms in DMP and PHARM where each course needs to be either in a 1h block MWF or a 90min block T/Th, what is the best schedule that can be made? Note: courses should start being scheduled at 8am and should be over before 5pm. If multiple sections of a course are being offered, they cannot be held concurrently (e.g., if there are two sections of 310 they cannot occur in different rooms but at the same time). 

The 'quality' of a schedule is determined by the fraction of classes that need to be scheduled outside 8am to 5pm. The 'size' of course should be determined by the number of pass + fail students in its largest section that is not an overall section. The number of sections that need to be scheduled should be the number of sections in 2014 divided by three and rounded up to the nearest integer (aka if the number was 2.333 it should be 3).

Answering this kind of query will likely require multiple queries to your REST backend. Along with the potential schedule for each used room in your schedule result, you should also display the 'quality' measure and a list of the courses, their # of sections, and expected sizes.

As a reminder, the inputs should be:

* A list of courses (filterable by department and/or course #).
* A list of rooms (filterable by building name and/or distance from a building).

4) **Novel exploration (20%):** This final UI will be used to perform some novel task of your choosing. This task should use your REST endpoints (and any other data you need) to perform an _interesting_ and _useful_ task that would otherwise be difficult to perform manually. 


## Assessment

Each of the four above tasks have their values attached to the descriptions. Your solution will be demoed to the TA, but there should also be instructions in a file called ```UI.md``` that explain how to build and launch the UI (these do not need to be long, but should describe the required steps). 

Marks will be based on completeness (aka can your UI perform the listed functionality in a usable way). The final task will additionally be evaluated in terms of novelty.

## Contribution statement
 
In your repository, each teammate should commit a file called ```/D4-contrib_<GitHubId>.md```. This file should contain a short description of your concrete contributions to your D4 code. All that is required is a few sentences followed by links to some of your key Github commits (full links so we can click on them would be appreciated) for Deliverable 4. If you do not have any (or very few) commits, you may use additional space to explain your concrete contributions. This should be committed before you meet with your TAs in the lab as you will refer to this file in your meeting with them. As with D1, D2, and D3, your D4 deliverable score will be scaled by your contribution to the deliverable.

## Task checklist

For each of the main points below (numbered), your score will be a percentage of the completed tasks (bullets). Each task is worth 2 points: one for rudimentary functionality and one for polished functionality. The differentiation between the two will consider how errors are handled, whether the UI is easy to use, and how well it works (essentially did you do a good job implementing a feature or a bare minimum job). The score for the point is the fraction of completed tasks.


1. Course & Section exploration (20%)
 * Show all of the sections in department X.
 * Show all of the courses in department X ordered by [the most failing students || the most passing students || average grade].
 * Previous task, allow sorting by more than one field.
 * Find all the sections taught by instructor Y.
 * Show all of the key details for courses in the university with filters for course titles, department, and sizes.
 * Previous task, allow filtering by more than one field concurrently.
  
2. Room exploration (20%)
 * Show all rooms in building X.
 * Show all rooms within X meters of building X.
 * Show all rooms over size X.
 * Previous task within X meters of building X.
 * Show all rooms with type X or furniture X.
 * Previous task within X meters of building X.
 
3. Scheduling (40%)
 * Show you interface for selecting the subset of rooms to be used for the schedule.
 * Allow rooms to be filtered by building name AND/OR distance from building X.
 * Show you interface for selecting the subset of courses to be used for the schedule.
 * Allow courses to be filtered by department AND/OR course number. 
 * Show your interface for displaying a timetable.
 * Show that your scheduling algorithm correctly determines the right number of sections to schedule for the courses selected.
 * Show that your scheduling algorithm correctly determines the right number of seats for the sections being scheduled.
 * Show that the quality measure is being displayed for your schedule.

4. Novel contribution (20%)
 * Convince the TA that your task is *useful* and makes meaningful use of the data provided by your REST API.
 * Convince the TA that your task is *interesting* and makes meaningful use of the data provided by your REST API.
 
 
