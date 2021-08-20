describe("SpiderSolitaire.vue", () => {
  it("is the caption Reversed Spider Solitaire when the page loads?", () => {
    cy.visit("http://localhost:8080/");

    cy.contains("h1", "Reversed Spider Solitaire");
  });

  it("is there a custom-button class on the page when the page loads?", () => {
    cy.get(".custom-button").should("be.exist");
  });

  it("is there a score-table class on the page when the page loads?", () => {
    cy.visit("http://localhost:8080/");

    cy.get(".score-table").should("be.exist");
  });

  it("is there a timer class on the page when the page loads?", () => {
    cy.visit("http://localhost:8080/");

    cy.get(".timer").should("be.exist");
  });

  it("does the custom-button class contain New Game on page load?", () => {
    cy.visit("http://localhost:8080/");

    cy.contains(".custom-button", "New Game ");
  });

  it("does the score-table class contain '0' on page load?", () => {
    cy.visit("http://localhost:8080/");

    cy.contains(".score-table", "0");
  });

  it("does the timer class contain '00:00:00' on page load?", () => {
    cy.visit("http://localhost:8080/");

    cy.contains(".timer", "00:00:00");
  });

  it("does the page reload when clicking on the New Game class and clicking confirm-btn-yes class?", () => {
    cy.visit("http://localhost:8080/");
    cy.window().then((w) => (w.beforeReload = true));
    cy.window().should("have.prop", "beforeReload", true);
    cy.get(".custom-button").click({ multiple: true });
    cy.get(".confirm-btn-yes").click({ multiple: true });

    cy.window().should("not.have.prop", "beforeReload");
  });

  it("does the page not reload when clicking on the New Game class and clicking confirm-btn-no class?", () => {
    cy.visit("http://localhost:8080/");
    cy.window().then((w) => (w.beforeReload = true));
    cy.window().should("have.prop", "beforeReload", true);
    cy.get(".custom-button").click({ multiple: true });
    cy.get(".confirm-btn-no").click({ multiple: true });

    cy.window().should("have.prop", "beforeReload");
  });

  it("is there a card-distribute class on the page when the page loads?", () => {
    cy.visit("http://localhost:8080/");

    cy.get(".card-distribute").should("be.exist");
  });

  it("does card-distribute class disappear when you click it five times?", () => {
    cy.visit("http://localhost:8080/");

    cy.get(".card-distribute").click();
    cy.get(".card-distribute").click();
    cy.get(".card-distribute").click();
    cy.get(".card-distribute").click();
    cy.get(".card-distribute").click();

    cy.get(".card-distribute").should("not.exist");
  });
});
