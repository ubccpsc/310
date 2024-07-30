---
title: "Ethics"
weight: 2
---

Due to the breadth and impact of software, it is unsurprising that the decisions software engineers make frequently require careful ethical consideration. The field of ethics involves the study of moral principles and values. Ethics intersects with software engineering across the product lifecycle including during requirements analysis, system design, implementation, validation, and after deployment.

At a high-level, some common ways software engineering considerations intersect ethical considerations include:

* ***Trust.*** Software systems are incredibly complex and have wide-ranging societal impact. Given the critical roles software systems play in society, whether in medical devices, transportation, or finance, users need to be able to trust that systems are secure and trustworthy. Software engineers must carefully consider the potential consequences of their systems to consider whether they may violate ethical values.

* ***Defects.*** Given the impact software has on modern life, software reliability can have clear impacts on the safety of people or groups. During design, development, and validation decisions can be made that prioritize schedule and cost over the impact defects may have on users.

* ***Data.*** Software systems can collect and aggregate large volumes of data on individuals. These data can include names, demographic information, health records, financial records, and information about online activities. Collecting these data may be appealing from a business-perspective, but must be within the framework of both the law and the consent solicited from users. Privacy-preservation is often more challenging than is appreciated at a high-level, especially when motivated groups seek to break privacy protections.

* ***IP.*** Software systems are the byproduct of the (often expensive) expenditure of intellectual effort. To protect the investments of these efforts, individuals and companies rely on intellectual property mechanisms to protect their intellectual efforts. More details on these mechanisms can be found in the [IP reading](IP.md).

Ultimately, the impact software engineers can have on society requires that engineers also carefully consider the ethical ramifications of their actions.

## Professionalism

Professional guidelines have been developed to provide guidance to software engineers to help them understand the scope of their professional responsibilities, which include ethical concerns. The [ACM code of ethics](https://www.acm.org/code-of-ethics) is one such set of guidelines. While research [has shown](https://jssmith1.github.io/assets/pdf/FSE18_NIER.pdf) that reading the ACM code of ethics alone might not induce the consideration one might hope, the document is still a valuable source that details the diversity of professional concerns facing software engineers. In this way, the code acts as a mechanism to reduce the 'unknown unknowns' by casting light on the ethical responsibilities software engineers have. The ACM code is broken down into three broad sections which reflect the breadth of concerns software engineers are responsible for considering. 

The first section, *general principles*, details the high-level ethical guidelines software engineers should embody as moral members of society. This section lays out the foundational principles upon which the second and third section build. The principles acknowledge the impact software engineers can have and how their work can shape different members of society in unique ways. While it is natural to believe that software engineers should avoid harm, the guidelines also clarify that unintended harms must also be mitigated and undone, once they are discovered. Given the complex nature of the field, honesty and fairness are also intrinsic properties that should underly all work software engineers perform. Finally, the importance of privacy and confidentiality, both for individuals and organizations, are described to reenforce their central importance for ethical decision making.

The second section, *professional responsibilities*, describes how software engineers should work in a professional team-based setting to accomplish the guidelines outlined in the first section. The final section, *professional leadership responsibilities*, outlines the additional responsibilities incumbent on those in leadership roles within technical organizations. These roles include not just traditional managers, but all members of teams that have influence over technical decision making.

## Ethical decision making

The trolley problem is a thought experiment that can be used to reason about ethical situations. In the trolley problem, a person is faced with a situation where a trolley is rolling down a track and will result in the death of multiple people, or the person can divert the train onto a different track, but will result in the death of a single person.

This thought experiment is relevant to software engineering as it demonstrates how both action, and inaction, can lead to harm in safety-critical situations. For example, imagine a software engineer working on self-driving car software. One could imagine developing a policy that will strive to protect the safety of the occupants of the car, but how will the car react when put in a situation where it must balance the occupant's safety with those of a single pedestrian or bicyclist? Similarly, how will those decisions differ if the occupants safety must be balanced with a school bus or ambulance working on the side of the road? In these situations, engineers must consider the ethical implications of their design choices acknowledging that their decisions will have implications both for those who accept the technology and the team the build it (e.g., the car buyers) as well as those who have not (e.g., the bicyclist or first responders).

Along another dimension of harm, software systems have a wide surface upon which to expose discrimination that reenforces biases that can disadvantage different groups of people based on characteristics that are legally protected. These can be obviously impactful systems, for example systems that evaluate [parole eligibility](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), or more inconspicuous systems such as those that use facial recognition to highlight important [parts of images](https://algorithmwatch.org/en/google-vision-racism/). 

These concerns have grown in importance in recent years through the increased reliance on machine learning models, the visibility into which is less obvious for technical teams than with prior hard-coded or heuristic-based approaches. Detecting and combating bias in machine learning-based systems has led to the emergence of [explainable AI](https://insights.sei.cmu.edu/blog/what-is-explainable-ai/) as a field of increased focus.

While most software engineers will not contribute to self-driving vehicle platforms, the expanding applications of software and their entanglement with society increases the likelihood that systems will be deployed in safety-critical situations. Additionally, almost all software engineers will develop systems that end up providing information to users, and thus the biases and discrimination that those systems confer must be carefully identified and controlled.


<!--

## Privacy

TODO

k-anonymity



### References 

* [TITLE](LINK)
-->



