import create from "../utilities/create.js";
import { createButton, createInput, createText, isFormValid, resetFormValidity } from "../utilities/utilities.js";
import { create as createTooltip, remove as removeTooltip } from "../utilities/tooltip.js";
import { init as initSimulationPage } from "./simulation.js";
import applySetup from "../../setup.js";

import Configuration from "../../simulation/Configuration.js";

// import { addMusic, playMusic } from "../../pixi-adapter/sound.js";

const APP_TITLE = "ALoAA";
const APP_SUBTITLE = "Artificial Life of Autonomous Agents";
const APP_DESCRIPTION = [
    "ALoAA simulates self-controlling units, the so-called agents, their behavior and their evolution. For this purpose, random changes in the properties of the agents occur as they multiply.",
    "ALoAA gives you the possibility not only to observe this evolution, but also to control it directly with the input fields below."
];

const configurationPage = create("div", "Page Configuration Maximize");

const inputElements = [
    {
        title: "world size",
        input: [
            { label: "width", type: "number", max: 10000, placeholder: "3000" },
            { label: "height", type: "number", max: 10000, placeholder: "2000" }
        ]
    },
    {
        title: "number of entities",
        input: [
            { label: "anorganic resource", type: "number", max: 1000, placeholder: "100" },
            { label: "organic resource", type: "number", max: 1000, placeholder: "0" },
            { label: "autotroph agent", type: "number", max: 1000, placeholder: "10" },
            { label: "heterotroph agent", type: "number", max: 1000, placeholder: "0" },
            { label: "mixotroph agent", type: "number", max: 1000, placeholder: "0" }
        ]
    },
    {
        title: "mutation",
        input: [
            { label: "frequency", type: "number", max: 100, placeholder: "5", info: "0-100%" }
        ]
    },
    {
        title: "pseudo random number generator",
        input: [
            { label: "seed", type: "string", max: 32, placeholder: "ALoAA" }
        ]
    }

];

const appTitle = create("h1", "Title");
appTitle.textContent = APP_TITLE;
const appSubtitle = create("h2", "Subtitle");
appSubtitle.textContent = APP_SUBTITLE;
const appDescription = create("p", "Description");
APP_DESCRIPTION.forEach((descriptionPart) => appDescription.appendChild(createText("span", descriptionPart)));
const welcome = create("div", "Welcome");
welcome.append(
    appTitle,
    appSubtitle,
    appDescription
);

const buttonReset = createButton(
    "Icon Reset icon-spinner11",
    () => inputElements.forEach((group) => group.input.forEach((input) => {
        document.getElementById(input.label).value = "";
        resetFormValidity();
    })),
    "reset to default values"
);

const getValueFromInput = (id, defaultValue) => {
    let result = defaultValue;
    const elem = document.getElementById(id);
    if (elem && elem.value) {
        const inputValue = Number.parseInt(document.getElementById(id).value, 10);
        if (!Number.isNaN(inputValue)) {
            result = inputValue;
        }
    }
    return result;
};

const buttonConfirm = createButton(
    "Icon icon-checkmark",
    () => {
        if (isFormValid()) {
            // TODO goal dynamically
            // inputElements.forEach((group) => group.input.forEach((input) => {
            //     let { value } = document.getElementById(input.label.trim());
            //     if (input.type === "number") {
            //         value = Number.parseInt(value, 10);
            //         if (!Number.isFinite(value)) {
            //             value = input.placeholder;
            //         }
            //     } else if (value.length === 0) {
            //         value = input.placeholder;
            //     }
            // }));
            Configuration.World.width = getValueFromInput("width", 3000);
            Configuration.World.height = getValueFromInput("height", 2000);
            Configuration.Entities.Anorganic.quantity = getValueFromInput("anorganic resource", 100);
            Configuration.Entities.Organic.quantity = getValueFromInput("organic resource", 0);
            Configuration.Entities.Autotroph.quantity = getValueFromInput("autotroph agent", 10);
            Configuration.Entities.Heterotroph.quantity = getValueFromInput("heterotroph agent", 0);
            Configuration.Entities.Mixotroph.quantity = getValueFromInput("mixotroph agent", 0);
            Configuration.mutationRate = getValueFromInput("frequency", 1);
            Configuration.seed = document.getElementById("seed", "ALoAA");
            Configuration.assign();

            removeTooltip();
            configurationPage.remove();
            initSimulationPage();
            applySetup();
        }
    },
    "confirm configuration"
);

const panelInput = create("div", "InputPanel");
inputElements.forEach((group) => {
    const title = create("h3", "Title");
    title.textContent = group.title;
    const groupContainer = create("div", "InputGroup");
    groupContainer.appendChild(title);
    group.input.forEach((input) => groupContainer.append(createInput(input)));
    panelInput.appendChild(groupContainer);
});

const content = create("div", "Content Sci-Fi-Border");
content.append(
    welcome,
    panelInput
);

const controls = create("div", "Controls Sci-Fi-Border");
controls.append(
    buttonReset,
    buttonConfirm
);

const mainContainer = create("div", "LeftContainer");
mainContainer.append(
    content,
    controls
);

configurationPage.append(
    mainContainer,
    createTooltip()
);

// TODO find good place or better variant to init and play sound
// addMusic("coldJourney", "../dev/res/music/Cold Journey - 320bit.mp3");
// configurationPage.addEventListener(
//     "click",
//     () => playMusic("coldJourney"),
//     { once: true }
// );

document.body.appendChild(configurationPage);
