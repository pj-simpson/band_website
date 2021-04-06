import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";
import { Button, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

export class BiogUpdate extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    submitted: false,
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSubmit = (editorState) => {
    const biog = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    axios
      .post(
        "biog/",
        { biography: biog },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      )
      .then(this.setState({ submitted: true }));
  };

  render() {
    const { editorState } = this.state;
    if (this.state.submitted) {
      return (
        <Redirect
          push
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      return (
        <div>
          <Col xs="10">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "remove",
                  "history",
                ],
              }}
            />
            <Button
              color="primary"
              className="item-button"
              onClick={() => this.onSubmit()}
            >
              Submit
            </Button>
          </Col>
        </div>
      );
    }
  }
}
