# Lab 1

There are five main objectives for this lab:

1) Familiarize the students with git.

2) Get the students to configure their environment.

3) Start on some easy code changes.

4) Make some more advanced changes, for those who are ready.

5) Get students signed into ClassPortal.

### 1) Git

The first thing they're going to need to do is to understand how to checkout the sample repo. 

* The repo is here: [https://github.com/rtholmes/cpsc310starter](https://github.com/rtholmes/cpsc310starter).

* The clone command will be: ```git clone https://github.com/rtholmes/cpsc310starter.git```

* The [Atlassian resources](https://www.atlassian.com/git/tutorials/setting-up-a-repository) are really good; students who are having trouble should walk through them. Expect some questions. The link is available for them in the project description. 

### 2) Environment

The students should follow the steps outlined in the [starter project README](https://github.com/rtholmes/cpsc310starter/blob/master/README.md).

They should probably be able to both work with the ```npm run``` commands in the terminal and also build/run the code in some IDE if they want a GUI.

They should also sign up for a Github account, if they don't already have one.

### 3) Initial dev activity

There is one failing test in the starter project (we went over how to fix this in class). At the very least, they should fix this test and be able to run the unit tests.


### 4) Advanced dev activity

Enhance the ```query``` endpoint to support more advanced queries. For example, given the the following input:

On OSX / Linux:
```
curl -H 'Content-Type: application/json' -is -X POST -d '{ "add": [1,1,2,3,5] }' http://localhost:4321/query
```
On Windows:
```
Invoke-RestMethod http://localhost:4321/query -ContentType 'application/json' -Method Post -Body '{ "add": [1,1,2,3,5] }'
```

The server should return:

```
{result: 12}
```

A second enhancement would be:

On OSX / Linux:
```
curl -H 'Content-Type: application/json' -is -X POST -d '{ "multiply": [1,1,2,3,5] }' http://localhost:4321/query
```
On Windows:
```
Invoke-RestMethod http://localhost:4321/query -ContentType 'application/json' -Method Post -Body '{ "multiply": [1,1,2,3,5] }'
```

output:

```
{result: 30}
```

This should only involve writing code in ```QueryController``` (the ```QueryRequest``` interface in that file will also need to be changed). The next step would be to write some unit tests in ```QueryControllerSpec```. 

### 5) Register on ClassPortal

Students meeting the following criteria can log into ClassPortal:

1) They are in a team.

2) They are registered in the course (not the waitlist).

3) Both teammates are registered in the _same_ lab, and they are in your lab.

If these conditions are true, they can use the portal. NOTE: the system doesn't check these conditions, so please make them **super** clear to the students. Students who meet this criteria should log in, associate their Github id with their student id, and form a team. While they both need to sign in, only one needs to form the team. The portal is in beta, there might be bugs. If you have problems, let me know on slack.

They can find the portal here: [http://skaha.cs.ubc.ca:8020/](http://skaha.cs.ubc.ca:8020/)







