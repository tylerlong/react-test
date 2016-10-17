var MarkdownPlus = React.createClass({
  render: function() {
    return (
      <div>
        <MarkdownPreview />
        <MarkdownEditor />
      </div>
    );
  }
});

var MarkdownPreview = React.createClass({
  render: function() {
    return (
      <div>

      </div>
    );
  }
});

var MarkdownEditor = React.createClass({
  textChanged: function() {
    console.log('textChange');
  },

  render: function() {
    return (
      <div>
        <textarea id="markdown-textarea" onChange={_.debounce(this.textChanged, 1000)}># hello world</textarea>
      </div>
    );
  }
});



ReactDOM.render(
  <MarkdownPlus />,
  document.getElementById('example')
);
