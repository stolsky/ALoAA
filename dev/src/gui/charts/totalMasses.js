/* globals Chart */

import { Anorganic, Organic, Autotroph, Heterotroph, Mixotroph, ChartSettings } from "./dataTypes.js";
import createElement from "../utilities/create.js";
import Entity from "../../simulation/core/Entity.js";
import Simulation from "../../simulation/Simulation.js";
import { ClassType } from "../../simulation/core/Types.js";

let chart = null;

const create = (parent) => {
    const canvas = createElement("canvas");
    parent.appendChild(canvas);

    const initialData = [
        { label: "Total Mass", value: 0 },
        { label: Anorganic.label, value: 0 },
        { label: Organic.label, value: 0 },
        { label: Autotroph.label, value: 0 },
        { label: Heterotroph.label, value: 0 },
        { label: Mixotroph.label, value: 0 }
    ];

    const data = {
        labels: initialData.map((row) => row.label),
        datasets: [{
            label: null,
            data: initialData.map((row) => row.value),
            backgroundColor: [
                "#FFFFFF",
                Anorganic.color,
                Organic.color,
                Autotroph.color,
                Heterotroph.color,
                Mixotroph.color
            ]
        }]
    };

    const options = {
        scales: {
            x: { display: false },
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
            tooltip: { displayColors: false },
            legend: { display: false }
        }
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

const calculateMass = (source, type) => source
    .filter((entity) => entity.type === type)
    .reduce((acc, entity) => {
        const { Mass, Stomach, Rectum } = entity.genes;
        let sum = acc + Mass.getValue();
        if (entity.constructor.ClassType === ClassType.AGENT) {
            sum = sum + Stomach.getValue() + Rectum.getValue();
        }
        return sum;
    }, 0);

let updateCounter = 1001;
const update = (deltaTime) => {

    if (updateCounter > 1000) {

        const { ANORGANIC, ORGANIC, AUTOTROPH, HETEROTROPH, MIXOTROPH } = Entity.Type;

        const resources = Simulation.getResources();
        const agents = Simulation.getAgents();

        const anorganicMass = calculateMass(resources, ANORGANIC);
        const organicMass = calculateMass(resources, ORGANIC);
        const autotrophMass = calculateMass(agents, AUTOTROPH);
        const heterotrophMass = calculateMass(agents, HETEROTROPH);
        const mixotrophMass = calculateMass(agents, MIXOTROPH);
        const totalMass = anorganicMass + organicMass + autotrophMass + heterotrophMass + mixotrophMass;

        const source = [
            totalMass,
            anorganicMass,
            organicMass,
            autotrophMass,
            heterotrophMass,
            mixotrophMass
        ];

        chart.data.datasets[0].data = source.map((row) => row);
        chart.update("none");
        updateCounter = 0;
    }
    updateCounter = updateCounter + deltaTime;
};

export default update;
export { create };
