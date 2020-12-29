import React, { useEffect, useState } from "react";
import { Col, Spinner, Button, Table } from "reactstrap";
import { Image } from "react-bootstrap";
import axios from "axios";
import "../../App.css";
import ContentEditable from "./content-editable";

import { getAccessToken } from "../../services/AuthService";

function ImageGalleryEdit({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdating, setisUpdating] = useState(false);

  function listRemover(id) {
    const newList = data.filter((item) => item.id !== id);
    setData(newList);
  }

  const updater = () => {
    setisUpdating(!isUpdating);
  };

  const getImages = () => {
    axios.get("images/").then((response) => {
      setData(response.data);
      setIsLoading(false);
      setisUpdating(false);
    });
  };

  useEffect(() => {
    getImages();
  }, [isLoading, isUpdating]);

  function onDelete(item) {
    updater();
    const config = {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    };

    const item_id = item.id;
    axios.delete(`images/${item_id}/`, config).then(listRemover(item_id));
  }

  const handleChange = (evt) => {
    const formData = new FormData();
    const item_id = evt.currentTarget.id;

    if (evt.currentTarget.className === "width-editable") {
      if (evt.target.value === "") {
        return;
      } else {
        formData.append("width", evt.target.value);
      }
    }
    if (evt.currentTarget.className === "title-editable") {
      if (evt.target.value === "") {
        return;
      } else {
        formData.append("title", evt.target.value);
      }
    }
    if (evt.currentTarget.className === "height-editable") {
      if (evt.target.value === "") {
        return;
      } else {
        formData.append("height", evt.target.value);
      }
    }

    axios.patch(`images/${item_id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getAccessToken(),
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light"/>
      ) : (
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Thumb</th>
                <th>Credit</th>
                <th>Width</th>
                <th>Height</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Col xs="6" md="2">
                      <a href={item.src}>
                        <Image src={item.src} thumbnail></Image>
                      </a>
                    </Col>
                  </td>

                    <td>
                    <ContentEditable
                      html={item.title.toString()}
                      onChange={handleChange}
                      id={item.id}
                      className="title-editable"
                    />
                  </td>

                  <td>
                    <ContentEditable
                      html={item.width.toString()}
                      onChange={handleChange}
                      id={item.id}
                      className="width-editable"
                    />
                  </td>
                  <td>
                    <ContentEditable
                      html={item.height.toString()}
                      onChange={handleChange}
                      id={item.id}
                      className="height-editable"
                    />
                  </td>

                  <td>
                    <Button
                      color="danger"
                      className="item-button"
                      onClick={() => onDelete(item)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )}
    </div>
  );
}

export default ImageGalleryEdit;
