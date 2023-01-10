import createElement from "./create.js";

let container = null;
let textContainer = null;

const hide = () => {
    container.classList.remove("Visible");
};

/**
 * @param {DOMRect} targetBounds
 * @param {string} message
 */
const show = (targetBounds, message) => {
    textContainer.textContent = message;
    container.classList.add("Visible");
    const containerBounds = container.getBoundingClientRect();
    let x = targetBounds.x + targetBounds.width;
    let y = targetBounds.y + targetBounds.height;
    if (x + containerBounds.width > window.innerWidth) {
        x = x - containerBounds.width - targetBounds.width;
    }
    if (y + containerBounds.height > window.innerHeight) {
        y = y - containerBounds.height - targetBounds.height;
    }
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
};

const add = (target, message) => {
    // TODO how to avoid instanceof here?
    if (target instanceof HTMLElement) {
        target.addEventListener("pointerenter", () => show(target.getBoundingClientRect(), message));
        target.addEventListener("pointerleave", hide);
    }
};

/** Creates the tooltip container.
 *
 * @returns {HTMLDivElement}
 */
const create = () => {
    container = createElement("div", "Tooltip");
    textContainer = createElement("p", "Text");
    container.appendChild(textContainer);
    return container;
};

const remove = () => {
    container.remove();
    container = null;
};

export default add;
export {
    create,
    remove
};
