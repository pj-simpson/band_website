import React, { useState } from "react";
import { Alert, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";

function DiscogEditForm({ item, toggle, updater }) {
  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const [errors, captureErrors] = useState("");

  function onSubmit(data, event) {
    event.preventDefault();
    const formData = new FormData();
    const item_id = item.id;
    const new_format = data.format.toString().split(',')

    if (data.title !== "") {
      formData.append("title", data.title);
    }
    if (data.label !== "") {
      formData.append("label", data.label);
    }
    if (new_format[0] !== "") {
      formData.append("format[]", new_format);
    }
    if (data.bandcamp_link !== "") {
      formData.append("bandcamp_link", data.bandcamp_link);
    }
    if (data.soundcloud_link !== "") {
      formData.append("soundcloud_link", data.soundcloud_link);
    }
    if (data.spotify_link !== "") {
      formData.append("spotify_link", data.spotify_link);
    }
    if (data.buy_link !== "") {
      formData.append("buy_link", data.buy_link);
    }
    if (data.press_release !== "") {
      formData.append("press_release", data.press_release);
    }
    if (data.recorded !== "") {
      formData.append("recorded", data.recorded);
    }
    if (data.mastered !== "") {
      formData.append("mastered", data.mastered);
    }
    if (data.design !== "") {
      formData.append("design", data.design);
    }
    if (data["image"][0]) {
      formData.append("image", data["image"][0]);
    }
    formData.append("project", data.project);

    var fieldcounter = 0;
    for (var pair of formData.entries()) {
      fieldcounter += 1;
    }

    if (fieldcounter < 13) {
      axios
        .patch(`releases/${item_id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getAccessToken(),
          },
        })
        .then(function (response) {
          toggle();
          updater();
        })
        .catch((err) => {
          if (err.response) {
            captureErrors(err.response.statusText);
          }
          setIsError(true);
        });
    } else {
      axios
        .put(`releases/${item_id}/`, formData, {
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
          <label>Title:</label>
          <input
            type="text"
            ref={register}
            name="title"
            className="form-control"
            placeholder={item.title}
          />
        </div>

        <div className="form-group">
          <label>Label:</label>
          <input
            type="text"
            ref={register}
            name="label"
            className="form-control"
            placeholder={item.label}
          />
        </div>

        <div className="form-group">
          <label>Format:</label>
          <select
            multiple
            ref={register}
            name="format"
            className="form-control"
          >
            <option value="DL">DL</option>
            <option value="LP">LP</option>
            <option value="CS">CS</option>
            <option value="CD">CD</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bandcamp:</label>
          <input
            type="url"
            ref={register}
            name="bandcamp_link"
            className="form-control"
            placeholder={item.bandcamp_link}
          />
        </div>

        <div className="form-group">
          <label>Soundcloud:</label>
          <input
            type="url"
            ref={register}
            name="soundcloud_link"
            className="form-control"
            placeholder={item.soundcloud_link}
          />
        </div>

        <div className="form-group">
          <label>Spotify:</label>
          <input
            type="url"
            ref={register}
            name="spotify_link"
            className="form-control"
            placeholder={item.spotify_link}
          />
        </div>

        <div className="form-group">
          <label>Buy Physical:</label>
          <input
            type="url"
            ref={register}
            name="buy_link"
            className="form-control"
            placeholder={item.buy_link}
          />
        </div>

        <div className="form-group">
          <label>Press Release:</label>
          <textarea
            ref={register}
            name="press_release"
            className="form-control"
            placeholder={item.press_release}
          />
        </div>

        <div className="form-group">
          <label>Project:</label>
          <select ref={register} name="project" className="form-control">
            <option value="1">ELS</option>
          </select>
        </div>

        <div className="form-group">
          <label>Recorded by:</label>
          <input
            type="text"
            ref={register}
            name="recorded"
            className="form-control"
            placeholder={item.recorded}
          />
        </div>

        <div className="form-group">
          <label>Mastered By:</label>
          <input
            type="text"
            ref={register}
            name="mastered"
            className="form-control"
            placeholder={item.mastered}
          />
        </div>

        <div className="form-group">
          <label>Design By:</label>
          <input
            type="text"
            ref={register}
            name="design"
            className="form-control"
            placeholder={item.design}
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

        <Button color="primary" type="submit">
          Submit
        </Button>
          {' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default DiscogEditForm;
