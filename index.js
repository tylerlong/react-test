const React = require('react');
const ReactDOM = require('react-dom');
const mdc = require('markdown-core/markdown-core-node');
const _ = require('lodash');


class MarkdownPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {markdown: (props.markdown || '')};
  }
  markdownChanged(markdown) {
    this.setState({ markdown });
  }
  render() {
    return (
      <div>
        <MarkdownEditor markdown={this.state.markdown} markdownChanged={this.markdownChanged.bind(this)} />
        <MarkdownPreview markdown={this.state.markdown} />
      </div>
    );
  }
}


class MarkdownEditor extends React.Component{
  constructor(props) {
    super(props);
    this.debouncedChange = _.debounce((markdown) => this.props.markdownChanged(markdown), 1000);
  }
  textChanged(e) {
    this.debouncedChange(e.target.value);
  }
  render() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.textChanged.bind(this)} value={this.props.markdown}></textarea>
      </div>
    );
  }
}


var MarkdownPreview = React.createClass({
  render: function() {
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: mdc.render(this.props.markdown)}} />
    );
  }
});


ReactDOM.render(
  <MarkdownPlus markdown="# hello world"/>,
  document.getElementById('example')
);
