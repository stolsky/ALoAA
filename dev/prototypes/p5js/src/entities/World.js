
const World = class extends Entity {

    /**
     * 
     * @param {number} diameter
     * @param {Vector} position 
     * @param {number} richness in percent / 100 -> float between 0 - 1
     */
    constructor(diameter, position, richness) {
        super(new Circle(diameter, position));
    }

    /** @override */
    update(dt) {
        // implement logic here
    }

};
