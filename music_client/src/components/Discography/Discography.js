import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardImg,
  CardBody,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import DiscogEditModal from "./DiscogEditModal";
import { getAccessToken } from "../../services/AuthService";
import {
  FaBandcamp,
  FaSoundcloud,
  FaSpotify,
  FaShoppingCart,
} from "react-icons/fa";
import Moment from "react-moment";

function Discography({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isUpdating, setisUpdating] = useState(false);
  const [rows, setRows] = useState({});

  function listRemover(id) {
    const newList = data.filter((item) => item.id !== id);
    setData(newList);
  }

  const updater = () => {
    setisUpdating(!isUpdating);
  };

  const getReleases = () => {
    axios.get("releases/?ordering=-release_date").then((response) => {
      setData(response.data);
      setIsLoading(false);
      setisUpdating(false);
    });
  };

  function rowConstructor(data, rows) {
    let counter = 1;
    Object.keys(data).forEach((value, idx) => {
      rows[counter] = rows[counter] ? [...rows[counter]] : [];
      if (idx % 3 === 0 && idx !== 0) {
        counter++;
        rows[counter] = rows[counter] ? [...rows[counter]] : [];
        rows[counter].push(value);
      } else {
        rows[counter].push(value);
      }
    });
    return rows;
  }

  useEffect(() => {
    getReleases();
    setRows(rowConstructor(data, rows));
  }, [isLoading, isUpdating]);

  function onDelete(item) {
    const config = {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    };

    const item_id = item.id;
    axios.delete(`releases/${item_id}/`, config).then(function (response) {});

    listRemover(item_id);
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light"/>
      ) : (
        Object.keys(rows).map((row) => {
          return (
            <Row sm="4" className="justify-content-around" key={row}>
              {data
                .filter(function (eachElem, index) {
                  return rows[row].includes(index.toString());
                })
                .map((item) => (
                  <Col key={item.id}>
                    <div className="news-card"  id={item.id}>
                      <Card
                        className="news-card"
                        body
                        inverse
                        style={{
                          backgroundColor: "black",
                          borderColor: "#333",
                        }}
                      >
                        <CardHeader style={{ backgroundColor: "black" }}>
                          <h2>{item.title}</h2>
                        </CardHeader>
                        <CardImg className="news-image" src={item.image} />
                        <CardBody>
                          <div className="link-icons">
                            {item.bandcamp_link && (
                              <a href={item.bandcamp_link}>
                                <FaBandcamp />
                              </a>
                            )}

                            {item.soundcloud_link && (
                              <a href={item.soundcloud_link}>
                                <FaSoundcloud />
                              </a>
                            )}

                            {item.spotify_link && (
                              <a href={item.spotify_link}>
                                <FaSpotify />
                              </a>
                            )}

                            {item.buy_link && (
                              <a href={item.buy_link}>
                                <FaShoppingCart />
                              </a>
                            )}
                          </div>

                          <div>
                            <ul>
                              <li>
                                Release Date:{" "}
                                <Moment format="DD/MM/YYYY">
                                  {item.release_date && item.release_date}
                                </Moment>
                              </li>
                              <li>
                                Mastered By: {item.mastered && item.mastered}
                              </li>
                              <li>
                                Recorded By: {item.recorded && item.recorded}
                              </li>
                              <li>Design By: {item.design && item.design}</li>
                              <li>Label: {item.label && item.label}</li>
                              <li>Formats: {item.format && item.format}</li>
                            </ul>
                          </div>

                          <div className="press-release">{item.press_release}</div>
                        </CardBody>
                        {isLoggedIn && (
                          <CardFooter style={{ backgroundColor: "black" }}>
                            <div className="edit-buttons">
                              <DiscogEditModal item={item} updater={updater} />
                              <Button
                                color="danger"
                                className="item-button"
                                onClick={() => onDelete(item)}
                              >
                                Delete
                              </Button>
                            </div>
                          </CardFooter>
                        )}
                      </Card>
                    </div>
                  </Col>
                ))}
            </Row>
          );
        })
      )}
    </div>
  );
}

// https://blog.irowell.io/blog/bootstrap-dynamic-rows/
export default Discography;
