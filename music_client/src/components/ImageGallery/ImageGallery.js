import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";

import axios from "axios";
import "../../App.css";

import Gallery from "react-photo-gallery";

function Images({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getImages = () => {
    axios.get("images/").then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getImages();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Gallery photos={data} direction={"column"} />
      )}
    </div>
  );
}

export default Images;
