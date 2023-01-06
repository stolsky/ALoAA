/* globals PIXI */

import Entity from "../simulation/core/Entity.js";
import addDrag from "./drag.js";
import addZoom from "./zoom.js";
import { ClassType } from "../simulation/core/Types.js";
import { updateOberverPanel } from "../gui/components.js";

let app = new PIXI.Application();

/**
 * @type {{ element: Entity, graphic: PIXI.Graphics }}
 */
const observe = { element: null, graphic: null };

/** Convenience method for adding an element to the main scene graph
 *
 * @param {PIXI.Graphics} element
 */
const addElement = (element) => {
    if (element instanceof Entity) {
        const graphic = new PIXI.Graphics();
        element.draw(graphic);
        graphic.interactive = true;
        graphic.cursor = "pointer";
        graphic.on("pointerdown", () => {
            if (observe.element === element) {
                observe.element = null;
                observe.graphic = null;
            } else {
                observe.element = element;
                observe.graphic = graphic;
                updateOberverPanel(observe.element.type, observe.element.genes);
            }
        });
        app.stage.addChild(graphic);
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

const getObservedEntity = () => observe;

const loop = (method) => {
    if (app instanceof PIXI.Application && method instanceof Function) {
        app.ticker.add(() => {
            method(app.ticker.deltaMS);
            if (observe.element && observe.element.constructor.ClassType === ClassType.AGENT) {
                app.stage.pivot.x = observe.graphic.position.x;
                app.stage.pivot.y = observe.graphic.position.y;
                app.stage.position.x = app.renderer.width / 2;
                app.stage.position.y = app.renderer.height / 2;
            }
        });
    }
};

const pause = () => {
    if (app instanceof PIXI.Application) {
        app.stop();
    }
};

const play = () => {
    if (app instanceof PIXI.Application && !app.ticker.started) {
        app.start();
    }
};

const removeElement = (element) => {
    if (element instanceof Entity) {
        const { graphics } = element;
        if (graphics instanceof PIXI.Graphics) {
            app.stage.removeChild(graphics);
        }
    }
};

export {
    addElement,
    createRenderer,
    getObservedEntity,
    loop,
    pause,
    play,
    removeElement
};
