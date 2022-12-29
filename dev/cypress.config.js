import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "1a9v18",
    e2e: {
        supportFile: false,
        baseUrl: "http://localhost:5501",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    }
});
