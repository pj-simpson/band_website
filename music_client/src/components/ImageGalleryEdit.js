import React, {useEffect, useState} from 'react';
import {
   Col, Spinner, Button, Table, Row,
} from 'reactstrap';
import {Image} from "react-bootstrap";
import axios from 'axios';
import '../App.css';

import {getAccessToken} from "../services/AuthService";


function ImageGalleryEdit({isLoggedIn}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isUpdating,setisUpdating] = useState(false);

    function listRemover(id) {
        const newList = data.filter((item) => item.id !== id);
        setData(newList);
      }

      const updater = () => {
        setisUpdating(!isUpdating);
      };

    const getImages= () => {
        axios.get('images/')
             .then( response => {
                setData(response.data);
                setIsLoading(false);
                setisUpdating(false);
             });
      }

      useEffect(() => {
             getImages();
      }, [isLoading,isUpdating]);


      function onDelete(item) {

          const config = {
                   headers: {
                      Authorization: "Bearer " + getAccessToken(),
                   }
                };

          const item_id = item.id;
          axios.delete(`images/${item_id}/`, config)
            .then(listRemover(item_id));
      }




  return (
    <div>

        {isLoading ?
            <Spinner animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> :


            <Col>
                    <Table>
                      <thead>
                        <tr>
                            <th>Thumb</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>

                      {data.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Col xs='6' md='2'>
                                    <a href={item.src}>
                                        <Image src={item.src} thumbnail ></Image>
                                    </a>
                                </Col>
                            </td>
                          <td>
                              <input
                                type="number"
                                // ref={register}
                                name="width"
                                className="form-control"
                                placeholder={item.width}
                            /></td>
                          <td>
                              <input
                                type="number"
                                // ref={register}
                                name="height"
                                className="form-control"
                                placeholder={item.height}
                            /></td>
                          <td><Button
                                color='info'
                                className="item-button"
                                size="sm"
                                onClick={() => updater()}>Edit</Button></td>
                          <td><Button
                                color='danger'
                                className="item-button"
                                onClick={() => onDelete(item)}
                                size="sm"
                              >Delete</Button></td>



                        </tr>

                          ))
                            }
                      </tbody>
                    </Table>
                </Col>}
    </div>
    );

 }






export default ImageGalleryEdit;