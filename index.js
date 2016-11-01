const React = require('react');
const ReactDOM = require('react-dom');
const mdc = require('markdown-core/markdown-core-node');
const _ = require('lodash');
require('./index.css');
const { dialog } = require('electron').remote;
const fs = require('fs');


class MarkdownPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: props.markdown || '',
      fileName: false,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.markdownOpen = this.markdownOpen.bind(this);
    this.markdownSave = this.markdownSave.bind(this);
  }
  handleUserInput(markdown) {
    this.setState({ markdown });
  }
  markdownOpen() {
    const _this = this;
    dialog.showOpenDialog((fileNames) => {
      if (fileNames === undefined) {
        console.log("No file selected");
      } else {
        const fileName = fileNames[0];
        fs.readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            alert("An error ocurred reading the file: " + err.message);
            return;
          }
          _this.setState({ markdown: data, fileName });
        });
      }
    });
  }
  markdownSave() {
    if (this.state.fileName) {
      fs.writeFile(this.state.fileName, this.state.markdown, function (err) {
        if (err) {
          alert("An error ocurred updating the file: " + err.message);
          return;
        }
        alert("The file has been succesfully saved");
      });
    }
  }
  render() {
    return (
      <div>
        <MarkdownEditor markdown={this.state.markdown} onUserInput={this.handleUserInput}
          markdownOpen={this.markdownOpen} markdownSave={this.markdownSave} />
        <MarkdownPreview markdown={this.state.markdown} />
      </div>
    );
  }
}


class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.onUserInput(this.refs.textarea.value);
  }
  render() {
    return (
      <div>
        <textarea ref="textarea" id="markdown-textarea" onChange={this.handleChange} value={this.props.markdown} />
        <button onClick={this.props.markdownOpen}>Open</button>
        <button onClick={this.props.markdownSave}>Save</button>
      </div>
    );
  }
}


class MarkdownPreview extends React.Component {
  render() {
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdc.render(this.props.markdown) }} />
    );
  }
}


ReactDOM.render(
  <MarkdownPlus markdown="# hello world" />,
  document.getElementById('root')
);
