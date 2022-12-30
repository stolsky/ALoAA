const create = (tagName, className) => {
    let component = null;
    if (typeof tagName === "string") {
        component = document.createElement(tagName);
        if (typeof className === "string") {
            className.split(" ").forEach((name) => component.classList.add(name));
        }
    }
    return component;
};

const activeClassName = "Active";
const activate = (element) => element.classList.add(activeClassName);
const deactivate = (element) => element.classList.remove(activeClassName);
const deactivateSiblings = (element) => {
    [...element.parentNode.children].filter((child) => child !== element).forEach((sibling) => deactivate(sibling));
};
const selectMenuItem = (element) => {
    if (element instanceof HTMLElement && !element.classList.contains(activeClassName)) {
        activate(element);
        deactivateSiblings(element);
    }
};

export {
    create,
    selectMenuItem
};
