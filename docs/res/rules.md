
# Rules of the Simulation / Presentation of a Cycle

## World
* generates anorganic material related to **Fertility** and **Size** only at the first time
* scatter anorganic material (setup)
  * all over the place (in first version)
  * at specific regions only -> fertile regions
    * test: with more in the center region (use gauss)
* can have different shapes
  * provide basic shapes like circle, ellipse, square, rect
  * later add procedural shape generation -> provide seed selection in GUI)
* initially spawns **Creatures** all over the place (setup)
```javascript
const Shape = class {
   
   /**
    * Allow any shape object but provide basic ones
    * dimensions:
    * 1 parameter:
    *    Circle -> radius
    *    Square -> one side
    * 2 parameter:
    *    Ellipse: 1 radius in x and 1 radius in y direction
    *    Rect: width and height
    */
   constructor({shape, ...dimensions}) {
     
   }
   
   getRandomPositionInside() {}
   
   static Circle = 1;
   static Ellipse = 2;
   static Rect = 3;
   static Square = 4;
};
const world = new World({shape: new Shape(Shape.Circle, 400), fertility: 0.5})
const plants = world.generatePlants(number?);
const creatures = world.generateCreatures(number?);

// called from simulation loop
const update = (dt) => {
    plants.forEach((plant) => plant.update(dt));
    creatures.forEach((creature) => creature.update(dt));
};

```

### Size
* width x height in pixels

### Fertility
* amount of anorganic material at start 

## Creatures
* have
  * **Counters**: count/track progress
  * **Traits**: define the amount of change of the counters -> make variation possible
  * **Abilities**: calculate the results depending on the **Traits** and **Counters**, which may be stored in the **Counters**
  * relationship between these attributes
    * at the start an ability can change only 1 counter at a time (later more influences or more abilities)
    * increment counter: `Counter = Ability(Trait, ..)`
    * filled up counter: Ability(Counter)
  * shape: ellipse
* 3 different creatures (all have the same Counters, Traits, Abilities)
  * Producers: consume **anorganic material** and produce **Producers** via cell division and **oranic material** upon death and digestion
  * Consumers Type I: consume **Producers** and produce **Consumers Type I** via cell division and **oranic material** upon **Death** and **Digestion**
  * Consumers Type II: consume **Consumers Type I** and produce **Consumers Type II** via cell division and **oranic material** upon **Death** and **Digestion**

### Value
* a min value of 0
* a max value of 1
* the default (now) value of 0.5
* mean -> the default/normal value of a mutation -> 0.5
* sd = standard deviation -> how wide the range of a mutation is -> 0 (?) or 0.001 - 1

### Traits
* describe a Gene (genotype -> phenotype)
* later: try to shape body by traits like constitution => size, speed => size, etc..
* all traits have a Value
  * are static for current individuum
* they influence **Bars** and **Abilities**
  * multiple Traits can influence one **Bar** or used to trigger 1 **Ability**
* all traits can mutate, but otherwise don't change their value
* different traits have different color
  * colors combined (strongest traits by value have more influence) create the color of the creature
    * use neon colors (on black/dark background) 

### Bars
* describe changes (states) in an Entity
  * only stores to save values/results
  * serves as a basis for decisions/triggers -> "urges"
    * can trigger Abilities, exp: Energy & Stomach -> trigger movement/search for food
    * later: influence other Traits, exp: Age -> speed, agility, fertility
* got current (now), max value and minimum value
* got its own modifying rate (Value -> with min, now, max) which describes how fast/slow this bar changes
  * rate is also part of genes -> phenotype (?)
* **cannot** be mutated -> variation due to traits

### Stomach (Bar)
* describes the maximum capacity of food to be collected/stored

### Energy (Bar)
* how long can you do something before you have to rest

### Age (Bar)
* just an additional limitation to a creature -> no "immortals"
* if reached max value, the creature dies
* implement later: slows down all **Abilities** related to **Age** (only at high age)

### Mass (Bar)
* describes the growth of a creature

### Puperty (Trait)
* describes the time when a creature is able to reproduce (cell division)

### Stamina (Trait)
* how much fast the **Energy** is consumed (by physical action)
* how fast **Energy** is generated (during **Digestion**)

### Speed (Trait)
* how fast is a creature
* the greater the **Speed** is the more **Energy** is consumed
  * faster: more distance per time, but more energy is consumed
* distance in pixel per second/msecond

### Agility (Trait)
* how fast a creature can react, change in movement

### View-Distance (Trait)
* how far a creature can see to spot things -> evade, seek as solution

### View-Width (Trait)
* how wide is the view radius

### Abilities
* methods that use **Trait** values to calculate
* only **Abilities** can calculate, perform effects (like **Reproduction**)
* they hold no values
* called by Counters
* results may stored in Counters

### Live/Update
* logic/main routine of the creature
* updates counter like **Age**, **Puberty**
* calles **Movement**, **Rest**, **Digestion**, **Food Consumption**, **Reproduction** according to counters

### Movement (Ability)
* calculates:
  * the distance walked by speed
  * the energy consumption by speed and stamina
  * collision detection for body of creature with other objects (food, etc..)
* consumes energy -> movement is only working if energy > 0
  * consumption is some function of **Stamina** x **Distance** (number of pixels moved: related to **Speed**: how many pixels per millisecond)
* changes position in the world
* random start position
* specialization
  * wander implementation from C.W. Reynolds [paper](https://www.red3d.com/cwr/steer/gdc99/)
    * to search for food, etc..
  * seek and arrive implementation from C.W. Reynolds [paper](https://www.red3d.com/cwr/steer/gdc99/)
    * to move towards food, etc.. more effectively
    * seek as long as below certain threshold(s) and energy left
      * calculate distance to home and compare to **Energy** left if is it reachable
      * if enough **Energy** left and **Stomach** full but **Fertility** not

### Eating/Food Consumption (Ability)
* called if collided with food and **Stomach** is not full
* fills stomach by **Mass** of food (anorganic material)
  * reduces **Mass** of food until consumed completely or stomach is full
* takes some time
* produces **Organic Material**

### Seeing (Ability)
* uses View-Distance & View-Width
* collision detection for field of view with objects

### Digestion (Ability)
* during **Digestion** fill up energy only if not moving (moving stops **Digestion**)
  * each 1 sec (time) 0.1 (start with this value) of **Stomach** is consumed and converted to 0.1 (start with 1:1) **Energy**
* digest only if **Stomach** is high enough -> enough **Energy** can be created to look for food the next time -> what threshold
* digest until **Energy** is full or event occurs like attacker of preditor (implemented later)
* produces **Organic Material**

### Reproduction (Ability)
* adds to **Puberty** counter until filled up
* activates mutation -> use gauss to change attributes
  * be aware of the "correct" mean and standard deviations
* create **n** new creatures at the old one's position (n mutations)
  * depending on **Fertility**

### Growing (Ability)
* describes the growth aspect of life
* increasing **Age** & **Mass** for **Energy**

### Death
* creature dies if
  * **Stomach** = 0 and **Energy** = 0
  * **Age** = max value
  * **Health** = 0 (implemented later)

### Strength (implemented later)
* = offence
* how many damage is produced

### Dexterity (implemented later)
* how likely to dodge an attack/to hit another creature

### Health/Lifepoints (implemented later)
* how many damage a creature can take before it dies (0 hp = death)

### Constitution (implemented later)
* = defence
* how fast health is regenerated if not full
* by how much is the incoming damage reduced

## Resources/Materials
* all resources have
  * a min value of 0
  * a max value of 1
  * the default value of 1
  * shape: square

### Material (Anorganic, Organic)
* got quality
* two states: Organic & Anorganic state
* created by **Death** -> Quality 1.0 (test values), **Consumption** -> 0.2 (test values), **Digestion** -> 0.2 (test values)
  * test which parameters to be used for transformation, food consumption, etc..
  * changes from Organic to Anorganic state after certain time (decay span)
    * represents function of decomposers (not implemented as additional creature)
    * maybe change quality too, tests needed
  * initially by simulation/world
* fills **Stomach** of **Producsers** by quality
