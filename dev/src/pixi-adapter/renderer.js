/* globals PIXI */

import Entity from "../simulation/core/Entity.js";
import addDrag from "./drag.js";
import addZoom from "./zoom.js";

let app = new PIXI.Application();
let follow = null;

// TODO improve information presentation
const logger = (message) => console.log(message);

/** Convenience method for adding an element to the main scene graph
 *
 * @param {PIXI.Graphics} element
 */
const addElement = (element) => {
    if (element instanceof Entity) {
        const graphic = new PIXI.Graphics();
        element.draw(graphic);
        if (graphic instanceof PIXI.Graphics) {
            graphic.interactive = true;
            graphic.cursor = "pointer";
            graphic.on("pointerdown", () => {
                // logger(JSON.stringify(element.position));
                // TODO release dragging -> right mouse click? -> disable default right click menu
                follow = graphic;
            });
            app.stage.addChild(graphic);
        }
    }
};

// check out https://www.pixijselementals.com/#recipe-scene-manager
/**
 * @param {HTMLDivElement} parentContainer
 * @param {number} worldWidth
 * @param {number} worldHeight
 */
const createRenderer = (parentContainer) => {

    if (parentContainer instanceof HTMLDivElement) {
        app = new PIXI.Application({ resizeTo: parentContainer, autoResize: true, resolution: devicePixelRatio, autoStart: false });
        parentContainer.appendChild(app.view);

        // TODO store drag object and prevent dragging if following
        addDrag(app);
        addZoom(app);
    }

};

const loop = (method) => {
    if (app instanceof PIXI.Application && method instanceof Function) {
        app.ticker.add(() => {
            method(app.ticker.deltaMS);
            if (follow) {
                app.stage.pivot.x = follow.position.x;
                app.stage.pivot.y = follow.position.y;
                app.stage.position.x = app.renderer.width / 2;
                app.stage.position.y = app.renderer.height / 2;
            }
        });
    }
};

const play = () => {
    if (!app.ticker.started) {
        app.start();
    }
};

const pause = () => app.stop();

export {
    addElement,
    createRenderer,
    loop,
    pause,
    play
};
