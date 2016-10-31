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
    };
    this.markdownChanged = this.markdownChanged.bind(this);
    this.markdownOpen = this.markdownOpen.bind(this);
    this.markdownSave = this.markdownSave.bind(this);
  }
  markdownChanged(e) {
    this.setState({ markdown: e.target.value });
  }
  markdownOpen() {
    console.log('markdownOpen');
    const _this = this;
    dialog.showOpenDialog((fileNames) => {
      if (fileNames === undefined) {
        console.log("No file selected");
      } else {
        const fileName = fileNames[0];
        fs.readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            console.log("An error ocurred reading the file :" + err.message);
            return;
          }
          _this.setState({ markdown: data });
        });
      }
    });
  }
  markdownSave() {
    console.log('markdownSave');
    saveMarkdown();
  }
  render() {
    return (
      <div>
        <MarkdownEditor markdown={this.state.markdown} markdownChanged={this.markdownChanged}
          markdownOpen={this.markdownOpen} markdownSave={this.markdownSave} />
        <MarkdownPreview markdown={this.state.markdown} />
      </div>
    );
  }
}


class MarkdownEditor extends React.Component {
  render() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.props.markdownChanged} value={this.props.markdown} />
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
