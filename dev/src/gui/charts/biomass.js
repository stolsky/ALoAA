/* globals Chart */

import { create as createElement } from "../utilities.js";
import { hex2rgb } from "../../pixi-adapter/utils.js";
import Configuration from "../../simulation/Configuration.js";
import Entity from "../../simulation/core/Entity.js";
import Simulation from "../../simulation/Simulation.js";

let chart = null;

const create = (parent) => {
    const canvas = createElement("canvas");
    parent.appendChild(canvas);

    const anorganicColor = hex2rgb(Configuration.Colors.ANORGANIC);
    const organicColor = hex2rgb(Configuration.Colors.ORGANIC);
    const autotrophColor = hex2rgb(Configuration.Colors.AUTOTROPH);
    const heterotrophColor = hex2rgb(Configuration.Colors.HETEROTROPH);

    const source = [
        { type: "anorganic", amount: 0 },
        { type: "organic", amount: 0 },
        { type: "autotroph", amount: 0 },
        { type: "heterotroph", amount: 0 }
    ];

    const data = {
        labels: source.map((row) => row.type),
        datasets: [{
            label: null,
            data: source.map((row) => row.amount),
            backgroundColor: [
                `rgb(${anorganicColor})`,
                `rgb(${organicColor})`,
                `rgb(${autotrophColor})`,
                `rgb(${heterotrophColor})`
            ],
            borderWidth: 1
        }]
    };
    const options = {
        scales: {
            x: { display: false },
            y: { display: false }
        },
        plugins: { legend: { display: false } }
    };

    chart = new Chart(
        canvas,
        {
            type: "bar",
            data,
            options
        }
    );
};

const update = () => {

    const source = [
        { type: "anorganic", amount: Simulation.getResources().filter((resource) => resource.type === Entity.Type.ANORGANIC).length },
        { type: "organic", amount: Simulation.getResources().filter((resource) => resource.type === Entity.Type.ORGANIC).length },
        { type: "autotroph", amount: Simulation.getAgents().filter((agent) => agent.type === Entity.Type.AUTOTROPH).length },
        { type: "heterotroph", amount: Simulation.getAgents().filter((agent) => agent.type === Entity.Type.HETEROTROPH).length }
    ];

    chart.data.labels = source.map((row) => row.type);
    chart.data.datasets[0].data = source.map((row) => row.amount);
    chart.update();
};

export default update;
export { create };
