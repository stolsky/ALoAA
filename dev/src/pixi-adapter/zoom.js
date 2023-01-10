/* globals PIXI */

import Configuration from "../simulation/Configuration.js";
import Simulation from "../simulation/Simulation.js";

const Zoom = class {

    static #Step = 0.2;

    #container;

    #scale;

    #zoomIn = () => {
        const newScale = Simulation.worldZoom + Zoom.#Step;
        Simulation.worldZoom = newScale;
        this.#scale.x = newScale;
        this.#scale.y = newScale;
    };

    #zoomOut = () => {
        const { width, height } = Configuration.World;
        if (width > this.#container.width || height > this.#container.height) {
            const newScale = Simulation.worldZoom - Zoom.#Step;
            Simulation.worldZoom = newScale;
            this.#scale.x = newScale;
            this.#scale.y = newScale;
        }
    };

    constructor(application) {
        // TODO how to avoid instanceof here?
        if (application instanceof PIXI.Application) {

            this.#scale = application.stage.scale;
            this.#container = application.view;

            this.#container.addEventListener("wheel", (event) => {
                if (event.deltaY > 0) {
                    this.#zoomOut();
                } else {
                    this.#zoomIn();
                }
                if (!application.ticker.started) {
                    application.render();
                }
            });
        }
    }
};

const addZoom = (application) => new Zoom(application);

export default addZoom;
