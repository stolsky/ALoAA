/* globals PIXI */

import Agent from "../simulation/core/Agent.js";
import Entity from "../simulation/core/Entity.js";
import addDrag from "./drag.js";
import addZoom from "./zoom.js";

let app = new PIXI.Application();
/**
 * @type {{ element: Entity, graphic: PIXI.Graphics }}
 */
const follow = { element: null, graphic: null };

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
                if (follow.element === element) {
                    console.log("deselect");
                    follow.element = null;
                    follow.graphic = null;
                } else {
                    console.log("select");
                    follow.element = element;
                    follow.graphic = graphic;
                    // TODO update info screen
                }
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
            if (follow.element instanceof Agent) {
                app.stage.pivot.x = follow.graphic.position.x;
                app.stage.pivot.y = follow.graphic.position.y;
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
