/* globals Chart */

import createElement from "../utilities/create.js";
import { hex2rgb } from "../../pixi-adapter/utils.js";
import Configuration from "../../simulation/Configuration.js";
import Entity from "../../simulation/core/Entity.js";
import Simulation from "../../simulation/Simulation.js";

let chart = null;

const INDEX_ANORGANIC = 0;
const INDEX_ORGANIC = 1;
const INDEX_AUTOTROPH = 2;
const INDEX_HETEROTROPH = 3;

const create = (parent) => {
    const canvas = createElement("canvas");
    parent.appendChild(canvas);

    const data = {
        labels: [],
        datasets: [
            {
                label: "anorganic",
                data: [],
                borderColor: `rgb(${hex2rgb(Configuration.Colors.ANORGANIC)})`,
                fill: false,
                pointStyle: false
            },
            {
                label: "organic",
                data: [],
                borderColor: `rgb(${hex2rgb(Configuration.Colors.ORGANIC)})`,
                fill: false,
                pointStyle: false
            },
            {
                label: "autotroph",
                data: [],
                borderColor: `rgb(${hex2rgb(Configuration.Colors.AUTOTROPH)})`,
                fill: false,
                pointStyle: false,
                tension: 0.4 // TODO test
            },
            {
                label: "heterotroph",
                data: [],
                borderColor: `rgb(${hex2rgb(Configuration.Colors.HETEROTROPH)})`,
                fill: false,
                pointStyle: false,
                tension: 0.4 // TODO test
            }
        ]
    };

    const options = {
        scales: {
            x: {
                grid: {
                    color: (context) => {
                        if (context.index % 10 === 0) {
                            return "rgba(38, 217, 255, 0.5)";
                        }
                        return null;
                    },
                    tickLength: 0
                },
                ticks: { display: false }
            },
            y: { display: false }
        },
        plugins: { legend: { display: false } }
    };

    chart = new Chart(
        canvas,
        {
            type: "line",
            data,
            options
        }
    );
};

let updateCounter = 1001;
const update = (deltaTime) => {

    if (updateCounter > 1000) {

        chart.data.labels.push(chart.data.datasets[INDEX_ANORGANIC].data.length);
        chart.data.datasets[INDEX_ANORGANIC].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ANORGANIC).length);
        chart.data.datasets[INDEX_ORGANIC].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ORGANIC).length);
        chart.data.datasets[INDEX_AUTOTROPH].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.AUTOTROPH).length);
        chart.data.datasets[INDEX_HETEROTROPH].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.HETEROTROPH).length);

        chart.update();
        updateCounter = 0;
    }

    updateCounter = updateCounter + deltaTime;
};

export default update;
export { create };
