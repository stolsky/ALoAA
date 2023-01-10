import create from "../utilities/create.js";
import { createButton, createText, selectMenuItem, selectMenuItem as selectPanel } from "../utilities/utilities.js";
import { create as createTooltip } from "../utilities/tooltip.js";
import { formatTime } from "../../utilities/math.js";
import { getButton as getObserverButton, getPanel as getObserverPanel } from "./ObserverPanel.js";

import { play as runLoop, pause as stopLoop } from "../../pixi-adapter/renderer.js";

import Simulation from "../../simulation/Simulation.js";
import Configuration from "../../simulation/Configuration.js";

let renderer = null;
let panelCharts = null;
let outputTimePassed = null;

const init = () => {

    let isBeforeStart = true;
    const startMessage = create("p", "StartSimulationHint");
    startMessage.textContent = "To start the simulation click the \"Play\" button.";
    renderer = create("div", "Renderer Sci-Fi-Border");
    renderer.appendChild(startMessage);

    const outputSpeedFactor = create("span", "SpeedFactor");
    outputSpeedFactor.textContent = Simulation.speedFactor;

    const updateSpeedOutput = () => {
        outputSpeedFactor.textContent = Simulation.speedFactor;
    };
    const buttonSlowDown = createButton(
        "Icon icon-backward2",
        () => {
            Simulation.speedFactor = Simulation.speedFactor / Configuration.speedMultiplier.current;
            updateSpeedOutput();
        },
        "Slow Down Simulation"
    );
    const buttonSpeedUp = createButton(
        "Icon icon-forward3",
        () => {
            Simulation.speedFactor = Simulation.speedFactor * Configuration.speedMultiplier.current;
            updateSpeedOutput();
        },
        "Speed Up Simulation"
    );

    outputTimePassed = create("span", "TimePassed");
    outputTimePassed.textContent = "00:00:00.00";

    let buttonPause = null;
    const buttonPlay = createButton(
        "Icon Play icon-play3 PulseEffect",
        () => {
            if (isBeforeStart) {
                isBeforeStart = false;
                startMessage.classList.add("Hidden");
                buttonPlay.classList.remove("PulseEffect");
            }
            buttonPlay.style.display = "none";
            buttonPause.style.display = "block";
            runLoop();
        },
        "Run Simulation"
    );
    buttonPause = createButton(
        "Icon icon-pause2",
        () => {
            buttonPause.style.display = "none";
            buttonPlay.style.display = "block";
            stopLoop();
        },
        "Pause Simulation"
    );
    buttonPause.style.display = "none";

    // const buttonFinish = createButton(
    //     "Icon Finish icon-switch",
    //     () => {

    //     },
    //     "Finish Simulation"
    // );

    const controls = create("div", "Controls Sci-Fi-Border");
    controls.append(
        buttonSlowDown,
        buttonPlay,
        buttonPause,
        buttonSpeedUp,
        outputSpeedFactor,
        outputTimePassed
        // buttonFinish
    );

    const visualization = create("div", "LeftContainer");
    visualization.append(
        renderer,
        controls
    );

    panelCharts = create("div", "Panel Charts Active");
    // const panelOptions = create("div", "Panel");
    const panelObserver = getObserverPanel();
    const panelHelp = create("div", "Panel");
    panelHelp.append(
        createText("h2", "Experimental Features"),
        createText("p", "Drag: You can drag the map by clicking the mouse in the map, holding the mouse button down and moving the mouse."),
        createText("p", "Zoom: You can zoom the map when the mouse pointer is over the map and the mouse wheel is turned."),
        createText("p", "Observe: To observe an Entity more closely, you can click on them. Then their information will be displayed on the right. If an Entity is too fast, just pause the simulation. To leave the observation, click on the Entity again.")
    );

    const buttonCharts = createButton(
        "Icon Active icon-stats-bars",
        () => {
            selectMenuItem(buttonCharts);
            selectPanel(panelCharts);
        },
        "Show Charts"
    );

    // const buttonOptions = createButton(
    //     "Icon icon-equalizer",
    //     () => {
    //         selectMenuItem(buttonOptions);
    //         selectPanel(panelOptions);
    //     },
    //     "Show Options"
    // );

    const buttonObserver = getObserverButton();

    const buttonHelp = createButton(
        "Icon icon-info",
        () => {
            selectMenuItem(buttonHelp);
            selectPanel(panelHelp);
        },
        "Show Feature Information"
    );

    const menu = create("div", "Menu Sci-Fi-Border");
    menu.append(
        buttonCharts,
        buttonObserver,
        // buttonOptions,
        buttonHelp
    );

    const panels = create("div", "PanelGroup Sci-Fi-Border");
    panels.append(
        panelCharts,
        panelObserver,
        // panelOptions,
        panelHelp
    );

    const evaluation = create("div", "RightContainer");
    evaluation.append(
        menu,
        panels
    );

    const simulationPage = create("div", "Page Simulation Maximize");
    simulationPage.append(
        visualization,
        evaluation,
        createTooltip()
    );

    document.body.appendChild(simulationPage);

};

const getChartsPanel = () => panelCharts;

const getRendererContainer = () => renderer;

const updateOutputTimePassed = () => {
    const msec = Simulation.timePassed;
    const timeString = formatTime(msec);
    outputTimePassed.textContent = timeString;
};

export {
    getChartsPanel,
    getRendererContainer,
    init,
    updateOutputTimePassed
};
