import addTooltip from "./tooltip.js";
import createElement from "./create.js";

/**
 *
 * @param {string} className
 * @param {Function} action
 * @param {string} tooltip
 *
 * @returns {HTMLButtonElement}
 */
const createButton = (className, action, tooltip) => {
    const button = createElement("button", className);
    if (action instanceof Function) {
        button.addEventListener("pointerdown", action);
    }
    if (typeof tooltip === "string" && tooltip.length > 0) {
        addTooltip(button, tooltip);
    }
    return button;
};

const activeClassName = "Active";
const activate = (element) => element.classList.add(activeClassName);
const deactivate = (element) => element.classList.remove(activeClassName);
const deactivateSiblings = (element) => {
    [...element.parentNode.children].filter((child) => child !== element).forEach((sibling) => deactivate(sibling));
};
const selectMenuItem = (element) => {
    if (element instanceof HTMLElement && !element.classList.contains(activeClassName)) {
        activate(element);
        deactivateSiblings(element);
    }
};

const openObserverPanel = (symbol, data) => {
    console.log(symbol, data);
};

const closeObserverPanel = () => {
    console.log("close");
};

export {
    closeObserverPanel,
    createButton,
    openObserverPanel,
    selectMenuItem
};
