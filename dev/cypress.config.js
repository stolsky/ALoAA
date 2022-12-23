import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "1a9v18",
    e2e: {
        baseUrl: "http://localhost:5500",
        setupNodeEvents(on, config) {
        // implement node event listeners here
        }
    }
});
