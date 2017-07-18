import React, { Component } from 'react';
import './index.css';
import Label from './Label.js';

// Available:
// this.props.message
// this.props.setProperty

class MessageRow extends Component {
  render() {
    const readClass = this.props.message.read ? 'read' : 'unread';
    const selectedClass = this.props.message.selected ? 'selected' : '';
    const starClass = this.props.message.starred ? 'star fa fa-star' : 'star fa fa-star-o';

    var labels = [];
    this.props.message.labels.forEach((labelText) => {
      labels.push(<Label text={labelText} key={labelText} />);
    });

    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.message.selected} onChange={() => this.props.setProperty([this.props.message], 'selected', !this.props.message.selected)} />
            </div>
            <div className="col-xs-2">
              <i className={starClass} onClick={() => this.props.setProperty([this.props.message.id], 'starred', !this.props.message.starred)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          {labels}
          <a href="index.html">{this.props.message.subject}</a>
        </div>
      </div>
    )
  }
}

export default MessageRow;
