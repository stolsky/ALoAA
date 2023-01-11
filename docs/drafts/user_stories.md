# Epics and User stoires

## Stakeholders (Roles)
The following key usage profiles and stakeholders are integrated in the user journey, or overall process, and described in their roles:
### Customer
The "Customer" can be the head of a company, its manager or a team leader. He does not use the software himself, but buys it for his employees. He has mainly economic interests.
* Price and maintenance costs of the software
* Profits or savings due to the software
  * is additional software needed
  * time savings (performance, accessibility)
* Date of the release of the software
### User
The "User" is the actual user of the software. Therefore, he is more interested in accessibility, usability, a well-organized GUI,robustness against errors and crashes, ease of use and learnability, as well as good performance.
### Developer (maybe divide into Maintainer, Supporter)
The "Developer" develops and enhances the software, delivers it and provides support and maintenance. Therefore, he wants good maintainability and easy extensibility.

## Epics

| # | Epic | Acceptance Criteria |
| - | ---- | ------------------- |
| 1 | Purchase | <Criteria Description 1> |
| 2 | Usage | <Criteria Description 2.1> <br /> <Criteria Description 2.2> |
| 3 | Development | <Criteria Description 3> |

## User stories

`As a <Role>, I want to <Goal>, so that I can <Reason>`

| # | User Story | Acceptance Criteria |
| - | ---------- | ------------------- |
| E1.1 | As a Customer, I want that my employees can access the application via the browser, so that we do not rely on additional software. | The application can be used within the browser. |
| E1.2 | ... | ... |

| # | User Story | Acceptance Criteria |
| - | ---------- | ------------------- |
| E2.1 | As a User, I want a well-organized user interface, so that I can can easily understand its purpose. | <Criteria Description 1.1> <br /> <Criteria Description 1.2> |
| E2.2 | As a User, I want the simulation to be visualized, so that I can better understand the results. | 2.1 Include a graphics library and draw all parts of the simulation to the Renderer container. <br /> 2.2 Use a loop to constantly draw all state changes and thus create an animation |
| E2.2 | As a User, I want to control the simulation speed like fast forward or pause, so that I can <TODO ADD reason here>. | <Add Criteria Description> |

* As a User, I want to speed up the simulation, so that I can fast-forward a certain amount of time.
* As a User, I want to slow down the simulation, so I have more time to examine some events in more detail.

TODO add need for randomness and normal distribution
as well as PRNG to rerun simulations to reproduce something

| # | User Story | Acceptance Criteria |
| - | ---------- | ------------------- |
| E3.1 | As a Developer, I want the graphics library to be encapsulated as much as possible, so that it can be easily replaced if necessary. | There is an adapter with the same functionality as the graphics library |
| E1.2 | ... | ... |


----


### User Configuration at Setup
* As a User, I want all configurable variables to have meaningful default variables assigned to them, so I can start a simulation right away.
* As a User, I want to be able to configure the simulation before it starts, so I have maximum control over the process.
* As a User, I want to configure the size, shape and fertility of the world, so I can change the environment of the simulation.
* As a User, I want to configure the start value, mean and standard deviation of traits, so I have contol over the effects of mutations.
* As a User, I want to configure the start value, mean and standard deviation of counters, so I have contol over the life cycle of creatures.
* As a User, I want to specify the number and PRNG (pseudo-random number generator) seed for Producers, Consumers I, and Consumers II so I have more control over the startup situation.
* As a User, I would like to be supported by the program during the startup configuration, so that I cannot enter incorrect values.
  * sliders -> provide a minimal and lower range, use appropriate width
  * use checks to prevent values outside a certain interval
* As a User, I want easy access to help or information about the variables I can edit, so I can configure the simulation more productively.
* As a User, I want the editable variables to be logically grouped and arranged, so that I can navigate through them more easily.
* As a user, I would like to simply reset all variables to their default values so that I have access to those values in case my setup produces unexplained results.
  * reset button
* As a User, I want to have a distinctive start element to begin the simulation, so that I can easily recognize and trigger it.
  * start button
  
**Optional**
* As a User, I want to save and load my setup configuration, so I don't have to edit all the variables again when I run the same simulation multiple times.
* As a User, I would like the last configuration to be automatically loaded when I want to run another simulation, so I don't have to edit all the variables again.
* As a User, I want the graphical user interface to have a responsive design, so that I can see all the elements of the user interface on the screen.
  
### During Simulation
* As a User, I would like to have (configurable) charts, so that I can better monitor the progress during the simulation.
* configurations