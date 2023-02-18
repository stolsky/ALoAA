import { ClassType } from "../../simulation/core/Types.js";
import { getColorFromType } from "../../simulation/core/utilities.js";
import createElement from "../utilities/create.js";
import {
    createButton,
    selectMenuItem,
    selectMenuItem as selectPanel
} from "../utilities/utilities.js";

const createInformationContainer = (type) => {
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

const updateInformation = (parent, key, value) => {
    const keyText = createElement("span", "Key");
    keyText.textContent = key;
    const valueText = createElement("span", "Value");
    valueText.id = key;
    valueText.textContent = value;
    parent.append(keyText, valueText);
};

const about = createInformationContainer("About");
const bars = createInformationContainer("Bar");
const traits = createInformationContainer("Trait");

const panelObserver = createElement("div", "Panel Observer");
// TODO improve code
panelObserver.append(
    about.header,
    about.content,
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
    about.content.textContent = "";
    bars.content.textContent = "";
    traits.content.textContent = "";
};

/**
 *
 * @param {Symbol} symbol
 * @param {Object} data
 */
const open = ({ id, type, genes }) => {
    // open correct panel and set correct button state
    selectMenuItem(buttonObserver);
    selectPanel(panelObserver);

    about.content.textContent = "";
    bars.content.textContent = "";
    traits.content.textContent = "";

    const color = `rgb(${getColorFromType(type, true)}`;
    about.content.style.color = color;
    updateInformation(about.content, "ID", id);
    updateInformation(about.content, "Type", type.description);
    // updatePropertyType(about.content, "Name");

    Object.values(genes).forEach((gene) => {
        if (gene.constructor.ClassType === ClassType.BAR) {
            updateInformation(bars.content, gene.name, gene.getValue());
        } else if (gene.constructor.ClassType === ClassType.TRAIT) {
            updateInformation(traits.content, gene.name, gene.getValue());
        }
    });
};

const update = (genes) => {
    if (panelObserver.classList.contains("Active")) {
        Object.values(genes).forEach((gene) => {
            if (gene.constructor.ClassType === ClassType.BAR) {
                document.getElementById(gene.name).textContent = gene.getValue();
            }
        });
    }
};

const getButton = () => buttonObserver;

const getPanel = () => panelObserver;

export {
    close,
    getButton,
    getPanel,
    open,
    update
};
