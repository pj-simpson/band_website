import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Col, Alert, Button } from "reactstrap";
import axios from "axios";

function LogIn({ loggerIn }) {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  const onSubmit = (data, event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("password", data.password);

    axios
      .post("dj-rest-auth/login/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        window.localStorage.setItem(
          "jwt-auth",
          JSON.stringify(response.data.access_token)
        );
        loggerIn();
        setSubmitted(true);
      })
      .catch((err) => {
        if (err.response) {
          captureErrors(err.response.statusText);
        }
        setIsError(true);
      });
  };

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <Fragment>
      <h2>Log In</h2>

      <Col sm="7" md={{ size: 6, offset: 3 }}>
        {isError && (
          <Alert color="danger">
            Error!
            {errors}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group">
            <label for="username">Username:</label>
            <input
              type="text"
              ref={register}
              name="username"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              ref={register}
              name="password"
              class="form-control"
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

export default LogIn;
