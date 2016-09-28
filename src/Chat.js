import 'draft-js/dist/Draft.css';
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, ContentState, getDefaultKeyBinding } from 'draft-js';

function getKeyBinding(event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    return 'submit';
  }

  return getDefaultKeyBinding(event);
}

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      editorState: EditorState.createEmpty()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleSubmit() {
    const { editorState } = this.state;
    const newMessage = editorState.getCurrentContent().getPlainText();

    setTimeout(() => {
      this.setState({
        messages: [
          ...this.state.messages,
          newMessage
        ]
      });
    }, _.random(50, 150));

    this.setState({
      editorState: EditorState.push(editorState, ContentState.createFromText(''))
    });
  }

  handleChange(editorState) {
    this.setState({
      editorState
    });
  }

  handleKeyCommand(command) {
    switch (command) {
      case 'submit':
        this.handleSubmit();
        return 'handled';

      default:
        return 'not-handled';
    }
  }

  renderMessages() {
    return this.state.messages.map((message, idx) => {
      return (
        <div className="message" key={idx}>
          {message}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Chat">
        <div className="Messages">
          {this.renderMessages()}
        </div>
        <div className="Editor">
          <Editor
            stripPastedStyles
            editorState={this.state.editorState}
            onChange={this.handleChange}
            keyBindingFn={getKeyBinding}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
