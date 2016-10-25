var MarkdownPlus = React.createClass({
  getInitialState: function() {
    return {markdown: (this.props.markdown || '')};
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
    let value = e.currentTarget.value;
    if(!this._debounceHandler) {
      this._debounceHandler = _.debounce(this.props.markdownChanged, 1000);
    }
    this._debounceHandler(value);
  },
  render: function() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={this.textChanged}>{this.props.markdown}</textarea>
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
  document.getElementById('example')
);
