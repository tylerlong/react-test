const React = require('react');
const ReactDOM = require('react-dom');
const mdc = require('markdown-core/markdown-core-node');
const _ = require('lodash');


class MarkdownPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: (props.markdown || '')
    };
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
  }
  textChanged(e) {
    this.props.markdownChanged(e.target.value);
  }
  render() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.textChanged.bind(this)} value={this.props.markdown}></textarea>
      </div>
    );
  }
}

class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m: mdc.render(props.markdown),
    }
    this.debounce = _.debounce((markdown) => this.setState({
      m: mdc.render(markdown)
    }), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.debounce(nextProps.markdown)
  }

  render() {
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.m}} />
    );
  }
};


ReactDOM.render(
  <MarkdownPlus markdown="# hello world"/>,
  document.getElementById('example')
);
