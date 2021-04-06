import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Spinner } from "reactstrap";
import renderHTML from "react-render-html";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

function Biog() {
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
        <Spinner animation="grow" color="light" />
      ) : (
        <div className="row justify-content-center home-container">
          <Col xs="auto">{renderHTML(data.biography)}</Col>
        </div>
      )}
    </div>
  );
}

export default Biog;
