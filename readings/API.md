<!--- Split APIs and REST into different readings, add API design principles --->
# API

Application Programming Interfaces (API) describe the programmatic interfaces used for interacting with a software system. APIs can exist on many levels, from the method to class to online service. The primary purpose of APIs are to hide implementation details from the API consumer. This makes a system easier to use and enables the API owner to change their underlying implementation without affecting any API clients. 

While APIs have been defined and used for decades, the advent of web-based services has propelled API design into the the forefront of many organizations (typically through REST-based interfaces). This is because services can be hosted behind APIs giving API owners an easy mechanism for maintaining and updating their systems and controlling billing without having to release the actual source code for their systems. 

One consequence of providing a public API though is that once clients start to use them they are difficult (or impossible) to change, leading to the saying "API are forever". Because of their long lifetimes, it is important that software engineers carefully design their interfaces to make them easy to understand, use, maintain, secure, and extend. 

API design is an iterative process and good design requires collecting a variety of viewpoints (both internal to your organization and externally from engineers who will have to understand and use your API). There are typically many different design options for any given API, choosing the 'right' one will require balancing some of the concerns mentioned in the last paragraph. 

## Design principles

At a high-level the principles behind good API design mirror that of good design in general (we will talk about these in greater detail later in the course):

* APIs should do one thing, and do it well (also known as the single responsibility principle).

* APIs should be kept as small and simple as possible; once an API is released it is hard to remove.

* APIs should _never_ expose internal implementation details; these make it difficult for the consumer to use and for the maintainer when they want to change an internal implementation detail.

* The 'usability' of a system to another engineer is dictated by the quality of the API. This means names should be well considered and consistent and the APIs, their constraints, and their pre- and post-conditions should be documented.

We will expand on design in general later in the course. Joshua Bloch, the designer of the architect of the ```java.util``` package has a great set of slides on how to design [good APIs](http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/32713.pdf) online.

Many popular libraries have great APIs. While the [JDK](https://docs.oracle.com/javase/8/docs/api/) and [Android](https://developer.android.com/reference/packages.html) are huge, smaller libraries like [Guava](http://google.github.io/guava/releases/19.0/api/docs/) and [Joda-Time](http://www.joda.org/joda-time/quickstart.html) are also instructive. 

# REST

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) is an architectural style heavily used in web-based systems for providing services between different systems (and interfaces).  REST defines a means of connecting systems together that focuses on their interfaces rather than their implementations. In this way, REST provides a language to define a specific kind of APIs for communicating across a network. REST services are transported over the network using the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

<!---
TODO: topology figure (browser/server, app/server, server/server).
--->

REST services define their resources using uniform resource identifiers (URIs). URIs differ from URLs in that a URI does not define its network location and access mechanism (e.g., ```/dataset``` is a URI while ```http://foo.com/dataset``` is a URL).

Additional data can be sent to a REST endpoint in the form of HTTP headers. It is idiomatic for the headers to not contain any information about the location of the resource (this should be in the URI) or to carry any data about the request (this should be in the body); headers are mainly for sending metadata (e.g., to request the response data format or encoding or to provide authorization credentials).

## Verbs

Rest defines a set of verbs that are used when communicating with REST services. REST services respond with payloads (typically JSON or XML) and an integer-based response code.

* ```GET``` Used to read a resource. Get requests should never modify data on a server, meaning that calling them repeatedly should have no visible effects on the server (that is, the request is idempotent). GET requests can have a body but this is not idiomatic; requested resources are defined by the URI alone. Common response codes are 200 (ok) and 404 (not found).

* ```PUT``` Used to update a resource at a known URI. That said, PUT can also be used to create a resource if the client is allowed to define a new URI that does not already exist. Response bodies are not typically returned for these requests. PUT modifies server resources but in the same way for every request and can be considered idempotent. 200 (ok), 204 (no content), and 404 (not found) are common response codes. 

* ```POST``` Used to create a new resource. The response body should contain a URI to the newly-created resource. POST modifies server resources and is not idempotent. Typical response codes are 201 (created), 404 (not found), and 409 (conflict).

* ```DELETE``` Removes a resource from the server. Response body is typically not emitted. Although response codes will differ on subsequent requests, the resources on the server will be unchanged so this verb is idempotent. Typical response code is 200 (ok) or 404 (not found).

* ```PATCH```  Used to modify (not completely replace or delete) a resource. Not idempotent. This is the least-frequently used verb. Typical response codes are 200 (ok), 204 (no content), 404 (not found).

A simple set of [quick tips](http://www.restapitutorial.com/lessons/restquicktips.html) and [http status codes](httpstatuses.com) can be helpful for your reference.

## Design principles

REST services are often viewed as highly scalable. The main reason for this is that there is an expectation that the client maintains state instead of the server. This means that a client can interact with several different servers for a single set of requests (e.g., if one server gets overloaded requests can be transparently migrated). 

As a concrete example, if a client is trying to undertake a complex multi-step operation, it is the client's responsibility to keep track of where they are, not the server's responsibility. 

Servers are responsible for sending back detailed information about the resources they are returning so that clients have the ability to make further requests of the server with the correct URIs.

Several good REST API examples exist online, although the [Paypal API](https://developer.paypal.com/docs/api/) and [Strava](https://strava.github.io/api/) APIs stand out for their great documentation and examples.
