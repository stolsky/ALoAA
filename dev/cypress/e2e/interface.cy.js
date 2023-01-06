
describe("Test website functionality", () => {

    beforeEach(() => {
        cy.visit("dev/");
        // cy.window()
    });

    describe("Website access (E1.1)", () => {

        it("Access Website on development server", () => {
            // cy.window()
        });

    });

    describe("Well-organized user interface (E2.1)", () => {

        describe("Existence of all containers", () => {
            /** Container description:
             * Renderer: Output for Simulation
             * Controls: access to time control over the simulation
             * Menu: access to configurations during the simulation
             * Panels: contains all panels that display various information about the simulation
             */
            it("Contains the folowing container: Renderer, Controls, Menu & Panels", () => {
                cy.get(".Renderer")
                    .should("be.visible")
                    .get(".Controls")
                    .should("be.visible")
                    .get(".Menu")
                    .should("be.visible")
                    .get(".PanelGroup")
                    .should("be.visible");
            });

        });

        describe("Test buttons and its functionalities", () => {

            it("Check play and pause button from controls exist", () => {
                cy.get(".Controls").within(() => {
                    cy.get("button.Icon.Play")
                        .as("buttonPlay")
                        .should("be.visible");
                    cy.get("button.Icon.icon-pause2")
                        .as("buttonPause")
                        .should("not.be.visible");
                    cy.get("span.TimePassed")
                        .as("outputTimePassed")
                        .should("be.visible");
                });

                cy.get("@buttonPlay").click().should("not.be.visible");
                cy.get("@buttonPause").should("be.visible");

                // TODO check that passed time gets bigger
                // cy.get("@outputTimePassed").

            });

            it("Test fast forward and slow down buttons", () => {
                cy.get(".Controls").within(() => {
                    cy.get("button.Icon.icon-backward2")
                        .as("buttonSlowDown")
                        .should("be.visible");
                    cy.get("button.Icon.icon-forward3")
                        .as("buttonForward")
                        .should("be.visible");
                    cy.get("span.SpeedFactor")
                        .as("outputSpeedFactor")
                        .should("be.visible");
                    cy.get("span.TimePassed")
                        .as("outputTimePassed")
                        .should("be.visible");
                });

                // TODO add tests that fast forward and slow down work
            });

            // disabled in this version
            it.skip("Test finish simulation button", () => {
                cy.get(".Controls").within(() => {
                    cy.get("button.Icon.Finish")
                        .as("buttonFinish")
                        .should("be.visible");
                });

            });

            it("Check that all menu buttons exist", () => {
                cy.get(".Menu").within(() => {
                    cy.get("button.Icon.icon-stats-bars")
                        .as("buttonCharts")
                        .should("be.visible");
                    cy.get("button.Icon.icon-equalizer")
                        .as("buttonOptions")
                        .should("be.visible");
                    cy.get("button.Icon.icon-target")
                        .as("buttonFollow")
                        .should("be.visible");
                });
            });

            it("Check that all panels (4) of menu items exist", () => {
                cy.get(".PanelGroup").within(() => {
                    cy.get("div.Panel").should("have.length", 4);
                });
            });

            it("Check that all menu buttons show its corresponding panel (and hide others)", () => {
                cy.get(".Menu").within(() => {
                    // declare aliases of all elements used for the tests
                    cy.get("button.Icon.icon-stats-bars").as("buttonCharts");
                    cy.get("button.Icon.icon-target").as("buttonFollow");
                    cy.get("button.Icon.icon-equalizer").as("buttonOptions");
                    cy.get("button.Icon.icon-info").as("buttonHelp");
                });
            });

            it("Check that menu button options opens its panel and behaves correctly", () => {
                cy.get(".Menu").within(() => {
                    // initial state
                    cy.get("button.Icon.icon-stats-bars").as("buttonCharts")
                        .should("have.class", "Active");
                    cy.get("button.Icon.icon-equalizer").as("buttonOptions")
                        .should("not.have.class", "Active");
                });

                cy.get("@buttonOptions").click().should("have.class", "Active");
                // TODO how to check active panels switched -> different classes
                cy.get("@buttonCharts").should("not.have.class", "Active");
            });

        });

    });

    describe("Test Pixi.js integration", () => {

        it("Existence of canvas element inside Renderer container", () => {
            cy.get(".Renderer")
                .find("canvas")
                .should("be.visible");
        });

        it("Check for PIXI library presence", () => {
            cy.visit("dev").then((win) => {
                expect(win).to.have.property("PIXI");
            });
        });

    });

});
