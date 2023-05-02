import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from "chart.js";

import { ChartSettings } from "./dataTypes.js";
import createElement from "../utilities/create.js";
import Entity from "../../simulation/core/Entity.js";
import Simulation from "../../simulation/Simulation.js";
import Configuration from "../../simulation/Configuration.js";
import { hexToRGB } from "../../pixi-adapter/utils.js";

const SECTOR_SIZE = 10; // seconds
const MAX_DATA_SIZE = SECTOR_SIZE * 10;
const UPDATE_DELAY = 1000;

let chart = null;

const create = (parent) => {
    /* ONLY FOR ALPHA VERSION */
    const title = createElement("p", "Title");
    title.textContent = "Number of entities";
    const canvas = createElement("canvas");
    const container = createElement("div");
    container.append(
        title,
        canvas
    );
    parent.append(container);

    // TODO improve by getting data from loop of available entities
    const dataset = [
        {
            label: Configuration.Entities.Anorganic.name,
            data: [],
            borderColor: `rgb(${hexToRGB(Configuration.Entities.Anorganic.color)})`,
            fill: false,
            pointStyle: false
        },
        {
            label: Configuration.Entities.Organic.name,
            data: [],
            borderColor: `rgb(${hexToRGB(Configuration.Entities.Organic.color)})`,
            fill: false,
            pointStyle: false
        },
        {
            label: Configuration.Entities.Autotroph.name,
            data: [],
            borderColor: `rgb(${hexToRGB(Configuration.Entities.Autotroph.color)})`,
            fill: false,
            pointStyle: false
        },
        {
            label: Configuration.Entities.Heterotroph.name,
            data: [],
            borderColor: `rgb(${hexToRGB(Configuration.Entities.Heterotroph.color)})`,
            fill: false,
            pointStyle: false
        },
        {
            label: Configuration.Entities.Mixotroph.name,
            data: [],
            borderColor: `rgb(${hexToRGB(Configuration.Entities.Mixotroph.color)})`,
            fill: false,
            pointStyle: false
        }
    ];

    const data = {
        labels: [],
        datasets: dataset
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

    Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);
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
        // TODO refactor -> getting data from looping through available entities
        chart.data.datasets[Configuration.Entities.Anorganic.index].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ANORGANIC).length);
        chart.data.datasets[Configuration.Entities.Organic.index].data.push(Simulation.getResources().filter((resource) => resource.type === Entity.Type.ORGANIC).length);
        chart.data.datasets[Configuration.Entities.Autotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.AUTOTROPH).length);
        chart.data.datasets[Configuration.Entities.Heterotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.HETEROTROPH).length);
        chart.data.datasets[Configuration.Entities.Mixotroph.index].data.push(Simulation.getAgents().filter((agent) => agent.type === Entity.Type.MIXOTROPH).length);

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
