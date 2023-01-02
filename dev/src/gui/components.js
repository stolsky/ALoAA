import { create, selectMenuItem, selectMenuItem as selectPanel } from "./utilities.js";
import { play as runLoop, pause as stopLoop } from "../pixi-adapter/renderer.js";
import Simulation from "../simulation/Simulation.js";
import Configuration from "../simulation/Configuration.js";
import { formatTime } from "../utilities/math.js";

const renderer = create("div", "Renderer Sci-Fi-Border");

const buttonPlay = create("button", "Icon Play icon-play3");
const buttonPause = create("button", "Icon icon-pause2");
buttonPause.style.display = "none";

const buttonSlowDown = create("button", "Icon icon-backward2");
const buttonFastForward = create("button", "Icon icon-forward3");

const outputSpeedFactor = create("span", "SpeedFactor");
outputSpeedFactor.textContent = Simulation.speedFactor;

const outputTimePassed = create("span", "TimePassed");
outputTimePassed.textContent = "00:00:00.00";

// const buttonFullscreen = create("button", "Icon Fullscreen icon-enlarge");
// buttonFullscreen.addEventListener("pointerdown", () => {});

buttonPlay.addEventListener("pointerdown", () => {
    buttonPlay.style.display = "none";
    buttonPause.style.display = "block";
    runLoop();
});
buttonPause.addEventListener("pointerdown", () => {
    buttonPause.style.display = "none";
    buttonPlay.style.display = "block";
    stopLoop();
});

const updateSpeedOutput = () => {
    outputSpeedFactor.textContent = Simulation.speedFactor;
};

buttonFastForward.addEventListener("pointerdown", () => {
    // TODO combine speed setting methods
    Simulation.speedFactor = Simulation.speedFactor * Configuration.speedMultiplier.current;
    updateSpeedOutput();
});

buttonSlowDown.addEventListener("pointerdown", () => {
    Simulation.speedFactor = Simulation.speedFactor / Configuration.speedMultiplier.current;
    updateSpeedOutput();
});

const buttonFinish = create("button", "Icon Finish icon-switch");

const controls = create("div", "Controls Sci-Fi-Border");
controls.append(
    buttonSlowDown,
    buttonPlay,
    buttonPause,
    buttonFastForward,
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

const buttonCharts = create("button", "Icon Active icon-stats-bars");
buttonCharts.addEventListener("pointerdown", () => {
    selectMenuItem(buttonCharts);
    selectPanel(panelCharts);
});

const buttonOptions = create("button", "Icon icon-equalizer");
buttonOptions.addEventListener("pointerdown", () => {
    selectMenuItem(buttonOptions);
    selectPanel(panelOptions);
});

// TODO add tests
const buttonFollow = create("button", "Icon icon-target");
buttonFollow.addEventListener("pointerdown", () => {
    selectMenuItem(buttonFollow);
    selectPanel(panelInformation);
});

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
    evaluation
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
