const React = require('react');

class SimpleMdeReact extends React.Component {
  render() {
    return React.createElement('textarea', this.props);
  }
}

module.exports = SimpleMdeReact;