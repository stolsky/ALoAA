/* globals PIXI */

// import Configuration from "../simulation/Configuration.js";
import Simulation from "../simulation/Simulation.js";

const Zoom = class {

    static #Step = 0.2;

    #container;

    #stage;

    #scale;

    #zoomIn = () => {
        const newScale = Simulation.worldZoom + Zoom.#Step;
        Simulation.worldZoom = newScale;
        this.#scale.x = newScale;
        this.#scale.y = newScale;
    };

    #zoomOut = () => {
        if (this.#container.width < this.#stage.width || this.#container.height < this.#stage.height) {
            const newScale = Simulation.worldZoom - Zoom.#Step;
            Simulation.worldZoom = newScale;
            this.#scale.x = newScale;
            this.#scale.y = newScale;
        }
    };

    constructor(application) {
        // TODO how to avoid instanceof here?
        if (application instanceof PIXI.Application) {

            this.#container = application.view;
            this.#stage = application.stage;
            this.#scale = this.#stage.scale;

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
