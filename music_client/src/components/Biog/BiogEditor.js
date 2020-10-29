import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import {getAccessToken} from "../../services/AuthService";


export class BiogEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

   onSubmit = () => {

    const biog = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    axios
      .post("homeimage/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAccessToken(),
        },
      })
      .then(setSubmitted(true))
      .catch((err) => {
        if (err.response) {
          captureErrors(err.response.statusText);
        }
        setIsError(true);
      });
  }

  //

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}