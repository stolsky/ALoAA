import { create } from "./utilities.js";
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

const buttonFullscreen = create("button", "Icon Fullscreen icon-enlarge");

buttonPlay.addEventListener("click", () => {
    buttonPlay.style.display = "none";
    buttonPause.style.display = "block";
    runLoop();
});
buttonPause.addEventListener("click", () => {
    buttonPause.style.display = "none";
    buttonPlay.style.display = "block";
    stopLoop();
});

buttonFastForward.addEventListener("click", () => {
    // TODO combine speed setting methods
    const speed = Simulation.speedFactor * Configuration.speedMultiplier.current;
    Simulation.speedFactor = speed;
    outputSpeedFactor.textContent = speed;
});

buttonSlowDown.addEventListener("click", () => {
    const speed = Simulation.speedFactor / Configuration.speedMultiplier.current;
    Simulation.speedFactor = speed;
    outputSpeedFactor.textContent = speed;
});

const controls = create("div", "Controls Sci-Fi-Border");
controls.append(
    buttonSlowDown,
    buttonPlay,
    buttonPause,
    buttonFastForward,
    outputSpeedFactor,
    outputTimePassed,
    buttonFullscreen
);

const visualization = create("div", "Visualization");
visualization.append(
    renderer,
    controls
);

const buttonCharts = create("button", "Icon Active icon-stats-bars");
const buttonOptions = create("button", "Icon icon-equalizer");
const buttonFinish = create("button", "Icon icon-enter");

const menu = create("div", "Menu Sci-Fi-Border");
menu.append(
    buttonCharts,
    buttonOptions,
    buttonFinish
);

const chartsPanel = create("div", "Panel Active");
const optionsPanel = create("div", "Panel");

const panels = create("div", "PanelGroup Sci-Fi-Border");
panels.append(
    chartsPanel,
    optionsPanel
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

const getChartsPanel = () => chartsPanel;

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
