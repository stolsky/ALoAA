import createElement from "../utilities/create.js";

const observedType = createElement("p", "Type");
const observedGenes = createElement("div", "Genes");

const panelObserver = createElement("div", "Panel");
panelObserver.append(observedType, observedGenes);

const close = () => {
    console.log("close");
};

const getInstance = () => panelObserver;

const open = (symbol, data) => {
    console.log(symbol, data);
};

const update = (type, genes) => {
    if (panelObserver.classList.contains("Active")) {
        console.log(type, genes);
    }
};

export {
    close,
    getInstance,
    open,
    update
};
