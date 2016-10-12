# Deliverable 2: insightUBC Query Aggregation


In [Deliverable 1](Deliverable1.md) you built a query engine to answer queries about course offerings at UBC. Unfortunately, the data source for these queries had one real shortcoming: it contained data on a section-by-section basis rather than a course-by-course basis. The query language was also deficient in this regard, as you could not construct queries that would let you aggregate and compute values on the results of queries.

In this deliverable, you will extend the Deliverable 1 query engine to enable result computation (e.g., to figure out the average for a _course_ rather than the average for each _section_). You will also demonstrate that your source code is designed in a testable way.

This deliverable will be due on October 24 at noon.

## Dataset

The [dataset](Deliverable1.md#dataset) for this deliverable is unchanged from Deliverable 1.

## REST endpoints

The [REST endpoints](Deliverable1.md#rest-endpoints) for this deliverable are unchanged from Deliverable 1.

## Valid keys

There is one addition to the [valid keys](Deliverable1.md#valid-keys) from Deliverable 1.

* **courses_uuid**: ```string``` This is the unique id of a class offering. 

This is unfortunately confusing, but cannot be helped given the data source we already have. You can assume that the ```id``` field in each record in the ```courses``` dataset can be mapped to ```courses_uuid```. Just to be clear, this is _not_ ```courses_id``` which you mapped from the ```Course``` field.

## Query engine

The primary objective of this deliverable is to extend the [query language](Deliverable1.md#query-engine) to enable more comprehensive queries about the dataset we have previously imported. ```GET```, ```WHERE```, and ```AS``` are unchanged from Deliverable 1 (although ```GET``` has some new restrictions below). At a high level, the new functionality adds:

* ```GROUP```: Group the list of results into sets by some matching criteria.

* ```APPLY```: Perform calculations across a set of results.
  * ```MAX```: Find the maximum value of a field. For numeric fields only.
  * ```MIN```: Find the minimum value of a field. For numeric fields only.
  * ```AVG```: Find the average value of a field. For numeric fields only.
  * ```COUNT```: Count the number of unique occurrences of a field. For both numeric _and_ string fields.
  
* ```ORDER```: Order results on one or more columns.
  * ```UP```: Sort results ascending.
  * ```DOWN```: Sort results descending.

```
QUERY  ::='{' PREAMBLE ', ' QUERYBODY ', ' POSTAMBLE '}'

PREAMBLE ::= 'GET: [' string (',' string)* ']'                                   /* updated */
QUERYBODY ::= 'WHERE:'  FILTER | '{}'                                            /* updated */
POSTAMBLE ::= GROUP? APPLY? SORT? VIEW                                           /* updated */


SORT ::= 'ORDER: { dir:'  DIRECTION ', keys  : [ ' string (',' string)* ']},'    /* new */
DIRECTION ::= 'UP' | 'DOWN'                                                      /* new */
VIEW ::= 'AS: TABLE'                                                             /* new */

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

LOGICCOMPARISON ::= LOGIC ':[{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ':{' key ':' number '}'  
SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'  
NEGATION ::= 'NOT :{' FILTER '}'

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION) 

key ::= string '_' string
string ::= [a-zA-Z0-9,_-]+  
number ::= [1-9]*[0-9]+ ('.' [0-9]+ )?


GROUP ::= '[' key+ '],'                                                          /* new */
APPLY ::= '[' (string ': {' APPLYTOKEN ':' key '}')+ '],'                        /* new */
APPLYTOKEN ::= 'MAX' | 'MIN' | 'AVG' | 'COUNT'                                   /* new */
```

Here is some further clarification about the EBNF that might be helpful for validating and answering queries:

* An empty (```{}```) ```WHERE``` clause signals that all rows should be returned.

* ```GROUP: [term1, term2, ...]``` signifies that a group should be created for every unique set of all N-terms (e.g., ```[courses_dept, courses_id]``` would have a group for every unique pair of department/id records in the dataset. Every member of a ```GROUP``` always matches all terms in the ```GROUP``` array.

* ```GROUP``` and ```APPLY``` always appear together, and ```GROUP``` must contain at least one term (having each record in its own group does not make a lot of sense).

* If a ```GROUP``` is present, all ```GET``` terms must correspond to either ```GROUP``` terms or to terms defined in the ```APPLY``` block. ```GET``` terms with underscores must occur in ```GROUP``` while ```GET``` terms without underscores must be defined in ```APPLY```.

* ```APPLY``` enables the above listed computations on a group. The result of an ```APPLY``` should be a record containing the ```GROUP``` terms, and the terms defined by the ```APPLY```. ```MAX/MIN/AVG``` should only be requested of numeric keys, while ```COUNT``` just counts the number of rows in the group. The ```string``` in ```APPLY``` should be unique (no two ```APPLY``` targets should have the same name).

* ```ORDER``` matches on multiple fields; these are read from first to last (e.g., ```ORDER: {dir: 'up', keys: ['courses_dept', 'courses_id`]}``` will first sort on ```courses_dept``` and only use ```courses_id``` to break ties (e.g., to order courses that are all from within the same department). ```ORDER``` terms can also be terms defined in the ```APPLY``` block. Ordering should be according to the ```<``` operator in TypeScript/JavaScript, not by ```localeCompare``` or the default ```sort()``` implementation. Note: This ```ORDER``` format is different than in D1 (which just accepted a single string); your implementation should support both D1 and D2 syntax for the ```ORDER``` element.

* ```WHERE``` is completely independent of ```GROUP```/```APPLY```; your solution should not need to change, except to add support for ```courses_uuid```.

* An [alternate representation](Deliverable2_EBNF.xhtml) of the EBNF is also available.

## Query examples

```
# Find the average for all cpsc courses
{
    "GET": ["courses_id", "courseAverage"],
    "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
    "GROUP": [ "courses_id" ],
    "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
    "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
    "AS":"TABLE"
}

# Find the average for all courses in the university, sort up (hardest to easiest)
{
  	"GET": ["courses_dept", "courses_id", "courseAverage", "maxFail"],
  	"WHERE": {},
  	"GROUP": [ "courses_dept", "courses_id" ],
  	"APPLY": [ {"courseAverage": {"AVG": "courses_avg"}}, {"maxFail": {"MAX": "courses_fail"}} ],
  	"ORDER": { "dir": "UP", "keys": ["courseAverage", "maxFail", "course_dept", "courses_id"]},
    "AS":"TABLE"
}

# Find the courses offered the most times
{
  	"GET": ["courses_dept", "courses_id", "numSections"],
  	"WHERE": {},
  	"GROUP": [ "courses_dept", "courses_id" ],
  	"APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
  	"ORDER": { "dir": 'UP', "keys": ["numSections", "courses_dept", "courses_id"]},
    "AS":"TABLE"
}
```

## Testing

As we discussed in class, integration testing is slower, harder to debug, and harder to provision than unit tests. In Deliverable 1 we experienced some of this as AutoTest frequently encountered situations where ```Server``` was not being torn down correctly resulting in ```Addr in use``` errors. The reliance on the server also meant that a lot of code was tangled up in ```RouteHandler``` which was impossible to test with unit tests as it was tightly bound to ```Server```. We observed that most error handling problems (e.g., 201 vs 204 on ```PUT```) were caused by state problems that a unit test should have caught but was hard to write with the bootstrap design.  In D2 we are going to lightly refactor our code to conform to the following specification:

```
/*
 * This should be in the same folder as your controllers
 */
import {QueryRequest} from "./QueryController";

export interface InsightResponse {
    code: number;
    body: {}; // this is what you would return to a requestee in the REST body
}

export interface IInsightFacade {

    /**
     * Add a dataset to UBCInsight.
     *
     * @param id  The id of the dataset being added. This is the same as the PUT id.
     * @param content  The base64 content of the dataset. This is the same as the PUT body.
     *
     * The promise should return an InsightResponse for both fulfill and reject.
     * fulfill should be for 2XX codes and reject for everything else.
     */
    addDataset(id: string, content: string): Promise<InsightResponse>;

    /**
     * Remove a dataset from UBCInsight.
     *
     * @param id  The id of the dataset to remove. This is the same as the DELETE id.
     *
     * The promise should return an InsightResponse for both fulfill and reject.
     * fulfill should be for 2XX codes and reject for everything else.
     */
    removeDataset(id: string): Promise<InsightResponse>;

    /**
     * Perform a query on UBCInsight.
     *
     * @param query  The query to be performed. This is the same as the body of the POST message.
     * @return Promise <InsightResponse>
     * The promise should return an InsightResponse for both fulfill and reject.
     * fulfill should be for 2XX codes and reject for everything else.
     */
    performQuery(query: QueryRequest): Promise<InsightResponse>;
}}
```

You will implement ```IInsightFacade``` with an ```InsightFacade``` class in ```controller/InsightFacade.ts```. 
```InsightFacade``` should greatly reduce the complexity of your code in RouteHandler making it significantly easier for you to write unit tests for your code and more reliable for the tests we will be performing on your system. You can see a [bootstrap version](https://github.com/CS310-2016Fall/cpsc310project/blob/master/src/controller/IInsightFacade.ts) of the facade and an example of a [programmatic test](https://github.com/CS310-2016Fall/cpsc310project/blob/master/test/InsightFacadeSpec.ts) in the facade. We have also replaced the programmatic tests in the [bootstrap project](https://github.com/CS310-2016Fall/cpsc310project) from D1 with tests that are valid for D2 while being backwards compatible with D1 (they are all in the ```test/```) folder. A nice overview of using promises with Mocha can be found [here](https://mochajs.org/#working-with-promises).

This deliverable will have a slight change in assessment. The AutoTest suite will comprise 80% of your mark. The remaining 20% will be derived from your test coverage score for every class except ```Server``` and ```RouteHandler```. We will generate this score by running ```npm run cover``` and subtracting the statement coverage % from ```Server``` and ```RouteHandler``` from the rest of the code in the project. Your grade will correspond to the fraction your tests cover (e.g., 90% coverage will give you 18/20). Recognizing that hitting 100% will take more trouble than it is worth, we will give you a maximum 5% bonus for your coverage score, although you cannot get over 100% on this component. For example, if your coverage rate is 97% you will get 100%. If it is 76% you will get 81%. The oral exam component will apply to the AutoTest and Coverage values combined.

### Public & private test suites

There will not be a public test suite for this deliverable, ```InsightFacadeSpec.ts``` takes this role. The private suite should be released in a few days, we will make a post to Piazza when it is ready.

### Getting started

Regardless of how you did on D1, you are strongly advised to start with the ```InsightFacade``` refactor. This will make it so your code is easier to test. Next, write some tests for some D1 queries and make sure your system works. If you did not complete D1 this is especially important and is a better use of your time than continuing to work on D1 directly. Finally, work on GROUP and APPLY and their associated tests.
