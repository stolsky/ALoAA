
# Agiles Vorgehensmodell
* Scrum variant with CI/CD and selected Extreme programming rules ([link](http://www.extremeprogramming.org/))
* Ausgewählte Regeln ([link](http://www.extremeprogramming.org/rules.html))
  * Planning
    * User stories are written.
      * during Sprint Planning User Stories (`As a <role>, I want to <goal>, so that I can <reason>.`) are created from Epics
        * User stories: short requirements/reuqtests written from the perspective of an end user.
        * Epics: Large bodies of work that can be broken down into a number of smaller tasks (stories).
          * consists of: project, design, technical requirements
          * Resources: [Naming](https://productcoalition.com/what-is-an-epic-and-user-story-how-to-name-epics-user-stories-f83dc60c1e40), [Content](https://productcoalition.com/how-to-write-epics-and-user-stories-best-practice-1de5b983900)
      * Acceptance Tests (format: `Given/When/Then` or as checklist) are created from User Stories
        * set of predefinded requirements that must be met to mark a user story complete
        * must be testable
        * functional testing of a user story
      * in the INVEST format to also specify a "definition of ready" in addition to "definition of done"
      * look out for **hidden requirements**
      * estimate Story Points (set upper limit) of each user story's overall effort required to fully implement it
        * use burn down chart to visualize and plan next sprints
    * Make frequent small releases. --> immer eine lauffähige Version
      * small sprints enforce small releases and thus no complex tasks
    * The project is divided into iterations. --> sprints
    * Iteration planning starts each iteration. --> sprint planning
  * Designing
    * Simplicity -> Use as few external libraries as possible and as many as necessary
    * No functionality is added early.
    * Refactor whenever and wherever possible. 
  * Coding
    * Code must be written to agreed standards. --> Clean Code
    * Code the unit test first. --> TDD
  * Testing (except for GUI)
    * All code must have unit tests.
      * Unit Tests: Testing of individual units like functions or classes by supplying input and making sure the output is as expected
    * All code must pass all unit tests before it  can be released.
    * Acceptance tests are run.
      * after each commit:
        * Integration Tests: Testing processes across several units to achieve their goals, including their side effects
        * End-to-End Tests (E2E Tests): Testing user scenarios on the browser itself by controlling the browser programmatically. These tests usually ignore the internals of applications and look at them like on a black box.
          * use the Screenplay Pattern (?)
  * continuous integration = continuous delivery -> immer eine lauffähige Version
    * only 1 master branch and 1 development branch
    * work/commits can only be done on the development branch

## Umsetzung

* Tools
  * Version Control System: GitHub
    * small releases
    * iterations
    * CI/CD
  * Code Quality (Code Review)
    * SonarLint + SonarQube
    * ESLint + popular Style Guide Airbnb
  * Unit tests: Cypress (Component Tests)
    * core of TDD
  * Integration tests: Cypress (Component Tests)
  * Acceptance Tests: Cypress (E2E Tests)

## INVEST - User Stories

### Independent
The story is not dependent on other stories getting done. <br />
**Why it matters:** Dependencies cause delays. You don’t get user-ready working software until both or all dependent stories are complete.

### Negotiable
The story prompts but doesn’t prescribe a solution. <br />
**Why it matters:** Treating the story as an evolving conversation between product owner and development team builds a shared understanding and harnesses everyone’s expertise: the product owner knows the benefits you’ll bring the users and the development team knows the best way to do this. And accepting that the story may change lets you adjust what you deliver as you learn more.

### Valuable
The story makes clear the benefit it delivers the users. <br />
**Why it matters:** In Agile, your goal is to deliver valuable working software. So your user stories need to explicitly state the value they’ll bring. What user needs does it meet, what risks does it mitigate, what costs does it save, what learnings does it allow? How does the story help you achieve your vision for the product?

### Estimable
The story gives the development team enough detail to estimate the size of the story. <br />
**Why it matters:** You need to know the size of the stories so you can plan an iteration that will deliver working software. Plus, product owners need to know the size so they can prioritise the stories that give the most value for the least effort.

### Small
The story is the smallest piece of work that will deliver useful software. <br />
**Why it matters:** Agile works in short iterations so you can get fast feedback from your users. If you want to deliver working software each iteration, short iterations necessarily require small stories. The smaller the story, the more likely it will be delivering value by iteration’s end.

### Testable
The story is clear enough that you can assess if the story is done. <br />
**Why it matters:** If there isn’t a Yes or No answer to the question, “Have each of the acceptance criteria been met?” then developers can’t write automated tests and the product owner can’t check the story when it’s up for acceptance.

# User Stories Template

## Stakeholders
The following key usage profiles and stakeholders are integrated in the user journey, or overall process, and described in their roles:
### <Role 1>
<Role 1 Description>
### <Role 2>
<Role 2 Description>
### ...
...

## Functional Description (?)

| # | Epic | Acceptance Criteria |
| - | ---- | ------------------- |
| 1 | <Name/Short Description 1> | <Criteria Description 1> |
| 2 | <Name/Short Description 2> | <Criteria Description 2.1> <br /> <Criteria Description 2.2> |
| ... | ... | ... |

| # | User Story | Acceptance Criteria |
| - | ---------- | ------------------- |
| E1.1 | As a `<Role>`, I want to `<Goal>`, so that I can `<reason>` | <Criteria Description 1> |
| E1.2 | ... | ... |
| E2.1 | As a `<Role>`, I want to `<Goal>`, so that I can `<reason>` | <Criteria Description 2.1> <br /> <Criteria Description 2.2> |
| ... | ... | ... |

# Ressourcen (Personal), Kosten (Sachmittel) und Termine
* Termin
  * Beginn: 31.08.2022
  * Abgabe am 13.01.2023
  * durch agiles Vorgehen, kann auf zeitliche Probleme (Meilensteine nicht rechtzeitig erreicht) reagiert werden (ohne die Planung zu ruinieren)
* es wird kein weiteres Personal benötigt, da es ein 1-Mann-Projekt ist
* Zeit wird u.a. im Rahmen der Ausbildung/Berufsschule zur Verfügung gestellt

# Ablaufplan (linear -> grob)
## Vorbereitung
* Prototyp mit p5js erstellen, um Probleme bei der Implementierung Projekts frühzeitig zu erkennen
* Prototyp testen, Ergebnis bewerten und dokumentieren
* Stakeholder Requirements und System Requirements prüfen/erstellen/ergänzen
  * Stakeholder Requirements: express the intended interaction the system will have with its operational environment (and that are the reference against which each resulting operational capability is validated)
  * System Requirements: specify, from the supplier's perspective, what characteristics, attributes, and functional and performance requirements the system is to process, in order to satisfy stakeholder requirements
* Epics, User Stories schreiben, Akzeptanztests ableiten
* Testumgebung für TDD aufsetzen für entsprechende Programmiersprache + Quality and Linter Libraries
## Implementierung
**Als Sprints durchführen: Anzahl von User Stories auswählen, eventuell ausformulieren**

* Basis Elemente implementieren
  * Rudimentäre GUI programmieren zur Visualisierung der Simulation (keine Buttons, bzw. weitere Steuerelemente)
    * **always be ready**
  * Elementare Klassen implementieren für Environment/World, Creatures, Food
    * **No functionality is added early**
  * Stoppuhr implementieren (Tageswechsel maximal als optische Referenz)
  * Funktionalitäten
* Höhere Elemente implementieren
  * Datensammlung und -darstellung implementieren 
  * Steuerelemente
* zusätzliche Features

# Risikoanalyse

* Baby/Partnerin krank -> hoch
* Verlust von Projektdaten durch Software- o. Hardwareprobleme -> mittel -> Lösung: git
* selbst krank -> gering
* Einbindung in Projekte im Unternehmen -> hoch -> Absprache mit Ausbilder im Unternehmen
* Ausfall von wichtiger Hardware wie Laptop -> gering -> zur Sicherstellung zusätzlichen Desktop PC mit Bildschirm
* Projekt ist umfangreicher als abzusehen war -> Frist wird nicht mit allen Zielen eingehalten -> "We will lways be ready"
  * **We will always be ready**
    * > Agile = system is in a deployable / shippable state after every iteration / sprint. The system is ready, even if it doesn’t have enough features to deploy (that is a business decision). Ready to deploy = all the testing is done, all the documentation is done, the set of features is done. If you are not deployable at the end of the sprint, you are not doing Agile.
  * Planungsoptimierung durch Tools: Gantt

# Programmiersprache
Entscheidung für JavaScript:
* bereits viel mit JavaScript gearbeitet
* mit ESLint als Linter für Codequalität vertraut (Node.js zur einfachen Einbindung von ESLint Code Styles)
* mit SonarQube für Codequalität vertraut

### Diagramm Bibliothek
**D3.js**
* bereits genutzt
* vielfältige Diagramme nutzbar
* dynamische Digramme
* very mature v7.7.0 104k Stars on Github, well documented, a lot of tutorials, examples and playgrounds
### Grafik Bibliothek
**PixiJS**
* instead of __Two.js__ because
  * pro: faster, better documented, much more mature (V7.0.5) 38.3k Stars vs 7.9k (TWO.js v0.8.10), learning curve nearly the same (maybe PIXIJS > TWO.js because more complex)
  * well documented, a lot of tutorials, examples and playgrounds
  * pro: content of framework/library customizable: size can be reduced drastically
  * con: over 2 times bigger 405kb > 166kb, more complex -> more functionality

### Unit Tests of Libraries
**Test all methods used in the project**
TODO: Test Pseudo-Random-Number-Generators Unified Distribution and Normal Distribution

### Pseudo-Random-Number-Generators
* Unified Distribution: Implementation of Xoshiro128
  * [wikipedia](https://en.wikipedia.org/wiki/Xorshift)
  * [paper](https://prng.di.unimi.it/)
* Normal Distribution use Xoshiro128 with Box–Muller transform
  * [wikipedia](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)

### Comparison
**Kriterien:**
| Sprache | Linter  | Unit Tests  | Drawing | Quality |
|  :---:  |  :---:  |    :---:    |  :---:  |  :---:  |
| JavaScript | ESLint | Cypress | TWO.js (Simulation) <br /> D3.js (Charts) | SonarQube |
| Python | Pylance | PyTest | pygame | SonarQube |

Add rules/style guides to documentation or the name of known rule sets/style guides (like Airbnb). <br />
What about automated acceptance testing (Example: [Serenity](https://serenity-js.org/)).
