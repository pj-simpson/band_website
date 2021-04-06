import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Col } from "reactstrap";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";
import { Redirect } from "react-router-dom";

function ImageGalleryUpdate() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  function onSubmit(data, event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("src", data["image"][0]);
    formData.append("height", data.height);
    formData.append("width", data.width);
    formData.append("credit", data.credit);

    axios
      .post("images/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAccessToken(),
        },
      })
      .then(setSubmitted(true))
      .catch((err) => {
        if (err.response) {
          captureErrors(err.response.statusText);
        }
        setIsError(true);
      });
  }

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: "/images",
        }}
      />
    );
  }

  return (
    <Fragment>
      <Col sm="7" md={{ size: 6, offset: 3 }}>
        {isError && (
          <Alert color="danger">
            Error!
            {errors}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Image:</label>

            <input
              type="file"
              ref={register}
              name="image"
              className="form-control-file"
            />
          </div>

          <div className="form-group">
            <label>Height:</label>

            <input
              type="number"
              ref={register}
              name="height"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Width:</label>

            <input
              type="number"
              ref={register}
              name="width"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Credit:</label>

            <input
              type="string"
              ref={register}
              name="credit"
              className="form-control"
            />
          </div>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Col>
    </Fragment>
  );
}

export default ImageGalleryUpdate;
