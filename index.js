const React = require('react');
const ReactDOM = require('react-dom');
const mdc = require('markdown-core/markdown-core-node');
const _ = require('lodash');
require('./index.css');
const { dialog } = require('electron').remote;
const fs = require('fs');
const { createStore } = require('redux');


class MarkdownPlus extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.markdownOpen = this.markdownOpen.bind(this);
    this.markdownSave = this.markdownSave.bind(this);
  }
  handleUserInput(markdown) {
    this.props.updateMarkdown(markdown);
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
          this.props.updateMarkdown(data);
          this.props.updateFileName(fileName);
        });
      }
    });
  }
  markdownSave() {
    const { markdown, fileName } = this.props.state;
    if (fileName != '') {
      fs.writeFile(fileName, markdown, function (err) {
        if (err) {
          alert("An error ocurred updating the file: " + err.message);
          return;
        }
        alert("The file has been succesfully saved");
      });
    }
  }
  render() {
    const { markdown, fileName } = this.props.state;
    return (
      <div>
        <MarkdownEditor fileName={fileName} markdown={markdown} onUserInput={this.handleUserInput}
          markdownOpen={this.markdownOpen} markdownSave={this.markdownSave} />
        <MarkdownPreview markdown={markdown} />
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
        <span> {this.props.fileName}</span>
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


const reducer = (state = { markdown: '', fileName: '' }, action) => {
  switch (action.type) {
    case 'UPDATE_MARKDOWN':
      return Object.assign({}, state, {
        markdown: action.markdown
      });
    case 'UPDATE_FILENAME':
      return Object.assign({}, state, {
        fileName: action.fileName
      });
    default:
      return state;
  }
}
const store = createStore(reducer);
const rootElement = document.getElementById('root');
const render = () => ReactDOM.render(
  <MarkdownPlus state={store.getState()} updateMarkdown={(markdown) => store.dispatch({ type: 'UPDATE_MARKDOWN', markdown })}
    updateFileName={(fileName) => store.dispatch({ type: 'UPDATE_FILENAME', fileName })} />,
  rootElement
);
render();
store.subscribe(render);
