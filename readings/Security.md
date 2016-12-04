# Security

Software security is a pervasive cross-cutting design concern of grave importance to modern software systems. Security concerns are not just about bad actors but also include unlucky users, untrained users, or malicious insiders. While there are obvious monetary costs associated with security (for instance through money being stolen directly), personnel costs, customer loss, and legal violations also have important indirect costs. Additionally, reputation, privacy, and customer satisfaction can all be influenced by the security of a system. This reading provides only the briefest of glimpses into the field of security.

> Security is ultimately concerned with managing risk whereby the risks are are balanced against the costs associated with securing the system.
 
Security comprises a huge space including physical security (e.g., key loggers), system security (e.g., denial of service), network security (e.g., man-in-the-middle), and human security (e.g., social engineering). Assets represent the information or systems that is being secured. The subjects of the system are the people who use, administer, and may try to infiltrate or undermine the system. Policies are required to understand which subjects are allowed to access which assets. Threats represent the reason we need policies (e.g., the existence of unauthorized subjects accessing the wrong assets through software vulnerabilities). 

Risk can often be summarized in a simplistic, but informative formula:

> ```risk = threat x exposure x impact```

Three high-level requirements pervade most software security discussions: 

* ***Confidentiality***: Preventing unauthorized parties from accessing (or even knowing about) secured data.
* ***Integrity***: Ensuring that only authorized parties can manipulate data, and only in an approved manner.
* ***Availability***: Resources should always be accessible by authorized users on appropriate occasions.

There are four high-level steps involved in securing systems:

1. ***Understanding***: Before we can secure a system we need to understand the system and its context.

1. ***Analysis***: The longest phase involves taking our understanding of the system and building meaningful threat models to understand how and why a subject would want to violate the system's security policies.

1. ***Mitigation***: Once this understanding has been built, the work of actually securing the system begins. At its simplest, this involves reducing the amount of system surface available to unauthorized parties while maintaining authorized user access.

1. ***Validation***: Finally, testing and security reviews are crucial to check the mitigation steps have been successful.

There are a variety of kinds (personas) of unauthorized user, all of whom may have different motivations for compromising a system.

* Accidental attackers.
* Automated malware.
* Curious attackers.
* Script kiddies.
* Motivated attackers.
* State actors.

Each of these personas will have different motivations, goals, and techniques available to them. In particular, approaches further down the list will have the expertise and resources to exploit much more challenging system vulnerabilities. The [STRIDE](https://msdn.microsoft.com/en-us/library/ee823878(v=cs.20).aspx) threat model was developed at Microsoft to characterize the kinds of vectors these personas may employ to gain access to the system.

* ***S***poofing: pretend to be another subject.
* ***T***ampering: modifying data.
* ***R***epudiation: denying performing a task.
* ***I***nformation disclosure: access private data.
* ***D***enial of service: halt service.
* ***E***levation of privilege: gaining unauthorized rights.

Several security principles have been developed to help mitigate some of these vectors (this is an incredibly incomplete list):

* ***Defence in depth***: XXX

* ***Least privilege***: XXX

* ***Separation of duties***: XXX

* ***Strong authentication***: XXX

* ***Non-repudiation***: XXX


### References

* [OWASP](https://www.owasp.org)

* [Web application](http://martinfowler.com/articles/web-security-basics.html#ProtectUserSessions) discussion.

---
![] (figures/CCSA.png "Creative Commons: Attribution-ShareAlike") [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
