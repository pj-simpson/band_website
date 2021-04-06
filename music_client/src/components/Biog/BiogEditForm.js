import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { getAccessToken } from "../../services/AuthService";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { stateFromHTML } from "draft-js-import-html";

export class BiogEditForm extends Component {
  state = {
    editorState: EditorState.createWithContent(
      stateFromHTML(this.props.item.biography)
    ),
    submitted: false,
    updaterFunc: this.props.updater,
    toggleFunc: this.props.toggle,
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

    const item_id = this.props.item.id;
    axios
      .put(
        `biog/${item_id}`,
        { biography: biog },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      )
      .then(this.setState({ submitted: true }))
      .then(this.state.updaterFunc())
      .then(this.state.toggleFunc());
  };

  render() {
    const { editorState } = this.state;
    if (this.state.submitted) {
      return (
        <Redirect
          push
          to={{
            pathname: "/biogeditor",
          }}
        />
      );
    } else {
      return (
        <div>
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
        </div>
      );
    }
  }
}
