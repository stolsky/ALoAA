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

export {
    create
};
