import React, { useEffect, useState, useCallback } from "react";
import { Spinner } from "reactstrap";
import Carousel, { Modal, ModalGateway } from "react-images";

import axios from "axios";
import "../../App.css";
import CustomImage from "./CustomImage";
import Gallery from "react-photo-gallery";

function Images({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { item, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const getImages = () => {
    axios.get("images/").then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getImages();
  }, [isLoading]);

  // const imageRenderer =
  //   ({ photo }) => (
  //     <CustomImage
  //       photo={photo}
  //     />
  //   );
  //   not currently using custom image

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light" />
      ) : (
        <Gallery photos={data} direction={"column"} onClick={openLightbox} />
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={data.map((item) => ({
                ...item,
                srcset: item.src,
                caption: item.credit,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default Images;
