import React, { Component } from 'react';
import './index.css';

class Label extends Component {
  render() {

    return (
      <span className="label label-warning">{this.props.text}</span>
    )
  }
}

export default Label;
