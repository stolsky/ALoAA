import Configuration from "../../simulation/Configuration.js";
import { hexToRGB } from "../../pixi-adapter/utils.js";

const ChartSettings = {
    lineColor: "rgba(38, 217, 255, 0.5)"
};

const Anorganic = {
    index: 0,
    label: "Anorganic",
    color: `rgb(${hexToRGB(Configuration.Colors.ANORGANIC)})`
};

const Organic = {
    index: 1,
    label: "Organic",
    color: `rgb(${hexToRGB(Configuration.Colors.ORGANIC)})`
};

const Autotroph = {
    index: 2,
    label: "Autotroph",
    color: `rgb(${hexToRGB(Configuration.Colors.AUTOTROPH)})`
};

const Heterotroph = {
    index: 3,
    label: "Heterotroph",
    color: `rgb(${hexToRGB(Configuration.Colors.HETEROTROPH)})`
};

const Mixotroph = {
    index: 4,
    label: "Mixotroph",
    color: `rgb(${hexToRGB(Configuration.Colors.MIXOTROPH)})`
};

export {
    ChartSettings,

    Anorganic,
    Organic,
    Autotroph,
    Heterotroph,
    Mixotroph
};
