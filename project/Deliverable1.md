# Deliverable 1: insightUBC Query Engine

UBC has a wide variety of courses. This deliverable will focus on importing data about these courses into your project and enabling flexible querying over these data with a flexible domain-specific query language.

This deliverable will be completed in pairs. It is worth 10% of your final grade. You will not have to hand anything in; we will pull from your project repo at noon on October 3, 2016. If you have not specified your team yet, please do so at [http://skaha.cs.ubc.ca:8020](http://skaha.cs.ubc.ca:8020). We will create project repos every morning between 0900-1000; all work must take place in this repo (for all four deliverables). You **must** specify your team by 1600 on September 23. We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own.

You are responsible for the software design and implementation that provides the REST endpoints described below. You cannot use any library package that is not already specified in ```package.json```, nor can you use any of the libraries in ```src/rest/public```. Your implementation must be in TypeScript, ES5 JavaScript, or CoffeeScript (or some combination thereof). While we will not be directly examining your source code, you will undoubtably end up showing it to the TAs as you explain your design in the post-submission debrief that will take place in lab Oct 4-7).

## Dataset

This data has been obtained from [UBC PAIR](http://pair.ubc.ca/) and has not been modified in any way. The data is provided as a zip file: inside of the zip you will find a file for each of the courses offered at UBC. Each of those file contains JSON object containing the information about each offering of the course. 

The bootstrap project you will be provided with already has the implementation to load the data from the zip, but you will need to parse it in an adequate data structure of your choice. 

You are **not** allowed to store the data in a database, but you are encouraged to process the data into a format of your choosing that you can persist (cache) to disk for quicker or more convenient access. Make sure you do not commit this cached file to version control or AutoTest will figure it out and tests will fail in ways you do not expect.

You are **not** allowed to modify the data in any way other than to convert it to the data structure. Your implementation will be tested with the original copy of the dataset, so any modification will most likely lead to tests failing.

## REST endpoints

The deliverable relies on the following [REST endpoints](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm):

* **```GET /```** returns the query interface for the UI; this is only provided for your convenience and will not be tested.

* **```PUT /dataset/:id```** allows to submit a zip file that will be parsed and used for future queries. The zip file content will be sent in base64 in the ```PUT``` body. 
 * The dataset will be in a format designed to be transferred, not a format amenable to easy searching. After receiving the dataset, it should be processed into a data structure of your design. 
 * The processed data structure should be persisted to disk; your system should be able to load this persisted value into memory for answering queries. 
 * Ultimately, a dataset must be ```PUT``` **or** loaded from disk before queries can be successfully answered.
 * Response Codes and message formats:
     * ```204```: the operation was successful and the ```id``` was new (not ```PUT``` in this session or was previously cached).
     * ```201```: the operation was successful and the ```id``` already existed (was ```PUT``` in this session or was previously cached).
     * ```400```: the operation failed. The body should contain ```{error: 'my text'}``` to explain what went wrong.

* **```DELETE /dataset/:id```** deletes the existing dataset stored. 
 * This will delete both disk and memory caches for the dataset for the ```id``` meaning that subsequent queries for that ```id``` should fail unless a new ```PUT``` happens first.
 * Response Codes and message formats:
     * ```204```: the operation was successful.
     * ```404```: the operation was unsuccessful because the delete was for a resource that was not previously ```PUT```.

The ```:id``` portion of the ```PUT``` and ```DELETE``` endpoints represent a variable name that is extracted from the endpoint URL. For the URL ```http://localhost:4321/dataset/courses```, ```courses``` is the ```id```. You can see in ```RouteHandler``` how the ```id``` variable is extracted and used.

* **```POST /query```** sends the query to the application. The query will be in JSON format in the post body. 
 * Query term prefixes (e.g. ```courses```) will correspond to the dataset required by the query. These prefixes correspond exactly t the ```id``` in the ```PUT``` endpoint.
 * NOTE: the server may be shutdown between the ```PUT``` and the ```POST```. This endpoint should always check for a persisted data structure on disk before returning a missing dataset error.
 * Response Codes and message formats:
     * ```200```: the query was successfully answered. The result should be sent in JSON according in the response body.
     * ```424```: the query failed because it depends on a resource that has not been ```PUT```. The body should contain ```{missing: ['id1', 'id2'...]}```.
     * ```400```: the query failed; body should contain ```{error: 'my text'}``` providing extra detail.

You will not have to modify the ```GET /``` endpoint. The ```PUT /dataset/:id``` and ```POST /query``` endpoint skeletons have been provided, but you will have to implement them. ```DELETE /dataset/:id``` is not implemented at all; you will have to add this from scratch.

The UI is already provided in the project. There is nothing to gain from modifying it as we will not test any of the UI code and will only interact with your system through the endpoints specified above.

A [status code reference](https://httpstatuses.com/) is available if you want to learn about other status codes.

## Query Engine

The goal of the deliverable is to build the backend to reply to query about the dataset. The query will be based on the EBNF described below. Note, this EBNF is for the WHERE portion of the query only.

### WHERE [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form)  

*Note: this EBNF is not complete and will be extended in future deliverables*
*Number and string are Javascript types.*  
```
QUERY  ::='{' PREAMBLE ', ' QUERYBODY ', ' POSTAMBLE '}'

PREAMBLE ::= 'GET: [' key (',' key)* ']'
QUERYBODY ::= 'WHERE:'  FILTER 
POSTAMBLE ::= ('ORDER:' key ', ')? 'AS: TABLE'

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

LOGICCOMPARISON ::= LOGIC ':[{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ':{' key ':' number '}'  
SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'  
NEGATION ::= 'NOT :{' FILTER '}'

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION)
VIEW ::= 'TABLE'  

key ::= string '_' string
string ::= [a-zA-Z0-9,_-]+  
number ::= [1-9]*[0-9]+ ('.' [0-9]+ )?
```

### PREAMBLE

```'GET': [ key* ]``` // specify the columns in the final query as an array of strings


### POSTAMBLE

```'ORDER': key``` // string is the column name to sort on; the string _must_ be in the ```GET``` array or the query is invalid

```'AS': 'TABLE'``` // specifies the return format (see examples below)

###Valid keys

In order to maintain readability of the queries, you are not allowed to use the key contained in data. Rather, you will have to build a vocabulary that will translate the keys in the query to the keys that you will use to query the data.
Valid keys are composed by two parts, separated by an underscore. For this deliverable, the first part will always be ```courses```; this will correspond to the ```id``` provided to the ```PUT``` endpoint. The second part is the key itself is.
The list of valid keys is:

The queries you will run will be using the following keys:

* **courses_dept**: ```string```; The department that offered the course.
* **courses_id**: ```string```; The course number (will be treated as a string (e.g., 499b)).
* **courses_avg**: ```number```; The average of the course offering.
* **courses_instructor**: ```string```; The instructor teaching the course offering.
* **courses_title**: ```string```; The name of the course.
* **courses_pass**: ```number```; The number of students that passed the course offering.
* **courses_fail**: ```number```; The number of students that failed the course offering.
* **courses_audit**: ```number```; The number of students that audited the course offering.

Note: these keys are different than may be present in the data. Since you are not allowed to modify the data, you will have to come up with a way to translate them.

#### Query example

Two simple queries are shown below:

##### Simple query
```
{
	"GET": ["courses_dept, courses_avg"],
	"WHERE": {
		"GT": {
			"courses_avg": 90
		}
    },
	"ORDER": "courses_avg",
	"AS": "TABLE"
}
```

The result for this would look like:

```
{ render: 'TABLE',
  result:
   [ { courses_dept: 'cnps', courses_avg: 90.02 },
     { courses_dept: 'dhyg', courses_avg: 90.03 },
     { courses_dept: 'epse', courses_avg: 90.03 },
     { courses_dept: 'epse', courses_avg: 90.05 },
     { courses_dept: 'kin', courses_avg: 90.05 },
     { courses_dept: 'kin', courses_avg: 90.05 },
     { courses_dept: 'epse', courses_avg: 90.05 },
     { courses_dept: 'edcp', courses_avg: 90.06 },
     { courses_dept: 'civl', courses_avg: 90.06 },
     { courses_dept: 'edst', courses_avg: 90.06 },
     { courses_dept: 'nurs', courses_avg: 90.06 },
     { courses_dept: 'edst', courses_avg: 90.06 },
     { courses_dept: 'civl', courses_avg: 90.06 },
     { courses_dept: 'sowk', courses_avg: 90.06 },
     { courses_dept: 'edst', courses_avg: 90.06 },
     { courses_dept: 'edst', courses_avg: 90.06 },
     { courses_dept: 'sowk', courses_avg: 90.06 },
     { courses_dept: 'psyc', courses_avg: 90.06 },
     { courses_dept: 'psyc', courses_avg: 90.06 },
     { courses_dept: 'cnps', courses_avg: 90.06 },
     { courses_dept: 'cnps', courses_avg: 90.06 },
     { courses_dept: 'edcp', courses_avg: 90.06 },
     { courses_dept: 'nurs', courses_avg: 90.06 },
     { courses_dept: 'cnps', courses_avg: 90.07 },
     { courses_dept: 'epse', courses_avg: 90.07 },
     { courses_dept: 'pcth', courses_avg: 90.07 },
     { courses_dept: 'educ', courses_avg: 90.07 },
     { courses_dept: 'eece', courses_avg: 90.07 },
     { courses_dept: 'eece', courses_avg: 90.07 },
     { courses_dept: 'pcth', courses_avg: 90.07 },
     { courses_dept: 'epse', courses_avg: 90.07 },
     { courses_dept: 'nurs', courses_avg: 90.07 },
     { courses_dept: 'nurs', courses_avg: 90.07 },
     { courses_dept: 'epse', courses_avg: 90.07 },
     { courses_dept: 'eece', courses_avg: 90.07 },
     { courses_dept: 'econ', courses_avg: 90.07 },
     { courses_dept: 'econ', courses_avg: 90.07 },
     { courses_dept: 'eece', courses_avg: 90.07 },
     { courses_dept: 'eosc', courses_avg: 90.08 },
     { courses_dept: 'epse', courses_avg: 90.08 },
     { courses_dept: 'etec', courses_avg: 90.08 },
     { courses_dept: 'dhyg', courses_avg: 90.08 },
     { courses_dept: 'plan', courses_avg: 90.08 },
     { courses_dept: 'plan', courses_avg: 90.08 },
     { courses_dept: 'dhyg', courses_avg: 90.08 },
     { courses_dept: 'etec', courses_avg: 90.09 },
     { courses_dept: 'epse', courses_avg: 90.09 },
     { courses_dept: 'bioc', courses_avg: 90.1 },
     { courses_dept: 'bioc', courses_avg: 90.1 },
     { courses_dept: 'epse', courses_avg: 90.1 },
     { courses_dept: 'lled', courses_avg: 90.1 },
     { courses_dept: 'phar', courses_avg: 90.1 },
     { courses_dept: 'phar', courses_avg: 90.1 },
     { courses_dept: 'cons', courses_avg: 90.1 },
     { courses_dept: 'etec', courses_avg: 90.1 },
     { courses_dept: 'etec', courses_avg: 90.1 },
     { courses_dept: 'cons', courses_avg: 90.1 },
     { courses_dept: 'civl', courses_avg: 90.11 },
     { courses_dept: 'civl', courses_avg: 90.11 },
     { courses_dept: 'audi', courses_avg: 90.11 },
     { courses_dept: 'spph', courses_avg: 90.11 },
     { courses_dept: 'edcp', courses_avg: 90.11 },
     { courses_dept: 'path', courses_avg: 90.11 },
     { courses_dept: 'audi', courses_avg: 90.11 },
     { courses_dept: 'epse', courses_avg: 90.11 },
     { courses_dept: 'epse', courses_avg: 90.11 },
     { courses_dept: 'audi', courses_avg: 90.12 },
     { courses_dept: 'audi', courses_avg: 90.12 },
     { courses_dept: 'cnps', courses_avg: 90.12 },
     { courses_dept: 'surg', courses_avg: 90.13 },
     { courses_dept: 'sowk', courses_avg: 90.13 },
     { courses_dept: 'surg', courses_avg: 90.13 },
     { courses_dept: 'sowk', courses_avg: 90.13 },
     { courses_dept: 'econ', courses_avg: 90.13 },
     { courses_dept: 'medg', courses_avg: 90.13 },
     { courses_dept: 'econ', courses_avg: 90.13 },
     { courses_dept: 'medg', courses_avg: 90.13 },
     { courses_dept: 'educ', courses_avg: 90.14 },
     { courses_dept: 'edcp', courses_avg: 90.14 },
     { courses_dept: 'edcp', courses_avg: 90.14 },
     { courses_dept: 'thtr', courses_avg: 90.14 },
     { courses_dept: 'etec', courses_avg: 90.14 },
     { courses_dept: 'mtrl', courses_avg: 90.14 },
     { courses_dept: 'kin', courses_avg: 90.14 },
     { courses_dept: 'thtr', courses_avg: 90.14 },
     { courses_dept: 'mtrl', courses_avg: 90.14 },
     { courses_dept: 'phar', courses_avg: 90.15 },
     { courses_dept: 'phar', courses_avg: 90.15 },
     { courses_dept: 'phar', courses_avg: 90.15 },
     { courses_dept: 'phar', courses_avg: 90.15 },
     { courses_dept: 'epse', courses_avg: 90.15 },
     { courses_dept: 'eosc', courses_avg: 90.15 },
     { courses_dept: 'eosc', courses_avg: 90.15 },
     { courses_dept: 'econ', courses_avg: 90.17 },
     { courses_dept: 'mech', courses_avg: 90.17 },
     { courses_dept: 'adhe', courses_avg: 90.17 },
     { courses_dept: 'biol', courses_avg: 90.17 },
     { courses_dept: 'biol', courses_avg: 90.17 },
     { courses_dept: 'russ', courses_avg: 90.17 },
     { courses_dept: 'mech', courses_avg: 90.17 },
     ... 2071 more items ] }
```
##### Complex query
```
{
	"GET": ["courses_dept", "courses_id", "courses_avg"],
	"WHERE": {
		"OR": [
			{"AND": [
					{"GT": {"courses_avg": 70}},
					{"IS": {"courses_dept": "adhe"}}
      			]},
      			{"EQ": {"courses_avg": 90}}
		]
  	},
	"ORDER": "courses_avg",
	"AS": "TABLE"
}
```

The result of this query would be:

```
{ render: 'TABLE',
  result:
   [ { courses_dept: 'adhe', courses_id: '412', courses_avg: 70.53 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 70.53 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 70.56 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 72.29 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 72.93 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 73.79 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 75.67 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 75.68 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 75.91 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 76.17 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 76.22 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 76.59 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 76.63 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 77 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 77.28 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 77.42 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 77.5 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 77.58 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 77.58 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 77.59 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 77.77 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 78.21 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 78.24 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 78.41 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78.57 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78.77 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78.81 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78.81 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 78.85 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 78.9 },
     { courses_dept: 'adhe', courses_id: '328', courses_avg: 78.91 },
     { courses_dept: 'adhe', courses_id: '328', courses_avg: 78.91 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 79 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 79.19 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 79.47 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 79.5 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 79.83 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 80.25 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 80.33 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 80.4 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 80.44 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 80.55 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 80.76 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 81.45 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 81.45 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 81.62 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 81.67 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 81.71 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 81.85 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 81.89 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 82 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 82.49 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 82.73 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 82.76 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 82.78 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 82.81 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 83.02 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 83.05 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.07 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.16 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.29 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 83.34 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.41 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.45 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 83.45 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.47 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.57 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.64 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.68 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 83.69 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.71 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 83.74 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.83 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 83.9 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 84.04 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 84.07 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84.14 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84.3 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84.52 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 84.57 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 84.78 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84.87 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 84.9 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.04 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 85.04 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.06 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 85.12 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.2 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 85.29 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 85.39 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 85.6 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 85.7 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.72 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.8 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 85.8 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 85.81 },
     { courses_dept: 'adhe', courses_id: '327', courses_avg: 85.81 },
     ... 152 more items ] }
```    



## Testing

The best way to test your system is via your own unit test suite. You can write these unit tests by following the examples in ```test/``` and running them with ```npm run test```. This will be the quickest and easiest way to ensure your system is behaving correctly and to make sure regressions are not introduced as you proceed further in the project.

To ensure your code conforms with the API our marking suite expects, there are two integration test suites you can validate your system against:

* A public test suite that you will have complete access to.  You are allowed to run this as many times as you want and are encouraged to add your own integration tests to the suite if you want to 'guess' the kinds of tests we will try in the private suite. We will automatically provision this for your team in Github.

* A private test suite, that you will not have source-level access to. You will be able to request to run it against your implementation every 12h by invoking the ```@CPSC310bot``` Github bot; full details will be available in the [AutoTest](AutoTest.md) documentation.

## Getting started

This deliverable might seem intimidating, but keep in mind that this project has the same interaction mechanism as most software systems:

1. It consumes input data (the zip file -- ```PUT```).
1. It transforms the data (according to the query -- ```POST```).
1. It returns a result (for all endpoints).

There is no best way to get started, but you can consider each of these in turn. Some possible options that could be pursued in any order (or skipped entirely):

* Start by looking at the data file we have provided (the zip file in your ```d1public``` repository) and understanding what kind of data you will be analyzing and maipulating. This will help you think about the kind of data structure you want to create (this is the precursor to step 1 above).

* Look at the sample queries in the deliverable description and the public suite. From these queries, figure out how you would want the data arranged so you can answer these queries (this is the precursor to step 2 above).

* Ignoring the provided data, create some fake data (maybe for one section). Write the portion of the system that queries this data (this is step 2 above).

* Like the above, using some fake data and a fake query processor, write the code that would return the data correctly and with the correct error codes (this is step 3 above).

Trying to keep all of the requirements in mind at once is going to be overwhelming. Tackling a single task that you can accomplish in an hour is going to be much more effective. Iteratively growing your project from small task to small task is going to be the best way to make forward progress.
