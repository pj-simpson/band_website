import React ,{Fragment, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {Alert, Button, Col} from "reactstrap";
import {getAccessToken} from "../services/AuthService";
import {Redirect} from "react-router-dom";


function ReleaseUpdate() {

    const { register, handleSubmit } = useForm();
    const [isError,setIsError] = useState(false);
    const [errors,captureErrors] = useState('');
    const [ submitted, setSubmitted] = useState(false);


    function onSubmit(data, event) {
        event.preventDefault()
        const formData = new FormData();

        formData.append('title', data.title)
        formData.append('label', data.label)
        formData.append('format', data.format)
        formData.append('bandcamp_link', data.bandcamp_link)
        formData.append('soundcloud_link', data.soundcloud_link)
        formData.append('spotify_link', data.spotify_link)
        formData.append('buy_link', data.buy_link)
        formData.append('press_release', data.press_release)
        formData.append('project', data.project)
        formData.append('recorded', data.recorded)
        formData.append('mastered', data.mastered)
        formData.append('design', data.design)
        formData.append('image', data['image'][0])



        axios.post('releases/', formData, {
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
          pathname: '/discog',
        }}
        />
      }


  return ( <Fragment>


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
          <label>Title:</label>
            <input
              type="text"
              ref={register}
              name="title"
              class="form-control"
            />
        </div>

        <div className="form-group">
          <label>Label:</label>
            <input
              type="text"
              ref={register}
              name="label"
              class="form-control"
            />
        </div>

        <div className="form-group">
            <label>Format:</label>
            <select multiple ref={register}  name="format" class="form-control">
              <option value="DL">DL</option>
                <option value="LP">LP</option>
                <option value="CS">CS</option>
                <option value="CD">CD</option>
            </select>
        </div>

        <div className="form-group">
          <label>Bandcamp:</label>
            <input
              type="url"
              ref={register}
              name="bandcamp_link"
              class="form-control"
            />
        </div>

        <div className="form-group">

        <label>Soundcloud:</label>
            <input
              type="url"
              ref={register}
              name="soundcloud_link"
              class="form-control"
            />
        </div>

        <div className="form-group">
            <label>Spotify:</label>
            <input
              type="url"
              ref={register}
              name="spotify_link"
              class="form-control"
            />
        </div>

        <div className="form-group">
            <label>Buy Physical:</label>
            <input
              type="url"
              ref={register}
              name="buy_link"
              class="form-control"
            />
        </div>



        <div className="form-group">
          <label>Press Release:</label>
            <textarea
              ref={register}
              name="press_release"
              class="form-control"
            />
        </div>

        <div className="form-group">
          <label>Project:</label>
            <select ref={register}  name="project" class="form-control">
              <option value="1">ELS</option>
            </select>
        </div>

        <div className="form-group">
            <label>Recorded by:</label>
            <input
              type="text"
              ref={register}
              name="recorded"
              class="form-control"
            />
        </div>

        <div className="form-group">
            <label>Mastered By:</label>
            <input
              type="text"
              ref={register}
              name="mastered"
              class="form-control"
            />
        </div>

        <div className="form-group">
            <label>Design By:</label>
            <input
              type="text"
              ref={register}
              name="design"
              class="form-control"
            />
        </div>

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

    </Fragment>);
}

export default ReleaseUpdate;