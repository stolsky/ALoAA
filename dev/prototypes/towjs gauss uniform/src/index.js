
const TWO_PI = Math.PI * 2;

const two = new Two({
    type: Two.Types.webgl,
    width: 400,
    height: 400
}).appendTo(document.body);

const CENTER_X = two.width / 4;
const CENTER_Y = two.height / 4;

const background = two.makeGroup();
const world = two.makeGroup();

function setup () {

    const CENTER_X = two.width * 0.5;
    const CENTER_Y = two.height * 0.5;
    
    const rectangle = two.makeRectangle(CENTER_X, CENTER_Y, two.width, two.height);
    rectangle.noStroke();
    rectangle.fill = 'rgb(0, 0, 0)';
    rectangle.name = 'background';

    const circle = two.makeCircle(CENTER_X, CENTER_Y, 180);
    circle.fill = 'rgba(255, 255, 255, 1)';
    circle.noStroke();

    background.add(rectangle, circle);
}

function drawCircle(x, y, color) {
    const circle = two.makeCircle(x, y, 5);
    circle.noStroke();
    circle.fill = color;
}

function gauss(mean = 0, sd = 1) {
    let u = 1 - Math.random();
    let v = Math.random();
    return Math.abs(Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ) * sd + mean);
}

const random = (limit) => Math.floor(Math.random() * limit);

let rounds = 0;
let counter = 0;
const collect = [];
function update (frameCount) {
    counter = counter + frameCount;
    //if (counter > 100) {
        // drawCircle(random(400), random(400), "#FF0000");
        // drawCircle(gauss(200, 100), gauss(200, 100), "#00FF00");
        collect.push({x: gauss(), y: gauss()});
        counter = 0;
    //}

    rounds = rounds + 1;
    if (rounds > 1500) {
        console.log(JSON.stringify(collect))
        two.pause();
    }
}

setup();
two.bind("update", update).play();
