/** Convenient method to create an html element.
 *
 * Note: Only valid html tags are allowed.
 *
 * @param {string} tagName
 * @param {string} className
 *
 * @returns {HTMLElement}
 */
const create = (tagName, className) => {
    let component = null;
    if (typeof tagName === "string") {
        component = document.createElement(tagName);
        // TODO how to avoid instanceof here?
        if (component instanceof HTMLUnknownElement) {
            return null;
        }
        if (typeof className === "string" && className.length > 0) {
            className.split(" ").forEach((name) => component.classList.add(name));
        }
    }
    return component;
};

export default create;
