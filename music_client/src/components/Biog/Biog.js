import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Spinner } from "reactstrap";
import renderHTML from "react-render-html";

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
        <Spinner animation="grow" color="light"/>
      ) : (
        <div>
          <Col xs="auto">{renderHTML(data.biography)}</Col>
        </div>
      )}
    </div>
  );
}

export default Biog;
