import createElement from "./create.js";

const container = createElement("div", "Tooltip");
const text = createElement("p", "Text");
container.appendChild(text);

const hide = () => {
    container.classList.remove("Visible");
};

/**
 * @param {DOMRect} targetBounds
 * @param {string} message
 */
const show = (targetBounds, message) => {
    text.textContent = message;
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
    if (target instanceof HTMLElement) {
        target.addEventListener("pointerenter", () => show(target.getBoundingClientRect(), message));
        target.addEventListener("pointerleave", hide);
    }
};

const create = () => container;

export default add;
export { create };
