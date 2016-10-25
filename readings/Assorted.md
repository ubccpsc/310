# Assorted topics

This reading contains a set of somewhat disconnected topics that we talked about during the term that do not cleanly integrate with the main assigned readings.


### Cloud computing

In the 1970s most computation took place on large mainframe computers. As desktop computers gained popularity in the 1980s computation moved out of the server room and onto individual desks. With the emergence of mobile computing and the explosion in data storage in the 2000s computation again migrated towards 'the cloud'. The National Institute of Science and Technology [defines](https://www.nist.gov/sites/default/files/documents/itl/cloud/cloud-def-v15.pdf) cloud computing as: 

> "A model for enabling convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction."

This definition captures several key characteristics of cloud infrastructures including resource sharing, rapid elasticity, minimal service provider overhead. Minimal overhead implies that customers can expand their services without provider interaction; this means cloud services must have extra resources available at any given time and provide mechanisms for automatically growing to match customer usage. Shared resources mean that cloud customers to not have a reasonable expectation that they are the only user of a given computer or network resource. Multi-tenancy also means that logical resources can be scattered across multiple physical machines and data centres. Finally, rapid elasticity implies cloud customers can quickly and dynamically both increase and decrease their cloud footprint as their customer needs change. Cloud services come in three high-level flavours:

* ***SaaS*** Software as a service (SaaS) such as Google Docs or Office 365 are essentially vendor-controlled remote applications. Vendors are able to upgrade these at will without customer intervention; this also means the customer has little say in the application itself as they do not control its update cycle. Services are always hosted remotely by the vendor and all data is stored on their servers which can have both cause privacy and security concerns. 

* ***PaaS*** Platform as a service (Paas) such as Google AppEngine or Salesforce provide vendor-controlled platforms that customers can augment and extend. The flexibility offered to customers is generally limited, but in specific ways that enable the vendor to more effectively manage and scale the platform. From the vendor's point of view though, their extension points allow customers to both better meet their own needs and to extend the underlying functionality of their systems at little cost to the vendor themselves. As with SaaS systems, these are universally hosted in the cloud on vendor machines and have similar attendant drawbacks.

* ***IaaS*** Infrastructure as a service (IaaS) such as Amazon EC2 or Microsoft Azure was the original model of cloud-based services. In IaaS the vendor provides minimal support to developers but in exchange enable them to have a large amount of flexibility in how they wish to configure their systems. While these systems initially started as mechanisms for launching simple virtual machines, they have greatly expanded into all kinds if specific services (e.g., machine learning, statistical analysis, etc.) that can be easily deployed at runtime. Some IaaS providers allow 'on prem' installation whereby the cloud resources are hosted on the customer's site which can improve security or privacy concerns.

Modern software systems are frequently hosted (at least partially) in the cloud. These cloud-backed services provide APIs over the network (typically REST-based) to clients that can connect using browsers, mobile apps, or custom programs. This style of development has also led to micro-service architectures whereby a system can be developed as a series of independently-deployable services that communicate with one another (and clients) at runtime. 

Cloud-based services also offer many advantages to software engineers. By deploying to the cloud engineers can quickly deploy updates and fix faults. They are also able to more effectively instrument their code allowing for analytics to be performed on their systems in situ allowing for a better understanding of how their systems are being used in practice.

<!---
Development teams also leverage cloud resources while they develop their systems. The most common tasks hosted in the cloud are version control and continuous integration services. 
--->

---
![] (figures/CCSA.png "Creative Commons: Attribution-ShareAlike") Reid Holmes
