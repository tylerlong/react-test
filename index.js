class MarkdownPlus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      markdown: props.markdown || '',
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
    this.markdownChanged = _.debounce(this.props.markdownChanged, 1000);
  }
  textChanged(e) {
    this.markdownChanged(e.target.value);
  }
  render() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.textChanged.bind(this)}>{this.props.markdown}</textarea>
      </div>
    );
  }
}


class MarkdownPreview extends React.Component{
  render() {
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: mdc.render(this.props.markdown)}} />
    );
  }
}


ReactDOM.render(
  <MarkdownPlus markdown="# hello world"/>,
  document.getElementById('root')
);
