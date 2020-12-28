import React, { useEffect, useState } from "react";
import axios from "axios";
import {Col, Media, Row, Spinner} from "reactstrap";
import renderHTML from "react-render-html";
import home_image from './Home_Image.jpg';

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
        <div className="row justify-content-center">
            <Col xs="auto">
              {renderHTML(data.biography)}
          </Col>
          <Col xs="auto">
              <img src={home_image}/>
          </Col>
        </div>
      )}
    </div>
  );
}

export default Home;
