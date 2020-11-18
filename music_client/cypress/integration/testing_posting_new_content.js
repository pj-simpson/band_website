describe("Testing the navbars", function () {
  it("Authenticated user can post new content", function () {
    //log in
    cy.visit("/login");

    cy.get('input[name="username"]').type("test_user");
    cy.get('input[name="password"]').type("qwerty99%", { log: false });
    cy.get("form").submit();
    cy.wait(500);

    //Homepage update

    cy.get('a[class="nav-link"]').contains("Homepage Update").click();

    cy.get('input[name="image"]').attachFile("images/test_image.jpg");

    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("img")
      .should("have.attr", "src")
      .should("include", "http://localhost:8000/media/home_images/test_image");

    // Discography Update

    cy.get('a[class="nav-link"]').contains("Discography Update").click();

    cy.get('input[name="title"]').type("Testing Release Title");
    cy.get('input[name="label"]').type("A record label name");
    cy.get('select[name="format"]').select("DL");
    cy.get('input[name="bandcamp_link"]').type("http://fakelink.com/example");
    cy.get('input[name="soundcloud_link"]').type("http://fakelink.com/example");
    cy.get('input[name="spotify_link"]').type("http://fakelink.com/example");
    cy.get('input[name="buy_link"]').type("http://fakelink.com/example");
    cy.get('textarea[name="press_release"]').type(
      "A Press Release, release, release, release. etc ,etc ,etc"
    );
    cy.get('select[name="project"]').select("1");
    cy.get('input[name="recorded"]').type("Recording Engineer");
    cy.get('input[name="mastered"]').type("Mastering Engineer");
    cy.get('input[name="design"]').type("Designer");
    cy.get('input[name="image"]').attachFile("images/test_image.jpg");
    cy.get('input[name="release_date"]').type("2020-07-03");

    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/discog");
    cy.get("h2").contains("Testing Release Title");

    // News Update

    cy.get('a[class="nav-link"]').contains("News Update").click();

    cy.get('input[name="headline"]').type("Testing Headline");
    cy.get('textarea[name="body"]').type(
      "Testing body. Blah blah blah blah blah blah blah blah blah"
    );
    cy.get('input[name="link"]').type("http://fakelink.com/example");
    cy.get('input[name="linktitle"]').type("This is the link");
    cy.get('input[name="image"]').attachFile("images/test_image.jpg");
    cy.get('select[name="project"]').select("1");

    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/news");
    cy.get("h2").contains("Testing Headline");

    // Connect Links Update

    cy.get('a[class="nav-link"]').contains("Links Update").click();

    cy.get('input[name="link"]').type("http://fakelink.com/example");
    cy.get('input[name="linktitle"]').type("Testing Connect Links");
    cy.get('select[name="category"]').select("Mix");

    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/connect");
    cy.get("a").contains("Testing Connect Links");

    //Biog Update

    cy.get('a[class="nav-link"]').contains("Biog Update").click();
    cy.get(
      'div[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]'
    ).type("Blah Blah Blah Blah");

    cy.get('button[class="item-button btn btn-primary"]')
      .contains("Submit")
      .click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/biog");
    cy.get('div[class="col-auto"').contains("Blah Blah Blah Blah");

    //Image Update

    cy.get('a[class="dropdown-toggle nav-link"]')
      .contains("Image Management")
      .click();
    cy.get('a[class="nav-link"]').contains("Images Update").click();
    cy.get('input[name="image"]').attachFile("images/test_image.jpg");
    cy.get('input[name="height"]').type("1");
    cy.get('input[name="width"]').type("1");

    cy.get('button[class="btn btn-primary"]').contains("Submit").click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:3000/images");
    cy.get("div img")
      .last()
      .should("have.attr", "src")
      .should(
        "include",
        "http://localhost:8000/media/image_gallery_images/test_image"
      );
  });
});
