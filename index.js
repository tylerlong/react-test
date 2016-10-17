var MarkdownPlus = React.createClass({
  getInitialState: function() {
    return {markdown: ''};
  },
  markdownChanged: function(markdown) {
    this.setState({ markdown });
  },
  render: function() {
    return (
      <div>
        <MarkdownEditor markdown={this.state.markdown} markdownChanged={this.markdownChanged} />
        <MarkdownPreview markdown={this.state.markdown} />
      </div>
    );
  }
});


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
  <MarkdownPlus />,
  document.getElementById('example')
);
