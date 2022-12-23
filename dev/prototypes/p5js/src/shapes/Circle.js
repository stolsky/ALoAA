
const Circle = class extends Shape {

    constructor(diameter, position) {
        super(position);
        this.diameter = diameter;
    }

    render() {
        const position = this.getPosition();
        noFill();
        circle(position[0], position[1], this.diameter);
    }

};
