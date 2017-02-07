# Deliverable 2: insightUBC Room Expansion

[Deliverable 1](Deliverable1.md) built a query engine to answer queries about UBC course sections. This deliverable will extend the input data to include data about the physical spaces where classes are held on campus. This deliverable will be due at noon on February 27.

### NOTE: the test suite will be released on Feb 13.

## Dataset

This data has been obtained from the UBC [Building and classrooms](http://students.ubc.ca/campus/discover/buildings-and-classrooms) listing. The data is provided as a zip file: inside of the zip you will find ```index.html``` which specifies each building on campus. These link to files also in the zip containing details about each building and room in HTML format. Only buildings linked from the index should be considered, and all buildings linked from the index should be considered valid buildings. We will call ```addDataset``` with ```rooms``` for the ```id```. Populating your data structure from the HTML files will likely be the most time consuming part of this deliverable.

As with Deliverable 1, you need to process and store this datafile in an intermediate format on disk for quicker or more convenient access. Make sure you do not commit this cached file to version control or AutoTest will figure it out and tests will fail in ways you do not expect. If your test suite relies on files you may add these to the repo, but know they will not exist for our AutoTest runs.

You are not allowed to modify the dataset in any way other than to convert it to your data structure. Your implementation will be tested with the original copy of the dataset, so any modification will most likely lead to tests failing.

To help with the parsing we have ensured that ```parse5``` is included in your project dependency list. Also, we have removed ```request-promise-native``` from your allowed packages list. If you want to just update your dependency list, copy [package.json](https://github.com/CS310-2017Jan/bootstrap/blob/master/package.json) from the bootstrap repo into your own repository.

The dataset can be found [here](https://github.com/ubccpsc/310/tree/2017jan/project/rooms.zip). You can place this file anywhere you want in your system; we will use our own copy when running AutoTest and a slightly different copy for our private AutoTest tests.

## InsightFacade

The [InsightFacade](Deliverable1.md#api) API is unchanged in this Deliverable.

### Query language

The [query language](Deliverable1.md#query-engine) for this deliverable is unchanged from Deliverable 1.

### Valid keys

In addition to the valid keys from [Deliverable 1](Deliverable1.md#valid-keys), this deliverable adds a variety of new keys.

* **rooms_fullname**: ```string```; Full building name (e.g., "Hugh Dempster Pavilion").
* **rooms_shortname**: ```string```; Short building name (e.g., "DMP").
* **rooms_number**: ```string```; The room number. Not always a number, so represented as a string.
* **rooms_name**: ```string```; The room id; should be ```rooms_shortname```+"_"+```rooms_number```.
* **rooms_address**: ```string```; The building address. (e.g., "6245 Agronomy Road V6T 1Z4").
* **rooms_lat**: ```number```; The latitude of the building. Instructions for getting this field are below.
* **rooms_lon**: ```number```; The longitude of the building. Instructions for getting this field are below.
* **rooms_seats**: ```number```; The number of seats in the room.
* **rooms_type**: ```string```; The room type (e.g., "Small Group").
* **rooms_furniture**: ```string```; The room type (e.g., "Classroom-Movable Tables & Chairs").
* **rooms_href**: ```string```; The link to full details online (e.g., "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201").

We are also adding on field to the ```courses``` dataset: 

* **courses_year**: ```number```; This key represents the year the course was offered. If the ``` "Section":"overall" ``` property is set, the year should be 1900 (we will not be using these in D3 or D4 and this will help get these sections out of the way).

Note: these keys are different than may be present in the data. Since you are not allowed to modify the data, you will have to come up with a way to translate them. Unlike Deliverable 1, the data source will require some parsing and analysis before it is ready to be consumed (it is HTML and not JSON).

Geocoding an address to a latitude/longitude pair is usually performed using online web services. To avoid problems with our spamming different geolocation providers we will be providing a web service for you to use for this purpose. To form a query, send a GET request (using the node ```http``` module) to:

```
http://skaha.cs.ubc.ca:8022/api/v1/team<YOUR-TEAM-NUMBER>/<ADDRESS>
```

The response will match the following interface (either you will get ```lat && lon``` or ```error```, but never both):

```
interface GeoResponse {
    lat?: number;
    lon?: number;
    error?: string;
}
```

```ADDRESS``` should be URL-encoded version of ```rooms_address``` (e.g.,
```6245 Agronomy Road V6T 1Z4``` should be represented as ```6245%20Agronomy%20Road%20V6T%201Z4```). Addresses should be given _exactly_ as they appear in the data files, or ```404``` will be returned.

Since we are hosting this service it _could_ be killed by DOS attacks, please try not to overload the service. You should only need to query this when you are processing the initial dataset, not when you are answering queries.

## Query examples

*TBA*

## Testing

The [testing](Deliverable1.md#testing) requirements and grading provisions for this deliverable are unchanged from Deliverable 1, except that we will set the coverage score to 0 for any group found to be inflating their coverage values by inserting dummy/fake code into their repositories solely to inflate their coverage score.

## Contribution statement
 
In your repository, each teammate should commit a file called ```/D2-contrib_<GitHubId>.md```. This file should contain a short description of your concrete contributions to your D2 code. All that is required is a few sentences followed by links to some of your key Github commits (full links so we can click on them would be appreciated) for Deliverable 2. If you do not have any (or very few) commits, you may use additional space to explain your concrete contributions. This should be committed before you meet with your TAs in the lab as you will refer to this file in your meeting with them.
 
It would also be helpful if the first two lines of the file contained your final test pass rate on Monday @ noon and your code coverage rate (computed as described in the Deliverable 1 document) on Monday @ noon.
 
 
