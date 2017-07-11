import React, { Component } from 'react';
import './index.css';
import Label from './Label.js';

class MessageRow extends Component {
  render() {
    var labels = [];
    this.props.message.labels.forEach((labelText) => {
      labels.push(<Label text={labelText} key={labelText} />);
    });
    var readStatus = this.props.message.read ? 'read' : 'unread';
    return (
      <div className={'row message ' + readStatus}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" />
            </div>
            <div className="col-xs-2">
              <i className={this.props.message.starred ? 'star fa fa-star-o' : 'star fa fa-star'}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          {labels}
          <a href="index.html">{this.props.message.subject}</a>
        </div>
      </div>
    );
  }
}

export default MessageRow;
