describe("Testing the navbars", function () {
  it("Non-authenticated user can visit each page from navbar", function () {
    // begin at homepage
    cy.visit("");
    cy.get('img[class="home-image media-middle media-object"]');
    cy.url().should("eq", "http://localhost:3000/");

    // proceed to news

    cy.get('a[class="nav-link"]').contains("News").click();
    cy.url().should("eq", "http://localhost:3000/news");
    cy.get('div[class="news-card"]');

    // proceed to discography

    cy.get('a[class="nav-link"]').contains("Discography").click();
    cy.url().should("eq", "http://localhost:3000/discog");
    cy.get('div[class="news-card"]');

    // // proceed to biography

    cy.get('a[class="nav-link"]').contains("Biog").click();
    cy.url().should("eq", "http://localhost:3000/biog");
    cy.get('div[class="col-auto"]');

    // proceed to images

    cy.get('a[class="nav-link"]').contains("Images").click();
    cy.url().should("eq", "http://localhost:3000/images");
    cy.wait(500);
    cy.get('div[class="react-photo-gallery--gallery"]');

    // proceed to connect

    cy.get('a[class="nav-link"]').contains("Connect").click();
    cy.url().should("eq", "http://localhost:3000/connect");
    cy.get(
      'div[class="justify-content-around connect-table-row row row-cols-sm-4"]'
    );
  });

  it("Authenticated user can visit each page from admin sub-navbar", function () {
    //log in
    cy.visit("/login");

    cy.get('input[name="username"]').type("test_user");
    cy.get('input[name="password"]').type("qwerty99%", { log: false });
    cy.get("form").submit();
    cy.wait(500);

    //Homepage update

    cy.get('a[class="nav-link"]').contains("Homepage Update").click();
    cy.url().should("eq", "http://localhost:3000/homepageupdate");
    cy.get('input[name="image"]');

    //Discography update

    cy.get('a[class="nav-link"]').contains("Discography Update").click();
    cy.url().should("eq", "http://localhost:3000/releaseupdate");
    cy.get('input[name="title"]');

    //News update

    cy.get('a[class="nav-link"]').contains("News Update").click();
    cy.url().should("eq", "http://localhost:3000/newsupdate");
    cy.get('input[name="headline"]');

    //Links update

    cy.get('a[class="nav-link"]').contains("Links Update").click();
    cy.url().should("eq", "http://localhost:3000/connectupdate");
    cy.get('input[name="link"]');

    //Image Management
    cy.get('a[class="dropdown-toggle nav-link"]')
      .contains("Image Management")
      .click();
    cy.get('a[class="nav-link"]').contains("Images Update").click();
    cy.get('input[name="height"]');

    cy.get('a[class="dropdown-toggle nav-link"]')
      .contains("Image Management")
      .click();
    cy.get('a[class="nav-link"]').contains("Images Edit").click();
    cy.get('table[class="table"]');

    //Biog update

    cy.get('a[class="nav-link"]').contains("Biog Update").click();
    cy.url().should("eq", "http://localhost:3000/biogupdate");
    cy.get('div[class="demo-wrapper rdw-editor-wrapper"]');

    // check the authenticated user can also vist the standard nav - check for elements we only show to admin
    // begin at homepage
    cy.get('a[class="navbar-brand"]').contains("ELS").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get('img[class="home-image media-middle media-object"]');

    // proceed to news

    cy.get('a[class="nav-link"]').contains("News").click();
    cy.url().should("eq", "http://localhost:3000/news");
    cy.get('div[class="card-footer"]');
    cy.get('button[class="item-button btn btn-danger"]');
    cy.get('button[class="item-button btn btn-info"]');

    // proceed to discography

    cy.get('a[class="nav-link"]').contains("Discography").click();
    cy.url().should("eq", "http://localhost:3000/discog");
    cy.get('div[class="card-footer"]');
    cy.get('button[class="item-button btn btn-danger"]');
    cy.get('button[class="item-button btn btn-info"]');

    // // proceed to biography

    cy.get('a[class="nav-link"]').contains("Biog").click();
    cy.url().should("eq", "http://localhost:3000/biog");
    cy.get('div[class="col-auto"]');

    // proceed to images

    cy.get('a[class="nav-link"]').contains("Images").click();
    cy.url().should("eq", "http://localhost:3000/images");
    cy.get('div[class="react-photo-gallery--gallery"]');

    // proceed to connect

    cy.get('a[class="nav-link"]').contains("Connect").click();
    cy.url().should("eq", "http://localhost:3000/connect");
    cy.get(
      'div[class="justify-content-around connect-table-row row row-cols-sm-4"]'
    );
    cy.get('button[class="item-button btn btn-danger btn-sm"]');
  });

  it("Non-authenticated user cannot visit any of the admin pages", function () {
    cy.visit("/homepageupdate");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/releaseupdate");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/newsupdate");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/connectupdate");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/imagesupdate");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/imagesedit");
    cy.url().should("eq", "http://localhost:3000/");

    cy.visit("/biogupdate");
    cy.url().should("eq", "http://localhost:3000/");
  });
});
