[Projektphasen](https://wiki.de.it-processmaps.com/index.php/Projektmanagement)

# Thema
Einfache Evolutionssimulation einer abstrakten Population

# Ziele
(Kunde/Ansprechpartner kann fiktiv sein)
* Simulationssoftware
* Resource: [Projektziele](https://projekte-leicht-gemacht.de/ziele/)

1. Ziele ermitteln: Im ersten Schritt werden Ziele gesammelt. Für den Moment müssen sie noch nicht perfekt ausformuliert sein.
   * Beschreibung (als Zielbeschreibung auf genaue/präzise Definitionen/Beschreibung achten)
     * Einfache Simulation eines Nahrungs- bzw. Energiekreislaufs
       * Resource: [Wikipedia](https://upload.wikimedia.org/wikipedia/commons/5/5b/Destruenten_im_Stoffkreislauf.svg)
       * Lebewesen (durch Ernährung als Wert zw. 0-1 bestimmt, 0.0-0.5 = Autotroph, 0.5-1.0 Heterotroph)
         * Produzenten (Autotroph) produzieren Energie aus anorganischen Substanzen (Fruchtbarkeit der Welt -> Ausgangsanzahl) für Fortpflanzung/Zellteilung
         * Konsumenten I (Heterotroph) fressen Produzenten für Energie für Fortpflanzung/Zellteilung
           * Herbivoren
         * Konsumenten II (Heterotroph) fressen Konsumenten I für Fortpflanzung/Zellteilung
           * Carnivoren
         * Omnivoren
     * 2 bis 3 beeinflussende Attribute (zBsp: Geschwindigkeit, Stärke, Energieverbrauch)
     * Varianz/Mutation dieser Attribute
     * simuliert die Auswirkung dieser Veränderung auf die Population
     * je nach Fortschritt durch weitere Attribute bzw. Interaktionen (innerhalb der Population) erweitern
     * simuliert werden soll die Überlebensrate/Sterberate von abstrakten Wesen bezüglich bestimmter Attribute
       * Wesen haben Attributen, die auf ihre Energie (Energieverbrauch) Einfluss haben
       * zuerst Schnelligkeit, Stärke, Größe
2. SMART(ER):
   * Spezifisch (Ziele müssen eindeutig definiert sein (nicht vage, sondern so präzise wie möglich)
     * Mindestvorraussetzungen sind eindeutig definiert sowie die daraus abgeleiteten Ziele
     * min. 5 Eingabeparameter setzen (prepare default values, describe their influence on the simulation):
       * Größe der Welt -> bestimmt indirekt maximal Anzahl von Individuen
       * Startanzahl von Produzenten
       * Startanzahl von Konzsumenten I
       * Startanzahl von Konzsumenten II
       * Gene hinzufügen (alle haben Zugriff auf gleichen? Genpool)
         * Mutationsrate festlegen -> wie häufig verändern sich Attribute auf nachfolgende Generationen: mean & standard deviation
       * start seed von Zufallsgeneratoren festlegen (min. 2) - wie wichtig verschiedene start seeds? -> testen
         * start seed produzenten
         * start seed konsumenten I
         * start seed konsumenten II
   * Messbar (Ziele müssen messbar sein (Messbarkeitskriterien))
     * Anzahl Eingabeparameter/Simulationsgeschwindigkeit über GUI verifizierbar, Anzahl Zufallsparameter über Code beweisbar, Animation über GUI erkennbar, GUI sichtbar, Testen als ausführbare Unittests (und deren Code Review) Testprotokoll
   * Akzeptiert (Die Ziele müssen für die Person ansprechend bzw. erstrebenswert sein)
     * selbst gewähltes Thema -> Eigenmotivation
   * Realistisch (Das gesteckte Ziel muss möglich und realisierbar sein)
     * 
   * Terminiert (Das Ziel muss mit einem fixen Datum festgelegt werden können)
     * Abgabetermin vorgegeben
   * Ecological (Ökologisch, das Ziel sollte auch Umweltaspekte beachten, umweltfreundlich, ökologisch sinnvoll sein)
     * optional
   * Ressourcenbedacht (Das Ziel sollte (notwendige) Ressourcen sinnvoll einsetzen bzw. haben (materiell, immateriell))
     * optional
3. Nicht-Ziele nennen: Zur Abgrenzung des Projektumfangs bietet es sich an, Ziele zu nennen, die eben nicht erreicht werden sollen.
   * keine konmplexe Simulation. Nur Attribute auswählen/einsetzen die grafisch gut ausgewertet werden können
   * keine komplexe Visualisierung der Wesen. Maximal Icons/Symbole zur Repräsentation
   * keine Animation der Wesen/Kreaturen außer simpler Bewegung
   * keine Wetterereignisse simulieren
   * Darstellung der Umgebung nur mit wenigen grafischen Primitiven, so wenig Details wie möglich/nötig
     * Welt = Oberfläche/Container
     * Futter = kleine Vierecke
     * Wesen = Ellipsen
4. Ziele priorisieren: Alle Ziele sind gleich wichtig? Nicht ganz! Häufig wird unterschieden in **Muss-, Soll- und Kann-Ziele**.
   * Muss = SOLL: Simulation mit 
     * min. verschiedene händische 5 Eingaben: 5 verschiedene Parameter einstellen
     * min. 2 Zufallsparameter innerhalb der Simulation (Gleichverteilung, Normalverteilung (Gauß))
     * Anpassen der Simulationsgeschwindigkeit (min. 3 Stufen)
     * 1 Animation zur Simulation
     * GUI (UX Design)
     * Testen (Testprotokoll, Blackbox-Test)
   * Kann:
     * Anpassen von Parametern vor und während der Simulation über die GUI
     * Simulation wird "vollständig" über GUI visualisiert
     * idealerweise TDD (Test-driven-development)
     * weitere Eingabeparameter beeinflussen wie Strategie zur Nahrungssuche
5. Zielbeziehungen analysieren: Es wäre schön, wenn alle Ziele optimal gemeinsam auf das Gesamtziel abgestimmt wären. Um Risiken zu vermeiden, werden die Beziehungen der Ziele untereinander analysiert und je nach Situation Maßnahmen abgeleitet.

# Anforderungsanalyse
Erheben, Strukturieren und Analysieren der Anforderungen des Kunden
1. Sammeln und Analysieren der Anforderungen (ANFORDERUNGSERHEBUNG)
2. Ordnen und Abstimmen der Anforderungen (Machbarkeit)
3. Sichern der Qualität und Bewerten der Anforderungen

## Funktional (was das fertige Projekt leisten soll)

### Beispielfragen
* Welche Eingabefelder und Datenfelder werden benötigt?
* Wie viele Bestellungen müssen pro Tag bewältigt werden?
* Welche Anforderungen muss das System im Fehlerfall erfüllen?

### Entwurf
* als User Stories beschreiben
* Berechnung und Darstellung (mittels GUI) einer Simulation
* man kann durch Eingabeparameter die Simulation und damit das Ergebnis beeinflussen
* man kann während der Simulation die Simulierungszeit verändern (verlangsamen, erhöhen)
* während und am Ende der Simulation sollen statistische Ergebnisse in der GUI angezeigt werden
  * Graph für aktuelle Anzahl der Wesen, aufgeschlüsselt nach Attribut/Eigenschaft
  * man kann zwischen verschiedenen statistischen Auwertungen wählen

## Nichtfunktional (wie das Projekt die erwarteten Ziele erreichen soll)
* Programmierung
  * Einhaltung von Clean Code Regeln
    * hier einige Aufzählen, die umgesetzt werden sollen
* Berechnung
  * mit Hilfe von Bibliotheken vereinfachen
* GUI /Darstellung)
  * gesamte Simulation soll in der GUI visualisiert werden
  * nur notwendige Interaktionsflächen zur Manipulation (Parameter, Geschwindigkeit) werden übersichtlich zur Verfügung gestellt
* jederzeit (nach jedem Commit) muss eine lauffähige Version vorliegen
* Erweiterung der Funktionalität, wenn MUSS-Ziele abgeschlossen sind

## Zusammenfassung
* Stakeholder Requirements:
  * Identify all stakeholders
  * ??
* System Requirments
  * ?? 
* Animation erfordert sich wiederholende Ausgabe auf dem Bildschirm -> game loop pattern
  * describe advantages [source](https://gameprogrammingpatterns.com/game-loop.html)
* Ausgabe bzw. Darstellung bestimmter Daten während und am Ende der Simulation erfordert Datenstruktur zum Zwischenspeichern
  * ist eine Datenbank notwendig? Reicht eine simplere Datenstruktur aus (wie Mehrdimensionales Array)?
* Manipulation der Eingabeparameter durch Nutzer erfordert verschiedene (min. 1 weitere) GUI Ansichten
  * Eingabefenster (Startparameter, Setup)
  * Simulationsfenster
  * optional Ausgabe/Auswertungsfenster
  * optional Optionsfenster
* Testprotokoll, speziell TDD erfordert entsprechende Umgebung
* jederzeit (nach jedem Commit) muss eine lauffähige Version vorliegen
  * bedeutet continuous integration & continuous delivery
    * braucht Umgebung, die das automatisiert
    * setups/manuals (JavaScript)
      * [chathula](https://dev.to/chathula/how-to-set-up-a-ci-cd-pipeline-for-a-node-js-app-with-github-actions-32h0)
      * [github](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)

# Projektumfeld (äußere Einflussfaktoren auf das betrachtete Projekt)
* Rahmenbedingungen
* „Worauf müssen wir alles achten?“
* [Umfeldanalyse](https://projekte-leicht-gemacht.de/blog/methoden/projektstart/die-umfeldanalyse-einfach-erklaert/)

# Prozessschnittstellen (Ansprechpartner, Einstieg, Ausstieg)
