# Lab 1

There are five main objectives for this lab:

1) Familiarize yourself with git.

2) Get your development environment configured.

3) Start on some easy code changes.

4) Make some more advanced changes, once the simple ones have been resolved.

5) Register yourself on class portal.

### 1) Git

The first thing you will need to do going to need to do is to understand how to checkout the sample repo. 

* The repo is here: [https://github.com/rtholmes/cpsc310starter](https://github.com/rtholmes/cpsc310starter).

* The clone command will be: ```git clone https://github.com/rtholmes/cpsc310starter.git```

* The [Atlassian resources](https://www.atlassian.com/git/tutorials/setting-up-a-repository) are really good; if you are having trouble with Git, please walk through this.

### 2) Environment

Please follow the steps outlined in the [starter project README](https://github.com/rtholmes/cpsc310starter/blob/master/README.md).

You should probably be able to both work with the ```npm run``` commands in the terminal and also build/run the code in some IDE if you want a GUI-based experience.

You should sign up for a Github account, if they don't already have one. If you have one, but do not want to use it for this class, feel free to sign up for a 310-specific account.


### 3) Initial dev activity

There is one failing test in the starter project (we went over how to fix this in class). At the very least, you should fix this test and be able to run the unit tests.


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

If you meet following criteria, you can log into ClassPortal:

1) You are in a team.

2) Your are registered in the course (not the waitlist).

3) Both you and your teammate are registered in the _same_ lab.

If these conditions are true, you can use the portal. NOTE: the system doesn't check these conditions, so please take **extreme** care to ensure you meet the restrictions. If you do, please should log in, associate your Github id with your student id, and form a team. Both students need to sign in, although only one needs to form the team. The portal is in beta, there might be bugs. If you have problems, please let your TAs know.

You can find ClassPortal here: [http://skaha.cs.ubc.ca:8020/](http://skaha.cs.ubc.ca:8020/)







