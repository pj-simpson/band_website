describe("Testing Logging in and out", () => {
  it("Can log in and then back out again.", function () {
    cy.visit("/login");

    cy.get('input[name="username"]').type("test_user");
    cy.get('input[name="password"]').type("qwerty99%", { log: false });
    cy.get("form").submit();

    // cannot visit login page if logged in
    cy.wait(500);
    cy.visit("/login");
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/");

    cy.get('button[class="logout-button btn btn-primary"]');
    cy.get('button[class="logout-button btn btn-primary"]').click();
    cy.get('button[class="logout-button btn btn-primary"]').should("not.exist");
  });
});
