# Project Sprint 1 (d1)

UBC has a wide variety of courses. This deliverable will focus on importing data about these courses into your project and enabling flexible querying over these data with a flexible domain-specific query language.

This deliverable will be completed in pairs. You will not have to hand anything in; we will automatically analyze your repo on every push between when the deliverable is released and the due date [specified here](../README.md#project-sprint-schedule). A team creation tool will be available after the add/drop deadline. Once available, if you have not specified your team yet, please do so through Classy at [https://cs310.students.cs.ubc.ca/](https://cs310.students.cs.ubc.ca/). We will create project repos every morning between 0800-0900; all work must take place in this repo (including all future deliverables). We will run [MOSS](https://theory.stanford.edu/~aiken/moss/) on all submissions so please make sure your work is your own.

You are responsible for the software design and implementation. You cannot use any library package that is not already specified in ```package.json```. Your implementation must be in TypeScript. While we will not be directly examining your source code, you will undoubtedly end up showing it to the TAs as you explain your design in the mandatory post-submission debrief that will take place in lab the week of the final deliverable deadline).

## "Change Log"

This file may be changed slightly over the course of the term. To see when this file was last updated, look at the date of the commit in the pale blue box above the file. To see what was changed, you can view the commit history and associated diffs using the history button just above the top right of the file.
We have updated this file since d0 with some minor changes/clarifications so please check!

## Dataset

This data has been obtained from UBC PAIR and has not been modified in any way. The data is provided as a zip file: inside of the zip you will find a file for each of the courses offered at UBC. Each of those file contains JSON object containing the information about each offering of the course.

The dataset zip file can be found in the `<PROJECT_DIR>/test/data` directory of your repo.

### Checking the validity of the dataset

A **valid** dataset: 
- Has to be a valid zip file; this zip will contain many files under a folder called `courses/`.  This directory name will not vary with the dataset id.
- Valid courses will always be in JSON format.
- Each JSON file represents a course and can contain zero or more course sections. 
- A valid dataset has to contain **at least one valid course section** that meets the requirements above.
- If an individual file is invalid for any reason, skip over it.

### Reading and Parsing the Dataset

You will need to parse valid input files into internal objects or other data structures.  You are not allowed to store the data in a database.  You must also write a copy of the model to disk, and should be able to load these files to be queried if necessary. These files should be saved to the `<PROJECT_DIR>/data` directory. Make sure not to commit these files to version control, as this may cause unpredicted test failures.

There is a provided package called JSZip that you should use to process/unzip the data you are passed in your addDataset method (described below).

Important note: Avoid storing your datasets as static or global variables, keep them as members of a class. The reason for this is that we try to wipe added datasets in between tests. This won't work if your data is stored statically, and one test behaving incorrectly may cause future tests to fail as well.

## Query Engine

The goal of the deliverable is to build the backend to reply to query about the dataset. The query will be based on the EBNF described below.

### EBNF

*Note: this [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) is not complete and will be extended in future deliverables*
```
QUERY ::='{'BODY ', ' OPTIONS '}'

BODY ::= 'WHERE:{' FILTER? '}' // Note: a BODY with no FILTER (i.e. WHERE:{}) matches all entries.
OPTIONS ::= 'OPTIONS:{' COLUMNS (', ORDER:' key )?'}'

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION)

LOGICCOMPARISON ::= LOGIC ':[{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ':{' mkey ':' number '}'  
SCOMPARISON ::= 'IS:{' skey ':' [*]? inputstring [*]? '}'  // Asterisks should act as wildcards. Optional.
NEGATION ::= 'NOT :{' FILTER '}'

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

COLUMNS ::= 'COLUMNS:[' (key ',')* key ']' 

key ::= mkey | skey
mkey ::= idstring '_' mfield
skey ::= idstring '_' sfield
mfield ::= 'avg' | 'pass' | 'fail' | 'audit' | 'year'
sfield ::=  'dept' | 'id' | 'instructor' | 'title' | 'uuid'
idstring ::= [^_]+ // One or more of any character, except underscore.
inputstring ::= [^*]* // Zero or more of any character, except asterisk.
```
* `WHERE` defines which sections should be included in the results.

* `COLUMNS` defines which keys should be included in each result.

* `ORDER` defines what order the results should be in.


**Syntactic Checking (Parsing)**

Your query engine must test the validity of input queries against the grammar.  It must then store the query in a structure (related objects, objects in an AST, or other data structure of your choice) such that you can perform the query as indicated by the semantics below.  The hierarchy of that structure should likely match that of the incoming JSON.

Error responses for failed parsing are provided below in the specification for the `performQuery` method

**Semantic Checking**

Semantic checks are typically performed on the existing (validated) AST. In this project you must perform the following semantic checks:

* `'ORDER': key` where key (a string) is the column name to sort on; the key must be in the COLUMNS array or the query is invalid.

* Queries can only reference one dataset, or the query is invalid. Datasets are referenced by the id of the keys in the query (see next section). A query on a dataset that has not been added is invalid.

### Valid keys

The keys that are used in the queries aren't exactly as they appear in the dataset, so you will have to include some mapping/translation step.

Valid keys are composed by two parts, separated by an underscore: `<id>_<key>`

- `<id>` is provided by the user and will be received through the `addDataset()` method, [check the API spec to better understand how it should work](https://github.com/ubccpsc/310/blob/2019sept/project/Deliverable1.md#api). For a query to be valid, all keys must have the same `id` (i.e. refer to the same dataset)
- `<key>` is the key that represents a given piece of information. For this deliverable you will parse the following keys: `dept`, `id`, `instructor`, `title`, `pass`, `fail`, `audit`, `uuid`, `avg`, and `year`.

For instance, if the `id` sent by the user is `courses`, then the queries you will run will be using the following keys:

* **courses_dept**: ```string```; The department that offered the course.
* **courses_id**: ```string```; The course number (will be treated as a string (e.g., 499b)).
* **courses_avg**: ```number```; The average of the course offering.
* **courses_instructor**: ```string```; The instructor teaching the course offering.
* **courses_title**: ```string```; The name of the course.
* **courses_pass**: ```number```; The number of students that passed the course offering.
* **courses_fail**: ```number```; The number of students that failed the course offering.
* **courses_audit**: ```number```; The number of students that audited the course offering.
* **courses_uuid**: ```string```; The unique id of a course offering.
* **courses_year**: ```number```; The year the course offering ran. If the "Section" property in the source data is set to "overall", you should set the year for that section to 1900.

Note: these keys are different than the ones present in the raw data. Since you are not allowed to modify the data, you will have to come up with a way to translate them.

#### Query example

Two simple queries are shown below:

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
      "ORDER":"courses_avg"
   }
}
```

The result for this would look like:

```
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
  { courses_dept: 'math', courses_avg: 99.78 } ]
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
      "ORDER":"courses_avg"
   }
}
```

The result of this query would be:

```
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
  { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ]
```    

## API

**Overview**:

The API is summarized below. You **must not** change any provided specifications.

- `IInsightFacade` is the front end (wrapper) for the query engine. In practice, it defines the endpoints for the deliverable. It provides several methods:
- `InsightDatasetKind` is an enum specifying the two possible dataset types.
- `InsightDataset` is an interface for a simple object storing metadata about an added dataset.
- `InsightError` and `NotFoundError` are Error subtypes potentially returned by the API.
- `addDataset(id: string, content: string, kind: InsightDatasetKind): Promise<string[]>` adds a dataset to the internal model, providing the id of the dataset, the string of the content of the dataset, and the kind of the dataset. For this deliverable the dataset kind will be _courses_. A valid `id` is as `idstring` is defined in the [EBNF](https://github.com/ubccpsc/310/blob/2019sept/project/Deliverable1.md#ebnf). Additionally, an `id` that is _only_ whitespace is invalid.
- `removeDataset(id: string): Promise<string>` removes a dataset from the internal model, given the id. A valid `id` is as `idstring` is defined in the [EBNF](https://github.com/ubccpsc/310/blob/2019sept/project/Deliverable1.md#ebnf). As above, an `id` that is _only_ whitespace is invalid.
- `performQuery(query: any): Promise<any[]>` performs a query on the dataset. It first should parse and validate the input query, then perform semantic checks on the query and evaluate the query if it is valid. A result should have a max size of 5,000. If this limit is exceeded the promise should reject with a `ResultTooLargeError`.
- `listDatasets(): Promise<InsightDataset[]>` returns an array of currently added datasets. Each element of the array should describe a dataset following the InsightDataset interface which contains the dataset id, kind, and number of rows.

To implement the API you will likely have to create your own additional methods and classes.

The high-level API you must support is shown below; these are methods we will provide you in your bootstrap project in ```src/controller/```.

```typescript
/*
 * This is the primary high-level API for the project. In this folder there should be:
 * A class called InsightFacade, this should be in a file called InsightFacade.ts.
 * You should not change this interface at all or the test suite will not work.
 */

export enum InsightDatasetKind {
    Courses = "courses",
    Rooms = "rooms",
}

export interface InsightDataset {
    id: string;
    kind: InsightDatasetKind;
    numRows: number;
}

export class InsightError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, InsightError);
    }
}

export class NotFoundError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, NotFoundError);
    }
}

export class ResultTooLargeError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ResultTooLargeError);
    }
}

export interface IInsightFacade {
    /**
     * Add a dataset to UBCInsight.
     *
     * @param id  The id of the dataset being added.
     * @param content  The base64 content of the dataset. This content should be in the form of a serialized zip file.
     * @param kind  The kind of the dataset
     *
     * @return Promise <string[]>
     *
     * The promise should fulfill on a successful add, reject for any failures.
     * The promise should fulfill with a string array,
     * containing the ids of all currently added datasets upon a successful add.
     * The promise should reject with an InsightError describing the error.
     *
     * An id is invalid if it contains an underscore, or is only whitespace characters.
     * If id is the same as the id of an already added dataset, the dataset should be rejected and not saved.
     * 
     * After receiving the dataset, it should be processed into a data structure of
     * your design. The processed data structure should be persisted to disk; your
     * system should be able to load this persisted value into memory for answering
     * queries.
     *
     * Ultimately, a dataset must be added or loaded from disk before queries can
     * be successfully answered.
     */
    addDataset(id: string, content: string, kind: InsightDatasetKind): Promise<string[]>;

    /**
     * Remove a dataset from UBCInsight.
     *
     * @param id  The id of the dataset to remove.
     *
     * @return Promise <string>
     *
     * The promise should fulfill upon a successful removal, reject on any error.
     * Attempting to remove a dataset that hasn't been added yet counts as an error.
     *
     * An id is invalid if it contains an underscore, or is only whitespace characters.
     * 
     * The promise should fulfill with the id of the dataset that was removed.
     * The promise should reject with a NotFoundError (if a valid id was not yet added)
     * or an InsightError (invalid id or any other source of failure) describing the error.
     *
     * This will delete both disk and memory caches for the dataset for the id meaning
     * that subsequent queries for that id should fail unless a new addDataset happens first.
     */
    removeDataset(id: string): Promise<string>;

    /**
     * Perform a query on UBCInsight.
     *
     * @param query  The query to be performed.
     * 
     * If a query is incorrectly formatted, references a dataset not added (in memory or on disk), 
     * or references multiple datasets, it should be rejected with an InsightError.
	 * If a query would return more than 5000 results, it should be rejected with a ResultTooLargeError.
     *
     * @return Promise <any[]>
     *
     * The promise should fulfill with an array of results.
     * The promise should reject with an InsightError describing the error.
     */
    performQuery(query: any): Promise<any[]>;

    /**
     * List all currently added datasets, their types, and number of rows.
     *
     * @return Promise <InsightDataset[]>
     * The promise should fulfill an array of currently added InsightDatasets, and will only fulfill.
     */
    listDatasets(): Promise<InsightDataset[]>;
}

```

A note on using the InsightDataset interface: This should be used as if it were a type, _not_ by creating a new class that implements it.
```typescript
// Yes
const myDataset: InsightDataset = {id: "foo", kind: InsightDatasetKind.Courses, numRows: 1}
```
```typescript
// No
class datasetClass implements InsightDataset { ... }
const myDataset: datasetClass = {id: "foo", kind: InsightDatasetKind.Courses, numRows: 1}
```
If you make a class out of it, extra data will be included in those objects (constructors etc.) which will cause them to be different, and cause tests to fail.

## Testing

The best way to test your system is via your own unit test suite. You can write these unit tests by following the examples in ```test/``` and running them with ```yarn test```. This will be the quickest and easiest way to ensure your system is behaving correctly and to make sure regressions are not introduced as you proceed further in the project. We are currently also providing a [UI](https://cs310.students.cs.ubc.ca/ui) for our solution for this deliverable so you can see what the expected values should be for the queries you are trying for your query. **Please note** that the UI may not respond correctly to all error cases, its purpose is for convenient creation of expected results. When in doubt always follow the spec as written here.

To ensure your code conforms with the API our marking suite expects you can run your code against AutoTest. You will **not** have source-level access this suite. You will be able to request to run it against your implementation every 12h by invoking the ```@autobot``` Github bot; full details will be available in the [AutoTest](AutoTest.md) documentation. The AutoTest suite will not be available for the first few days after the deliverable is released; use this time to read the deliverable and get started on your own implementation and tests. We will post to Piazza when the suite is available.


## Getting started

This deliverable might seem intimidating, but keep in mind that this project has the same interaction mechanism as most software systems:

1. It consumes input data (the zip file).
1. It transforms the data (according to the query).
1. It returns a result.

There is no best way to get started, but you can consider each of these in turn. Some possible options that could be pursued in any order (or skipped entirely):

* Start by looking at the data file we have provided and understanding what kind of data you will be analyzing and manipulating. This will help you think about the kind of data structure you want to create (this is the precursor to step 1 above).

* Look at the sample queries in the deliverable description. From these queries, figure out how you would want the data arranged so you can answer these queries (this is the precursor to step 2 above).

* Ignoring the provided data, create some fake data (maybe for one section of one course). Write the portion of the system that queries this data (this is step 2 above).

* Like the above, using some fake data and a fake query processor, write the code that would return the data correctly and with the correct error codes (this is step 3 above).

Trying to keep all of the requirements in mind at once is going to be overwhelming. Tackling a single task that you can accomplish in an hour is going to be much more effective than worrying about the whole deliverable at once. Iteratively growing your project from small task to small task is going to be the best way to make forward progress.

### Getting AutoTest to work

1. Create a file ```src/controller/InsightFacade``` that contains a class called ```InsightFacade``` that implements the interface ```IInsightFacade```.
1. Make sure the three methods in your ```InsightFacade``` class return a promise and that this promise _always_ settles. If all three methods do not always settle, the AutoTest suite will timeout. Your D0 methods should have provided some insight into how to do this.
1. We will run your unit test suite and send you all of the output for any of your tests that fail. This is a great way to figure out why code that works on your machine fails on our infrastructure. It is also a good way for you to ensure your promises always settle.
1. Your test suite should _not_ need to use ```JSZip```. Your test code can use ```fs``` to read the zip from disk and send the base64 string representation to ```InsightFacade``` which will _then_ use ```JSZip```. Also, your product (non-test) code should not read or write the zip file to disk, it should only read and write your data structure.

## Contribution statement

A survey will be required to detail your contribution to your group's project. This will involve a [mandatory survey](https://github.com/ubccpsc/310/tree/2019sept/README.md#participation). Failure to submit the survey by the final deadline will result in a grade of 0 for the deliverable (for the individual who did not submit it, not the whole group).

## Assessment

[Please refer to the README file for more information on grading](README.md#assessment)

## FAQ

This is an FAQ of common questions/clarifications from previous terms. 

### D1 Specific

**Q. I'm kind of lost on the idea of D1... Help?**

A. There are two main concepts for D1: Datasets and Queries. Your program will be able to receive and store a dataset. 
This dataset should be kept in memory (i.e. a variable) so you can access its content easily, as well as on disk so different instances of your class can access it at any time once it's been added. 
Then your program can receive a query asking to know which course sections match some criteria. 
The EBNF in the deliverable defines what one of these queries might look like. You will need to write some tests to call these methods. 
This will include defining some queries, and loading a dataset to use as parameters. 

**Q. Are we querying courses or sections?**

A. You are querying the individual sections found within the course files.


\~Datasets\~

**Q. How many sections does courses.zip have (i.e. what would a listDataset's numRows be)?**

A. 64612

**Q. What do the parameters to addDataset mean?**

A. The `id` parameter is a label for the entire dataset. You should use this id to refer to the dataset in memory and on disk, so that if removeDataset is called with the same id, you know which dataset to remove.

The `content` parameter is the entire zip file, in the format of a base64 string. That's the entire zip file, all the data you need is contained in it. You can use the JSZip module to unzip, navigate through, and view the files inside.

The kind parameter is one of two options, `InsightDatasetKind.Courses` or `InsightDatasetKind.Rooms`

 
**Q. How to I get a base64 string to pass to addDataset in my tests?**

A. Node has a file system module for loading data from disk, and we have also provided the `fs-extra` module which simplifies things further. You can use this to load a zip file into your program, along with the handy `x.toString("base64")` method to get a base64 string you can use. 
 

**Q. How do I access the data in the content parameter to addDataset?**

A. That's where the provided JSZip module comes in. You won't need any file system operations, since all the data you need is already in memory in the content parameter.
 

**Q. How do I choose a data structure to store the dataset/what does a data structure mean?**

A.  A data structure doesn't need to be anything complicated. Basic arrays and trees are data structures. You could also combine structures, define your own classes, etc. What structure you choose can be whatever works well for you, you understand, and isn't incredibly inefficient (not a problem in most cases)

 
**Q. Do I have to store my data structure on disk like _________?**

A. You can store the data on disk however works for you. You just need to be able to (a) read it, and (b) remove it if removeDataset is called with the appropriate id. This can be a single file, a folder full of files, text file(s), json file(s), etc.
 

**Q. What is an invalid dataset/file/section?**

A. This will generally be cases that are very invalid. An invalid dataset might be a dataset that is not a zip file, is corrupted (practically not a zip file), or has no data. These would be rejected. 

On the phrasing of courses/sections:

    Each file represents a course.
    Each entry in the results array in those files represents a section.
    There are certain fields that this project uses (e.g. the instructor)
    If a field you use (e.g. Avg, Professor) in a section is not present at all, that section would be invalid/skipped during load.
    If a field you use in a section is present but contains something counter-intuitive like empty string, it is accepted anyways.

A dataset needs at least one valid section overall to be valid itself


\~Queries\~


**Q. What does the query parameter in performQuery look like?**

A. Since the type for the query is `any`, technically anything could be passed. A _valid_ query will be a JSON object matching the EBNF. Note that this is not a stringified object, it will be already in object form (the sample queries in the deliverable could be copy pasted and would be valid).


**Q. Do I have to validate if the query is valid JSON?**

A. No, you can assume that if the query is an object, the JSON syntax is valid. This is because it's not possible to write an invalid object directly, TypeScript or JavaScript would throw an error. However you will have to validate the query conforms to our specification in the EBNF. 


**Q. What do the asterisks (\*) in SCOMPARISON mean?**

A. These are optional wildcards. So if you have an SCOMPARISON like `"IS": {"courses_dept": "C*"}`, this would be looking for any course department that starts with a C. Because both are optional, there are four possible configurations:

     inputstring:  Matches inputstring exactly
    *inputstring:  Ends with inputstring
     inputstring*: Starts with inputstring
    *inputstring*: Contains inputstring

There are no "in the middle" asterisks such as `input*string` sllowed.


**Q. Can a LOGICCOMPARISON have only one filter?**

A. Since * means zero or more, yes it can.
 

**Q. What is an invalid query?**

A. Any query that doesn't conform to the EBNF, or returns more than 5000 results. Queries with no results are valid as long as they conform to the EBNF (a query looking for sections with averages > 100 is valid if it is formatted correctly).
 

**Q. No sorting was specified, but the order of my results differs from the UI, does this matter?**

A. No, if no sort was specified, any order of the correct results if fine, there is no 'default'.
If your default sorting differs from ours (including the situation discussed below) for certain queries, you can make tests outside our provided test generating loop to accommodate.
For instance, consider testing your results with a combination of `expect(res).to.deep.equal(expected)`, as well as checking the result lengths.
This will ensure you have the same results, ignoring any order.

 
**Q. When sorting, is it okay if our implementation breaks ties differently than the UI?**

A. Yes, this is okay. Often you will find cases where the element being sorted on appears multiple times, for example if you sort by department, many entries may be CPSC. The order within those CPSC rows doesn't matter, the tests do not check that the order matches our implementation, only that it matches the rule.
 

### General
 

\~Autotest\~


**Q. My tests are timing out in WebStorm, will they timeout on the bot?**

A. Possibly. The bot is slightly slower, but has longer timeouts to compensate. If your test doesn't timeout locally, it shouldn't time out on the bot.

 
**Q. Where do I type the message to autobot?**

A. You type it in a comment on GitHub on the page for the commit you want marked, not in the message you write when you make the commit.

Like this!

![botYES](https://i.imgur.com/Sjeugh6.png)


Not like this.

![botNO](https://i.imgur.com/Mn4Bi0g.png)

**Q. How often can I call the bot?**

A. Every 12 hours per teammate.

 
**Q. The bot gave me an error message but my program works fine, what might be wrong?**

A. Things to check:

* Make sure you didn't use any external modules not listed in package.json (and likewise have NOT modified package.json or yarn.lock)
* Your Node version is similar (ideally same) to ours (8.9.X), and your TypeScript version is correct (2.6.2)
* Your promises are resolving
* You have error handling (i.e. try/catch around things that might throw errors)
* You do import statements with let x = require('module'), not import * as x from 'module'
* You do not have extreme amounts of log output (e.g. do not log all the data in the zip file)
* You are not mixing array declaration types. For example using string[] and Array<string> interchangeably may cause issues
* You are correctly using case sensitive imports (JSZip should be jszip)

Note than none of these are guaranteed to fix, or cause, problems.

If you make small, concise commits, it will be easier to identify what might be causing an issue if errors start occurring. Also, confirm that your local coverage isn't wildly different from the coverage from the bot. When in doubt you can make a Piazza post.

 
\~Build/IDE errors\~
 

**Q. What does "implicitly has 'any' type" mean?**

A. Take a look over here. When you use the Object type in TypeScript, the compiler doesn't like not knowing what types are expected from the key/value pairs. The best solution is to use an interface (first solution in the link), but if you need a quick one time solution you can also do a cast (second solution in the link). Keep in mind that 'one time fixes' often end up being more than one time, doing it right the first time can save you a lot of hassle in the long run. Don't do the third solution (editing tsconfig).

You can also do quick inline interfaces for objects:
```typescript
let stringToNumMap: {[id: string]: num} = {};

 TypeScript may also ask for the new cast syntax

let maybeNum: any = 3;
let num: number = 1;
let new = num + (maybeNum as number); // Note this 'cast' is only compile time, does not actually cast/convert
```

**Q. That's not my error...**

A. Well there's a lot that could go weird. The short form for most issues: Make sure package.json hasn't been modified, close your IDE, run the yarn clean, yarn install, yarn build commands, reopen the IDE. If there's still a problem, you can always re-clone your repo if you wouldn't lose much work. Still not working? Post to Piazza (but please search first!).

 

**Q. WebStorm is not compiling my files**

A. Make sure it's enabled by going to Preferences > Languages & Frameworks > Typescript and check if the checkbox 'enable typescript compiler' is checked. If it is not, check it and you should be good to go. Also if you have set up Mocha in WebStorm, you can enable the Compile TypeScript option as a 'Before launch' setting to make sure it has always compiled when you run your tests. If it's still not compiling, you can always run yarn build manually, and check with a TA during labs or office hours.

**Q. What is TSLint and why is it making me brace my if statements?**

A. From [TSLint's official documentation](https://palantir.github.io/tslint/): a TSLint is a "static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors." In short: it's for protecting you from yourself. If your code has error of these kinds in it, it will not build. This ensures that common errors easily caught before runtime by a linter don't send you into hours of debugging later. We have given you a basic set of lint rules, which is subject to change in future deliverables.
 

\~Misc\~
 

**Q. When is \_\_\_\_\_\_?**

A. Most scheduling information can be found on the course webpage.
 

**Q. Do I have to attend my lab/can I attend other labs?**

A. You are not required to attend every lab, however attending labs on retrospective days is mandatory. Retrospective labs follow the final deadline for each deliverable (except for D0). You may also attend labs other than your own, however if you are in another lab that is busy, please respect that by giving TA help and lab seating priority to people from that lab.
 

**Q. Do I need to document my code?**

A. While not required, even if it feels like extra work you really should. Not only will it make working with your partner much easier, you may be surprised how much you can forget about your own code in a couple months.
 
