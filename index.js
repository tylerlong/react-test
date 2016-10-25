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


var MarkdownEditor = React.createClass({
  textChanged: function(e) {
    let markdown = document.getElementById('markdown-textarea').value;
    this.props.markdownChanged(markdown);
  },
  render: function() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={_.debounce(this.textChanged, 1000)}>{this.props.markdown}</textarea>
      </div>
    );
  }
});


var MarkdownPreview = React.createClass({
  render: function() {
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: mdc.render(this.props.markdown)}} />
    );
  }
});


ReactDOM.render(
  <MarkdownPlus markdown="# hello world"/>,
  document.getElementById('root')
);
