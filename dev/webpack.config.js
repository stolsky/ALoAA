import path from "path";

const DIRNAME = path.dirname(new URL(import.meta.url).pathname);

export default () => ({
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        clean: true,
        path: path.join(DIRNAME, "../", "dist"),
        filename: "[name].bundle.js"
    },
    devServer: {
        static: path.join(DIRNAME, "../", "dist"),
        compress: true,
        port: 4000
    }
});
