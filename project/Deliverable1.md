# Deliverable 1: insightUBC Query Engine

UBC has a wide variety of courses. This deliverable will focus on importing data about these courses into your project and enabling flexible querying over these data with a flexible domain-specific query language.

This deliverable will be completed in pairs. It is worth 10% of your final grade. You will not have to hand anything in; we will pull from your project repo at 0800 AM on February 6, 2017. If you have not specified your team yet, please do so using the ClassPortal at [http://skaha.cs.ubc.ca:11310](http://skaha.cs.ubc.ca:11310). We will create project repos every morning between 0800-0900; all work must take place in this repo (for all four deliverables). You **must** specify your team by 0800 AM on Monday 16. We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own.

You are responsible for the software design and implementation. You cannot use any library package that is not already specified in ```package.json```. Your implementation must be in TypeScript. While we will not be directly examining your source code, you will undoubtably end up showing it to the TAs as you explain your design in the post-submission debrief that will take place in lab February 6-10).

## Dataset

This data has been obtained from [UBC PAIR](http://pair.ubc.ca/) and has not been modified in any way. The data is provided as a zip file: inside of the zip you will find a file for each of the courses offered at UBC. Each of those file contains JSON object containing the information about each offering of the course. 

The bootstrap project you will be provided with already has the implementation to load the data from the zip, but you will need to parse it in an adequate data structure of your choice. 

You are **not** allowed to store the data in a database, but you are encouraged to process the data into a format of your choosing that you can persist (cache) to disk for quicker or more convenient access. Make sure you do not commit this cached file to version control or AutoTest will figure it out and tests will fail in ways you do not expect.

You are **not** allowed to modify the data in any way other than to convert it to the data structure. Your implementation will be tested with the original copy of the dataset, so any modification will most likely lead to tests failing.


## Query Engine

The goal of the deliverable is to build the backend to reply to query about the dataset. The query will be based on the EBNF described below.

### EBNF

*Note: this [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) is not complete and will be extended in future deliverables*
```
QUERY ::='{'BODY ', ' OPTIONS '}'

BODY ::= 'WHERE:'  FILTER 
OPTIONS ::= COLUMNS ', ' ('ORDER:' key ', ')? VIEW

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION)

LOGICCOMPARISON ::= LOGIC ':[{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ':{' key ':' number '}'  
SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'  
NEGATION ::= 'NOT :{' FILTER '}'

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

COLUMNS ::= 'COLUMNS:[' (key ',')* key ']' 
VIEW ::= 'FORM : TABLE'  

key ::= string '_' string
string ::= [a-zA-Z0-9,_-]+  
number ::= [1-9]*[0-9]+ ('.' [0-9]+ )?
```

An [alternate representation](Deliverable1_EBNF.xhtml) of the EBNF is also available (Download and open in a browser to see)

### OPTIONS

```'ORDER': key``` // string is the column name to sort on; the string _must_ be in the ```GET``` array or the query is invalid

```'FORM': 'TABLE'``` // specifies the return format (see examples below)

###Valid keys

In order to maintain readability of the queries, you are not allowed to use the key contained in data. Rather, you will have to build a vocabulary that will translate the keys in the query to the keys that you will use to query the data.
Valid keys are composed by two parts, separated by an underscore. For this deliverable, the first part will always be ```courses```; this will correspond to the ```id``` provided to the ```PUT``` endpoint. The second part is the key itself is.

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

Two simple queries are shown below (these correspond to ```InsightResponse.body```):

##### Simple query
```
{
   "WHERE":{
      "GT":{
         "courses_avg":97
      }
   },
   "OPTIONS":{
      "COLUMNS":[
         "courses_dept",
         "courses_avg"
      ],
      "ORDER":"courses_avg",
      "FORM":"TABLE"
   }
}
```

The result for this would look like:

```
{ render: 'TABLE',
  result:
   [ { courses_dept: 'epse', courses_avg: 97.09 },
     { courses_dept: 'math', courses_avg: 97.09 },
     { courses_dept: 'math', courses_avg: 97.09 },
     { courses_dept: 'epse', courses_avg: 97.09 },
     { courses_dept: 'math', courses_avg: 97.25 },
     { courses_dept: 'math', courses_avg: 97.25 },
     { courses_dept: 'epse', courses_avg: 97.29 },
     { courses_dept: 'epse', courses_avg: 97.29 },
     { courses_dept: 'nurs', courses_avg: 97.33 },
     { courses_dept: 'nurs', courses_avg: 97.33 },
     { courses_dept: 'epse', courses_avg: 97.41 },
     { courses_dept: 'epse', courses_avg: 97.41 },
     { courses_dept: 'cnps', courses_avg: 97.47 },
     { courses_dept: 'cnps', courses_avg: 97.47 },
     { courses_dept: 'math', courses_avg: 97.48 },
     { courses_dept: 'math', courses_avg: 97.48 },
     { courses_dept: 'educ', courses_avg: 97.5 },
     { courses_dept: 'nurs', courses_avg: 97.53 },
     { courses_dept: 'nurs', courses_avg: 97.53 },
     { courses_dept: 'epse', courses_avg: 97.67 },
     { courses_dept: 'epse', courses_avg: 97.69 },
     { courses_dept: 'epse', courses_avg: 97.78 },
     { courses_dept: 'crwr', courses_avg: 98 },
     { courses_dept: 'crwr', courses_avg: 98 },
     { courses_dept: 'epse', courses_avg: 98.08 },
     { courses_dept: 'nurs', courses_avg: 98.21 },
     { courses_dept: 'nurs', courses_avg: 98.21 },
     { courses_dept: 'epse', courses_avg: 98.36 },
     { courses_dept: 'epse', courses_avg: 98.45 },
     { courses_dept: 'epse', courses_avg: 98.45 },
     { courses_dept: 'nurs', courses_avg: 98.5 },
     { courses_dept: 'nurs', courses_avg: 98.5 },
     { courses_dept: 'epse', courses_avg: 98.58 },
     { courses_dept: 'nurs', courses_avg: 98.58 },
     { courses_dept: 'nurs', courses_avg: 98.58 },
     { courses_dept: 'epse', courses_avg: 98.58 },
     { courses_dept: 'epse', courses_avg: 98.7 },
     { courses_dept: 'nurs', courses_avg: 98.71 },
     { courses_dept: 'nurs', courses_avg: 98.71 },
     { courses_dept: 'eece', courses_avg: 98.75 },
     { courses_dept: 'eece', courses_avg: 98.75 },
     { courses_dept: 'epse', courses_avg: 98.76 },
     { courses_dept: 'epse', courses_avg: 98.76 },
     { courses_dept: 'epse', courses_avg: 98.8 },
     { courses_dept: 'spph', courses_avg: 98.98 },
     { courses_dept: 'spph', courses_avg: 98.98 },
     { courses_dept: 'cnps', courses_avg: 99.19 },
     { courses_dept: 'math', courses_avg: 99.78 },
     { courses_dept: 'math', courses_avg: 99.78 } ] }
```
##### Complex query
```
{
   "WHERE":{
      "OR":[
         {
            "AND":[
               {
                  "GT":{
                     "courses_avg":90
                  }
               },
               {
                  "IS":{
                     "courses_dept":"adhe"
                  }
               }
            ]
         },
         {
            "EQ":{
               "courses_avg":95
            }
         }
      ]
   },
   "OPTIONS":{
      "COLUMNS":[
         "courses_dept",
         "courses_id",
         "courses_avg"
      ],
      "ORDER":"courses_avg",
      "FORM":"TABLE"
   }
}
```

The result of this query would be:

```
{ render: 'TABLE',
  result:
   [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
     { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
     { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
     { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
     { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
     { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
     { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
     { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
     { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
     { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
     { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
     { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
     { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
     { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
     { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
     { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
     { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
     { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
     { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
     { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
     { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
     { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
     { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
     { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
     { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
     { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
     { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
     { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
     { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
     { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
     { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] }
```    

## API

The high-level API you must support is shown below; these are methods we will provide you in your bootstrap project in ```src/controller/``` (there is also code in ```src/rest/``` but you do not need to worry about this yet).

```
/*
 * This is the primary high-level API for the project. In this folder there should be:
 * A class called InsightFacade, this should be in a file called InsightFacade.ts.
 * You should not change this interface at all or the test suite will not work.
 */

export interface InsightResponse {
    code: number;
    body: {}; // the actual response
}

export interface QueryRequest {
    // you can define your own structure that complies with the EBNF here
}

export interface IInsightFacade {

    /**
     * Add a dataset to UBCInsight.
     *
     * @param id  The id of the dataset being added.
     * @param content  The base64 content of the dataset. This content should be in the
     * form of a serialized zip file.
     *
     * The promise should return an InsightResponse for both fulfill and reject.
     *
     * Fulfill should be for 2XX codes and reject for everything else.
     *
     * After receiving the dataset, it should be processed into a data structure of
     * your design. The processed data structure should be persisted to disk; your
     * system should be able to load this persisted value into memory for answering
     * queries.
     *
     * Ultimately, a dataset must be added or loaded from disk before queries can
     * be successfully answered.
     *
     * Response codes:
     *
     * 201: the operation was successful and the id already existed (was added in
     * this session or was previously cached).
     * 204: the operation was successful and the id was new (not added in this
     * session or was previously cached).
     * 400: the operation failed. The body should contain {"error": "my text"}
     * to explain what went wrong.
     *
     */
    addDataset(id: string, content: string): Promise<InsightResponse>;

    /**
     * Remove a dataset from UBCInsight.
     *
     * @param id  The id of the dataset to remove.
     *
     * The promise should return an InsightResponse for both fulfill and reject.
     *
     * Fulfill should be for 2XX codes and reject for everything else.
     *
     * This will delete both disk and memory caches for the dataset for the id meaning
     * that subsequent queries for that id should fail unless a new addDataset happens first.
     *
     * Response codes:
     *
     * 204: the operation was successful.
     * 404: the operation was unsuccessful because the delete was for a resource that
     * was not previously added.
     *
     */
    removeDataset(id: string): Promise<InsightResponse>;

    /**
     * Perform a query on UBCInsight.
     *
     * @param query  The query to be performed. This is the same as the body of the POST message.
     *
     * @return Promise <InsightResponse>
     *
     * The promise should return an InsightResponse for both fulfill and reject.
     *
     * Fulfill should be for 2XX codes and reject for everything else.
     *
     * Return codes:
     *
     * 200: the query was successfully answered. The result should be sent in JSON according in the response body.
     * 400: the query failed; body should contain {"error": "my text"} providing extra detail.
     * 424: the query failed because it depends on a resource that has not been PUT. The body should contain {"missing": ["id1", "id2"...]}.
     *
     */
    performQuery(query: QueryRequest): Promise<InsightResponse>;
}
```

## Testing

The best way to test your system is via your own unit test suite. You can write these unit tests by following the examples in ```test/``` and running them with ```yarn test```. This will be the quickest and easiest way to ensure your system is behaving correctly and to make sure regressions are not introduced as you proceed further in the project. We are currently also providing a [UI](http://skaha.cs.ubc.ca:11315/) for our solution for this deliverable so you can see what the expected values should be for the queries you are trying for your query.

To ensure your code conforms with the API our marking suite expects you can run your code against AutoTest. You will not have source-level access this suite. You will be able to request to run it against your implementation every 12h by invoking the ```@CPSC310bot``` Github bot; full details will be available in the [AutoTest](AutoTest.md) documentation.


## Getting started

This deliverable might seem intimidating, but keep in mind that this project has the same interaction mechanism as most software systems:

1. It consumes input data (the zip file).
1. It transforms the data (according to the query).
1. It returns a result (for all endpoints).

There is no best way to get started, but you can consider each of these in turn. Some possible options that could be pursued in any order (or skipped entirely):

* Start by looking at the data file we have provided (the zip file in your ```d1public``` repository) and understanding what kind of data you will be analyzing and manipulating. This will help you think about the kind of data structure you want to create (this is the precursor to step 1 above).

* Look at the sample queries in the deliverable description and the public suite. From these queries, figure out how you would want the data arranged so you can answer these queries (this is the precursor to step 2 above).

* Ignoring the provided data, create some fake data (maybe for one section). Write the portion of the system that queries this data (this is step 2 above).

* Like the above, using some fake data and a fake query processor, write the code that would return the data correctly and with the correct error codes (this is step 3 above).

Trying to keep all of the requirements in mind at once is going to be overwhelming. Tackling a single task that you can accomplish in an hour is going to be much more effective. Iteratively growing your project from small task to small task is going to be the best way to make forward progress.

## Contribution statement

In your repository, each teammate must commit a file called ```/D1-contrib_<GitHubId>.md```. This file is mandatory, not submitting it will result in a **0%** on the deliverable. The file should contain:

* A header with the final test pass rate and coverage rate at the deadline (Monday @ 0800).
* A short description of your concrete contributions to this deliverable's code. 
* A series of clickable links to some of your key GitHub commits for this deliverable. 
* If you do not have any (or very few) commits, you should explain your concrete contributions. This should be committed before you meet with your TAs in the lab as you will refer to this file in your meeting with them.
* A few retrospective sentences about what went well this deliverable, what went poorly, and how you will approach the next deliverable differently.

## Assessment

The AutoTest suite will comprise 80% of your mark. The remaining 20% will be derived from your overall test coverage score. We will generate this score by running ```npm run cover```. Your grade will correspond to the fraction of lines your tests cover (e.g., 90% coverage will give you 18/20). Recognizing that hitting 100% will take more trouble than it is worth, we will give you a maximum 5% bonus for your coverage score, although you cannot get over 100% on this component. For example, if your coverage rate is 97% you will get 100%. If it is 76% you will get 81%. The retrospective multiplier (oral exam component) will apply to the AutoTest and Coverage values combined; failure to submit a contribution statement will result in a multiplier of 0.



