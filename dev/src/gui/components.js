import create from "./utilities/create.js";
import { createButton, selectMenuItem, selectMenuItem as selectPanel } from "./utilities/utilities.js";
import { create as createTooltip } from "./utilities/tooltip.js";
import { play as runLoop, pause as stopLoop } from "../pixi-adapter/renderer.js";
import Simulation from "../simulation/Simulation.js";
import Configuration from "../simulation/Configuration.js";
import { formatTime } from "../utilities/math.js";

const renderer = create("div", "Renderer Sci-Fi-Border");

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

const outputTimePassed = create("span", "TimePassed");
outputTimePassed.textContent = "00:00:00.00";

let buttonPause = null;
const buttonPlay = createButton(
    "Icon Play icon-play3",
    () => {
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

const buttonFinish = createButton(
    "Icon Finish icon-switch",
    () => {

    },
    "Finish Simulation"
);

const controls = create("div", "Controls Sci-Fi-Border");
controls.append(
    buttonSlowDown,
    buttonPlay,
    buttonPause,
    buttonSpeedUp,
    outputSpeedFactor,
    outputTimePassed,
    buttonFinish
);

const visualization = create("div", "Visualization");
visualization.append(
    renderer,
    controls
);

const panelCharts = create("div", "Panel Active");
const panelOptions = create("div", "Panel");
const panelInformation = create("div", "Panel");

const buttonCharts = createButton(
    "Icon Active icon-stats-bars",
    () => {
        selectMenuItem(buttonCharts);
        selectPanel(panelCharts);
    },
    "Show Charts"
);

const buttonOptions = createButton(
    "Icon icon-equalizer",
    () => {
        selectMenuItem(buttonOptions);
        selectPanel(panelOptions);
    },
    "Show Options"
);

// TODO add tests
const buttonFollow = createButton(
    "Icon icon-target",
    () => {
        selectMenuItem(buttonFollow);
        selectPanel(panelInformation);
    },
    "Show Individual Information"
);

const menu = create("div", "Menu Sci-Fi-Border");
menu.append(
    buttonCharts,
    buttonOptions,
    buttonFollow
);

const panels = create("div", "PanelGroup Sci-Fi-Border");
panels.append(
    panelCharts,
    panelOptions,
    panelInformation
);

const evaluation = create("div", "Evaluation");
evaluation.append(
    menu,
    panels
);

const gui = create("div", "GUI Maximize");
gui.append(
    visualization,
    evaluation,
    createTooltip()
);

document.body.appendChild(gui);

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
    updateOutputTimePassed
};
