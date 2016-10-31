const React = require('react');
const ReactDOM = require('react-dom');
const mdc = require('markdown-core/markdown-core-node');
const _ = require('lodash');
require('./index.css');


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
  markdownChanged(markdown) {
    this.setState({ markdown });
  }
  markdownOpen() {
    console.log('markdownOpen');
  }
  markdownSave() {
    console.log('markdownSave');
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
  constructor(props) {
    super(props);
    this.markdownChanged = _.debounce(this.props.markdownChanged, 1000);
    this.textChanged = this.textChanged.bind(this);
  }
  textChanged(e) {
    this.markdownChanged(e.target.value);
  }
  render() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.textChanged} defaultValue={this.props.markdown} />
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
