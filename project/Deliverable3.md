# Project Sprint 3 (d3)

# TBD

<!--
NOTE: this will not be the same

# Deliverable 3: insightUBC Query Aggregation


In [Deliverable 1](Deliverable1.md) and [Deliverable 2](Deliverable2.md) you built a query engine to answer queries about course offerings and rooms at UBC. Unfortunately, the data sources for these queries had one real shortcoming: they contained data on a section-by-section basis or a room-by-room basis rather than a course-by-course or building-by-building basis. The query language was also deficient in this regard, as you could not construct queries that would let you aggregate and compute values on the results of queries.

In this deliverable, you will extend the Deliverable 1 and Deliverable 2 query engines to enable result computation (e.g., to figure out the average for a _course_ rather than the average for each _section_ or figure out the number of seats for a _building_ rather than for a single _room_). You will also demonstrate that your source code is designed in a testable way.

The second part of this deliverable will involve adapting your project to provision REST endpoints so that your project can be used by remote clients. This will be crucial for Deliverable 4 and will demonstrate how traditional programs can be adapted into web-based services.

The deadline for this deliverable is March 13 @ 0800.

## Dataset

The datasets from this deliverable are unchanged from Deliverable 1 and 2.

## REST endpoints

You will adapt your existing ```InsightFacade``` to also be accessed using REST endpoints. Both ```InsightFacade``` and the REST endpoints must continue to work independently. You will note that the REST descriptions below correspond closely to the values you are already surfacing from ```InsightFacade```.

* **```GET /```** returns the query interface for the UI; this is only provided for your convenience and will not be tested. This will be a part of your D4, but you might as well get the wiring in for this now.

* **```PUT /dataset/:id```** allows to submit a zip file that will be parsed and used for future queries. The zip file content will be sent 'raw' as a buffer, you will need to convert it to base64 server side. 
* Response Codes and message formats:
     * ```204```: Same as for 204 in ```InsightFacade::addDataset(..)```.
     * ```201```: Same as for 201 in ```InsightFacade::addDataset(..)```.
     * ```400```: Same as for 400 in ```InsightFacade::addDataset(..)```.

* **```DELETE /dataset/:id```** deletes the existing dataset stored. 
 * This will delete both disk and memory caches for the dataset for the ```id``` meaning that subsequent queries for that ```id``` should fail unless a new ```PUT``` happens first.
 * Response Codes and message formats:
     * ```204```: Same as for 204 in ```InsightFacade::removeDataset(..)```.
     * ```404```: Same as for 404 in ```InsightFacade::removeDataset(..)```.

The ```:id``` portion of the ```PUT``` and ```DELETE``` endpoints represent a variable name that is extracted from the endpoint URL. For the URL ```http://localhost:4321/dataset/courses```, ```courses``` is the ```id```.

* **```POST /query```** sends the query to the application. The query will be in JSON format in the post body. 
 * NOTE: the server may be shutdown between the ```PUT``` and the ```POST```. This endpoint should always check for a persisted data structure on disk before returning a missing dataset error.
 * Response Codes and message formats:
     * ```200```: Same as for 200 in ```InsightFacade::performQuery(..)```.
     * ```424```: Same as for 424 in ```InsightFacade::performQuery(..)```.
     * ```400```: Same as for 400 in ```InsightFacade::performQuery(..)```.
    
## Valid keys

The valid keys from Deliverable 1 and Deliverable 2 are unchanged.

## Query engine

The primary objective of this deliverable is to extend the [query language](Deliverable1.md#query-engine) to enable more comprehensive queries about the dataset we have previously imported. ```COLUMNS```, ```WHERE```, and ```VIEW``` are unchanged from Deliverable 2 (although ```COLUMNS``` has some new restrictions below). At a high level, the new functionality adds:

* ```GROUP```: Group the list of results into sets by some matching criteria.

* ```APPLY```: Perform calculations across a set of results.
  * ```MAX```: Find the maximum value of a field. For numeric fields only.
  * ```MIN```: Find the minimum value of a field. For numeric fields only.
  * ```AVG```: Find the average value of a field. For numeric fields only.
  * ```SUM```: Find the sum of a field. For numeric fields only.
  * ```COUNT```: Count the number of unique occurrences of a field. For both numeric _and_ string fields.
  
* ```SORT```: Order results on one or more columns.
  * ```UP```: Sort results ascending.
  * ```DOWN```: Sort results descending.

```
QUERY ::='{'BODY ', ' OPTIONS  (', ' TRANSFORMATIONS)? '}'

BODY ::= 'WHERE: {' (FILTER)? '}'
OPTIONS ::= 'OPTIONS: {' COLUMNS ', ' (SORT ', ')? VIEW '}'
TRANSFORMATIONS ::= 'TRANSFORMATIONS: {' GROUP ', ' APPLY '}'

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION)

LOGICCOMPARISON ::= LOGIC ': [{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ': {' key ':' number '}'  
SCOMPARISON ::= 'IS: {' key ': ' [*]? string [*]? '}'  
NEGATION ::= 'NOT: {' FILTER '}'

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

COLUMNS ::= 'COLUMNS:[' (string ',')* string ']' 
SORT ::= 'ORDER: ' ('{ dir:'  DIRECTION ', keys: [ ' string (',' string)* ']}' | key) 
DIRECTION ::= 'UP' | 'DOWN'  
VIEW ::= 'FORM: TABLE'  

GROUP ::= 'GROUP: [' (key ',')* key ']'                                                          
APPLY ::= 'APPLY: [' (APPLYKEY (', ' APPLYKEY )* )? ']'  
APPLYKEY ::= '{' string ': {' APPLYTOKEN ':' key '}}'
APPLYTOKEN ::= 'MAX' | 'MIN' | 'AVG' | 'COUNT' | 'SUM'                           
```

Here is some further clarification about the EBNF that might be helpful for validating and answering queries:

* **NEW** ```APPLY``` keys are not allowed to contain the `_` character.

* ```number``` and ```string``` are valid JavaScript ```number```/```string``` values. Note, some ```string```s require escaping if you are using them as keys in JSON. 

* An empty (```{}```) ```WHERE``` clause signals that all rows should be returned.

* ```GROUP: [term1, term2, ...]``` signifies that a group should be created for every unique set of all N-terms (e.g., ```[courses_dept, courses_id]``` would have a group for every unique pair of department/id records in the dataset. Every member of a ```GROUP``` always matches all terms in the ```GROUP``` array.

* ```GROUP``` and ```APPLY``` always appear together, and ```GROUP``` must contain at least one term (having each record in its own group does not make a lot of sense).

* If a ```GROUP``` is present, all ```COLUMNS``` terms must correspond to either ```GROUP``` terms or to terms defined in the ```APPLY``` block. ```COLUMNS``` terms with underscores must occur in ```GROUP``` while ```COLUMNS``` terms without underscores must be defined in ```APPLY```.

* ```APPLY``` enables the above listed computations on a group. The result of an ```APPLY``` should be a record containing the ```GROUP``` terms, and the terms defined by the ```APPLY```. 

* ```MAX/MIN/AVG``` should only be requested of numeric keys, while ```COUNT``` counts the number of unique rows in the group (according to the specified key). The ```string``` in ```APPLY``` should be unique (no two ```APPLY``` targets should have the same name). ```AVG``` should return a number rounded to two decimal places, ```COUNT``` should return whole numbers, and ```MIN/MAX``` should return the same number that is in the originating dataset. 

* ```SORT``` matches on multiple fields; these are read from first to last (e.g., ```ORDER: {dir: 'up', keys: ['courses_dept', 'courses_id`]}``` will first sort on ```courses_dept``` and only use ```courses_id``` to break ties (e.g., to order courses that are all from within the same department)). ```SORT``` terms can also be terms defined in the ```APPLY``` block. Ordering should be according to the ```<``` operator in TypeScript/JavaScript, not by ```localeCompare``` or the default ```sort()``` implementation. Note: This ```ORDER``` format is different than in D1 and D2(which just accepted a single string); your implementation should support both D1 and D2 syntax for the ```SORT``` element.

* ```WHERE``` is completely independent of ```GROUP```/```APPLY```; your solution should not need to change.

* Supporting ```AVG``` requires some extra challenges compared to the other operators. Since JavaScript numbers are represented by floating point numbers, performing this arithmetic can return different values depending on the order the operations take place. To account for this please take the following protections (this is not great, but works for the data in this deliverable). 
  1. Multiply all values (```x = x  * 10;```) being averaged by 10.
  1. Trim the resulting value (```x = Number(x.toFixed(0))```).
  1. Add the numbers being averaged (e.g., generate ```total```).
  1. Calculate the average (```var avg = total / numRows```).
  1. Divide by 10 (```var avg = avg / 10```);
  1. Trim the decimals (```var res = Number(avg.toFixed(2))```).


## Query examples

Query A:

```
{
    "WHERE": {
        "AND": [{
            "IS": {
                "rooms_furniture": "*Tables*"
            }
        }, {
            "GT": {
                "rooms_seats": 300
            }
        }]
    },
    "OPTIONS": {
        "COLUMNS": [
            "rooms_shortname",
            "maxSeats"
        ],
        "ORDER": {
            "dir": "DOWN",
            "keys": ["maxSeats"]
        },
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["rooms_shortname"],
        "APPLY": [{
            "maxSeats": {
                "MAX": "rooms_seats"
            }
        }]
    }
}
```

Response A:

```
{
    "render": "TABLE",
    "result": [{
        "rooms_shortname": "OSBO",
        "maxSeats": 442
    }, {
        "rooms_shortname": "HEBB",
        "maxSeats": 375
    }, {
        "rooms_shortname": "LSC",
        "maxSeats": 350
    }]
}
```

Query B:

```
{
    "WHERE": {},
    "OPTIONS": {
        "COLUMNS": [
            "rooms_furniture"
        ],
        "ORDER": "rooms_furniture",
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["rooms_furniture"],
        "APPLY": []
    }
}
```

Response B:

```
{
    "render": "TABLE",
    "result": [{
        "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tablets"
    }, {
        "rooms_furniture": "Classroom-Hybrid Furniture"
    }, {
        "rooms_furniture": "Classroom-Learn Lab"
    }, {
        "rooms_furniture": "Classroom-Movable Tables & Chairs"
    }, {
        "rooms_furniture": "Classroom-Movable Tablets"
    }, {
        "rooms_furniture": "Classroom-Moveable Tables & Chairs"
    }, {
        "rooms_furniture": "Classroom-Moveable Tablets"
    }]
}
```

## Testing

The [testing](Deliverable2.md#testing) requirements and grading provisions for this deliverable are unchanged from Deliverable 2.

## Contribution statement
 
In your repository, each teammate should commit a file called ```/D3-contrib_GitHubId.md```. This file should contain a short description of your concrete contributions to your D2 code. All that is required is a few sentences followed by links to some of your key GitHub commits (full links so we can click on them would be appreciated) for Deliverable 2. If you do not have any (or very few) commits, you may use additional space to explain your concrete contributions. This should be committed before you meet with your TAs in the lab as you will refer to this file in your meeting with them.
 
It would also be helpful if the first two lines of the file contained your final test pass rate on the deadline and your code coverage rate (computed as described in the Deliverable 1 document). Remember, attendance in the lab the week of due date is mandatory so the TAs can do your retrospective evaluation; failure to attend will result in a retrospective score of 0.
 
 -->
