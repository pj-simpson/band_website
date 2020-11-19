import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Col } from "reactstrap";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";
import { Redirect } from "react-router-dom";

function ConnectUpdate() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  function onSubmit(data, event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("category", data.category);
    formData.append("link", data.link);
    formData.append("link_title", data.linktitle);

    axios
      .post("connections/", formData, {
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
          pathname: "/connect",
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
            <label>Link:</label>
            <input type="url" ref={register} name="link" className="form-control" />
          </div>

          <div className="form-group">
            <label>Link title:</label>
            <input
              type="text"
              ref={register}
              name="linktitle"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              multiple
              ref={register}
              name="category"
              className="form-control"
            >
              <option value="Platform">Platform</option>
              <option value="Mix">Mix</option>
              <option value="Press">Press</option>
              <option value="Project">Project</option>
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

export default ConnectUpdate;
