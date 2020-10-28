import React, {useEffect, useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardSubtitle, CardFooter, Col, CardHeader, Spinner, Button,
    ListGroup,ListGroupItem
} from 'reactstrap';

import axios from 'axios';
import '../App.css';
import DiscogEditModal from "./DiscogEditModal";
import NewsEditModal from "./NewsEditModal";
import {getAccessToken} from "../services/AuthService";
import Moment from 'react-moment';
import InfiniteScroll  from 'react-infinite-scroller';



/**
 * @return {boolean}
 */
function NewsOld({isLoggedIn, scrollContainer}) {

    // const [loading, setLoading] = useState(true);
    const [isUpdating,setisUpdating] = useState(false);

    const [data, setData] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(false);
    const [nextPage, setNextPage] = useState('http://localhost:8000/api/news/');

    function loadItems() {

        var url = nextPage;
        axios.get(url)
            .then((response) => {
                let isMore = false;
                if (response.data.next) {
                    isMore = true
                };
                setHasMoreItems(isMore);
                if (isMore) {
                    setNextPage(response.data.next);
                }
                setData(data => [...data,response.data.results]);
            })

    }

    function listRemover(id) {
        const newList = data.filter((item) => item.id !== id);
        setData(newList);
      }

      const updater = () => {
        setisUpdating(!isUpdating);
      };


      function onDelete(item) {

          const config = {
                   headers: {
                      Authorization: "Bearer " + getAccessToken(),
                   }
                };

          const item_id = item.id;
          axios.delete(`http://localhost:8000/api/news/${item_id}/`, config)
            .then(listRemover(item_id));
      }


// <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner>

  return (
        <div>


            <Col sm="7" md={{size: 6, offset: 3}}>

                <InfiniteScroll
                    pageStart={1}
                    loadMore={loadItems()}
                    hasMore={hasMoreItems}
                    loader= {'Loading...'}>

                    {data.map(item => (
                                <div className='news-card' key={item.id}>
                                    <Card className="news-card" body inverse
                                          style={{backgroundColor: 'black', borderColor: '#333'}}>
                                        <CardHeader style={{backgroundColor: 'black'}}><h2>{item.headline}</h2></CardHeader>
                                        <CardSubtitle><a href={item.link}>{item.link_title}</a></CardSubtitle>
                                        <CardImg className="news-image" src={item.image}/>
                                        <CardBody>
                                            <CardText>
                                                <Moment format="DD/MM/YYYY">
                                                    {item.created_date}
                                                </Moment>

                                                <p class='press-release'>{item.body}</p>

                                            </CardText>
                                        </CardBody>
                                        {
                                            isLoggedIn && (
                                                <CardFooter style={{backgroundColor: 'black'}}>

                                                    <div className="edit-buttons">
                                                        <NewsEditModal item={item} updater={updater}/>
                                                        <Button
                                                            color='danger'
                                                            className="item-button"
                                                            onClick={() => onDelete(item)}
                                                        >Delete</Button>
                                                    </div>
                                                </CardFooter>
                                            )
                                        }
                                    </Card>
                                </div>
                    )
                )}
                </InfiniteScroll>
            </Col>
        </div>
    );
 }






export default NewsOld;

