import React, { useEffect, useState } from "react";
import { Col, Spinner, Button, Table, Row } from "reactstrap";

import axios from "axios";
import "../../App.css";
import { getAccessToken } from "../../services/AuthService";

function Connect({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isUpdating, setisUpdating] = useState(false);

  function listRemover(id) {
    const newList = data.filter((item) => item.id !== id);
    setData(newList);
  }

  const getNews = () => {
    axios.get("connections/").then((response) => {
      setData(response.data);
      setIsLoading(false);
      setisUpdating(false);
    });
  };

  useEffect(() => {
    getNews();
  }, [isLoading, isUpdating]);

  function onDelete(item) {
    const config = {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    };

    const item_id = item.id;
    axios.delete(`connections/${item_id}/`, config).then(listRemover(item_id));
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="grow" color="light"/>
      ) : (
        <Row sm="4" className="justify-content-around connect-table-row">
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Platform</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.category === "Platform")
                  .map((item) => (
                    <tr key={item.id} id={item.id}>
                      <td>
                        <a href={item.link}>{item.link_title}</a>
                          {isLoggedIn && (
                        <Button
                          color="danger"
                          className="item-button"
                          onClick={() => onDelete(item)}
                          size="sm"
                        >
                          x
                        </Button>
                      )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Mixes</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.category === "Mix")
                  .map((item) => (
                    <tr key={item.id} id={item.id}>
                      <td>
                        <a href={item.link}>{item.link_title}</a>
                          {isLoggedIn && (
                        <Button
                          color="danger"
                          className="item-button"
                          onClick={() => onDelete(item)}
                          size="sm"
                        >
                          x
                        </Button>
                      )}
                      </td>

                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Press</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.category === "Press")
                  .map((item) => (
                    <tr key={item.id} id={item.id}>
                      <td>
                        <a href={item.link}>{item.link_title}</a>
                          {isLoggedIn && (
                        <Button
                          color="danger"
                          className="item-button"
                          onClick={() => onDelete(item)}
                          size="sm"
                        >
                          x
                        </Button>
                      )}
                      </td>

                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.category === "Project")
                  .map((item) => (
                    <tr key={item.id} id={item.id}>
                      <td>
                        <a href={item.link}>{item.link_title}</a>
                        {isLoggedIn && (
                          <Button
                            color="danger"
                            className="item-button"
                            onClick={() => onDelete(item)}
                            size="sm"
                          >
                            x
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>




      ) }
      <Row >
            <Col md={{ span: 5, offset: 5 }}>
                  <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css"/>

                  <div id="mc_embed_signup">
                      <form
                          action="https://gmail.us7.list-manage.com/subscribe/post?u=e1d644a435f32ceeb7bc1c131&amp;id=265238e0cc"
                          method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                          className="validate" target="_blank" noValidate>
                          <div id="mc_embed_signup_scroll">
                              <label htmlFor="mce-EMAIL">News Letter</label>
                              <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL"
                                     placeholder="email address" required></input>
                          </div>
                          <div style={{"position": "absolute", "left": "-5000px"}} aria-hidden="true">
                              <input type="text" name="b_e1d644a435f32ceeb7bc1c131_265238e0cc" tabIndex="-1"
                                     value=""></input>
                          </div>

                          <div className="clear">
                              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                                     className="button"></input>
                          </div>
                      </form>
                  </div>

              </Col>
            </Row>
    </div>



  );

}

export default Connect;
