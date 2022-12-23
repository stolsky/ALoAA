import path from "path";

const DIRNAME = path.dirname(new URL(import.meta.url).pathname);

export default () => ({
    mode: "production",
    entry: "./src/index.js",
    output: {
        clean: true,
        path: path.join(DIRNAME, "../", "dist"),
        filename: "[name].bundle.js"
    }
});
