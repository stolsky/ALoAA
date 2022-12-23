/* global PIXI */

import Resource from "../simulation/core/Resource.js";

let app = null;

/** Convenience method for adding an element to the main scene graph
 *
 * @param {PIXI.DisplayObject} element
 */
const addElement = (element) => {
    if (element instanceof Resource) {
        const graphic = new PIXI.Graphics();
        element.draw(graphic);
        if (app instanceof PIXI.Application && graphic instanceof PIXI.DisplayObject) {
            app.stage.addChild(graphic);
        }
    }
};

// check out https://www.pixijselementals.com/#recipe-scene-manager
const createRenderer = (parentContainer, width, height) => {

    if (parentContainer instanceof HTMLDivElement) {
        app = new PIXI.Application({ resizeTo: parentContainer, autoStart: false });

        // resize if width and height are specified else engine uses (parent container size)
        if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) {
            app.stage.width = width;
            app.stage.height = height;
        }

        parentContainer.appendChild(app.view);
    }

};

const loop = (method) => {
    if (app instanceof PIXI.Application && method instanceof Function) {
        app.ticker.add(() => method(app.ticker.deltaMS));
    }
};

const play = () => {
    if (app instanceof PIXI.Application && !app.ticker.started) {
        app.start();
    }
};

const pause = () => {
    if (app instanceof PIXI.Application && app.ticker.started) {
        app.stop();
    }
};

export {
    addElement,
    createRenderer,
    loop,
    pause,
    play
};
