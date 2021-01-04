import React, { useEffect, useState } from "react";
import axios from "axios";
import {Col, Spinner} from "reactstrap";
import renderHTML from "react-render-html";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

    const getBiography = () => {
        axios.get("latestbiog/").then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
      };

      useEffect(() => {
        getBiography();
      }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light"/>
      ) : (
        <div className="row justify-content-center home-container">
            <Col xs="auto">
              {renderHTML(data.biography)}
          </Col>
          <Col xs="auto">
              <img alt="ELS" src="https://peter-apps-bucket.s3.eu-west-2.amazonaws.com/media/home_images/IMG_2636.jpg"/>
          </Col>
        </div>
      )}
    </div>
  );
}

export default Home;
