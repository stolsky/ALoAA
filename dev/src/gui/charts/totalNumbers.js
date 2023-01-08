/* globals Chart */

import { ChartSettings, Anorganic, Organic, Autotroph, Heterotroph, Mixotroph } from "./dataTypes.js";
import createElement from "../utilities/create.js";
import Entity from "../../simulation/core/Entity.js";
import Simulation from "../../simulation/Simulation.js";

const SECTOR_SIZE = 10; // seconds
const MAX_DATA_SIZE = SECTOR_SIZE * 10;
const UPDATE_DELAY = 1000;

let chart = null;

const create = (parent) => {
    const canvas = createElement("canvas");
    parent.appendChild(canvas);

    const data = {
        labels: [],
        datasets: [
            {
                label: Anorganic.label,
                data: [],
                borderColor: Anorganic.color,
                fill: false,
                pointStyle: false
            },
            {
                label: Organic.label,
                data: [],
                borderColor: Organic.color,
                fill: false,
                pointStyle: false
            },
            {
                label: Autotroph.label,
                data: [],
                borderColor: Autotroph.color,
                fill: false,
                pointStyle: false
            },
            {
                label: Heterotroph.label,
                data: [],
                borderColor: Heterotroph.color,
                fill: false,
                pointStyle: false
            },
            {
                label: Mixotroph.label,
                data: [],
                borderColor: Mixotroph.color,
                fill: false,
                pointStyle: false
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: (context) => {
                        if (context.tick.label !== 0 && context.tick.label % SECTOR_SIZE === 0) {
                            return ChartSettings.lineColor;
                        }
                        return null;
                    },
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    lineWidth: 0.5,
                    ticks: { display: false }
                },
                ticks: { display: false }
            },
            y: {
                grid: {
                    color: ChartSettings.lineColor,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    lineWidth: 0.5
                },
                ticks: { display: false }
            }
        },
        plugins: {
            tooltip: {
                displayColors: false
            },
            legend: { display: false }
        }
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

let updateCounter = UPDATE_DELAY + 1;
const update = (deltaTime) => {

    if (updateCounter > UPDATE_DELAY) {

        const counter = (chart.data.labels.at(-1) || 0) + 1;
        chart.data.labels.push(counter);
        chart.data.datasets[Anorganic.index].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ANORGANIC).length);
        chart.data.datasets[Organic.index].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ORGANIC).length);
        chart.data.datasets[Autotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.AUTOTROPH).length);
        chart.data.datasets[Heterotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.HETEROTROPH).length);
        chart.data.datasets[Mixotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.MIXOTROPH).length);

        if (chart.data.labels.length > MAX_DATA_SIZE) {
            // shift is faster than splice and slice
            chart.data.labels.shift();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.shift();
            });
        }

        chart.update("none");
        updateCounter = 0;
    }

    updateCounter = updateCounter + deltaTime;
};

export default update;
export { create };
