
const TWO_PI = Math.PI * 2;

const two = new Two({
    type: Two.Types.webgl,
    width: 400,
    height: 400
}).appendTo(document.body);

const background = two.makeGroup();
const world = two.makeGroup();
const lense = two.makeGroup();

function setup () {

    const CENTER_X = two.width * 0.5;
    const CENTER_Y = two.height * 0.5;

    const mask = two.makeCircle(CENTER_X, CENTER_Y, 180);
    mask.fill = "rgba(255, 255, 255, 1)";
    mask.noStroke();

    world.mask = mask;
    lense.mask = mask;
    
    const rectangle = two.makeRectangle(CENTER_X, CENTER_Y, two.width, two.height);
    rectangle.noStroke();
    rectangle.fill = 'rgb(0, 0, 0)';
    rectangle.name = 'background';

    const circle = two.makeCircle(CENTER_X, CENTER_Y, 180);
    circle.fill = 'rgba(255, 255, 255, 1)';
    circle.noStroke();

    two.makeText("A", 40, 40, { fill: "#ffffff", size: 40 });

    const centerLeft = two.makeLine(two.width - 55, two.height - 30, two.width - 55, two.height - 40);
    centerLeft.stroke = "#ffffff";
    centerLeft.linewidth = 1;
    const centerLine = two.makeLine(two.width - 55, two.height - 35, two.width - 25, two.height - 35);
    centerLine.stroke = "#ffffff";
    centerLine.linewidth = 1;
    const centerRight = two.makeLine(two.width - 25, two.height - 30, two.width - 25, two.height - 40);
    centerRight.stroke = "#ffffff";
    centerRight.linewidth = 1;
    two.makeText("nm", two.width - 40, two.height - 20, { fill: "#ffffff", size: 20});


    background.add(rectangle, circle);

    for (let i = 0; i < 100; i = i + 1) {
        const randomRadius = Math.floor(Math.random() * 180);
        const randomAngle = Math.random() * TWO_PI;
        const food = two.makeRectangle(
            randomRadius * Math.cos(randomAngle) + CENTER_X,
            randomRadius * Math.sin(randomAngle) + CENTER_Y,
            10,
            10
        );
        food.noStroke();
        food.fill = 'rgb(0, 255, 0)';
        food.name = 'food';
        world.add(food);
    }

    const ring = two.makeCircle(CENTER_X, CENTER_Y, 180);
    ring.noFill();
    ring.stroke = 'rgba(0, 100, 255, 0.2)';
    ring.linewidth = 15;
    lense.add(ring);
    
}

function update (frameCount) {

    world.children.forEach((child) => {
        if (child.name === 'food') {
            child.rotation += 0.05;
        }
    });

}

setup();
two.bind("update", update).play();
