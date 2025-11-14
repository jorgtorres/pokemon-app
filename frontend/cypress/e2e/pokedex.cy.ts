describe("Pokedex Listing tests", () => {
  it("Logs in and sees a list of pokemonss", () => {
    cy.visit("/").waitForRouteChange();

    cy.get('input[type="text"]').type("admin");
    cy.get('input[type="password"]').type("admin");

    cy.findByText(/Log In/i).click();

    cy.get('[data-testid^="pokemon-card-name"]').should(
      "have.lengthOf.at.most",
      50
    );
  });
});
