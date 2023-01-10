import addTooltip from "./tooltip.js";
import createElement from "./create.js";
import { isNotEmptyString } from "../../simulation/core/utilities.js";

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
    // TODO how to avoid instanceof here?
    if (action instanceof Function) {
        button.addEventListener("pointerdown", action);
    }
    if (typeof tooltip === "string" && tooltip.length > 0) {
        addTooltip(button, tooltip);
    }
    return button;
};

let formValidity = true;
const isFormValid = () => formValidity;
const resetFormValidity = () => {
    formValidity = true;
};
/**
 *
 * @param {{ id: string, label: string, type: "text"|"string", pattern?: string, max?: number, default?: string }} object
 *
 * @returns {HTMLDivElement}
 */
const createInput = ({ label, type, pattern, max, placeholder }) => {

    const labelText = createElement("label");
    labelText.textContent = label;
    labelText.setAttribute("for", label.trim());

    const input = createElement("input");
    input.id = label.trim();
    input.setAttribute("type", "text");
    if (type === "number") {
        input.setAttribute("inputmode", "numeric");
        input.setAttribute("pattern", "[0-9]*");
        input.addEventListener("input", () => {
            if (input.value > max) {
                input.value = max;
            }
            if (input.value < 0) {
                input.value = 0;
            }
            formValidity = input.validity.valid;
        });
    } else if (type === "string") {
        input.setAttribute("pattern", "[A-Za-z0-9_]*");
        input.setAttribute("maxlength", max);
        input.addEventListener("input", () => {
            formValidity = input.validity.valid;
        });
    }

    if (pattern && isNotEmptyString(pattern)) {
        input.setAttribute("pattern", pattern);
    }

    if (placeholder && isNotEmptyString(placeholder)) {
        input.setAttribute("placeholder", placeholder);
    }

    const container = createElement("div");
    container.append(labelText, input);
    return container;
};

const activeClassName = "Active";
const activate = (element) => element.classList.add(activeClassName);
const deactivate = (element) => element.classList.remove(activeClassName);
const deactivateSiblings = (element) => {
    [...element.parentNode.children].filter((child) => child !== element).forEach((sibling) => deactivate(sibling));
};
const selectMenuItem = (element) => {
    // TODO how to avoid instanceof here?
    if (element instanceof HTMLElement && !element.classList.contains(activeClassName)) {
        activate(element);
        deactivateSiblings(element);
    }
};

export {
    createButton,
    createInput,
    isFormValid,
    resetFormValidity,
    selectMenuItem
};
