import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";

function NewsEditForm({ item, updater, toggle }) {
  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  function onSubmit(data, event) {
    event.preventDefault();
    const formData = new FormData();
    const item_id = item.id;

    if (data.headline !== "") {
      formData.append("headline", data.headline);
    }
    if (data.body !== "") {
      formData.append("body", data.body);
    }
    if (data.link !== "") {
      formData.append("link", data.link);
    }
    if (data.linktitle !== "") {
      formData.append("link_title", data.linktitle);
    }
    if (data["image"][0]) {
      formData.append("image", data["image"][0]);
    }

    var fieldcounter = 0;
    for (var pair of formData.entries()) {
      fieldcounter += 1;
    }

    if (fieldcounter < 6) {
      axios
        .patch(`news/${item_id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getAccessToken(),
          },
        })
        .then(function (response) {
          toggle();
          updater(event);
        })
        .catch((err) => {
          if (err.response) {
            captureErrors(err.response.statusText);
          }
          setIsError(true);
        });
    } else {
      axios
        .put(`news/${item_id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getAccessToken(),
          },
        })
        .then(function (response) {
          toggle();
          updater();
        });
    }
  }

  return (
    <div>
      {isError && (
        <Alert color="danger">
          Error!
          {errors}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Headline:</label>
          <input
            type="text"
            ref={register}
            name="headline"
            className="form-control"
            placeholder={item.headline}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            ref={register}
            name="body"
            className="form-control"
            placeholder={item.body}
          />
        </div>
        <div className="form-group">
          <label>Link:</label>
          <input
            type="url"
            ref={register}
            name="link"
            className="form-control"
            placeholder={item.link}
          />
        </div>
        <div className="form-group">
          <label>Link title:</label>
          <input
            type="text"
            ref={register}
            name="linktitle"
            className="form-control"
            placeholder={item.link_title}
          />
        </div>
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
          <label>Project:</label>

          <select ref={register} name="project" className="form-control">
            <option value="1">ELS</option>
          </select>
        </div>
        <Button color="primary" type="submit">
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default NewsEditForm;
