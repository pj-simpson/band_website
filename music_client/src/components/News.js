import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardSubtitle, CardFooter, Col, CardHeader, Spinner, Button,
    ListGroup, ListGroupItem, Row
} from 'reactstrap';

import { InfiniteScroll } from 'react-simple-infinite-scroll'
import Moment from "react-moment";
import NewsEditModal from "./NewsEditModal";
import {getAccessToken} from "../services/AuthService";
import axios from "axios";

export class News extends React.Component {
  state = {
    items: [],
    isLoading: true,
    cursor: 1,
    isUpdating:false
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined })
    axios.get(`news/?ordering=-created_date&page=${this.state.cursor}`)
      .then(
        response => {
            if (response.data.next) {
                this.setState(state => ({
                items: [...state.items, ...response.data.results],
                cursor: parseInt(response.data.next.charAt(response.data.next.length-1)),
                isLoading: false
          }))

            } else {
                this.setState(state => ({
                items: [...state.items, ...response.data.results],
                cursor: null,
                isLoading: false
          }))

            }

        },
        error => {
          this.setState({ isLoading: false, error })
        }
    )
  }

   listRemover = (id) => {
        const newList = this.state.items.filter((item) => item.id !== id);
        this.setState({items:newList})
      }

     onDelete = (item) => {

            const config = {
                   headers: {
                      Authorization: "Bearer " + getAccessToken(),
                   }
                };

          const item_id = item.id;
          axios.delete(`news/${item_id}/`, config)
            .then(function (response){
            });

          this.listRemover(item_id);
      }

       updater = () => {
        // this.setState({isUpdating:!status})
           console.log('this fires');
      };

  render() {
    return (

      <div>
      <Col xs="4" md={{ offset: 4 }}className="justify-content-around" >
        <InfiniteScroll
          throttle={100}
          threshold={300}
          isLoading={this.state.isLoading}
          hasMore={!!this.state.cursor}
          onLoadMore={this.loadMore}
        >
          {this.state.items.length > 0
            ? this.state.items.map(item => (
                        <div className='news-card justify-content-around' key={item.id}>
                            <Card className="news-card" body inverse
                                  style={{backgroundColor: 'black', borderColor: '#333'}}>
                                <CardHeader style={{backgroundColor: 'black'}}><h2>{item.headline}</h2></CardHeader>
                                <CardSubtitle><a href={item.link}>{item.link_title}</a></CardSubtitle>
                                <CardBody>
                                    <CardText>
                                                                        <CardImg className="news-image" src={item.image}/>

                                        <Moment format="DD/MM/YYYY">
                                            {item.created_date}
                                        </Moment>

                                        <p className='press-release'>{item.body}</p>

                                    </CardText>
                                </CardBody>
                                {
                                    this.props.isLoggedIn && (
                                        <CardFooter style={{backgroundColor: 'black'}}>

                                            <div className="edit-buttons">
                                                <NewsEditModal item={item} handleUpdate={this.updater} isUpdating={this.state.isUpdating}/>
                                                <Button
                                                    color='danger'
                                                    className="item-button"
                                                    onClick={() => this.onDelete(item)}
                                                >Delete</Button>
                                            </div>
                                        </CardFooter>
                                    )
                                }
                            </Card>
                        </div>
              ))
            : null}
        </InfiniteScroll>

        {this.state.isLoading && (
            <Spinner animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        )}
        </Col>
      </div>
    )
  }
}