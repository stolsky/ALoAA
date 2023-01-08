/* globals PIXI */

import Simulation from "../simulation/Simulation.js";

const Zoom = class {

    static #Step = 0.2;

    #container;

    #scale;

    #zoomIn = () => {
        const newScale = Simulation.getWorldAttributes().zoom + Zoom.#Step;
        Simulation.setWorldZoom(newScale);
        this.#scale.x = newScale;
        this.#scale.y = newScale;
    };

    #zoomOut = () => {
        const { width, height, zoom } = Simulation.getWorldAttributes();
        if (width > this.#container.width || height > this.#container.height) {
            const newScale = zoom - Zoom.#Step;
            Simulation.setWorldZoom(newScale);
            this.#scale.x = newScale;
            this.#scale.y = newScale;
        }
    };

    constructor(application) {
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
