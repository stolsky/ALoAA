
const Entity = class {

    #shape;

    /** @param {Shape} shape */
    constructor(shape) {
        if (shape instanceof Shape) {
            this.#shape = shape;
        }
    }

    update(dt) {

    }

    render(ctx) {

    }

};
