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

* **```PUT /dataset/:id```** allows to submit a zip file that will be parsed and used for future queries. The zip file content will be sent in base64 in the ```PUT``` body. 
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

BODY ::= 'WHERE:{'  FILTER '}' | '{}'
OPTIONS ::= 'OPTIONS:{' COLUMNS ', ' (SORT ', ')? VIEW '}'
TRANSFORMATIONS ::= 'TRANSFORMATIONS: 'G ROUP ', ' APPLY

FILTER ::= (LOGICCOMPARISON | MCOMPARISON | SCOMPARISON | NEGATION)

LOGICCOMPARISON ::= LOGIC ':[{' FILTER ('}, {' FILTER )* '}]'  
MCOMPARISON ::= MCOMPARATOR ':{' key ':' number '}'  
SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'  
NEGATION ::= 'NOT :{' FILTER '}'

LOGIC ::= 'AND' | 'OR' 
MCOMPARATOR ::= 'LT' | 'GT' | 'EQ' 

COLUMNS ::= 'COLUMNS:[' (string ',')* string ']' 
SORT ::= 'ORDER: ' ('{ dir:'  DIRECTION ', keys  : [ ' string (',' string)* ']}' | key) 
DIRECTION ::= 'UP' | 'DOWN'  
VIEW ::= 'FORM : TABLE'  

GROUP ::= 'GROUP: [' key+ ']'                                                          
APPLY ::= 'APPLY: [' (APPLYKEY (', ' APPLYKEY )* )? ']'  
APPLYKEY ::= '{' string ': {' APPLYTOKEN ':' key '}}'
APPLYTOKEN ::= 'MAX' | 'MIN' | 'AVG' | 'COUNT' | 'SUM'                           
```

Here is some further clarification about the EBNF that might be helpful for validating and answering queries:

* ```number``` and ```string``` are valid JavaScript ```number```/```string``` values. Note, some ```string```s require escaping if you are using them as keys in JSON. 

* An empty (```{}```) ```WHERE``` clause signals that all rows should be returned.

* ```GROUP: [term1, term2, ...]``` signifies that a group should be created for every unique set of all N-terms (e.g., ```[courses_dept, courses_id]``` would have a group for every unique pair of department/id records in the dataset. Every member of a ```GROUP``` always matches all terms in the ```GROUP``` array.

* ```GROUP``` and ```APPLY``` always appear together, and ```GROUP``` must contain at least one term (having each record in its own group does not make a lot of sense).

* If a ```GROUP``` is present, all ```COLUMNS``` terms must correspond to either ```GROUP``` terms or to terms defined in the ```APPLY``` block. ```COLUMNS``` terms with underscores must occur in ```GROUP``` while ```COLUMNS``` terms without underscores must be defined in ```APPLY```.

* ```APPLY``` enables the above listed computations on a group. The result of an ```APPLY``` should be a record containing the ```GROUP``` terms, and the terms defined by the ```APPLY```. 

* ```MAX/MIN/AVG``` should only be requested of numeric keys, while ```COUNT``` counts the number of unique rows in the group (according to the specified key). The ```string``` in ```APPLY``` should be unique (no two ```APPLY``` targets should have the same name). ```AVG``` should return a number rounded to two decimal places, ```COUNT``` should return whole numbers, and ```MIN/MAX``` should return the same number that is in the originating dataset. 

* ```SORT``` matches on multiple fields; these are read from first to last (e.g., ```SORT: {dir: 'up', keys: ['courses_dept', 'courses_id`]}``` will first sort on ```courses_dept``` and only use ```courses_id``` to break ties (e.g., to order courses that are all from within the same department). ```SORT``` terms can also be terms defined in the ```APPLY``` block. Ordering should be according to the ```<``` operator in TypeScript/JavaScript, not by ```localeCompare``` or the default ```sort()``` implementation. Note: This ```ORDER``` format is different than in D1 and D2(which just accepted a single string); your implementation should support both D1 and D2 syntax for the ```SORT``` element.

* ```WHERE``` is completely independent of ```GROUP```/```APPLY```; your solution should not need to change.

* Supporting ```AVG``` requires some extra challenges compared to the other operators. Since JavaScript numbers are represented by floating point numbers, performing this arithmetic can return different values depending on the order the operations take place. To account for this please take the following protections (this is not great, but works for the data in this deliverable). 
  1. Multiply all values (```x = x  * 10;```) being averaged by 10.
  1. Trim the resulting value (```x = Number(x.toFixed(0))```).
  1. Add the numbers being averaged (e.g., generate ```total```).
  1. Calculate the average (```var avg = total / numRows```).
  1. Divide by 10 (```var avg = avg / 10```);
  1. Trim the decimals (```var res = Number(avg.toFixed(2))```).

<!--
* An [alternate representation](Deliverable2_EBNF.xhtml) of the EBNF is also available.
-->

## Query examples

Query A:

```
{
    "WHERE": {
        "IS": {
            "rooms_furniture": "*Tables*"
        }
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
    }, {
        "rooms_shortname": "SRC",
        "maxSeats": 299
    }, {
        "rooms_shortname": "ANGU",
        "maxSeats": 260
    }, {
        "rooms_shortname": "PHRM",
        "maxSeats": 236
    }, {
        "rooms_shortname": "LSK",
        "maxSeats": 205
    }, {
        "rooms_shortname": "CHBE",
        "maxSeats": 200
    }, {
        "rooms_shortname": "SWNG",
        "maxSeats": 190
    }, {
        "rooms_shortname": "DMP",
        "maxSeats": 160
    }, {
        "rooms_shortname": "FRDM",
        "maxSeats": 160
    }, {
        "rooms_shortname": "IBLC",
        "maxSeats": 154
    }, {
        "rooms_shortname": "MCLD",
        "maxSeats": 136
    }, {
        "rooms_shortname": "WOOD",
        "maxSeats": 120
    }, {
        "rooms_shortname": "BUCH",
        "maxSeats": 108
    }, {
        "rooms_shortname": "CEME",
        "maxSeats": 100
    }, {
        "rooms_shortname": "GEOG",
        "maxSeats": 100
    }, {
        "rooms_shortname": "IONA",
        "maxSeats": 100
    }, {
        "rooms_shortname": "ALRD",
        "maxSeats": 94
    }, {
        "rooms_shortname": "LASR",
        "maxSeats": 80
    }, {
        "rooms_shortname": "ESB",
        "maxSeats": 80
    }, {
        "rooms_shortname": "BIOL",
        "maxSeats": 76
    }, {
        "rooms_shortname": "MCML",
        "maxSeats": 72
    }, {
        "rooms_shortname": "ORCH",
        "maxSeats": 72
    }, {
        "rooms_shortname": "BRKX",
        "maxSeats": 70
    }, {
        "rooms_shortname": "SPPH",
        "maxSeats": 66
    }, {
        "rooms_shortname": "FSC",
        "maxSeats": 65
    }, {
        "rooms_shortname": "FORW",
        "maxSeats": 63
    }, {
        "rooms_shortname": "MATH",
        "maxSeats": 60
    }, {
        "rooms_shortname": "SCRF",
        "maxSeats": 60
    }, {
        "rooms_shortname": "UCLL",
        "maxSeats": 55
    }, {
        "rooms_shortname": "EOSM",
        "maxSeats": 50
    }, {
        "rooms_shortname": "PCOH",
        "maxSeats": 40
    }, {
        "rooms_shortname": "ANSO",
        "maxSeats": 37
    }, {
        "rooms_shortname": "HENN",
        "maxSeats": 36
    }, {
        "rooms_shortname": "FNH",
        "maxSeats": 28
    }, {
        "rooms_shortname": "AUDX",
        "maxSeats": 21
    }, {
        "rooms_shortname": "SOWK",
        "maxSeats": 16
    }]
}
```

Query B:

```
{
    "WHERE": {},
    "OPTIONS": {
        "COLUMNS": [
            "courses_dept"
        ],
        "ORDER": "courses_dept",
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["courses_dept"],
        "APPLY": []
    }
}
```

Response B:

```
{
    "render": "TABLE",
    "result": [{
        "courses_dept": "aanb"
    }, {
        "courses_dept": "adhe"
    }, {
        "courses_dept": "anat"
    }, {
        "courses_dept": "anth"
    }, {
        "courses_dept": "apbi"
    }, {
        "courses_dept": "appp"
    }, {
        "courses_dept": "apsc"
    }, {
        "courses_dept": "arbc"
    }, {
        "courses_dept": "arch"
    }, {
        "courses_dept": "arcl"
    }, {
        "courses_dept": "arst"
    }, {
        "courses_dept": "arth"
    }, {
        "courses_dept": "asia"
    }, {
        "courses_dept": "asic"
    }, {
        "courses_dept": "astr"
    }, {
        "courses_dept": "astu"
    }, {
        "courses_dept": "atsc"
    }, {
        "courses_dept": "audi"
    }, {
        "courses_dept": "ba"
    }, {
        "courses_dept": "baac"
    }, {
        "courses_dept": "babs"
    }, {
        "courses_dept": "baen"
    }, {
        "courses_dept": "bafi"
    }, {
        "courses_dept": "bahr"
    }, {
        "courses_dept": "bait"
    }, {
        "courses_dept": "bala"
    }, {
        "courses_dept": "bama"
    }, {
        "courses_dept": "bams"
    }, {
        "courses_dept": "bapa"
    }, {
        "courses_dept": "basc"
    }, {
        "courses_dept": "basm"
    }, {
        "courses_dept": "baul"
    }, {
        "courses_dept": "bioc"
    }, {
        "courses_dept": "biof"
    }, {
        "courses_dept": "biol"
    }, {
        "courses_dept": "bmeg"
    }, {
        "courses_dept": "bota"
    }, {
        "courses_dept": "busi"
    }, {
        "courses_dept": "caps"
    }, {
        "courses_dept": "ccst"
    }, {
        "courses_dept": "ceen"
    }, {
        "courses_dept": "cell"
    }, {
        "courses_dept": "cens"
    }, {
        "courses_dept": "chbe"
    }, {
        "courses_dept": "chem"
    }, {
        "courses_dept": "chil"
    }, {
        "courses_dept": "chin"
    }, {
        "courses_dept": "cics"
    }, {
        "courses_dept": "civl"
    }, {
        "courses_dept": "clch"
    }, {
        "courses_dept": "clst"
    }, {
        "courses_dept": "cnps"
    }, {
        "courses_dept": "cnrs"
    }, {
        "courses_dept": "cnto"
    }, {
        "courses_dept": "coec"
    }, {
        "courses_dept": "cogs"
    }, {
        "courses_dept": "cohr"
    }, {
        "courses_dept": "comm"
    }, {
        "courses_dept": "cons"
    }, {
        "courses_dept": "cpen"
    }, {
        "courses_dept": "cpsc"
    }, {
        "courses_dept": "crwr"
    }, {
        "courses_dept": "dani"
    }, {
        "courses_dept": "dent"
    }, {
        "courses_dept": "dhyg"
    }, {
        "courses_dept": "eced"
    }, {
        "courses_dept": "econ"
    }, {
        "courses_dept": "edcp"
    }, {
        "courses_dept": "edst"
    }, {
        "courses_dept": "educ"
    }, {
        "courses_dept": "eece"
    }, {
        "courses_dept": "elec"
    }, {
        "courses_dept": "ends"
    }, {
        "courses_dept": "engl"
    }, {
        "courses_dept": "enph"
    }, {
        "courses_dept": "envr"
    }, {
        "courses_dept": "eosc"
    }, {
        "courses_dept": "epse"
    }, {
        "courses_dept": "etec"
    }, {
        "courses_dept": "fhis"
    }, {
        "courses_dept": "fipr"
    }, {
        "courses_dept": "fish"
    }, {
        "courses_dept": "fist"
    }, {
        "courses_dept": "fmst"
    }, {
        "courses_dept": "fnel"
    }, {
        "courses_dept": "fnh"
    }, {
        "courses_dept": "fnis"
    }, {
        "courses_dept": "food"
    }, {
        "courses_dept": "fopr"
    }, {
        "courses_dept": "fre"
    }, {
        "courses_dept": "fren"
    }, {
        "courses_dept": "frst"
    }, {
        "courses_dept": "gbpr"
    }, {
        "courses_dept": "geob"
    }, {
        "courses_dept": "geog"
    }, {
        "courses_dept": "germ"
    }, {
        "courses_dept": "gpp"
    }, {
        "courses_dept": "grek"
    }, {
        "courses_dept": "grsj"
    }, {
        "courses_dept": "gsat"
    }, {
        "courses_dept": "hebr"
    }, {
        "courses_dept": "hgse"
    }, {
        "courses_dept": "hinu"
    }, {
        "courses_dept": "hist"
    }, {
        "courses_dept": "hunu"
    }, {
        "courses_dept": "iar"
    }, {
        "courses_dept": "igen"
    }, {
        "courses_dept": "info"
    }, {
        "courses_dept": "isci"
    }, {
        "courses_dept": "ital"
    }, {
        "courses_dept": "itst"
    }, {
        "courses_dept": "iwme"
    }, {
        "courses_dept": "japn"
    }, {
        "courses_dept": "jrnl"
    }, {
        "courses_dept": "kin"
    }, {
        "courses_dept": "korn"
    }, {
        "courses_dept": "lais"
    }, {
        "courses_dept": "larc"
    }, {
        "courses_dept": "laso"
    }, {
        "courses_dept": "last"
    }, {
        "courses_dept": "latn"
    }, {
        "courses_dept": "law"
    }, {
        "courses_dept": "lfs"
    }, {
        "courses_dept": "libe"
    }, {
        "courses_dept": "libr"
    }, {
        "courses_dept": "ling"
    }, {
        "courses_dept": "lled"
    }, {
        "courses_dept": "math"
    }, {
        "courses_dept": "mdvl"
    }, {
        "courses_dept": "mech"
    }, {
        "courses_dept": "medg"
    }, {
        "courses_dept": "medi"
    }, {
        "courses_dept": "micb"
    }, {
        "courses_dept": "midw"
    }, {
        "courses_dept": "mine"
    }, {
        "courses_dept": "mrne"
    }, {
        "courses_dept": "mtrl"
    }, {
        "courses_dept": "musc"
    }, {
        "courses_dept": "name"
    }, {
        "courses_dept": "nest"
    }, {
        "courses_dept": "nrsc"
    }, {
        "courses_dept": "nurs"
    }, {
        "courses_dept": "obst"
    }, {
        "courses_dept": "onco"
    }, {
        "courses_dept": "path"
    }, {
        "courses_dept": "pcth"
    }, {
        "courses_dept": "pers"
    }, {
        "courses_dept": "phar"
    }, {
        "courses_dept": "phil"
    }, {
        "courses_dept": "phrm"
    }, {
        "courses_dept": "phth"
    }, {
        "courses_dept": "phys"
    }, {
        "courses_dept": "plan"
    }, {
        "courses_dept": "poli"
    }, {
        "courses_dept": "pols"
    }, {
        "courses_dept": "port"
    }, {
        "courses_dept": "psyc"
    }, {
        "courses_dept": "punj"
    }, {
        "courses_dept": "relg"
    }, {
        "courses_dept": "rgla"
    }, {
        "courses_dept": "rhsc"
    }, {
        "courses_dept": "rmes"
    }, {
        "courses_dept": "rmst"
    }, {
        "courses_dept": "rsot"
    }, {
        "courses_dept": "russ"
    }, {
        "courses_dept": "sans"
    }, {
        "courses_dept": "scan"
    }, {
        "courses_dept": "scie"
    }, {
        "courses_dept": "soci"
    }, {
        "courses_dept": "soil"
    }, {
        "courses_dept": "sowk"
    }, {
        "courses_dept": "span"
    }, {
        "courses_dept": "spha"
    }, {
        "courses_dept": "spph"
    }, {
        "courses_dept": "stat"
    }, {
        "courses_dept": "sts"
    }, {
        "courses_dept": "surg"
    }, {
        "courses_dept": "swed"
    }, {
        "courses_dept": "test"
    }, {
        "courses_dept": "thtr"
    }, {
        "courses_dept": "udes"
    }, {
        "courses_dept": "ufor"
    }, {
        "courses_dept": "urst"
    }, {
        "courses_dept": "ursy"
    }, {
        "courses_dept": "vant"
    }, {
        "courses_dept": "visa"
    }, {
        "courses_dept": "wood"
    }, {
        "courses_dept": "wrds"
    }, {
        "courses_dept": "zool"
    }]
}
```

## Testing

The [testing](Deliverable2.md#testing) requirements and grading provisions for this deliverable are unchanged from Deliverable 2.

## Contribution statement
 
In your repository, each teammate should commit a file called ```/D3-contrib_GitHubId.md```. This file should contain a short description of your concrete contributions to your D2 code. All that is required is a few sentences followed by links to some of your key GitHub commits (full links so we can click on them would be appreciated) for Deliverable 2. If you do not have any (or very few) commits, you may use additional space to explain your concrete contributions. This should be committed before you meet with your TAs in the lab as you will refer to this file in your meeting with them.
 
It would also be helpful if the first two lines of the file contained your final test pass rate on the deadline and your code coverage rate (computed as described in the Deliverable 1 document). Remember, attendance in the lab the week of due date is mandatory so the TAs can do your retrospective evaluation; failure to attend will result in a retrospective score of 0.
 
 
