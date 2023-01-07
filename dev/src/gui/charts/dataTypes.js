import Configuration from "../../simulation/Configuration.js";
import { hex2rgb } from "../../pixi-adapter/utils.js";

const ChartSettings = {
    lineColor: "rgba(38, 217, 255, 0.5)"
};

const Anorganic = {
    index: 0,
    label: "Anorganic",
    color: `rgb(${hex2rgb(Configuration.Colors.ANORGANIC)})`
};

const Organic = {
    index: 1,
    label: "Organic",
    color: `rgb(${hex2rgb(Configuration.Colors.ORGANIC)})`
};

const Autotroph = {
    index: 2,
    label: "Autotroph",
    color: `rgb(${hex2rgb(Configuration.Colors.AUTOTROPH)})`
};

const Heterotroph = {
    index: 3,
    label: "Heterotroph",
    color: `rgb(${hex2rgb(Configuration.Colors.HETEROTROPH)})`
};

const Mixotroph = {
    index: 4,
    label: "Mixotroph",
    color: `rgb(${hex2rgb(Configuration.Colors.MIXOTROPH)})`
};

export {
    ChartSettings,

    Anorganic,
    Organic,
    Autotroph,
    Heterotroph,
    Mixotroph
};
