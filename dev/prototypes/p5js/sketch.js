
let world = null;
let creatures = [];
let food = [];

function setup() {
    createCanvas(400, 400);
    world = new World(300, createVector(width / 2, height / 2), 0.5);
    // init food = world.spawnFood(); -> related to size & richness
    // init creatures = world.spawnCreatures();
};

const update = (dt) => {
    
};

const render = () => {
    background(255);
    world.render();
};

// loop
function draw() {
    update(deltaTime);
    render();
};
