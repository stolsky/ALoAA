/* globals PIXI */

import Simulation from "../simulation/Simulation.js";

const Drag = class {

    #dragging = false;

    /** @type {HTMLCanvasElement} */
    #container = null;

    /** @type {PIXI.Container} */
    #application = null;

    #offsetX = 0;

    #offsetY = 0;

    #startX = 0;

    #startY = 0;

    /** The difference of the width of the display container and the width of the world.
     * `container.width - world.width`
     *
     * @type {number}
     */
    #offscreenWidth = 0;

    /** The difference of the height of the display container and the height of the world.
     * `container.height - world.height`
     *
     * @type {number}
     */
    #offscreenHeight = 0;

    #begin = (event) => {
        const { width, height, scale } = Simulation.getWorldAttributes();
        const bounds = this.#container.getBoundingClientRect();
        this.#offscreenWidth = bounds.width - width * scale;
        this.#offscreenHeight = bounds.height - height * scale;
        this.#startX = event.clientX - this.#offsetX - this.#application.stage.position.x;
        this.#startY = event.clientY - this.#offsetY - this.#application.stage.position.y;

        if (this.#offscreenWidth < 0 && this.#offscreenHeight < 0) {
            this.#container.style.cursor = "grab";
            this.#dragging = true;
        } else {
            if (this.#offscreenWidth > 0) {
                this.#application.stage.position.x = (this.#application.renderer.width - this.#application.stage.width) / 2;
            }
            if (this.#offscreenHeight > 0) {
                this.#application.stage.pivot.y = (this.#application.renderer.height - this.#application.stage.height) / 2;
            }
        }
    };

    #move = (event) => {
        if (this.#dragging) {

            let x = (event.clientX - this.#offsetX) - this.#startX;
            if (x > 0) {
                x = 0;
            } else if (x < this.#offscreenWidth) {
                x = this.#offscreenWidth;
            }
            this.#application.stage.position.x = x;

            let y = (event.clientY - this.#offsetY) - this.#startY;
            if (y > 0) {
                y = 0;
            } else if (y < this.#offscreenHeight) {
                y = this.#offscreenHeight;
            }
            this.#application.stage.position.y = y;

            if (!this.#application.ticker.started) {
                this.#application.render();
            }
        }
    };

    #end = () => {
        if (this.#dragging) {
            this.#dragging = false;
            this.#startX = 0;
            this.#startY = 0;
            this.#offscreenWidth = -1;
            this.#offscreenHeight = -1;
            this.#container.style.cursor = "default";
        }
    };

    constructor(application) {
        if (application instanceof PIXI.Application) {

            this.#application = application;
            this.#container = application.view;

            this.#container.addEventListener("pointerdown", this.#begin);
            this.#container.addEventListener("pointermove", this.#move);
            this.#container.addEventListener("pointerup", this.#end);

            const bounds = this.#container.getBoundingClientRect();
            this.#offsetX = bounds.x;
            this.#offsetY = bounds.y;
        }
    }

};

const addDrag = (application) => new Drag(application);

export default addDrag;
