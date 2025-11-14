describe("Login tests", () => {
  it("Visits the index page and logs in", () => {
    cy.visit("/").waitForRouteChange();

    cy.get('input[type="text"]').type("admin");
    cy.get('input[type="password"]').type("admin");

    cy.findByText(/Log In/i).click();
    cy.contains("button", "Logout").should("be.visible");
  });
});
