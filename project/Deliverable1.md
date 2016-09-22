# Deliverable 1: insightUBC Query Engine

UBC has a wide variety of courses. This deliverable will focus on importing data about these courses into your project and enabling flexible querying over these data with a flexible domain-specific query language.

This deliverable will be completed in pairs. It is worth 10% of your final grade. You will not have to hand anything in; we will pull from your project repo at noon on October 3, 2016. If you have not specified your team yet, please do so at [http://skaha.cs.ubc.ca:8020](http://skaha.cs.ubc.ca:8020). We will create project repos every morning between 0900-1000; all work must take place in this repo (for all four deliverables). You **must** specify your team by 1600 on September 23. We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own.

You are responsible for the software design and implementation that provides the REST endpoints described below. You cannot use any library package that is not already specified in ```package.json```, nor can you use any of the libraries in ```src/rest/public```. Your implementation must be in TypeScript, ES5 JavaScript, or CoffeeScript (or some combination thereof). While we will not be directly examining your source code, you will undoubtably end up showing it to the TAs as you explain your design in the post-submission debrief that will take place in lab Oct 4-7).

## Dataset

This data has been obtained from [UBC PAIR](http://pair.ubc.ca/) and has not been modified in any way. The data is provided as a zip file: inside of the zip you will find a file for each of the courses offered at UBC. Each of those file contains JSON object containing the information about each offering of the course. 

The bootstrap project you will be provided with already has the implementation to load the data from the zip, but you will need to parse it in an adequate data structure of your choice. 

You are **not** allowed to store the data in a database, but you are encouraged to process the data into a format of your choosing that you can persist to disk for quicker or more convenient access.

You are **not** allowed to modify the data in any way other than to convert it to the data structure. Your implementation will be tested with the original copy of the dataset, so any modification will most likely lead to tests failing.

## REST endpoints

The deliverable relies on the following REST endpoints:

* **```GET /```** returns the query interface for the UI; this is only provided for your convenience and will not be tested.

* **```PUT /dataset/:id```** allows to submit a zip file that will be parsed and used for future queries. The zip file content will be sent in base64 in the ```PUT``` body. 
 * The dataset will be in a format designed to be transferred, not a format amenable to easy searching. After receiving the dataset, it should be processed into a data structure of your design. 
 * The processed data structure should be persisted to disk; your system should be able to load this persisted value into memory for answering queries. 
 * Ultimately, a dataset must be ```PUT``` **or** loaded from disk before queries can be successfully answered.
 * Response Codes and message formats:
     * ```204```: the operation was successful and the ```id``` was new (not ```PUT``` in this session or was previously cached).
     * ```201```: the operation was successful and the ```id``` already existed (was ```PUT``` in this session or was previously cached).
     * ```400```: the operation failed. The body should contain ```{error: 'my text'}``` to explain what went wrong.


* **```POST /query```** sends the query to the application. The query will be in JSON format in the post body. 
 * Query term prefixes (e.g. ```courses```) will correspond to the dataset required by the query. These prefixes correspond exactly t the ```id``` in the ```PUT``` endpoint.
 * NOTE: the server may be shutdown between the ```PUT``` and the ```POST```. This endpoint should always check for a persisted data structure on disk before returning a missing dataset error.
 * Response Codes and message formats:
     * ```200```: the query was successfully answered. The result should be sent in JSON according in the response body.
     * ```424```: the query failed because it depends on a resource that has not been ```PUT```. The body should contain ```{missing: ['key1'...]}```.
     * ```400```: the query failed; body should contain ```{error: 'my text'}``` providing extra detail.

* **```DELETE /dataset/:id```** deletes the existing dataset stored. 
 * This will delete both disk and memory caches for the dataset for the ```id``` meaning that subsequent queries for that ```id``` should fail unless a new ```PUT``` happens first.
 * Response Codes and message formats:
     * ```204```: the operation was successful.
     * ```404```: the operation was unsuccessful because the delete was for a resource that was not previously ```PUT```.
     * ```400```: the operation failed; body should contain ```{error: 'my text'}``` providing extra detail. 

You will not have to modify the ```GET /``` endpoint. The ```PUT /dataset:id``` and ```POST /query``` endpoint skeletons have been provided, but you will have to implement them. ```DELETE /dataset:id``` is not implemented at all; you will have to add this from scratch.

The UI is already provided in the project. There is nothing to gain from modifying it as we will not test any of the UI code and will only interact with your system through the endpoints specified above.

A [status code reference](https://httpstatuses.com/) is available if you want to learn about other status codes.

## Query Engine

The goal of the deliverable is to build the backend to reply to query about the dataset. The query will be based on the EBNF described below. Note, this EBNF is for the WHERE portion of the query only.

### PREAMBLE

```'GET': [ string* ]``` // specify the columns in the final query

### WHERE [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form)  

*Note: this EBNF is not complete and will be extended in future deliverables*
*Number and string are Javascript types.*  

```
LOGIC ::= 'AND' | 'OR' | 'NOT'  
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ'  
MCOMPARISON ::= MCOMPARATOR ':{' string ':' number '}'  
SCOMPARISON ::= 'IS:{' string ':' [*]? string [*]? '}'  
FILTER ::= '{' (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON) '}'  
LOGICCOMPARISON ::= LOGIC ':{' FILTER '}'  
VIEW ::= 'TABLE'  
string ::= [a-zA-Z0-9]+  
number ::= [1-9]*[0-9]+  
```

### POSTAMBLE

```'ORDER': 'string'``` // string is the column name to sort on

```'AS': 'TABLE'``` // specifies the return format (see examples below)

###Valid keys

In order to maintain readability of the queries, you are not allowed to use the key contained in data. Rather, you will have to build a vocabulary that will translate the keys in the query to the keys that you will use to query the data.
Valid keys are composed by two parts, separated by an underscore. For this deliverable, the first part will always be ```courses```; this will correspond to the ```id``` provided to the ```PUT``` endpoint. The second part is the key itself is.
The list of valid keys is:

The queries you will run will be using the following keys:

* **courses_dept**: The department that offered the course.
* **courses_id**: The course number.
* **courses_avg**: The average of the course offering.
* **courses_instructor**: The instructor teaching the course offering.
* **courses_title**: The name of the course.
* **courses_pass**: The number of students that passed the course offering.
* **courses_fail**: The number of students that failed the course offering.
* **courses_audit**: The number of students that audited the course offering.

Note: these keys are different than may be present in the data. Since you are not allowed to modify the data, you will have to come up with a way to translate them.

#### Query example

Two simple queries are shown below:

##### Simple query
```
{
	"GET": ["courses_dept"],
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
   [ { courses_dept: 'civl' },
     { courses_dept: 'adhe' },
     { courses_dept: 'adhe' },
     { courses_dept: 'adhe' },
     { courses_dept: 'adhe' },
     { courses_dept: 'adhe' },
     { courses_dept: 'adhe' },
     { courses_dept: 'anat' },
     { courses_dept: 'anat' },
     { courses_dept: 'anth' },
     { courses_dept: 'apbi' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'apsc' },
     { courses_dept: 'arst' },
     { courses_dept: 'arst' },
     { courses_dept: 'arst' },
     { courses_dept: 'arst' },
     { courses_dept: 'arth' },
     { courses_dept: 'arth' },
     { courses_dept: 'arth' },
     { courses_dept: 'arth' },
     { courses_dept: 'arth' },
     { courses_dept: 'arth' },
     { courses_dept: 'astr' },
     { courses_dept: 'astr' },
     { courses_dept: 'atsc' },
     { courses_dept: 'atsc' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'audi' },
     { courses_dept: 'babs' },
     { courses_dept: 'babs' },
     { courses_dept: 'bams' },
     { courses_dept: 'bams' },
     { courses_dept: 'bioc' },
     { courses_dept: 'bioc' },
     { courses_dept: 'bioc' },
     { courses_dept: 'bioc' },
     ... 2071 more items ] }
```
##### Complex query
```
{
	"GET": ["courses_dept", "courses_id"],
	"WHERE": {
		"OR": {
			"AND": {
				"GT": {
					"courses_avg": 70
				},
				"IS": {"courses_dept": "adhe"}
      		},
      		"EQ": {"courses_avg": 90}
		}
  	},
	"ORDER": "courses_avg",
	"AS": "TABLE"
}
```

The result of this query would be:

```
{ render: 'TABLE',
  result:
   [ { courses_dept: 'adhe', courses_id: '412' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '327' },
     { courses_dept: 'adhe', courses_id: '328' },
     { courses_dept: 'adhe', courses_id: '328' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '329' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     { courses_dept: 'adhe', courses_id: '330' },
     ... 152 more items ] }
```    



##Testing

The best way to test your system is via your own unit test suite. You can write these unit tests by following the examples in ```test/``` and running them with ```npm run test```. This will be the quickest and easiest way to ensure your system is behaving correctly and to make sure regressions are not introduced as you proceed further in the project.

To ensure your code conforms with the API our marking suite expects, there are two integration test suites you can validate your system against:

* A public test suite that you will have complete access to.  You are allowed to run this as many times as you want and are encouraged to add your own integration tests to the suite if you want to 'guess' the kinds of tests we will try in the private suite. We will automatically provision this for your team in Github.

* A private test suite, that you will not have source-level access to. You will be able to request to run it against your implementation every 12h by submitting a command to Github; full details will be available in the [AutoTest](Autotest.md) documentation.


