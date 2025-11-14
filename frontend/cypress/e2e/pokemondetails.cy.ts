describe("Pokedex Listing tests", () => {
  it("Logs in and sees a list of pokemonss", () => {
    cy.visit("/").waitForRouteChange();

    cy.get('input[type="text"]').type("admin");
    cy.get('input[type="password"]').type("admin");

    cy.findByText(/Log In/i).click();

    cy.findByTestId("pokemon-card-1").click();
    cy.get('[data-testid="pokemon-details-name"]').should(
      "have.text",
      "Bulbasaur"
    );
    cy.get('[data-testid="pokemon-details-id"]').should("have.text", "#001");
  });
});
