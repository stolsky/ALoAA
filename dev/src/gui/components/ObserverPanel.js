import { ClassType } from "../../simulation/core/Types.js";
import { getColorFromType } from "../../simulation/core/utilities.js";
import createElement from "../utilities/create.js";
import {
    createButton,
    selectMenuItem,
    selectMenuItem as selectPanel
} from "../utilities/utilities.js";

const name = createElement("p", "Name");
const typeLabel = createElement("span");
typeLabel.textContent = "Type:";
const typeText = createElement("span");
const typeContainer = createElement("p", "Type");
typeContainer.append(typeLabel, typeText);

const content = createElement("div", "Content");

const panelObserver = createElement("div", "Panel Observer");
panelObserver.append(name, typeContainer, content);

const buttonObserver = createButton(
    "Icon icon-target",
    () => {
        selectMenuItem(buttonObserver);
        selectPanel(panelObserver);
    },
    "Show Individual Information"
);

const close = () => {
    content.textContent = "";
};

const getButton = () => buttonObserver;

const getPanel = () => panelObserver;

/**
 *
 * @param {Symbol} symbol
 * @param {Object} data
 */
const open = (symbol, data) => {
    // open correct panel and set correct button state
    selectMenuItem(buttonObserver);
    selectPanel(panelObserver);

    typeText.textContent = symbol.description;
    typeText.style.color = `rgb(${getColorFromType(symbol, true)}`;

    content.textContent = "";
    Object.values(data).forEach((value) => {
        if (value.constructor.ClassType === ClassType.BAR) {
            const keyText = createElement("span", "Key");
            keyText.textContent = value.name;
            const valueText = createElement("span", "Value");
            valueText.id = value.id;
            valueText.textContent = value.getValue();
            content.append(keyText, valueText);
        }
    });
};

const update = (data) => {
    if (panelObserver.classList.contains("Active")) {
        Object.values(data).forEach((value) => {
            if (value.constructor.ClassType === ClassType.BAR) {
                document.getElementById(value.id).textContent = value.getValue();
            }
        });
    }
};

export {
    close,
    getButton,
    getPanel,
    open,
    update
};
