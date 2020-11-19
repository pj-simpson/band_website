import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Media, Spinner } from "reactstrap";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const getHomeImage = () => {
    axios.get("latesthomeimage/").then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getHomeImage();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light"/>
      ) : (
        <div>
          <Col xs="auto" md={{ offset: 4 }}>
            <Media
              className="home-image"
              middle
              object
              src={data.image}
            ></Media>
          </Col>
        </div>
      )}
    </div>
  );
}

export default Home;
