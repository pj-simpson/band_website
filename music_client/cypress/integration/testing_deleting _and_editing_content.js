describe("Testing the navbars", function () {
  it("Authenticated user can edit and delete content", function () {
    //log in
    cy.visit("/login");

    cy.get('input[name="username"]').type("test_user");
    cy.get('input[name="password"]').type("qwerty99%", { log: false });
    cy.get("form").submit();
    cy.wait(500);

    //Edit News Item
    cy.visit("/news");
    cy.get('button[class="item-button btn btn-info"]').contains("Edit").click();
    cy.get('input[name="headline"]').type("Editing This Headline");
    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.reload();
    cy.get("h2").contains("Editing This Headline");

    //Delete News Item
    //we are grabbing the ID of the first element, deleting it and then checking that the subsequent first element, now
    // no longer has that first id

    //cy.get returns a jquery object to .then... we then have to call .get(0).id in order to access the id property... fiddly :)

    cy.get('div[class="news-card justify-content-around col-md"]')
      .first()
      .then(($newsDiv) => {
        const newsDivId = $newsDiv.get(0).id;

        cy.get('button[class="item-button btn btn-danger"]')
          .contains("Delete")
          .click();
        cy.reload();

        cy.get('div[class="news-card justify-content-around col-md"]')
          .first()
          .then(($newNewsDiv, a = newsDivId) => {


            const secondNewsDiv = $newNewsDiv.get(0).id;

            expect(secondNewsDiv).to.not.eq(a);
          });
      });

    //Edit Release
    cy.visit("/discog");
    cy.get('button[class="item-button btn btn-info"]').contains("Edit").click();
    cy.get('input[name="title"]').type("Editing The Title of this release");
    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    // cy.reload();
    cy.get("h2").contains("Editing The Title of this release");

    //Delete Release
    //we are grabbing the ID of the first element, deleting it and then checking that the first element, no longer has that id

    // cy.get('div[class="news-card"]').first().its('id').then(($releasecard) => {
    //     cy.log($releasecard)
    //
    //       cy.get('button[class="item-button btn btn-danger"]').contains('Delete').click();
    //
    //       cy.get('div[class="news-card"]').first().should('not.eq',$releasecard);
    //
    // });

    //Delete Connect Link
    //we are grabbing the ID of the first element, deleting it and then checking that the first element, no longer has that id

    // cy.visit('/connect');
    //
    // cy.get('tr').first().its('id').then(($conntectRow) => {
    //
    //       cy.get('button[class="item-button btn btn-danger btn-sm"]').contains('x').click();
    //
    //       cy.get('tr').first().should('not.eq',$conntectRow);
    //
    // });

    //Resize Image
    // cy.visit('/imagesedit');

    //Delete Image
  });
});
