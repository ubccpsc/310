# Intellectual Property (IP)


All tech-based organizations generate and consume intellectual property (IP). IP is protected under a variety of mechanisms to both enable organizations to protect and profit from their IP. 

### Mechanisms

The most common mechanisms used for protecting intellectual property are:

***Trademarks*** are used to differentiate products or organizations within the marketplace. Trademarks are registered on a country-by-country basis and cost a few thousand dollars / country to register. These can be renewed indefinitely. In the tech space, companies have tried unsuccessfully to register the 'look and feel' of an application as a Trademark (Apple v. Samsung). 

***Copyright*** can be applied to creative works to protect the _representation_ of the work. That is, copyright does not protect the idea, but it protects how that idea is encoded. In the context of software, copyright is commonly used to protect the text of the program (e.g., the source code) but does not protect what the program actually does. Copyright in Canada lasts until the death of the author, plus 50 years at which point the representation enters the public domain.

***Trade secrets*** are a mechanism to protect information by keeping it from being publicly disclosed. These are commonly protected using confidentiality agreements and can last for as long as the secret itself is protected from disclosure. Programs are often protected as trade secrets, and it has been established that releasing the compiled version of a program is not considered disclosure of the underlying source code.

***Patents*** are state-conferred specific rights that are used to protect inventions. These provide the inventor the exclusive rights to profit from an invention for a set period of time. Inventions must be novel, non-obvious, and useful in order to be eligible for patenting. 

Patenting software is challenging: software is considered an *abstract idea* that cannot usually be patented. To be eligible for protection, the inventor needs to demonstrate that the software being patented represents a specific novel implementation of the invention, rather than a straightforward application of the abstract idea. Additionally, the provisions that an invention be novel and non-obvious are often difficult to establish for software-based systems as it can be hard to demonstrate these core properties.

Establishing patents is a long and expensive process, as demonstrating novelty against all prior patents and prior disclosed work and non-obviousness requires the support of IP professionals. In Canada, patent protection lasts for 20 years and is granted by the Canadian Intellectual Property Office. 

Software-based patents are not without controversy: while some proponents argue that patenting allows innovators to protect their expensive intellectual investments, and are therefore incentivized to make those investments. Detractors believe that patents in such a fast-moving field can induce advantages that cannot be overcome in the long term as by the time the patent has expired, the patentors have established themselves such that they cannot be competed with. Balancing these two concerns is a central concern for all IP legislation.

***Licenses*** are used in conjunction with the options above to enable IP to be monetized without releasing ownership of the underlying protected material.

At the same time, IP regulations also try to consider the public good. This is because while IP can be used to incentivize the creation of new work by enabling it to drive monetary gain, overly restrictive IP regimes can inhibit the creation of new innovations by making it impractical to enable others to create derivative work that extends previously-existing protected IP. 

### Licenses

Licenses are widely applied in the software ecosystem to define how software products can be used. All source code is protected by copyright: licenses clarify how the code can be used and whether it can be modified and distributed by others. Below we concentrate on a few popular Open Source licenses and their specific properties.

***GPLv3*** The General Public License (GPLv3) has been designed to enable software to be used, shared, and modified. This is a *copyleft* license which means that the license must be maintained with the code is modified and/or distributed. Additionally, projects that use GPLv3 code cannot us a less-restrictive license on their own product.

***LGPLv3*** The Lesser General Public License (LGPLv3), while still a copyleft license, is a more flexible license (than GPLv3). While it requires that changes to code licensed under LGPLv2 to be shared, when used as a library by a product the product itself need not be shared. LGPLv3 allows that software using LGPL libraries can be shared under a more restrictive license than the libraries it uses.

***MPLv2*** The Mozilla Public License (MPLv2) is another copyleft license that aims for increased flexibility over the LGPLv3 in that it only mandates changes to _files_ licensed MPL to be released (in contrast to the GPL and LGPL which require changes to the _library_ to be released).

***CC-by*** Several flavours of CC-by licenses have been created by the [Creative Commons](https://creativecommons.org/choose/) to allow individuals and organizations to choose from a set of standardized licenses that can apply in a variety of situations. These licenses tend to be succinct and aim to make it easier to license work in a way that enables others to use, extend, and share the licensed work. For instance, this reading is licensed [CC-by-SA](https://creativecommons.org/licenses/by-sa/3.0/), meaning it can be shared and adapted by others, but that attribution must be provided and that shared versions of this reading must be under the same license. A less restrictive license like [CC-by](https://creativecommons.org/licenses/by/4.0/) would allow for this reading to be modified and redistributed, but would not impose the restriction on the license applied of the modified version of the reading, but I believe it is important that derivative versions should be available for others to learn from as well.

### References 

* [Do Software Developers Understand Open Source Licenses? ICPC 2017](https://www.cs.ubc.ca/labs/spl/projects/softwarelicensing/resources/2017_ICPC_DoSoftwareDevelopersUnderstandOpenSourceLicenses_preprint.pdf)

---
[![](figures/CCSA.png "Creative Commons: Attribution-ShareAlike")](https://creativecommons.org/licenses/by-sa/3.0/) [Reid Holmes](https://www.cs.ubc.ca/~rtholmes/)
