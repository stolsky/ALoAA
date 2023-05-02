import { Application, Graphics } from "pixi.js";

import Entity from "../simulation/core/Entity.js";
import addDrag from "./drag.js";
import addZoom from "./zoom.js";
import { ClassType } from "../simulation/core/Types.js";
import { close as closeObserverPanel, open as openObserverPanel } from "../gui/components/ObserverPanel.js";

let app = new Application();

/**
 * @type {{ element: Entity, graphic: PIXI.Graphics }}
 */
const Observe = { element: null, graphic: null };

/** Convenience method for adding an element to the main scene graph
 *
 * @param {Entity} element
 */
const addElement = (element) => {
    // TODO how to avoid instanceof here?
    if (element instanceof Entity) {
        const graphic = new Graphics();
        graphic.interactive = true;
        graphic.cursor = "pointer";
        graphic.on("pointerdown", (event) => {
            if (Observe.element === element) {
                Observe.element = null;
                Observe.graphic = null;
                app.stage.pivot.x = 0;
                app.stage.pivot.y = 0;
                // TODO improve: correct position reset
                app.stage.position.x = event.clientX;
                app.stage.position.y = event.clientY;
                closeObserverPanel();
            } else {
                Observe.element = element;
                Observe.graphic = graphic;
                const { id, type, genes } = Observe.element;
                openObserverPanel({ id, type, genes });
            }
        });
        element.draw(graphic);
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
    // TODO how to avoid instanceof here?
    if (parentContainer instanceof HTMLDivElement) {
        app = new Application({ resizeTo: parentContainer, autoResize: true, resolution: devicePixelRatio, autoStart: false });
        parentContainer.appendChild(app.view);
        // TODO store drag object and prevent dragging if following
        addDrag(app);
        addZoom(app);
    }
};

const getObservedEntity = () => Observe;

const loop = (method) => {
    // TODO how to avoid instanceof here?
    if (app instanceof Application && method instanceof Function) {
        app.ticker.add(() => {
            // console.log("pivot", app.stage.pivot.x, app.stage.pivot.y);
            // console.log("position", app.stage.position.x, app.stage.position.y);

            method(app.ticker.deltaMS);
            if (Observe.element && Observe.element.constructor.ClassType === ClassType.AGENT) {
                app.stage.pivot.x = Observe.graphic.position.x;
                app.stage.pivot.y = Observe.graphic.position.y;
                app.stage.position.x = app.renderer.width / 2;
                app.stage.position.y = app.renderer.height / 2;
            }
        });
    }
};

const pause = () => {
    // TODO how to avoid instanceof here?
    if (app instanceof Application) {
        app.stop();
    }
};

const play = () => {
    // TODO how to avoid instanceof here?
    if (app instanceof Application && !app.ticker.started) {
        app.start();
    }
};

const removeElement = (element) => {
    // TODO how to avoid instanceof here?
    if (element instanceof Entity) {
        const { graphics } = element;
        // TODO how to avoid instanceof here?
        if (graphics instanceof Graphics) {
            graphics.clear();
            app.stage.removeChild(graphics);
        }
    }
};

export {
    Observe,
    addElement,
    createRenderer,
    getObservedEntity,
    loop,
    pause,
    play,
    removeElement
};
