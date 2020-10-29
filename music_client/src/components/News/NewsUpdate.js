import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Col } from "reactstrap";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";
import { Redirect } from "react-router-dom";

function NewsUpdate() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  function onSubmit(data, event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", data["image"][0]);
    formData.append("headline", data.headline);
    formData.append("body", data.body);
    formData.append("link", data.link);
    formData.append("link_title", data.linktitle);

    axios
      .post("news/", formData, {
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
          pathname: "/news",
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
          <div class="form-group">
            <label>Headline:</label>
            <input
              type="text"
              ref={register}
              name="headline"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="body">Body:</label>
            <textarea ref={register} name="body" class="form-control" />
          </div>

          <div class="form-group">
            <label>Link:</label>
            <input type="url" ref={register} name="link" class="form-control" />
          </div>

          <div class="form-group">
            <label>Link title:</label>
            <input
              type="text"
              ref={register}
              name="linktitle"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Image:</label>

            <input
              type="file"
              ref={register}
              name="image"
              class="form-control-file"
            />
          </div>

          <div class="form-group">
            <label>Project:</label>

            <select ref={register} name="project" class="form-control">
              <option value="1">ELS</option>
            </select>
          </div>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Col>
    </Fragment>
  );
}

export default NewsUpdate;

// Read this: https://www.robinwieruch.de/react-hooks-fetch-data
