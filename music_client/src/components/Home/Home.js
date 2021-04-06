import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Spinner } from "reactstrap";
import renderHTML from "react-render-html";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

function Home() {

  return (
    <div>
      <div className="row justify-content-center home-container">
        <Container>
          <Row>
            <Col>
              <img
                alt="ELS"
                src="https://peter-apps-bucket.s3.eu-west-2.amazonaws.com/media/home_images/IMG_2636.jpg"
              />
            </Col>

            <Col>
              <div className="soundcloud-iframe">
                <iframe
                  width="100%"
                  height="425"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/820474852&color=%23131415&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div class="soundcloud-frame-inner">
                  <a
                    href="https://soundcloud.com/editionsmego"
                    title="Editions Mego"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    Editions Mego
                  </a>{" "}
                  ·
                  <a
                    href="https://soundcloud.com/editionsmego/cucina-povera-els-marmori-emego-284"
                    title="Cucina Povera &amp; ELS &#x27;Marmori&#x27; (EMEGO284)"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    Cucina Povera &amp; ELS &#x27;Marmori&#x27; (EMEGO 284)
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
