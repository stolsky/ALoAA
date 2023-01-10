import { ClassType } from "../../simulation/core/Types.js";
import { getColorFromType } from "../../simulation/core/utilities.js";
import createElement from "../utilities/create.js";
import {
    createButton,
    selectMenuItem,
    selectMenuItem as selectPanel
} from "../utilities/utilities.js";

const createPropertyContent = (type) => {
    const label = createElement("span");
    label.textContent = type;
    const value = createElement("span");
    value.textContent = "Value";
    const header = createElement("p", "ContentHeader");
    header.append(
        label,
        value
    );

    return {
        header,
        content: createElement("div", "Content")
    };
};

const updatePropertyType = (parent, value) => {
    const keyText = createElement("span", "Key");
    keyText.textContent = value.name;
    const valueText = createElement("span", "Value");
    valueText.id = value.id;
    valueText.textContent = value.getValue();
    parent.append(keyText, valueText);
};

const name = createElement("p", "Name");
const typeLabel = createElement("span");
typeLabel.textContent = "Type:";
const typeText = createElement("span");
const typeContainer = createElement("p", "Type");
typeContainer.append(
    typeLabel,
    typeText
);

const bars = createPropertyContent("Bar");
const traits = createPropertyContent("Trait");

const panelObserver = createElement("div", "Panel Observer");
panelObserver.append(
    name,
    typeContainer,
    bars.header,
    bars.content,
    traits.header,
    traits.content
);

const buttonObserver = createButton(
    "Icon icon-target",
    () => {
        selectMenuItem(buttonObserver);
        selectPanel(panelObserver);
    },
    "Show Individual Information"
);

const close = () => {
    typeText.textContent = "";
    bars.content.textContent = "";
    traits.content.textContent = "";
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

    bars.content.textContent = "";
    traits.content.textContent = "";
    Object.values(data).forEach((value) => {
        if (value.constructor.ClassType === ClassType.BAR) {
            updatePropertyType(bars.content, value);
        } else if (value.constructor.ClassType === ClassType.TRAIT) {
            updatePropertyType(traits.content, value);
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
