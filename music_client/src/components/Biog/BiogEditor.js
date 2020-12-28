import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Col, Row,
    Spinner, Card, CardBody, Button, CardFooter
} from "reactstrap";
import { getAccessToken } from "../../services/AuthService";
import renderHTML from "react-render-html";
import BiogEditModal from "../Biog/BiogEditModal";



function BiogEditor({ isLoggedIn }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [isUpdating, setisUpdating] = useState(false);

    const updater = () => {
        setisUpdating(!isUpdating);
      };


    function listRemover(id) {
        const newList = data.filter((item) => item.id !== id);
        setData(newList);
    }

    const getBiogs = () => {
        axios.get("biog/?ordering=-created_date").then((response) => {
            setData(response.data);
            setIsLoading(false);
        });
    };


    useEffect(() => {
        getBiogs();
    }, [isLoading]);

    function onDelete(item) {
        const config = {
            headers: {
                Authorization: "Bearer " + getAccessToken(),
            },
        };

        const item_id = item.id;
        axios.delete(`biog/${item_id}`, config).then(function (response) {
        });

        listRemover(item_id);
    }

    return (
        <div>
            {isLoading ? (
                <Spinner animation="grow" color="light"/>
            ) : (<Row sm="2" className="justify-content-around connect-table-row">
                    <Col>


                        {data.map((item) => (
                            <div key={item.id} id={item.id}>
                                <Card className="biog-edit-card"
                                    body
                                    inverse
                                    style={{
                                      backgroundColor: "black",
                                      borderColor: "#333",
                                    }}>
                                    <CardBody>
                                        {renderHTML(item.biography)}
                                    </CardBody>
                                    <CardFooter style={{ backgroundColor: "black" }}>
                                        <div className="edit-buttons">
                                          <BiogEditModal item={item} updater={updater} />
                                          <Button
                                            color="danger"
                                            className="item-button"
                                            onClick={() => onDelete(item)}
                                          >
                                            Delete
                                          </Button>
                                        </div>
                                      </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
            )
            }
        </div>
    );
}


export default BiogEditor;

