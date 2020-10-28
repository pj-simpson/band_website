import React ,{Fragment, useState} from 'react';
import { useForm } from "react-hook-form";
import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap"
import axios from 'axios';
import {getAccessToken} from "../services/AuthService";
import {Redirect} from "react-router-dom";

function HomePageUpdate() {

    const { register, handleSubmit } = useForm();
    const [ submitted, setSubmitted] = useState(false);
    const [isError,setIsError] = useState(false);
    const [errors,captureErrors] = useState('');

    function onSubmit(data, event) {
        event.preventDefault()
        const formData = new FormData();


        formData.append('image', data['image'][0])


        axios.post('homeimage/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + getAccessToken(),
            }}
        )
            .then(setSubmitted(true))
        .catch(err => {
                if (err.response) {
                    captureErrors(err.response.statusText)
                }
                setIsError(true);
            });
  }

  if (submitted) {
        return <Redirect push to={{
          pathname: '/',
        }}
        />
      }


  return(
      <Fragment>


<Col sm="7" md={{ size: 6, offset: 3 }}>
    {
        isError &&
        <Alert color='danger'>
            Error!
          {errors}
        </Alert>
      }
        <form onSubmit={handleSubmit(onSubmit)}>


            <div className="form-group">
                <label>Image:</label>

                <input
                    type="file"
                    ref={register}
                    name="image"
                    className="form-control-file"
                />
            </div>

        <Button color="primary" type="submit">Submit</Button>



        </form>
</Col>
    </Fragment>
      );
}





export default HomePageUpdate;