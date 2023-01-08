## Design Patterns
* Factory, Builder, State Pattern
* [resource](https://refactoring.guru/design-patterns/catalog)

## Look
* futuristic/science HUD [example](https://thumbs.dreamstime.com/z/hud-ui-set-elements-sci-fi-futuristic-user-interface-tech-science-design-illustration-vector-127739057.jpg)
* no outline/surrounding border
* background dark blue-blackish
* use neon colors
### resources
* menu icons: [flaticon](https://www.flaticon.com/authors/freepik)

## Colors/Shapes
* use white, blue/blueish neon colors for GUI
* for all creatures use ellipse as shape
* use different neon colors for the 3 creatures
  * producer -> neon green (plants)
  * consumer I -> neon yellow (herbivores)
  * consumer II -> neon red (carnivores)
* for all material use square as shape
* use different neon colors for the 2 material states, have to differ from creature colors
  * state anorganic
  * state organic

## Charts
[resource](https://d3-graph-gallery.com)

### Display data
* number of creatures and food as bar chart -> switch between over time and current view?
* number of different attributes -> stacked bars?
* aggregated data
  * life span: calculate time a creature was alive -> show relation to attributes
  * distance "walked" in life
  * distance from home to food
* over time: line chart
* current: bar chart
* use log10 scales (for line charts?) -> add switch on/off
* try not to use legends within charts
  * manage with colors -> charts and simulation colors must match
**Choose max 3 different data to display as charts** (maybe combine same data if it adds information)

### Functions
* highlight series
* zoom in and out (especially over time)
* range selector(?)

### Automatically
* calculate linear regression -> trends
  * selectable/highlightable -> popup info
* find interesting spots
