# REST

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) is an architectural style heavily used in web-based systems for providing services between different systems (and interfaces).  REST defines a means of connecting systems together that focuses on their interfaces rather than their implementations using self-descriptive messages. In this way, REST provides a language to define a specific kind of [APIs](API.md) for communicating across a network. REST services are transported over the network using the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

<img src="./figures/REST_network.png" width="480px" alt="REST topology">

REST services define their resources using uniform resource identifiers (URIs). URIs differ from URLs in that a URI does not define its network location and access mechanism (e.g., ```/dataset``` is a URI while ```http://foo.com/dataset``` is a URL).

Additional data can be sent to a REST endpoint in the form of HTTP headers or in the HTTP body. It is idiomatic for headers to not contain any information about the location of the resource (this should be in the URI) or to carry any data about the request (this should be in the body); headers are mainly for sending metadata (e.g., to request the response data format or encoding or to provide authorization credentials).

## Verbs

REST describes how HTTP verbs should be used when communicating with REST services. REST services respond with payloads (typically JSON or XML) and an integer-based response code. Each REST request uses only one verb and receives only one response.

* ```GET``` Used to read a resource. Get requests should never modify data on a server, meaning that calling them repeatedly should have no visible effects on the server (that is, the request is idempotent). GET requests can have a body but this is not idiomatic; requested resources are defined by the URI alone. Common response codes are 200 (ok) and 404 (not found).

* ```PUT``` Used to update a resource at a known URI. That said, PUT can also be used to create a resource if the client is allowed to define a new URI that does not already exist. Response bodies are not typically returned for these requests. PUT modifies server resources but in the same way for every request and can be considered idempotent. 200 (ok), 204 (no content), and 404 (not found) are common response codes. 

* ```POST``` Used to create a new resource. The response body should contain a URI to the newly-created resource. POST modifies server resources and is not idempotent. Typical response codes are 201 (created), 404 (not found), and 409 (conflict).

* ```DELETE``` Removes a resource from the server. Response body is typically not emitted. Although response codes will differ on subsequent requests, the resources on the server will be unchanged so this verb is idempotent. Typical response code is 200 (ok) or 404 (not found).

* ```PATCH```  Used to modify (not completely replace or delete) a resource. Not idempotent. This is the least-frequently used verb. Typical response codes are 200 (ok), 204 (no content), 404 (not found).

A simple set of [quick tips](http://www.restapitutorial.com/lessons/restquicktips.html) and [http status codes](httpstatuses.com) can be helpful for your reference.

REST services almost universally respond to requests with XML or JSON requests. XML documents are more verbose, harder to read and write by hand, and are more difficult to parse.

```xml
<?xml version="1.0" encoding="utf-8"?>
<response>
	<code>200</code>
</response>
```

In contrast, JSON documents are easier to read and write, are less verbose, and are easier to parse but are not amenable to comments which can make them harder to document (in a way that is still a valid JSON document).

```json
{
	"code": 200
}
```

The pushback against XML can be more clearly understood when looking at a SOAP envelope, one of the predominant forms of communicating between network services when JSON was developed:

```xml
<?xml version="1.0"?>
<soap:Envelope
	xmlns:soap="http://www.w3.org/2003/05/soap-envelope/"
	soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">
	<soap:Header>
		<origin>remote</origin>
	</soap:Header>
	<soap:Body>
		<response code="200"></response>
	</soap:Body>
</soap:Envelope>
```

## Statelessness

REST services are often viewed as highly scalable. The main reason for this is that there is an expectation that the client maintains state instead of the server. This means that a client can interact with several different servers for a single set of requests (e.g., if one server gets overloaded requests can be transparently migrated). 

As a concrete example, if a client is trying to undertake a complex multi-step operation, it is the client's responsibility to keep track of where they are, not the server's responsibility. 

Servers are responsible for sending back detailed information about the resources they are returning so that clients have the ability to make further requests of the server with the correct URIs. For example, while could might expect the GitHub ```POST /user/:repo``` endpoint to simply return ```{success: true}``` if a repository was successfully created, it instead returns a wide variety of information that can be used by the user to construct any subsequent requests:

```json
Status: 201 Created
Location: https://api.github.com/repos/octocat/Hello-World
{
  "id": 1296269,
  "owner": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "description": "This your first repo!",
  "private": false,
  "fork": true,
  "url": "https://api.github.com/repos/octocat/Hello-World",
  "html_url": "https://github.com/octocat/Hello-World",
  "archive_url": "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
  "assignees_url": "http://api.github.com/repos/octocat/Hello-World/assignees{/user}",
  "blobs_url": "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
  "branches_url": "http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
  "clone_url": "https://github.com/octocat/Hello-World.git",
  "collaborators_url": "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
  "comments_url": "http://api.github.com/repos/octocat/Hello-World/comments{/number}",
  "commits_url": "http://api.github.com/repos/octocat/Hello-World/commits{/sha}",
  "compare_url": "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
  "contents_url": "http://api.github.com/repos/octocat/Hello-World/contents/{+path}",
  "contributors_url": "http://api.github.com/repos/octocat/Hello-World/contributors",
  "deployments_url": "http://api.github.com/repos/octocat/Hello-World/deployments",
  "downloads_url": "http://api.github.com/repos/octocat/Hello-World/downloads",
  "events_url": "http://api.github.com/repos/octocat/Hello-World/events",
  "forks_url": "http://api.github.com/repos/octocat/Hello-World/forks",
  "git_commits_url": "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
  "git_refs_url": "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
  "git_tags_url": "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
  "git_url": "git:github.com/octocat/Hello-World.git",
  "hooks_url": "http://api.github.com/repos/octocat/Hello-World/hooks",
  "issue_comment_url": "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
  "issue_events_url": "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
  "issues_url": "http://api.github.com/repos/octocat/Hello-World/issues{/number}",
  "keys_url": "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
  "labels_url": "http://api.github.com/repos/octocat/Hello-World/labels{/name}",
  "languages_url": "http://api.github.com/repos/octocat/Hello-World/languages",
  "merges_url": "http://api.github.com/repos/octocat/Hello-World/merges",
  "milestones_url": "http://api.github.com/repos/octocat/Hello-World/milestones{/number}",
  "mirror_url": "git:git.example.com/octocat/Hello-World",
  "notifications_url": "http://api.github.com/repos/octocat/Hello-World/notifications{?since, all, participating}",
  "pulls_url": "http://api.github.com/repos/octocat/Hello-World/pulls{/number}",
  "releases_url": "http://api.github.com/repos/octocat/Hello-World/releases{/id}",
  "ssh_url": "git@github.com:octocat/Hello-World.git",
  "stargazers_url": "http://api.github.com/repos/octocat/Hello-World/stargazers",
  "statuses_url": "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
  "subscribers_url": "http://api.github.com/repos/octocat/Hello-World/subscribers",
  "subscription_url": "http://api.github.com/repos/octocat/Hello-World/subscription",
  "svn_url": "https://svn.github.com/octocat/Hello-World",
  "tags_url": "http://api.github.com/repos/octocat/Hello-World/tags",
  "teams_url": "http://api.github.com/repos/octocat/Hello-World/teams",
  "trees_url": "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
  "homepage": "https://github.com",
  "language": null,
  "forks_count": 9,
  "stargazers_count": 80,
  "watchers_count": 80,
  "size": 108,
  "default_branch": "master",
  "open_issues_count": 0,
  "has_issues": true,
  "has_wiki": true,
  "has_pages": false,
  "has_downloads": true,
  "pushed_at": "2011-01-26T19:06:43Z",
  "created_at": "2011-01-26T19:01:12Z",
  "updated_at": "2011-01-26T19:14:43Z",
  "permissions": {
    "admin": false,
    "push": false,
    "pull": true
  }
}
```

Another example of this is in terms of pagination. Instead of expecting there to be a REST endpoint called ```GET /:query/next``` which would require the server to keep track of the next result for every client, in REST-based systems a more appropriate endpoint would be ```GET /:query/:rowNum``` where the client would instead track which row they wanted to see next.

## Design goals

There are several orthogonal ideas to keep in mind when designing REST APIs. 

The first is that the API must provide a _valuable_ service. Without this value, the API will not be widely used, no matter how well it is designed. Value can be derived in many ways be it through access to data (like a weather API), access to a piece of functionality (like a machine learning API), or access to an audience (like a social network API). 

APIs should also be sufficiently _flexible_ to work in a wide variety of circumstances. This might mean providing multiple data formats, supporting different protocols, or versions. Additionally, enabling batch or update operations can also ease common developer tasks that might otherwise be hard to perform. This often involves considering the bootstrap process and how long it takes a developer from visiting an API document to successfully making a query (often referred to as the time-to-hello-world). 

Effectively _measuring_ your APIs is also important for understanding how your customers are using your system. When an API is servicing hundreds of thousands of requests per day, it is important to understand how your endpoints are being used and how they are generating errors. These measurements are useful both to the API developer to monitor the API, but also for API clients so they can check on the API if they are having any difficulties. Many API platforms have status pages where you can check how the [platform](https://dev.twitter.com/overview/status) [is](https://status.stripe.com/) [performing](https://status.github.com/). 

Finally, effective API _documentation_ is key for helping developers understand how to use any API. These documents should clearly describe what the API does, what parameters it expects, and the structure of its return document. Concrete examples showing how the API can be used are also extremely helpful in this context. Many [great](https://developer.github.com/v3/) [examples](https://strava.github.io/api/) can be found online demonstrating effective REST API documentation.

<!--
TODO: authentication, tokens
-->

<!--
### References

* Several good REST API examples exist online, although the [Paypal API](https://developer.paypal.com/docs/api/) and [Strava](https://strava.github.io/api/) APIs stand out for their great documentation and examples.
-->

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
