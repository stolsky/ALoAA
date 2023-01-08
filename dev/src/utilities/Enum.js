
/** Creates an Enum-like Object from an array of strings that act as its members.
 *
 * The names of these members must only consist of the characters from the basic Latin alphabet, including the underscore. ([A-Za-z0-9_])
 *
 * @param {string[]} symbols
 *
 * @throws Error if not allowed characters were used
 *
 * @returns the Enum-like object with the method `has(name:string) -> boolean` to check if a parameter is a member of that object
 */
const createEnum = (...symbols) => {

    // matches if the whole word consists only of latin alphabet (a-z, A-Z, 0-9) and underscore
    const pattern = /^\w+$/;

    const props = {};
    if (Array.isArray(symbols)) {
        symbols.forEach((key) => {
            if (pattern.test(`${key}`)) {
                props[`${key}`] = Symbol(`${key}`);
            } else {
                throw Error(`${key} contains a character that is not allowed.`);
            }
        });
    }

    /** A method to check if a given name is part of the Enum-like object
     *
     * @param {string} name
     *
     * @returns true if the name is a member of the Enum-like object, false otherwise
     */
    props.has = (name) => Object.values(props).includes(name);

    return Object.freeze({ ...props });
};

export default createEnum;
