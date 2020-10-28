import React, {useEffect, useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardSubtitle, CardFooter, Col, CardHeader, Spinner, Button, Table, Row
} from 'reactstrap';

import axios from 'axios';
import '../App.css';
import DiscogEditModal from "./DiscogEditModal";
import NewsEditModal from "./NewsEditModal";
import {getAccessToken} from "../services/AuthService";
import Moment from 'react-moment';


function Connect({isLoggedIn}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [isUpdating,setisUpdating] = useState(false);

    function listRemover(id) {
        const newList = data.filter((item) => item.id !== id);
        setData(newList);
      }

      const updater = () => {
        setisUpdating(!isUpdating);
      };

    const getNews= () => {
        axios.get('connections/')
             .then( response => {
                setData(response.data);
                setIsLoading(false);
                setisUpdating(false);
             });
      }

      useEffect(() => {
             getNews();
      }, [isLoading,isUpdating]);


      function onDelete(item) {

          const config = {
                   headers: {
                      Authorization: "Bearer " + getAccessToken(),
                   }
                };

          const item_id = item.id;
          axios.delete(`connections/${item_id}/`, config)
            .then(listRemover(item_id));
      }




  return (
    <div>

        {isLoading ?
            <Spinner animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> : 


                <Row  sm="4" className="justify-content-around connect-table-row">

                <Col>
                    <Table>
                      <thead>
                        <tr>
                          <th>Platform</th>
                        </tr>
                      </thead>
                      <tbody>

                      {data.filter(item => item.category =="Platform").map(item => (
                        <tr key={item.id}>
                            <td><a href={item.link}>{item.link_title}</a></td>
                             {
                              isLoggedIn && (
                                      <Button
                                        color='danger'
                                        className="item-button"
                                        onClick={() => onDelete(item)}
                                        size="sm"
                                      >x</Button>
                                  )
                            }
                        </tr>

                          ))
                            }
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

                      {data.filter(item => item.category =="Mix").map(item => (
                        <tr key={item.id}>
                            <td><a href={item.link}>{item.link_title}</a></td>
                             {
                              isLoggedIn && (
                                      <Button
                                        color='danger'
                                        className="item-button"
                                        onClick={() => onDelete(item)}
                                        size="sm"
                                      >x</Button>
                                  )
                            }
                        </tr>

                          ))
                            }
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

                      {data.filter(item => item.category =="Press").map(item => (
                        <tr key={item.id}>
                            <td><a href={item.link}>{item.link_title}</a></td>
                             {
                              isLoggedIn && (
                                      <Button
                                        color='danger'
                                        className="item-button"
                                        onClick={() => onDelete(item)}
                                        size="sm"
                                      >x</Button>
                                  )
                            }
                        </tr>

                          ))
                            }
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

                      {data.filter(item => item.category =="Project").map(item => (
                        <tr key={item.id}>
                            <td><a href={item.link}>{item.link_title}</a>{
                              isLoggedIn && (
                                      <Button
                                        color='danger'
                                        className="item-button"
                                        onClick={() => onDelete(item)}
                                        size="sm"
                                      >x</Button>
                                  )
                            }</td>

                        </tr>

                          ))
                            }
                      </tbody>
                    </Table>
                </Col>

                </Row>
                }
    </div>
    );
 }






export default Connect;

