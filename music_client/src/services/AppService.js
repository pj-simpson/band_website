import axios from "axios";
import {getAccessToken} from "./AuthService";

export function onSubmit(data, event) {
        event.preventDefault()
        console.log(data)
        const formData = new FormData();

        formData.append('image', data['image'][0])
        formData.append('headline', data.headline)
        formData.append('body', data.body)
        formData.append('link', data.link)
        formData.append('link_title', data.linktitle)


        axios.post('http://localhost:8000/api/news/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + getAccessToken(),
            }}
        )
          .then(function (response) {
              console.log(response)
          })
  }