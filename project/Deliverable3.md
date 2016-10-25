# Deliverable 3: insightUBC Room Expansion

[Deliverable 1](Deliverable1.md) built a query engine to answer queries about UBC course sections.[Deliverable 2](Deliverable2.md) extended the query engine to aggregate answers about actual courses. This deliverable will extend the input data to include data about the physical spaces where classes are held on campus. This deliverable will be due at noon on November 14.

### NOTE: sample queries and test suite will be added shortly.


## Dataset

This data has been obtained from the UBC [Building and classrooms](http://students.ubc.ca/campus/discover/buildings-and-classrooms) listing and has not been modified in any way. The data is provided as a zip file: inside of the zip you will find ```index.html``` which specifies each building on campus. These link to files also in the zip containing details about each building and room in HTML format. This dataset will be ```PUT/DELETE``` with ```rooms``` for the ```id```. Populating your data structure from the HTML files will likely be the most time consuming part of this deliverable.

As with Deliverable1 you need to process and store this datafile in an intermediate format on disk for quicker or more convenient access. Make sure you do not commit this cached file to version control or AutoTest will figure it out and tests will fail in ways you do not expect.

You are not allowed to modify the dataset in any way other than to convert it to your data structure. Your implementation will be tested with the original copy of the dataset, so any modification will most likely lead to tests failing.

You are free to use one new dependency for this deliverable (if you wish, using this is not required) called [Parse5](https://github.com/inikulin/parse5). To install it do the following:

```
npm install parse5 --save
typings install dt~parse5 --save --global
```

## REST endpoints

The [REST endpoints](Deliverable1.md#rest-endpoints) for this deliverable are unchanged from Deliverable 1.

### Query language

The [query language](Deliverable2.md#query-engine) for this deliverable are unchanged from Deliverable 2.

### Valid keys

In addition to the valid keys from [Deliverable 1](Deliverable1.md#valid-keys) and from [Deliverable 2](Deliverable2.md#valid-keys), this deliverable adds a variety of new keys.

* **rooms_fullName**: ```string```; Full building name (e.g., "Hugh Dempster Pavilion").
* **rooms_shortName**: ```string```; Short building name (e.g., "DMP").
* **rooms_number**: ```number```; The room number.
* **rooms_id**: ```string```; The room id; should be ```rooms_shortname```+"_"+```rooms_number```.
* **rooms_address**: ```string```; The building address. (e.g., "6245 Agronomy Road V6T 1Z4").
* **rooms_lat**: ```number```; The latitude of the building. Instructions for getting this field are below.
* **rooms_lon**: ```number```; The latitude of the building. Instructions for getting this field are below.
* **rooms_seats**: ```number```; The number of seats in the room.
* **rooms_type**: ```string```; The room type (e.g., "Small Group").
* **rooms_furniture**: ```string```; The room type (e.g., "Classroom-Movable Tables & Chairs").
* **rooms_href**: ```string```; The link to full details online (e.g., "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201").

We are also adding on field to the ```courses``` dataset: 

* **courses_year**: ```number```; This key represents the year the course was offered. If the ```"Section":"overall"``` property is set, the year should be 1900 (we will not be using these in D3 or D4 and this will help get these sections out of the way).

Note: these keys are different than may be present in the data. Since you are not allowed to modify the data, you will have to come up with a way to translate them. Unlike Deliverable 1, the data source will require some parsing and analysis before it is ready to be consumed (it is HTML).

Geocoding an address to a latitude/longitude pair is usually performed using online web services. To avoid problems with our spamming different geolocation providers we will be providing a web service for you to use for this purpose. Once the service is up and running the details will be included here.

## Query examples

```
// Queries will be added once the dataset is finalized.
```

## Testing

The [testing](Deliverable2.md#testing) requirements and grading provisions for this deliverable are unchanged from Deliverable 2.


