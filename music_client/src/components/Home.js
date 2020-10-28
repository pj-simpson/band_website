import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Media, Spinner} from "reactstrap";
import {getAccessToken} from "../services/AuthService";


function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [isUpdating,setisUpdating] = useState(false);

    function listRemover() {

        setData({});
      }

      const updater = () => {
        setisUpdating(!isUpdating);
      };


      const getHomeImage = () => {
        axios.get('latesthomeimage/'
                    )
             .then( response => {
                setData(response.data);
                setIsLoading(false);
                setisUpdating(false);
             });
      }


      useEffect(() => {
             getHomeImage();
      }, [isLoading,isUpdating]);




    function onDelete(item) {
            const config = {
                   headers: {
                      Authorization: "Bearer " + getAccessToken(),
                   }
                };
          const item_id = item;
          axios.delete(`deletelatesthomeimage/${item_id}/`, config)
            .then(function (response){
            });
          listRemover(item_id);
      }




  return (
    <div>
            {isLoading ?
            <Spinner animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>

           : <div>



                   <Col xs="auto" md={{offset: 4 }} >
                       <Media className='home-image' middle object src={data.image}></Media>
                   </Col>



                </div>



           }

</div>

);
}

export default Home;
