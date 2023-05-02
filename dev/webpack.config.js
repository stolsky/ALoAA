import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const DIRNAME = path.dirname(new URL(import.meta.url).pathname);

export default () => ({
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node-modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ALoAA"
        }),
        new MiniCssExtractPlugin()
    ]
});
